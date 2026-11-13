# LOS! 1: Teacher 2.0 -tuntien L031–L055 yhteistesti (C06–C10)

**Tila 13.11.2026:** erillinen Draft-testikokonaisuus. Päähaaraan ei ole yhdistetty mitään tässä dokumentissa kuvattua uutta.

Pohja on C07–C10:n Draft-PR #239. Lisätty C06:n viisi valmista käsikirjoitettua oppituntia L031–L035 (alkuperäinen Draft-PR #231), ilman että C07:n lomake, C08:n alkuperäistekstit, C09:n kalenteri tai C10:n suljettu Harald-mediaportti poistuu.

- C06:n numerolaskuri harjoittaa aidosti saksan *yksiköt + und + kymmenet* -rakennetta. Vaatimus on vähintään **neljä eri yhdistelmälukua** välillä 21–99. Tasakymmenet ja sata eivät kelpaa näytöksi.
- Saksankielisessä syötössä on erilliset näppäimet **ä, ö, ü ja ß**; ne lisäävät merkin kursorikohtaan eivätkä automaattisesti hyväksy virheellistä kirjoitusasua.
- Pelkkä numerotaulun avaus ei merkitse harjoitusta tehdyksi. Ehto tarkistetaan tallennetusta `teacherSessions`-historiasta ja vahvistuksista.
- M-ZPE-01:n neljä alkuperäistä ikädialogia sekä C06:n Text B liittyvät olemassa olevaan kirjaan. Äänen ja puheen oikeat laite- ja pedagogiset portit pysyvät avoimina.
- C06:n `lessonRegistry` delegoi muut opetusluvut vanhalle, jo yhdistetylle `lessonL004`-rekisterille, jotta C07–C10 eivät katoa.
- C01:n L005:ssä alkuperäisen tervetulotoivotusäänitteen koko tekstivastine pysyy LOS!:n sisällä; historialliset pilot-merkinnät säilyvät read-only-muodossa.

Julkaisua ei voi hyväksyä pelkkien CI-tulosten perusteella. Yhä vaaditaan asiantunteva saksan kielentarkistus, lähdeoikeuksien täysi auditointi, oikeat fyysiset iPhone/Linux-äänikokeet, saavutettavuus ja opiskelijalla mitattu toimivuus.
