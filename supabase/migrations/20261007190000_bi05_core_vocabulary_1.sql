-- BI05 canonical vocabulary from the user-provided Iiris 5 concept list.
create table if not exists public.course_concepts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  canonical_name text not null,
  aliases text[] not null default '{}'::text[],
  english_name text,
  definition text not null,
  source text not null default 'course_material',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(course_id, canonical_name)
);
create index if not exists course_concepts_owner_course_idx on public.course_concepts(owner_id,course_id);
alter table public.course_concepts enable row level security;
drop policy if exists "personal course concepts" on public.course_concepts;
create policy "personal course concepts" on public.course_concepts for all to authenticated
using (owner_id=(select auth.uid()) and exists(select 1 from public.courses c where c.id=course_concepts.course_id and c.owner_id=(select auth.uid())))
with check (owner_id=(select auth.uid()) and exists(select 1 from public.courses c where c.id=course_concepts.course_id and c.owner_id=(select auth.uid())));
revoke all on table public.course_concepts from anon;
grant select,insert,update,delete on table public.course_concepts to authenticated;
grant all on table public.course_concepts to service_role;

create temporary table _bi05_core_concept_chunk(
  canonical_name text primary key, aliases text[] not null, english_name text, definition text not null
) on commit drop;
insert into _bi05_core_concept_chunk(canonical_name,aliases,english_name,definition) values
('kudos',ARRAY[]::text[],'tissue','Kokonaisuus, joka muodostuu eläimen samaan tehtävään erikoistuneista soluista.'),
('epiteelikudos',ARRAY['pintakudos']::text[],'epithelium','Eläinten ulkopintaa ja sisäisiä onteloita, tiehyitä ja suonia verhoava kudostyyppi. Yksi ihmisen peruskudostyypeistä.'),
('side- ja tukikudos',ARRAY[]::text[],'connective tissue','Eri elinten tukiranteita muodostava kudostyyppi. Yksi ihmisen peruskudostyypeistä. Side- ja tukikudos voidaan jakaa edelleen sidekudokseen, rasvakudokseen, rustokudokseen ja luukudokseen.'),
('elin',ARRAY[]::text[],'organ','Ruumiinosa, jolla on erilaistunut rakenne ja tehtävä. Elin muodostuu kudoksista, ja eri elimet muodostavat yhdessä elimistön.'),
('elimistö',ARRAY[]::text[],'organ system','Kokonaisuus, joka muodostuu samasta elintoiminnosta vastaavista elimistä.'),
('rauhanen',ARRAY[]::text[],'gland','Solu tai soluryhmä, joka erittää aineita elimistöön.'),
('kantasolu',ARRAY[]::text[],'stem cell','Monisoluisten eliöiden soluja, jotka kykenevät jakautumaan ilman, että ne erilaistuvat johonkin tiettyyn tehtävään.'),
('erilaistuminen',ARRAY[]::text[],'differentiation','Tapahtuma, jossa solut muuttuvat muodoltaan, toiminnaltaan ja aineenvaihdunnaltaan erilaisiksi kuin emosolu.'),
('pluripotentti',ARRAY[]::text[],'pluripotent','Erittäin monikykyinen. Solu, joka voi erilaistua kaikiksi muiksi paitsi sikiökalvojen tai istukan soluiksi.'),
('reseptori',ARRAY['vastaanottaja']::text[],'receptor','Vastaanottava kohta tai elin eliössä. Se voi esimerkiksi olla aistinreseptori, joka kykenee vastaanottamaan aistittavan ärsykkeen.'),
('vaste',ARRAY[]::text[],'response','Solun, solukon, kudoksen, elimen tai elimistön reaktio johonkin ärsykkeeseen.'),
('kudoshormoni',ARRAY[]::text[],'tissue hormone','Paikallinen, kudosnesteen mukana kulkeva hormoni.'),
('syöpä',ARRAY[]::text[],'cancer','Sairaus, jossa solut jakautuvat liiallisesti ja muodostavat kasvaimia, joista voi irrota soluja ja muodostua etäpesäkkeitä muualle elimistöön.'),
('kasvain',ARRAY['tuumori']::text[],'tumor','Solujen hallitsemattoman jakautumisen seurauksena kehittyvä muodostuma. Kasvain voi olla hyvän- tai pahanlaatuinen.'),
('karsinogeeni',ARRAY[]::text[],'carcinogen','Syöpää aiheuttava kemiallinen tai fysikaalinen tekijä.'),
('elimistön säätelyjärjestelmä',ARRAY[]::text[],'body regulatory system','Elinten ja kudosten toimintaa säätelevä kokonaisuus, joka koostuu hermostosta ja hormonaalisesta säätelystä.'),
('homeostasia',ARRAY[]::text[],'homeostasis','Eliön sisäinen tasapainotila, jota esimerkiksi hormonit ja hermosto ylläpitävät.'),
('hypotalamus',ARRAY[]::text[],'hypothalamus','Aivojen osa, joka säätelee saamansa tiedon perusteella elimistön toimintaa lähettämällä viestejä hermoston ja hormonien välityksellä.'),
('rasvaliukoinen hormoni',ARRAY[]::text[],'fat soluble hormone','Hormoni, joka liukenee rasvaan, mutta ei veteen. Esimerkiksi tyroksiini.'),
('vesiliukoinen hormoni',ARRAY[]::text[],'water soluble hormone','Hormoni, joka liukenee veteen. Pääosa hormoneista on vesiliukoisia.'),
('toisiolähetti',ARRAY[]::text[],'second messenger','Viestejä solun sisällä välittävä molekyyli. Toimii esimerkiksi silloin, kun jokin hormoni on kiinnittynyt solukalvolla olevaan reseptoriin.'),
('palautesäätely',ARRAY[]::text[],'feedback regulation','Säätely, jossa jonkin muualla elimistössä muodostuvan hormonin, kuten testosteronin, pitoisuus vaikuttaa hypotalamuksen ja aivolisäkkeen etulohkon hormonieritykseen.'),
('hormoni',ARRAY[]::text[],'hormone','Viestiaine, joka kulkee kohteeseensa veren välityksellä.'),
('aivolisäke',ARRAY[]::text[],'pituitary gland','Hormonitoimintaan liittyvä aivojen rakenne. Jakautuu hermokudoksesta muodostuvaan takalohkoon ja etulohkoon, joka on umpirauhanen.'),
('insuliini',ARRAY[]::text[],'insulin','Hormoni, joka muodostuu haimassa. Sen vaikutuksesta verensokeri laskee, koska insuliini voimistaa glukoosin siirtymistä lihas- ja rasvasoluihin sekä glykogeenin muodostumista lihasten ja maksan soluissa.'),
('glukagoni',ARRAY[]::text[],'glucagon','Hormoni, joka erittyy haimasta. Glukagoni nostaa verensokeria, kun glukagoni kiihdyttää glykogeenin hajoamista glukoosiksi maksan soluissa.'),
('melatoniini',ARRAY[]::text[],'melatonin','Hormoni, joka muodostuu käpyrauhasessa. Laskee vireystilaa.'),
('käpyrauhanen',ARRAY[]::text[],'pineal gland','Vireystilaa säätelevä aivojen osa, joka tuottaa hämärässä melatoniinihormonia. Melatoniini laskee vireystilaa.'),
('vireystila',ARRAY[]::text[],'alertness','Aivojen toimintaan liittyvä käsite, jolla kuvataan aivojen kykyä reagoida ulkoisiin ärsykkeisiin ja tuottaa esimerkiksi uutta tietoa. Levossa, erityisesti nukuttaessa, vireystila on alhainen.'),
('hermosolu',ARRAY[]::text[],'nerve cell','Solu, joka on rakenteeltaan ja toiminnaltaan erikoistunut välittämään sähköisiä viestejä.'),
('tuojahaarake',ARRAY['dendriitti']::text[],'dendrite','Hermosolun uloke, joka kuljettaa viestejä hermosolun solukeskusta kohti.'),
('viejähaarake',ARRAY['aksoni']::text[],'axon','Hermosolun uloke, joka kuljettaa viestejä hermosolun solukeskuksesta eteenpäin.'),
('toimintajännite',ARRAY['aktiopotentiaali','hermoimpulssi']::text[],'action potential','Hermosolun aksonia pitkin etenevä lyhytkestoinen jännitemuutos.'),
('lepojännite',ARRAY[]::text[],'resting potential','Aksonin solukalvon jännite, jossa solukalvon sisäpuoli on sähköisesti negatiivisesti varautunut suhteessa ulkopuoleen ja kalvo on valmis muodostamaan toimintajännitteen.'),
('natrium-kaliumpumppu',ARRAY['Na+-K+-ATPaasi']::text[],'sodium-potassium pump','Kalvoproteiini, joka siirtää ATP:stä saatavan energian avulla natriumioneja ulos solusta ja kaliumioneja sisään soluun.'),
('synapsi',ARRAY[]::text[],'synapse','Kahden hermosolun välille muodostuva rakenne, jossa viestit siirtyvät hermosolusta toiseen kemiallisesti välittäjäaineiden avulla. Koostuu viestiä tuovan hermosolun hermopäätteen ja vastaanottavan solun solukalvosta sekä niiden väliin jäävästä synapsiraosta.'),
('välittäjäaine',ARRAY[]::text[],'transmitter','Aine, joka välittää sähköisen hermoimpulssin kemiallisesti seuraavalle hermosolulle.'),
('synapsirako',ARRAY[]::text[],'synaptic cleft','Synapsissa hermopäätteen solukalvon ja viestiä vastaanottavan solun solukalvon väliin jäävä kapea tila, jonka ylitse viestit siirtyvät välittäjäaineiden avulla.'),
('keskushermosto',ARRAY[]::text[],'central nervous system','Aivoista ja selkäytimestä rakentuva hermoston osa, joka käsittelee muualta hermostosta tulevia viestejä ja antaa toimintakäskyjä.'),
('ääreishermosto',ARRAY[]::text[],'peripheral nervous system','Hermoston osa, joka koostuu keskushermostosta viestejä vievistä liikehermoista ja autonomisesta hermostosta sekä aistihermoista.'),
('autonominen hermosto',ARRAY[]::text[],'autonomic nervous system','Hermoston osa, jonka toimintaan ei voi tahdolla vaikuttaa. Jakautuu sympaattiseen ja parasympaattiseen osaan.'),
('isoaivot',ARRAY[]::text[],'cerebrum','Aivojen osa, jossa tapahtuvat muun muassa älyllinen toiminta, tiedollinen oppiminen ja aistien tiedostaminen.'),
('pikkuaivot',ARRAY[]::text[],'cerebellum','Aivojen osa, joka säätelee isoaivojen liikealueelta tulevia käskyjä. Liikemallit tallentuvat pikkuaivoihin.'),
('aivorunko',ARRAY[]::text[],'brain stem','Aivojen osa, joka koostuu aivosillasta ja ydinjatkeesta.'),
('aistirata',ARRAY[]::text[],'sensory pathway','Hermosolujen ketju, jota pitkin aisti-informaatio kulkee aistinelimestä aivoihin.'),
('aistinreseptori',ARRAY['vastaanottaja']::text[],'sensory receptor','Aistinsolun solukalvossa oleva rakenne, joka vastaanottaa ärsykkeen.'),
('aistinsolu',ARRAY[]::text[],'sensory cell','Aistinelimen solu, joka on erikoistunut vastaanottamaan fysikaalisia tai kemiallisia ärsykkeitä ja joka muuntaa ne hermoimpulsseiksi.'),
('makusilmu',ARRAY[]::text[],'taste bud','Kielen nystyissä sijaitseva sipulin muotoinen rakenne, jossa makuärsykkeisiin reagoivat makuaistinsolut sijaitsevat.'),
('makuhermo',ARRAY[]::text[],'gustatory nerve, taste nerve','Makuaistinsoluihin yhteydessä oleva hermo, joka kuljettaa informaation isoaivojen makualueelle.'),
('hajuepiteeli',ARRAY[]::text[],'olfactory epithelium','Nenäontelon yläosan limakalvossa sijaitseva epiteelisolukerros, jossa hajuaistinsolut sijaitsevat.'),
('hajukäämi',ARRAY[]::text[],'olfactory bulb','Hajuepiteelin yläpuolella sijaitseva aivojen osa, johon hajuaistinsolut kuljettavat hajuaistininformaatiota ja josta hajuhermo vie hermoimpulssit aivoihin.'),
('hajuhermo',ARRAY[]::text[],'olfactory nerve','Hajukäämistä lähtevä hermo, joka kuljettaa hajuaistinsolujen vastaanottaman informaation hermoimpulsseina limbisen järjestelmän kautta isoaivojen kuorikerroksen hajualueelle.'),
('verkkokalvo',ARRAY[]::text[],'retina','Silmän takaosassa oleva kerros, jossa valoa vastaanottavat näköaistinsolut sijaitsevat.'),
('sauvasolu',ARRAY[]::text[],'rod','Silmän verkkokalvon näköaistinsolutyyppi, joka on erikoistunut aktivoitumaan vähäisessä valossa. Sauvasolut aistivat valon voimakkuutta, joten niiden aktivoitumisen seurauksena voi nähdä vain harmaan eri sävyjä, ei värejä.'),
('tappisolu',ARRAY[]::text[],'cone','Silmän verkkokalvon näköaistinsolutyyppi, joka aktivoituu kirkkaassa valossa ja vastaa värinäöstä. Tappisoluja on kolmenlaisia, joiden erilaisten näköpigmenttien vaikutuksesta voidaan aistia lukemattomia erilaisia värisävyjä.'),
('tärykalvo',ARRAY[]::text[],'tympanic membrane, eardrum','Korvassa sijaitseva ohut kalvo, joka erottaa ulkokorvan välikorvasta. Tärykalvo välittää korvakäytävässä kulkevan ilman värähtelyn kuuloluille.'),
('kuuloluut',ARRAY[]::text[],'auditory ossicles','Välikorvassa sijaitsevat kolme pientä luuta (vasara, alasin ja jalustin), jotka välittävät tärykalvon mekaanisen värähtelyn sisäkorvan eteisikkunaan ja vahvistavat ääntä.'),
('simpukka',ARRAY[]::text[],'cochlea','Spiraalimainen sisäkorvan osa, joka sisältää kolme nesteen täyttämää käytävää: eteiskäytävä, kuulokäytävä ja kuuloaistinsolut eli karvasolut sisältävä simpukkatiehyt.'),
('tasapainoelin',ARRAY[]::text[],'vestibular organ, equilibrium organ','Sisäkorvan kaarikäytävistä sekä soikeasta ja pyöreästä rakkulasta koostuva kokonaisuus, joka sisältää pään asentoon ja liikkeisiin reagoivat aistinreseptorit.'),
('kaarikäytävät',ARRAY[]::text[],'semicircular canals, semicircular ducts','Kolme sisäkorvassa olevaa kaaren muotoista nesteen täyttämää käytävää, joiden avulla aistitaan pään liikkeet.'),
('soikea rakkula',ARRAY[]::text[],'utricle','Sisäkorvassa oleva nesteen täyttämä kalvopussi, joka sisältää aistinsoluja, hyytelöä ja tasapainokiviä. Aistinsolut reagoivat pään kallistukseen sekä kiihtyvään ja hidastuvaan liikkeeseen. Aistinsolut ovat vaakatasossa (vrt. pyöreä rakkula).');
insert into public.course_concepts(owner_id,course_id,canonical_name,aliases,english_name,definition,source)
select c.owner_id,c.id,v.canonical_name,v.aliases,v.english_name,v.definition,'Iiris 5 käsiteluettelo'
from public.courses c cross join _bi05_core_concept_chunk v
where upper(c.code)='BI05'
on conflict(course_id,canonical_name) do update set aliases=excluded.aliases,english_name=excluded.english_name,definition=excluded.definition,source=excluded.source,updated_at=now();