import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/admin";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const userId = await requireAuth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, action = "generate-layout", currentLayout } = body;

    if (!prompt && action !== "generate-blocks") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      console.warn("No OpenRouter API key found. Returning mock data.");
      return NextResponse.json(getMockPuckData(prompt || "Mock"));
    }

    if (action === "generate-blocks") {
      if (!currentLayout || !currentLayout.content) {
         return NextResponse.json({ error: "currentLayout is required for generate-blocks" }, { status: 400 });
      }
      
      const newContent = await Promise.all(currentLayout.content.map(async (block: { type: string; props: { prompt?: string; generatedHtml?: string } }) => {
        if (block.type === "AICustomBlock" && !block.props.generatedHtml) {
          const blockPrompt = block.props.prompt;
          const sys = "You are a Tailwind CSS and HTML expert. The user wants a UI component. Generate ONLY the raw HTML string using Tailwind classes. Do not use markdown blocks, do not explain. Just HTML.";
          const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${openRouterApiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "qwen/qwen-2.5-72b-instruct",
              messages: [{ role: "system", content: sys }, { role: "user", content: blockPrompt }],
            })
          });
          const data = await res.json();
          let html = data.choices?.[0]?.message?.content?.trim() || "";
          if (html.startsWith("\`\`\`html")) html = html.replace(/^\`\`\`html\n/, "").replace(/\n\`\`\`$/, "");
          else if (html.startsWith("\`\`\`")) html = html.replace(/^\`\`\`\n/, "").replace(/\n\`\`\`$/, "");
          
          return { ...block, props: { ...block.props, generatedHtml: html } };
        }
        return block;
      }));
      
      return NextResponse.json({ ...currentLayout, content: newContent });
    }

    let systemPrompt = "";
    let userPrompt = prompt;

    if (action === "evolve") {
      systemPrompt = `You are an expert web designer AI that outputs STRICTLY valid JSON for a visual website builder.
The JSON must match this structure exactly:
{
  "content": [
    { "type": "HeroBlock", "props": { "id": "unique-id", "headline": "...", "subheadline": "...", "ctaText": "..." } },
    { "type": "HeadingBlock", "props": { "id": "unique-id", "title": "..." } },
    { "type": "TextBlock", "props": { "id": "unique-id", "content": "..." } },
    { "type": "AICustomBlock", "props": { "id": "unique-id", "prompt": "...", "generatedHtml": "..." } }
  ],
  "root": {}
}
Available block types: "HeroBlock", "HeadingBlock", "TextBlock", "AICustomBlock".
The user will provide their CURRENT layout JSON and a prompt on how to EVOLVE it. 
Rewrite the JSON to achieve their goal (e.g. change text, add blocks, remove blocks).
Do not wrap the JSON in markdown code blocks. Output ONLY raw JSON.`;
      
      userPrompt = `Current Layout JSON:\n${JSON.stringify(currentLayout)}\n\nGoal: ${prompt}`;
    } else {
      systemPrompt = `You are an expert web designer AI that outputs STRICTLY valid JSON for a visual website builder.
The JSON must match this structure exactly:
{
  "content": [
    { "type": "HeroBlock", "props": { "id": "unique-id", "headline": "...", "subheadline": "...", "ctaText": "..." } },
    { "type": "HeadingBlock", "props": { "id": "unique-id", "title": "..." } },
    { "type": "TextBlock", "props": { "id": "unique-id", "content": "..." } },
    { "type": "AICustomBlock", "props": { "id": "unique-id", "prompt": "...", "generatedHtml": "..." } }
  ],
  "root": {}
}
Available block types: "HeroBlock", "HeadingBlock", "TextBlock", "AICustomBlock".
Generate a complete, beautiful landing page layout matching the user's prompt using these blocks.
Do not wrap the JSON in markdown code blocks. Output ONLY raw JSON.`;
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen/qwen-2.5-72b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenRouter API error: ${res.statusText}`);
    }

    const aiData = await res.json();
    let textOutput = aiData.choices[0].message.content.trim();
    
    // Strip markdown code block wrappers if the AI included them
    if (textOutput.startsWith("\`\`\`json")) {
      textOutput = textOutput.replace(/^\`\`\`json\n/, "").replace(/\n\`\`\`$/, "");
    } else if (textOutput.startsWith("\`\`\`")) {
      textOutput = textOutput.replace(/^\`\`\`\n/, "").replace(/\n\`\`\`$/, "");
    }

    const generatedJson = JSON.parse(textOutput);
    
    // Ensure IDs are present and unique
    if (generatedJson.content && Array.isArray(generatedJson.content)) {
      generatedJson.content = generatedJson.content.map((block: { props?: Record<string, unknown> }) => ({
        ...block,
        props: {
          ...block.props,
          id: block.props?.id || crypto.randomUUID()
        }
      }));
    }

    return NextResponse.json(generatedJson);
  } catch (error) {
    console.error("AI Builder generation error:", error);
    return NextResponse.json({ error: "Failed to generate layout" }, { status: 500 });
  }
}

function getMockPuckData(prompt: string) {
  return {
    content: [
      {
        type: "HeroBlock",
        props: {
          id: crypto.randomUUID(),
          headline: `Generated: ${prompt}`,
          subheadline: "This is a fallback generated response because the API key is missing.",
          ctaText: "Click Here"
        }
      },
      {
        type: "HeadingBlock",
        props: {
          id: crypto.randomUUID(),
          title: "Features"
        }
      },
      {
        type: "TextBlock",
        props: {
          id: crypto.randomUUID(),
          content: "We provide amazing features for your business."
        }
      }
    ],
    root: {}
  };
}
