"use client";

interface ShareButtonsProps {
  typeCode: string;
}

export function ShareButtons({ typeCode }: ShareButtonsProps) {
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/result/${typeCode.toLowerCase()}`
    : "";

  function copyLink() {
    navigator.clipboard.writeText(url);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={copyLink}
        className="rounded-full border border-text px-5 py-2 font-body text-sm text-text transition-opacity hover:opacity-70"
      >
        copy link
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=i+got+${typeCode}+on+unbox+your+vibe&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-text px-5 py-2 font-body text-sm text-text transition-opacity hover:opacity-70"
      >
        share on twitter
      </a>
    </div>
  );
}
