import { LocalePreset, GenerationResult } from "../types";

export const LOCALE_PRESETS: LocalePreset[] = [
  {
    id: "bahnhofstrasse",
    name: "Bahnhofstraße",
    subline: "Wettbüros, Entgleisungen & Tatort-Rekorde",
    tags: ["Saarbahn", "Entgleisen", "Schotter", "Fahrscheine"],
    description:
      "Die Hauptschlagader des Neunkircher Untergrunds. Treffpunkt für Drogendeals zwischen Spielotheken und dem Hauptbahnhof.",
    defaultTopic: "Bahnhofstraße, Saarbahn entgleisen, Fahrkarten entwerten, Schotter scheffeln",
  },
  {
    id: "eisenwerk",
    name: "Eisenwerk & Hochofen",
    subline: "Stahlwerk-Betonwände & Hochofen-Abstiche",
    tags: ["Kaltwalzwerk", "Schlacke", "Hochofen", "Roheisen"],
    description:
      "Die monumentale Industrieruine des Neunkircher Eisenwerks. Ort für dunkle Hinrichtungen und geheime Kaltwalzwerk-Geschäfte.",
    defaultTopic: "Eisenwerk, Hochofen-Abstiche, Kaltwalzwerk, Stahlwerk-Betonwände",
  },
  {
    id: "saarpark",
    name: "Saarpark-Center",
    subline: "Schutzgeld-Erpressung & Marmorböden",
    tags: ["Boutiquen", "Marmor", "Juwelier", "Pelzmantel"],
    description:
      "Das größte Einkaufszentrum des Saarlandes. Der Boss schreitet im Chinchilla-Pelz über Marmorfliesen, während Wachdienste devot nicken.",
    defaultTopic: "Saarpark-Center, Schutzgelderpressung, Juweliere, Chinchillapelz",
  },
  {
    id: "stummplatz",
    name: "Stummplatz & Carl Ferdinand",
    subline: "König Stumm Homophone & Industrie-Dynastie",
    tags: ["König Stumm", "Monopol", "Imperium", "Denkmal"],
    description:
      "Das Denkmal des Stahlbarons Carl Ferdinand von Stumm. Der Boss inszeniert sich als legitimer Erbe der saarländischen Monopolherrschaft.",
    defaultTopic: "Stummplatz, Freiherr von Stumm, stumme Zeugen, Industrie-Monopol",
  },
  {
    id: "blies",
    name: "Flussbett der Blies",
    subline: "Wiebelskirchen & Leichenbeseitigung",
    tags: ["Flussbett", "Zement", "Wiebelskirchen", "Nebel"],
    description:
      "Die dunklen Strömungen der Blies. Wo unliebsame Konkurrenten mit Zementblöcken an den Füßen spurlos in der Nacht versenkt werden.",
    defaultTopic: "Flussbett der Blies, Zementfässer, Wiebelskirchen, Leichenbeseitigung",
  },
  {
    id: "lothringen",
    name: "Lothringen-Korridor",
    subline: "A620 Schmuggel & Forbach-Connection",
    tags: ["Grenze", "Forbach", "Marseille", "Zollfahndung"],
    description:
      "Die Transit-Route über Forbach nach Frankreich. Kokain- und Waffenschmuggel im Maybach ohne Halt an den Zollstationen.",
    defaultTopic: "Lothringen, Forbach-Express, Grenzen überschreiten, A620",
  },
];

export const ALBUM_TRACKS: {
  trackNo: number;
  title: string;
  duration: string;
  theme: string;
  hook: string;
  sampleLyrics: string[];
}[] = [
  {
    trackNo: 1,
    title: "Intro (König Stumm Reinkarnation)",
    duration: "2:45",
    theme: "Carl Ferdinand Freiherr von Stumm-Halberg Mythos",
    hook: "Aus den Ruinen des Kaltwalzwerks ersteht der Boss... Neunkirchen brennt unter Hochofen-Glut.",
    sampleLyrics: [
      "Kid, mein Stammbaum reicht zurück zu saarländischen Montan-Baronen,",
      "Ich befehle nachts im Seidenmantel Stahlschmelzer-Kolonnen.",
      "Du betrittst den Stummplatz und fällst ehrfürchtig auf die Knie,",
      "Denn hier herrscht kein Rechtsstaat, sondern die Boss-Monarchie.",
    ],
  },
  {
    trackNo: 2,
    title: "Bahnhofstraße (Maximales Punchlinegewitter)",
    duration: "3:30",
    theme: "Schlagring-Disziplin, Saarbahn-Entgleisungen, Ticket-Entwertung",
    hook: "Die Bahnhofstraße ist mein Wohnzimmer... Maybach auf Kopfsteinpflaster, Rolex am Handgelenk.",
    sampleLyrics: [
      "Kid, der mattschwarze Maybach rollt über's Bahnhofstraßenpflaster,",
      "Während mein Antlitz stündlich auftaucht im Tatortfahndungsraster!",
      "Zieh die Glock – und deine Gesichtszüge entgleisen,",
      "Wie die Waggons der Saarbahn auf den frostüberzog'nen Gleisen!",
      "Ich mach Bares am Hauptbahnhof und scheffel Schotter wie Gleisbaukolonnen,",
      "Kauf Straßenzüge auf dank gigantischer Kreisstadt-Subventionen!",
    ],
  },
  {
    trackNo: 3,
    title: "Eisenwerk-Kartell ft. Rizbo",
    duration: "3:15",
    theme: "Roheisen, Kokillenguss und Hinrichtungen im Walzwerk",
    hook: "Rauch aus den Schlote, Blei in den Läufen. Der Boss von Neunkirchen.",
    sampleLyrics: [
      "Kid, der Zigarrenqualm zieht über Stahlwerk-Betonwände,",
      "Während der Boss im Maybach sitzt und Bargeld-Depotbestände",
      "Durchzählt... auf Maßhemden glänzen Platin-Manschettenknöpfe,",
      "Und meine Schläger spalten Nahkampf-Experten-Köpfe!",
      "Man kennt mich im Saargebiet dank der Hochofen-Abstiche,",
      "Weil ich Nichtsnutze wie dich nachts am Hauptbahnhof abstiche!",
    ],
  },
  {
    trackNo: 4,
    title: "Marmorböden im Saarpark-Center",
    duration: "3:12",
    theme: "Schutzgeld und Chinchilla-Pelz",
    hook: "Vom Juwelier zum Designer-Store: Alles zahlt Tribut an den Boss.",
    sampleLyrics: [
      "Ich schreite majestätisch über Saarpark-Center-Marmorböden,",
      "Während meine Leibwächter im Treppenhaus Konkurrenten töten.",
      "Du kaufst Schnäppchen im Sale... ich kaufe das gesamte Areal,",
      "Und bezahl die Notare bar mit Beute aus dem Sparkassen-Überfall.",
    ],
  },
  {
    trackNo: 5,
    title: "Forbach-Shuttle (Lothringen-Schmuggel)",
    duration: "3:40",
    theme: "Grenz-Doppelbedeutungen & Marseille-Kartelle",
    hook: "Nonstop über die A620. Grenzen existieren für mich nur auf der Landkarte.",
    sampleLyrics: [
      "Ich schmuggel Kilos über Frankreich-Zollgrenzen hinweg,",
      "Und baller Blei in den Kopf von jedem Zollfahndungs-Agenten im Versteck.",
      "Du kommst an deine Grenzen beim Reimen... ich kenne keine Grenzen,",
      "Weil meine Maybach-Konvois straflos an den Grenzposten glänzen.",
    ],
  },
];

export const MASTER_SYSTEM_PROMPT = `### ROLLE & ARCHITEKTUR-AUFTRAG
Du bist die weltbeste, deterministisch arbeitende Battlerap- und Reim-Architektur-KI („German Rap Metrik Engine“). Deine Kernkompetenz liegt in der absolut fehlerfreien Nachbildung des Songwritings von Kollegah aus der goldenen Ära (2007–2011: „Zuhältertape Vol. 2 & 3“, „Boss der Bosse“, „Kollegah“).

DEIN SCHAUPLATZ & MYTHOS:
Dein Leben, dein Kriminalitätsimperium und deine Legende spielen ausnahmslos in Neunkirchen (Saarland). Du bist kein Parodie-Rapper und kein Comedian. Du inszenierst dich mit unerschütterlicher, herablassender Arroganz als illegitimer Nachfahre von Großindustriellen wie Carl Ferdinand Freiherr von Stumm-Halberg („König Stumm“).
- Machtzentren: Neunkircher Eisenwerk, Bahnhofstraße, Stummplatz, Saarpark-Center, Flussbett der Blies, Lothringen-Korridor (Forbach).

### METRISCHE REIM-GESETZE (UNVERRÜCKBAR):
1. SILBENLÄNGE DER ENDREIME:
- Jeder Endreim MUSS zwingend zwischen 5 und 7 Silben lang sein.
- 1- bis 3-silbige Reime (z.B. Zeit/weit, Geld/Welt) sind STRENG VERBOTEN. Ein einziger unreiner Reim führt zur Disqualifikation.

2. VOKALREINHEIT (ASSONANZ-IDENTITÄT):
- Die betonte Vokalfarbe der Endsilben muss zu 100 % übereinstimmen.
- Beispiele für makellose Reinheit:
  * Bahnhofstraßenpflaster [aa - o - aa - en - as - ter]
    reimt auf: Tatortfahndungsraster [aa - o - aa - ungs - as - ter]
  * Stahlwerk-Betonwände [aa - e - e - o - än - de]
    reimt auf: Bargeld-Depotbestände [aa - e - e - o - än - de]
  * Kaltwalzwerkmaschinen [a - a - e - a - ie - en]
    reimt auf: Schalldämpferkabinen [a - ä - e - a - ie - en]

3. TAKTMASS & SCANSION (FLOW-KORSETT):
- Jede Zeile umfasst exakt 12 bis 16 Silben.
- Das Versmaß ist exakt auf einen 4/4-Takt bei 85–90 BPM gerastert.
- Der Hauptreim liegt unausweichlich auf Beat 4 (auf der Snare).

4. PUNCHLINE- UND WORTFÜHRUNGS-STRUKTUR:
- Teekesselchen / Homophone (Der Spit): Dasselbe Wort am Zeilenende mit zwei radikal verschiedenen Bedeutungen.
- Bivalente Wie-Vergleiche: Mindestens eine Doppeldeutigkeit pro Vergleichspaar.
- Sprachliche Dichotomie: Hyper-akademisches Fachvokabular (Jurisprudenz, Ökonomie, Metallurgie) gepaart mit roher Zuhälter- und Schläger-Brutalität.`;
