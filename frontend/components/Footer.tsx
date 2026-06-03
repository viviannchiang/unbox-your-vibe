// Small site-wide footer, rendered under every page via the root layout.
// Mirrors the nav: full-width h-14 bar with a border, content capped to the
// same mx-auto max-w-5xl px-6 container so the two line up.
export function Footer() {
  return (
    <footer className="flex h-14 items-center border-t border-text/[0.06]">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center px-6 text-center">
        <p className="font-body text-xs lowercase tracking-wide text-muted">
          <span aria-hidden className="mr-1 text-text">
            ♡
          </span>
          made with love by vivian (and my bestie claude)
        </p>
      </div>
    </footer>
  );
}
