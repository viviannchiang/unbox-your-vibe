"use client";

import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FIGURES } from "@/lib/constants";
import { withBase } from "@/lib/asset";

// Ambient sparkle particles scattered around the viewport
const SPARKLES = [
  { id: 1,  char: "✦", color: "#B8C6E8", x: 9,  y: 22, size: 15, dur: 3.2, delay: 0.0 },
  { id: 2,  char: "★", color: "#F5B5C0", x: 83, y: 38, size: 11, dur: 3.8, delay: 0.9 },
  { id: 3,  char: "✦", color: "#FFD54F", x: 17, y: 60, size: 10, dur: 4.1, delay: 1.7 },
  { id: 4,  char: "●", color: "#7A9E9F", x: 76, y: 20, size: 8,  dur: 3.5, delay: 2.5 },
  { id: 5,  char: "✿", color: "#F5D5C0", x: 89, y: 65, size: 14, dur: 4.4, delay: 0.5 },
  { id: 6,  char: "✦", color: "#F5B5C0", x: 5,  y: 48, size: 10, dur: 3.0, delay: 1.3 },
  { id: 7,  char: "★", color: "#FFD54F", x: 71, y: 80, size: 9,  dur: 4.0, delay: 2.1 },
  { id: 8,  char: "✿", color: "#B8C6E8", x: 30, y: 10, size: 7,  dur: 3.6, delay: 0.7 },
  { id: 9,  char: "●", color: "#F5D5C0", x: 58, y: 87, size: 9,  dur: 3.3, delay: 1.9 },
  { id: 10, char: "✦", color: "#7A9E9F", x: 44, y: 6,  size: 6,  dur: 4.2, delay: 0.3 },
  { id: 11, char: "★", color: "#B8C6E8", x: 92, y: 52, size: 8,  dur: 3.7, delay: 1.1 },
  { id: 12, char: "●", color: "#FFD54F", x: 22, y: 82, size: 7,  dur: 4.3, delay: 2.8 },
];

export function Hero() {
  const [figIdx, setFigIdx] = useState(0);
  const shakeControls = useAnimationControls();

  // Cycle through the 16 figures every 2.6 s
  useEffect(() => {
    const t = setInterval(() => setFigIdx((i) => (i + 1) % FIGURES.length), 2600);
    return () => clearInterval(t);
  }, []);

  // Periodic rattle — something's trying to get out
  useEffect(() => {
    let cancelled = false;

    async function rattle() {
      if (cancelled) return;
      await shakeControls.start({
        rotate: [0, -8, 8, -5, 5, -2, 2, 0],
        transition: { duration: 0.55, ease: "easeInOut" },
      });
      if (!cancelled) setTimeout(rattle, 4800);
    }

    const first = setTimeout(rattle, 2400);
    return () => {
      cancelled = true;
      clearTimeout(first);
    };
  }, [shakeControls]);

  const figure = FIGURES[figIdx];

  return (
    <section className="pattern-dots relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-4 pt-14 text-center">

      {/* ── Ambient sparkles ── */}
      {SPARKLES.map((s) => (
        <motion.span
          key={s.id}
          aria-hidden
          className="pointer-events-none absolute select-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size, color: s.color }}
          animate={{ y: [0, -20, 0], opacity: [0, 0.55, 0], rotate: [0, 18, -10, 0] }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          {s.char}
        </motion.span>
      ))}

      {/* ── The blind box (tap to open) ── */}
      <Link href="/quiz" aria-label="take the quiz">
        {/* Float */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Shake + hover */}
          <motion.div
            animate={shakeControls}
            whileHover={{ scale: 1.07, transition: { type: "spring", stiffness: 320, damping: 18 } }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            {/* Figure-cycling box body */}
            <motion.div
              className="relative overflow-hidden rounded-3xl shadow-box"
              style={{ width: 210, height: 290 }}
              animate={{ backgroundColor: figure.color }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            >
              {/* Lid */}
              <div className="absolute inset-x-0 top-0 h-[34%] rounded-t-3xl bg-white/25" />

              {/* Figure silhouette — crossfades through all 16 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={figure.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <Image
                      src={withBase(`/images/figures/${figure.slug}.png`)}
                      alt=""
                      aria-hidden
                      width={185}
                      height={185}
                      priority
                      className="h-[175px] w-[175px] select-none object-contain"
                      style={{
                        filter: "brightness(0) invert(1)",
                        opacity: 0.78,
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom label */}
              <div className="absolute inset-x-0 bottom-0 z-10 pb-[14px] text-center">
                <p
                  className="font-heading text-[9px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  tap to open
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="font-body text-sm leading-relaxed text-muted"
      >
        take the quiz. tear open the box. meet your alter ego.
      </motion.p>
    </section>
  );
}
