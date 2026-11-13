import type { LosChapter } from "../catalog";
import { LOS_FUTURE_FIRST_CHAPTERS } from "./losFutureC01Drafts";

/**
 * LOS! 2–8: kirjakohtaisten v1.0-käsikirjoitusten 70 kappaleen rakenne.
 * Lähteet: projektin Los2-5.txt ja Los6-8.txt (12.–13.11.2026).
 * Tämä on TOIMITUKSELLINEN SISÄLLYSLUETTELO, ei hyväksytty oppimateriaali.
 *
 * Varsinaiset Text A/B -aineistot, tehtäväpankit, äänitteet, arviointi ja
 * opetuspolut julkaistaan vasta oman QA:n jälkeen, kirjatunnuksin eroteltuina.
 */
const ROWS: Record<number, string> = {
  2: `
Meine kleine Welt|Kuvaa tuttuja ihmisiä ja kerro perustietoja.|wir/ihr/sie; verbin persoonapäätteiden laajennus
Meine Familie|Kerro perhesuhteista ja kysy toisen perheestä.|mein/dein; perusartikkelit nominatiivissa
Zu Hause|Kuvaa asuinpaikkaasi ja kotiasi.|sein/haben; es gibt + akkusatiivi kiinteänä rakenteena
Mein Zimmer|Kerro, mitä omistat tai tarvitset.|akkusatiivin ensiopetus; ein/einen/kein/keinen
Mein Tag|Kerro päiväjärjestyksestä.|preesens; verbin paikka; yleiset ajanilmaisut
Was isst du gern?|Kerro mieltymyksistä ja kysy ruoasta.|gern, lieber; essen/trinken preesensissä
Im Café|Tilaa ja vastaa tarjoilijalle.|möchte(n) ja bitte; kohteliaat kysymykset
Im Supermarkt|Osta tuotteita, kysy hintaa ja määrää.|akkusatiivi uudessa ympäristössä; lukusanat eurohinnoissa
In der Stadt|Tunnista palveluita ja pyydä perustietoa sijainnista.|wo/wohin alkeina; in/bei kiinteissä fraaseissa
So läuft mein Alltag|Yhdistä arjen keskustelu kokonaiseksi tilanteeksi.|preesens, artikkelit, akkusatiivi ja kohteliaisuus
`,
  3: `
Meine Freizeit|Kerro vapaa-ajan tekemisistä.|gern ja preesensin kertaus; tavalliset epäsäännölliset
Mein Hobby|Kerro, kuinka usein ja missä harrastat.|frekvenssiadverbit ja kysymyssanat
Sport macht Spaß|Kysy urheilusta ja kyvyistä.|können + infinitiivi; können/gern ero
Musik, Filme und Spiele|Kerro media- ja musiikkimieltymyksistä.|mögen, lieber; epäsäännöllisiä preesensmuotoja
In der Schule|Kerro koulusta ja luokkahuoneesta.|müssen, dürfen ja verbi-infinitiivi
Mein Stundenplan|Kysy aikatauluista ja ymmärrä lukujärjestys.|am/um, ajan määreet, lauseen järjestys
Nach dem Unterricht|Kerro, mitä teet koulun jälkeen.|erotettavat verbit, preesensin kokonaiskertaus
Wir treffen uns!|Kutsu, ehdota, hyväksy tai kieltäydy kohteliaasti.|wollen ja können suunnitelmissa
Am Wochenende unterwegs|Hanki tapahtuma- ja asiointitietoja.|mit/nach/zu fraaseissa; akkusatiivin kertaus
Ein gemeinsamer Ausflug|Suunnittele retki yhdessä toisen kanssa.|modaaliverbien soveltaminen, ajanmääreet
`,
  4: `
Wo spricht man Deutsch?|Tunnista saksankieliset alueet ja variantit.|maa- ja kieli-ilmaukset, kysymyssanat
Willkommen in Deutschland|Kuvaa Saksan alueita ilman stereotypioita.|paikanilmaukset in/im, pohjois-etelä
Grüße aus Österreich|Kerro Itävallasta ja kuuntele kielellisiä variantteja.|vertailevat adjektiivit
Die Schweiz|Tunnista Sveitsin kielet ja arjen piirteet.|mit/zu/nach ja yksinkertaiset paikanilmaukset
Finnland auf Deutsch|Kerro kotimaasta vierailijalle.|es gibt / man kann / wir haben
Wie lebt man hier?|Kuvaa arjen käytäntöjä Saksassa ja Suomessa.|yleistävä man; tavan ilmaisu
Zu Besuch|Osaa käyttäytyä vierailutilanteissa ja kertoa kokemuksesta.|Perfekt alkeena: haben/sein ja yleiset partisiipit
Feste und Traditionen|Kerro juhlista ja tavoista.|Perfektin kertaus, ajanmääreet
Was ist anders?|Vertaa kulttuuriin liittyviä havaintoja.|komparatiivi; weil perustelussa
Mein kleiner Reiseführer|Laadi saksankielinen pieni opas.|Perfekt, weil ja kirjan kertaus
`,
  5: `
Wie geht es dir wirklich?|Kerro tunteista ja kysy toisen voinnista.|sich fühlen, mir geht es; adjektiivit
Mein Körper|Nimeä kehonosia ja tuntemuksia.|tut mir weh / schmerzt fraaseina; artikkelit
Beim Arzt|Kerro yksinkertainen oire ja kysy apua.|kohteliaat pyynnöt; sollten/müssen
Gesund essen|Kerro ruokailutavoista ja valinnoista.|weil + yksinkertainen peruste
Schlaf und Erholung|Kerro levosta ja arjen rytmistä.|refleksiiviverbejä ja ajanmääreet
Bewegung und Alltag|Kerro liikkumisesta ja harrastusten merkityksestä.|komparatiivin kertaus, modaalisuus
Stress und Gefühle|Puhu stressistä yleisesti ja vastaa empaattisesti.|dass ja weil, keskustelun jatkamisfraasit
Als ich klein war|Kuvaa lapsuuden tavallisia asioita.|Perfekt; war/hatte yleisinä menneinä muotoina
Jung und alt|Vertaile elämänvaiheita kunnioittavasti.|aikailmaukset früher/heute/später
Gute Tipps|Ilmaise mielipide, kuuntele ja neuvo.|imperatiivi, sollten ja sivulausekertaus
`,
  6: `
Kultur überall|Kerro, mitä kulttuuri voi tarkoittaa.|mielipidefraasit; aiemmat rakenteet
Musik aus dem deutschsprachigen Raum|Kerro musiikkimieltymyksistä.|vertailevat ilmaukset ja Perfekt kokemuksista
Bücher und Geschichten|Kerro lyhyen tarinan ydintapahtumista.|aikajärjestyksen ilmaisut
Filme und Serien|Kerro suosikeista ja ymmärrä ohjelmakuvaus.|ich finde; weil; mielipideväitteet
Kunst und Museen|Kuvaile teosta tai näyttelyä.|adjektiivit ja kuvailuilmaukset
Geschichte erleben|Hahmota esimerkin kautta kulttuurihistoriaa.|Perfekt; preteritin tunnistus
Feste und Feiern|Kerro perinteestä ja sen nykyisistä muodoista.|sivulausekertaus ja vertailu
Stadt und Szene|Tutustu kaupunkikulttuuriin.|paikan, ajan ja kokemuksen ilmaisut
Kultur heute|Tarkastele nykypäivän kulttuuri-ilmiötä.|mielipide, lähdetieto ja perustelu
Mein Kulturprojekt|Suunnittele, toteuta ja esittele oma tuotos.|koko kirjan rakenteet; esittelykysymykset
`,
  7: `
Meine Stärken|Kerro kyvyistä ja mielenkiinnosta.|können, gut in; adjektiivit
Mein Schulalltag|Kuvaa koulua ja oppimistapoja.|preesens, ajanmääreet, weil
Prüfungen und Ziele|Kerro tavoitteista ja opinnoissa etenemisestä.|müssen/sollen; ajalliset rakenteet
Nach der Schule|Kerro jatko-opintovaihtoehdoista.|möchte/würde gern; tulevaisuuden ajanilmaisut
Berufe und Arbeit|Kuvaa ammatteja ja tehtäviä.|werden tulevaisuuden ilmauksissa; preesens
Eine Stellenanzeige|Tunnista työpaikkailmoituksen ydinkohdat.|können/müssen työilmoituksissa
Eine Bewerbung|Laadi lyhyt tiedustelu tai hakemus.|muodollinen puhuttelu, pyynnöt ja tekstin jäsennys
Im Gespräch|Vastaa haastattelun peruskysymyksiin.|Könnten Sie / Ich würde; vastaukset
Ein Tag im Praktikum|Kerro työharjoittelupäivästä.|Perfekt/preesens kertaus, ajan järjestys
Mein Zukunftsplan|Esittele realistinen tai kuvitteellinen tulevaisuussuunnitelma.|werden, möchte, würde, weil
`,
  8: `
Was ist heute los?|Lue helpon ajankohtaisen uutisen ydintiedot.|kuka, mitä, missä, milloin; sanajärjestyksen kertaus
Medien in meinem Alltag|Kerro, miten käytät mediaa.|frekvenssiadverbit, koska-perustelut
Überschrift oder Inhalt?|Tunnista otsikon ja jutun suhde.|otsikkokieli ja tavallinen sanajärjestys
Fakten oder Meinungen?|Erota väite ja mielipide.|ich denke / laut / vielleicht
Soziale Medien|Tulkitse someviestejä ja mainontaa.|imperatiivi, kohderyhmä, perustelut
Umwelt und Klima|Ymmärrä ympäristöaiheen perusteet.|weil, deshalb, vertailu
Technologie im Wandel|Kerro arjen teknologiasta.|siksi/ehkä/tulevaisuus; futuurin kertaus
Zusammenleben|Lue yhteiskuntaan liittyvä yksinkertainen teksti.|vertailu ja mielipideilmaisut
Zwei Perspektiven|Vertaile kahta tekstiä samasta aiheesta.|aber, einerseits/andererseits tunnistuksena
Mein Medienprojekt|Tuota oma helppo julkaisu saksaksi.|koko oppimäärän rakenteet, vastaanottaja
`,
};

export const LOS_FUTURE_CHAPTERS: Record<number, LosChapter[]> = Object.fromEntries(
  Object.entries(ROWS).map(([bookId, rows]) => [
    Number(bookId),
    rows.trim().split("\n").map((raw, i) => {
      const [title = "", objective = "", grammar = ""] = raw.split("|");
      return {
        id: String(i + 1).padStart(2, "0"),
        title,
        subtitle: objective.replace(/\.$/, ""),
        objectives: [objective],
        grammar,
        vocabulary: i === 0 ? LOS_FUTURE_FIRST_CHAPTERS[Number(bookId)]?.vocabulary.map(([de, fi]) => `${de} – ${fi}`) ?? [] : [],
      };
    }),
  ]),
);
