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

  const shakeControls = useAnimationControls();
  const x = useMotionValue(0);
  const tearWidth = useTransform(x, [0, TRACK], [0, BOX_W]); // solid fill grows full width
  const hintOpacity = useTransform(x, [0, THRESHOLD], [1, 0]);
  const openedRef = useRef(false);

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
      animate(x, TRACK, { duration: 0.2, ease: "easeOut" });
      // lid pops + confetti + the full-colour figure reveals, then load results
      setTimeout(() => router.push(`/result/${slug}`), 2300);
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

            {/* Box body */}
            <div
              className="absolute inset-0 overflow-hidden rounded-3xl shadow-box"
              style={{ backgroundColor: color }}
            >
            {/* Figure — silhouette teaser that turns full-colour once torn open */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative h-[162px] w-[162px]"
                animate={opened ? { scale: 1.12, y: -6 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* white silhouette — fades away as the box opens */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: opened ? 0 : 0.5 }}
                  transition={{ duration: 0.35, delay: opened ? 0.3 : 0 }}
                >
                  <Image
                    src={withBase(image)}
                    alt=""
                    aria-hidden
                    width={172}
                    height={172}
                    priority
                    className="h-[162px] w-[162px] object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </motion.div>

                {/* full-colour figure — fades in right as the lid pops */}
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: opened ? 1 : 0 }}
                  transition={{ duration: 0.45, delay: opened ? 0.35 : 0 }}
                >
                  <Image
                    src={withBase(image)}
                    alt={data?.figureName ?? ""}
                    width={172}
                    height={172}
                    priority
                    className="h-[162px] w-[162px] object-contain drop-shadow-md"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Lid — peels away on open */}
            <motion.div
              className="absolute inset-x-0 top-0 rounded-t-3xl bg-white/30"
              style={{ height: LID_H }}
              animate={
                opened
                  ? { y: -34, rotate: -3, opacity: 0 }
                  : { y: 0, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.5, ease: "easeIn" }}
            />

            {/* Dotted tear line — spans the full width */}
            {!opened && (
              <div className="absolute inset-x-0" style={{ top: LID_H }}>
                <div className="relative">
                  <div className="border-t-2 border-dashed border-white/60" />
                  {/* torn gap grows left→right — exposes the page behind the card */}
                  <motion.div
                    className="absolute -top-[3px] left-0 h-[6px] rounded-[1px] bg-background"
                    style={{
                      width: tearWidth,
                      boxShadow:
                        "inset 0 2px 2px rgba(45,45,45,0.22), inset 0 -2px 2px rgba(45,45,45,0.22)",
                    }}
                  />
                </div>
              </div>
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
                className="absolute h-10 cursor-grab touch-none active:cursor-grabbing"
              />
            )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
