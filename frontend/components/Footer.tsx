// Small site-wide footer, rendered under every page via the root layout.
export function Footer() {
  return (
    <footer className="flex h-14 items-center justify-center border-t border-text/[0.06] px-6 text-center">
      <p className="font-body text-xs lowercase tracking-wide text-muted">
        <span aria-hidden className="mr-1 text-text">
          ♡
        </span>
        made with love by vivian (and my bestie claude)
      </p>
    </footer>
  );
}
