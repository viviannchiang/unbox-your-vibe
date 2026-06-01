"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-card">
      <div
        className="h-full rounded-full bg-text transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
