import { BookOpen, Brain, CalendarDays, ChartNoAxesCombined, Home } from "lucide-react";

export type StudyPage = "today" | "plan" | "courses" | "practice" | "progress" | "exams" | "settings";

export const studyNav = [
  { id: "today", label: "Tänään", Icon: Home, path: "/today" },
  { id: "plan", label: "Suunnitelma", Icon: CalendarDays, path: "/plan" },
  { id: "courses", label: "Opinnot", Icon: BookOpen, path: "/studies" },
  { id: "practice", label: "Harjoittelu", Icon: Brain, path: "/practice" },
  { id: "progress", label: "Edistyminen", Icon: ChartNoAxesCombined, path: "/progress" },
] as const;

export type PrimaryStudyPage = (typeof studyNav)[number]["id"];
export type StudyPath =
  | "/today"
  | "/plan"
  | "/studies"
  | "/practice"
  | "/progress"
  | "/exams"
  | "/settings";

export function pagePath(page: StudyPage): StudyPath {
  switch (page) {
    case "today": return "/today";
    case "plan": return "/plan";
    case "courses": return "/studies";
    case "practice": return "/practice";
    case "progress": return "/progress";
    case "exams": return "/exams";
    case "settings": return "/settings";
  }
}

export function coachTriggerLabel(page: StudyPage) {
  switch (page) {
    case "today": return "Miksi tämä?";
    case "plan": return "Selitä suunnitelma";
    case "courses": return "Mihin keskityn?";
    case "practice": return "Vihje";
    case "progress": return "Selitä tämä";
    case "exams": return "Mitä seuraavaksi?";
    case "settings": return "Ohjaaja";
  }
}
