from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from app.core.config import settings


def generate_certificate_image(full_name: str) -> bytes:
    if settings.certificate_bg_path:
        base = Image.open(settings.certificate_bg_path).convert("RGBA")
    else:
        base = Image.new("RGBA", (1600, 1000), (245, 247, 250, 255))

    draw = ImageDraw.Draw(base)
    title_font = ImageFont.truetype("Arial.ttf", 72) if False else ImageFont.load_default()
    name_font = ImageFont.truetype("Arial.ttf", 56) if False else ImageFont.load_default()

    w, _ = base.size
    draw.text((w / 2, 200), "Certificate of Completion", anchor="mm", fill=(20, 20, 20), font=title_font)
    draw.text((w / 2, 350), full_name, anchor="mm", fill=(0, 102, 204), font=name_font)
    draw.text((w / 2, 420), "AI Mini Course", anchor="mm", fill=(20, 20, 20), font=name_font)

    output = BytesIO()
    base.convert("RGB").save(output, format="PNG")
    return output.getvalue()



