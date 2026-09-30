export const RELATION_LABELS = {
  prerequisite: "esitieto",
  depends_on: "riippuu aiheesta",
  builds_on: "rakentuu aiheen varaan",
  related_to: "liittyy aiheeseen",
  commonly_confused_with: "sekoittuu helposti aiheeseen",
} as const;

export function relationLabel(value: string) {
  return RELATION_LABELS[value as keyof typeof RELATION_LABELS] ?? value.replaceAll("_", " ");
}

export function confidenceLabel(value: string) {
  switch (value) {
    case "very_low": return "erittäin vähäinen";
    case "low": return "vähäinen";
    case "medium": return "kohtalainen";
    case "high": return "vahva";
    default: return value.replaceAll("_", " ");
  }
}

export function riskLabel(value: string) {
  switch (value) {
    case "low": return "pieni";
    case "medium": return "kohtalainen";
    case "high": return "suuri";
    default: return value.replaceAll("_", " ");
  }
}

export function marginalValueLabel(value: string) {
  switch (value) {
    case "low": return "pieni";
    case "medium": return "kohtalainen";
    case "high": return "suuri";
    default: return value.replaceAll("_", " ");
  }
}

export function masteryLabelFi(value: string) {
  switch (value) {
    case "Not assessed": return "Ei vielä arvioitu";
    case "Learning": return "Harjoittele";
    case "Developing": return "Kehittyvä";
    case "Secure": return "Melko varma";
    case "Strong": return "Vahva";
    case "At risk": return "Riskissä";
    default: return value;
  }
}

export function dimensionLabel(value: string) {
  switch (value) {
    case "recall": return "muistista palautus";
    case "understanding": return "ymmärrys";
    case "application": return "soveltaminen";
    case "fluency": return "sujuvuus";
    case "retention": return "säilyminen";
    case "calibration": return "kalibrointi";
    default: return value.replaceAll("_", " ");
  }
}

export function experimentStatusLabel(value: string) {
  switch (value) {
    case "clear": return "selvä havainto";
    case "signal": return "alustava havainto";
    case "collecting": return "kerätään havaintoja";
    default: return value.replaceAll("_", " ");
  }
}

export function simulationProfileLabel(value: string) {
  switch (value) {
    case "good_recall_weak_application": return "Muistaminen vahvaa, soveltaminen heikompaa";
    case "frequent_forgetting": return "Asiat unohtuvat tavallista nopeammin";
    case "high_confidence_errors": return "Varmuus on ajoittain suoritusta korkeampi";
    default: return value.replaceAll("_", " ");
  }
}

export function yoPhaseLabel(value: string) {
  switch (value) {
    case "foundation": return "Perustan rakentaminen";
    case "consolidation": return "Osaamisen vahvistaminen";
    case "exam_practice": return "Koetyylinen harjoittelu";
    case "final_review": return "Loppukertaus";
    default: return value.replaceAll("_", " ");
  }
}

export function eventKindLabel(value: string) {
  switch (value) {
    case "mastery": return "osaaminen";
    case "review": return "kertaus";
    case "practice": return "harjoittelu";
    case "exam": return "koe";
    default: return value.replaceAll("_", " ");
  }
}

export function attemptTypeLabel(value: string) {
  switch (value) {
    case "free_recall": return "vapaa muistista palautus";
    case "short_answer": return "lyhyt vastaus";
    case "calculation": return "laskutehtävä";
    case "application": return "soveltaminen";
    case "multiple_choice": return "monivalinta";
    case "explanation": return "käsitteen selitys";
    case "ordering": return "järjestäminen";
    case "error_detection": return "virheen tunnistaminen";
    case "simulation": return "koetyylinen tehtävä";
    case "recognition": return "menetelmän tunnistaminen";
    default: return value.replaceAll("_", " ");
  }
}
