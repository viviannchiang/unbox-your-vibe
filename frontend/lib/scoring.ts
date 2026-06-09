// Ported from the former Python backend (services/scoring.py).
// Runs entirely in the browser — no server needed.

import type { Pole } from "@/lib/types";

const MBTI_TO_CHARACTER: Record<string, string> = {
  INFP: "Nyota", INFJ: "Nyota", ISFP: "Nyota", ISFJ: "Nyota",
  INTJ: "Hirono", INTP: "Hirono", ENTJ: "Hirono", ISTP: "Hirono",
  ENFP: "Lulu", ENTP: "Hirono", ENFJ: "Nyota", ESTP: "Lulu",
  ESFJ: "Lulu", ESFP: "Lulu", ESTJ: "Lulu", ISTJ: "Lulu",
};

// Ties default to I, N, F, P. (Each axis is asked an odd number of times, so
// with a full run a tie shouldn't actually occur — this is just a safety net.)
const TIE_DEFAULTS: Record<string, Pole> = {
  EI: "I", SN: "N", TF: "F", JP: "P",
};

/** Tally a list of chosen poles into a 4-letter type + its character. */
export function scoreFromPoles(poles: Pole[]): {
  type: string;
  character: string;
} {
  const count: Record<Pole, number> = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
  };
  for (const p of poles) count[p] += 1;

  const axes: [Pole, Pole, string][] = [
    ["E", "I", "EI"],
    ["S", "N", "SN"],
    ["T", "F", "TF"],
    ["J", "P", "JP"],
  ];

  let type = "";
  for (const [a, b, axis] of axes) {
    if (count[a] > count[b]) type += a;
    else if (count[b] > count[a]) type += b;
    else type += TIE_DEFAULTS[axis];
  }

  return { type, character: MBTI_TO_CHARACTER[type] ?? "Nyota" };
}

/** Slugify a figure name — must match the frontend convention. */
export function slugifyFigure(name: string): string {
  return name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
}
