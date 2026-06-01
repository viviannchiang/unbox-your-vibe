"use client";

// Phase 4: drag/swipe gesture that triggers box-opening animation

interface SwipeToCutProps {
  onComplete: () => void;
}

export function SwipeToCut({ onComplete }: SwipeToCutProps) {
  return (
    <button onClick={onComplete} className="font-body text-sm text-muted underline">
      tap to open (swipe gesture — phase 4)
    </button>
  );
}
