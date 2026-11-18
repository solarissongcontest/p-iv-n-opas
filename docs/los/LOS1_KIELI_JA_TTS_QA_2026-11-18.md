# LOS! 1 | Text A–C: toimituksellinen kieli- ja TTS-laadunvarmistus
Päiväys: 18.11.2026
Aineisto: SAB31 / 10 kappaletta / 20 A–B-tekstiä / 10 C-tukitekstiä / 150 tekstitehtävää.

## Mitä on todella tarkistettu
- Uudelleenkirjoitetut tekstien A ja B kaikki kymmenen kappaleparia sekä Text C:n kaikki kymmenen osaa on luettu saksan kielen, keskustelun luonnollisuuden, johdonmukaisuuden ja opetustason näkökulmasta.
- Kysymysten 150 tekstikohtaviitettä verrattiin muutettuihin sisältöihin. Jokainen löytyy oikeasta A-, B- tai C-tekstistä.
- Äänilukijan valmistelussa käytetään vain saksankielisiä puheääniä, ei englannin- tai suomenkielistä varapuheääntä.
- Saksankielisten äänien myöhempi latautuminen huomioidaan `voiceschanged`-tapahtumalla. Ääniroolit ja kirjainkirjaimelta tavaaminen perustuvat vakaisiin sääntöihin.
- Text C:n suomenkielisiä selityksiä EI lueta saksankielisellä TTS:llä. Kullekin tukitekstille on 7–13 erikseen toimitettua saksankielistä mallia.
- Koko tekstin TTS-käytön käynnistys-, pysäytys-, virhe- ja lopetustila on korjattu. C08:ssa opettajan puhe hidastuu hitaampaa puhetta koskevan pyynnön jälkeen.

## Kappalekohtainen tarkistus
| Kappale | Kieli ja sisältö | Äänen kriittinen kohta |
|---|---|---|
| C01 | Aamun ja illan tervehdysten sekoitus on tarkoituksellinen oppijan virhe | Morgen / Abend / Auf Wiedersehen |
| C02 | esittäytymis- ja henkilökysymykset | heißen, ß, nimeä A-I-N-O tavattaessa |
| C03 | aus + kotimaa ja aus der Schweiz, aus den USA | ulkomaisten nimien ja maiden painotus |
| C04 | kohtelias Sie/du; kirjoitettuun kohteliaaseen viestiin korjattu *Mit freundlichen Grüßen* | Sie/du-erottelu |
| C05 | luontevoitettu väsyneen Leonin ja opettajan loppukeskustelu | wie geht’s / müde / hoffentlich |
| C06 | 99-vuotias-vitsin aikuisen vastaus luontevoitettu, nauru näyttämöohjeena | sechzehn/siebzehn/neunundneunzig |
| C07 | Aino–Eino-sekaannus johdonmukainen; tavaaminen luetaan kirjain kerrallaan | A-I-N-O, L-A-I-N-E, ü, ß |
| C08 | hidas puhe esitetään tekstissä ja sen TTS-hidastus testataan | schnell / langsam |
| C09 | päivien ja tasatuntien ilmaisut pysyvät johdonmukaisina | Mittwoch, Donnerstag, um vier Uhr |
| C10 | kertausdialogi ja sähköposti vastaavat opittuja aiheita | nimien ja pidempien repliikkien rytmitys |

## Tarkasti rajatut keskeneräiset asiat
**Ei ole tehty riippumatonta äidinkielisen saksan tarkastusta.** Tämä kierros on AI:n tekemä toimituksellinen ja tekninen tarkistus. Oikea natiivipuhuja tai pätevä saksan kielen ammattilainen on edelleen pyydettävä hyväksymään dialogit ja puheäänten akustinen laatu. Tämä ei ole leima eikä muu todennettavissa oleva ulkoinen kielisertifikaatti.

**Ääniä ei ole kuunneltu oikealla iPhonella tai näytteen perusteella ihmisvoimin.** Selaimen TTS-äänen laatu vaihtelee laitteen ja puheäänivalikoiman mukaan. Tekninen selaintesti osoittaa käyttöliittymän toiminnan, EI sitä että äänne, painotus, ikä-/sukupuoliääni, prosodia tai puhenopeus olisi akustisesti hyväksytty. Alkuperäisiä, ennalta renderöityjä studioäänitteitä ei ole tuotettu.

Tarvittava loppuhyväksynnän manuaalinen protokolla:
1. Tarkastaja lukee jokaisen A/B/C-tekstin, tarkistaa luonnollisen idiomiikan sekä korjaa mahdolliset jäljellä olevat kielivirheet.
2. iPhonessa ja toisessa selaimessa soitetaan kaikki 20 pää-/lisätekstiä ja 10 C-tukitekstin mallikuuntelua.
3. Erityishuomio: ß, ä/ö/ü, pitkät ja lyhyet vokaalit, *ch*, vierasperäiset nimet, E-I-N-O vs A-I-N-O, C08:n hidastus, usean puhujan äänten erotettavuus.
4. Lopputuloksena kirjataan hyväksyntä ääni- ja selainversiokohtaisesti sekä tarvittavat korjaukset. Vasta sitten voidaan merkitä `reviewedByNativeGermanSpeaker=true` tai `audio.verified=true`.

## Toteutuksen julkaisukriteeri
Koneelliset testit + CI + selaintestit voivat hyväksyä teknisen toteutuksen julkaisuun; ne eivät yksin täytä riippumattoman kieli- tai äänenlaatutarkistuksen kriteeriä. Eri hyväksyntätilat on pidettävä erillään myös jatkossa.
