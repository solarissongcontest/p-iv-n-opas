import {LOS1_REVISED_AB} from "../content/los1RevisedAB.ts";
import {LOS1_REVISED_C} from "../content/los1RevisedC.ts";
import {losReadingQuestions,type LosReadingText} from "../content/los1ReadingBank.ts";
import type {TeacherBookLink,TeacherLesson,TeacherQuestion,TeacherScene} from "./engine.ts";
import {LOS1_TEACHER_CANONICAL_VERSION} from "./canonicalTeacherLessons.ts";

/** Review I is stored in draft chapter 91, not in C01-C05. Therefore its
 * current-book references MUST be book links, never C01-C05 checked-task IDs
 * incorrectly queried from the chapter 91 draft.
 */
const section={A:"text",B:"text-b",C:"text-c"} as const;
function link(chapter:string,kind:LosReadingText):TeacherBookLink{
 return {chapterId:chapter,section:section[kind],label:"C"+chapter+" · Text "+kind,
   instruction:"Lue nykyisen oppikirjan teksti ja tarkista sen omat ymmärtämistehtävät kirjan sivulta."};
}
function article(chapter:string,kind:LosReadingText){
 const ab=LOS1_REVISED_AB.chapters.find(x=>x.chapterId==="C"+chapter);
 const c=LOS1_REVISED_C.chapters.find(x=>x.chapterId===chapter);
 return kind==="A"?ab?.textA.title:kind==="B"?ab?.textB.title:c?.title;
}
function readQuestion(chapter:string,kind:LosReadingText,ordinal:number):TeacherQuestion {
 const questions=losReadingQuestions(chapter,kind).filter(q=>q.kind==="choice");
 const question=questions[ordinal%questions.length];
 if(!question||question.kind!=="choice")
   throw new Error("C"+chapter+" Text "+kind+" is missing its current-book question");
 const options=question.options.map((label,i)=>({
   id:String.fromCharCode(97+i),label,lang:"fi" as const,
   ...(i!==question.answerIndex?{wrongFeedback:"Etsi kyseinen tieto uudelleen uudesta Text "+kind+" -tekstistä."}:{})
 }));
 return {type:"choice",skillId:"L1-READ-01",evidenceRole:"practice",
   prompt:question.prompt,options,correctOption:options[question.answerIndex]?.id,
   success:"Oikein. "+question.explanation,
   hint:"Katso nykyisestä Text "+kind+" -tekstistä kohta, jossa asia kerrotaan.",
   reteach:question.explanation+" Lähdetekstin yksityiskohta: "+question.evidence,
   genericWrong:"Tämän tiedon saat nykyisestä oppikirjasta, et aiemmasta keskusteluversiosta."};
}
function reviewBook(sceneId:string,title:string,chapters:readonly string[]):TeacherScene{
 const relevant=chapters.flatMap(ch=>["A","B","C"].map(k=>link(ch,k as LosReadingText)));
 return {id:sceneId,kind:"book",phase:"Oppikirjasta kertaaminen",title,
   paragraphs:[
     "Kertaa tämänhetkisen LOS! 1:n päätekstit ja tukitekstit. Vanhojen painosten dialogit eivät kuulu tämän kertauksen suoritukseen.",
     "Text A ja Text B muodostavat kappaleen keskustelun; uusi Text C tukee niiden ymmärtämistä. Avaa tekstit oikeasta kirjasta ja tarkista nykyiset ymmärtämistehtävät.",
     "Kirjan avaaminen ei merkitse ymmärtämistehtäviä automaattisesti tehdyiksi. Oppikirjassa tehtyjä vastauksia ei kopioida tähän kertausarviointiin."
   ],bookLinks:relevant,
   help:[{title:"En ymmärrä",body:"Aloita Text A:n henkilöistä ja tilanteesta. Siirry Text B:hen ja käytä Text C:n selityksiä apuna. Voit tarkistaa sanaston ennen uutta yritystä."}]};
}
function adaptL027(original:TeacherLesson):TeacherLesson{
 const scenes=original.scenes.map(scene=>{
   if(scene.id==="source")return reviewBook("source","Kertaa C01–C03:n nykyiset A-, B- ja C-tekstit",["01","02","03"]);
   if(scene.id==="model")return {
     id:"model",kind:"board" as const,phase:"Opetettu malliratkaisu",
     title:"Kokoa tervehdys ja esittäytyminen",
     paragraphs:[
       "Valitse ensin tervehdys, sitten kysymys ja lopuksi oma vastaus. Käytä nykyisen oppikirjan C01–C03-tekstien lauserakenteita."
     ],
     board:[
       {label:"1. Tervehdi",german:"Guten Morgen!",meaning:"Hyvää huomenta."},
       {label:"2. Kysy nimi",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on?"},
       {label:"3. Kerro nimi",german:"Ich heiße Aino.",meaning:"Minun nimeni on Aino."},
       {label:"4. Kerro alkuperä",german:"Ich komme aus Finnland.",meaning:"Olen kotoisin Suomesta."},
     ]
   };
   return scene;
 });
 return {...original,version:LOS1_TEACHER_CANONICAL_VERSION,scenes};
}
function adaptL028(original:TeacherLesson):TeacherLesson{
 const scenes=original.scenes.map(scene=>
   scene.id==="book"?reviewBook("book","Vertaa uusien C04–C05-tekstien du- ja Sie-muotoja",["04","05"]):scene);
 return {...original,version:LOS1_TEACHER_CANONICAL_VERSION,scenes};
}
function adaptL029(original:TeacherLesson):TeacherLesson{
 // The old task asked students to identify Franz and Jörg in an obsolete
 // authentic recording. The new textbook has different conversations; reading
 // its text is NOT evidence of having heard that original recording.
 const mapping=[
   {id:"speakers",chapter:"01",kind:"A" as const,index:0},
   {id:"first",chapter:"01",kind:"B" as const,index:0},
   {id:"question",chapter:"01",kind:"C" as const,index:0},
   {id:"answer",chapter:"02",kind:"A" as const,index:0},
   {id:"ending",chapter:"03",kind:"C" as const,index:0}
 ];
 const qs=new Map(mapping.map(x=>[x.id,x]));
 const summary:TeacherScene={id:"summary",kind:"summary",phase:"Yhteenveto",
   title:"Ymmärsin uusia dialogeja, en vanhaa äänitettä",
   paragraphs:[
     "Kertasit C01–C03:n nykyisiä Text A-, Text B- ja Text C -tekstejä. Muistat paremmin tervehdyksiä, esittäytymistä ja alkuperän kysymistä.",
     "Oikeat vastaukset kirjautuvat tämän kertauksen harjoitteluksi. Ne eivät ole todistettua kuullunymmärtämistä, sillä tekstin lukemista ei lasketa kuuntelemiseksi.",
     "Jos tarvitset lisää harjoitusta, palaa C01–C03:n sanastoihin ja nykyisiin tekstitehtäviin."
   ]};
 const intro:TeacherScene={id:"welcome",kind:"introduction",phase:"Kertaus",
   title:"Tunnista uusien keskustelujen tärkeimmät tiedot",
   paragraphs:[
     "Tämä kertaus on sovitettu uuteen LOS! 1 -oppikirjaan. Aiemmin käytetty Franzin ja Jörgin äänite ei ole enää oppitunnin pääteksti.",
     "Lue C01–C03:n Text A ja Text B sekä uudet Text C -tukitekstit. Vastaa viiteen nykyisen oppikirjan teksteihin perustuvaan kysymykseen.",
     "Tekstin lukeminen ja valintakysymyksiin vastaaminen harjoittavat luetunymmärtämistä, eivät varmennettua kuullunymmärtämistä."
   ]};
 const strategy:TeacherScene={id:"before",kind:"explanation",phase:"Lukustrategia",
   title:"Etsi puhujat, tapahtuma ja ilmaukset",
   paragraphs:[
     "Lue ensin keskustelu loppuun. Tarkista sitten, ketkä puhuvat, missä tilanteessa ollaan ja mitä ilmauksia he käyttävät.",
     "Text C:n tukiteksti auttaa ymmärtämään kieliopin tai sanaston vaikeampia kohtia. Vastaamisen aikana saat palata tekstiin."
   ]};
 const board:TeacherScene={id:"model",kind:"board",phase:"Opetustaulu",
   title:"Vertaa nykyisen kirjan kolmea tekstityyppiä",
   paragraphs:["Eri teksteillä on eri tehtävä. Opettele käyttämään niitä yhdessä."],
   board:[
     {label:"Text A · C01",german:article("01","A")??"Text A",meaning:"Lue pääkeskustelu ja tunnista puhujat."},
     {label:"Text B · C01",german:article("01","B")??"Text B",meaning:"Vertaile harjoitustilannetta päätekstiin."},
     {label:"Text C · C01",german:article("01","C")??"Text C",meaning:"Kertaa tukitekstistä hankalat ilmaukset."}
   ]};
 const scenes:TeacherScene[]=[intro,strategy,
   reviewBook("source","Avaa nykyisen oppikirjan C01–C03-tekstit",["01","02","03"])];
 for(let i=0;i<mapping.length;i++){
   const m=mapping[i]!;
   if(i===2)scenes.push(board);
   scenes.push({id:m.id,kind:"question",phase:"Tekstin ymmärtäminen",
     title:"C"+m.chapter+" · Text "+m.kind+" · tarkista oma ymmärrys",
     paragraphs:["Perusta vastauksesi nykyisen C"+m.chapter+":n Text "+m.kind+" -tekstin sisältöön.",
       "Tarvittaessa voit avata tekstin ennen vastaamista. Oikea vastaus on johdettu nykyisen oppikirjan tehtäväpankista."],
     question:readQuestion(m.chapter,m.kind,m.index),
     bookLinks:[link(m.chapter,m.kind)]});
 }
 scenes.push({id:"reflect",kind:"reflection",phase:"Oma arvio",title:"Mikä tekstissä oli hankalinta?",
   paragraphs:["Pohdi, mikä oli vaikeaa ja mitä tekstiä aiot kerrata seuraavaksi."],
   reflection:{prompt:"Mikä uusi ilmaus jäi mieleesi ja miten opit sen?",placeholder:"Kirjoita omasta opiskelustasi...",minLength:15}});
 scenes.push(summary);
 const {mediaGate:_oldMediaGate,...withoutOldMedia}=original;
 void _oldMediaGate;
 return {...withoutOldMedia,version:LOS1_TEACHER_CANONICAL_VERSION,
   title:"Nykyisten keskustelujen kertaus",
   objective:"Ymmärrän C01–C03:n nykyisten Text A-, B- ja C -tekstien keskeisiä tietoja.",
   estimatedMinutes:35,scenes,
   requiredQuestionIds:mapping.map(x=>x.id),requiredActivityIds:[],requiredPracticeIds:[]};
}
/** Only the three review scripts whose references changed. EX-MID stays
 * bound to its separate real exam; its current submission gates are not faked.
 */
export function canonicalizeReviewI(original:TeacherLesson):TeacherLesson{
 switch(original.id){
   case "L027":return adaptL027(original);
   case "L028":return adaptL028(original);
   case "L029":return adaptL029(original);
   default:return original;
 }
}
