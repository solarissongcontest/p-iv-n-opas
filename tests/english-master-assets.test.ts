import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";

type Manifest = {
  schema: string;
  version: string;
  size_bytes: number;
  sha256: string;
  parts: Array<{ file: string; size: number; sha: string }>;
};

test("English Master bundled book has all 122 chapters, 192 lessons and 20 playable-source media entries", () => {
  const directory = join(process.cwd(), "public", "english-master");
  const manifest = JSON.parse(readFileSync(join(directory, "content.manifest.json"), "utf8")) as Manifest;
  assert.equal(manifest.schema, "english-master-asset-manifest-v1");
  assert.equal(manifest.version, "0.8");
  assert.equal(manifest.parts.length, 16);
  const chunks = manifest.parts.map((part, index) => {
    assert.equal(part.file, `pack-part-${String(index).padStart(2, "0")}.bin`);
    const buffer = readFileSync(join(directory, part.file));
    assert.equal(buffer.byteLength, part.size);
    const actualGitBlobSha = createHash("sha1").update(`blob ${buffer.byteLength}\0`).update(buffer).digest("hex");
    assert.equal(actualGitBlobSha, part.sha);
    return buffer;
  });
  const payload = Buffer.concat(chunks);
  assert.equal(payload.byteLength, manifest.size_bytes);
  assert.equal(
    createHash("sha256").update(payload).digest("hex"),
    manifest.sha256,
    "Every binary part must reconstruct the original verified Alpha 0.8 package",
  );
  const pack = JSON.parse(gunzipSync(payload).toString("utf8")) as {
    schema: string;
    chapter_count: number;
    lesson_count: number;
    chapters: Record<string, { content_id: string }>;
    lessons: Record<string, { content_id: string }>;
    media: Record<string, string>;
  };
  assert.equal(pack.schema, "em-opintopaivakirja-pack-0.8");
  assert.equal(pack.chapter_count, 122);
  assert.equal(pack.lesson_count, 192);
  assert.equal(Object.keys(pack.chapters).length, 122);
  assert.equal(Object.keys(pack.lessons).length, 192);
  assert.equal(Object.keys(pack.media).length, 20);
  for (const [id, chapter] of Object.entries(pack.chapters)) assert.equal(chapter.content_id, id);
  for (const [id, lesson] of Object.entries(pack.lessons)) assert.equal(lesson.content_id, id);
  for (const [name, media] of Object.entries(pack.media)) {
    assert.match(name, /\.mp3$/);
    assert.match(media, /^data:audio\/mpeg;base64,/);
  }
});
