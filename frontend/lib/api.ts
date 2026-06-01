// Fully client-side data layer — no backend required.
// Quiz data + scoring were ported from the former FastAPI backend so the app
// can run as a static site (e.g. GitHub Pages).

import type { Question, PersonalityResult, QuizAnswer, ScoreResponse } from "./types";
import { QUESTIONS } from "./data/questions";
import { PERSONALITIES } from "./data/personalities";
import { scoreAnswers, slugifyFigure } from "./scoring";

export const api = {
  // Public questions — scores stripped, matching the old API shape.
  async getQuestions(): Promise<Question[]> {
    return QUESTIONS.map((q) => ({
      id: q.id,
      text: q.text,
      axis: q.axis,
      cards: q.cards.map((c) => ({ id: c.id, label: c.label })),
    }));
  },

  async submitAnswers(answers: QuizAnswer[]): Promise<ScoreResponse> {
    const { type, character } = scoreAnswers(answers);
    const profile = PERSONALITIES[type];
    return {
      type,
      character,
      figureName: profile?.figureName ?? "",
    };
  },

  getResultByFigure(slug: string): PersonalityResult | null {
    const target = slug.toLowerCase();
    return (
      Object.values(PERSONALITIES).find(
        (p) => slugifyFigure(p.figureName) === target,
      ) ?? null
    );
  },

  getResult(typeCode: string): PersonalityResult | null {
    return PERSONALITIES[typeCode.toUpperCase()] ?? null;
  },
};
