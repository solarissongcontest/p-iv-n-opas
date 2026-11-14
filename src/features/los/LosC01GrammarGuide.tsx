import { LosPronunciationButton } from "./LosPronunciationButton";
import "./los-u4-c01-grammar.css";

/**
 * C01 teaching pages: original editorial Finnish guidance, not an invented
 * historical source and not a second assessment engine. Source dialogues
 * stay in the existing authenticated reader with unchanged content IDs.
 */
const greetings = [
  {de:"Hallo!",fi:"Hei!",when:"Yleinen tervehdys tutulle tai rennossa tilanteessa."},
  {de:"Guten Morgen!",fi:"Hyvää huomenta!",when:"Tervehdit aamulla."},
  {de:"Guten Tag!",fi:"Hyvää päivää!",when:"Tervehdit päivällä, myös kohteliaassa tilanteessa."},
  {de:"Guten Abend!",fi:"Hyvää iltaa!",when:"Tervehdit illalla."},
  {de:"Gute Nacht!",fi:"Hyvää yötä!",when:"Hyvästelet illalla tai toivotat hyvää yötä nukkumaan mennessä; ei tavallinen saapumistervehdys."},
  {de:"Tschüss!",fi:"Moikka!",when:"Hyvästelet tuttavallisesti."},
  {de:"Auf Wiedersehen!",fi:"Näkemiin!",when:"Hyvästelet kohteliaasti."},
  {de:"Bis später!",fi:"Nähdään myöhemmin!",when:"Tiedät tai oletat tapaavasi myöhemmin."},
] as const;

const phonetics = [
  {grapheme:"w",word:"wie",ipa:"[viː]",explain:"Saksan w ääntyy tässä kuten suomen v. Sanassa wie myös ie on pitkä i-äänne."},
  {grapheme:"ie",word:"wie",ipa:"[viː]",explain:"ie ääntyy monissa sanoissa pitkänä i-äänteenä, ei kahtena erillisenä vokaalina."},
  {grapheme:"ch",word:"ich",ipa:"[ɪç]",explain:"Ich-sanan loppuäänne [ç] muodostuu lähellä kitalakea. Se ei ole suomen k eikä š."},
  {grapheme:"tsch",word:"Tschüss",ipa:"[t͡ʃʏs]",explain:"tš-tyyppinen affrikaatta: aloita t-äänteellä ja siirry nopeasti š-äänteeseen. Älä lue kaikkia neljää kirjainta erillisinä."},
] as const;

export function LosC01GrammarGuide() {
  return <div className="los-c01-grammar-guide">
    <section aria-labelledby="los-c01-from-zero">
      <h3 id="los-c01-from-zero">1. Aloitat aivan nollasta</h3>
      <p>Et tarvitse saksan aiempaa osaamista. C01:ssä tärkein tavoite on tunnistaa, milloin joku
        tervehtii tai hyvästelee, ja osata vastata sopivalla ilmauksella. Sinun ei vielä tarvitse
        taivuttaa verbejä tai selittää kaikkia alkuperäisen keskustelun sanoja.</p>
      <p>Kun näet saksankielisen lauseen, etsi ensin kolme asiaa: <strong>kuka puhuu</strong>,
        <strong> mikä on tilanne</strong> ja <strong>mikä ilmaus toistuu</strong>. Lue vasta sitten
        yksittäiset sanat ja niiden suomenkieliset selitykset.</p>
    </section>
    <section aria-labelledby="los-c01-greetings">
      <h3 id="los-c01-greetings">2. Tervehdykset ja hyvästelyt</h3>
      <p>Nämä ovat kiinteitä ilmauksia. Opettele ne tässä vaiheessa kokonaisina.
        Ero <em>Guten Abend!</em> ja <em>Gute Nacht!</em> välillä on tärkeä:
        illalla tervehditään, mutta nukkumaan mennessä toivotetaan hyvää yötä.</p>
      <div className="los-c01-greetings-table">
        <table className="los-grammar-table">
          <thead><tr><th scope="col">Saksaksi</th><th scope="col">Suomeksi</th><th scope="col">Milloin?</th></tr></thead>
          <tbody>{greetings.map(g=><tr key={g.de}>
            <td lang="de"><strong>{g.de}</strong></td><td>{g.fi}</td><td>{g.when}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p><strong>Bitte eri tilanteissa:</strong> <span lang="de">Danke! – Bitte!</span> = Kiitos! – Eipä kestä!
        Pyynnössä <span lang="de">bitte</span> voi vastata suomen sanaa <em>kiitos</em>:
        <span lang="de"> Ein Wasser, bitte.</span> = Vettä, kiitos.
        Tämä vesitilaus on LOS!:n oma opetusmalli, ei Franzin ja Jörgin alkuperäistekstin lainaus.</p>
      <p><strong>Huomaa:</strong> sanat <span lang="de">Guten</span> ja <span lang="de">Gute</span>
        eivät vielä vaadi sijamuotojen opettelua. Tässä niitä käytetään valmiiden
        tervehdysten osina.</p>
    </section>
    <section aria-labelledby="los-c01-original">
      <h3 id="los-c01-original">3. Näin luet Franzin ja Jörgin keskustelua</h3>
      <p>Keskustelun ensimmäinen repliikki on <strong lang="de">Hallo, wie heißt du?</strong>
        Se tarkoittaa <em>Hei, mikä sinun nimesi on?</em> Sana <strong lang="de">wie</strong>
        aloittaa kysymyksen, ja <strong lang="de">du</strong> tarkoittaa <em>sinä</em>.</p>
      <div className="los-example">
        <p lang="de">Hallo, wie heißt du?</p>
        <span>Hei, mikä sinun nimesi on?</span>
      </div>
      <div className="los-example">
        <p lang="de">Ich heiße Jörg.</p>
        <span>Nimeni on Jörg.</span>
      </div>
      <p><strong lang="de">ich</strong> tarkoittaa <em>minä</em>.
        <strong lang="de"> Ich heiße …</strong> on valmis tapa kertoa oma nimi.
        Verbin <em>heißen</em> taivutus opetetaan C02:ssa, joten tässä riittää,
        että tunnistat kysymyksen ja vastauksen.</p>
      <p>Tekstissä kysytään myös ikää: <span lang="de">Wie alt bist du?</span>.
        Sen merkitys on <em>Kuinka vanha olet?</em>. Numerot ja iän kertominen
        opetellaan myöhemmin C06:ssa. Niitä ei tarvitse nyt tuottaa muistista.</p>
      <p>Lopuksi puhutaan uudelleen näkemisestä: <strong lang="de">Bis später!</strong>
        tarkoittaa <em>Nähdään myöhemmin!</em>. Siihen voi vastata esimerkiksi
        <strong lang="de"> Tschüss!</strong></p>
    </section>
    <section aria-labelledby="los-c01-pronunciation">
      <h3 id="los-c01-pronunciation">4. Ääntäminen askel askeleelta</h3>
      <p>Saksaa ei aina lueta kuten suomea. Harjoittele ensin muutamaa jo tekstissä
        esiintyvää sanaa. Hakasulkeissa oleva IPA kuvaa äänteitä, ei kirjoitusasua.
        Alla olevat merkinnät on sidottu lähdetietoihin; koko kirjan kielentarkastus
        ja laitteen puheäänen laadullinen hyväksyntä ovat edelleen kesken.</p>
      <div className="los-c01-phonetics">
        {phonetics.map(item=><article key={item.grapheme}>
          <div className="los-c01-phonetics-head">
            <strong>{item.grapheme}</strong>
            <span lang="de">{item.word} {item.ipa}</span>
          </div>
          <p>{item.explain}</p>
          <LosPronunciationButton text={item.word}/>
        </article>)}
      </div>
      <p>Yksittäisten sanojen tarkistettuja ihmisäänitteitä ei ole vielä saatavilla:
        <strong> Malliääni puuttuu</strong>. Käytä kirjoitusasua ja lähdemerkitystä
        sekä harjoittele omaan tahtiisi. IPA ei yksin korvaa kuultua ääntämismallia.
        Ääntämistä tai mahdollista omaa äänitystä ei arvostella automaattisesti.</p>
      <p>Kirjan Text A -sivulla on erillinen alkuperäisen dialogin äänite,
        jonka saatavuus ja toisto on tarkistettava erikseen. Äänetön
        tekstiharjoittelu on aina mahdollinen.</p>
    </section>
    <section aria-labelledby="los-c01-remember">
      <h3 id="los-c01-remember">5. Tarkista ymmärsitkö ennen harjoituksia</h3>
      <p><strong>Harjoittele ensin itse:</strong> A) Saavut kello 20 kylään.
        B) Toivotat kello 23 hyvää yötä mennessäsi nukkumaan.
        C) Ystävä sanoo sinulle <span lang="de">Danke!</span>.
        Valitse jokaiselle tilanteelle saksankielinen ilmaus ennen vastausten avaamista.</p>
      <details className="los-c01-self-check">
        <summary>Näytä vastausesimerkit vasta oman yrityksen jälkeen</summary>
        <p>A) <span lang="de">Guten Abend!</span> B) <span lang="de">Gute Nacht!</span>
          C) <span lang="de">Bitte!</span> (= Eipä kestä!).
          Sama kohteliaisuusfraasi voi merkitä eri asioita tilanteen mukaan.
          Tämä on itsearvioitava opetusharjoitus, ei pisteytetty kappaletesti.</p>
      </details>
      <p>Osaat aloittaa harjoitukset, kun erotat seuraavat tilanteet ilman valmista suomennosta:
        aamulla tervehtiminen, illalla tervehtiminen, hyvän yön toivottaminen,
        ystävän hyvästely ja kohtelias hyvästely. Palaa tarvittaessa yllä olevaan taulukkoon.
        Varsinaiset pisteytettävät vastaukset tehdään vain kirjan
        <strong> Harjoittele</strong>- ja <strong>Kappaletesti</strong>-osioissa.</p>
    </section>
  </div>;
}
