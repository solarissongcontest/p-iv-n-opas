import assert from 'node:assert/strict';
import test from 'node:test';
import {anchorFromSelectedTokens,gradeExercise} from '../src/features/los/engine.ts';
import {chapters,LOS_VERSION} from '../src/features/los/content.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
test('dragging across whitespace selects all intersecting word tokens as stable text range',()=>{
 const source='Hallo, ich heiße Franz. Wie heißt du?';
 const first={start:7,end:10}, second={start:11,end:16}, third={start:17,end:23};
 const anchor=anchorFromSelectedTokens('b',[second,first,third],source.length);
 assert.deepEqual(anchor,{blockId:'b',start:7,end:23,contentVersion:LOS_VERSION});
 assert.equal(source.slice(anchor!.start,anchor!.end),'ich heiße Franz.');
});
test('invalid, off-block and old-version highlights are never auto-graded as correct',()=>{
 assert.equal(anchorFromSelectedTokens('b',[],9),null);
 assert.equal(anchorFromSelectedTokens('b',[{start:-1,end:2},{start:0,end:500}],8),null);
 const chapter=chapters[1]!, exercise=allChapterExercises('C02',chapter.exercises).find(e=>e.id==='C02-X12')!;
 const text=chapter.blocks.find(b=>b.id===exercise.blockId)!.text;
 const start=text.indexOf(exercise.target!);
 const anchor=anchorFromSelectedTokens(exercise.blockId!,[{start,end:start+exercise.target!.length}],text.length)!;
 assert.equal(gradeExercise({...exercise,sourceText:text},anchor).status,'correct');
 assert.equal(gradeExercise({...exercise,sourceText:text},{...anchor,contentVersion:'old'}).status,'incorrect');
 assert.equal(gradeExercise({...exercise,sourceText:text},{...anchor,blockId:'different'}).status,'incorrect');
});
test('backwards drag retains min/max text offsets for correct manual review',()=>{
 const selected=anchorFromSelectedTokens('x',[{start:20,end:25},{start:1,end:4}],40)!;
 assert.equal(selected.start,1);
 assert.equal(selected.end,25);
});
