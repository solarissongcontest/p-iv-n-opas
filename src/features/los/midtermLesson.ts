import type {FirstLesson} from './firstLessons';

/** Provisional midterm: the whole 25-item EX-MID bank was written separately
 * from practice questions and does not certify official learning outcomes.
 * Complete a written self-assessed task before the lesson can be finished.
 */
export const midtermLesson:readonly FirstLesson[]=[
 {id:'L030',title:'Välikoe: kappaleet 1–5',requiredIds:['EX-MID'],steps:[
  {id:'L030-S1',kind:'recall',title:'Aloita ilman mallia',minutes:3,instructionFi:'Palauta mieleen viisi aiemmin opetettua aihetta: tervehdykset, nimen kysyminen, kotimaa, kohtelias puhuttelu ja voinnin kysyminen. Kokeile mielessäsi yksi fraasi kutakin aihetta kohti ilman sanastoa.'},
  {id:'L030-S2',kind:'vocabulary',title:'Viimeinen oma kertaus',minutes:5,instructionFi:'Kertaa C01:n sanaston ydintervehdykset. Palauta sen jälkeen muistista jo opitut C02–C05:n tärkeimmät fraasit: Ich heiße, Woher kommst du?, Wie heißen Sie? ja Wie geht es dir?. Tämä kertaus tehdään ennen kokeen avaamista.',chapterId:'C01'},
  {id:'L030-S3',kind:'practice',title:'Palauta koko 25 kysymyksen välikoe',minutes:16,instructionFi:'Tee 25 erillistä pisteytettävää koetehtävää yhdellä palautuksella. Oikeat vastaukset näkyvät vasta, kun koko paperi on palautettu. Kirjoita lisäksi kokeen omassa itsearviointikentässä vähintään kolme lyhyttä virkettä kuvitteellisen henkilön esittelystä. Automaattipisteet eivät sisällä itsearvioitavaa tuotosta.',chapterId:'C05',exerciseIds:['EX-MID']},
  {id:'L030-S4',kind:'reflection',title:'Kirjaa vahvuudet ja kertaustarpeet',minutes:4,instructionFi:'Kirjoita suomeksi vähintään yksi osaamisalue, jossa onnistuit, ja yksi alue, johon palaat. Sinun ei tarvitse saada kaikkia koepisteitä, eikä tulosta saa sekoittaa viralliseen lukion arvosanaan.'},
  {id:'L030-S5',kind:'check',title:'Välikokeen oma yhteenveto',minutes:2,instructionFi:'Välikoe ja lyhyt itsearvioitu kirjoitusnäyte on palautettu. Voit avata uutta materiaalia ja jatkaa omaan tahtiisi, vaikka C06:n päätekstin julkaisuportti on vielä kesken. Tämä on harjoituskoe, ei virallinen todistus.'}
 ]}
];
