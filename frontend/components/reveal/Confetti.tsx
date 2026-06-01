"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "#FFD54F",
  "#F5B5C0",
  "#B8C6E8",
  "#7A9E9F",
  "#F5D5C0",
  "#F2A4C3",
  "#A6D8C0",
  "#FFFFFF",
];

// Confetti burst that shoots up and out of the box, then falls.
export function Confetti({
  count = 28,
  originY = 36,
}: {
  count?: number;
  originY?: number;
}) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // mostly-upward spray (-90° ± 70°)
        const angle = (-90 + (Math.random() * 140 - 70)) * (Math.PI / 180);
        const dist = 90 + Math.random() * 140;
        const dx = Math.cos(angle) * dist;
        const burstY = Math.sin(angle) * dist; // negative = upward
        const fallY = burstY + 200 + Math.random() * 140; // gravity pulls it down
        return {
          id: i,
          color: COLORS[i % COLORS.length],
          dx,
          burstY,
          fallY,
          rotate: Math.random() * 720 - 360,
          size: 6 + Math.random() * 6,
          round: Math.random() > 0.6,
          delay: Math.random() * 0.08,
          dur: 1.0 + Math.random() * 0.55,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-0"
          style={{
            marginTop: originY,
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: p.round ? "9999px" : "1px",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
          animate={{
            x: [0, p.dx * 0.7, p.dx],
            y: [0, p.burstY, p.fallY],
            opacity: [1, 1, 0],
            scale: [0.5, 1, 0.9],
            rotate: [0, p.rotate * 0.5, p.rotate],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: "easeOut",
            times: [0, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}
