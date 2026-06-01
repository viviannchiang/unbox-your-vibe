"use client";

import { useState } from "react";
import { withBase } from "@/lib/asset";
import { displayCharacter } from "@/lib/constants";
import type { PersonalityResult } from "@/lib/types";

const SITE_URL = "https://viviannchiang.github.io/unbox-your-vibe/";

// Builds a single shareable image of the result on a canvas, then either hands
// it to the native share sheet (mobile) or downloads it. We offer both a
// "share" action (native sheet, with a download fallback) and an explicit
// "save image" action (always downloads), since plain download is the only
// option on most desktop browsers.
export function ShareButton({
  data,
  pairs,
}: {
  data: PersonalityResult;
  pairs: PersonalityResult[];
}) {
  const [busy, setBusy] = useState<null | "share" | "save">(null);
  const [done, setDone] = useState<null | "shared" | "saved">(null);

  function flashDone(state: "shared" | "saved") {
    setDone(state);
    window.setTimeout(() => setDone(null), 2500);
  }

  function downloadBlob(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-vibe.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function handleShare() {
    if (busy) return;
    setBusy("share");
    try {
      const blob = await buildShareImage(data, pairs);
      const file = new File([blob], "my-vibe.png", { type: "image/png" });
      const text = `i'm ${data.figureName} (${displayCharacter(
        data.character,
      )}). unbox your vibe to find yours! ${SITE_URL}`;

      if (
        typeof navigator !== "undefined" &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "unbox your vibe",
          text,
        });
        flashDone("shared");
      } else {
        downloadBlob(blob);
        flashDone("saved");
      }
    } catch {
      // user cancelled the share sheet, or something failed — stay silent
    } finally {
      setBusy(null);
    }
  }

  async function handleSave() {
    if (busy) return;
    setBusy("save");
    try {
      const blob = await buildShareImage(data, pairs);
      downloadBlob(blob);
      flashDone("saved");
    } catch {
      /* stay silent */
    } finally {
      setBusy(null);
    }
  }

  const shareLabel =
    busy === "share"
      ? "creating…"
      : done === "shared"
        ? "shared ✓"
        : "share your result";

  const saveLabel =
    busy === "save"
      ? "creating…"
      : done === "saved"
        ? "image saved ✓"
        : "save image";

  return (
    <>
      <button
        onClick={handleShare}
        disabled={busy !== null}
        className="rounded-full bg-text px-8 py-3 text-center font-heading text-sm font-bold lowercase tracking-wide text-background shadow-card transition-all hover:opacity-80 disabled:opacity-60"
      >
        {shareLabel}
      </button>
      <button
        onClick={handleSave}
        disabled={busy !== null}
        className="rounded-full border-2 border-text px-8 py-3 text-center font-heading text-sm font-bold lowercase tracking-wide text-text transition-all hover:bg-text hover:text-background disabled:opacity-60"
      >
        {saveLabel}
      </button>
    </>
  );
}

// ── canvas helpers ──────────────────────────────────────────

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Draw an image scaled to fit (contain) inside a square box centred on (cx, cy).
function drawContained(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  box: number,
) {
  const ratio = Math.min(box / img.width, box / img.height);
  const dw = img.width * ratio;
  const dh = img.height * ratio;
  ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
}

async function buildShareImage(
  data: PersonalityResult,
  pairs: PersonalityResult[],
): Promise<Blob> {
  const W = 1080;
  const H = 1350;
  const PAD = 110;
  const contentW = W - PAD * 2;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas context");

  const ink = "#2D2D2D";
  const muted = "#8A8A8A";
  const accent = data.color;
  const heading = '"Trebuchet MS", "Segoe UI", system-ui, sans-serif';

  // Make sure web fonts are ready so text isn't drawn in a fallback first.
  try {
    await (document as unknown as { fonts?: { ready: Promise<unknown> } })
      .fonts?.ready;
  } catch {
    /* ignore */
  }

  // Background
  ctx.fillStyle = "#F5F0F0";
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  const setSpacing = (px: string) => {
    if ("letterSpacing" in ctx) {
      (ctx as unknown as { letterSpacing: string }).letterSpacing = px;
    }
  };

  // Top wordmark
  ctx.fillStyle = muted;
  ctx.font = `700 24px ${heading}`;
  setSpacing("8px");
  ctx.fillText("✦   UNBOX YOUR VIBE   ✦", W / 2, 96);
  setSpacing("0px");

  // Colour circle + figure (small)
  const cx = W / 2;
  const cy = 270;
  const r = 118;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();
  try {
    const img = await loadImage(withBase(data.image));
    drawContained(ctx, img, cx, cy, r * 1.5);
  } catch {
    /* figure failed to load — keep the circle */
  }

  let y = cy + r + 76;

  // Figure name (may wrap)
  ctx.fillStyle = ink;
  ctx.font = `700 60px ${heading}`;
  for (const line of wrapText(ctx, data.figureName.toLowerCase(), contentW)) {
    ctx.fillText(line, cx, y);
    y += 66;
  }

  // Character · series
  ctx.fillStyle = muted;
  ctx.font = `400 28px ${heading}`;
  y += 6;
  ctx.fillText(
    `${displayCharacter(data.character)}   ·   ${data.series} series`,
    cx,
    y,
  );

  // Tagline (italic, wraps)
  ctx.fillStyle = "rgba(45,45,45,0.72)";
  ctx.font = 'italic 32px Georgia, "Times New Roman", serif';
  y += 54;
  for (const line of wrapText(ctx, `“${data.tagline}”`, contentW - 40)) {
    ctx.fillText(line, cx, y);
    y += 44;
  }

  // ── Summary: "the deal" description ────────────────────────
  y += 40;
  ctx.fillStyle = accent;
  ctx.font = `700 22px ${heading}`;
  setSpacing("4px");
  ctx.fillText("✦   THE DEAL", cx, y);
  setSpacing("0px");

  y += 44;
  ctx.fillStyle = "rgba(45,45,45,0.8)";
  ctx.font = `400 26px ${heading}`;
  const descLines = wrapText(ctx, data.description, contentW).slice(0, 6);
  for (const line of descLines) {
    ctx.fillText(line, cx, y);
    y += 38;
  }

  // ── "you pair well with" — flows just below the paragraph ──
  const trio = pairs.slice(0, 3);
  if (trio.length > 0) {
    y += 56;
    ctx.fillStyle = muted;
    ctx.font = `700 22px ${heading}`;
    setSpacing("4px");
    ctx.fillText("✦   YOU PAIR WELL WITH", cx, y);
    setSpacing("0px");

    const circR = 58;
    const circCy = y + 40 + circR;
    const spacing = 300;
    const start = cx - ((trio.length - 1) * spacing) / 2;

    const loaded = await Promise.all(
      trio.map(async (p) => {
        try {
          return await loadImage(withBase(p.image));
        } catch {
          return null;
        }
      }),
    );

    trio.forEach((p, i) => {
      const px = start + i * spacing;
      ctx.beginPath();
      ctx.arc(px, circCy, circR, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      const img = loaded[i];
      if (img) drawContained(ctx, img, px, circCy, circR * 1.45);

      // figure name (wrap to 2 lines max under the circle)
      ctx.fillStyle = ink;
      ctx.font = `700 22px ${heading}`;
      const nameLines = wrapText(ctx, p.figureName.toLowerCase(), 250).slice(
        0,
        2,
      );
      let ny = circCy + circR + 40;
      for (const line of nameLines) {
        ctx.fillText(line, px, ny);
        ny += 26;
      }
    });
  }

  // Footer URL
  ctx.fillStyle = muted;
  ctx.font = `700 24px ${heading}`;
  ctx.fillText("viviannchiang.github.io/unbox-your-vibe", cx, H - 46);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      "image/png",
    );
  });
}
