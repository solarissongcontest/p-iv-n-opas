import type { PracticeAttempt, Topic } from "../domain.ts";
import type { TopicDependency } from "../data.ts";
import { masteryModelV4 } from "../learning-os-v4.ts";
import type { ConfusionSetV5 } from "./types.ts";

function outcome(attempt: PracticeAttempt) {
  return attempt.outcome ?? (
    attempt.result === "independent" ? "correct" :
    attempt.result === "hinted" ? "partial" :
    "incorrect"
  );
}

export function confusionSetsV5(input: {
  topics: Topic[];
  dependencies: TopicDependency[];
  attempts: PracticeAttempt[];
  now?: string;
}): ConfusionSetV5[] {
  const pairs = input.dependencies.filter((edge) => edge.relation_type === "commonly_confused_with");
  const seen = new Set<string>();
  const rows: ConfusionSetV5[] = [];
  for (const edge of pairs) {
    const ids = [edge.topic_id, edge.depends_on_topic_id].sort();
    const key = ids.join(":");
    if (seen.has(key)) continue;
    seen.add(key);
    const topics = ids.map((id) => input.topics.find((topic) => topic.id === id)).filter(Boolean) as Topic[];
    if (topics.length !== 2) continue;
    const relatedAttempts = input.attempts.filter((attempt) =>
      ids.includes(attempt.topic_id) &&
      (
        Array.isArray(attempt.question_payload?.["discriminationTopicIds"])
          ? (attempt.question_payload?.["discriminationTopicIds"] as unknown[]).some((id) => ids.includes(String(id)))
          : true
      )
    );
    const discriminationAttempts = relatedAttempts.filter((attempt) =>
      Array.isArray(attempt.question_payload?.["discriminationTopicIds"])
    );
    const correct = discriminationAttempts.filter((attempt) => outcome(attempt) === "correct").length;
    const discriminationStrength = discriminationAttempts.length
      ? correct / discriminationAttempts.length
      : 0;
    const modelGap = topics.reduce((sum, topic) => {
      const model = masteryModelV4(topic, input.attempts, { now: input.now });
      return sum + (1 - model.confidence) * .45 + model.forgettingRisk * .35 + (model.blindSpot ? .2 : 0);
    }, 0) / topics.length;
    const recentErrors = relatedAttempts.slice(-8).filter((attempt) => outcome(attempt) !== "correct").length;
    const priority = Math.min(1,
      .38 +
      modelGap * .34 +
      Math.min(.2, recentErrors * .04) +
      (1 - discriminationStrength) * .28
    );
    rows.push({
      id: `confusion:${key}`,
      topicIds: ids,
      labels: topics.map((topic) => topic.name),
      priority,
      discriminationStrength,
      attempts: discriminationAttempts.length,
      reason: discriminationAttempts.length === 0
        ? "Näitä aiheita on merkitty helposti sekoittuviksi, mutta menetelmän valintaa ei ole vielä testattu ilman aiheotsikkoa."
        : discriminationStrength < .7
          ? "Aiheet tunnistetaan vielä epävarmasti toisistaan. Seuraava harjoitus pyytää valitsemaan menetelmän ennen ratkaisua."
          : "Erottelunäyttö on jo melko vahva; tätä paria tarvitsee sekoittaa vain ajoittain.",
    });
  }
  return rows.sort((a, b) => b.priority - a.priority);
}

export function discriminationPromptV5(set: ConfusionSetV5) {
  return {
    title: "Tunnista menetelmä ennen laskemista",
    instruction: `Tehtävä voi kuulua kumpaan tahansa aiheeseen: ${set.labels.join(" tai ")}. Älä katso aiheotsikkoa. Kerro ensin, kumpaa periaatetta käyttäisit ja mistä tunnistat sen.`,
    topicIds: set.topicIds,
    hideTopicLabel: true,
  };
}
