import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { slugifyFigure } from "@/lib/scoring";
import { PERSONALITIES } from "@/lib/data/personalities";
import { ProfileView } from "@/components/result/ProfileView";
import { ShareButton } from "@/components/result/ShareButton";
import type { PersonalityResult } from "@/lib/types";

// Pre-render one static page per figure so /store/[figure] works on GitHub
// Pages (no server to resolve params at request time).
export function generateStaticParams() {
  return Object.values(PERSONALITIES).map((p) => ({
    figure: slugifyFigure(p.figureName),
  }));
}

export default function StoreFigurePage({
  params,
}: {
  params: { figure: string };
}) {
  const data = api.getResultByFigure(params.figure);
  if (!data) notFound();

  // Resolve each compatible figure to its full profile (image + colour).
  const pairs = data.compatibleWith
    .map((c) => api.getResultByFigure(slugifyFigure(c.figure)))
    .filter((p): p is PersonalityResult => p !== null);

  return (
    <ProfileView
      data={data}
      pairs={pairs}
      backButton={
        <Link
          href="/store"
          className="inline-flex items-center gap-1.5 font-heading text-sm font-bold lowercase tracking-wide text-muted transition-colors hover:text-text"
        >
          <span aria-hidden>←</span> back to the store
        </Link>
      }
      actions={
        <>
          <Link
            href="/quiz"
            className="rounded-full bg-text px-8 py-3 text-center font-heading text-sm font-bold lowercase tracking-wide text-background shadow-card transition-all hover:opacity-80"
          >
            take the quiz
          </Link>
          <ShareButton data={data} pairs={pairs} mode="save" />
        </>
      }
    />
  );
}
