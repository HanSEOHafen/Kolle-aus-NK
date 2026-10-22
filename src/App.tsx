import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { GeneratorView } from "./components/GeneratorView";
import { RhymeInspector } from "./components/RhymeInspector";
import { BeatPlayer } from "./components/BeatPlayer";
import { AnalyzerView } from "./components/AnalyzerView";
import { AlbumView } from "./components/AlbumView";
import { PromptExporter } from "./components/PromptExporter";
import { beatEngine } from "./utils/audioEngine";
import { GenerationResult } from "./types";

// Master seed preset for initial instant loading
const INITIAL_BAHNHOFSTRASSE_RESULT: GenerationResult = {
  title: "Neunkircher Bahnhofstraße (Maximales Punchlinegewitter)",
  kollegahScore: 10,
  source: "gemini_live",
  neunkirchenLoreUsed: [
    "Bahnhofstraße",
    "Saarbahn-Waggons",
    "Hauptbahnhof Neunkirchen",
    "Spielotheken",
    "Stahlwerk-Betonwände",
  ],
  bars: [
    {
      barNumber: 1,
      text: "Kid, der mattschwarze Maybach rollt über's Bahnhofstraßenpflaster,",
      endRhyme: "Bahnhofstraßenpflaster",
      syllables: 15,
      internalRhymes: ["mattschwarz", "Maybach"],
    },
    {
      barNumber: 2,
      text: "Während mein Antlitz stündlich auftaucht im Tatortfahndungsraster",
      endRhyme: "Tatortfahndungsraster",
      syllables: 14,
      internalRhymes: ["Antlitz", "auftaucht"],
    },
    {
      barNumber: 3,
      text: "Der Bundespolizei... zieh die Glock – und deine Gesichtszüge entgleisen,",
      endRhyme: "Gesichtszüge entgleisen",
      syllables: 15,
      internalRhymes: ["Bundespolizei", "Glock"],
    },
    {
      barNumber: 4,
      text: "Wie die Waggons der Saarbahn auf den frostüberzog'nen Gleisen!",
      endRhyme: "frostüberzog'nen Gleisen",
      syllables: 14,
      internalRhymes: ["Waggons", "Saarbahn"],
    },
    {
      barNumber: 5,
      text: "Ich mach Bares am Hauptbahnhof und scheffel Schotter wie Gleisbaukolonnen,",
      endRhyme: "Gleisbaukolonnen",
      syllables: 15,
      internalRhymes: ["Bares", "Bahnhof", "Schotter"],
    },
    {
      barNumber: 6,
      text: "Kauf Straßenzüge auf dank gigantischer Kreisstadt-Subventionen,",
      endRhyme: "Kreisstadt-Subventionen",
      syllables: 14,
      internalRhymes: ["Straßenzüge", "gigantisch"],
    },
    {
      barNumber: 7,
      text: "Und lass dein Gesicht per Hieb mit dem Schlagring schlagartig entwerten,",
      endRhyme: "schlagartig entwerten",
      syllables: 15,
      internalRhymes: ["Gesicht", "Schlagring"],
    },
    {
      barNumber: 8,
      text: "Wie die Fahrscheine am Bahngleis von den Bahnhofs-Ticket-Experten!",
      endRhyme: "Bahnhofs-Ticket-Experten",
      syllables: 15,
      internalRhymes: ["Fahrscheine", "Bahngleis"],
    },
    {
      barNumber: 9,
      text: "Der Boss wickelt nachts in der Spielothek seine Schwarzgeld-Transporte",
      endRhyme: "Schwarzgeld-Transporte",
      syllables: 14,
      internalRhymes: ["Spielothek", "nachts"],
    },
    {
      barNumber: 10,
      text: "Lässig ab... und bricht damit spielend die Tatort-Rekorde",
      endRhyme: "Tatort-Rekorde",
      syllables: 13,
      internalRhymes: ["lässig", "spielend"],
    },
    {
      barNumber: 11,
      text: "Im Saargebiet... hier regiert der Boss nach Stahlbaron-Traditionen,",
      endRhyme: "Stahlbaron-Traditionen",
      syllables: 15,
      internalRhymes: ["Saargebiet", "regiert"],
    },
    {
      barNumber: 12,
      text: "Und bricht Schlägerknochen dank perfekter Nahkampfsport-Präzisionen!",
      endRhyme: "Nahkampfsport-Präzisionen",
      syllables: 15,
      internalRhymes: ["Schlägerknochen", "perfekt"],
    },
    {
      barNumber: 13,
      text: "Du suchst am Bahnsteig verzweifelt nach der passenden Zugverbindung,",
      endRhyme: "passenden Zugverbindung",
      syllables: 15,
      internalRhymes: ["Bahnsteig", "verzweifelt"],
    },
    {
      barNumber: 14,
      text: "Während der Boss Kilos schmuggelt dank der Marseille-Kartell-Verbindung!",
      endRhyme: "Marseille-Kartell-Verbindung",
      syllables: 15,
      internalRhymes: ["Kilos", "schmuggelt"],
    },
    {
      barNumber: 15,
      text: "Zigarrenqualm zieht majestätisch über Stahlwerk-Betonwände,",
      endRhyme: "Stahlwerk-Betonwände",
      syllables: 14,
      internalRhymes: ["Zigarrenqualm", "majestätisch"],
    },
    {
      barNumber: 16,
      text: "Und die Neunkircher Bahnhofstraße füllt meine Bargeld-Depotbestände!",
      endRhyme: "Bargeld-Depotbestände",
      syllables: 15,
      internalRhymes: ["Bahnhofstraße", "Depot"],
    },
  ],
  rhymePairs: [
    {
      pair: "Bahnhofstraßenpflaster / Tatortfahndungsraster",
      syllables: 6,
      vowelScheme: "aa - o - aa - en - as - ter",
      isPure: true,
    },
    {
      pair: "Gesichtszüge entgleisen / frostüberzog'nen Gleisen",
      syllables: 5,
      vowelScheme: "e - i - ü - e - ent - glei - sen / ost - ü - er - tsog - nen - glei - sen",
      isPure: true,
    },
    {
      pair: "Gleisbaukolonnen / Kreisstadt-Subventionen",
      syllables: 6,
      vowelScheme: "ei - bau - ko - lon - nen / eis - statt - sup - ven - tsio - nen",
      isPure: true,
    },
    {
      pair: "schlagartig entwerten / Bahnhofs-Ticket-Experten",
      syllables: 6,
      vowelScheme: "a - ar - tig - ent - wer - ten / aa - ofs - tik - ket - eks - per - ten",
      isPure: true,
    },
    {
      pair: "Schwarzgeld-Transporte / Tatort-Rekorde",
      syllables: 5,
      vowelScheme: "ar - ts - geld - trans - por - te / aa - tort - re - kor - de",
      isPure: true,
    },
    {
      pair: "Stahlbaron-Traditionen / Nahkampfsport-Präzisionen",
      syllables: 7,
      vowelScheme: "aa - ba - ron - tra - di - tsio - nen / aa - kampf - sport - pre - tsi - tsio - nen",
      isPure: true,
    },
    {
      pair: "passenden Zugverbindung / Marseille-Kartell-Verbindung",
      syllables: 5,
      vowelScheme: "pas - sen - den - tsuuk - fer - bin - dung / mar - seil - kar - tell - fer - bin - dung",
      isPure: true,
    },
    {
      pair: "Stahlwerk-Betonwände / Bargeld-Depotbestände",
      syllables: 6,
      vowelScheme: "aa - e - e - o - än - de / aa - e - e - o - än - de",
      isPure: true,
    },
  ],
  punchlines: [
    {
      bars: "Bar 3/4",
      quote: "deine Gesichtszüge entgleisen, / Wie die Waggons der Saarbahn auf den frostüberzog'nen Gleisen!",
      type: "Metaphorischer Wie-Vergleich / Bivalenz-Verb",
      primaryMeaning: "Gesichtszüge entgleisen: Schock und Todesangst vor der Waffe",
      secondaryMeaning: "Physische Entgleisung der Saarbahn-Züge auf vereisten Schienen im Saarland",
    },
    {
      bars: "Bar 5/6",
      quote: "scheffel Schotter wie Gleisbaukolonnen, / Kauf Straßenzüge auf dank gigantischer Kreisstadt-Subventionen",
      type: "Teekesselchen-Vergleich",
      primaryMeaning: "Schotter: Umgangssprachlich für massive Mengen Bargeld",
      secondaryMeaning: "Gleisbauschotter (Gesteinsbett der Bahngleise)",
    },
    {
      bars: "Bar 7/8",
      quote: "lass dein Gesicht... schlagartig entwerten, / Wie die Fahrscheine am Bahngleis von den Bahnhofs-Ticket-Experten",
      type: "Doppelbedeutung (Entwerten)",
      primaryMeaning: "Gesicht per Schlagring zerschlagen und jeden ästhetischen Wert rauben",
      secondaryMeaning: "Fahrkarten am Automaten abstempeln/entwerten",
    },
    {
      bars: "Bar 13/14",
      quote: "suchst am Bahnsteig nach der passenden Zugverbindung, / Während der Boss Kilos schmuggelt dank der Marseille-Kartell-Verbindung!",
      type: "Spit / Homophon (Verbindung)",
      primaryMeaning: "Zugverbindung im Fahrplan der Deutschen Bahn",
      secondaryMeaning: "Internationale Drogenkartell-Verbindung nach Marseille / Frankreich",
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("generator");
  const [isPlayingBeat, setIsPlayingBeat] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentResult, setCurrentResult] = useState<GenerationResult | null>(
    INITIAL_BAHNHOFSTRASSE_RESULT
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    beatEngine.setOnBeat((beat, step) => {
      setCurrentBeat(beat);
      setCurrentStep(step);
    });
  }, []);

  const toggleBeat = () => {
    if (isPlayingBeat) {
      beatEngine.stop();
      setIsPlayingBeat(false);
    } else {
      beatEngine.start();
      setIsPlayingBeat(true);
    }
  };

  const handleGenerate = async (
    locale: string,
    topic: string,
    barsCount: number,
    temp: number
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-bars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          localePreset: locale,
          topic,
          barsCount,
          temperature: temp,
        }),
      });
      const data: GenerationResult = await res.json();
      setCurrentResult(data);
    } catch (err) {
      console.error("Error generating bars:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadTrackFromAlbum = (title: string, lyrics: string[]) => {
    const bars = lyrics.map((line, idx) => {
      const words = line.trim().split(" ");
      const lastWord = words[words.length - 1].replace(/[!,.;]/g, "");
      return {
        barNumber: idx + 1,
        text: line,
        endRhyme: lastWord,
        syllables: 14,
      };
    });

    setCurrentResult({
      title,
      kollegahScore: 10,
      neunkirchenLoreUsed: ["Eisenwerk", "Stahlbaron", "Stummplatz", "Bahnhofstraße"],
      bars,
      rhymePairs: [
        {
          pair: `${bars[0]?.endRhyme || "Ende 1"} / ${bars[1]?.endRhyme || "Ende 2"}`,
          syllables: 6,
          vowelScheme: "Klassische Assonanz-Kette",
          isPure: true,
        },
      ],
      punchlines: [
        {
          bars: "Bars 1/2",
          quote: bars[0]?.text || "",
          type: "Metaphorischer Wie-Vergleich",
          primaryMeaning: "Zuhälter- und Schläger-Brutalität im Saargebiet",
          secondaryMeaning: "Tradition der Montanindustrie des 19. Jahrhunderts",
        },
      ],
    });
    setActiveTab("generator");
  };

  return (
    <div id="app-root" className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPlayingBeat={isPlayingBeat}
        toggleBeat={toggleBeat}
        currentBeat={currentBeat}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "generator" && (
          <GeneratorView
            currentResult={currentResult}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            onOpenInspector={() => setActiveTab("inspector")}
            onOpenBeatPlayer={() => setActiveTab("beat")}
          />
        )}

        {activeTab === "inspector" && (
          <RhymeInspector result={currentResult} />
        )}

        {activeTab === "beat" && (
          <BeatPlayer
            isPlaying={isPlayingBeat}
            onTogglePlay={toggleBeat}
            currentBeat={currentBeat}
            currentStep={currentStep}
            bars={currentResult?.bars || []}
          />
        )}

        {activeTab === "analyzer" && <AnalyzerView />}

        {activeTab === "album" && (
          <AlbumView onLoadTrackToGenerator={handleLoadTrackFromAlbum} />
        )}

        {activeTab === "exporter" && <PromptExporter />}
      </main>

      <footer className="bg-neutral-900 border-t border-neutral-800 py-6 text-center text-xs font-mono text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>KOLLEGAH: DER BOSS VON NEUNKIRCHEN © 2008–2026</span>
          <span className="text-neutral-400">
            Saarland Battlerap Metrik-Engine • Carl Ferdinand Freiherr von Stumm-Halberg Legacy
          </span>
          <span className="text-amber-500 font-bold">100% REIM-REINHEIT</span>
        </div>
      </footer>
    </div>
  );
}
