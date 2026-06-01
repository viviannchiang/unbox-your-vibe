"use client";

// Phase 4: figure rises from box with sparkle particle burst

interface FigureRevealProps {
  image: string;
  figureName: string;
}

export function FigureReveal({ image, figureName }: FigureRevealProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={figureName} className="h-48 w-auto object-contain" />
    </div>
  );
}
