import React from "react";
import { Sparkles, Shield, MapPin, Music, Disc3, Award, FileCode2 } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPlayingBeat: boolean;
  toggleBeat: () => void;
  currentBeat: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isPlayingBeat,
  toggleBeat,
  currentBeat,
}) => {
  return (
    <header id="app-header" className="bg-neutral-900 border-b border-neutral-800 text-neutral-100 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Brand & Subtitle */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-black text-black text-xl shadow-lg shadow-amber-500/20 border border-amber-400/40">
                K
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-amber-400 font-serif">
                  KOLLEGAH <span className="text-white text-base sm:text-xl font-normal font-sans tracking-normal">| Boss von Neunkirchen</span>
                </h1>
                <p className="text-xs text-neutral-400 tracking-wide font-mono">
                  Deterministische Battlerap- & Reim-Architektur (Ära 2007–2011)
                </p>
              </div>
            </div>
          </div>

          {/* Controls & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Beat Player Quick Button */}
            <button
              id="header-toggle-beat"
              onClick={toggleBeat}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all border ${
                isPlayingBeat
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20"
                  : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700"
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${isPlayingBeat ? "animate-spin text-amber-400" : ""}`} />
              <span>{isPlayingBeat ? "Rizbo Beat: Läuft" : "Rizbo Beat starten"}</span>
              {isPlayingBeat && (
                <span className="flex items-center gap-1 ml-1">
                  {[1, 2, 3, 4].map((b) => (
                    <span
                      key={b}
                      className={`inline-block w-1.5 h-3 rounded-xs ${
                        currentBeat === b ? "bg-amber-400 scale-y-125" : "bg-neutral-600"
                      }`}
                    />
                  ))}
                </span>
              )}
            </button>

            {/* Quality Badges */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800 text-neutral-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Shield className="w-3 h-3" /> 5–7 Silben-Zwang
              </span>
              <span className="text-neutral-700">•</span>
              <span className="flex items-center gap-1 text-amber-300">
                <MapPin className="w-3 h-3" /> Saarland Lore
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav id="header-navigation-tabs" className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-neutral-800/80">
          <button
            id="nav-tab-generator"
            onClick={() => setActiveTab("generator")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "generator"
                ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10"
                : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Punchline-Generator</span>
          </button>

          <button
            id="nav-tab-inspector"
            onClick={() => setActiveTab("inspector")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "inspector"
                ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10"
                : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Metrik- & Vokal-Inspector</span>
          </button>

          <button
            id="nav-tab-beat"
            onClick={() => setActiveTab("beat")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "beat"
                ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10"
                : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Rizbo Beat-Studio (86 BPM)</span>
          </button>

          <button
            id="nav-tab-analyzer"
            onClick={() => setActiveTab("analyzer")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "analyzer"
                ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10"
                : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Reim-Prüfer & Matrix</span>
          </button>

          <button
            id="nav-tab-album"
            onClick={() => setActiveTab("album")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "album"
                ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10"
                : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Disc3 className="w-4 h-4" />
            <span>Stahlwerktape Vol. 1</span>
          </button>

          <button
            id="nav-tab-exporter"
            onClick={() => setActiveTab("exporter")}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === "exporter"
                ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10"
                : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>Prompt & Blueprint Export</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
