#!/usr/bin/env python3
"""Download and optimize the 10 individually curated Pexels chapter images.

Use ONLY for the LOS! 1 textbook's ten manually selected photo sources.
This is not a crawler, general stock-photo downloader or dataset builder.
Refuses sources not explicitly listed in los1ChapterPhotos.ts.
Run from repo root: python scripts/los1-optimize-chapter-photos.py
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
REGISTRY = ROOT / "src/features/los/los1ChapterPhotos.ts"
OUT = ROOT / "public/los/chapters"
PATTERN = re.compile(
    r'chapterId:"(?P<chapter>\d{2})",photoId:(?P<photo>\d+),\s*'
    r'src:"[^"]+",\\s*'
    r'sourceUrl:"(?P<page>https://www\.pexels\.com/photo/[^"]+)",'
)
SIZES = {"desktop": (1440, 630), "mobile": (720, 540)}
# Keep faces near the top on the two portrait images.
FOCUS = {"01": (0.5, 0.37), "02": (0.5, 0.32), "06": (0.5, 0.35)}
MAX_BYTES = 16 * 1024 * 1024
USER_AGENT = "LOS1-Textbook-Asset-Importer/1.0 (+educational fair Pexels use)"

def download(url: str) -> bytes:
    address = urlparse(url)
    if address.scheme != "https" or address.hostname != "images.pexels.com":
        raise ValueError("Only explicitly approved HTTPS Pexels image links permitted.")
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            request = Request(url, headers={
                "User-Agent": USER_AGENT,
                "Accept": "image/avif,image/webp,image/jpeg,image/*;q=0.8",
            })
            with urlopen(request, timeout=35) as response:
                redirected_host = urlparse(response.geturl()).hostname
                if redirected_host != "images.pexels.com":
                    raise ValueError("Pexels image redirected to unapproved host.")
                mime = response.headers.get_content_type()
                if not mime.startswith("image/"):
                    raise ValueError(f"Not an image: {mime}")
                data = response.read(MAX_BYTES + 1)
                if len(data) > MAX_BYTES or len(data) < 8192:
                    raise ValueError("Image has unexpected size.")
                return data
        except (HTTPError, URLError, TimeoutError) as exc:
            last_error = exc
            if attempt < 2:
                time.sleep((attempt + 1) * 2)
    raise RuntimeError(f"Source image could not be downloaded: {last_error}")

def write_all() -> None:
    source = REGISTRY.read_text(encoding="utf-8")
    matches = list(PATTERN.finditer(source))
    if len(matches) != 10:
        raise ValueError(
            f"Expected exactly ten explicit Pexels photo source records; found {len(matches)}"
        )
    if {m.group("chapter") for m in matches} != {
        f"{i:02d}" for i in range(1, 11)
    }:
        raise ValueError("Missing or repeated LOS! 1 chapter source photo.")

    OUT.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, object] = {
        "book": "los-1",
        "license": "https://www.pexels.com/license/",
        "note": (
            "Curated photographs used contextually in a textbook; not a standalone "
            "photo collection. No implication of endorsement by depicted people."
        ),
        "images": [],
    }
    for match in matches:
        chapter, photo = match.group("chapter"), match.group("photo")
        source_page = match.group("page")
        url = (f"https://images.pexels.com/photos/{photo}/"
               f"pexels-photo-{photo}.jpeg?auto=compress&cs=tinysrgb&w=1600")
        if not source_page.endswith(f"-{photo}/"):
            raise ValueError(f"Source photo page ID mismatch: C{chapter}")
        print(f"Downloading C{chapter}, Pexels photo {photo}", flush=True)
        body = download(url)
        try:
            with Image.open(io.BytesIO(body)) as original:
                original = ImageOps.exif_transpose(original)
                original.load()
                if min(original.size) < 600:
                    raise ValueError("Source resolution too low for textbook hero.")
                if original.width * original.height > 40_000_000:
                    raise ValueError("Unexpectedly enormous source image.")
                picture = original.convert("RGB")
        except (UnidentifiedImageError, OSError) as exc:
            raise ValueError(f"Invalid source image for C{chapter}") from exc

        variants: dict[str, object] = {}
        for variant, target_size in SIZES.items():
            rendered = ImageOps.fit(
                picture, target_size, method=Image.Resampling.LANCZOS,
                centering=FOCUS.get(chapter, (0.5, 0.5)),
            )
            file_name = f"LOS1-C{chapter}-{photo}-{variant}.webp"
            dest = OUT / file_name
            rendered.save(dest, "WEBP", quality=81, method=6)
            encoded = dest.read_bytes()
            if len(encoded) > 450 * 1024:
                raise ValueError(
                    f"Optimized {file_name} exceeds 450 KB: {len(encoded)}"
                )
            variants[variant] = {
                "file": f"/los/chapters/{file_name}",
                "width": target_size[0],
                "height": target_size[1],
                "bytes": len(encoded),
                "sha256": hashlib.sha256(encoded).hexdigest(),
            }
            print(f"  {variant}: {len(encoded):,} bytes", flush=True)

        manifest["images"].append({
            "chapterId": chapter,
            "photoId": int(photo),
            "originalPhotoPage": source_page,
            "sourceImageUrl": url,
            "sourceSha256": hashlib.sha256(body).hexdigest(),
            "variants": variants,
        })
    (OUT / "sources-manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print("Verified 10 photos, 20 optimized WebP variants and source manifest.", flush=True)

if __name__ == "__main__":
    try:
        write_all()
    except Exception as exc:
        print(f"LOS! 1 photo import failed: {exc}", file=sys.stderr)
        sys.exit(1)
