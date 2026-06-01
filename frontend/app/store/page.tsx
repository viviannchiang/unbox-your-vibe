import Link from "next/link";
import Image from "next/image";
import { withBase } from "@/lib/asset";

const CHARACTERS = [
  {
    name: "Nyota",
    vibe: "the dreamers",
    description: "soft · introspective · celestial",
    color: "#B8C6E8",
    initial: "N",
    figures: [
      { mbti: "INFP", name: "Cloudwatcher",      series: "I Am the Seasons" },
      { mbti: "INFJ", name: "Sanctuary Star",    series: "We Are All Stars" },
      { mbti: "ISFP", name: "Hidden in Autumn",  series: "I Am the Seasons" },
      { mbti: "ISFJ", name: "Snowfall Bliss",    series: "I Am the Seasons" },
      { mbti: "ENFJ", name: "Life-bearing Star", series: "We Are All Stars" },
    ],
  },
  {
    name: "Hirono",
    vibe: "the thinkers",
    description: "complex · independent · edgy",
    color: "#7A9E9F",
    initial: "H",
    figures: [
      { mbti: "INTJ", name: "Insight",   series: "City of Mercy"   },
      { mbti: "INTP", name: "Echo",      series: "City of Mercy"   },
      { mbti: "ENTJ", name: "Protector", series: "Little Mischief" },
      { mbti: "ISTP", name: "Ragpicker", series: "Little Mischief" },
      { mbti: "ENTP", name: "Manacle",   series: "Little Mischief" },
    ],
  },
  {
    name: "Lulu",
    vibe: "the caretakers",
    description: "warm · social · cheerful",
    color: "#F5B5C0",
    initial: "L",
    figures: [
      { mbti: "ESFJ", name: "Tea Break",            series: "Office"               },
      { mbti: "ESFP", name: "Serving Time",         series: "Pigchelin Restaurant" },
      { mbti: "ESTJ", name: "Survival Coffee",      series: "Office"               },
      { mbti: "ISTJ", name: "Buddha Mode",          series: "Office"               },
      { mbti: "ENFP", name: "Folk Singer",          series: "My Sweet Farm Garden" },
      { mbti: "ESTP", name: "The Greatest Magician", series: "Magician"            },
    ],
  },
] as const;

export default function StorePage() {
  return (
    <main className="min-h-screen pt-14">

      {/* Header */}
      <div className="pattern-dots px-6 py-20 text-center">
        <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-muted">
          ✦ &nbsp; the collection &nbsp; ✦
        </p>
        <h1
          className="mt-3 font-heading font-bold lowercase leading-tight text-text"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}
        >
          the figures.
        </h1>
        <p className="mt-3 font-body text-sm text-muted">
          16 figures across 3 characters.{" "}
          <Link href="/" className="underline underline-offset-2 hover:text-text transition-colors">
            take the quiz
          </Link>{" "}
          to find yours.
        </p>
      </div>

      {/* Character sections */}
      {CHARACTERS.map((char, charIdx) => (
        <section
          key={char.name}
          className={charIdx % 2 === 0 ? "bg-card" : "bg-background"}
        >
          <div className="mx-auto max-w-5xl px-6 py-16">

            {/* Character header */}
            <div className="mb-10 flex items-center gap-4">
              {/* Color circle with initial */}
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: char.color }}
              >
                <span className="font-heading text-sm font-bold text-white/80">
                  {char.initial}
                </span>
              </div>

              <div>
                <h2 className="font-heading text-xl font-bold lowercase text-text">
                  {char.name}
                </h2>
                <p className="font-body text-xs text-muted">
                  {char.vibe} &nbsp;·&nbsp; {char.description}
                </p>
              </div>

              {/* Accent rule */}
              <div
                className="ml-4 h-px flex-1 rounded-full opacity-40"
                style={{ backgroundColor: char.color }}
              />
            </div>

            {/* Figure grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {char.figures.map((fig) => (
                <FigureCard key={fig.mbti} figure={fig} color={char.color} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <div className="bg-card px-6 py-20 text-center">
        <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-muted">
          ✦ &nbsp; don&apos;t know yours? &nbsp; ✦
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold lowercase text-text">
          take the quiz.
        </h2>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-text px-10 py-3.5 font-heading text-sm font-bold lowercase tracking-wide text-background shadow-card transition-all hover:opacity-80"
        >
          start the quiz &nbsp;→
        </Link>
      </div>
    </main>
  );
}

// ── Figure card ───────────────────────────────────────────
type Figure = { mbti: string; name: string; series: string };

const slugify = (name: string) =>
  name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");

function FigureCard({ figure, color }: { figure: Figure; color: string }) {
  return (
    <div className="group overflow-hidden rounded-3xl shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Top — colour swatch + figure photo */}
      <div
        className="relative flex h-36 items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Image
          src={withBase(`/images/figures/${slugify(figure.name)}.png`)}
          alt={figure.name}
          width={130}
          height={130}
          className="h-28 w-28 object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {/* Bottom — info */}
      <div className="bg-card px-4 py-4">
        <p className="font-heading text-sm font-bold lowercase leading-snug text-text">
          {figure.name}
        </p>
        <p className="mt-0.5 font-body text-[11px] lowercase text-muted">
          {figure.series} series
        </p>
      </div>
    </div>
  );
}
