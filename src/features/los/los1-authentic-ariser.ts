/** Complete original four-turn Ariser recording transcription for LOS! C02 & C03.
 * Not invented dialogue. Original author: Ariser, 7 September 2011.
 * Licensed CC BY-SA 3.0 by author on Wikimedia Commons.
 * https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg
 * https://creativecommons.org/licenses/by-sa/3.0/
 * German dialogue copied intact. Finnish line translations added by LOS!.
 * Existing C02 audio is served by Wikimedia; do not copy media to app.
 */
import type { ContentBlock } from "./model";

export const LOS1_ARISER_ORIGINAL_TURNS = [
  { speaker: "Thomas", text: "Wie heißt du?", translationFi: "Mikä sinun nimesi on?" },
  { speaker: "Takashi", text: "Ich heiße Takashi. Und du?", translationFi: "Minun nimeni on Takashi. Entä sinun?" },
  { speaker: "Thomas", text: "Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.", translationFi: "Minä olen Thomas. Tämä on Peter. Me tulemme Berliinistä." },
  { speaker: "Takashi", text: "Ich komme aus Kyoto. Ich bin Japaner.", translationFi: "Minä tulen Kiotosta. Olen japanilainen." },
] as const;

export const LOS1_ARISER_ORIGINAL_TEXT = LOS1_ARISER_ORIGINAL_TURNS.map(turn => turn.text).join("\n");

export function ariserTranscript(blockId: string): ContentBlock {
  return { id: blockId, version: "1.0.0", kind: "dialogue", sourceId: "M-COM-02",
    turns: LOS1_ARISER_ORIGINAL_TURNS.map(turn => ({ ...turn })) };
}
