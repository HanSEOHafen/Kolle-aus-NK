import React, { useState } from "react";
import { Award, RefreshCw, AlertTriangle, CheckCircle2, Lightbulb, Sparkles } from "lucide-react";
import { EvaluationResult } from "../types";

export const AnalyzerView: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    `Kid, der mattschwarze Maybach rollt über's Bahnhofstraßenpflaster,
Während mein Antlitz stündlich auftaucht im Tatortfahndungsraster
Der Bundespolizei... zieh die Glock – und deine Gesichtszüge entgleisen,
Wie die Waggons der Saarbahn auf den frostüberzog'nen Gleisen!`
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const sampleBadRap = `Ich laufe durch die Stadt und habe viel Geld,
Weil mir die ganze schöne Welt so gefällt.
Ich bin der Beste Rapper hier im Haus,
Und ziehe meine neue Jacke aus.`;

  const sampleGoodRap = `Kid, der Zigarrenqualm zieht über Stahlwerk-Betonwände,
Während der Boss im Maybach sitzt und Bargeld-Depotbestände
Durchzählt... auf Maßhemden glänzen Platin-Manschettenknöpfe,
Und meine Schläger spalten Nahkampf-Experten-Köpfe!`;

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze-rhyme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barsText: inputText }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="analyzer-view-root" className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold font-serif text-white">
            Kollegah-Reimprüfer & 10-Punkte Metrik-Matrix
          </h2>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed max-w-3xl">
          Füge hier deine eigenen Rapzeilen ein. Das System prüft die Verse auf Basis von 
          6 fundamentalen Kollegah-Prüfkriterien: <strong>Silbenzählung der Endreime (5-7)</strong>, 
          <strong>Vokalreinheit (100% Assonanz)</strong>, <strong>Taktmetrik & Scansion</strong>, 
          <strong>Teekesselchen / Wortwitz</strong>, <strong>Arroganter Duktus</strong> und <strong>Neunkirchen-Integration</strong>.
        </p>

        {/* Quick Test Samples */}
        <div className="mt-4 flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-800">
          <span className="text-xs font-mono text-neutral-500">Test-Vorlagen einfügen:</span>
          <button
            type="button"
            onClick={() => setInputText(sampleBadRap)}
            className="px-3 py-1.5 rounded bg-neutral-950 text-red-400 hover:bg-neutral-800 text-xs font-mono border border-red-950/60 transition-colors"
          >
            ❌ 2/10 Standard-Reim (Geld/Welt)
          </button>
          <button
            type="button"
            onClick={() => setInputText(sampleGoodRap)}
            className="px-3 py-1.5 rounded bg-neutral-950 text-emerald-400 hover:bg-neutral-800 text-xs font-mono border border-emerald-950/60 transition-colors"
          >
            ✅ 10/10 Meister-Reim (Eisenwerk)
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl">
        <label
          htmlFor="analyzer-text-input"
          className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2"
        >
          Zu prüfende Verse (mindestens 2 bis 4 Zeilen)
        </label>
        <textarea
          id="analyzer-text-input"
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Füge hier deine Rap-Zeilen ein..."
          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-sm font-mono text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 leading-relaxed"
        />

        <div className="mt-4 flex justify-end">
          <button
            id="analyzer-submit-button"
            onClick={handleAnalyze}
            disabled={isLoading || !inputText.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-black tracking-wider text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                <span>PRÜFE REIM-METRIK...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-current" />
                <span>NACH 10-PUNKTE-MATRIX BEWERTEN</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Result */}
      {result && (
        <div id="analyzer-result-card" className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase">Auswertungsergebnis</span>
              <h3 className="text-2xl font-black font-serif text-white mt-1">
                {result.totalScore >= 8
                  ? "Boss-Niveau (Prädikat: Zuhältertape-Standard)"
                  : result.totalScore >= 5
                  ? "Akzeptabel, aber verbesserungswürdig"
                  : "Unzureichend (Standard-Zweckreime verworfen)"}
              </h3>
            </div>
            <div className="bg-neutral-950 px-6 py-3 rounded-xl border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">Gesamtnote</span>
              <span
                className={`text-3xl font-black font-mono ${
                  result.totalScore >= 8
                    ? "text-emerald-400"
                    : result.totalScore >= 5
                    ? "text-amber-400"
                    : "text-red-400"
                }`}
              >
                {result.totalScore} / 10
              </span>
            </div>
          </div>

          {result.summary && (
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-sm font-mono text-neutral-300">
              <strong className="text-amber-400">Urteil des Bosses:</strong> {result.summary}
            </div>
          )}

          {/* Criteria Grid */}
          {result.criteria && result.criteria.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                Detaillierte Kriterien-Bewertung
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.criteria.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-neutral-200 font-sans">{c.name}</span>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          c.score >= 8
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                            : c.score >= 5
                            ? "bg-amber-950 text-amber-300 border border-amber-800/40"
                            : "bg-red-950 text-red-400 border border-red-800/40"
                        }`}
                      >
                        {c.score} / {c.maxScore}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-mono mt-1">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvement Tips */}
          {result.improvementTips && result.improvementTips.length > 0 && (
            <div className="bg-neutral-950/80 p-5 rounded-lg border border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>Optimierungs-Anleitung für 10/10 Kollegah-Reim</span>
              </div>
              <ul className="space-y-1.5 text-xs font-mono text-neutral-300 list-disc list-inside">
                {result.improvementTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
