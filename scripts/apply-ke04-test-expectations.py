from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    file = Path(path)
    text = file.read_text()
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected exactly one match, found {count}")
    file.write_text(text.replace(old, new, 1))


replace_once(
    "tests/finnish-ui.test.ts",
    '    "Kartoita lähtötaso",\n',
    '    "Kartoita tämän kappaleen lähtötaso",\n',
)

replace_once(
    "tests/learning-v5.test.ts",
    '  assert.match(source,/selectionTopics = confusionSet/);\n',
    '  assert.match(source,/selectionTopics = diagnosticMode && effectiveTopicId/);\n'
    '  assert.match(source,/: confusionSet[\\s\\S]*confusionSet\\.topicIds\\.includes/);\n',
)

print("KE04 test expectations updated")
