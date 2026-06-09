// Fully client-side data layer — no backend required.
// Quiz scoring + data run in the browser so the app can be a static site.

import type { PersonalityResult, Pole, ScoreResponse } from "./types";
import { PERSONALITIES } from "./data/personalities";
import { scoreFromPoles, slugifyFigure } from "./scoring";

export const api = {
  // Score a completed story run (the poles picked along the path) into a figure.
  submitStory(poles: Pole[]): ScoreResponse {
    const { type, character } = scoreFromPoles(poles);
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
