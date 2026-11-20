#!/usr/bin/env python3
"""Export the ACTUAL G05-G10 manuscript from the SHA256-verified Alpha 0.8 pack.

Print each subsection's actual title, explanation, examples and any existing
self-check; preserve source wording. No invented content or publication claims.
"""
import json
from pathlib import Path
from audit_english_master_content import DEFAULT_MANIFEST, load_original

manifest, pack = load_original(DEFAULT_MANIFEST)
ids = tuple(f"G{n:02d}" for n in range(5,11))
chapters = {k:pack["chapters"][k] for k in ids}
lessons = {}
for lesson_id, item in pack["lessons"].items():
    refs = item.get("book_refs") or []
    if any(str(ref).startswith(i) for ref in refs for i in ids):
        lessons[lesson_id] = {
            "title": item.get("title"),
            "book_refs": refs,
            "objectives_fi": item.get("payload",{}).get("objectives_fi",[]),
            "summary_fi": item.get("payload",{}).get("summary_fi"),
            "explanations": item.get("payload",{}).get("explanations",[])[:4],
            "task_samples": item.get("payload",{}).get("tasks",[])[:3]
        }
data = {"source_pack_sha256":manifest["sha256"],"chapters":chapters,
        "connected_lessons":lessons}
out = Path("test-results/english-grammar-g05-g10-source.json")
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
for id, chapter in chapters.items():
    print(id,chapter["title"])
    for sec in chapter["payload"].get("sections",[]):
        print("  ",sec["section_id"],sec["title"],"self_check",bool(sec.get("self_check")))
print("SHA256 verified:",manifest["sha256"],"lessons:",len(lessons),"output:",out)
