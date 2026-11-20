#!/usr/bin/env python3
"""English Master Alpha 0.8 editorial inventory (read-only).

Audits the REAL bundled 16-part gzip package. These checks are editorial
indicators, not a linguistic or pedagogical certification. They intentionally
do not turn draft material into published material or invent skill evidence.
"""
from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from hashlib import sha1, sha256
import gzip
import json
from pathlib import Path
import re

DEFAULT_MANIFEST = Path("public/english-master/content.manifest.json")
CHAPTER_FAMILIES = "GVWRLSMY"
REVIEW_PHASES = {"independent", "application", "exit", "transfer"}
PLACEHOLDER = re.compile(r"\b(?:TODO|TBD|PLACEHOLDER|LOREM IPSUM)\b", re.IGNORECASE)


def check_text(value: object) -> str:
    return value if isinstance(value, str) else ""


def load_original(manifest_path: Path) -> tuple[dict, dict]:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    root = manifest_path.parent
    assert manifest.get("schema") == "english-master-asset-manifest-v1"
    assert len(manifest["parts"]) == 16
    parts = []
    for index, item in enumerate(manifest["parts"]):
        filename = "pack-part-" + str(index).zfill(2) + ".bin"
        assert item["file"] == filename, "Unexpected manifest file path"
        blob = (root / filename).read_bytes()
        assert len(blob) == item["size"], "Part length mismatch: " + filename
        git_sha = sha1(b"blob " + str(len(blob)).encode() + b"\x00" + blob).hexdigest()
        assert git_sha == item["sha"], "Blob hash mismatch: " + filename
        parts.append(blob)
    compressed = b"".join(parts)
    assert len(compressed) == manifest["size_bytes"]
    assert sha256(compressed).hexdigest() == manifest["sha256"], "Source package SHA256 mismatch"
    # The committed pack is intentionally small. Do not accept a zip bomb.
    raw = gzip.decompress(compressed)
    assert len(raw) <= 80_000_000, "Uncompressed book is unexpectedly large"
    book = json.loads(raw)
    assert book["schema"] == "em-opintopaivakirja-pack-0.8"
    assert len(book["chapters"]) == book["chapter_count"] == 122
    assert len(book["lessons"]) == book["lesson_count"] == 192
    assert len(book["media"]) == 20
    return manifest, book


def audit(book: dict, manifest: dict) -> dict:
    chapters = book["chapters"]
    lessons = book["lessons"]
    metrics = Counter()
    groups = defaultdict(Counter)
    findings: list[dict[str, str]] = []
    # The draft also has A00/A08 entry points that are native app views,
    # not members of the 122 printed G/V/W/R/L/S/M/Y chapters.
    reverse_refs = defaultdict(set)
    for lesson_id, lesson in lessons.items():
        for raw_ref in lesson.get("book_refs") or []:
            match = re.match(r"^([GVWRLSMY][0-9]{1,3})(?=$|[/:.#-])", check_text(raw_ref), re.I)
            if match and match.group(1).upper() in chapters:
                reverse_refs[match.group(1).upper()].add(lesson_id)


    def add(severity: str, code: str, item_id: str, detail: str) -> None:
        findings.append({"severity": severity, "code": code, "id": item_id, "detail": detail})

    for chapter_id, record in sorted(chapters.items()):
        metrics["chapters"] += 1
        if record.get("content_id") != chapter_id:
            add("error", "CHAPTER_KEY_MISMATCH", chapter_id, "Identifier does not match map key")
        family = chapter_id[0]
        groups["chapters_by_family"][family] += 1
        if family not in CHAPTER_FAMILIES:
            add("error", "UNKNOWN_FAMILY", chapter_id, "Unexpected chapter prefix")
        if record.get("status") != "published":
            metrics["unpublished_chapters"] += 1

        payload = record.get("payload") or {}
        sections = payload.get("sections") or []
        if not isinstance(sections, list):
            sections = []
            add("error", "INVALID_SECTIONS", chapter_id, "Sections must be an array")
        metrics["chapter_sections"] += len(sections)
        examples = 0
        short_theory = 0
        with_self_checks = 0
        for section in sections:
            if not isinstance(section, dict):
                add("error", "INVALID_SECTION", chapter_id, "A section is not an object")
                continue
            theory = check_text(section.get("theory_fi"))
            examples += len(section.get("worked_examples") or [])
            with_self_checks += int(bool(section.get("self_check")))
            short_theory += int(len(theory.strip()) < 350)
            if PLACEHOLDER.search(theory):
                add("review", "PLACEHOLDER_THEORY", chapter_id, "Potential placeholder in theory")
        metrics["worked_examples"] += examples
        metrics["chapter_sections_with_self_check"] += with_self_checks
        if len(sections) < 2:
            add("priority", "SHORT_CHAPTER_STRUCTURE", chapter_id, "Fewer than two sections")
        if short_theory:
            add("priority", "BRIEF_CHAPTER_THEORY", chapter_id, str(short_theory) + " sections have under 350 theory characters")
        if examples < 2:
            add("priority", "FEW_WORKED_EXAMPLES", chapter_id, str(examples) + " worked examples across chapter")
        if with_self_checks == 0:
            add("priority", "NO_CHAPTER_SELF_CHECK", chapter_id, "No authored section self-check")
        linked = payload.get("linked_lesson_ids") or []
        if not linked:
            if reverse_refs[chapter_id]:
                metrics["chapters_linked_via_reverse_refs"] += 1
                add("review", "MISSING_EXPLICIT_CHAPTER_LINK", chapter_id,
                    str(len(reverse_refs[chapter_id])) + " real lesson reference(s) available for automatic navigation")
            else:
                add("priority", "UNLINKED_CHAPTER", chapter_id, "No explicit or reverse lesson link")
        for lesson_id in linked:
            if lesson_id not in lessons:
                add("error", "BROKEN_CHAPTER_LESSON_LINK", chapter_id, str(lesson_id))
        if len(check_text(payload.get("summary_fi")).strip()) < 100:
            add("review", "BRIEF_CHAPTER_SUMMARY", chapter_id, "Summary has under 100 characters")

    for lesson_id, record in sorted(lessons.items()):
        metrics["lessons"] += 1
        if record.get("content_id") != lesson_id:
            add("error", "LESSON_KEY_MISMATCH", lesson_id, "Identifier does not match map key")
        unit = re.search(r"-(J\d{2})-", lesson_id)
        groups["lessons_by_unit"][unit.group(1) if unit else "unknown"] += 1
        if record.get("status") != "published":
            metrics["unpublished_lessons"] += 1

        refs = record.get("book_refs") or []
        if not refs:
            add("priority", "LESSON_WITHOUT_BOOK", lesson_id, "No textbook chapter reference")
        for ref in refs:
            if check_text(ref).upper() in {"A00", "A08"}:
                metrics["native_onboarding_refs"] += 1
                continue
            chapter_id = re.match(r"^([GVWRLSMY][0-9]{1,3})(?=$|[/:.#-])", check_text(ref), re.I)
            if not chapter_id or chapter_id.group(1).upper() not in chapters:
                add("error", "UNKNOWN_LESSON_BOOK_REF", lesson_id, str(ref))

        payload = record.get("payload") or {}
        explanation = payload.get("explanations") or []
        teachers = payload.get("teacher_scenes") or []
        tasks = payload.get("tasks") or []
        objectives = payload.get("objectives_fi") or []
        metrics["explanation_blocks"] += len(explanation)
        metrics["teacher_scenes"] += len(teachers)
        metrics["lesson_tasks"] += len(tasks)
        metrics["lesson_examples"] += sum(len(x.get("examples") or []) for x in explanation if isinstance(x, dict))
        lesson_text = " ".join(check_text(x.get("text_fi")) for x in explanation if isinstance(x, dict))
        lesson_text += " " + " ".join(
            check_text(x.get("teacher_fi") or x.get("text_fi")) for x in teachers if isinstance(x, dict)
        )

        if not objectives:
            add("priority", "NO_OBJECTIVES", lesson_id, "No explicit lesson objectives")
        if len(lesson_text.strip()) < 350:
            add("priority", "BRIEF_LESSON_EXPLANATION", lesson_id, "Under 350 teaching text characters")
        if not teachers:
            add("priority", "NO_TEACHER_SCENES", lesson_id, "No authored interactive teacher scene")
        if not tasks:
            add("priority", "NO_LESSON_TASKS", lesson_id, "No learner tasks")
        if len(check_text(payload.get("summary_fi")).strip()) < 100:
            add("review", "BRIEF_LESSON_SUMMARY", lesson_id, "Summary has under 100 characters")

        phases = set()
        manual = 0
        for task in tasks:
            if not isinstance(task, dict):
                add("error", "INVALID_LESSON_TASK", lesson_id, "Task is not an object")
                continue
            kind = check_text(task.get("format"))
            metrics["tasks_" + (kind or "unknown")] += 1
            phase = check_text(task.get("phase")).lower()
            phases.add(phase)
            groups["tasks_by_phase"][phase or "unset"] += 1
            manual += int(kind == "free_response" or bool(task.get("requires_manual_review")))
            if kind == "single_choice":
                opts = task.get("options") or []
                correct = task.get("correct_option")
                if not opts or not any(isinstance(opt, dict) and opt.get("id") == correct for opt in opts):
                    add("error", "INVALID_CHOICE_KEY", lesson_id, str(task.get("task_id")))
            if kind == "short_answer" and not task.get("acceptable_answers"):
                add("priority", "UNREVIEWED_SHORT_ANSWER", lesson_id, str(task.get("task_id")))
            if not task.get("hint_fi"):
                metrics["tasks_without_hint"] += 1
            if kind == "single_choice" and not task.get("wrong_option_feedback_fi"):
                metrics["choices_without_specific_wrong_feedback"] += 1
        metrics["manual_tasks"] += manual
        if not phases.intersection(REVIEW_PHASES):
            add("priority", "NO_INDEPENDENT_OR_TRANSFER_TASK", lesson_id, "No independently marked application, transfer or exit task")
        if "transfer" not in phases and "application" not in phases:
            add("review", "NO_EXPLICIT_TRANSFER_TASK", lesson_id, "No transfer/application phase")
        if len(explanation) < 1:
            add("review", "NO_EXPLANATION_BLOCK", lesson_id, "No conventional explanatory block")
        if PLACEHOLDER.search(lesson_text):
            add("review", "PLACEHOLDER_LESSON", lesson_id, "Potential placeholder in teaching prose")

    by_code = Counter(x["code"] for x in findings)
    by_severity = Counter(x["severity"] for x in findings)
    samples = {code: [f["id"] for f in findings if f["code"] == code][:12] for code in sorted(by_code)}
    report = {
        "audit_version": "em-editorial-inventory-1",
        "source": "committed Alpha 0.8 gzip content pack, SHA256 verified",
        "sha256": manifest["sha256"],
        "readiness": "draft-not-pedagogically-certified",
        "note": "Heuristic indicators and structure checks only. Human editorial and YTL checks remain required.",
        "metrics": dict(sorted(metrics.items())),
        "groups": {k: dict(sorted(v.items())) for k, v in sorted(groups.items())},
        "findings_by_code": dict(sorted(by_code.items())),
        "findings_by_severity": dict(sorted(by_severity.items())),
        "sample_ids_by_code": samples,
        "findings": findings,
    }
    return report


def markdown(report: dict) -> str:
    metrics = report["metrics"]
    rows = [
        "# English Master Alpha 0.8 · todellisen aineiston toimituksellinen tarkistus",
        "",
        "**Tila:** Luonnos, ei pedagogisesti julkaisuvalmis. Tämä on automaattinen rakenne- ja sisältöindikaattoritarkistus.",
        "",
        "Lähde: repositorion 16-osainen gzip-aineisto; SHA-256 tarkistettu.",
        "",
        "## Laajuus",
        "",
        "- Kirjaluvut: " + str(metrics["chapters"]) + " (ei julkaistuja: " + str(metrics["unpublished_chapters"]) + ")",
        "- Opetuspolun oppitunnit: " + str(metrics["lessons"]) + " (ei julkaistuja: " + str(metrics["unpublished_lessons"]) + ")",
        "- Kirjan alaosiot: " + str(metrics["chapter_sections"]),
        "- Käsitellyt kirjaesimerkit: " + str(metrics["worked_examples"]),
        "- Opettajan tilanteet: " + str(metrics["teacher_scenes"]),
        "- Harjoitustehtävät: " + str(metrics["lesson_tasks"]),
        "- Manuaalisesti arvioitavat tehtävät: " + str(metrics["manual_tasks"]),
        "",
        "## Toimitukselliset puutteet ja riskit",
        "",
        "| Havaintotyyppi | Kappaletta | Esimerkkitunnisteita |",
        "|---|---:|---|",
    ]
    for code, amount in sorted(report["findings_by_code"].items(), key=lambda x: (-x[1], x[0])):
        sample = ", ".join(report["sample_ids_by_code"][code][:4])
        rows.append("| " + code + " | " + str(amount) + " | " + sample + " |")
    rows += [
        "",
        "## Tulosten rajat",
        "",
        "- Kirjoitetun selitystekstin merkkimäärä ei todista oikeakielisyyttä tai opetuksen riittävyyttä.",
        "- Tehtäväavaimen rakenteellinen oikeellisuus ei todista vaihtoehtojen semanttista oikeellisuutta.",
        "- Tämä ei korvaa ihmisen kieli-, tekijänoikeus-, LOPS21- ja kevään 2028 YO-arviointia.",
        "- Pilotin 20 mediaobjektia eivät ole tämän tarkistuksen perusteella hyväksyttyjä lopullisia kuuntelutehtäviä.",
        "- Sisällön tilaksi ei muuteta published ilman erillistä hyväksyntää.",
        "",
    ]
    return "\n".join(rows)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--json", type=Path, default=Path("test-results/english-master-editorial-audit.json"))
    parser.add_argument("--markdown", type=Path, default=Path("test-results/english-master-editorial-audit.md"))
    args = parser.parse_args()
    manifest, book = load_original(args.manifest)
    report = audit(book, manifest)
    args.json.parent.mkdir(parents=True, exist_ok=True)
    args.markdown.parent.mkdir(parents=True, exist_ok=True)
    args.json.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    args.markdown.write_text(markdown(report), encoding="utf-8")
    print(markdown(report))
    print("JSON report:", args.json)
    print("Markdown report:", args.markdown)


if __name__ == "__main__":
    main()
