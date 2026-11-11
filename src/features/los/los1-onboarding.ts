/** LOS! 1 L001 onboarding. Editorial instructional writing in Finnish,
 * not an alleged authentic German source and not a 30-minute finished module.
 */
import type { ContentBlock } from "./model";

export const LOS1_INTRO_BLOCKS: ContentBlock[] = [
  {
    id: "los1-l001-welcome", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Willkommen! Tervetuloa LOS! 1:n pariin. Aloitamme täysin nollasta. "
      + "Sinun ei tarvitse vielä tuntea saksan sanoja eikä saksan ääntämistä. "
      + "Tässä aloitustunnissa kokeilet lukijaa ja ääntä, opit avaamaan sanan merkityksen "
      + "sekä asetat yhden henkilökohtaisen oppimistavoitteen.",
  },
  {
    id: "los1-l001-reader-guide", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Lukijassa voit avata alkuperäisen dialogin jokaisen repliikin suomennoksen. "
      + "Alleviivattua saksankielistä sanaa napauttamalla saat kyseisen kirjan tarkistetun sanaselityksen, "
      + "jos sana on jo mukana sanastossa. Teksti-painikkeesta voit muuttaa kirjasinkokoa ja riviväliä. "
      + "Korosta-painikkeella voit maalata tekstin kohdan läpikuultavalla tussilla.",
  },
  {
    id: "los1-l001-storage-guide", version: "0.1.0", kind: "paragraph", language: "fi",
    text: "Oppimateriaalin selaaminen ei yksin tarkoita, että osaat asian. "
      + "Harjoitusten vastaus ja oppitunnin eteneminen tallentuvat ensin tämän laitteen paikalliseen muistiin. "
      + "Kun Supabase-synkronointi on käytettävissä, näet erikseen vahvistuksen pilveen tallentamisesta. "
      + "Älä pidä pelkkää paikallista tallennusmerkintää toisen laitteen synkronointitodisteena. "
      + "Voit aina palata kirjan sisällysluetteloon ja lukea mitä tahansa avointa kohtaa.",
  },
];
