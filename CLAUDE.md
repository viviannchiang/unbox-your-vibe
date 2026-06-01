# Project rules — unbox your vibe

## Git
- **Never add a `Co-Authored-By: Claude ...` trailer (or any Claude attribution) to commit messages.** Keep commit messages clean with no AI co-author lines.

## Content
- **Never reference MBTI (type codes like INFP, or the term "MBTI") anywhere in the UI / pages.** Only the figures and characters are shown to users. Type codes may exist internally (scoring, data keys) but must never be surfaced.

## Architecture
- The site is a **static export** deployed to GitHub Pages at `https://viviannchiang.github.io/unbox-your-vibe/`. All quiz data and scoring run **in the browser** (`frontend/lib/data`, `frontend/lib/scoring.ts`). The `backend/` (FastAPI) is retained for reference only and is **not** part of the live site.
- Public assets must be referenced through `withBase()` (`frontend/lib/asset.ts`) so they resolve under the `/unbox-your-vibe` basePath.
