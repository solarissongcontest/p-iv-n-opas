# LOS! 1 · C08, C09 ja C10 Teacher 2.0 -integrointi

**Rooli:** Draft-yhdistelmätesti. Ei muuta tuotannon päähaaraa eikä korvaa lähde-PR:iä #227, #226 ja #225.

## Yhdistetyt oppitunnit

- **C08 L041–L045:** koulusanasto, autenttiset Wikibooks/COERLL-tekstit; alkuperäiset tarkistetut `C08-SCHOOL-Qxx`-tunnisteet.
- **C09 L046–L050:** viikonpäivät, `am/um`, autenttinen Sport und Zeit ja Commonsin viikonpäivä-ääniluettelo. Kalenterin kellonajat on erotettu alkuperäislähteestä.
- **C10 L051–L055:** esittely, kolmas persoona, autenttinen Haraldin transkriptio, molemmat dialogit sekä oikea C10-kappaletesti. `M-DIB-02`-mediaa ei väitetä hyväksytyksi.

## Integraation turvallisuus

1. `getLosTeacherLesson` rekisteröi yhdessä kokonaisuudessa L001–L016 ja L041–L055; 60 oppitunnin virallinen runko säilyy.
2. Yhtenäinen validointi hyväksyy `SOURCE/TEXTB/MCOM02/SCHOOL/HARALD`-lähdetehtävät; se ei avaa mediaporttia automaattisesti.
3. `teacherCanFinish` estää keskeneräisen kuuntelutunnin L052:n suorituksen silloin, kun `mediaGate.approved` on `false`. Muut opetuspolun osaamisvaatimukset säilyvät.
4. L054:n vapaaehtoinen dialogisiirto ei ylikirjoita kirjassa olevaa soveltamistekstiä eikä saa pisteyttää vapaata saksankielistä kirjoitusta ilman arviointia.
5. Koko kirjan työpöytä- ja mobiili-WebKit-selaintestit tarkistavat, etteivät C08/C09/C10:n yhteiset komponentit riko opiskelijakohtaista tallennusta.

**Avoinna:** saksan kielen asiantuntijatarkastus, alkuperäismedian täydet oikeudet, oikeiden laitteiden media- ja käytettävyyskokeet sekä uusi regressio aina uusien upstream-haarojen yhdistämisen jälkeen.
