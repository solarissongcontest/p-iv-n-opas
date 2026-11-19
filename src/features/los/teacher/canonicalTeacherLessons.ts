import {LOS1_REVISED_AB} from "../content/los1RevisedAB.ts";
import {LOS1_REVISED_C} from "../content/los1RevisedC.ts";
import {losReadingQuestions, type LosReadingChoice, type LosReadingText} from "../content/los1ReadingBank.ts";
import {losExercisesFor} from "../exerciseBank.ts";
import {losTeacherChapterTeaching} from "./chapterTeaching.ts";
import type {TeacherLesson,TeacherScene,TeacherQuestion,TeacherBookLink,TeacherBoardStep} from "./engine.ts";

/**
 * LOS! Teacher Experience 2.0 / canonical textbook binding.
 * Keep the original 60 hand-authored Teacher manuscripts and single engine.
 * For changed textbook content, replace obsolete source-dependent teaching
 * with actual Text A/B/C and version the lesson. Old sessions are archived
 * only after explicit student approval, never silently converted to evidence.
 */
export const LOS1_TEACHER_CANONICAL_VERSION="2.2.0-canonical-abc";
const readingLessons=new Set(["L003","L008","L013","L018","L023","L032","L037","L042","L047","L052"]);
const stale=/Franz|Jörg|Greta|Herr Weiß|Herr Schmidt|Herr Standish|Lisa Müller|Heinrich|Harald|Takashi|\bPeter\b|\bThomas\b|\bBerna\b|\bBernan\b|\bMia\b|Nicos Weg|Sport und Zeit|M-COM-0[1-9]|C\d{2}-(?:SOURCE|MCOM02)-Q\d{2}|Wikibooks|autenttis|alkuperäis|ihmisäänitte|ihmisen kirjoittam|kahdeksan repliik|kuuden repliik/i;
const sectionFor=(kind:LosReadingText):"text"|"text-b"|"text-c"=>
  kind==="A"?"text":kind==="B"?"text-b":"text-c";
const letters=["a","b","c","d","e","f","g","h"] as const;
const chip=(text:string)=>text.replace(/\*\*/g,"").replace(/\*/g,"").replace(/\s+/g," ").trim();
function material(chapterId:string){
  const ab=LOS1_REVISED_AB.chapters.find(c=>c.chapterId==="C"+chapterId);
  const c=LOS1_REVISED_C.chapters.find(c=>c.chapterId===chapterId);
  if(!ab||!c)return null;
  return {ab,c};
}
function firstSentence(text:{blocks:readonly {kind:string;text?:string}[]}):string {
  const entry=text.blocks.find(b=>b.kind==="prose"&&typeof b.text==="string");
  return chip(entry?.text??"");
}
function canonicalLinks(chapterId:string,kinds:readonly LosReadingText[]=["A","B","C"]):TeacherBookLink[] {
  return kinds.map(kind=>({
    label:"C"+chapterId+" · Text "+kind+(kind==="C"?" / Hilfstext":""),
    chapterId,section:sectionFor(kind),
    instruction:"Lue nykyisen oppikirjan Text "+kind+" kokonaan. Käytä sanaselityksiä ja tee tekstin omat ymmärtämistehtävät."
  }));
}
function choiceQuestion(chapterId:string,kind:LosReadingText,index=0):TeacherQuestion | undefined {
  const choices=losReadingQuestions(chapterId,kind).filter((q):q is typeof q & LosReadingChoice=>q.kind==="choice");
  const q=choices[index%choices.length];
  if(!q)return undefined;
  return {
    type:"choice",skillId:"L1-READ-01",evidenceRole:"practice",
    prompt:q.prompt,
    options:q.options.map((text,i)=>({
      id:letters[i]??String(i),label:text,
      ...(i===q.answerIndex?{}:{wrongFeedback:"Tarkista vastaus nykyisen Text "+kind+" -tekstin yksityiskohdista ja yritä uudelleen."})
    })),
    correctOption:letters[q.answerIndex]??String(q.answerIndex),
    success:"Oikein. "+q.explanation,
    hint:"Palaa Text "+kind+":hen ja etsi tekstikohta, johon kysymys perustuu.",
    reteach:"Tekstikohta: "+chip(q.evidence)+". "+q.explanation,
    genericWrong:"Katso Text "+kind+" uudelleen. Etsi täsmälleen kysytty tieto, älä valitse vain tutun näköistä sanaa."
  };
}
function supportExplanation(chapterId:string):string {
  const data=material(chapterId);if(!data)return "";
  const line=data.c.contentMarkdown.split("\n").map(line=>line.trim())
    .find(line=>line.length>55&&!line.startsWith("|")&&!line.startsWith("#")&&!line.startsWith("**")&&!line.startsWith("---"));
  return chip(line??data.c.purpose);
}
function actualTeachingExample(chapterId:string):string {
  const data=material(chapterId);if(!data)return "";
  const start=data.ab.textA.blocks.find(block=>block.kind==="stage");
  return "Teksti A:n tilanne: "+chip(start?.text??data.ab.textA.title)+
    " Ensimmäinen puheenvuoro on: "+firstSentence(data.ab.textA)+
    ". Mieti, mitkä sanat tunnistat jo tästä kokonaisesta lauseesta.";
}
function canonicalBoard(chapterId:string):TeacherBoardStep[] {
  const data=material(chapterId);if(!data)return [];
  const a=firstSentence(data.ab.textA);
  const b=firstSentence(data.ab.textB);
  const cMatch=data.c.contentMarkdown.match(/\*([^*\n]{4,90})\*/);
  const support=chip(cMatch?.[1]??data.c.title);
  return [
    {label:"Text A · "+data.ab.textA.title,german:a,meaning:"Poimi päätekstistä, ketkä puhuvat ja mitä tilanteessa tapahtuu."},
    {label:"Text B · "+data.ab.textB.title,german:b,meaning:"Vertaa toisen tekstin tietoja ja ilmauksia päätekstiin."},
    {label:"Text C · "+data.c.title,german:support,meaning:data.c.purpose}
  ].filter(item=>item.german.trim().length>0);
}
function canonicalScene(chapterId:string,kind:LosReadingText):TeacherScene[] {
  const data=material(chapterId);if(!data)return [];
  const title=kind==="C"?data.c.title:kind==="A"?data.ab.textA.title:data.ab.textB.title;
  const purpose=kind==="C"?data.c.purpose:"Tunnista tekstin henkilöt, tapahtumat ja keskeiset ilmaukset.";
  const section=sectionFor(kind);
  const question=choiceQuestion(chapterId,kind);
  const scenes:TeacherScene[]=[
    {
      id:"canonical-text-"+kind.toLowerCase(),kind:"book",phase:"Nykyinen oppikirja",
      title:"Text "+kind+": "+title,
      paragraphs:[
        losTeacherChapterTeaching(chapterId).goal,
        purpose,
        losTeacherChapterTeaching(chapterId).rule,
        "Lue kappaleen "+Number(chapterId)+" Text "+kind+" ja etsi opetettuun asiaan liittyvä saksankielinen ilmaus.",
        kind==="A"||kind==="B"? "Opettajan esimerkki: "+firstSentence(kind==="A"?data.ab.textA:data.ab.textB):
      "Text C:n opetus: "+supportExplanation(chapterId),
    "Avaa koko teksti kirjan sisällä. Voit hyödyntää saksankielistä laiteääntä, mutta lukeminen ei yksin todista kuuntelun toteutuneen.",
      ],
      bookLinks:[...canonicalLinks(chapterId,[kind]),
        {label:"Tee Text "+kind+":n nykyiset ymmärtämistehtävät",chapterId,section:"understand",
         instruction:"Etsi Text "+kind+":n tehtävät, vastaa itse ja tarkista vastaus."}],
      activityId:"canonical-read-"+kind.toLowerCase(),
      activityLabel:"Luin kappaleen "+Number(chapterId)+" uuden Text "+kind+" -tekstin kokonaan",
      help:[{title:"En ymmärrä tekstiä",body:"Etsi ensin puhujien nimet, paikat ja jo opitut ilmaukset. Avaa sanasto ja kokeile lukea uudelleen. Text C tukee Text A:n ja B:n ymmärtämistä."}],
    },
  ];
  if(question)scenes.push({
    id:"canonical-check-"+kind.toLowerCase(),kind:"question",phase:"Tekstin ymmärtäminen",
    title:"Tarkista Text "+kind+":n tärkeä tieto",
    paragraphs:["Vastaa uuden Text "+kind+":n perusteella. Tämä on opetustilan oma harjoittelukysymys. Kirjan erilliset tehtävät tulee tarkistaa myös oppikirjassa."],
    question,bookLinks:canonicalLinks(chapterId,[kind]),
  });
  return scenes;
}
function isObsolete(scene:TeacherScene):boolean {
  const prose=[scene.title,...scene.paragraphs,
    ...scene.board?.map(b=>b.german+" "+b.meaning)??[],
    ...scene.bookLinks?.map(b=>b.label+" "+b.instruction)??[],
    ...scene.help?.map(h=>h.title+" "+h.body)??[],
    // Current reading-bank question options are trusted current distractors, not retired manuscripts.
    ...(scene.question&&!scene.id.startsWith("canonical-")?[scene.question.prompt,scene.question.success,scene.question.hint,scene.question.reteach,scene.question.genericWrong,...scene.question.options?.map(o=>o.label+" "+(o.wrongFeedback??""))??[]]:[]),
  ].join(" ");
  return Boolean(scene.sourceChapterId || scene.textBChapterId || stale.test(prose));
}
function rewriteObsoleteScene(scene:TeacherScene,chapterId:string,sequence:number):TeacherScene {
  const current=material(chapterId);
  if(!current)return scene;
  // Strip obsolete source props and explanatory help rather than assigning
  // undefined to optional fields or leaving old transcripts visible.
  const base:TeacherScene={...scene};
  delete base.sourceChapterId;
  delete base.textBChapterId;
  delete base.question;
  delete base.board;
  delete base.calendar;
  delete base.help;
  delete base.form;
  const kind:LosReadingText=scene.textBChapterId?"B":
    /text c|hilfstext/i.test(scene.title)?"C":
    /text b/i.test(scene.title)?"B":"A";
  const label="Text "+kind;
  const teaching=losTeacherChapterTeaching(chapterId);
  const intro=[
    teaching.goal,
    teaching.rule,
    teaching.contrast,
    "Malliesimerkki: "+actualTeachingExample(chapterId),
    "Text C:n selitys: "+supportExplanation(chapterId),
    teaching.apply,
  ];
  if(scene.kind==="question"){
    const q=choiceQuestion(chapterId,kind,sequence)??choiceQuestion(chapterId,"A",0);
    if(!q)return {...base,paragraphs:intro};
    return {...base,kind:"question",title:"Ymmärrä nykyisen "+label+" -tekstin sisältö",
      paragraphs:intro,question:{...q,evidenceRole:scene.question?.evidenceRole??"practice"},
      bookLinks:canonicalLinks(chapterId,[kind])};
  }
  if(scene.kind==="board"){
    return {...base,title:"Näin luet nykyisiä Text A-, B- ja C -tekstejä",
      paragraphs:[teaching.goal,teaching.rule,teaching.contrast,
        "Seuraa Text A:n ja Text B:n ilmauksia ja käytä Text C:n tukitekstiä apuna."],
      board:canonicalBoard(chapterId)};
  }
  if(scene.kind==="reflection"){
    return {...base,kind:"reflection",title:"Mitä opit nykyisistä teksteistä?",
      paragraphs:["Pohdi omin sanoin, mikä kappaleen uusissa teksteissä oli tärkeintä. Text C auttaa kertaamaan vaikeat ilmaukset."],
      reflection:{prompt:"Mitä opit kappaleen uusista A-, B- ja C-teksteistä?",
        placeholder:"Kirjoita oma havaintosi. Mitkä sanat tai tilanteet jäivät mieleen?",
        minLength:scene.reflection?.minLength??20}};
  }
  if(scene.kind==="summary"){
    return {...base,kind:"summary",title:"Yhteenveto: kappaleen nykyiset tekstit",
      paragraphs:["Tarkistit kappaleen "+Number(chapterId)+" keskeisiä ilmauksia. Nyt Text A on "+current.ab.textA.title+
        ", Text B on "+current.ab.textB.title+" ja Text C on "+current.c.title+".",
        "Kertaa vaikeat ilmaukset uudesta Text C:stä ja tarkista omat vastauksesi oppikirjan tehtävissä."]};
  }
  if(scene.kind==="introduction"||scene.kind==="explanation"){
    return {...base,kind:scene.kind,title:scene.kind==="introduction"?"Aloitetaan nykyisen oppikirjan kanssa":"Näin luet nykyiset oppikirjatekstit",
      paragraphs:[...intro,"Text A: "+current.ab.textA.title+". Text B: "+current.ab.textB.title+
        ". Text C: "+current.c.title+"."]};
  }
  if(scene.kind==="calendar"){
    return {...base,kind:"calendar",title:"Sovi tapaamisaika nykyisen oppikirjan mukaan",
      paragraphs:["Harjoittele viikonpäivää ja tasatuntia omassa kalenterimerkinnässä.",
        "Tämä ei ole vanhan äänitteen kuuntelutehtävä. Tarkista ilmaus C09:n nykyisestä Text C:stä."],
      ...(scene.calendar?{calendar:{...scene.calendar,prompt:"Tallenna oikea viikonpäivä ja kellonaika.",
        sourceNote:"LOS! 1:n uusi kappale 9 / nykyinen Text C. Oma kirjoitusharjoitus, ei kuunteluarvio."}}:{}),
      bookLinks:canonicalLinks(chapterId,["C"])};
  }
  if(scene.kind==="form"){
    const sample=firstSentence(current.ab.textA);
    return {...base,kind:"form",title:"Kirjoita tietoja nykyisen tekstin tilanteeseen",
      paragraphs:intro,
      ...(scene.form?{form:scene.form.map((field,i)=>({
        ...field,
        label:stale.test(field.label)?"Oma lause "+(i+1):field.label,
        placeholder:stale.test(field.placeholder)?"Kirjoita omin sanoin saksaksi":field.placeholder,
        sampleAnswer:stale.test(field.sampleAnswer)?sample:field.sampleAnswer,
      }))}:{}),
      bookLinks:canonicalLinks(chapterId,["A"])};
  }
  if(scene.kind==="activity"){
    return {...base,kind:"activity",title:"Harjoittele nykyisen "+label+" -tekstin avulla",
      paragraphs:intro,bookLinks:canonicalLinks(chapterId,[kind]),
      ...(scene.activityId?{activityLabel:"Harjoittelin nykyisen "+label+" -tekstin avulla"}:{})};
  }
  // Preserve old activity IDs and the existing student's work, but change
  // inaccurate original-source claims to a book-linked current-text activity.
  return {...base,kind:"book",title:"Lue nykyisen oppikirjan "+label,
    phase:"Tekstin käsittely",paragraphs:intro,
    bookLinks:[...canonicalLinks(chapterId,[kind]),
      {label:"Ymmärrä · nykyiset Text A/B/C -tehtävät",chapterId,section:"understand",
       instruction:"Tarkista uudet oppikirjatekstien ymmärtämistehtävät."}],
    ...(scene.activityId?{activityLabel:"Harjoittelin uuden "+label+" -tekstin kanssa"}:{})
  };
}
export function canonicalizeLosTeacherLesson(original:TeacherLesson):TeacherLesson {
  if(original.bookId!==1||!/^0[1-9]$|^10$/.test(original.chapterId))return original;
  const chapterId=original.chapterId;
  const current=material(chapterId);
  if(!current)return original;
  let changedIndex=0;
  const scenes=original.scenes.map(scene=>{
    if(isObsolete(scene))return rewriteObsoleteScene(scene,chapterId,changedIndex++);
    return scene;
  });
  const reading=readingLessons.has(original.id);
  if(reading){
    const insertion:TeacherScene[]=[
      {id:"canonical-intro",kind:"explanation",phase:"Nykyiset oppikirjatekstit",
        title:"Tekstit A, B ja C kuuluvat yhteen",
        paragraphs:[
          losTeacherChapterTeaching(chapterId).goal,
          losTeacherChapterTeaching(chapterId).rule,
          losTeacherChapterTeaching(chapterId).contrast,
          "Tutki ensin Text A '"+current.ab.textA.title+"'. Vertaa sitä Text B:hen '"+current.ab.textB.title+
            "' ja tarkista Text C:n '"+current.c.title+"' avulla hankalat ilmaukset.",
          losTeacherChapterTeaching(chapterId).apply,
        ],board:canonicalBoard(chapterId)},
      ...(["A","B","C"] as const).flatMap(kind=>canonicalScene(chapterId,kind)),
    ];
    const at=scenes.findIndex(scene=>scene.kind==="summary");
    scenes.splice(at<0?scenes.length:at,0,...insertion);
  }
  const validPractice=new Set(losExercisesFor(chapterId).map(ex=>ex.id));
  const practice=original.requiredPracticeIds.filter(id=>validPractice.has(id));
  // Historic SOURCE-Q ids do not exist in the revised book and cannot be a gate.
  const actualReading=Object.values(["A","B","C"] as const).flatMap(kind=>losReadingQuestions(chapterId,kind).map(q=>q.id));
  const validChecked=new Set(actualReading);
  let checked=original.requiredCheckedIds?.filter(id=>validChecked.has(id))??[];
  if(reading)checked=(["A","B","C"] as const).map(kind=>
    losReadingQuestions(chapterId,kind).find(q=>q.kind==="choice")?.id).filter((id):id is string=>Boolean(id));
  else if((original.requiredCheckedIds?.length??0)>0&&!checked.length)
    checked=losReadingQuestions(chapterId,"A").filter(q=>q.kind==="choice").slice(0,2).map(q=>q.id);
  // Avoid forcing untouched grammar or pronunciation lessons to restart.
  // The shared engine compares content signatures as well as version labels.
  const touched=reading||changedIndex>0||practice.length!==original.requiredPracticeIds.length||
    checked.join("|")!==(original.requiredCheckedIds??[]).join("|");
  if(!touched)return original;
  const currentEdition={...original};
  // L052's unapproved Harald media belongs to the retired interview, not to
  // the new A/B/C reading task. Never claim it was heard or passed.
  if(reading)delete currentEdition.mediaGate;
  return {...currentEdition,
    version:LOS1_TEACHER_CANONICAL_VERSION,
    title:reading?"Lue ja ymmärrä: "+current.ab.chapterTitle:stale.test(original.title)?
      "Harjoittele kappaleen "+Number(chapterId)+" saksaa":original.title,
    objective:reading?"Ymmärrän nykyiset Text A:n ja B:n sekä osaan käyttää Text C:n tukitekstiä.":original.objective,
    estimatedMinutes:reading?45:original.estimatedMinutes,
    scenes,
    requiredPracticeIds:practice,
    requiredCheckedIds:checked,
    requiredQuestionIds:reading?[...original.requiredQuestionIds,...(["a","b","c"] as const).map(k=>"canonical-check-"+k)]:original.requiredQuestionIds,
    requiredActivityIds:reading?[...original.requiredActivityIds,...(["a","b","c"] as const).map(k=>"canonical-read-"+k)]:original.requiredActivityIds,
  };
}
/** The canonical links and completion gates are derived, never hard-coded legacy IDs. */
export function validateCanonicalTeacherLesson(lesson:TeacherLesson):string[]{
 const issues:string[]=[];
 const sceneIds=new Set(lesson.scenes.map(s=>s.id));
 if(sceneIds.size!==lesson.scenes.length)issues.push(lesson.id+" duplicate scenes");
 for(const id of lesson.requiredQuestionIds)
   if(!lesson.scenes.some(s=>s.id===id&&s.question))issues.push(lesson.id+" missing question "+id);
 for(const id of lesson.requiredActivityIds)
   if(!lesson.scenes.some(s=>s.activityId===id))issues.push(lesson.id+" missing activity "+id);
 const practice=new Set(losExercisesFor(lesson.chapterId).map(ex=>ex.id));
 for(const id of lesson.requiredPracticeIds)
   if(!practice.has(id))issues.push(lesson.id+" retired exercise "+id);
 const bank=new Set((["A","B","C"] as const).flatMap(k=>losReadingQuestions(lesson.chapterId,k).map(q=>q.id)));
 for(const id of lesson.requiredCheckedIds??[])
   if(!bank.has(id))issues.push(lesson.id+" retired checked task "+id);
 const currentPrompts=new Set((["A","B","C"] as const).flatMap(kind=>
    losReadingQuestions(lesson.chapterId,kind).filter(q=>q.kind==="choice").map(q=>q.prompt)));
 for(const scene of lesson.scenes) {
   // The current book can legitimately use an old character name as a wrong
   // multiple-choice option. That is not an obsolete taught dialogue.
   const {question:_currentBankQuestion,...withoutQuestion}=scene;
   const sourceCheck=scene.question&&currentPrompts.has(scene.question.prompt)
     ? withoutQuestion : scene;
   if(isObsolete(sourceCheck))issues.push(lesson.id+" obsolete source in scene "+scene.id);
 }
 return issues;
}
