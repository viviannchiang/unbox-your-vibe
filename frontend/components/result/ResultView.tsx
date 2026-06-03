"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { slugifyFigure } from "@/lib/scoring";
import { QUIZ_COMPLETED_KEY } from "@/lib/constants";
import { ProfileView } from "@/components/result/ProfileView";
import { ShareButton } from "@/components/result/ShareButton";
import type { PersonalityResult } from "@/lib/types";

// The result lives at a single URL (/result) with no figure in the path, so it
// can't be deep-linked. The figure is read from sessionStorage — set only when
// the quiz is actually finished — and the page bounces home without it.
export function ResultView() {
  const router = useRouter();
  const [data, setData] = useState<PersonalityResult | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const slug = sessionStorage.getItem(QUIZ_COMPLETED_KEY);
    const result = slug ? api.getResultByFigure(slug) : null;
    if (!result) {
      router.replace("/");
      return;
    }
    setData(result);
    setChecked(true);
  }, [router]);

  if (!checked || !data) {
    return (
      <div className="flex min-h-[calc(100dvh_-_3.5rem)] flex-col items-center justify-center pt-14">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="h-7 w-7 rounded-full border-2 border-text/15 border-t-text"
        />
      </div>
    );
  }

  // Resolve each compatible figure to its full profile so we can show its
  // image + colour (never the underlying type code).
  const pairs = data.compatibleWith
    .map((c) => api.getResultByFigure(slugifyFigure(c.figure)))
    .filter((p): p is PersonalityResult => p !== null);

  return (
    <ProfileView
      data={data}
      pairs={pairs}
      eyebrow="✦   your figure   ✦"
      actions={
        <>
          <ShareButton data={data} pairs={pairs} />
          <Link
            href="/store"
            className="rounded-full border-2 border-text px-8 py-3 text-center font-heading text-sm font-bold lowercase tracking-wide text-text transition-all hover:bg-text hover:text-background"
          >
            browse the store
          </Link>
          <Link
            href="/quiz"
            className="rounded-full border-2 border-text px-8 py-3 text-center font-heading text-sm font-bold lowercase tracking-wide text-text transition-all hover:bg-text hover:text-background"
          >
            retake quiz
          </Link>
        </>
      }
    />
  );
}
