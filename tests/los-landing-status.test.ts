import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import {LOS_BOOKS} from "../src/features/los/books.ts";

const app=readFileSync("src/features/los/LosApp.tsx","utf8");

test("LOS! library cards derive actual chapter availability rather than claiming only the first chapter",()=>{
 assert.match(app,/book\.chapters\.filter\(chapter => chapter\.publicationStatus === "preview"\)\.length/);
 assert.doesNotMatch(app,/Ensimmäinen kappale · harjoitusversio/);
 assert.equal(LOS_BOOKS[0]?.chapters.filter(chapter=>chapter.publicationStatus==="preview").length,10);
 assert.ok(LOS_BOOKS.slice(1).every(book=>book.chapters.every(chapter=>chapter.publicationStatus!=="preview")));
});

test("LOS! book home never advertises stale fixed preview figures",()=>{
 assert.doesNotMatch(app,/seitsemässä ensimmäisessä kappaleessa/);
 assert.doesNotMatch(app,/40 ohjattua oppituntia/);
 assert.match(app,/book\.lessons\.filter\(lesson => lesson\.publicationStatus === "preview"\)\.length/);
 assert.match(app,/book\.chapterTests\.some\(test => test\.examType === "final"\)/);
 assert.match(app,/synkronoinnin tuotantovarmistus/);
 assert.equal(LOS_BOOKS[0]?.lessons.filter(lesson=>lesson.publicationStatus==="preview").length,60);
 assert.equal(LOS_BOOKS[0]?.lessons.filter(lesson=>lesson.publicationStatus==="planned").length,0);
 assert.ok(LOS_BOOKS[0]?.lessons.find(l=>l.id==="L052"&&l.publicationStatus==="preview"));
});
