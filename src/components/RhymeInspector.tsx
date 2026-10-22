import React from "react";
import { CheckCircle2, Zap, ArrowRight, BookOpen, Layers } from "lucide-react";
import { GenerationResult } from "../types";

interface RhymeInspectorProps {
  result: GenerationResult | null;
}

export const RhymeInspector: React.FC<RhymeInspectorProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center text-neutral-400">
        <p className="font-serif text-lg text-neutral-300">Noch keine Verse generiert.</p>
        <p className="text-xs font-mono text-neutral-500 mt-2">
          Klicke im Generator auf „Punchlinegewitter zünden“, um die Reim- und Wortspiel-Architektur zu analysieren.
        </p>
      </div>
    );
  }

  return (
    <div id="rhyme-inspector-root" className="space-y-8">
      {/* Overview Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Analyse-Protokoll: Kollegah Metrik 2008
            </span>
            <h2 className="text-2xl font-black font-serif text-white mt-1">
              {result.title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-neutral-950 px-4 py-2 rounded-lg border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">Metrik-Note</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {result.kollegahScore} / 10
              </span>
            </div>
            <div className="bg-neutral-950 px-4 py-2 rounded-lg border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">Reim-Paare</span>
              <span className="text-lg font-black text-amber-400 font-mono">
                {result.rhymePairs?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Lore tags used */}
        {result.neunkirchenLoreUsed && result.neunkirchenLoreUsed.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-neutral-400">Eingebundene Neunkirchen-Orte:</span>
            {result.neunkirchenLoreUsed.map((lore, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-xs font-mono bg-neutral-800 border border-neutral-700 text-amber-300"
              >
                📍 {lore}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Rhyme Chain Matrix */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold font-serif text-white">
            Phonetische Mehrsilben-Reimketten (5–7 Silben Garantie)
          </h3>
        </div>
        <p className="text-xs text-neutral-400 mb-6">
          Jedes Reimpaar wird auf exakte Vokalkorrespondenz und Silbenanzahl geprüft.
          Kurze Standardreime (1–3 Silben) werden vom System strikt verworfen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.rhymePairs && result.rhymePairs.map((pair, idx) => (
            <div
              key={idx}
              className="bg-neutral-950 border border-neutral-800/90 rounded-lg p-4 hover:border-amber-500/40 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-amber-400 font-bold">REIMPAAR #{idx + 1}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {pair.syllables} Silben
                </span>
              </div>

              <div className="text-sm sm:text-base font-serif font-bold text-white mb-2">
                {pair.pair}
              </div>

              {pair.vowelScheme && (
                <div className="bg-neutral-900 p-2.5 rounded text-xs font-mono text-neutral-300 border border-neutral-800">
                  <span className="text-neutral-500 block text-[10px] uppercase">Vokal-Assonanz-Muster:</span>
                  <span className="text-amber-300 tracking-wider">[{pair.vowelScheme}]</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Punchline & Teekesselchen Anatomy */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold font-serif text-white">
            Punchline- & Teekesselchen-Anatomie (Bivalente Wortspiele)
          </h3>
        </div>
        <p className="text-xs text-neutral-400 mb-6">
          Aufschlüsselung der semantischen Doppelbedeutungen (Primary vs. Secondary Meaning),
          wie sie das Markenzeichen von Kollegahs Songwriting darstellen.
        </p>

        <div className="space-y-4">
          {result.punchlines && result.punchlines.map((p, idx) => (
            <div
              key={idx}
              className="bg-neutral-950 border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-neutral-400 font-semibold">{p.bars}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono">
                  {p.type}
                </span>
              </div>

              <blockquote className="text-base font-serif text-neutral-100 border-l-2 border-amber-500 pl-3 py-1 my-3 bg-neutral-900/50 italic">
                „{p.quote}“
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-neutral-850 text-xs font-mono">
                <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                  <span className="text-amber-400 font-bold block mb-1">
                    Bedeutung 1 (Setup / Milieu):
                  </span>
                  <span className="text-neutral-300 leading-relaxed">{p.primaryMeaning}</span>
                </div>
                <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                  <span className="text-emerald-400 font-bold block mb-1">
                    Bedeutung 2 (Pointe / Neunkirchen Lore):
                  </span>
                  <span className="text-neutral-300 leading-relaxed">{p.secondaryMeaning}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scansion Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold font-serif text-white">
            Takt-Scansion & Silbenfluss (12–16 Silben Flow-Korsett)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-2.5 px-3">Bar #</th>
                <th className="py-2.5 px-3">Text / Zeile</th>
                <th className="py-2.5 px-3">Silben</th>
                <th className="py-2.5 px-3">Endreim</th>
                <th className="py-2.5 px-3">Binnenreime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {result.bars && result.bars.map((b) => (
                <tr key={b.barNumber} className="hover:bg-neutral-950/60 transition-colors">
                  <td className="py-3 px-3 text-amber-400 font-bold">#{b.barNumber}</td>
                  <td className="py-3 px-3 text-neutral-200 font-sans text-sm">{b.text}</td>
                  <td className="py-3 px-3 font-mono">
                    <span
                      className={`px-1.5 py-0.5 rounded ${
                        b.syllables >= 12 && b.syllables <= 16
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                          : "bg-amber-950 text-amber-300 border border-amber-800/40"
                      }`}
                    >
                      {b.syllables} Silben
                    </span>
                  </td>
                  <td className="py-3 px-3 text-amber-300 font-bold font-sans">{b.endRhyme}</td>
                  <td className="py-3 px-3 text-neutral-400">
                    {b.internalRhymes && b.internalRhymes.length > 0 ? (
                      b.internalRhymes.join(", ")
                    ) : (
                      <span className="text-neutral-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
