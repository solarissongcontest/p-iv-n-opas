/**
 * LOS! – sarjan kirjamainen sisältörunko.
 * Lähde: LOS! masterplan v1.1 ja LOS! 1 -kirjakohtainen masterplan.
 * Tämä on sisältöluettelo, EI ilmoitus siitä että tekstit, media tai kokeet
 * olisi julkaistu tai lisensoituna tuotu järjestelmään.
 */
export type LosChapter = {
  id: string;
  title: string;
  subtitle: string;
  objectives: string[];
  grammar: string;
  vocabulary: string[];
};
export type LosBookDefinition = {
  id: number;
  code: string;
  title: string;
  module: string;
  theme: string;
  summary: string;
  accent: string;
  tint: string;
  chapters: LosChapter[];
};
const introductoryChapters: LosChapter[] = [
  { id: "01", title: "Hallo!", subtitle: "Ensimmäiset tervehdykset", objectives: ["Tunnistat tavallisia tervehdyksiä ja hyvästelyjä.", "Osaat valita tilanteeseen sopivan tervehdyksen.", "Tutustut saksan ensimmäisiin äänteisiin."], grammar: "Tervehdykset ja saksan ääntämisen alkeet", vocabulary: ["Hallo! – Hei!", "Guten Morgen! – Hyvää huomenta!", "Guten Tag! – Hyvää päivää!", "Guten Abend! – Hyvää iltaa!", "Tschüss! – Moikka!", "Auf Wiedersehen! – Näkemiin!", "Danke! – Kiitos!", "Bitte! – Ole hyvä!"] },
  { id: "02", title: "Ich heiße …", subtitle: "Nimi ja esittäytyminen", objectives: ["Kysyt toisen nimeä.", "Kerrot oman nimesi.", "Tunnistat ich- ja du-persoonan."], grammar: "heißen ja sein: ich / du", vocabulary: ["ich heiße – nimeni on", "du heißt – sinun nimesi on", "Wie heißt du? – Mikä sinun nimesi on?", "ich bin – minä olen"] },
  { id: "03", title: "Woher kommst du?", subtitle: "Maat ja kotipaikat", objectives: ["Kysyt, mistä toinen on kotoisin.", "Kerrot kotimaasi.", "Tunnistat saksankielisiä maita ja alueita."], grammar: "kommen-verbi ja woher-kysymys", vocabulary: ["Woher? – Mistä?", "Ich komme aus Finnland. – Olen Suomesta.", "Deutschland – Saksa"] },
  { id: "04", title: "Du oder Sie?", subtitle: "Sinuttelu ja teitittely", objectives: ["Erotat du- ja Sie-puhuttelun.", "Esittäydyt kohteliaasti.", "Tunnistat puhuttelun kulttuurisia eroja."], grammar: "du / Sie ja verbin kohtelias muoto", vocabulary: ["Sie – te", "Wie heißen Sie? – Mikä Teidän nimenne on?", "Entschuldigung – Anteeksi"] },
  { id: "05", title: "Wie geht’s?", subtitle: "Mitä kuuluu?", objectives: ["Kysyt vointia.", "Vastaat arkisesti kuulumiskysymykseen.", "Tunnistat nicht-kieltosanan."], grammar: "vointifraasit ja nicht", vocabulary: ["Wie geht's? – Mitä kuuluu?", "Gut, danke. – Hyvää, kiitos.", "Nicht so gut. – Ei kovin hyvää."] },
  { id: "06", title: "Wie alt bist du?", subtitle: "Numerot ja ikä", objectives: ["Tunnet luvut 0–20.", "Tunnistat suurempien lukujen muodostumisen.", "Kysyt ja kerrot iän."], grammar: "sein iän kertomisessa; numeroiden muodostus", vocabulary: ["Wie alt bist du? – Kuinka vanha olet?", "Ich bin … Jahre alt. – Olen …-vuotias."] },
  { id: "07", title: "Wie schreibt man das?", subtitle: "Aakkoset ja tavaaminen", objectives: ["Osaat tavata yksinkertaisen nimen.", "Tunnistat saksan erikoismerkit.", "Pyydät toistamaan kuulemasi."], grammar: "aakkosten nimet ja tavaamisfraasit", vocabulary: ["Bitte buchstabieren Sie. – Tavatkaa, olkaa hyvä.", "Noch einmal, bitte. – Vielä kerran, kiitos."] },
  { id: "08", title: "Noch einmal, bitte!", subtitle: "Saksaa oppimistilanteessa", objectives: ["Pyydät hidastamaan tai toistamaan.", "Kerrott, ettet ymmärrä.", "Tunnistat tavalliset luokkailmaukset."], grammar: "oppimistilanteen kiinteät käyttöfraasit", vocabulary: ["Ich verstehe nicht. – En ymmärrä.", "Bitte langsamer. – Hitaammin, kiitos."] },
  { id: "09", title: "Am Montag um drei.", subtitle: "Viikonpäivät ja tapaamiset", objectives: ["Tunnistat viikonpäivät.", "Ymmärrät yksinkertaisen tapaamisajan.", "Sovit alustavasti tapaamisesta."], grammar: "am ja um ajanilmauksissa", vocabulary: ["Montag – maanantai", "am Montag – maanantaina", "um drei Uhr – kello kolme"] },
  { id: "10", title: "Schön, dich kennenzulernen!", subtitle: "Tavataan uudelleen", objectives: ["Yhdistät kirjassa opitut esittäytymisfraasit.", "Esittelet itsesi ja toisen henkilön.", "Käyt keskustelun itsenäisesti."], grammar: "opittujen perusrakenteiden kertaus", vocabulary: ["Schön, dich kennenzulernen! – Hauska tutustua!"] },
];
export const LOS_BOOKS: LosBookDefinition[] = [
  {id:1, code:"SAB31", title:"Tutustu ja ihastu saksan kieleen", module:"Perustason alkeet 1", theme:"Ensimmäiset kohtaamiset", summary:"Saksan alkeet täysin nollasta: tervehdykset, esittäytyminen, ääntäminen ja ensimmäiset keskustelut.",accent:"#B43D33",tint:"#FCE8E5",chapters:introductoryChapters},
  {id:2, code:"SAB32", title:"Saksaa arjessa",module:"Perustason alkeet 2",theme:"Arki ja kohtaamiset",summary:"Lähipiiri, arki, kohtaamiset ja asiointi.",accent:"#2D766F",tint:"#E2F3EE",chapters:[]},
  {id:3, code:"SAB33", title:"Saksaa vapaa-aikana ja lomalla",module:"Perustason alkeet 3",theme:"Vapaa-aika ja matkat",summary:"Harrastukset, koulu, matkailu ja vapaa-aika.",accent:"#2A609D",tint:"#E7F2FC",chapters:[]},
  {id:4, code:"SAB34", title:"Elämää Saksassa ja Suomessa",module:"Perustaso 1",theme:"Kulttuuri ja kielet",summary:"Saksankielinen maailma, tavat ja kulttuurivertailu.",accent:"#765291",tint:"#F2EAF9",chapters:[]},
  {id:5, code:"SAB35", title:"Hyvinvointia ja elämää nyt ja tulevaisuudessa",module:"Perustaso 2",theme:"Hyvinvointi",summary:"Terveys, hyvinvointi ja elämänvaiheet.",accent:"#876010",tint:"#FFF2D3",chapters:[]},
  {id:6, code:"SAB36", title:"Kulttuuria saksaksi",module:"Perustaso 3",theme:"Taide ja media",summary:"Taide, media, kulttuuri ja erilaiset tekstit.",accent:"#367149",tint:"#E7F3E9",chapters:[]},
  {id:7, code:"SAB37", title:"Opiskelua ja työelämää saksaksi",module:"Perustaso 4",theme:"Tulevaisuus",summary:"Opiskelu, työelämä ja tulevaisuuden suunnitelmat.",accent:"#A33B65",tint:"#FBE9F0",chapters:[]},
  {id:8, code:"SAB38", title:"Muuttuva maailma saksaksi",module:"Perustaso 5",theme:"Yhteiskunta ja maailma",summary:"Ajankohtaiset aiheet, yhteiskunta ja muuttuva maailma.",accent:"#28647E",tint:"#E3F2F8",chapters:[]},
];
