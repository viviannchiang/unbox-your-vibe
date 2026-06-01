import Link from "next/link";
import { CHARACTER_COLORS } from "@/lib/constants";

interface Compatible {
  type: string;
  character: string;
  figure: string;
}

interface CompatibleWithProps {
  compatibleWith: Compatible[];
}

export function CompatibleWith({ compatibleWith }: CompatibleWithProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-heading text-sm font-semibold lowercase tracking-wide text-muted">
        you&apos;d also vibe with
      </h3>
      <div className="flex flex-wrap gap-3">
        {compatibleWith.map((c) => (
          <Link
            key={c.type}
            href={`/result/${c.type.toLowerCase()}`}
            className="rounded-full border px-4 py-2 font-body text-sm transition-opacity hover:opacity-80"
            style={{ borderColor: CHARACTER_COLORS[c.character as keyof typeof CHARACTER_COLORS] }}
          >
            {c.character} &ldquo;{c.figure}&rdquo; ({c.type})
          </Link>
        ))}
      </div>
    </div>
  );
}
