#!/usr/bin/env python3
"""Resolve only reviewed, non-semantic Teacher stack merge conflicts in disposable CI.

Any unexpected code conflict raises instead of silently selecting a side.
This script is not a general-purpose 'ours wins' merge policy.
"""
from __future__ import annotations
from pathlib import Path
import re
import subprocess
import sys

PATTERN = re.compile(r"(?ms)^<<<<<<< HEAD\n(.*?)^=======\n(.*?)^>>>>>>> [^\n]*\n")

def choose(path: str, ours: str, theirs: str) -> str:
    if path == "e2e/los-full-book.spec.ts" and ours.lstrip().startswith('test("') and theirs.lstrip().startswith('test("'):
        # Distinct appended Playwright test definitions have no shared application state.
        ours_names=set(re.findall(r'test\("([^"]+)"',ours))
        theirs_names=set(re.findall(r'test\("([^"]+)"',theirs))
        if not ours_names or not theirs_names or ours_names & theirs_names:
            raise ValueError("Overlapping names in appended E2E test cases")
        return ours.rstrip("\n") + "\n\n" + theirs.lstrip("\n")
    if path == "e2e/los-full-book.spec.ts" and all("Number(title.slice(1))" in x for x in (ours, theirs)):
        return "    if(Number(title.slice(1))<=60){\n"
    if path in {
        "src/features/los/LosBook.tsx",
        "src/features/los/LosReferenceTools.tsx",
        "src/features/los/teacher/LosTeacherPlayer.tsx",
    } and all("Teacher 2.0" in x for x in (ours, theirs)):
        result = ours.replace("L001–L026", "L001–L060").replace("L001–L021", "L001–L060")
        if "L001–L060" not in result:
            raise ValueError(f"No full-coverage declaration in {path}: {result[:120]!r}")
        return result
    if path == "src/features/los/teacher/LosTeacherPlayer.tsx" and all("teacherWrongFeedback" in v and "type TeacherScene" in v for v in (ours, theirs)):
        terms = list(dict.fromkeys([t.strip() for v in (ours,theirs) for t in v.split(",") if t.strip()]))
        return "  " + ", ".join(terms) + ",\n"
    if path == "src/features/los/teacher/engine.ts" and all(v.lstrip().startswith("kind:") for v in (ours, theirs)):
        kinds = list(dict.fromkeys(re.findall(r'"([^"]+)"', ours+theirs)))
        if not all(k in {"introduction","explanation","board","question","book","activity","reflection","summary","form","calendar","source"} for k in kinds):
            raise ValueError("Unexpected engine scene variant")
        return "  kind: " + " | ".join('"'+k+'"' for k in kinds) + ";\n"
    if path == "src/features/los/teacher/lessonL004.ts" and "LOS1_C09_TEACHER" in theirs and "LOS1_L" in ours:
        return ours
    if path == "src/features/los/teacher/teacher.css" and ours.lstrip().startswith("/* C06:") and theirs.lstrip().startswith("/*") and "C09" in theirs:
        return ours.rstrip("\n") + "\n\n" + theirs.lstrip("\n")
    if path == "docs/LOS1_TEACHER_V2_60_LESSON_STRUCTURAL_AUDIT_2026-11-13.md" and ours.lstrip().startswith("## ") and theirs.lstrip().startswith("## "):
        # Two dated independent audit appendices; retain both.
        return ours.rstrip("\n") + "\n\n" + theirs.lstrip("\n")
    if path == "src/features/los/teacher/teacher.css" and ours.lstrip().startswith("/* C06:") and theirs.lstrip().startswith("/* C07"):
        # Two new scoped, disjoint teaching-widget style families.
        return ours.rstrip("\n") + "\n\n" + theirs.lstrip("\n")
    if path == "src/features/los/teacher/validateContent.ts" and "scene.numberBuilder" in ours and 'scene.kind === "form"' in theirs:
        # Preserve number composition AND authentic form validation.
        return ours + theirs
    if path == "src/features/los/teacher/LosTeacherPlayer.tsx" and "Boolean(scene.numberBuilder" in ours and "Boolean(scene.form" in theirs:
        return ours.rstrip("\n") + " ||\n" + theirs
    if path == "src/features/los/teacher/LosTeacherPlayer.tsx" and "scene.numberBuilder" in ours and 'scene.kind === "form"' in theirs:
        # Independent adjacent JSX widgets in the same scene body: keep both.
        if ours.count("LosTeacherNumberBuilder") != 1 or theirs.count('scene.kind === "form"') != 1:
            raise ValueError("Unexpected duplicate Player widget in conflict")
        return ours + theirs
    if path == "src/features/los/teacher/engine.ts":
        if ("teacherMidtermAssessmentStatus" in ours and "teacherBuiltNumberCount" in theirs
                and "teacherChapterAssessmentStatus" in ours and "teacherChapterAssessmentStatus" in theirs):
            return ('  return teacherChapterAssessmentStatus(lesson, chapterAssessment).ready &&\n'
                    '    teacherMidtermAssessmentStatus(lesson, chapterAssessment, practiceAnswers).ready &&\n'
                    '    !session.paused && lesson.scenes.every(scene => session.visitedIds.includes(scene.id)) &&\n'
                    '    lesson.scenes.every(scene => !scene.numberBuilder || teacherBuiltNumberCount(session, scene.id) >= 4) &&\n')
    if path == "src/features/los/teacher/validateContent.ts" and "/^C" in ours and "/^C" in theirs and "(?:" in ours and "(?:" in theirs:
        lhs = re.search(r"\(\?:([A-Z0-9|]+)\)", ours)
        rhs = re.search(r"\(\?:([A-Z0-9|]+)\)", theirs)
        if lhs is None or rhs is None:
            raise ValueError("Malformed source-check selector alternatives")
        options = list(dict.fromkeys(lhs.group(1).split("|") + rhs.group(1).split("|")))
        return ours.replace(lhs.group(1), "|".join(options), 1)
    if path == "src/features/los/teacher/lessonL004.ts" and "LOS1_C08_TEACHER_LESSONS.find" in theirs and "LOS1_L" in ours:
        return ours
    if path == "src/features/los/teacher/lessonL004.ts":
        if all(re.match(r"^(?:import .*lessonL\d{3}\.ts.*|\s*)$", line) for line in (ours+theirs).splitlines()):
            return ours
        if all(re.match(r"^\s*(?:if \(id === LOS1_L\d{3}_TEACHER\.id\) return LOS1_L\d{3}_TEACHER;|return (?:undefined|id === LOS1_L\d{3}_TEACHER\.id \? LOS1_L\d{3}_TEACHER : undefined);)?\s*$", line) for line in (ours+theirs).splitlines()):
            return ours
    raise ValueError(f"Unreviewed source conflict: {path}\nOURS: {ours[:300]}\nTHEIRS: {theirs[:300]}")

def normalize_registry() -> None:
    path = Path("src/features/los/teacher/lessonL004.ts")
    body = path.read_text()
    files = sorted(Path("src/features/los/teacher").glob("lessonL[0-9][0-9][0-9].ts"))
    for lesson in files:
        number = lesson.stem.removeprefix("lessonL")
        if number == "004":
            continue
        name = f"LOS1_L{number}_TEACHER"
        imp = f'import {{ {name} }} from "./{lesson.name}";'
        if imp not in body:
            body = imp + "\n" + body
        lookup = f"  if (id === {name}.id) return {name};"
        if lookup not in body:
            boundary = "  return undefined;\n}"
            if boundary not in body:
                raise ValueError("Cannot locate registry final return")
            body = body.replace(boundary, lookup+"\n"+boundary, 1)
    if Path("src/features/los/teacher/lessonC08.ts").exists():
        imp = 'import { LOS1_C08_TEACHER_LESSONS } from "./lessonC08.ts";'
        if imp not in body:
            body = imp + "\n" + body
        lookup = '  const c08 = LOS1_C08_TEACHER_LESSONS.find(lesson => lesson.id === id);\n  if (c08) return c08;'
        if lookup not in body:
            boundary = "  return undefined;\n}"
            if boundary not in body:
                raise ValueError("Cannot locate C08 registry fallback")
            body = body.replace(boundary, lookup + "\n" + boundary, 1)
    if Path("src/features/los/teacher/lessonC09.ts").exists():
        imp = 'import { LOS1_C09_TEACHER } from "./lessonC09.ts";'
        if imp not in body:
            body = imp + "\n" + body
        lookup = '  const c09 = LOS1_C09_TEACHER.find(lesson => lesson.id === id);\n  if (c09) return c09;'
        if lookup not in body:
            boundary = "  return undefined;\n}"
            if boundary not in body:
                raise ValueError("Cannot locate C09 registry fallback")
            body = body.replace(boundary, lookup + "\n" + boundary, 1)
    path.write_text(body)

unmerged = subprocess.check_output(["git","diff","--name-only","--diff-filter=U"],text=True).splitlines()
print("Detected merge conflicts:", ", ".join(unmerged))
failures=[]
for name in unmerged:
    path = Path(name)
    contents = path.read_text()
    try:
        new_body, count = PATTERN.subn(lambda m:choose(name,m.group(1),m.group(2)),contents)
        if count < 1 or "<<<<<<<" in new_body or ">>>>>>>" in new_body:
            raise ValueError(f"Unresolved markers in {name}")
    except ValueError as err:
        failures.append(str(err))
        continue
    path.write_text(new_body)
    print(f"Resolved {name}: {count} explicit reviewed conflict block(s)")
if failures:
    raise ValueError("Unexpected semantic conflicts; refusing automatic merge:\\n" + "\\n----\\n".join(failures))
normalize_registry()
subprocess.run(["git","add","--",*unmerged,"src/features/los/teacher/lessonL004.ts"],check=True)
if subprocess.check_output(["git","ls-files","-u"],text=True).strip():
    raise ValueError("Unmerged index stages remain")
print("Merge conflict blocks cleared with strict path and content checks.")
