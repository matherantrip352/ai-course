# Backend/app/services/certificate.py
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import requests
from datetime import datetime
from app.core.config import settings

def generate_certificate_image(full_name: str) -> bytes:
    # Define certificate dimensions (A4-like ratio, adjusted for high resolution)
    width, height = 1200, 848  # Adjusted to match a clean 16:9 aspect ratio

    # Create base image with gradient background (blue to orange, inspired by NPCI design)
    certificate = Image.new("RGB", (width, height), (255, 255, 255))  # White base
    draw = ImageDraw.Draw(certificate)
    
    # Apply gradient background
    for y in range(height):
        r = int(70 + (y / height) * 185)  # Blue (70, 130, 200) to orange (255, 165, 70)
        g = int(130 + (y / height) * 35)
        b = int(200 - (y / height) * 130)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Load fonts with fallback to default
    try:
        header_font = ImageFont.truetype("arial.ttf", 24)
        title_font = ImageFont.truetype("arial.ttf", 64)
        name_font = ImageFont.truetype("arial.ttf", 48)
        desc_font = ImageFont.truetype("arial.ttf", 24)
    except:
        header_font = ImageFont.load_default()
        title_font = ImageFont.load_default()
        name_font = ImageFont.load_default()
        desc_font = ImageFont.load_default()

    # Header - NPCI X OPENAI PRESENT
    header_text = "NPCI X OPENAI PRESENT"
    header_bbox = draw.textbbox((0, 0), header_text, font=header_font)
    header_width = header_bbox[2] - header_bbox[0]
    draw.text(((width - header_width) // 2, 50), header_text, fill=(255, 255, 255), font=header_font)

    # Placeholder for logos (replace with actual image URLs or local paths if available)
    # Assuming logos are centered below header
    logo_text = "<NPCI LOGO> <OPENAI LOGO>"
    logo_bbox = draw.textbbox((0, 0), logo_text, font=header_font)
    logo_width = logo_bbox[2] - logo_bbox[0]
    draw.text(((width - logo_width) // 2, 90), logo_text, fill=(255, 255, 255), font=header_font)

    # Main title - CERTIFICATE OF COMPLETION
    title_text = "CERTIFICATE OF"
    title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    draw.text(((width - title_width) // 2, 180), title_text, fill=(255, 255, 255), font=title_font)

    completion_text = "COMPLETION"
    completion_bbox = draw.textbbox((0, 0), completion_text, font=title_font)
    completion_width = completion_bbox[2] - completion_bbox[0]
    draw.text(((width - completion_width) // 2, 260), completion_text, fill=(255, 255, 255), font=title_font)

    # Name
    name_bbox = draw.textbbox((0, 0), full_name.upper(), font=name_font)
    name_width = name_bbox[2] - name_bbox[0]
    draw.text(((width - name_width) // 2, 360), full_name.upper(), fill=(255, 255, 255), font=name_font)

    # Course description
    course_text = "for completing the course 'Fundamentals of AI'"
    course_bbox = draw.textbbox((0, 0), course_text, font=desc_font)
    course_width = course_bbox[2] - course_bbox[0]
    draw.text(((width - course_width) // 2, 420), course_text, fill=(255, 255, 255), font=desc_font)

    event_text = f"at the Global Fintech Festival {datetime.now().year}"
    event_bbox = draw.textbbox((0, 0), event_text, font=desc_font)
    event_width = event_bbox[2] - event_bbox[0]
    draw.text(((width - event_width) // 2, 450), event_text, fill=(255, 255, 255), font=desc_font)

    # Date
    date_text = f"Date of Issue: {datetime.now().strftime('%B %d, %Y')}"
    date_bbox = draw.textbbox((0, 0), date_text, font=desc_font)
    date_width = date_bbox[2] - date_bbox[0]
    draw.text(((width - date_width) // 2, 500), date_text, fill=(255, 255, 255), font=desc_font)

    # Signature lines and labels
    # OpenAI signature area (right side)
    draw.line([(width - 300, 620), (width - 150, 620)], fill=(255, 255, 255), width=2)
    openai_text = "OPEN AI"
    openai_bbox = draw.textbbox((0, 0), openai_text, font=desc_font)
    openai_width = openai_bbox[2] - openai_bbox[0]
    draw.text((width - 225 - openai_width // 2, 640), openai_text, fill=(255, 255, 255), font=desc_font)

    # NPCI signature area (left side)
    draw.line([(150, 620), (300, 620)], fill=(255, 255, 255), width=2)
    npci_text = "NPCI"
    npci_bbox = draw.textbbox((0, 0), npci_text, font=desc_font)
    npci_width = npci_bbox[2] - npci_bbox[0]
    draw.text((225 - npci_width // 2, 640), npci_text, fill=(255, 255, 255), font=desc_font)

    # Draw geometric patterns
    draw_geometric_patterns(draw, width, height)

    # Convert to bytes
    output = BytesIO()
    certificate.save(output, format="PNG", quality=95, dpi=(300, 300))
    return output.getvalue()

def draw_geometric_patterns(draw, width, height):
    """Draw geometric patterns inspired by the NPCI certificate design"""
    # Define colors (inspired by blue-orange gradient and accents)
    blue = (70, 130, 200)
    orange = (255, 165, 70)
    light_blue = (150, 180, 220)
    light_orange = (255, 200, 150)

    # Define patterns (enhanced to match certificate corners and edges)
    patterns = [
        # Top left area
        {"type": "circle", "pos": (100, 100), "size": 70, "color": blue, "fill": True},
        {"type": "circle", "pos": (160, 160), "size": 50, "color": orange, "fill": False, "width": 8},
        {"type": "rectangle", "pos": (50, 180), "size": (40, 40), "color": light_orange, "fill": True},

        # Top right area
        {"type": "circle", "pos": (width - 100, 100), "size": 60, "color": blue, "fill": False, "width": 6},
        {"type": "circle", "pos": (width - 160, 160), "size": 45, "color": orange, "fill": True},
        {"type": "triangle", "pos": [(width - 80, 160), (width - 40, 160), (width - 60, 120)], "color": light_orange, "fill": True},

        # Bottom left area
        {"type": "circle", "pos": (80, height - 120), "size": 80, "color": light_blue, "fill": True},
        {"type": "rectangle", "pos": (30, height - 80), "size": (50, 30), "color": orange, "fill": True, "pattern": True},
        {"type": "semicircle", "pos": (150, height - 100), "size": 55, "color": blue, "fill": True},

        # Bottom right area
        {"type": "circle", "pos": (width - 110, height - 110), "size": 65, "color": blue, "fill": True},
        {"type": "rectangle", "pos": (width - 70, height - 160), "size": (45, 45), "color": orange, "fill": True, "pattern": True},
        {"type": "triangle", "pos": [(width - 170, height - 60), (width - 120, height - 60), (width - 145, height - 20)], "color": light_orange, "fill": True},

        # Middle decorative elements
        {"type": "rectangle", "pos": (width - 220, 320), "size": (30, 60), "color": light_blue, "fill": True, "pattern": True},
        {"type": "circle", "pos": (200, 370), "size": 40, "color": light_orange, "fill": True},
    ]

    for pattern in patterns:
        if pattern["type"] == "circle":
            pos = pattern["pos"]
            size = pattern["size"]
            color = pattern["color"]
            if pattern.get("fill", True):
                draw.ellipse([pos[0] - size // 2, pos[1] - size // 2, pos[0] + size // 2, pos[1] + size // 2], fill=color)
            else:
                width = pattern.get("width", 3)
                draw.ellipse([pos[0] - size // 2, pos[1] - size // 2, pos[0] + size // 2, pos[1] + size // 2], outline=color, width=width)

        elif pattern["type"] == "rectangle":
            pos = pattern["pos"]
            size = pattern["size"]
            color = pattern["color"]
            if pattern.get("pattern", False):
                # Draw hatched pattern
                for i in range(0, size[0], 5):
                    draw.line([(pos[0] + i, pos[1]), (pos[0] + i, pos[1] + size[1])], fill=color, width=1)
            else:
                draw.rectangle([pos[0], pos[1], pos[0] + size[0], pos[1] + size[1]], fill=color)

        elif pattern["type"] == "triangle":
            points = pattern["pos"]
            color = pattern["color"]
            draw.polygon(points, fill=color)

        elif pattern["type"] == "semicircle":
            pos = pattern["pos"]
            size = pattern["size"]
            color = pattern["color"]
            draw.pieslice([pos[0] - size // 2, pos[1] - size // 2, pos[0] + size // 2, pos[1] + size // 2], start=0, end=180, fill=color)