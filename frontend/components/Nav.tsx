"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "quiz", href: "/" },
  { label: "store", href: "/store" },
  { label: "about", href: "/about" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-text/[0.06] bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-heading text-sm font-bold lowercase tracking-wide text-text transition-opacity hover:opacity-60"
        >
          unbox your vibe
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative font-heading text-[11px] font-bold uppercase tracking-[0.18em] transition-colors",
                  isActive ? "text-text" : "text-muted hover:text-text"
                )}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-[3px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-text" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
