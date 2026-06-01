#!/usr/bin/env python3.13
"""
Reusable background remover for figure images.

Usage:
    backend/.venv/bin/python3.13 backend/scripts/remove_bg.py <image1> [<image2> ...]

Each input image is cut out with the u2net salient-object model and saved as a
transparent PNG to frontend/public/images/figures/<input-stem>.png.

The u2net.onnx model is expected at ~/.u2net/u2net.onnx (auto-downloaded if missing).
A pink-composite preview of each result is written to /tmp/<stem>-preview.png for QA.
"""

import sys
import urllib.request
from pathlib import Path

import numpy as np
import onnxruntime as ort
from PIL import Image

MODEL_URL = (
    "https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx"
)
MODEL_PATH = Path.home() / ".u2net" / "u2net.onnx"

MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32)
STD = np.array([0.229, 0.224, 0.225], dtype=np.float32)
SIZE = 320

# frontend/public/images/figures relative to this script (backend/scripts/)
OUT_DIR = (
    Path(__file__).resolve().parents[2]
    / "frontend"
    / "public"
    / "images"
    / "figures"
)


def ensure_model() -> None:
    if MODEL_PATH.exists():
        return
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    print(f"downloading u2net model → {MODEL_PATH} ...")
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
    print("download complete.")


def predict_mask(session: ort.InferenceSession, rgb: Image.Image) -> Image.Image:
    inp = rgb.resize((SIZE, SIZE), Image.LANCZOS)
    arr = np.array(inp, dtype=np.float32) / 255.0
    arr = (arr - MEAN) / STD
    arr = arr.transpose(2, 0, 1)[np.newaxis, ...].astype(np.float32)

    name = session.get_inputs()[0].name
    pred = session.run(None, {name: arr})[0]
    pred = pred[0, 0]
    pred = (pred - pred.min()) / (pred.max() - pred.min() + 1e-8)

    mask = Image.fromarray((pred * 255).astype(np.uint8), mode="L")
    return mask.resize(rgb.size, Image.LANCZOS)


def process(session: ort.InferenceSession, src: Path) -> Path:
    img = Image.open(src).convert("RGBA")
    rgb = img.convert("RGB")
    mask = predict_mask(session, rgb)

    out = img.copy()
    out.putalpha(mask)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    dest = OUT_DIR / f"{src.stem}.png"
    out.save(dest)

    # pink-composite preview for QA
    bg = Image.new("RGBA", out.size, (245, 181, 192, 255))
    Image.alpha_composite(bg, out).convert("RGB").save(
        f"/tmp/{src.stem}-preview.png"
    )

    return dest


def main(argv: list[str]) -> int:
    if not argv:
        print(__doc__)
        return 1
    ensure_model()
    session = ort.InferenceSession(
        str(MODEL_PATH), providers=["CPUExecutionProvider"]
    )
    for a in argv:
        src = Path(a).expanduser()
        if not src.exists():
            print(f"skip (not found): {src}")
            continue
        dest = process(session, src)
        print(f"✓ {src.name} → {dest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
