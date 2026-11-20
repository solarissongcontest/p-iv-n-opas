#!/usr/bin/env python3
"""Export the source-authored G01-G04 grammar chapters for human editorial review.
Do not fabricate existing content. SHA256 of the complete original bundle is checked
by the shared loader; only the selected original chapter/lesson fields are emitted.
"""
import json
from pathlib import Path
from audit_english_master_content import DEFAULT_MANIFEST, load_original

manifest, book = load_original(DEFAULT_MANIFEST)
ids = ("G01", "G02", "G03", "G04")
selection = {
    "source_pack_sha256": manifest["sha256"],
    "chapters": {id: book["chapters"][id] for id in ids},
    "connected_lessons": {},
}
for lesson_id, lesson in book["lessons"].items():
    refs = lesson.get("book_refs") or []
    if any(str(ref).startswith(ids) for ref in refs):
        selection["connected_lessons"][lesson_id] = {
            "title": lesson.get("title"),
            "book_refs": refs,
            "objectives_fi": lesson.get("payload",{}).get("objectives_fi",[]),
            "summary_fi": lesson.get("payload",{}).get("summary_fi"),
            "examples": [sample for block in lesson.get("payload",{}).get("explanations",[]) for sample in block.get("examples",[])][:4],
            "task_samples": [{
                "prompt_fi": t.get("prompt_fi"),"prompt_en":t.get("prompt_en"),
                "format": t.get("format"),"correct_option":t.get("correct_option"),
                "options": t.get("options"),
            } for t in lesson.get("payload",{}).get("tasks",[])[:2]]
        }
out = Path("test-results/english-grammar-g01-g04-source.json")
out.parent.mkdir(exist_ok=True)
out.write_text(json.dumps(selection,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(f"Exported {len(selection['chapters'])} chapters and {len(selection['connected_lessons'])} linked lesson snippets.")
print("SHA-256 verified:", manifest["sha256"])
