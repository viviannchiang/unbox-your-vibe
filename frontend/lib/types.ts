export interface CardOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  axis: "EI" | "SN" | "TF" | "JP";
  cards: CardOption[];
}

// ── Branching story quiz ───────────────────────────────────
export type Axis = "EI" | "SN" | "TF" | "JP";
export type Pole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

// One choice in a story scene. `pole` feeds scoring; `next` is the id of the
// scene this choice leads to (null = the story is over → go to the reveal).
export interface SceneCard {
  id: string;
  label: string;
  pole: Pole;
  next: string | null;
}

// A single beat of the night-market story quiz.
export interface Scene {
  id: string;
  step: number; // 1..20, used for the progress bar
  axis: Axis;
  text: string;
  cards: SceneCard[];
}

export interface PersonalityResult {
  typeCode: string;
  character: string;
  figureName: string;
  series: string;
  tagline: string;
  description: string;
  vibeWords: string[];
  thisIsYou: string[];
  groupChatVibe: string;
  compatibleWith: { type: string; character: string; figure: string }[];
  color: string;
  image: string;
}

export interface QuizAnswer {
  questionId: string;
  cardId: string;
}

export interface ScoreResponse {
  type: string;
  character: string;
  figureName: string;
}
