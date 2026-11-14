import type { TeacherLesson, TeacherScene } from "./engine.ts";
import { LOS_BOOKS } from "../catalog.ts";
import { LOS_FUTURE_MANUSCRIPTS } from "../content/losFutureManuscripts.ts";
import { getLosFutureLesson } from "../content/losFutureLessons.ts";
import { losFutureLessonOutline } from "../losFutureLessonOutline.ts";

/** Reuse the exact Teacher 2.0 player and its owner/book/chapter session store.
 * The 350 sourced chapter scripts are *unapproved previews*, never scores.
 * Review/exam briefs remain non-executable in the book-level opetuspolku.
 */
const cached = new Map<string, TeacherLesson>();
export function getLosFutureTeacherLesson(id: string): TeacherLesson | undefined {
  const match = /^LOS([2-8])-L(\d{3})$/.exec(id);
  if (!match) return undefined;
  const bookId = Number(match[1]);
  const number = Number(match[2]);
  if (number < 1 || number > 60) return undefined;
  const existing = cached.get(id);
  if (existing) return existing;
  const book = LOS_BOOKS.find(item => item.id === bookId);
  const script = getLosFutureLesson(bookId,number);
  if (!book || !script || script.id !== id || script.kind !== "chapter") return undefined;
  const outline = losFutureLessonOutline(book).find(item => item.id === id);
  if (!outline || outline.phase !== "chapter" || !outline.chapterId) return undefined;
  const chapterId = outline.chapterId;
  const manuscript = LOS_FUTURE_MANUSCRIPTS[bookId]?.[chapterId];
  if (!manuscript || manuscript.vocabulary.length < 4) return undefined;
  const bookLinks = [
    {label:"Lue koko Text A",chapterId,section:"text",instruction:"Avaa oman kappaleen kokonainen harjoituslukuteksti."},
    {label:"Katso kieliopin opetus",chapterId,section:"grammar",instruction:"Vertaa käsikirjoituksen lausetta omaan malliin."},
    {label:"Harjoittele ja tarkista itse",chapterId,section:"practice",instruction:"Vastaus tallentuu samaan kappaleluonnokseen kuin oppitunnissa."},
  ];
  const help = [
    {title:"Näytä mallin rakenne",body:script.model},
    {title:"Opettajan uudelleenselitys",body:script.teacherTip},
  ];
  const scenes: TeacherScene[] = [
    {id:"welcome",phase:"Johdanto",kind:"introduction",title:"Tämän oppitunnin tavoite",
      paragraphs:[script.intro,"Tavoite: "+script.objective],help},
    {id:"recall",phase:"Aktivoi",kind:"reflection",title:"Palauta aikaisempi osaaminen",
      paragraphs:["Mieti, mitä ymmärsit edellisellä tunnilla tai aiemmissa kirjoissa. Tämä ei ole arviointi.",script.resource],
      reflection:{prompt:"Mitä muistat ennestään tästä aiheesta?",placeholder:"Kirjoita yksi muistamasi asia...",minLength:2},help},
    {id:"board",phase:"Havainnollista",kind:"board",title:"Opetustaulu: neljä kappaleen ilmaisua",
      paragraphs:["Tutustu kappaleen sanoihin. Avaa suomenkielinen merkitys vaiheittain. Sanasto odottaa toimituksellista tarkistusta."],
      board:manuscript.vocabulary.slice(0,4).map(entry=>({label:"Sana ja merkitys",german:entry.de,meaning:entry.fi})),help},
    {id:"model",phase:"Mallin purku",kind:"explanation",title:"Näin esimerkkivastaus rakentuu",
      paragraphs:[script.model],help},
    {id:"guide",phase:"Opeta",kind:"explanation",title:"Vaiheittainen opetus",
      paragraphs:[script.guidance],help},
    {id:"guided",phase:"Harjoittele ohjatusti",kind:"book",title:"Tämän tunnin omat tehtävät",
      paragraphs:[script.attempt,"Tee alla käsikirjoituksesta poimitut tehtävät. Vertaa vastaustasi itse. Tätä ei arvostella automaattisesti."],bookLinks,help},
    {id:"practice",phase:"Harjoittele itsenäisesti",kind:"book",title:"Itsenäinen soveltava harjoitus",
      paragraphs:[script.extra,"Palaa tarvittaessa kappaleen harjoitteluun. Vastaukset käyttävät samaa tallennusta."],bookLinks,help},
    {id:"application",phase:"Sovella",kind:"reflection",title:"Loppupohdinta ja oma korjausohje",
      paragraphs:[script.exitCheck],
      reflection:{prompt:"Mikä onnistui, ja mitä harjoittelet seuraavaksi?",placeholder:"Kirjoita oma korjausohje...",minLength:5},help},
    {id:"summary",phase:"Kertaa",kind:"summary",title:"Mitä osaat jo ja mitä vielä harjoittelet?",
      paragraphs:[script.objective,
        "Kertaa ilman mallia ja tarkista itse. Tämä on oppimisen harjoittelu, ei hyväksytty koetulos tai osoitettu osaaminen.",
        "Opetusmateriaalin, arvioinnin, kieliasun ja medioiden julkaisuportit ovat edelleen avoinna."],help},
  ];
  const lesson:TeacherLesson={
    id,bookId,chapterId,version:"2.0.0-draft.1",title:script.title,objective:script.objective,
    estimatedMinutes:outline.estimatedMinutes,publicationStatus:"editorial-draft",scenes,
    requiredQuestionIds:[],requiredActivityIds:[],requiredPracticeIds:[],
  };
  cached.set(id,lesson);
  return lesson;
}
