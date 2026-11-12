#!/usr/bin/env python3
"""Import exactly four manually verified Pexels photos for LOS! 1 culture pages.

Generates a 2-size WebP variant of each photo and a SHA-256 provenance
manifest. No stock-photo search or bulk crawling; exactly four preapproved
Pexels photo IDs are hardcoded and cross-checked against the source registry.
"""
from __future__ import annotations

import hashlib
import io
import json
import re
import sys
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from PIL import Image, ImageOps, UnidentifiedImageError

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "src/features/los/los1CulturePhotos.ts"
OUTPUT = ROOT / "public/los/culture"
PHOTOS = {
    ("01", 29250831): ("Hamburg", "Naimish Verma"),
    ("03", 6063650): ("Wien", "Anton Uniqueton"),
    ("03", 32379758): ("Thun", "Jean-Paul Wettstein"),
    ("08", 5427660): ("classroom illustration", "Tima Miroshnichenko"),
}
VARIANTS = {"desktop": (1024, 640), "mobile": (720, 540)}
MAX_DOWNLOAD = 20 * 1024 * 1024

def download(photo_id: int) -> bytes:
    url = (
        f"https://images.pexels.com/photos/{photo_id}/"
        f"pexels-photo-{photo_id}.jpeg?auto=compress&cs=tinysrgb&w=1600"
    )
    if urlparse(url).hostname != "images.pexels.com":
        raise ValueError("Non-Pexels image was rejected.")
    for attempt in range(3):
        try:
            request = Request(url, headers={
                "User-Agent": "LOS1-Educational-Curated-Image-Importer/1.0",
                "Accept": "image/jpeg,image/*;q=0.8",
            })
            with urlopen(request, timeout=35) as response:
                if urlparse(response.geturl()).hostname != "images.pexels.com":
                    raise ValueError("Unexpected image redirect host")
                if not response.headers.get_content_type().startswith("image/"):
                    raise ValueError("Response is not an image")
                image = response.read(MAX_DOWNLOAD + 1)
                if len(image) < 8192 or len(image) > MAX_DOWNLOAD:
                    raise ValueError("Unexpected source image size")
                return image
        except (HTTPError, URLError, TimeoutError):
            if attempt == 2:
                raise
            time.sleep(2 * (attempt + 1))
    raise RuntimeError("Image could not be downloaded")

def main() -> None:
    source = REGISTRY.read_text(encoding="utf-8")
    found = {(chapter, int(photo)) for chapter, photo in
             re.findall(r'chapterId:"(\d{2})",photoId:(\d+)', source)}
    if found != set(PHOTOS):
        raise ValueError(f"Curated image IDs do not match LOS! 1 registry: {found}")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {
        "book": "LOS! 1",
        "usage": "contextual digital textbook culture photography only",
        "licenseUrl": "https://www.pexels.com/license/",
        "images": [],
    }
    for (chapter, photo_id), (location, photographer) in PHOTOS.items():
        print(f"Downloading verified culture photo C{chapter} #{photo_id}", flush=True)
        original = download(photo_id)
        try:
            with Image.open(io.BytesIO(original)) as imported:
                imported = ImageOps.exif_transpose(imported)
                imported.load()
                if min(imported.size) < 600 or imported.width * imported.height > 40_000_000:
                    raise ValueError("Source image resolution outside expected bounds")
                pixels = imported.convert("RGB")
        except (UnidentifiedImageError, OSError) as exc:
            raise ValueError(f"Corrupt source for photo {photo_id}") from exc
        records = {}
        for variant, size in VARIANTS.items():
            resized = ImageOps.fit(pixels, size, Image.Resampling.LANCZOS)
            filename = f"LOS1-C{chapter}-CULTURE-{photo_id}-{variant}.webp"
            path = OUTPUT / filename
            resized.save(path, "WEBP", quality=80, method=6)
            data = path.read_bytes()
            if not 10000 < len(data) < 400 * 1024:
                raise ValueError(f"{filename} exceeds allowed dimensions/bytes: {len(data)}")
            records[variant] = {
                "path": f"/los/culture/{filename}",
                "width": size[0], "height": size[1],
                "bytes": len(data),
                "sha256": hashlib.sha256(data).hexdigest(),
            }
            print(f"  {variant}: {len(data)} bytes", flush=True)
        manifest["images"].append({
            "chapterId": chapter,
            "photoId": photo_id,
            "locationLabel": location,
            "photographer": photographer,
            "sourceImageSha256": hashlib.sha256(original).hexdigest(),
            "sourcePageUrl": re.search(
                r'sourceUrl:"(https://www\.pexels\.com/photo/[^"]+'
                + str(photo_id) + r'/)"',
                source,
            ).group(1),
            "variants": records,
        })
    manifest_file = OUTPUT / "sources-manifest.json"
    manifest_file.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
                             encoding="utf-8")
    print("Complete: four individually sourced photos, eight WebP files.", flush=True)

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"FAILED: {exc}", file=sys.stderr)
        sys.exit(1)
