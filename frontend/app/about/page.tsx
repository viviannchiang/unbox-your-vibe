import Link from "next/link";

const INTERESTS = [
  "video editing", "screenwriting", "digital art", "piano",
  "film", "food", "musicals", "ballet", "the met",
  "hiking", "cycling", "skiing", "collecting things",
];

const ROLES = [
  { label: "software engineer", sub: "squarespace", color: "#B8C6E8" },
  { label: "head of content", sub: "lunar accel", color: "#7A9E9F" },
  { label: "multidisciplinary creative", sub: "always", color: "#F5D5C0" },
];

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100dvh_-_3.5rem)] pt-14">

      {/* Hero */}
      <div className="pattern-dots px-6 py-20 text-center">
        <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-muted">
          ✦ &nbsp; the creator &nbsp; ✦
        </p>
        <h1
          className="mt-3 font-heading font-bold lowercase leading-[0.9] text-text"
          style={{ fontSize: "clamp(3rem, 9vw, 6rem)" }}
        >
          hi, i&apos;m<br />vivian.
        </h1>
      </div>

      {/* Main bio */}
      <div className="bg-card px-6 py-20">
        <div className="mx-auto max-w-2xl flex flex-col gap-12">

          {/* Bio paragraphs */}
          <div className="flex flex-col gap-5">
            <p className="font-body text-base leading-relaxed text-text">
              multidisciplinary creative based in new york city. software engineer at squarespace
              by day. head of content at <a href="https://lunaraccel.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity">lunar accel</a> — a nonprofit career accelerator
              for east & southeast asian american professionals — by night.
            </p>
            <p className="font-body text-base leading-relaxed text-muted">
              grew up between taiwan, the west coast, and the east coast, which basically explains
              everything about my taste. studied cs, marketing, design, and film at penn — which is
              a polite way of saying i couldn&apos;t pick just one thing.
            </p>
            <p className="font-body text-base leading-relaxed text-muted">
              i&apos;m interested in the overlap between technology, storytelling, and culture.
              i like making things that feel considered — whether that&apos;s a piece of content,
              a product experience, or a playlist.
            </p>
          </div>

          {/* Roles */}
          <div className="flex flex-col gap-3">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
              what i do
            </p>
            <div className="flex flex-col gap-2">
              {ROLES.map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <div
                    className="h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                  <span className="font-heading text-sm font-bold lowercase text-text">
                    {r.label}
                  </span>
                  <span className="font-body text-xs text-muted">@ {r.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why I made this */}
          <div className="flex flex-col gap-3">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
              why i made this
            </p>
            <p className="font-body text-base leading-relaxed text-text">
              i&apos;ve been obsessed with pop mart blind boxes for a while — the mystery,
              the collectibility, the ritual of opening one. personality quizzes scratch a similar
              itch. this was my excuse to build something that combined both: a quiz that ends
              in an unboxing moment instead of just a result page.
            </p>
            <p className="font-body text-base leading-relaxed text-muted">
              also an excuse to play with framer motion animations and see how far i could
              push a next.js side project on a weekend.
            </p>
          </div>

          {/* Interests */}
          <div className="flex flex-col gap-3">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
              into
            </p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-text/10 bg-background px-3.5 py-1.5 font-body text-xs lowercase text-muted"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/"
              className="rounded-full bg-text px-8 py-3 font-heading text-sm font-bold lowercase tracking-wide text-background shadow-card transition-all hover:opacity-80"
            >
              take the quiz →
            </Link>
            <Link
              href="/store"
              className="rounded-full border-2 border-text/15 px-8 py-3 font-heading text-sm font-bold lowercase tracking-wide text-text transition-all hover:border-text/30"
            >
              see the figures
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
