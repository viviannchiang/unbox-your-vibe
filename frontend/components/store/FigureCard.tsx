import Image from "next/image";
import Link from "next/link";
import { withBase } from "@/lib/asset";

type Figure = { mbti: string; name: string; series: string };

const slugify = (name: string) =>
  name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");

// A store card linking to the figure's own profile page at /store/[figure].
export function FigureCard({
  figure,
  color,
}: {
  figure: Figure;
  color: string;
}) {
  return (
    <Link
      href={`/store/${slugify(figure.name)}`}
      className="group block w-full overflow-hidden rounded-3xl text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
    >
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
    </Link>
  );
}
