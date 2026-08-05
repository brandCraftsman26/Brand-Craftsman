"use client";

import React, { useState } from "react";
import { FiCheckCircle, FiCopy, FiRefreshCcw, FiShield, FiEdit3, FiUser } from "react-icons/fi";

const tools = [
  { id: "grammar-check", name: "Grammar & Style Check", icon: <FiEdit3 />, description: "Fix typos, grammar, and improve sentence structure." },
  { id: "plagiarism-check", name: "Plagiarism Detection", icon: <FiShield />, description: "Analyze text for AI generation or copied content." },
  { id: "humanizer", name: "AI Bypass / Humanizer", icon: <FiUser />, description: "Rewrite text to bypass AI detectors and sound natural." },
];

export default function AIToolsPage() {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputText, toolName: selectedTool.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      // API might wrap in choices depending on our route. Let's assume it returns { choices: [{ message: { content: ... } }] }
      // Wait, our route returns openRouter response directly or json? 
      // The current API code says:
      // const response = await fetch(OPENROUTER_API_URL, ...);
      // const data = await response.json();
      // return NextResponse.json(data);
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setOutputText(data.choices[0].message.content);
      } else {
        // Fallback if data is raw string
        setOutputText(JSON.stringify(data));
      }
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An error occurred during generation.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(outputText);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch (err) {
      // Fallback for when document loses focus or Clipboard API fails
      const textArea = document.createElement("textarea");
      textArea.value = outputText;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (e) {
        console.error("Fallback copy failed", e);
      }
      document.body.removeChild(textArea);
    }
    alert("Copied to clipboard!");
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Writing Tools</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Enhance your content, check for plagiarism, and humanize AI text.
        </p>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setSelectedTool(tool);
              setOutputText("");
            }}
            className={`p-6 rounded-2xl border text-left transition-all ${
              selectedTool.id === tool.id
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-2 ring-blue-500/20"
                : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 ${
              selectedTool.id === tool.id ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-500"
            }`}>
              {tool.icon}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">{tool.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tool.description}</p>
          </button>
        ))}
      </div>

      {/* Editor Area */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 dark:bg-zinc-950/50 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            {selectedTool.icon}
          </div>
          <h2 className="font-bold text-gray-900 dark:text-white">{selectedTool.name}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-zinc-800 h-[500px]">
          {/* Input */}
          <div className="flex flex-col">
            <textarea
              className="flex-1 p-6 bg-transparent border-none focus:ring-0 resize-none text-gray-900 dark:text-gray-100 outline-none"
              placeholder="Paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="p-4 border-t border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-950/30">
              <span className="text-xs text-gray-500">{inputText.length} characters</span>
              <button
                onClick={handleGenerate}
                disabled={loading || !inputText.trim()}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <><FiRefreshCcw className="animate-spin" /> Processing...</>
                ) : (
                  <><FiCheckCircle /> Process Text</>
                )}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col bg-gray-50/50 dark:bg-zinc-900/50">
            {error ? (
              <div className="flex-1 p-6 text-red-500 flex flex-col items-center justify-center text-center">
                <FiShield className="w-12 h-12 mb-4 opacity-50" />
                <p className="font-medium">{error}</p>
              </div>
            ) : outputText ? (
              <div className="flex-1 p-6 overflow-y-auto text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                {outputText}
              </div>
            ) : (
              <div className="flex-1 p-6 flex items-center justify-center text-gray-400 dark:text-gray-600 flex-col text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-4 text-2xl">
                  {selectedTool.icon}
                </div>
                <p>Results will appear here.</p>
              </div>
            )}
            
            <div className="p-4 border-t border-gray-200 dark:border-zinc-800 flex justify-end bg-gray-50 dark:bg-zinc-950/30">
              <button
                onClick={copyToClipboard}
                disabled={!outputText}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors disabled:opacity-50"
              >
                <FiCopy /> Copy Result
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
