/**
 * Locale-specific browser speech fallback for beginner German lessons.
 * An Austrian (de-AT), Swiss (de-CH) or generic "de" voice must never be
 * presented as verified de-DE pronunciation. These are optional device
 * capabilities, not licensed human recordings or a linguistic approval.
 */
export function findLosGermanVoice(
  voices: readonly SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
  return voices.find(voice => /^de-DE$/i.test(voice.lang)) ?? null;
}
