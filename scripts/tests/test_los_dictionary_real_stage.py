"""Disposable real-source PostgreSQL QA CSV preparation, no network or DB writes."""
import csv
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / "los-dictionary-real-stage-qa.py"


class RealStageQATests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.qa = self.root / "qa"
        approvals = []
        for direction, word, meaning in (
            ("de-fi", "Häuser", "talot"), ("fi-de", "talo", "Haus")
        ):
            source_id = "test-" + direction
            record = {
                "sourceId": source_id, "licenseSourceId": source_id,
                "sourceEntryId": "row-1", "sourceKind": "freedict",
                "row": 1, "language": direction.split("-")[0],
                "targetLanguage": direction.split("-")[1],
                "lemma": word, "searchKeys": [word.lower()],
                "senses": [{
                    "index": 1, "translations": [meaning],
                    "translationLanguage": direction.split("-")[1]
                }]
            }
            file = self.root / (direction + "-staged.jsonl")
            file.write_text(json.dumps(record, ensure_ascii=False) + "\n",
                            encoding="utf-8")
            report = {
                "sourceId": source_id, "kind": "freedict",
                "direction": direction, "status": "STAGED_NOT_PUBLISHED",
                "sourceSha512": "a" * 128,
                "outputSha512": hashlib.sha512(file.read_bytes()).hexdigest(),
                "licenseCode": "qa-only", "licenseUrl": "https://example.org/licence",
                "evidenceUrl": "https://example.org/source",
                "reviewedBy": "fixture", "reviewedAt": "2026-11-12",
                "importedSourceRows": 1, "translationVariants": 1,
                "rowsWithTranslations": 1
            }
            (self.root / (direction + "-staged.jsonl.manifest.json")).write_text(
                json.dumps(report), encoding="utf-8")
            approvals.append({
                "sourceId": source_id, "kind": "freedict", "direction": direction,
                "sourceSha512": "a" * 128,
                "sourceUrl": "https://example.org/source",
                "rightsApproval": {
                    "stagingApproved": True, "publicationApproved": False,
                    "licenseCode": "qa-only"
                }
            })
        self.approvals = self.root / "approvals.json"
        self.approvals.write_text(json.dumps({"entries": approvals}), encoding="utf-8")

    def run_converter(self):
        return subprocess.run(
            ["python", str(SCRIPT), str(self.root),
             str(self.approvals), str(self.qa)],
            capture_output=True, text=True, check=False
        )

    def test_converts_only_verified_unpublished_sources(self):
        completed = self.run_converter()
        self.assertEqual(completed.returncode, 0, completed.stderr)
        result = json.loads(completed.stdout)
        self.assertEqual(result["stagedRows"], 2)
        self.assertEqual(result["translationVariants"], 2)
        self.assertEqual(result["publishedRows"], 0)
        with (self.qa / "entries.csv").open(encoding="utf-8", newline="") as handle:
            lines = list(csv.reader(handle))
        self.assertEqual(len(lines), 2)
        self.assertEqual(json.loads(lines[0][1])["lemma"], "Häuser")

    def test_count_tampering_fails_before_writing(self):
        path = self.root / "de-fi-staged.jsonl.manifest.json"
        altered = json.loads(path.read_text(encoding="utf-8"))
        altered["translationVariants"] = 3
        path.write_text(json.dumps(altered), encoding="utf-8")
        completed = self.run_converter()
        self.assertNotEqual(completed.returncode, 0)
        self.assertFalse((self.qa / "entries.csv").exists())

    def test_unapproved_source_fails_before_writing(self):
        altered = json.loads(self.approvals.read_text(encoding="utf-8"))
        altered["entries"][1]["rightsApproval"]["stagingApproved"] = False
        self.approvals.write_text(json.dumps(altered), encoding="utf-8")
        completed = self.run_converter()
        self.assertNotEqual(completed.returncode, 0)
        self.assertFalse((self.qa / "sources.csv").exists())


if __name__ == "__main__":
    unittest.main()
