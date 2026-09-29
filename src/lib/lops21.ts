export const CURRICULUM_ID = "LOPS21" as const;

/**
 * One curriculum contract for every remote AI feature.
 *
 * Scope and depth are deliberately separate:
 * - WHAT may be assessed or taught as required knowledge is bounded by LOPS21,
 *   the selected course/module, its saved topics and approved study material.
 * - HOW deeply an in-scope idea is explained is not artificially shortened.
 */
export const LOPS21_AI_POLICY = [
  "Curriculum boundary: Finnish upper-secondary National Core Curriculum 2021 (LOPS21) only.",
  "Treat the selected course/module, its supplied topic list and approved course material as the authoritative assessment scope.",
  "Do not introduce a new assessable concept, method, formula, terminology requirement or prerequisite outside that LOPS21 module scope.",
  "If you are uncertain whether content belongs to LOPS21 or the selected module, omit it rather than expanding the syllabus.",
  "Depth is encouraged inside the allowed scope: explain mechanisms, causal links, assumptions, conditions, representations, common misconceptions and connections in detail.",
  "Do not oversimplify an in-scope explanation so far that essential reasoning, mechanisms, conditions or distinctions disappear.",
  "Background detail may be used only when it directly clarifies an in-scope idea; mark it as explanatory context and never make it required knowledge or assessment content.",
  "Use Finnish upper-secondary level notation and terminology unless the supplied course material clearly uses another accepted notation.",
].join(" ");

export type Lops21CourseContext = {
  code?: string | null;
  name?: string | null;
  subject?: string | null;
  topics?: Array<{ id?: string; name: string }>;
};

export function curriculumContext(course: Lops21CourseContext) {
  return {
    curriculum: CURRICULUM_ID,
    module: {
      code: course.code ?? "",
      name: course.name ?? "",
      subject: course.subject ?? "",
    },
    allowedTopics: (course.topics ?? []).map((topic) => ({
      ...(topic.id ? { id: topic.id } : {}),
      name: topic.name,
    })),
  };
}

export function isLops21Row(value: unknown): value is typeof CURRICULUM_ID {
  return value === CURRICULUM_ID;
}
