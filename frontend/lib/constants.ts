export const CHARACTER_COLORS = {
  Nyota: "#B8C6E8",
  Hirono: "#7A9E9F",
  Lulu: "#F5B5C0",
} as const;

// Full display names for the characters. Internally we key everything by the
// short name (e.g. "Lulu"); this maps to what the user actually sees.
const CHARACTER_DISPLAY_NAMES: Record<string, string> = {
  Lulu: "Lulu The Piggy",
};

export function displayCharacter(name: string): string {
  return CHARACTER_DISPLAY_NAMES[name] ?? name;
}

// sessionStorage flag set when the quiz is finished. Result pages require it;
// deep-linking to a result without it bounces the visitor back to the home page.
// (sessionStorage clears when the tab closes, so each visit must earn it again.)
export const QUIZ_COMPLETED_KEY = "uyv:completed";

export const CHARACTER_BOX_PATTERNS = {
  Nyota: "star",
  Hirono: "line",
  Lulu: "polka",
} as const;

export const MBTI_TO_CHARACTER: Record<string, string> = {
  INFP: "Nyota",
  INFJ: "Nyota",
  ISFP: "Nyota",
  ISFJ: "Nyota",
  INTJ: "Hirono",
  INTP: "Hirono",
  ENTJ: "Hirono",
  ISTP: "Hirono",
  ENFP: "Lulu",
  ENTP: "Hirono",
  ENFJ: "Nyota",
  ESTP: "Lulu",
  ESFJ: "Lulu",
  ESFP: "Lulu",
  ESTJ: "Lulu",
  ISTJ: "Lulu",
};

export const TOTAL_QUESTIONS = 20;

// Each of the 16 figures gets its own background colour (reusable for the
// box rotation on the landing page and as a profile/result backdrop later).
// Ordered interleaved by character so the rotation cycles through varied hues.
export const FIGURES = [
  { slug: "cloudwatcher",          name: "Cloudwatcher",          character: "Nyota",  color: "#B8C6E8" },
  { slug: "insight",               name: "Insight",               character: "Hirono", color: "#7A9E9F" },
  { slug: "tea-break",             name: "Tea Break",             character: "Lulu",   color: "#F5B5C0" },
  { slug: "sanctuary-star",        name: "Sanctuary Star",        character: "Nyota",  color: "#C9C2E8" },
  { slug: "echo",                  name: "Echo",                  character: "Hirono", color: "#9DB4A8" },
  { slug: "serving-time",          name: "Serving Time",          character: "Lulu",   color: "#F3C3A0" },
  { slug: "hidden-in-autumn",      name: "Hidden in Autumn",      character: "Nyota",  color: "#D8B89C" },
  { slug: "protector",             name: "Protector",             character: "Hirono", color: "#6E8E94" },
  { slug: "survival-coffee",       name: "Survival Coffee",       character: "Lulu",   color: "#E8A98C" },
  { slug: "snowfall-bliss",        name: "Snowfall Bliss",        character: "Nyota",  color: "#CFE0EC" },
  { slug: "ragpicker",             name: "Ragpicker",             character: "Hirono", color: "#8B9D8A" },
  { slug: "buddha-mode",           name: "Buddha Mode",           character: "Lulu",   color: "#F7C8D4" },
  { slug: "life-bearing-star",     name: "Life-bearing Star",     character: "Nyota",  color: "#A9C8D8" },
  { slug: "manacle",               name: "Manacle",               character: "Hirono", color: "#5E7C82" },
  { slug: "folk-singer",           name: "Folk Singer",           character: "Lulu",   color: "#F0B0A8" },
  { slug: "the-greatest-magician", name: "The Greatest Magician", character: "Lulu",   color: "#E9A6B8" },
] as const;

// Quick slug -> colour lookup for reuse on result/profile pages.
export const FIGURE_COLORS: Record<string, string> = Object.fromEntries(
  FIGURES.map((f) => [f.slug, f.color]),
);
