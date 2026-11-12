#!/usr/bin/env python3
"""Offline, license-gated, streaming FreeDict TEI / Kaikki JSONL loader for LOS!.

This creates a staged, source-separated NDJSON package, NOT a published
dictionary. Passing --approve does not exist: a per-file verified manifest
is mandatory. No network calls, no browser bundle or production writes.
"""
from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import os
from pathlib import Path
import sys
import unicodedata
import xml.etree.ElementTree as ET

ALLOWED_KINDS = ("freedict", "kaikki")
MAX_WORD_LENGTH = 180
MAX_CONTENT_LENGTH = 2000


def nfc(text: object) -> str:
    return unicodedata.normalize("NFC", str(text if text is not None else "")).strip()


def search_keys(word: str, lang: str) -> list[str]:
    base = nfc(word).lower()
    keys = [base]
    if lang == "de":
        keys.extend([base.replace("ß", "ss"),
                     base.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue")])
    return list(dict.fromkeys(key for key in keys if key))


def sha512_file(path: Path) -> str:
    digest = hashlib.sha512()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def tag_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def children(element: ET.Element, name: str):
    return [child for child in element if tag_name(child.tag) == name]


def first_text(element: ET.Element, tag: str) -> str:
    for desc in element.iter():
        if tag_name(desc.tag) == tag:
            return nfc(" ".join("".join(desc.itertext()).split()))
    return ""


def header_text(path: Path) -> str:
    # xml.etree does not fetch external DTDs. Reject inline entity definitions
    # rather than expanding untrusted XML.
    with path.open("rb") as file:
        if b"<!ENTITY" in file.read(65536).upper():
            raise ValueError("TEI sisältää entiteettimäärittelyjä: pysäytetään XML-tuonti")
    try:
        for _, elem in ET.iterparse(path, events=("end",)):
            if tag_name(elem.tag) == "teiHeader":
                text = " ".join(" ".join(elem.itertext()).split())
                return nfc(text)
    except ET.ParseError as error:
        raise ValueError(f"TEI header ei jäsentynyt: {error}") from error
    raise ValueError("TEI-teiHeader puuttuu; lisenssiä ei voi tarkistaa")


def license_approval(path: Path, kind: str, source_id: str, approval: dict,
                     source_sha: str, header: str | None, gloss_language: str | None) -> dict:
    if approval.get("sourceId") != source_id or approval.get("kind") != kind:
        raise ValueError("Lähteen tunnus tai tyyppi ei vastaa hyväksymistietoa")
    if approval.get("sourceSha512", "").lower() != source_sha:
        raise ValueError("Lähteen SHA512-tarkistussumma ei täsmää")
    if kind == "kaikki" and approval.get("glossLanguage") != gloss_language:
        raise ValueError("Kaikki-selitteen hyväksytty kieli ei vastaa aineistoa")
    legal = approval.get("rightsApproval") or {}
    if legal.get("reviewed") is not True:
        raise ValueError("Lisenssille ei ole nimenomaista tarkistushyväksyntää")
    for key in ("licenseCode", "licenseUrl", "evidenceUrl", "reviewedBy", "reviewedAt"):
        if not isinstance(legal.get(key), str) or not legal[key].strip():
            raise ValueError(f"Lisenssin pakollinen provenance puuttuu: {key}")
    if not legal["licenseUrl"].startswith("https://") or not legal["evidenceUrl"].startswith("https://"):
        raise ValueError("Lisenssin lähteiden on oltava HTTPS-osoitteita")
    if header is not None:
        actual_header_sha = hashlib.sha256(header.encode("utf-8")).hexdigest()
        if legal.get("teiHeaderSha256") != actual_header_sha:
            raise ValueError("Hyväksytty TEI-header ei vastaa lähdetiedostoa")
    # Import is always staged, NEVER published. This gate authorizes only
    # a temporary QA conversion of evidence-matched source bytes.
    if legal.get("stagingApproved") is not True:
        raise ValueError("Lähdeaineiston väliaikaista laaduntarkistustuontia ei ole hyväksytty")
    return legal


def parse_freedict(path: Path, source_id: str, direction: str):
    source_lang, target_lang = direction.split("-")
    try:
        stream = ET.iterparse(path, events=("end",))
        ordinal = 0
        for _, element in stream:
            if tag_name(element.tag) != "entry":
                continue
            ordinal += 1
            form_elements = children(element, "form")
            forms: list[str] = []
            for form in form_elements:
                forms.extend(nfc(" ".join("".join(x.itertext()).split()))
                             for x in children(form, "orth"))
            forms = [form for form in dict.fromkeys(forms) if 0 < len(form) <= MAX_WORD_LENGTH]
            if not forms:
                element.clear()
                continue
            pos = first_text(element, "pos")[:80] or None
            gender = first_text(element, "gen")[:40] or None
            senses: list[dict] = []
            for sense_idx, sense in enumerate(children(element, "sense"), 1):
                translations: list[str] = []
                for cit in children(sense, "cit"):
                    if cit.attrib.get("type") != "trans":
                        continue
                    for quote in children(cit, "quote"):
                        translation = nfc(" ".join("".join(quote.itertext()).split()))
                        if 0 < len(translation) <= MAX_CONTENT_LENGTH:
                            translations.append(translation)
                # Explicit citations only. Never interpret examples or a
                # German/English definition as a Finnish translation.
                if translations:
                    senses.append({"index": sense_idx,
                                   "translations": list(dict.fromkeys(translations)),
                                   "translationLanguage": target_lang})
            yield {"sourceId": source_id, "sourceEntryId": element.attrib.get(
                        "{http://www.w3.org/XML/1998/namespace}id") or str(ordinal),
                   "row": ordinal, "language": source_lang,
                   "targetLanguage": target_lang, "lemma": forms[0],
                   "searchKeys": search_keys(forms[0], source_lang),
                   "forms": forms[1:], "partOfSpeech": pos, "gender": gender,
                   "senses": senses, "sourceKind": "freedict"}
            element.clear()
    except ET.ParseError as error:
        raise ValueError(f"TEI-parsinta epäonnistui: {error}") from error


def parse_kaikki(path: Path, source_id: str, gloss_language: str):
    open_input = gzip.open if path.suffix == ".gz" else open
    with open_input(path, "rt", encoding="utf-8") as stream:
        for lineno, line in enumerate(stream, 1):
            if not line.strip():
                continue
            try:
                entry = json.loads(line)
            except json.JSONDecodeError as error:
                raise ValueError(f"Kaikki JSONL virheellinen rivillä {lineno}: {error}") from error
            if not isinstance(entry, dict) or entry.get("lang_code") != "de":
                continue
            word = nfc(entry.get("word"))
            if not word or len(word) > MAX_WORD_LENGTH:
                continue
            pos = nfc(entry.get("pos"))[:80] or None
            senses: list[dict] = []
            for idx, sense in enumerate(entry.get("senses") or [], 1):
                if not isinstance(sense, dict):
                    continue
                # All Kaikki glosses retain their source language. A German
                # explanation must not be surfaced as a Finnish translation.
                glosses = [nfc(x)[:MAX_CONTENT_LENGTH] for x in sense.get("glosses") or []
                           if isinstance(x, str) and x.strip()]
                senses.append({"index": idx, "glosses": glosses,
                               "glossLanguage": gloss_language, "translations": []})
            # Keep the morphological tags on each form. The display-form
            # string list remains for older staged consumers.
            form_details: list[dict] = []
            for candidate in entry.get("forms") or []:
                if not isinstance(candidate, dict):
                    continue
                form = nfc(candidate.get("form"))
                if not 0 < len(form) <= MAX_WORD_LENGTH:
                    continue
                tags = [nfc(x)[:80] for x in candidate.get("tags") or []
                        if isinstance(x, str) and x.strip()][:30]
                raw_tags = [nfc(x)[:80] for x in candidate.get("raw_tags") or []
                            if isinstance(x, str) and x.strip()][:30]
                form_details.append({"form": form, "tags": tags, "rawTags": raw_tags})
            forms = list(dict.fromkeys(x["form"] for x in form_details))
            ipa = [nfc(x["ipa"]) for x in entry.get("sounds") or []
                   if isinstance(x, dict) and isinstance(x.get("ipa"), str)
                   and x["ipa"].strip()]
            # Media links are not published. Filename metadata is not a
            # per-file licence or device playback approval.
            yield {"sourceId": source_id, "sourceEntryId": f"{lineno}",
                   "row": lineno, "language": "de", "targetLanguage": None,
                   "lemma": word, "searchKeys": search_keys(word, "de"),
                   "forms": forms, "formDetails": form_details,
                   "partOfSpeech": pos, "gender": None,
                   "senses": senses, "ipaCandidates": list(dict.fromkeys(ipa)),
                   "sourceKind": "kaikki"}


def run(args: argparse.Namespace) -> dict:
    file = Path(args.source)
    if not file.is_file():
        raise ValueError("Lähdetiedostoa ei löydy")
    if args.kind == "freedict" and args.direction not in ("de-fi", "fi-de"):
        raise ValueError("FreeDict-tietueen suunnan tulee olla de-fi tai fi-de")
    if args.kind == "kaikki" and args.direction != "de":
        raise ValueError("Kaikki-tuonnissa kielen tulee olla de")
    if args.kind == "kaikki" and args.gloss_language not in ("de", "en"):
        raise ValueError("Kaikki-tuonnille vaaditaan oikea selitekieli --gloss-language en/de")
    source_sha = sha512_file(file)
    header = header_text(file) if args.kind == "freedict" else None
    base = {"sourceId": args.source_id, "kind": args.kind, "direction": args.direction,
            "glossLanguage": args.gloss_language if args.kind == "kaikki" else None,
            "sourceFile": file.name, "sourceSha512": source_sha}
    if args.mode == "inspect":
        # This verifies real, downloaded local bytes. It performs no release,
        # database write or licence approval and never reports published rows.
        inspector = parse_freedict(file, args.source_id, args.direction) if args.kind == "freedict" \
            else parse_kaikki(file, args.source_id, args.gloss_language)
        rows = translation_variants = 0
        lexemes: set[tuple[str, str | None]] = set()
        for record in inspector:
            rows += 1
            lexemes.add((record["lemma"], record["partOfSpeech"]))
            translation_variants += sum(len(s.get("translations", [])) for s in record["senses"])
        return {**base, "teiHeaderSha256": hashlib.sha256(
            header.encode("utf-8")).hexdigest() if header is not None else None,
                "headerPreview": header[:800] if header else None,
                "inspectedSourceRows": rows,
                "inspectedDistinctLemmaAndPos": len(lexemes),
                "inspectedTranslationVariants": translation_variants,
                "publishedRows": 0,
                "status": "NOT_IMPORTED_RIGHTS_UNVERIFIED"}
    if not args.approval or not args.output:
        raise ValueError("Varsinainen tuonti edellyttää --approval ja --output")
    with Path(args.approval).open("r", encoding="utf-8") as stream:
        approval = json.load(stream)
    legal = license_approval(file, args.kind, args.source_id, approval, source_sha,
                             header, args.gloss_language)
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    pending = output.with_name(output.name + ".pending")
    distinct: set[tuple] = set()
    total = translations = entries_with_translations = ipa_candidates = 0
    reader = parse_freedict(file, args.source_id, args.direction) if args.kind == "freedict" \
        else parse_kaikki(file, args.source_id, args.gloss_language)
    try:
        with pending.open("w", encoding="utf-8") as stream:
            for record in reader:
                total += 1
                distinct.add((record["lemma"], record["partOfSpeech"]))
                present = sum(len(sense.get("translations", [])) for sense in record["senses"])
                translations += present
                entries_with_translations += int(present > 0)
                ipa_candidates += len(record.get("ipaCandidates", []))
                record["licenseSourceId"] = args.source_id
                stream.write(json.dumps(record, ensure_ascii=False, separators=(",", ":")) + "\n")
        if total == 0:
            raise ValueError("Aineistossa ei ollut hyväksyttäviä lähdekielen tietueita")
        if args.kind == "freedict" and translations == 0:
            raise ValueError("FreeDict-aineistossa ei jäsentynyt yhtään varmaa käännösviitettä")
        os.replace(pending, output)
    finally:
        if pending.exists():
            pending.unlink()
    manifest = {**base, "licenseCode": legal["licenseCode"],
                "licenseUrl": legal["licenseUrl"], "evidenceUrl": legal["evidenceUrl"],
                "reviewedBy": legal["reviewedBy"], "reviewedAt": legal["reviewedAt"],
                "importedSourceRows": total, "distinctLemmaAndPos": len(distinct),
                "rowsWithTranslations": entries_with_translations,
                "translationVariants": translations, "ipaCandidates": ipa_candidates,
                "outputSha512": sha512_file(output),
                "status": "STAGED_NOT_PUBLISHED",
                "doNotMergeLicenses": True}
    with output.with_name(output.name + ".manifest.json").open("w", encoding="utf-8") as stream:
        json.dump(manifest, stream, ensure_ascii=False, indent=2)
        stream.write("\n")
    return manifest


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--kind", choices=ALLOWED_KINDS, required=True)
    parser.add_argument("--direction", choices=("de-fi", "fi-de", "de"), required=True)
    parser.add_argument("--source", required=True)
    parser.add_argument("--gloss-language", choices=("de", "en"), default=None,
                        help="For Kaikki: language of original Wiktionary glosses, en or de")
    parser.add_argument("--source-id", required=True)
    parser.add_argument("--mode", choices=("inspect", "import"), default="inspect")
    parser.add_argument("--approval")
    parser.add_argument("--output")
    args = parser.parse_args()
    try:
        print(json.dumps(run(args), ensure_ascii=False, indent=2))
    except (ValueError, OSError, ET.ParseError, json.JSONDecodeError) as error:
        print(f"LOS! dictionary import BLOCKED: {error}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
