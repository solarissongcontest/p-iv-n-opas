"""Dry-run database-loader tests. No credentials, database writes or raw corpus."""
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

LOADER = Path(__file__).resolve().parents[1] / "los-dictionary-load.mjs"


class LoaderPreflightTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.entries = [
            {
                "sourceId": "fixture-de-fi", "sourceEntryId": "bank-1",
                "licenseSourceId": "fixture-de-fi", "sourceKind": "freedict",
                "row": 1, "language": "de", "targetLanguage": "fi",
                "lemma": "Bank", "searchKeys": ["bank"], "forms": [],
                "partOfSpeech": "n", "gender": "f",
                "senses": [{"index": 1, "translations": ["penkki"],
                            "translationLanguage": "fi"}],
            },
            {
                "sourceId": "fixture-de-fi", "sourceEntryId": "bank-2",
                "licenseSourceId": "fixture-de-fi", "sourceKind": "freedict",
                "row": 2, "language": "de", "targetLanguage": "fi",
                "lemma": "Bank", "searchKeys": ["bank"], "forms": [],
                "partOfSpeech": "n", "gender": "f",
                "senses": [{"index": 1, "translations": ["pankki"],
                            "translationLanguage": "fi"}],
            },
        ]

    def run_loader(self, rows=None, manifest_overrides=None, source_id="fixture-de-fi"):
        input_path = self.root / "stage.ndjson"
        payload = "\n".join(json.dumps(x, ensure_ascii=False) for x in (
            self.entries if rows is None else rows
        )) + "\n"
        input_path.write_text(payload, encoding="utf-8")
        digest = hashlib.sha512(input_path.read_bytes()).hexdigest()
        manifest = {
            "sourceId": source_id, "kind": "freedict",
            "direction": "de-fi", "status": "STAGED_NOT_PUBLISHED",
            "sourceSha512": "a" * 128, "outputSha512": digest,
            "licenseCode": "fixture-test-only",
            "importedSourceRows": 2, "rowsWithTranslations": 2,
            "translationVariants": 2, "ipaCandidates": 0,
        }
        manifest.update(manifest_overrides or {})
        manifest_path = self.root / "manifest.json"
        manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
        approvals_path = self.root / "approvals.json"
        approvals_path.write_text(json.dumps({"entries": [{
            "sourceId": "fixture-de-fi", "kind": "freedict", "direction": "de-fi",
            "sourceSha512": "a" * 128,
            "sourceUrl": "https://example.org/fixture-only",
            "rightsApproval": {
                "stagingApproved": True, "publicationApproved": False,
                "licenseCode": "fixture-test-only",
            },
        }]}), encoding="utf-8")
        return subprocess.run(
            ["node", str(LOADER), "--input", str(input_path),
             "--manifest", str(manifest_path), "--approvals", str(approvals_path)],
            text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
            check=False,
        )

    def test_two_distinct_homonyms_pass_and_count_real_translations(self):
        result = self.run_loader()
        self.assertEqual(result.returncode, 0, result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(data["actualParsedRows"], 2)
        self.assertEqual(data["actualTranslationVariants"], 2)
        self.assertEqual(data["publishedRows"], 0)

    def test_duplicate_source_id_is_blocked_before_any_write(self):
        records = json.loads(json.dumps(self.entries))
        records[1]["sourceEntryId"] = records[0]["sourceEntryId"]
        result = self.run_loader(rows=records)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Duplicate", result.stderr)

    def test_finnish_row_cannot_hide_inside_german_source(self):
        records = json.loads(json.dumps(self.entries))
        records[1]["language"] = "fi"
        result = self.run_loader(rows=records)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("language", result.stderr)

    def test_wrong_translation_language_is_blocked(self):
        records = json.loads(json.dumps(self.entries))
        records[1]["senses"][0]["translationLanguage"] = "de"
        result = self.run_loader(rows=records)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("translation language", result.stderr)

    def test_manifest_counts_cannot_be_forged(self):
        result = self.run_loader(manifest_overrides={"translationVariants": 5})
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("counts", result.stderr)

    def test_source_approval_is_required(self):
        result = self.run_loader(source_id="unapproved-dataset")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("checksum or staging-rights", result.stderr)


if __name__ == "__main__":
    unittest.main()
