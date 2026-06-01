// Ported from the former Python backend (services/scoring.py).
// Runs entirely in the browser — no server needed.

import { QUESTIONS } from "@/lib/data/questions";
import type { QuizAnswer } from "@/lib/types";

const MBTI_TO_CHARACTER: Record<string, string> = {
  INFP: "Nyota", INFJ: "Nyota", ISFP: "Nyota", ISFJ: "Nyota",
  INTJ: "Hirono", INTP: "Hirono", ENTJ: "Hirono", ISTP: "Hirono",
  ENFP: "Lulu", ENTP: "Hirono", ENFJ: "Nyota", ESTP: "Lulu",
  ESFJ: "Lulu", ESFP: "Lulu", ESTJ: "Lulu", ISTJ: "Lulu",
};

// Ties default to I, N, F, P
const TIE_DEFAULTS: Record<string, string> = {
  EI: "I", SN: "N", TF: "F", JP: "P",
};

/** Returns the internal { type, character } from a list of answers. */
export function scoreAnswers(answers: QuizAnswer[]): {
  type: string;
  character: string;
} {
  const questionMap = new Map(QUESTIONS.map((q) => [q.id, q]));
  const axisScores: Record<string, Record<string, number>> = {
    EI: { E: 0, I: 0 },
    SN: { S: 0, N: 0 },
    TF: { T: 0, F: 0 },
    JP: { J: 0, P: 0 },
  };

  for (const answer of answers) {
    const q = questionMap.get(answer.questionId);
    if (!q) continue;
    const card = q.cards.find((c) => c.id === answer.cardId);
    if (!card) continue;
    for (const [pole, pts] of Object.entries(card.scores)) {
      axisScores[q.axis][pole] += pts;
    }
  }

  let type = "";
  for (const [axis, poles] of Object.entries(axisScores)) {
    const [p1, p2] = [axis[0], axis[1]];
    if (poles[p1] > poles[p2]) type += p1;
    else if (poles[p2] > poles[p1]) type += p2;
    else type += TIE_DEFAULTS[axis];
  }

  return { type, character: MBTI_TO_CHARACTER[type] ?? "Nyota" };
}

/** Slugify a figure name — must match the backend/frontend convention. */
export function slugifyFigure(name: string): string {
  return name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
}
