import Link from "next/link";
import { displayCharacter } from "@/lib/constants";
import { FigureCard } from "@/components/store/FigureCard";

const CHARACTERS = [
  {
    name: "Nyota",
    vibe: "the dreamers",
    description: "soft · heartfelt · celestial",
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
    description: "warm · lively · loyal",
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
    <main className="min-h-[calc(100dvh_-_3.5rem)] pt-14">

      {/* Header — ticket / collector's-edition vibe */}
      <div className="pattern-dots relative overflow-hidden border-b-2 border-dashed border-text/15 px-6 py-20 text-center">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-muted">
          ✦ &nbsp; the collector&apos;s lineup &nbsp; ✦
        </p>
        <p className="mt-3 font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-muted/80">
          blind box &nbsp;·&nbsp; 16 figures
        </p>
      </div>

      {/* Character sections */}
      {CHARACTERS.map((char) => (
        <section
          key={char.name}
          // Tint each section with a soft wash of the character's colour so the
          // white card info strips stand out (a plain-white section would hide
          // them).
          style={{ backgroundColor: char.color + "1F" }}
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
                  {displayCharacter(char.name)}
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

      {/* Bottom CTA — closes the "ticket" with a matching tear-line */}
      <div className="relative overflow-hidden border-t-2 border-dashed border-text/15 bg-card px-6 py-20 text-center">
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
