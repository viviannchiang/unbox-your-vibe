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
  mode = "share-and-save",
}: {
  data: PersonalityResult;
  pairs: PersonalityResult[];
  // "share-and-save" shows both the native-share button and a save button;
  // "save" shows only the save-image button (used on store profile pages).
  mode?: "share-and-save" | "save";
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
      {mode === "share-and-save" && (
        <button
          onClick={handleShare}
          disabled={busy !== null}
          className="rounded-full bg-text px-8 py-3 text-center font-heading text-sm font-bold lowercase tracking-wide text-background shadow-card transition-all hover:opacity-80 disabled:opacity-60"
        >
          {shareLabel}
        </button>
      )}
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

// Trace the ticket card: a clean rounded rectangle. (Straight top/bottom —
// the dashed dividers and stamp carry the ticket feel.)
function ticketPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// A dashed horizontal divider, as on a tear-off ticket.
function dashedDivider(
  ctx: CanvasRenderingContext2D,
  x1: number,
  x2: number,
  y: number,
  color: string,
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.setLineDash([9, 9]);
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
  ctx.restore();
}

// A tilted "postmark" stamp, like a collector's badge in the corner.
function drawStamp(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string,
  heading: string,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((-14 * Math.PI) / 180);
  ctx.globalAlpha = 0.7;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([4, 5]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, r - 9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = `700 15px ${heading}`;
  ctx.fillText("✦", 0, -r + 26);
  ctx.font = `700 19px ${heading}`;
  ctx.fillText("COLLECT", 0, -6);
  ctx.fillText("THEM ALL", 0, 16);
  ctx.restore();
  ctx.textBaseline = "alphabetic";
}

// Lay the vibe words out as centered pill/chips (mirrors the on-site "the vibe"
// section). Returns the y just below the last row.
function drawChips(
  ctx: CanvasRenderingContext2D,
  words: string[],
  cx: number,
  top: number,
  maxWidth: number,
  accent: string,
  ink: string,
  heading: string,
): number {
  const padX = 22;
  const chipH = 46;
  const gapX = 12;
  const gapY = 12;
  ctx.font = `700 22px ${heading}`;

  type Chip = { w: string; width: number };
  const items: Chip[] = words.map((w) => ({
    w,
    width: ctx.measureText(w).width + padX * 2,
  }));

  // Flow chips into rows that fit within maxWidth.
  const rows: { items: Chip[]; width: number }[] = [];
  let row: Chip[] = [];
  let rowW = 0;
  for (const it of items) {
    const add = (row.length ? gapX : 0) + it.width;
    if (rowW + add > maxWidth && row.length) {
      rows.push({ items: row, width: rowW });
      row = [it];
      rowW = it.width;
    } else {
      row.push(it);
      rowW += add;
    }
  }
  if (row.length) rows.push({ items: row, width: rowW });

  let y = top;
  for (const r of rows) {
    let x = cx - r.width / 2; // center each row
    for (const it of r.items) {
      const rad = chipH / 2;
      ctx.beginPath();
      ctx.moveTo(x + rad, y);
      ctx.arcTo(x + it.width, y, x + it.width, y + chipH, rad);
      ctx.arcTo(x + it.width, y + chipH, x, y + chipH, rad);
      ctx.arcTo(x, y + chipH, x, y, rad);
      ctx.arcTo(x, y, x + it.width, y, rad);
      ctx.closePath();
      ctx.fillStyle = accent + "33";
      ctx.fill();

      ctx.fillStyle = ink;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(it.w, x + it.width / 2, y + chipH / 2 + 1);
      x += it.width + gapX;
    }
    y += chipH + gapY;
  }
  ctx.textBaseline = "alphabetic";
  return y;
}

async function buildShareImage(
  data: PersonalityResult,
  pairs: PersonalityResult[],
): Promise<Blob> {
  const W = 1080;
  const H = 1800;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas context");

  const ink = "#2D2D2D";
  const muted = "#8A8A8A";
  const accent = data.color;
  const dash = "rgba(45,45,45,0.18)";
  const heading = '"Trebuchet MS", "Segoe UI", system-ui, sans-serif';
  const cx = W / 2;

  // Make sure web fonts are ready so text isn't drawn in a fallback first.
  try {
    await (document as unknown as { fonts?: { ready: Promise<unknown> } })
      .fonts?.ready;
  } catch {
    /* ignore */
  }

  // Page background — a soft wash of the figure's colour.
  ctx.fillStyle = "#F5F0F0";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.16;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 1;

  // ── Ticket stub ───────────────────────────────────────────
  const tX = 70;
  const tY = 72;
  const tW = W - tX * 2;
  const tH = H - tY * 2;
  ctx.save();
  ticketPath(ctx, tX, tY, tW, tH, 40);
  ctx.shadowColor = "rgba(45,45,45,0.14)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.restore();

  const dx1 = tX + 64;
  const dx2 = tX + tW - 64;
  const textW = tW - 150;

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  const setSpacing = (px: string) => {
    if ("letterSpacing" in ctx) {
      (ctx as unknown as { letterSpacing: string }).letterSpacing = px;
    }
  };

  // Header: wordmark + "admit one" style sub-line
  let y = tY + 86;
  ctx.fillStyle = muted;
  ctx.font = `700 24px ${heading}`;
  setSpacing("8px");
  ctx.fillText("✦   UNBOX YOUR VIBE   ✦", cx, y);
  y += 30;
  ctx.font = `700 16px ${heading}`;
  ctx.fillText("BLIND BOX · COLLECTOR'S EDITION", cx, y);
  setSpacing("0px");

  y += 28;
  dashedDivider(ctx, dx1, dx2, y, dash);

  // Colour circle + figure
  const ccy = y + 156;
  const cr = 110;
  ctx.beginPath();
  ctx.arc(cx, ccy, cr, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();
  try {
    const img = await loadImage(withBase(data.image));
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, ccy, cr, 0, Math.PI * 2);
    ctx.clip();
    drawContained(ctx, img, cx, ccy, cr * 1.85);
    ctx.restore();
  } catch {
    /* figure failed to load — keep the circle */
  }

  // Collector's stamp, tucked in the top-right of the ticket
  drawStamp(ctx, tX + tW - 132, ccy - 56, 74, accent, heading);

  y = ccy + cr + 66;

  // Figure name (may wrap)
  ctx.fillStyle = ink;
  ctx.font = `700 58px ${heading}`;
  for (const line of wrapText(ctx, data.figureName.toLowerCase(), textW)) {
    ctx.fillText(line, cx, y);
    y += 64;
  }

  // Character · series
  ctx.fillStyle = muted;
  ctx.font = `400 27px ${heading}`;
  y += 4;
  ctx.fillText(
    `${displayCharacter(data.character)}   ·   ${data.series} series`,
    cx,
    y,
  );

  // Tagline (italic, wraps)
  ctx.fillStyle = "rgba(45,45,45,0.72)";
  ctx.font = 'italic 31px Georgia, "Times New Roman", serif';
  y += 50;
  for (const line of wrapText(ctx, `“${data.tagline}”`, textW - 30)) {
    ctx.fillText(line, cx, y);
    y += 43;
  }

  // ── Summary: "the deal" ───────────────────────────────────
  y += 30;
  dashedDivider(ctx, dx1, dx2, y, dash);
  y += 48;
  ctx.fillStyle = accent;
  ctx.font = `700 21px ${heading}`;
  setSpacing("4px");
  ctx.fillText("✦   THE DEAL", cx, y);
  setSpacing("0px");

  y += 42;
  ctx.fillStyle = "rgba(45,45,45,0.8)";
  ctx.font = `400 25px ${heading}`;
  for (const line of wrapText(ctx, data.description, textW).slice(0, 3)) {
    ctx.fillText(line, cx, y);
    y += 37;
  }

  // ── "the vibe" word chips ─────────────────────────────────
  if (data.vibeWords && data.vibeWords.length > 0) {
    y += 28;
    dashedDivider(ctx, dx1, dx2, y, dash);
    y += 48;
    ctx.fillStyle = accent;
    ctx.font = `700 21px ${heading}`;
    ctx.textAlign = "center";
    setSpacing("4px");
    ctx.fillText("✦   THE VIBE", cx, y);
    setSpacing("0px");
    y += 42;
    y = drawChips(ctx, data.vibeWords, cx, y, textW, accent, ink, heading);
    y += 6;
  }

  // ── "you pair well with" ──────────────────────────────────
  const trio = pairs.slice(0, 3);
  if (trio.length > 0) {
    y += 26;
    dashedDivider(ctx, dx1, dx2, y, dash);
    y += 48;
    ctx.fillStyle = muted;
    ctx.font = `700 21px ${heading}`;
    setSpacing("4px");
    ctx.fillText("✦   YOU PAIR WELL WITH", cx, y);
    setSpacing("0px");

    const circR = 56;
    const circCy = y + 38 + circR;
    const spacing = 290;
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

      ctx.fillStyle = ink;
      ctx.font = `700 21px ${heading}`;
      const nameLines = wrapText(ctx, p.figureName.toLowerCase(), 250).slice(
        0,
        2,
      );
      let ny = circCy + circR + 38;
      for (const line of nameLines) {
        ctx.fillText(line, px, ny);
        ny += 25;
      }
    });
  }

  // Footer URL, near the bottom edge of the card
  ctx.fillStyle = muted;
  ctx.font = `700 23px ${heading}`;
  ctx.fillText("viviannchiang.github.io/unbox-your-vibe", cx, tY + tH - 40);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      "image/png",
    );
  });
}
