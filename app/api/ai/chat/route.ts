import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    
    if (!openRouterApiKey) {
      console.warn("No OpenRouter API key found. Returning mock data.");
      return NextResponse.json({ 
        role: "assistant", 
        content: "I'm sorry, I am currently running in offline mode. Please configure the OpenRouter API key." 
      });
    }

    // System prompt for multilingual chatbot
    const systemPrompt = {
      role: "system",
      content: "You are the Brand Craftsman Multilingual Assistant. You help users navigate the platform, understand services, and answer questions. You MUST be able to respond fluently in English, Tamil, Malayalam, Telugu, and Kannada depending on the language the user speaks. Always be polite, concise, and helpful."
    };

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://brandcraftsman.in",
        "X-Title": "Brand Craftsman AI Platform",
      },
      body: JSON.stringify({
        model: "qwen/qwen-2.5-72b-instruct", // Qwen has excellent multilingual support
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenRouter API error: ${res.statusText}`);
    }

    const aiData = await res.json();
    return NextResponse.json(aiData.choices[0].message);
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
