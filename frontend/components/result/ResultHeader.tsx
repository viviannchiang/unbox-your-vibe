import type { PersonalityResult } from "@/lib/types";

interface ResultHeaderProps {
  result: PersonalityResult;
}

export function ResultHeader({ result }: ResultHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="font-heading text-xs font-semibold uppercase tracking-widest text-muted">
        {result.character} · {result.figureName}
      </p>
      <p className="font-heading text-lg italic" style={{ color: result.color }}>
        &ldquo;{result.tagline}&rdquo;
      </p>
    </div>
  );
}
