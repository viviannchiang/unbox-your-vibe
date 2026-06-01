"use client";

import { QuestionCard } from "./QuestionCard";
import type { Question } from "@/lib/types";

interface QuestionViewProps {
  question: Question;
  selectedCardId: string | null;
  onSelect: (cardId: string) => void;
  accentColor?: string;
}

export function QuestionView({
  question,
  selectedCardId,
  onSelect,
  accentColor,
}: QuestionViewProps) {
  return (
    <div className="flex w-full flex-col gap-8 py-8">
      {/* Question text */}
      <div className="flex flex-col gap-2">
        <p
          className="font-heading text-[10px] font-bold uppercase tracking-[0.35em]"
          style={{ color: accentColor ?? "#8A8A8A" }}
        >
          ✦ &nbsp; choose one
        </p>
        <h2 className="font-heading text-2xl font-bold lowercase leading-snug text-text sm:text-3xl">
          {question.text}
        </h2>
      </div>

      {/* Two-card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {question.cards.map((card) => (
          <QuestionCard
            key={card.id}
            option={card}
            selected={selectedCardId === card.id}
            dimmed={selectedCardId !== null && selectedCardId !== card.id}
            onSelect={onSelect}
            accentColor={accentColor}
          />
        ))}
      </div>
    </div>
  );
}
