// Small site-wide footer, rendered under every page via the root layout.
export function Footer() {
  return (
    <footer className="border-t border-text/[0.06] px-6 py-8 text-center">
      <p className="font-body text-xs lowercase tracking-wide text-muted">
        <span aria-hidden className="mr-1 text-text">
          ♡
        </span>
        made with love by vivian (and my bestie claude)
      </p>
    </footer>
  );
}
