# LOS Teacher Experience 2.0 · L004-mallitunti

Tämä on **tekninen ja opetuksellinen pilotti**, ei kaikkien 60 tunnin
uudelleentoteutuksen eikä kielisisällön julkaisuvalmiuden väite.

Pohjana: LOS TEACHER EXPERIENCE 2.0, versio 1.0 (12.11.2026).

## Nykyinen toteutus

- Oppitunnin näkymä: `/los#/1/teacher` (L004-pilotti).
- Käynnistyy Opetuspolun L004-kortista ja vanhan oppituntilistan
  L004-valinnasta. Muut 59 oppituntia jatkavat vanhassa opetuksessa.
- Kymmenen rakenteista opetustilannetta saman opetustilan sisällä.
- Opettajan perusteellinen selitys, malliesimerkki ja vaiheittain
  rakennettava opetustaulu.
- Muistelu-, ohjattu-, itsenäinen- ja uuteen tilanteeseen soveltava
  monivalinta. Ensimmäinen virhe antaa kohdennetun vihjeen. Toinen antaa
  uuden selityksen. Kolmas näyttää malliratkaisun.
- `En ymmärrä`: yksinkertaisempi selitys, toinen esimerkki ja perustelu.
  Apua pyydettyään oppilas voi jatkaa, mutta oikea ensimmäinen yritys
  ei enää täytä *ilman apua* -näytön kriteeriä.
- Vapaasti valittava opetustilanne ei itsessään ole suorituksen tai
  osaamisen näyttö.
- Oppikirja avautuu suoraan oikeaan kappaleeseen ja osioon omaan
  välilehteen, ja opetus pysyy aktiivisena.
- Edistyminen tallennetaan versionoidulla, laiteomistajan tunnisteeseen
  sidotulla avaimella: `los.teacher.v2.<ownerId>.1.L004`.
- Alkuperäinen `los.local.v1.<ownerId>.1.01` ja kaikki aiemmat
  `lessonProgress`-tiedot säilyvät muuttumattomina.
- `Opetussisältö käsitelty` merkitään vain, kun kaikki opetustilanteet
  on käyty ja kaikki harjoitukset käsitelty. Se ei ole sama asia kuin
  `Osaaminen osoitettu` tai CEFR-todistus.

## Kriittiset rajaukset

1. **Ei tekoälyä LOSin opetuksen ajonaikaisessa toiminnassa.**
   Ei kielimallia, tekoälyääntä, tekoälypuheentunnistusta,
   tekoälyarviointia eikä näennäistä vapaamuotoista AI-keskustelua.
2. Opetuskäsikirjoitus on **vielä pedagogisesti ja saksan kielen osalta
   tarkistamaton luonnos**, vaikka ohjelmistotestit läpäistäisiin.
   Opettajan tarkistus vaaditaan ennen julkaisuvalmiuden väitettä.
3. Ei automaattista osaamisen tai CEFR-tason myöntämistä.
   Oikeat monivalinnat kerätään rajattuina harjoitushavaintoina.
   Itsenäinen tuottaminen ja myöhempi kertaaminen puuttuvat vielä.
4. Ääni ei ole käytössä: oppitunti toimii alusta loppuun tekstin avulla.
   Integroitavia ääniä ei ole esitetty tarkistettuina.
5. Uusi tila tallentuu tällä erää paikallisesti. Se ei ole vielä
   integroitu nykyiseen JSON-varmuuskopio-/pilvisynkronointiin.
   Tätä rajaa **ei saa piilottaa** käyttäjältä eikä tilaa
   saa väittää pilvisynkronoiduksi.
6. Sisältöversion muuttuminen estää vanhan keskeneräisen version
   virheellisen tulkitsemisen uuden opetuksen suoritukseksi.
7. Vanhaa L004-merkintää ei muuteta automaattisesti uuden
   opetuskäsikirjoituksen osaamisnäytöksi.

## Seuraavat hyväksymisportit

- Uuden opetusmoottorin tallennuksen varmuuskopiointi ja turvallinen palautus.
- Varsinaisen monipuolisen osaamisnäytön ja myöhemmän kertauksen
  erilliset säännöt ja näyttötilat.
- Opetussisällön tarkistus saksaa osaavalla kielen- ja pedagogiikan
  tarkistajalla, erityisesti A1.1-opetuksen oikea tasotus.
- L004:n käytettävyys luonnollisessa opiskelussa, iPhone ja PC.
- Sama `TeacherLesson`-rakenne muille oppitunneille vasta
  edellä olevien porttien tarkistuksen jälkeen.

Toteutuksen tavoitteena on korvata *kuittaa tehty* -pohjainen malli
opettajajohtoisella oppimiskokemuksella vähitellen. Näköiskirjaa ei rakenneta.
