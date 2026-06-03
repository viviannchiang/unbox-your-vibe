"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { withBase } from "@/lib/asset";
import { displayCharacter } from "@/lib/constants";
import type { PersonalityResult } from "@/lib/types";

// The shared figure-profile body, used both by the quiz result page (/result)
// and the store profile pages (/store/[figure]). The top slot (eyebrow or a
// back button) and the bottom actions differ per context, so they're passed in.
export function ProfileView({
  data,
  pairs,
  eyebrow,
  backButton,
  actions,
}: {
  data: PersonalityResult;
  pairs: PersonalityResult[];
  eyebrow?: React.ReactNode;
  backButton?: React.ReactNode;
  actions: React.ReactNode;
}) {
  const {
    figureName,
    character,
    series,
    tagline,
    description,
    vibeWords,
    thisIsYou,
    groupChatVibe,
    color,
    image,
  } = data;

  // staggered entrance helper
  const sec = (i: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  });

  return (
    <main className="pattern-dots relative flex min-h-[calc(100dvh_-_3.5rem)] flex-col items-center px-4 pb-20 pt-20 text-center">
      {/* ── Back button (store context) ──────────────────── */}
      {/* Mirrors the nav's container (mx-auto max-w-5xl px-6) so the arrow lines
          up with the "unbox your vibe" wordmark, and sits just above the
          figure circle. */}
      {backButton && (
        <div className="absolute inset-x-0 top-[4.75rem] mx-auto flex max-w-5xl justify-start px-6">
          {backButton}
        </div>
      )}

      {/* ── Eyebrow (quiz context) ───────────────────────── */}
      {eyebrow && (
        <motion.p
          {...sec(0)}
          className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-muted"
        >
          {eyebrow}
        </motion.p>
      )}

      {/* ── Hero ─────────────────────────────────────────── */}
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

        {/* the vibe — quick word association */}
        {vibeWords.length > 0 && (
          <motion.section
            {...sec(6)}
            className="rounded-3xl bg-card p-6 shadow-card"
          >
            <SectionLabel color={color}>the vibe</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {vibeWords.map((word) => (
                <span
                  key={word}
                  className="rounded-full px-3 py-1.5 font-heading text-xs font-bold lowercase tracking-wide text-text/80"
                  style={{ backgroundColor: color + "26" }}
                >
                  {word}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* this is you */}
        <motion.section
          {...sec(7)}
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
          {...sec(8)}
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
          <motion.section {...sec(9)}>
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
                  <p className="text-center font-heading text-[11px] font-bold lowercase leading-tight text-text">
                    {p.figureName}
                  </p>
                  <p className="-mt-1 text-center font-body text-[10px] text-muted">
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
        {...sec(10)}
        className="mt-12 flex w-full max-w-xs flex-col items-stretch gap-3"
      >
        {actions}
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
