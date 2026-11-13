#!/usr/bin/env python3
"""Prepare two verified, unpublished FreeDict sources for disposable PostgreSQL QA.

Creates CSV only. Never connects to a DB, publishes, or modifies student data.
The generated source bytes stay inside the CI runner and are never artifacts.
"""
import argparse
import csv
import hashlib
import io
import json
from pathlib import Path


def prepare(source_dir: Path, approvals_file: Path, output_dir: Path) -> dict:
    approvals = json.loads(approvals_file.read_text(encoding="utf-8"))
    sources = approvals.get("entries")
    if (not isinstance(sources, list) or len(sources) != 2 or
            sorted(x.get("direction") for x in sources) != ["de-fi", "fi-de"]):
        raise ValueError("Exactly de-fi and fi-de sources are required for QA")

    source_buffer, entry_buffer = io.StringIO(), io.StringIO()
    source_writer = csv.writer(source_buffer, lineterminator="\n")
    entry_writer = csv.writer(entry_buffer, lineterminator="\n")
    results = []
    for approved in sources:
        rights = approved.get("rightsApproval") or {}
        if (approved.get("kind") != "freedict" or
                rights.get("stagingApproved") is not True or
                rights.get("publicationApproved") is True or
                not approved.get("sourceUrl", "").startswith("https://")):
            raise ValueError("Private staging rights gate not satisfied")

        direction = approved["direction"]
        staged = source_dir / (direction + "-staged.jsonl")
        manifest = json.loads((source_dir / (direction + "-staged.jsonl.manifest.json"))
                              .read_text(encoding="utf-8"))
        raw = staged.read_bytes()
        if len(raw) > 50_000_000:
            raise ValueError("Unexpectedly large source staging file")
        sha512 = hashlib.sha512(raw).hexdigest()
        if (manifest.get("status") != "STAGED_NOT_PUBLISHED" or
                manifest.get("kind") != "freedict" or
                manifest.get("direction") != direction or
                manifest.get("sourceId") != approved.get("sourceId") or
                manifest.get("sourceSha512") != approved.get("sourceSha512") or
                manifest.get("outputSha512") != sha512 or
                manifest.get("licenseCode") != rights.get("licenseCode")):
            raise ValueError("Source manifest, checksum or staging approval mismatch")
        seen = set()
        count = variants = translated = 0
        language, target = direction.split("-")
        for line in raw.decode("utf-8").splitlines():
            if not line.strip():
                continue
            row = json.loads(line)
            identifier = row.get("sourceEntryId")
            if (row.get("sourceId") != manifest["sourceId"] or
                    row.get("licenseSourceId") != manifest["sourceId"] or
                    row.get("sourceKind") != "freedict" or
                    row.get("language") != language or
                    row.get("targetLanguage") != target or
                    not isinstance(identifier, str) or not identifier or
                    identifier in seen or not isinstance(row.get("senses"), list)):
                raise ValueError("Duplicate or incorrect staged lexeme")
            seen.add(identifier)
            n = sum(len(sense.get("translations") or [])
                    for sense in row["senses"])
            variants += n
            translated += int(n > 0)
            count += 1
            entry_writer.writerow([manifest["sourceId"], json.dumps(row, ensure_ascii=False)])
        if (count != manifest.get("importedSourceRows") or
                translated != manifest.get("rowsWithTranslations") or
                variants != manifest.get("translationVariants")):
            raise ValueError("Manifest does not match physical staged rows")
        source_writer.writerow([json.dumps({**manifest, "sourceUrl": approved["sourceUrl"]},
                                          ensure_ascii=False)])
        results.append({"direction": direction, "sourceId": manifest["sourceId"],
                        "stagedRows": count, "translationVariants": variants,
                        "publishedRows": 0})
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "sources.csv").write_text(source_buffer.getvalue(), encoding="utf-8")
    (output_dir / "entries.csv").write_text(entry_buffer.getvalue(), encoding="utf-8")
    return {"status": "DISPOSABLE_POSTGRES_QA_ONLY", "sources": results,
            "stagedRows": sum(x["stagedRows"] for x in results),
            "translationVariants": sum(x["translationVariants"] for x in results),
            "productionDatabaseRows": 0, "publishedRows": 0}


def main():
    cli = argparse.ArgumentParser()
    cli.add_argument("stage_dir", type=Path)
    cli.add_argument("approvals", type=Path)
    cli.add_argument("qa_output_dir", type=Path)
    args = cli.parse_args()
    print(json.dumps(prepare(args.stage_dir, args.approvals, args.qa_output_dir)))


if __name__ == "__main__":
    main()
