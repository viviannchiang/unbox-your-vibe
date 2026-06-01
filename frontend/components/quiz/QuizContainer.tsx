"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@/lib/api";
import { QuestionView } from "@/components/quiz/QuestionView";
import { RevealExperience } from "@/components/reveal/RevealExperience";
import { QUIZ_COMPLETED_KEY } from "@/lib/constants";
import type { Question, QuizAnswer } from "@/lib/types";

// Maps each MBTI axis to a character's brand color
// One accent color per MBTI axis (used for the quiz progress bar)
const AXIS_COLORS: Record<string, string> = {
  EI: "#B8C6E8", // sky blue
  SN: "#7A9E9F", // sage teal
  TF: "#F5D5C0", // warm peach
  JP: "#F5B5C0", // soft pink
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 44, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: "easeOut" as const },
  },
  exit: (dir: number) => ({
    x: dir * -44,
    opacity: 0,
    transition: { duration: 0.22, ease: "easeIn" as const },
  }),
};

export function QuizContainer() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [direction] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  // When set, the quiz is done and we show the box-opening in place (URL stays /quiz)
  const [reveal, setReveal] = useState<{
    slug: string;
    figureName: string;
    character: string;
  } | null>(null);

  // Ref prevents double-fire when user clicks quickly
  const advancingRef = useRef(false);

  useEffect(() => {
    // Entering the quiz always starts fresh — clear any prior completion flag so
    // a result page can't be reached until this run is actually finished.
    sessionStorage.removeItem(QUIZ_COMPLETED_KEY);

    api
      .getQuestions()
      .then(setQuestions)
      .catch(() => setError("couldn't load the questions. please try again."))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = async (cardId: string) => {
    if (advancingRef.current || selectedCardId) return;
    advancingRef.current = true;
    setSelectedCardId(cardId);

    const newAnswer: QuizAnswer = {
      questionId: questions[currentIdx].id,
      cardId,
    };
    const updatedAnswers = [...answers, newAnswer];

    // Let the user see their choice before advancing
    await new Promise((res) => setTimeout(res, 580));

    if (currentIdx < questions.length - 1) {
      setAnswers(updatedAnswers);
      setCurrentIdx((i) => i + 1);
      setSelectedCardId(null);
      advancingRef.current = false;
    } else {
      // Last question — submit to scoring API
      setAnswers(updatedAnswers);
      setSubmitting(true);
      try {
        const { figureName, character } = await api.submitAnswers(updatedAnswers);
        const slug = figureName
          .toLowerCase()
          .replace(/'/g, "")
          .replace(/\s+/g, "-");
        // Mark the quiz complete so the result page will allow itself to render.
        sessionStorage.setItem(QUIZ_COMPLETED_KEY, slug);
        // Show the box-opening in place — keeps the URL on /quiz
        setReveal({ slug, figureName, character });
      } catch {
        setError("something went wrong. try again?");
        setSubmitting(false);
        setSelectedCardId(null);
        advancingRef.current = false;
      }
    }
  };

  // ── Loading ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-14">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="h-7 w-7 rounded-full border-2 border-text/15 border-t-text"
        />
        <p className="font-body text-sm text-muted">loading...</p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 pt-14 text-center">
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

  // ── Submitting / "calculating" ─────────────────────────────
  if (submitting) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 pt-14">
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
          className="font-heading text-sm font-bold lowercase tracking-wide text-muted"
        >
          calculating your vibe...
        </motion.p>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIdx];
  const accentColor = AXIS_COLORS[currentQuestion.axis] ?? "#B8C6E8";
  const progressPct =
    ((currentIdx + (selectedCardId ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="pattern-dots relative flex min-h-screen flex-col items-center justify-center px-4 pt-14">

      {/* ── Progress bar (fixed just below nav) ── */}
      <div className="fixed inset-x-0 top-14 z-10 bg-background/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          {/* Track */}
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-text/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: accentColor }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
          {/* Counter */}
          <span className="w-10 text-right font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
            {currentIdx + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* ── Question slide area ── */}
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <QuestionView
              question={currentQuestion}
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
