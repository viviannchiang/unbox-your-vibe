from PIL import Image, ImageDraw, ImageFont
import io

CHARACTER_COLORS = {
    "Nyota": (184, 198, 232),
    "Hirono": (122, 158, 159),
    "Lulu": (245, 181, 192),
}


def generate_og_image(character: str, figure_name: str) -> bytes:
    """Generate a 1200x630 OG image for the given result (figure only, no MBTI)."""
    bg_color = CHARACTER_COLORS.get(character, (245, 240, 240))
    img = Image.new("RGB", (1200, 630), color=bg_color)
    draw = ImageDraw.Draw(img)

    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 80)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
    except Exception:
        font_large = ImageFont.load_default()
        font_small = font_large

    draw.text((600, 250), "unbox your vibe", font=font_large, fill=(45, 45, 45), anchor="mm")
    draw.text((600, 370), f"{character} · {figure_name}", font=font_small, fill=(45, 45, 45), anchor="mm")

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()
