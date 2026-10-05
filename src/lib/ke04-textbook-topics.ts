import type { Ke04SeedQuestion } from "@/data/ke04-question-bank";

export type Ke04TextbookTopic = {
  section: string;
  unit: number;
  name: string;
  shortName: string;
  position: number;
  weight: number;
  importance: number;
  materials: string;
};

/**
 * Canonical KE04 study topics follow the Mooli 4 (LOPS21) textbook's actual
 * subchapters. The question bank keeps its finer skill taxonomy separately.
 */
export const KE04_TEXTBOOK_TOPICS: Ke04TextbookTopic[] = [
  {
    section: "1.1",
    unit: 1,
    name: "1.1 Reaktioyhtälön kirjoittaminen ja tasapainottaminen",
    shortName: "Reaktioyhtälön kirjoittaminen ja tasapainottaminen",
    position: 1,
    weight: 8,
    importance: 5,
    materials: "Mooli 4 s. 14–26",
  },
  {
    section: "1.2",
    unit: 1,
    name: "1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto",
    shortName: "Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto",
    position: 2,
    weight: 18,
    importance: 5,
    materials: "Mooli 4 s. 27–37",
  },
  {
    section: "1.3",
    unit: 1,
    name: "1.3 Reaktion rajoittava tekijä",
    shortName: "Reaktion rajoittava tekijä",
    position: 3,
    weight: 9,
    importance: 5,
    materials: "Mooli 4 s. 38–45",
  },
  {
    section: "1.4",
    unit: 1,
    name: "1.4 Kaasureaktioiden stoikiometria – ideaalikaasun tilanyhtälö",
    shortName: "Kaasureaktioiden stoikiometria – ideaalikaasun tilanyhtälö",
    position: 4,
    weight: 8,
    importance: 4,
    materials: "Mooli 4 s. 46–57",
  },
  {
    section: "2.1",
    unit: 2,
    name: "2.1 Reaktiotyypit",
    shortName: "Reaktiotyypit",
    position: 5,
    weight: 17,
    importance: 5,
    materials: "Mooli 4 s. 63–86",
  },
  {
    section: "3.1",
    unit: 3,
    name: "3.1 Substituutioreaktio",
    shortName: "Substituutioreaktio",
    position: 6,
    weight: 5,
    importance: 3,
    materials: "Mooli 4 s. 92–102",
  },
  {
    section: "3.2",
    unit: 3,
    name: "3.2 Additio- ja eliminaatioreaktio",
    shortName: "Additio- ja eliminaatioreaktio",
    position: 7,
    weight: 10,
    importance: 4,
    materials: "Mooli 4 s. 103–113",
  },
  {
    section: "3.3",
    unit: 3,
    name: "3.3 Kondensaatio- ja hydrolyysireaktio",
    shortName: "Kondensaatio- ja hydrolyysireaktio",
    position: 8,
    weight: 10,
    importance: 4,
    materials: "Mooli 4 s. 114–127",
  },
  {
    section: "4.1",
    unit: 4,
    name: "4.1 Polymeerit ja polymeroitumisreaktiot",
    shortName: "Polymeerit ja polymeroitumisreaktiot",
    position: 9,
    weight: 5,
    importance: 4,
    materials: "Mooli 4 s. 134–147",
  },
  {
    section: "4.2",
    unit: 4,
    name: "4.2 Muovit ja tekokuidut ovat polymeerien ja lisäaineiden seoksia",
    shortName: "Muovit ja tekokuidut ovat polymeerien ja lisäaineiden seoksia",
    position: 10,
    weight: 3,
    importance: 3,
    materials: "Mooli 4 s. 148–158",
  },
  {
    section: "5.1",
    unit: 5,
    name: "5.1 Hiilihydraatit",
    shortName: "Hiilihydraatit",
    position: 11,
    weight: 2,
    importance: 3,
    materials: "Mooli 4 s. 164–176",
  },
  {
    section: "5.2",
    unit: 5,
    name: "5.2 Aminohapot ja proteiinit",
    shortName: "Aminohapot ja proteiinit",
    position: 12,
    weight: 2,
    importance: 4,
    materials: "Mooli 4 s. 177–188",
  },
  {
    section: "5.3",
    unit: 5,
    name: "5.3 Nukleiinihapot",
    shortName: "Nukleiinihapot",
    position: 13,
    weight: 1,
    importance: 3,
    materials: "Mooli 4 s. 189–196",
  },
  {
    section: "5.4",
    unit: 5,
    name: "5.4 Lipidit",
    shortName: "Lipidit",
    position: 14,
    weight: 2,
    importance: 3,
    materials: "Mooli 4 s. 197–207",
  },
];

export const KE04_TEXTBOOK_TOPIC_BY_SECTION = new Map(
  KE04_TEXTBOOK_TOPICS.map((topic) => [topic.section, topic]),
);

function topic(section: string): Ke04TextbookTopic {
  const match = KE04_TEXTBOOK_TOPIC_BY_SECTION.get(section);
  if (!match) throw new Error(`Unknown KE04 textbook section ${section}`);
  return match;
}

function biomoleculeSection(question: Ke04SeedQuestion): string {
  const subtopic = question.subtopic.toLocaleLowerCase("fi");
  const prompt = question.prompt.toLocaleLowerCase("fi");
  const combined = `${subtopic} ${prompt}`;

  if (/nuklei|nukleot|\bdna\b|\brna\b/.test(combined) && !/tärkkelys|glukoosi|polysakkaridi/.test(prompt)) {
    return "5.3";
  }
  if (/aminohapp|protei|peptid|denatur/.test(combined)) return "5.2";
  if (/rasvahapp|trigly|lipid|\brasva|glyserol/.test(combined)) return "5.4";
  if (/hiilihydra|glukoosi|sakkar|tärkkelys|selluloosa|glykogeeni/.test(combined)) return "5.1";

  // The first biomolecule questions introduce functional groups before the
  // book moves into the named biomolecule classes. Integrated end-of-unit
  // questions belong with the final section so they are not shown too early.
  if (/funktionaaliset ryhmät biomolekyyleissä/.test(subtopic)) return "5.1";
  return "5.4";
}

export function ke04TextbookTopicForQuestion(question: Ke04SeedQuestion): Ke04TextbookTopic {
  switch (question.chapter) {
    case 1:
      return topic("1.1");
    case 2:
    case 3:
      return topic("1.2");
    case 4:
      return topic("1.3");
    case 5:
      return topic("1.4");
    case 6:
    case 7:
    case 8:
      return topic("2.1");
    case 9:
      return topic("3.1");
    case 10:
    case 11:
      return topic("3.2");
    case 12:
    case 13:
      return topic("3.3");
    case 14: {
      const text = `${question.subtopic} ${question.prompt}`.toLocaleLowerCase("fi");
      // Generic polymer structure/properties are part of 4.1. Only explicit
      // plastics, synthetic fibres and additive material questions belong to 4.2.
      return /muovi|tekokuit|lisäaine/.test(text) ? topic("4.2") : topic("4.1");
    }
    case 15:
      return topic(biomoleculeSection(question));
    default:
      throw new Error(`Unknown KE04 question-bank chapter ${question.chapter}`);
  }
}

export function ke04TextbookUnitTitle(unit: number): string {
  switch (unit) {
    case 1:
      return "Jakso 1 · Reaktioyhtälö ja sen käyttö";
    case 2:
      return "Jakso 2 · Erilaisia reaktiotyyppejä";
    case 3:
      return "Jakso 3 · Orgaanisille yhdisteille tyypillisiä reaktioita";
    case 4:
      return "Jakso 4 · Polymeerit ja polymeroitumisreaktiot";
    case 5:
      return "Jakso 5 · Biomolekyylit";
    default:
      return `Jakso ${unit}`;
  }
}
