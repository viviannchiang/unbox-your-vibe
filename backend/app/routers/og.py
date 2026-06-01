import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.services.og_generator import generate_og_image

router = APIRouter(prefix="/api/og", tags=["og"])

DATA_DIR = Path(__file__).parent.parent / "data"


def _slugify(name: str) -> str:
    return name.lower().replace("'", "").replace(" ", "-")


@router.get("/figure/{slug}")
def get_og_image(slug: str):
    """Generate an OG share image by figure slug (e.g. 'explore', 'lets-go')."""
    with open(DATA_DIR / "personalities.json") as f:
        personalities = json.load(f)

    profile = next(
        (p for p in personalities.values() if _slugify(p.get("figure_name", "")) == slug.lower()),
        None,
    )
    if not profile:
        raise HTTPException(status_code=404, detail=f"No figure found for slug '{slug}'")

    image_bytes = generate_og_image(
        character=profile["character"],
        figure_name=profile["figure_name"],
    )
    return Response(content=image_bytes, media_type="image/png")
