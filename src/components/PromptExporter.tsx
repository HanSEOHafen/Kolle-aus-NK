import React, { useState } from "react";
import { Copy, Check, FileCode, Cpu, Terminal, ShieldAlert } from "lucide-react";
import { MASTER_SYSTEM_PROMPT } from "../data/loreData";

export const PromptExporter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ai_studio" | "custom_gpt" | "python">("ai_studio");
  const [copied, setCopied] = useState<boolean>(false);

  const pythonCode = `import os
from google import genai
from google.genai import types

# Initialisierung mit Google GenAI SDK
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

SYSTEM_INSTRUCTION = """${MASTER_SYSTEM_PROMPT}"""

def generate_kollegah_neunkirchen_verse(prompt_topic: str):
    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=f"Schreibe 16 Bars Kollegah Battlerap aus Neunkirchen. Thema: {prompt_topic}",
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            temperature=0.7,
            top_p=0.92,
            top_k=40,
            response_mime_type="application/json",
        ),
    )
    print(response.text)

if __name__ == "__main__":
    generate_kollegah_neunkirchen_verse("Bahnhofstraße, Saarbahn entgleisen, Fahrkarten entwerten")
`;

  const customGptText = `You are a specialized custom GPT acting exclusively as the German battle-rap songwriting engine "KOLLEGAH - BOSS VON NEUNKIRCHEN" (Era 2007-2011: Zuhältertape 2/3, Boss der Bosse).

${MASTER_SYSTEM_PROMPT}

Format all outputs with strict metrics, syllable counts per rhyme chain, and semantic double-meaning explanations.`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="prompt-exporter-root" className="space-y-8">
      {/* Header Info */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <FileCode className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold font-serif text-white">
            System Instructions & Blueprint Export
          </h2>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed max-w-3xl">
          Kopiere den exakten, mathematisch kalibrierten System-Prompt zur Verwendung in 
          <strong> Google AI Studio</strong>, als <strong>Custom GPT (ChatGPT)</strong> oder direkt als 
          <strong> Python-Skript</strong>. Dieser Prompt garantiert 5–7 Silben-Reime und verhindert Standard-Zweckreime.
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-neutral-800">
          <button
            onClick={() => setActiveTab("ai_studio")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === "ai_studio"
                ? "bg-amber-500 text-neutral-950 font-bold"
                : "bg-neutral-950 text-neutral-400 hover:bg-neutral-800"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Google AI Studio (Gemini)</span>
          </button>

          <button
            onClick={() => setActiveTab("custom_gpt")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === "custom_gpt"
                ? "bg-amber-500 text-neutral-950 font-bold"
                : "bg-neutral-950 text-neutral-400 hover:bg-neutral-800"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Custom GPT (OpenAI / ChatGPT)</span>
          </button>

          <button
            onClick={() => setActiveTab("python")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === "python"
                ? "bg-amber-500 text-neutral-950 font-bold"
                : "bg-neutral-950 text-neutral-400 hover:bg-neutral-800"
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Python Script (Google GenAI SDK)</span>
          </button>
        </div>
      </div>

      {/* Code Box */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-neutral-950 px-6 py-3 border-b border-neutral-800 flex items-center justify-between">
          <span className="text-xs font-mono text-neutral-400">
            {activeTab === "ai_studio" && "System Instruction (Model Config)"}
            {activeTab === "custom_gpt" && "Instructions (GPT Builder)"}
            {activeTab === "python" && "app.py (Executable Python Script)"}
          </span>

          <button
            onClick={() =>
              handleCopy(
                activeTab === "ai_studio"
                  ? MASTER_SYSTEM_PROMPT
                  : activeTab === "custom_gpt"
                  ? customGptText
                  : pythonCode
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Kopiert!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>In die Zwischenablage</span>
              </>
            )}
          </button>
        </div>

        <div className="p-6 bg-neutral-950/80 overflow-x-auto max-h-[500px] scrollbar-thin scrollbar-thumb-neutral-800">
          <pre className="text-xs font-mono text-neutral-300 leading-relaxed whitespace-pre-wrap">
            {activeTab === "ai_studio" && MASTER_SYSTEM_PROMPT}
            {activeTab === "custom_gpt" && customGptText}
            {activeTab === "python" && pythonCode}
          </pre>
        </div>
      </div>

      {/* Hyperparameter Recommendations */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span>Empfohlene Hyperparameter für maximale Deterministik</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-neutral-950 p-3 rounded border border-neutral-800">
            <span className="text-neutral-500 block text-[10px]">MODEL</span>
            <span className="text-white font-bold">gemini-3.8-flash</span>
          </div>
          <div className="bg-neutral-950 p-3 rounded border border-neutral-800">
            <span className="text-neutral-500 block text-[10px]">TEMPERATURE</span>
            <span className="text-amber-400 font-bold">0.70</span>
          </div>
          <div className="bg-neutral-950 p-3 rounded border border-neutral-800">
            <span className="text-neutral-500 block text-[10px]">TOP P</span>
            <span className="text-emerald-400 font-bold">0.92</span>
          </div>
          <div className="bg-neutral-950 p-3 rounded border border-neutral-800">
            <span className="text-neutral-500 block text-[10px]">RESPONSE TYPE</span>
            <span className="text-blue-400 font-bold">application/json</span>
          </div>
        </div>
      </div>
    </div>
  );
};
