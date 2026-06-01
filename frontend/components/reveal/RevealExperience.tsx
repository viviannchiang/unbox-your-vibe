"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { FIGURE_COLORS } from "@/lib/constants";
import { Confetti } from "@/components/reveal/Confetti";
import { withBase } from "@/lib/asset";

interface FigureData {
  figureName?: string;
  character?: string;
  series?: string;
  color?: string;
  image?: string;
}

// Box geometry (matches the landing-page box)
const BOX_W = 210;
const BOX_H = 290;
const TAB_W = 64; // invisible handle width
const TRACK = BOX_W - TAB_W; // handle travel distance (full width)
const THRESHOLD = TRACK * 0.7; // swipe far enough to open
const LID_H = Math.round(BOX_H * 0.34); // lid height / tear line baseline

export function RevealExperience({
  slug,
  data,
}: {
  slug: string;
  data: FigureData | null;
}) {
  const router = useRouter();

  const color = FIGURE_COLORS[slug] ?? data?.color ?? "#F5B5C0";
  const image = data?.image ?? `/images/figures/${slug}.png`;

  const [ready, setReady] = useState(false); // grow finished → enable shake + swipe
  const [opened, setOpened] = useState(false); // tear triggered
  const [leaving, setLeaving] = useState(false); // fade-out → results page

  const shakeControls = useAnimationControls();
  const x = useMotionValue(0);
  const hintOpacity = useTransform(x, [0, THRESHOLD], [1, 0]);
  const openedRef = useRef(false);

  // The two halves part live as the handle glides across, then (on release
  // past the threshold) x is animated well past TRACK to fling them off-screen.
  const FLING = TRACK * 2.6;
  const topY = useTransform(x, [0, TRACK, FLING], [0, -34, -BOX_H * 0.95]);
  const topX = useTransform(x, [0, TRACK, FLING], [0, -6, -34]);
  const topRot = useTransform(x, [0, TRACK, FLING], [0, -3, -12]);
  const topOp = useTransform(x, [0, TRACK, FLING], [1, 1, 0]);
  const botY = useTransform(x, [0, TRACK, FLING], [0, 34, BOX_H * 0.95]);
  const botX = useTransform(x, [0, TRACK, FLING], [0, 6, 34]);
  const botRot = useTransform(x, [0, TRACK, FLING], [0, 3, 12]);
  const botOp = useTransform(x, [0, TRACK, FLING], [1, 1, 0]);
  // Resting card body (with its single shadow) fades as the tear opens.
  const baseOp = useTransform(x, [0, TRACK * 0.5], [1, 0]);

  // Prefetch the figure page so the transition is instant
  useEffect(() => {
    router.prefetch(`/result/${slug}`);
  }, [router, slug]);

  // Only act once the pointer is released
  function handleDragEnd() {
    if (openedRef.current) return;
    if (x.get() >= THRESHOLD) {
      openedRef.current = true;
      setOpened(true);
      // fling the two halves off-screen; confetti bursts, then we fade to the
      // page background and slip straight over to the results page.
      animate(x, FLING, { duration: 0.55, ease: [0.4, 0, 0.6, 1] });
      setTimeout(() => setLeaving(true), 800);
      setTimeout(() => router.push(`/result/${slug}`), 1350);
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  }

  // Rattle loop once the box has grown in (until opened)
  useEffect(() => {
    if (!ready || opened) return;
    let cancelled = false;
    async function rattle() {
      if (cancelled) return;
      await shakeControls.start({
        rotate: [0, -7, 7, -4, 4, -2, 2, 0],
        transition: { duration: 0.55, ease: "easeInOut" },
      });
      if (!cancelled) setTimeout(rattle, 2400);
    }
    const first = setTimeout(rattle, 500);
    return () => {
      cancelled = true;
      clearTimeout(first);
    };
  }, [ready, opened, shakeControls]);

  return (
    <main className="pattern-dots relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-14 text-center">
      {/* Fade-to-background veil — covers the hand-off to the results page */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 1 : 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />
      {/* Grow wrapper */}
      <motion.div
        initial={{ scale: 0.16, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => setReady(true)}
      >
        {/* Shake wrapper */}
        <motion.div animate={shakeControls}>
          {/* Box + confetti (confetti sits outside the box's clip) */}
          <div className="relative" style={{ width: BOX_W, height: BOX_H }}>
            {opened && <Confetti originY={36} />}

            {/* Resting card body — carries the single shadow so the seam has
                no doubled-shadow line. Fades out as the tear opens, exposing a
                soft dark crease (the "inside" of the torn card). */}
            <motion.div
              className="absolute inset-0 rounded-3xl shadow-box"
              style={{ backgroundColor: color, opacity: baseOp }}
            >
              <div
                className="absolute inset-x-0"
                style={{
                  top: LID_H - 44,
                  height: 88,
                  background:
                    "linear-gradient(to bottom, transparent, rgba(45,45,45,0.30) 50%, transparent)",
                }}
              />
            </motion.div>

            {/* TOP half — parts upward as the handle glides, then flings off */}
            <motion.div
              className="absolute inset-x-0 top-0 overflow-hidden rounded-t-3xl"
              style={{
                height: LID_H,
                transformOrigin: "left center",
                y: topY,
                x: topX,
                rotate: topRot,
                opacity: topOp,
              }}
            >
              {/* full card face, clipped to this half */}
              <div
                className="absolute left-0 top-0"
                style={{ width: BOX_W, height: BOX_H, backgroundColor: color }}
              >
                {/* lid sheen */}
                <div
                  className="absolute inset-x-0 top-0 bg-white/15"
                  style={{ height: LID_H }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={withBase(image)}
                    alt=""
                    aria-hidden
                    width={172}
                    height={172}
                    priority
                    className="h-[162px] w-[162px] object-contain"
                    style={{ filter: "brightness(0) invert(1)", opacity: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* BOTTOM half — parts downward as the handle glides, then flings off */}
            <motion.div
              className="absolute inset-x-0 overflow-hidden rounded-b-3xl"
              style={{
                top: LID_H,
                height: BOX_H - LID_H,
                transformOrigin: "right center",
                y: botY,
                x: botX,
                rotate: botRot,
                opacity: botOp,
              }}
            >
              {/* same card face, shifted up so the silhouette lines up across the seam */}
              <div
                className="absolute left-0"
                style={{
                  top: -LID_H,
                  width: BOX_W,
                  height: BOX_H,
                  backgroundColor: color,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={withBase(image)}
                    alt=""
                    aria-hidden
                    width={172}
                    height={172}
                    priority
                    className="h-[162px] w-[162px] object-contain"
                    style={{ filter: "brightness(0) invert(1)", opacity: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Dotted tear line at the seam (fades as the tear opens) */}
            {!opened && (
              <motion.div
                className="absolute inset-x-0 border-t-2 border-dashed border-white/60"
                style={{ top: LID_H, opacity: baseOp }}
              />
            )}

            {/* "tear here" — left-aligned, points at the start of the line */}
            {ready && !opened && (
              <motion.div
                style={{ opacity: hintOpacity, left: 14, top: LID_H - 46 }}
                className="absolute"
              >
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: [0, 5, 0] }}
                  transition={{
                    y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.4 },
                  }}
                  className="flex flex-col items-start gap-0.5"
                >
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.25em] text-white/85">
                    tear here
                  </span>
                  <span className="text-base leading-none text-white/85">↓</span>
                </motion.div>
              </motion.div>
            )}

            {/* invisible swipe handle along the line */}
            {ready && !opened && (
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: TRACK }}
                dragElastic={0}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                style={{ x, width: TAB_W, left: 0, top: LID_H - 20 }}
                className="absolute z-10 h-10 cursor-grab touch-none active:cursor-grabbing"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
