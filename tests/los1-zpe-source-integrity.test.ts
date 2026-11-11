import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters} from '../src/features/los/content.ts';
import {translationFi} from '../src/features/los/translations.ts';
import {c06Exam} from '../src/features/los/chapterExam.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';

/**
 * Fixed source snapshots manually verified 2026-11-11 against ZPE's
 * visible German full-text material. Deliberately do not derive expected
 * content from the chapter itself or a stale worksheet answer option.
 */
test('M-ZPE-01 reproduces the actual published Lucas NINE age transcription and every speaker',()=>{
 const c=chapters.find(c=>c.id==='C06')!;
 assert.equal(c.status,'text-reviewed');
 assert.equal(c.sourceUrl,'https://zpe.gov.pl/a/plik-audio/DIcQL1VxT');
 assert.match(c.attribution,/Monika Janicka/);
 assert.match(c.license,/CC BY-SA 3\.0/);
 assert.deepEqual(c.blocks.map(x=>[x.speaker,x.text]),[
  ['Dialog 1 · Fabian','Hi, wie alt bist du?'],
  ['Dialog 1 · Lucas','Ich bin neun.'],
  ['Dialog 1 · Fabian','Und wie heißt du?'],
  ['Dialog 1 · Lucas','Lucas.'],
  ['Dialog 2 · Fabian','Hallo, ich bin Fabian. Und wie heißt du?'],
  ['Dialog 2 · Larissa','Ich bin Larissa.'],
  ['Dialog 2 · Fabian','Bist du schon elf?'],
  ['Dialog 2 · Larissa','Ich bin schon zwölf Jahre alt.'],
  ['Dialog 3 · Fabian','Wie alt seid ihr?'],
  ['Dialog 3 · Tim und Mia','Wir sind 10.'],
  ['Dialog 4 · Fabian','Wie alt ist er?'],
  ['Dialog 4 · Felix','Paul? Er ist elf Jahre alt.']
 ]);
 assert.equal(translationFi['c06-a-2'],'Olen yhdeksänvuotias.');
 assert.equal(translationFi['c06-a-4'],'Lucas.');
 assert.ok(!c.blocks.some(x=>x.text.includes('Oskar')));
 assert.ok(!c.attribution.includes('Oskar'));
});
test('M-ZPE-01 C06 assessment and comprehension never test the stale Oskar-five variant',()=>{
 const c=chapters.find(c=>c.id==='C06')!;
 const practice=allChapterExercises('C06',c.exercises);
 const q20=practice.find(x=>x.id==='C06-X20')!;
 const q21=practice.find(x=>x.id==='C06-X21')!;
 const q27=practice.find(x=>x.id==='C06-X27')!;
 assert.equal(q20.correct,'yhdeksän');
 assert.equal(q21.correct,'Lucas');
 assert.ok(q27.pairs?.some(([name,age])=>name==='Lucas (Dialog 1)'&&age==='9'));
 const exam=c06Exam.find(x=>x.id==='EX-C06-15')!;
 assert.equal(exam.correct,'neun');
 assert.match(exam.prompt,/Lucas/);
 assert.ok(![...practice,...c06Exam].some(x=>/Oskar/.test(x.prompt+x.explanation)));
});
test('M-ZPE-02 reproduces full 12-turn CC BY-SA German-learning chat, stripped only of embedded glossary-link noise',()=>{
 const c=chapters.find(c=>c.id==='C08')!;
 assert.equal(c.status,'text-reviewed');
 assert.equal(c.sourceUrl,'https://zpe.gov.pl/a/przeczytaj/DOdbZ7KLX');
 assert.match(c.attribution,/Magdalena Sieradz/);
 assert.match(c.license,/CC BY-SA 3\.0/);
 assert.deepEqual(c.blocks.map(x=>x.speaker),[
  'Leo','Fabian','Leo','Fabian','Leo','Fabian','Leo','Fabian','Leo','Fabian','Leo','Fabian'
 ]);
 const exact=[
  'Hallo Fabian, wie geht es dir?',
  'Hallo Leo. Mir geht es prima. Danke. Und dir?',
  'Mir geht es auch super. Ich hatte heute wieder Deutschunterricht und es war toll!',
  'Cool. Und was macht ihr so in eurem Deutschunterricht?',
  'Das ist unterschiedlich. Wir hören zum Beispiel kurze Texte und Dialoge in der Fremdsprache und lösen Aufgaben dazu.',
  'Das machen wir in unserem Englischunterricht ja auch. Findest du das schwierig?',
  'Nein. Die Dialoge sind leicht.',
  'Und was macht ihr noch?',
  'Wir lernen neue Vokabeln. Wir sprechen die Wörter nach, wiederholen sie im Chor oder einzeln. Die Lehrerin prüft, ob wir die Wörter richtig aussprechen. Wir übersetzen die Wörter in unsere Muttersprache. Manchmal übersetzen wir kurze Sätze in die Fremdsprache.',
  'Schreibt ihr auch Texte?',
  'Ja, manchmal müssen wir als Hausaufgabe kurze Texte in der Fremdsprache schreiben. Später lesen wir sie im Unterricht vor und unsere Lehrerin korrigiert die Fehler. Wir machen auch viele interaktive Aufgaben auf Tablets und Smartphones.',
  'Das klingt alles sehr spannend.'
 ];
 assert.deepEqual(c.blocks.map(x=>x.text),exact);
 for(const block of c.blocks)assert.ok(translationFi[block.id]?.trim().length>=8,'Missing full Finnish translation: '+block.id);
 assert.ok(!c.blocks.some(x=>/unterschiedlich unterschiedlich|Dialoge hören hören|die Wörter nachsprechen sprechen|Fehler korrigieren korrigiert/.test(x.text)));
});
