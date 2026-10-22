import React, { useState } from "react";
import { Play, Square, Volume2, FastForward, Info, Disc } from "lucide-react";
import { beatEngine } from "../utils/audioEngine";
import { BarItem } from "../types";

interface BeatPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentBeat: number;
  currentStep: number;
  bars?: BarItem[];
}

export const BeatPlayer: React.FC<BeatPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  currentBeat,
  currentStep,
  bars = [],
}) => {
  const [bpm, setBpmState] = useState<number>(86);
  const [volume, setVolumeState] = useState<number>(0.7);
  const [currentBarIndex, setCurrentBarIndex] = useState<number>(0);

  // Sync bar index every 16 steps (1 full bar)
  React.useEffect(() => {
    if (isPlaying && bars.length > 0 && currentStep === 0) {
      setCurrentBarIndex((prev) => (prev + 1) % bars.length);
    }
  }, [isPlaying, currentStep, bars.length]);

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBpmState(val);
    beatEngine.setBpm(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolumeState(val);
    beatEngine.setVolume(val);
  };

  const activeBar = bars[currentBarIndex];

  return (
    <div id="beat-player-container" className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl text-neutral-100">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              RIZBO STYLE BEAT ENGINE
            </span>
            <span className="text-xs text-neutral-400 font-mono">Web Audio Synthesizer</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1 font-serif">
            Zuhälter-Instrumental: <span className="text-amber-400">„Eisenwerk Mafia 2008“</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Klassische D-Moll Mafia-Piano-Akkorde, analoge Orchester-Blechbläser (Brass Stabs), 
            Vinyl-Knister-Schleife und trockene 86 BPM Snare auf Takt 4 (Reim-Einschlag).
          </p>
        </div>

        {/* Play/Stop & BPM */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            id="beat-player-main-toggle"
            onClick={onTogglePlay}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-black tracking-wide text-sm transition-all shadow-lg ${
              isPlaying
                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30"
                : "bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/30"
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-5 h-5 fill-current" />
                <span>BEAT STOPPEN</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>BEAT ABSPIELEN</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-4 bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800">
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-wider">Tempo</span>
              <span className="text-sm font-mono font-bold text-amber-400">{bpm} BPM</span>
            </div>
            <input
              id="beat-bpm-slider"
              type="range"
              min={70}
              max={105}
              value={bpm}
              onChange={handleBpmChange}
              className="w-24 accent-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 bg-neutral-950 px-4 py-2.5 rounded-lg border border-neutral-800">
            <Volume2 className="w-4 h-4 text-neutral-400" />
            <input
              id="beat-volume-slider"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Real-time 4/4 Beat Rhythm Visualizer */}
      <div className="mt-6 grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((beatNum) => {
          const isActive = isPlaying && currentBeat === beatNum;
          const isSnareBeat = beatNum === 2 || beatNum === 4;
          const isRhymeBeat = beatNum === 4;

          return (
            <div
              key={beatNum}
              className={`p-4 rounded-xl border text-center transition-all duration-75 ${
                isActive
                  ? isRhymeBeat
                    ? "bg-amber-500 text-neutral-950 border-amber-300 shadow-xl shadow-amber-500/40 scale-105"
                    : "bg-neutral-800 text-white border-amber-400 shadow-md"
                  : "bg-neutral-950/60 text-neutral-400 border-neutral-800"
              }`}
            >
              <div className="text-2xl font-black font-mono">BEAT {beatNum}</div>
              <div className="text-[11px] font-mono mt-1 uppercase tracking-wider font-semibold">
                {beatNum === 1 && "Kick + Brass / Piano"}
                {beatNum === 2 && "Snare Snap"}
                {beatNum === 3 && "Turnaround Piano"}
                {beatNum === 4 && "⚡ REIM-EINSCHLAG (SNARE)"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Karaoke / Teleprompter Flow Mode */}
      {bars.length > 0 && (
        <div className="mt-8 bg-neutral-950 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <Disc className={`w-4 h-4 ${isPlaying ? "animate-spin text-amber-400" : ""}`} />
              Teleprompter & Flow-Synchronisation (Takt {currentBarIndex + 1} von {bars.length})
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              Reim landet exakt auf Takt 4!
            </span>
          </div>

          {activeBar ? (
            <div className="p-6 bg-neutral-900 rounded-lg border border-neutral-800/80 shadow-inner">
              <div className="text-xs font-mono text-neutral-500 mb-2">
                BAR #{activeBar.barNumber} • {activeBar.syllables} SILBEN
              </div>
              <p className="text-lg sm:text-xl font-serif text-neutral-100 leading-relaxed">
                {activeBar.text.split(activeBar.endRhyme)[0]}
                <span
                  className={`font-black px-1.5 py-0.5 rounded transition-colors ${
                    isPlaying && currentBeat === 4
                      ? "bg-amber-400 text-neutral-950 ring-2 ring-amber-300"
                      : "text-amber-400 bg-amber-950/40 border border-amber-500/30"
                  }`}
                >
                  {activeBar.endRhyme}
                </span>
              </p>
            </div>
          ) : null}

          {/* Quick bar jump buttons */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1 scrollbar-none">
            {bars.map((b, idx) => (
              <button
                key={b.barNumber}
                onClick={() => setCurrentBarIndex(idx)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  idx === currentBarIndex
                    ? "bg-amber-500 text-neutral-950 font-bold"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                #{b.barNumber}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Metrik Pro-Tip */}
      <div className="mt-6 flex items-start gap-3 p-3 bg-neutral-950/80 rounded-lg border border-neutral-800/80 text-xs text-neutral-400 font-mono">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-neutral-200">Kollegah Flow-Formel:</strong> Beginne die Zeile mit halber Pause auf Beat 1 („Kid... [Pause]“), 
          steigere die Silbendichte in 16tel-Ketten über Beat 2 und 3, und setze den 5–7 silbigen Endreim punktgenau auf die Snare von Beat 4.
        </p>
      </div>
    </div>
  );
};
