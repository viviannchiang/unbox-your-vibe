// Phase 5: full result page (personality card, compatible types, share)

import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import { PERSONALITIES } from "@/lib/data/personalities";
import { slugifyFigure } from "@/lib/scoring";
import { withBase } from "@/lib/asset";
import { ResultGate } from "@/components/result/ResultGate";

interface ResultPageProps {
  params: Promise<{ figure: string }>;
}

// Pre-render every figure page at build time (required for static export).
export function generateStaticParams() {
  return Object.values(PERSONALITIES).map((p) => ({
    figure: slugifyFigure(p.figureName),
  }));
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { figure } = await params;
  const data = api.getResultByFigure(figure);

  const figureName = data?.figureName ?? figure.replace(/-/g, " ");
  const character = data?.character ?? "";
  const series = data?.series ?? "";
  const tagline = data?.tagline ?? "";
  const color = data?.color ?? "#F5B5C0";
  const image = data?.image ?? `/images/figures/${figure}.png`;

  return (
    <ResultGate>
    <main className="pattern-dots flex min-h-screen flex-col items-center justify-center gap-8 px-4 pt-14 text-center">
      <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-muted">
        ✦ &nbsp; your figure &nbsp; ✦
      </p>
      {/* Figure photo on colour backdrop */}
      <div
        className="flex h-60 w-60 items-center justify-center rounded-full shadow-card"
        style={{ backgroundColor: color }}
      >
        <Image
          src={withBase(image)}
          alt={figureName}
          width={220}
          height={220}
          priority
          className="h-52 w-52 object-contain drop-shadow-md"
        />
      </div>
      <h1
        className="font-heading font-bold lowercase leading-tight text-text"
        style={{ fontSize: "clamp(2.8rem, 9vw, 5.5rem)" }}
      >
        {figureName}
      </h1>
      {character && series && (
        <p className="font-body text-sm text-muted">
          {character} &nbsp;·&nbsp; {series} series
        </p>
      )}
      {tagline && (
        <p className="font-body text-base italic text-muted">
          &ldquo;{tagline}&rdquo;
        </p>
      )}
      <p className="font-body text-xs text-muted/70">
        full result page coming in phase 5.
      </p>
      <Link
        href="/quiz"
        className="rounded-full bg-text px-8 py-3 font-heading text-sm font-bold lowercase tracking-wide text-background shadow-card transition-all hover:opacity-80"
      >
        retake quiz
      </Link>
    </main>
    </ResultGate>
  );
}
