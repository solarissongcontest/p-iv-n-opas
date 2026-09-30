export const RELATION_LABELS = {
  prerequisite: "esitieto",
  depends_on: "riippuu aiheesta",
  builds_on: "rakentuu aiheen varaan",
  related_to: "liittyy aiheeseen",
  commonly_confused_with: "sekoittuu helposti aiheeseen",
} as const;

export function relationLabel(value: string) {
  return RELATION_LABELS[value as keyof typeof RELATION_LABELS] ?? "muu yhteys";
}

export function confidenceLabel(value: string) {
  switch (value) {
    case "very_low": return "erittäin vähäinen";
    case "low": return "vähäinen";
    case "medium": return "kohtalainen";
    case "high": return "vahva";
    default: return "tuntematon";
  }
}

export function riskLabel(value: string) {
  switch (value) {
    case "low": return "pieni";
    case "medium": return "kohtalainen";
    case "high": return "suuri";
    default: return "tuntematon";
  }
}

export function marginalValueLabel(value: string) {
  switch (value) {
    case "low": return "pieni";
    case "medium": return "kohtalainen";
    case "high": return "suuri";
    default: return "tuntematon";
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
    default: return "Ei vielä arvioitu";
  }
}

export function dimensionLabel(value: string) {
  switch (value) {
    case "recall": return "muistista palautus";
    case "understanding": return "ymmärrys";
    case "application": return "soveltaminen";
    case "fluency": return "sujuvuus";
    case "retention": return "säilyminen";
    case "calibration": return "varmuusarvion osuvuus";
    default: return "muu osa-alue";
  }
}

export function experimentStatusLabel(value: string) {
  switch (value) {
    case "clear": return "selvä havainto";
    case "signal": return "alustava havainto";
    case "collecting": return "kerätään havaintoja";
    default: return "tila tuntematon";
  }
}

export function simulationProfileLabel(value: string) {
  switch (value) {
    case "good_recall_weak_application": return "Muistaminen vahvaa, soveltaminen heikompaa";
    case "frequent_forgetting": return "Asiat unohtuvat tavallista nopeammin";
    case "high_confidence_errors": return "Varmuus on ajoittain suoritusta korkeampi";
    default: return "muu oppimisprofiili";
  }
}

export function yoPhaseLabel(value: string) {
  switch (value) {
    case "foundation": return "Perustan rakentaminen";
    case "consolidation": return "Osaamisen vahvistaminen";
    case "exam_practice": return "Koetyylinen harjoittelu";
    case "final_review": return "Loppukertaus";
    default: return "muu vaihe";
  }
}

export function eventKindLabel(value: string) {
  switch (value) {
    case "mastery": return "osaaminen";
    case "review": return "kertaus";
    case "practice": return "harjoittelu";
    case "exam": return "koe";
    default: return "muu tapahtuma";
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
    default: return "muu tehtävätyyppi";
  }
}

export function planPhaseLabel(value: string) {
  switch (value) {
    case "content": return "uusi sisältö";
    case "application": return "soveltaminen";
    case "practice": return "harjoittelu";
    case "review": return "kertaus";
    case "light": return "kevyt päivä";
    case "exam": return "koe";
    default: return "muu vaihe";
  }
}

export function plannerModeLabel(value: string) {
  switch (value) {
    case "manual": return "Manuaalinen";
    case "assisted": return "Avustettu";
    case "autopilot": return "Automaattinen";
    default: return "muu tila";
  }
}

export function attemptOutcomeLabel(value: string) {
  switch (value) {
    case "correct":
    case "independent": return "onnistui itsenäisesti";
    case "partial":
    case "hinted": return "onnistui osittain";
    case "incorrect":
    case "not_yet": return "ei vielä onnistunut";
    default: return "muu tulos";
  }
}

export function answerModeLabel(value: string) {
  switch (value) {
    case "text": return "tekstivastaus";
    case "formula": return "kaavavastaus";
    case "diagram": return "piirros";
    case "graph": return "kuvaaja";
    case "mixed": return "teksti ja piirros";
    default: return "muu vastaustapa";
  }
}

export function stimulusFieldLabel(value: string, index = 0) {
  switch (value) {
    case "text": return "Teksti";
    case "title": return "Otsikko";
    case "source": return "Lähde";
    case "data": return "Aineisto";
    case "table": return "Taulukko";
    case "chart": return "Kuvaaja";
    case "graph": return "Kuvaaja";
    case "image": return "Kuva";
    case "description": return "Kuvaus";
    case "caption": return "Kuvateksti";
    case "excerpt": return "Katkelma";
    case "question": return "Kysymys";
    case "context": return "Taustatieto";
    default: return "Aineiston osa " + (index + 1);
  }
}

export function errorCategoryLabel(value: string) {
  switch (value) {
    case "concept_error": return "käsitevirhe";
    case "recall": return "muistivirhe";
    case "formula": return "kaavan valinta";
    case "algebra": return "algebravirhe";
    case "unit": return "yksikkövirhe";
    case "interpretation": return "tulkintavirhe";
    case "strategy": return "ratkaisustrategia";
    case "careless": return "huolimattomuus";
    case "incomplete": return "puutteellinen vastaus";
    case "prerequisite": return "puuttuva esitieto";
    default: return "muu virhe";
  }
}

export function materialKindLabel(value: string) {
  switch (value) {
    case "pdf": return "PDF";
    case "notes": return "muistiinpanot";
    case "text": return "teksti";
    default: return "materiaali";
  }
}
