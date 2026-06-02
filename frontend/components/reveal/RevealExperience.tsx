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

// Ragged tear seam: a zigzag boundary across the card at y = LID_H. The same
// boundary is used to (a) clip the two halves so they split along a jagged edge
// and (b) draw the rip line that advances as the handle is dragged across.
const TEETH = 47;
const TOOTH_AMP = 1.6; // px above/below the baseline
const SEG = BOX_W / TEETH;
const SEAM_PTS = Array.from({ length: TEETH + 1 }, (_, i) => ({
  x: Math.round(i * SEG),
  y: LID_H + (i % 2 === 0 ? -TOOTH_AMP : TOOTH_AMP),
}));
// clip-path for the top half: everything ABOVE the zigzag boundary
const TOP_CLIP = `polygon(0px 0px, ${BOX_W}px 0px, ${[...SEAM_PTS]
  .reverse()
  .map((p) => `${p.x}px ${p.y}px`)
  .join(", ")})`;
// clip-path for the bottom half: everything BELOW the zigzag boundary
const BOTTOM_CLIP = `polygon(${SEAM_PTS.map((p) => `${p.x}px ${p.y}px`).join(
  ", ",
)}, ${BOX_W}px ${BOX_H}px, 0px ${BOX_H}px)`;
// SVG path string for the visible rip line
const SEAM_PATH = "M " + SEAM_PTS.map((p) => `${p.x} ${p.y}`).join(" L ");

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
  const [tearing, setTearing] = useState(false); // dragging the rip → pause shake

  const shakeControls = useAnimationControls();
  const x = useMotionValue(0);
  const hintOpacity = useTransform(x, [0, THRESHOLD], [1, 0]);
  const openedRef = useRef(false);

  // The ragged rip line draws itself across (left→right) as the handle glides;
  // the card itself stays put until the tear completes on release.
  const pathLength = useTransform(x, [0, TRACK], [0, 1]);
  // The dashed "tear here" guide fades the moment ripping starts.
  const guideOpacity = useTransform(x, [0, TRACK * 0.18], [0.6, 0]);

  // Prefetch the result page so the transition is instant
  useEffect(() => {
    router.prefetch("/result");
  }, [router]);

  // Only act once the pointer is released
  function handleDragEnd() {
    if (openedRef.current) return;
    if (x.get() >= THRESHOLD) {
      openedRef.current = true;
      animate(x, TRACK, { duration: 0.15, ease: "easeOut" }); // finish the rip line
      setOpened(true); // halves split apart along the ragged seam
      // confetti bursts, then we fade to the page background and slip straight
      // over to the results page.
      setTimeout(() => setLeaving(true), 850);
      setTimeout(() => router.push("/result"), 1400);
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
      setTearing(false); // released without opening → let the box rattle again
    }
  }

  // Rattle loop once the box has grown in (paused while tearing, until opened)
  useEffect(() => {
    if (!ready || opened || tearing) return;
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
  }, [ready, opened, tearing, shakeControls]);

  return (
    <main className="pattern-dots relative flex min-h-[calc(100dvh_-_3.5rem)] flex-col items-center justify-center overflow-hidden px-4 pt-14 text-center">
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
                no doubled-shadow line. Fades out the instant the tear opens. */}
            <motion.div
              className="absolute inset-0 rounded-3xl shadow-box"
              style={{ backgroundColor: color }}
              animate={{ opacity: opened ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />

            {/* The full card face, drawn twice and clipped along the ragged seam
                so it can split into two jagged halves. Both copies are full-box
                and identical, so the silhouette lines up perfectly while closed. */}
            {[TOP_CLIP, BOTTOM_CLIP].map((clip, idx) => {
              const isTop = idx === 0;
              return (
                <motion.div
                  key={isTop ? "top" : "bottom"}
                  className="absolute inset-0 overflow-hidden rounded-3xl"
                  style={{ transformOrigin: isTop ? "left center" : "right center" }}
                  animate={
                    opened
                      ? isTop
                        ? { y: -BOX_H * 0.95, x: -30, rotate: -11, opacity: 0 }
                        : { y: BOX_H * 0.95, x: 30, rotate: 11, opacity: 0 }
                      : { y: 0, x: 0, rotate: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.6, 1] }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ clipPath: clip, backgroundColor: color }}
                  >
                    {/* lid sheen (top portion only) */}
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
              );
            })}

            {/* Ragged rip line — drawn across (left→right) as the handle glides */}
            {!opened && (
              <svg
                className="pointer-events-none absolute inset-0"
                width={BOX_W}
                height={BOX_H}
                viewBox={`0 0 ${BOX_W} ${BOX_H}`}
                fill="none"
              >
                {/* torn-paper highlight */}
                <motion.path
                  d={SEAM_PATH}
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pathLength }}
                />
                {/* dark crease on top */}
                <motion.path
                  d={SEAM_PATH}
                  stroke="rgba(45,45,45,0.55)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pathLength }}
                />
              </svg>
            )}

            {/* Faint dashed guide showing where to tear (fades as you rip) */}
            {!opened && (
              <motion.div
                className="absolute inset-x-0 border-t-2 border-dashed border-white/50"
                style={{ top: LID_H, opacity: guideOpacity }}
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
                onDragStart={() => {
                  setTearing(true); // stop the rattle while the user is tearing
                  shakeControls.start({
                    rotate: 0,
                    transition: { duration: 0.18, ease: "easeOut" },
                  });
                }}
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
