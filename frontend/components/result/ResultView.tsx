"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { slugifyFigure } from "@/lib/scoring";
import { withBase } from "@/lib/asset";
import { QUIZ_COMPLETED_KEY, displayCharacter } from "@/lib/constants";
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
      <div className="flex min-h-screen flex-col items-center justify-center pt-14">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="h-7 w-7 rounded-full border-2 border-text/15 border-t-text"
        />
      </div>
    );
  }

  const {
    figureName,
    character,
    series,
    tagline,
    description,
    thisIsYou,
    groupChatVibe,
    compatibleWith,
    color,
    image,
  } = data;

  // Resolve each compatible figure to its full profile so we can show its
  // image + colour (never the underlying type code).
  const pairs = compatibleWith
    .map((c) => api.getResultByFigure(slugifyFigure(c.figure)))
    .filter((p): p is PersonalityResult => p !== null);

  // staggered entrance helper
  const sec = (i: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  });

  return (
    <main className="pattern-dots flex min-h-screen flex-col items-center px-4 pb-20 pt-20 text-center">
      {/* ── Hero ─────────────────────────────────────────── */}
      <motion.p
        {...sec(0)}
        className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-muted"
      >
        ✦ &nbsp; your figure &nbsp; ✦
      </motion.p>

      <motion.div
        {...sec(1)}
        className="mt-8 flex h-60 w-60 items-center justify-center rounded-full shadow-card"
        style={{ backgroundColor: color }}
      >
        <Image
          src={withBase(image)}
          alt={figureName}
          width={220}
          height={220}
          priority
          className="h-52 w-52 object-contain drop-shadow-md"
        />
      </motion.div>

      <motion.h1
        {...sec(2)}
        className="mt-8 font-heading font-bold lowercase leading-tight text-text"
        style={{ fontSize: "clamp(2.6rem, 9vw, 5rem)" }}
      >
        {figureName}
      </motion.h1>

      <motion.p {...sec(3)} className="mt-2 font-body text-sm text-muted">
        {displayCharacter(character)} &nbsp;·&nbsp; {series} series
      </motion.p>

      <motion.p
        {...sec(4)}
        className="mt-5 max-w-md font-body text-base italic text-text/70"
      >
        &ldquo;{tagline}&rdquo;
      </motion.p>

      {/* ── Detail cards ─────────────────────────────────── */}
      <div className="mt-12 flex w-full max-w-md flex-col gap-6 text-left">
        {/* the deal */}
        <motion.section
          {...sec(5)}
          className="rounded-3xl bg-card p-6 shadow-card"
        >
          <SectionLabel color={color}>the deal</SectionLabel>
          <p className="mt-3 font-body text-sm leading-relaxed text-text/80">
            {description}
          </p>
        </motion.section>

        {/* this is you */}
        <motion.section
          {...sec(6)}
          className="rounded-3xl bg-card p-6 shadow-card"
        >
          <SectionLabel color={color}>this is you</SectionLabel>
          <ul className="mt-4 flex flex-col gap-3">
            {thisIsYou.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-[2px] shrink-0 text-sm leading-none"
                  style={{ color }}
                  aria-hidden
                >
                  ✦
                </span>
                <span className="font-body text-sm leading-relaxed text-text/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* in the group chat */}
        <motion.section
          {...sec(7)}
          className="rounded-3xl p-6"
          style={{ backgroundColor: color + "26" }}
        >
          <SectionLabel color={color}>in the group chat</SectionLabel>
          <p className="mt-3 font-body text-sm italic leading-relaxed text-text/80">
            {groupChatVibe}
          </p>
        </motion.section>

        {/* pairs well with */}
        {pairs.length > 0 && (
          <motion.section {...sec(8)}>
            <SectionLabel color={color} center>
              you pair well with
            </SectionLabel>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {pairs.map((p) => (
                <div
                  key={p.figureName}
                  className="flex flex-col items-center gap-2 rounded-3xl bg-card p-3 shadow-card"
                >
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full"
                    style={{ backgroundColor: p.color }}
                  >
                    <Image
                      src={withBase(p.image)}
                      alt={p.figureName}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain drop-shadow-sm"
                    />
                  </div>
                  <p className="font-heading text-[11px] font-bold lowercase leading-tight text-text">
                    {p.figureName}
                  </p>
                  <p className="-mt-1 font-body text-[10px] text-muted">
                    {displayCharacter(p.character)}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* ── Actions ─────────────────────────────────────── */}
      <motion.div
        {...sec(9)}
        className="mt-12 flex w-full max-w-xs flex-col items-stretch gap-3"
      >
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
      </motion.div>
    </main>
  );
}

// Small uppercase section label with a colour accent, matching the site's
// eyebrow style.
function SectionLabel({
  children,
  color,
  center,
}: {
  children: React.ReactNode;
  color: string;
  center?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-muted ${
        center ? "justify-center" : ""
      }`}
    >
      <span style={{ color }} aria-hidden>
        ✦
      </span>
      {children}
    </p>
  );
}
