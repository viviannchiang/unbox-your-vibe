"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@/lib/api";
import { QuestionView } from "@/components/quiz/QuestionView";
import { NightMarketBackground } from "@/components/quiz/NightMarketBackground";
import { RevealExperience } from "@/components/reveal/RevealExperience";
import { QUIZ_COMPLETED_KEY } from "@/lib/constants";
import { slugifyFigure } from "@/lib/scoring";
import {
  SCENES,
  STORY_ROOT_ID,
  INTRO_TEXT,
  FINALE_TEXT,
  TOTAL_STEPS,
} from "@/lib/data/story";
import type { Pole } from "@/lib/types";

// One accent colour per axis (drives the progress bar + card highlight).
const AXIS_COLORS: Record<string, string> = {
  EI: "#B8C6E8", // sky blue
  SN: "#7A9E9F", // sage teal
  TF: "#F5D5C0", // warm peach
  JP: "#F5B5C0", // soft pink
};

const slideVariants = {
  enter: { x: 44, opacity: 0 },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: "easeOut" as const },
  },
  exit: {
    x: -44,
    opacity: 0,
    transition: { duration: 0.22, ease: "easeIn" as const },
  },
};

export function QuizContainer() {
  const [started, setStarted] = useState(false);
  const [sceneId, setSceneId] = useState<string>(STORY_ROOT_ID);
  const [poles, setPoles] = useState<Pole[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reveal, setReveal] = useState<{
    slug: string;
    figureName: string;
    character: string;
  } | null>(null);

  // Prevents a double-fire if the user taps quickly.
  const advancingRef = useRef(false);

  useEffect(() => {
    // Entering the quiz always starts fresh — clear any prior completion flag
    // so the result page can't be reached until this run actually finishes.
    sessionStorage.removeItem(QUIZ_COMPLETED_KEY);
  }, []);

  const scene = SCENES[sceneId];

  const handleSelect = async (cardId: string) => {
    if (advancingRef.current || selectedCardId || !scene) return;
    const card = scene.cards.find((c) => c.id === cardId);
    if (!card) return;

    advancingRef.current = true;
    setSelectedCardId(cardId);
    const nextPoles = [...poles, card.pole];

    // Let the user see their choice before moving on.
    await new Promise((res) => setTimeout(res, 560));

    if (card.next) {
      setPoles(nextPoles);
      setSceneId(card.next);
      setSelectedCardId(null);
      advancingRef.current = false;
      return;
    }

    // End of the story → score the poles and reveal the figure.
    setPoles(nextPoles);
    setSubmitting(true);
    try {
      const { figureName, character } = api.submitStory(nextPoles);
      const slug = slugifyFigure(figureName);
      sessionStorage.setItem(QUIZ_COMPLETED_KEY, slug);
      // Let the finale beat breathe before the box opens.
      await new Promise((res) => setTimeout(res, 2600));
      setReveal({ slug, figureName, character });
    } catch {
      setError("something went wrong. try again?");
      setSubmitting(false);
      setSelectedCardId(null);
      advancingRef.current = false;
    }
  };

  // ── Error ──────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex min-h-[calc(100dvh_-_3.5rem)] flex-col items-center justify-center gap-6 px-4 pt-14 text-center">
        <p className="font-heading text-lg lowercase text-text">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-full bg-text px-8 py-3 font-heading text-sm font-bold lowercase tracking-wide text-background shadow-card transition-all hover:opacity-80"
        >
          try again
        </button>
      </div>
    );
  }

  // ── Quiz finished → box-opening reveal (stays on /quiz) ────
  if (reveal) {
    return (
      <RevealExperience
        slug={reveal.slug}
        data={{ figureName: reveal.figureName, character: reveal.character }}
      />
    );
  }

  // ── Finale beat → "opening your box" ───────────────────────
  if (submitting) {
    return (
      <div className="flex min-h-[calc(100dvh_-_3.5rem)] flex-col items-center justify-center gap-7 px-6 pt-14 text-center">
        <NightMarketBackground />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md font-body text-base leading-relaxed text-white/85"
        >
          {FINALE_TEXT}
        </motion.p>
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            backgroundColor: ["#B8C6E8", "#7A9E9F", "#F5D5C0", "#F5B5C0", "#B8C6E8"],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="h-16 w-16 rounded-2xl shadow-box"
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="font-heading text-sm font-bold lowercase tracking-wide text-white/60"
        >
          opening your box...
        </motion.p>
      </div>
    );
  }

  // ── Intro screen ───────────────────────────────────────────
  if (!started) {
    return (
      <div className="pattern-dots flex min-h-[calc(100dvh_-_3.5rem)] flex-col items-center justify-center gap-8 px-6 pt-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-muted"
        >
          ✦ &nbsp; the night market &nbsp; ✦
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="max-w-md font-body text-base leading-relaxed text-text/80"
        >
          {INTRO_TEXT}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          onClick={() => setStarted(true)}
          className="rounded-full bg-text px-10 py-3.5 font-heading text-sm font-bold lowercase tracking-wide text-background shadow-card transition-all hover:opacity-80"
        >
          step into the market &nbsp;→
        </motion.button>
      </div>
    );
  }

  if (!scene) return null;

  const accentColor = AXIS_COLORS[scene.axis] ?? "#B8C6E8";
  const progressPct =
    ((scene.step - 1 + (selectedCardId ? 1 : 0)) / TOTAL_STEPS) * 100;

  return (
    <div className="relative flex min-h-[calc(100dvh_-_3.5rem)] flex-col items-center justify-center px-4 pt-14">
      <NightMarketBackground />

      {/* ── Progress bar (fixed just below nav) ── */}
      <div className="fixed inset-x-0 top-14 z-10 bg-[#170f30]/40 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: accentColor }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
          <span className="w-10 text-right font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-white/55">
            {scene.step}/{TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* ── Scene slide area ── */}
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <QuestionView
              question={scene}
              selectedCardId={selectedCardId}
              onSelect={handleSelect}
              accentColor={accentColor}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
