interface ThisIsYouProps {
  bullets: string[];
}

export function ThisIsYou({ bullets }: ThisIsYouProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-heading text-sm font-semibold lowercase tracking-wide text-muted">this is you</h3>
      <ul className="flex flex-col gap-2">
        {bullets.map((b, i) => (
          <li key={i} className="font-body text-sm text-text">
            — {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
