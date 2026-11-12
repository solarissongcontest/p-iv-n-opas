"""LOS! importer tests use tiny synthetic fixtures only, never claim source coverage."""
import importlib.util
import json
from pathlib import Path
from types import SimpleNamespace
import tempfile
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / "los-dictionary-import.py"
SPEC = importlib.util.spec_from_file_location("los_dictionary_import", SCRIPT)
module = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(module)

TEI = """<?xml version="1.0" encoding="UTF-8"?>
<TEI xmlns="http://www.tei-c.org/ns/1.0">
<teiHeader><fileDesc><publicationStmt><availability>
<licence target="https://creativecommons.org/licenses/by-sa/3.0/">
CC BY-SA 3.0 example fixture, NOT a real FreeDict licence approval.
</licence></availability></publicationStmt></fileDesc></teiHeader>
<text><body>
<entry xml:id="bank-1"><form><orth>Bank</orth></form>
<gramGrp><pos>n</pos><gen>f</gen></gramGrp>
<sense n="1"><cit type="trans"><quote>penkki</quote></cit></sense>
</entry>
<entry xml:id="bank-2"><form><orth>Bank</orth></form>
<gramGrp><pos>n</pos><gen>f</gen></gramGrp>
<sense n="1"><cit type="trans"><quote>pankki</quote></cit></sense>
<cit type="example"><quote>Ich bin bei der Bank.</quote>
<cit type="trans"><quote>Olen pankissa.</quote></cit></cit></entry>
</body></text></TEI>
"""


class DictionaryImporterTest(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.source = self.root / "deu-fin.tei"
        self.source.write_text(TEI, encoding="utf-8")

    def args(self, mode="inspect", kind="freedict", direction="de-fi"):
        return SimpleNamespace(kind=kind, direction=direction,
                               source=str(self.source), source_id="test-deu-fin",
                               mode=mode, approval=None, output=None)

    def approved(self):
        details = module.run(self.args())
        legal = {"sourceId": "test-deu-fin", "kind": "freedict",
                 "sourceSha512": details["sourceSha512"],
                 "rightsApproval": {"reviewed": True, "publicationApproved": True,
                    "licenseCode": "CC BY-SA 3.0", "licenseUrl":
                        "https://creativecommons.org/licenses/by-sa/3.0/",
                    "evidenceUrl": "https://example.org/test-fixture",
                    "reviewedBy": "synthetic-unit-test-only", "reviewedAt": "2026-11-12",
                    "teiHeaderSha256": details["teiHeaderSha256"]}}
        path = self.root / "approval.json"
        path.write_text(json.dumps(legal), encoding="utf-8")
        return path

    def test_inspect_never_publishes_and_counts_zero_until_import(self):
        details = module.run(self.args())
        self.assertEqual(details["status"], "NOT_IMPORTED_RIGHTS_UNVERIFIED")
        self.assertEqual(details["inspectedSourceRows"], 2)
        self.assertEqual(details["inspectedDistinctLemmaAndPos"], 1)
        self.assertEqual(details["inspectedTranslationVariants"], 2)
        self.assertEqual(details["publishedRows"], 0)
        self.assertEqual(len(details["sourceSha512"]), 128)
        self.assertEqual(len(details["teiHeaderSha256"]), 64)

    def test_license_and_checksum_gate_rejects_unreviewed_data(self):
        args = self.args("import")
        args.output = str(self.root / "data.jsonl")
        args.approval = str(self.root / "missing.json")
        with self.assertRaises(OSError):
            module.run(args)
        approval = self.approved()
        content = json.loads(approval.read_text(encoding="utf-8"))
        content["rightsApproval"]["reviewed"] = False
        approval.write_text(json.dumps(content), encoding="utf-8")
        args.approval = str(approval)
        with self.assertRaisesRegex(ValueError, "tarkistushyväksyntää"):
            module.run(args)
        self.assertFalse(Path(args.output).exists())
        content["rightsApproval"]["reviewed"] = True
        content["sourceSha512"] = "0" * 128
        approval.write_text(json.dumps(content), encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "SHA512"):
            module.run(args)

    def test_tei_import_preserves_homonymous_senses_and_excludes_example_translations(self):
        approval = self.approved()
        args = self.args("import")
        args.approval = str(approval)
        args.output = str(self.root / "staged-de-fi.jsonl")
        report = module.run(args)
        self.assertEqual(report["status"], "STAGED_NOT_PUBLISHED")
        self.assertEqual(report["importedSourceRows"], 2)
        self.assertEqual(report["distinctLemmaAndPos"], 1)
        self.assertEqual(report["translationVariants"], 2)
        lines = [json.loads(s) for s in Path(args.output).read_text(encoding="utf-8").splitlines()]
        self.assertEqual([x["sourceEntryId"] for x in lines], ["bank-1", "bank-2"])
        self.assertEqual([x["senses"][0]["translations"][0] for x in lines], ["penkki", "pankki"])
        self.assertNotIn("Olen pankissa.", json.dumps(lines, ensure_ascii=False))
        self.assertEqual(lines[0]["gender"], "f")

    def test_kaikki_respects_language_and_never_calls_german_gloss_finnish(self):
        self.source = self.root / "sample.jsonl"
        self.source.write_text("\n".join([
            json.dumps({"word": "Häuser", "lang_code": "de", "pos": "noun",
                        "senses": [{"glosses": ["Plural von Haus"]}],
                        "forms": [{"form": "Haus"}],
                        "sounds": [{"ipa": "/ˈhɔɪ̯zɐ/"}]}),
            json.dumps({"word": "house", "lang_code": "en", "senses": [{"glosses": ["home"]}]}),
        ]) + "\n", encoding="utf-8")
        records = list(module.parse_kaikki(self.source, "sample-kaikki"))
        self.assertEqual(len(records), 1)
        self.assertEqual(records[0]["lemma"], "Häuser")
        self.assertEqual(records[0]["ipaCandidates"], ["/ˈhɔɪ̯zɐ/"])
        self.assertEqual(records[0]["senses"][0]["glossLanguage"], "source")
        self.assertEqual(records[0]["senses"][0]["translations"], [])
        self.assertIn("häuser", records[0]["searchKeys"])
        self.assertIn("haeuser", records[0]["searchKeys"])
        self.assertEqual(module.search_keys("Maße", "de"), ["maße", "masse"])


if __name__ == "__main__":
    unittest.main()
