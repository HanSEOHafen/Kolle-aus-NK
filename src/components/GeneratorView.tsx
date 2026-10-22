import React, { useState } from "react";
import { Sparkles, Copy, Check, MapPin, Zap, Flame, RefreshCw, Music2, ArrowUpRight } from "lucide-react";
import { LOCALE_PRESETS } from "../data/loreData";
import { GenerationResult, BarItem } from "../types";

interface GeneratorViewProps {
  currentResult: GenerationResult | null;
  onGenerate: (locale: string, topic: string, barsCount: number, temp: number) => Promise<void>;
  isLoading: boolean;
  onOpenInspector: () => void;
  onOpenBeatPlayer: () => void;
}

export const GeneratorView: React.FC<GeneratorViewProps> = ({
  currentResult,
  onGenerate,
  isLoading,
  onOpenInspector,
  onOpenBeatPlayer,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("bahnhofstrasse");
  const [customTopic, setCustomTopic] = useState<string>(
    "Bahnhofstraße, Saarbahn entgleisen, Fahrkarten entwerten, Schotter scheffeln, Spielotheken"
  );
  const [barsCount, setBarsCount] = useState<number>(16);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = LOCALE_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setCustomTopic(found.defaultTopic);
    }
  };

  const handleCopyLyrics = () => {
    if (!currentResult || !currentResult.bars) return;
    const fullText = currentResult.bars.map((b) => b.text).join("\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(selectedPresetId, customTopic, barsCount, temperature);
  };

  return (
    <div id="generator-view-root" className="space-y-8">
      {/* Preset Selector Bento Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 font-mono">
              Neunkirchen Schauplatz wählen
            </h3>
          </div>
          <span className="text-xs text-neutral-500 font-mono">Authentische Saarland-Lore</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {LOCALE_PRESETS.map((p) => {
            const isSelected = selectedPresetId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPreset(p.id)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:bg-neutral-850 hover:text-neutral-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-amber-400 truncate">
                    {p.name}
                  </span>
                  {isSelected && <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </div>
                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-snug">
                  {p.subline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Input Console */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="generator-topic-input"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5"
              >
                Stichwörter, Wortspiele & Fokus (Prompt)
              </label>
              <input
                id="generator-topic-input"
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="z.B. Bahnhofstraße, Saarbahn entgleisen, Fahrkarten entwerten, Kreisstadt-Subventionen..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            <div className="w-full md:w-48">
              <label
                htmlFor="generator-bars-select"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5"
              >
                Taktanzahl
              </label>
              <select
                id="generator-bars-select"
                value={barsCount}
                onChange={(e) => setBarsCount(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-500 font-mono"
              >
                <option value={8}>8 Bars (Kurzer Part)</option>
                <option value={16}>16 Bars (Klassischer Vers)</option>
                <option value={24}>24 Bars (Punchline-Massaker)</option>
              </select>
            </div>

            <div className="w-full md:w-56">
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="generator-temp-slider"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-400"
                >
                  Arroganz / Temp
                </label>
                <span className="text-xs font-mono text-amber-400">{temperature.toFixed(2)}</span>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 flex items-center">
                <input
                  id="generator-temp-slider"
                  type="range"
                  min={0.4}
                  max={1.0}
                  step={0.05}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-neutral-800/80">
            <div className="text-xs text-neutral-500 font-mono flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Garantie: 5–7 Silben Endreime, saubere Vokale, echte Teekesselchen</span>
            </div>

            <button
              id="generator-submit-button"
              type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg font-black tracking-wider text-sm transition-all shadow-lg ${
                isLoading
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-amber-500/20 active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>BERECHNE REIM-ARCHITEKTUR...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-neutral-950 fill-current" />
                  <span>PUNCHLINEGEWITTER ZÜNDEN</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Generated Verse Showcase */}
      {currentResult && (
        <div id="generated-bars-container" className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Action Header */}
          <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400">
                  {currentResult.kollegahScore}/10 METRIK NOTE
                </span>
                <span className="text-neutral-700">•</span>
                <span className="text-xs font-mono text-neutral-400">
                  {currentResult.bars?.length || 0} Bars generiert
                </span>
                {currentResult.source && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                    {currentResult.source === "gemini_live" ? "⚡ Live Gemini 3.8" : "💎 Master Handwerk"}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black font-serif text-white mt-1">
                {currentResult.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="generator-copy-lyrics-button"
                onClick={handleCopyLyrics}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Verse kopieren</span>
                  </>
                )}
              </button>

              <button
                id="generator-open-beat-button"
                onClick={onOpenBeatPlayer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors"
              >
                <Music2 className="w-3.5 h-3.5" />
                <span>Zum Beat rappen</span>
              </button>

              <button
                id="generator-open-inspector-button"
                onClick={onOpenInspector}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700"
              >
                <span>Reim-Analyse</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Lyrics Display */}
          <div className="p-6 sm:p-8 space-y-3 bg-neutral-900 font-serif text-base sm:text-lg leading-relaxed">
            {currentResult.bars?.map((bar: BarItem) => {
              // Highlight rhyme word
              const cleanText = bar.text.replace(/\*\*/g, "").replace(/\*/g, "");
              const rhyme = bar.endRhyme ? bar.endRhyme.replace(/\*\*/g, "").replace(/\*/g, "") : "";
              
              let beforeRhyme = cleanText;
              let afterRhyme = "";
              if (rhyme && cleanText.includes(rhyme)) {
                const parts = cleanText.split(rhyme);
                beforeRhyme = parts[0];
                afterRhyme = parts.slice(1).join(rhyme);
              }

              return (
                <div
                  key={bar.barNumber}
                  className="flex items-start gap-4 p-2.5 rounded-lg hover:bg-neutral-950/40 transition-colors group"
                >
                  <span className="font-mono text-xs text-neutral-600 w-7 pt-1 shrink-0 select-none group-hover:text-amber-500">
                    {String(bar.barNumber).padStart(2, "0")}
                  </span>
                  <p className="flex-1 text-neutral-100">
                    {rhyme && cleanText.includes(rhyme) ? (
                      <>
                        <span>{beforeRhyme}</span>
                        <span className="font-black text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-500/20 mx-1 underline decoration-amber-500/50 underline-offset-4">
                          {rhyme}
                        </span>
                        <span>{afterRhyme}</span>
                      </>
                    ) : (
                      <span>{cleanText}</span>
                    )}
                  </p>
                  <span className="font-mono text-[11px] text-neutral-500 shrink-0 pt-1">
                    {bar.syllables} Silben
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Punchline Preview Cards */}
          {currentResult.punchlines && currentResult.punchlines.length > 0 && (
            <div className="bg-neutral-950 p-6 border-t border-neutral-800">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Entdeckte Punchlines & Wortspiele</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentResult.punchlines.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs"
                  >
                    <div className="flex justify-between items-center text-neutral-400 font-mono mb-1.5">
                      <span className="text-amber-300 font-semibold">{p.bars}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800">
                        {p.type}
                      </span>
                    </div>
                    <div className="text-neutral-200 font-serif italic mb-2">„{p.quote}“</div>
                    <div className="text-[11px] font-mono text-neutral-400 space-y-1">
                      <div>
                        <strong className="text-neutral-300">1:</strong> {p.primaryMeaning}
                      </div>
                      <div>
                        <strong className="text-amber-400">2:</strong> {p.secondaryMeaning}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
