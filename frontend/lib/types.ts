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
