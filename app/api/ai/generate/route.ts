import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// OpenRouter URL for decentralized/free-tier AI routing
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

// Map tools to specific models (e.g., using Qwen or Nemotron via OpenRouter)
const TOOL_MODELS: Record<string, string> = {
  "humanizer": "nvidia/nemotron-4-340b-instruct", // Nemotron for complex human-like rewriting
  "default": "qwen/qwen-2.5-72b-instruct"
}

// Default system prompts per tool
const SYSTEM_PROMPTS: Record<string, string> = {
  "grammar-check": "You are a professional editor. Fix all grammatical errors, typos, and improve the sentence structure of the provided text. Return ONLY the corrected text.",
  "plagiarism-check": "You are a plagiarism detection assistant. Analyze the provided text and estimate if it was AI-generated or plagiarized. Provide a percentage score and a brief explanation.",
  "humanizer": "You are an expert human writer. Rewrite the provided text so that it completely bypasses AI detectors. Make it sound natural, conversational, and uniquely human. Do not sound robotic."
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    // Require authentication
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { prompt, toolName } = await req.json()

    if (!prompt || !toolName) {
      return NextResponse.json({ error: "Missing prompt or toolName" }, { status: 400 })
    }

    // Check user credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || user.credits < 1) {
      return NextResponse.json({ error: "Insufficient credits" }, { status: 403 })
    }

    let generatedText = "";

    if (toolName === "grammar-check") {
      // Option 1: LanguageTool Free API
      const ltRes = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text: prompt, language: "en-US" })
      });
      const data = await ltRes.json();
      
      interface LTMatch { offset: number; length: number; message: string; replacements?: { value: string }[] }
      let correctedText = prompt;
      const matches = (data.matches || []).sort((a: LTMatch, b: LTMatch) => b.offset - a.offset);
      for (const match of matches as LTMatch[]) {
        if (match.replacements && match.replacements.length > 0) {
          const replacement = match.replacements[0].value;
          correctedText = correctedText.substring(0, match.offset) + replacement + correctedText.substring(match.offset + match.length);
        }
      }
      
      generatedText = `**Corrected Text:**\n${correctedText}\n\n**Issues Found:**\n${matches.length === 0 ? "None!" : matches.map((m: LTMatch) => `- ${m.message}`).join("\n")}`;

    } else if (toolName === "plagiarism-check") {
      // Option 2: Custom DuckDuckGo Web Search Scraper
      const sentences = prompt.match(/[^.!?]+[.!?]+/g) || [prompt];
      let foundMatches = 0;
      
      for (const sentence of sentences) {
        // Only check sentences longer than 3 words to avoid false positives
        if (sentence.trim().split(" ").length < 4) continue;
        
        const query = `"${sentence.trim()}"`;
        try {
          const searchRes = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
          });
          const html = await searchRes.text();
          if (html.includes("class=\"result__snippet\"") || html.includes("class=\"result__title\"")) {
            foundMatches++;
          }
        } catch (e) {
          console.error("Plagiarism search error:", e);
        }
      }
      
      const score = Math.round((foundMatches / sentences.length) * 100);
      generatedText = `**Plagiarism Detection Results:**\nEstimated Plagiarized Content: **${score}%**\n\nFound exact web matches for ${foundMatches} out of ${sentences.length} sentences.`;

    } else {
      // Determine Model and System Prompt for OpenRouter fallback
      const model = TOOL_MODELS[toolName as keyof typeof TOOL_MODELS] || TOOL_MODELS["default"]
      const systemPrompt = SYSTEM_PROMPTS[toolName as keyof typeof SYSTEM_PROMPTS] || "You are a helpful assistant."

      // Call Decentralized API (OpenRouter)
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://brandcraftsman.in",
          "X-Title": "Brand Craftsman AI Platform",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ]
        })
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error("AI API Error:", errorData)
        return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 })
      }

      const data = await response.json()
      generatedText = data.choices?.[0]?.message?.content || ""
    }

    // Deduct credit and log generation
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { credits: { decrement: 1 } }
      }),
      prisma.aiGeneration.create({
        data: {
          userId: user.id,
          toolName,
          prompt,
          response: generatedText,
          creditsUsed: 1
        }
      })
    ])

    return NextResponse.json({ result: generatedText })

  } catch (error) {
    console.error("Generation Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
