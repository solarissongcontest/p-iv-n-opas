import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_VOICE_PREFERENCE_KEY,losVoiceIdentity,matchLosPreferredVoice,readLosPreferredVoice,saveLosPreferredVoice}
 from "../src/features/los/losVoicePreference.ts";

test("German TTS voice IDs are language scoped and choice never guesses a different voice",()=>{
 const de={name:"Stimme",lang:"de-DE"},at={name:"Stimme",lang:"de-AT"},en={name:"Stimme",lang:"en-US"};
 assert.equal(losVoiceIdentity(de),"de-DE / Stimme");
 assert.notEqual(losVoiceIdentity(de),losVoiceIdentity(at));
 assert.notEqual(losVoiceIdentity(de),losVoiceIdentity(en));
 assert.equal(matchLosPreferredVoice([at,de],"de-DE / Stimme"),de);
 assert.equal(matchLosPreferredVoice([at],"de-DE / Stimme"),undefined);
 assert.equal(matchLosPreferredVoice([de],""),undefined);
 assert.equal(readLosPreferredVoice(),""); // Server-side rendering must not access storage.
 assert.equal(saveLosPreferredVoice("de-DE / Stimme"),false);
 assert.equal(LOS_VOICE_PREFERENCE_KEY,"los1.audio.preferred-german-voice.v1");
});
