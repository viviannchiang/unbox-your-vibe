"use client";

import { motion } from "framer-motion";
import type { CardOption } from "@/lib/types";

interface QuestionCardProps {
  option: CardOption;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string) => void;
  accentColor?: string;
}

export function QuestionCard({
  option,
  selected,
  dimmed,
  onSelect,
  accentColor,
}: QuestionCardProps) {
  const color = accentColor ?? "#B8C6E8";

  return (
    <motion.div
      whileHover={!dimmed && !selected ? { y: -5, scale: 1.015 } : {}}
      whileTap={!dimmed && !selected ? { scale: 0.97 } : {}}
      animate={{ opacity: dimmed ? 0.38 : 1 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      onClick={() => !dimmed && onSelect(option.id)}
      className={dimmed ? "pointer-events-none" : "cursor-pointer"}
    >
      <div
        className="relative overflow-hidden rounded-3xl bg-card px-5 py-6 transition-all duration-250"
        style={{
          border: `2px solid ${selected ? color : "transparent"}`,
          boxShadow: selected
            ? `0 8px 32px ${color}45, 0 2px 16px rgba(45,45,45,0.06)`
            : "0 2px 16px rgba(45,45,45,0.07)",
          transform: selected ? "translateY(-3px)" : undefined,
        }}
      >
        {/* Colored top accent strip — animates in on select */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ backgroundColor: color, originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: selected ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Card label */}
        <p className="font-body text-sm leading-relaxed text-text sm:text-base">
          {option.label}
        </p>

        {/* "this is me" badge — appears when selected */}
        <motion.div
          className="mt-4 flex items-center gap-1.5"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: selected ? 1 : 0, y: selected ? 0 : 4 }}
          transition={{ duration: 0.22, delay: selected ? 0.1 : 0 }}
        >
          {/* Checkmark circle */}
          <div
            className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: color }}
          >
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden>
              <path
                d="M1 3L3 5L7 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="font-heading text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color }}
          >
            this is me
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
