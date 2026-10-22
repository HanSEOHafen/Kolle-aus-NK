import React, { useState } from "react";
import { Disc3, Play, Clock, Sparkles, FileText, Check } from "lucide-react";
import { ALBUM_TRACKS } from "../data/loreData";

interface AlbumViewProps {
  onLoadTrackToGenerator: (title: string, lyrics: string[]) => void;
}

export const AlbumView: React.FC<AlbumViewProps> = ({ onLoadTrackToGenerator }) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(1); // default track 2: Bahnhofstraße
  const [loadedTrackMsg, setLoadedTrackMsg] = useState<string | null>(null);

  const currentTrack = ALBUM_TRACKS[selectedTrackIndex];

  const handleLoad = () => {
    onLoadTrackToGenerator(currentTrack.title, currentTrack.sampleLyrics);
    setLoadedTrackMsg(`„${currentTrack.title}“ in den Generator geladen!`);
    setTimeout(() => setLoadedTrackMsg(null), 3000);
  };

  return (
    <div id="album-view-root" className="space-y-8">
      {/* Album Header & Cover Box */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Simulated Vinyl / CD Cover */}
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950/40 p-6 flex flex-col justify-between border-2 border-amber-500/30 shadow-2xl shadow-amber-950/20 shrink-0 relative overflow-hidden group">
            {/* Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/80 pointer-events-none" />
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold border border-amber-500/40 px-1.5 py-0.5 rounded">
                TAPE VOL. 1
              </span>
              <span className="text-[10px] font-mono text-neutral-400">2008 CLASSIC</span>
            </div>

            <div className="relative z-10 my-auto text-center">
              <h3 className="text-xl sm:text-2xl font-black font-serif tracking-wider text-white uppercase drop-shadow-md">
                STAHLWERK<br />
                <span className="text-amber-400 text-lg sm:text-xl font-sans font-light">TAPE</span>
              </h3>
              <p className="text-[10px] font-mono text-neutral-400 tracking-widest mt-1 uppercase">
                Der Boss von Neunkirchen
              </p>
            </div>

            <div className="relative z-10 flex justify-between items-end text-[10px] font-mono text-neutral-500 border-t border-neutral-800 pt-2">
              <span>SAAR-LAND RECORDS</span>
              <span className="text-amber-400 font-bold">100% PURITY</span>
            </div>
          </div>

          {/* Album Information */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div className="inline-block px-3 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              OFFIZIELLES ALBUM-KONZEPT
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight">
              KOLLEGAH: STAHLWERKTAPE VOL. 1
            </h2>
            <p className="text-sm font-sans text-neutral-300 leading-relaxed max-w-2xl">
              Das ultimative Meisterwerk des Neunkircher Gangsta-Raps. 
              Vollständige Symbiose aus montanindustrieller Saarland-Historie (Carl Ferdinand Freiherr von Stumm-Halberg), 
              grenzüberschreitendem Lothringen-Schmuggel und der unbarmherzigen Härte der Neunkircher Bahnhofstraße.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1">
                <Disc3 className="w-4 h-4 text-amber-400" /> 5 Anspielstationen
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-neutral-400" /> Gesamtlänge: 16:12 Min
              </span>
              <span>•</span>
              <span className="text-emerald-400">Zuhältertape Ära 2008</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tracklist & Interactive Lyrics Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tracklist Column */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-xl">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
            <Disc3 className="w-4 h-4" />
            <span>Tracklist (Stahlwerktape)</span>
          </h3>

          <div className="space-y-2">
            {ALBUM_TRACKS.map((t, idx) => {
              const isSelected = selectedTrackIndex === idx;
              return (
                <button
                  key={t.trackNo}
                  onClick={() => setSelectedTrackIndex(idx)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-500/10"
                      : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-850 hover:text-neutral-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected ? "text-amber-400" : "text-neutral-600"
                      }`}
                    >
                      {String(t.trackNo).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-sm font-serif font-bold text-neutral-100 truncate max-w-[170px] sm:max-w-[220px]">
                        {t.title}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-500 truncate">
                        {t.theme}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-neutral-500">{t.duration}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Track Detail & Reader */}
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  TRACK #{currentTrack.trackNo} • {currentTrack.duration}
                </span>
                <h3 className="text-2xl font-black font-serif text-white mt-0.5">
                  {currentTrack.title}
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Thema: {currentTrack.theme}
                </p>
              </div>

              <button
                onClick={handleLoad}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all shadow-md shadow-amber-500/20 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>In Generator laden</span>
              </button>
            </div>

            {loadedTrackMsg && (
              <div className="mb-4 p-2.5 rounded bg-emerald-950 border border-emerald-800/60 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{loadedTrackMsg}</span>
              </div>
            )}

            {/* Hook */}
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800/80 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 block mb-1">
                Refrain / Hook:
              </span>
              <p className="text-sm font-serif italic text-neutral-200">
                „{currentTrack.hook}“
              </p>
            </div>

            {/* Lyrics */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                Auszug aus den Strophen (Master-Metrik):
              </span>
              <div className="space-y-2 bg-neutral-950 p-4 rounded-lg border border-neutral-850 font-serif text-sm sm:text-base text-neutral-100 leading-relaxed">
                {currentTrack.sampleLyrics.map((line, lIdx) => (
                  <p key={lIdx} className="hover:text-amber-300 transition-colors">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Liner notes footer */}
          <div className="mt-8 pt-4 border-t border-neutral-800 text-xs font-mono text-neutral-500 flex items-center justify-between">
            <span>Produziert von Rizbo & Kollegah</span>
            <span>Recorded im Eisenwerk Neunkirchen</span>
          </div>
        </div>
      </div>
    </div>
  );
};
