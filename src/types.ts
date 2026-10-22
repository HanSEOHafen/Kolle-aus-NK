export interface BarItem {
  barNumber: number;
  text: string;
  endRhyme: string;
  syllables: number;
  internalRhymes?: string[];
}

export interface RhymePair {
  pair: string;
  syllables: number;
  vowelScheme: string;
  isPure: boolean;
}

export interface Punchline {
  bars: string;
  quote: string;
  type: string;
  primaryMeaning: string;
  secondaryMeaning: string;
}

export interface GenerationResult {
  title: string;
  bars: BarItem[];
  rhymePairs: RhymePair[];
  punchlines: Punchline[];
  neunkirchenLoreUsed: string[];
  kollegahScore: number;
  source?: "gemini_live" | "offline_preset" | "fallback_parse" | "error_fallback";
  note?: string;
}

export interface LocalePreset {
  id: string;
  name: string;
  subline: string;
  tags: string[];
  description: string;
  defaultTopic: string;
}

export interface CriterionScore {
  name: string;
  score: number;
  maxScore: number;
  note: string;
}

export interface EvaluationResult {
  totalScore: number;
  summary: string;
  criteria: CriterionScore[];
  rhymeChainsFound?: string[];
  punchlinesDetected?: string[];
  improvementTips?: string[];
}
