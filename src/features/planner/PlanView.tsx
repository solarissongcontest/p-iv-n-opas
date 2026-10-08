import type { ComponentProps } from "react";
import { PlanView as BasePlanView } from "./PlanViewBase";
import { Maa06aPlannerCard } from "@/features/maa06a/Maa06aPanels";
import { SectionCard } from "@/components/surfaces";
import { today } from "@/lib/fi";

type Props = ComponentProps<typeof BasePlanView>;

export function PlanView(props: Props) {
  const course = props.courses.find((candidate) => candidate.code === "MAA06A");
  if (!course) return <BasePlanView {...props}/>;

  const courseId = course.id;
  const baseProps: Props = {
    ...props,
    courses: props.courses.filter((candidate) => candidate.id !== courseId),
    topics: props.topics.filter((item) => item.course_id !== courseId),
    plan: props.plan.filter((item) => item.course_id !== courseId),
    tests: props.tests.filter((item) => item.course_id !== courseId),
    mistakes: props.mistakes.filter((item) => item.course_id !== courseId),
    attempts: props.attempts.filter((item) => item.course_id !== courseId),
  };
  const now = today();
  const showAutumnBreakRhythm = now >= "2026-10-08" && now <= "2026-10-25";
  const hasBi05 = props.courses.some((candidate) => candidate.code === "BI05");

  return <>
    {showAutumnBreakRhythm && hasBi05 ? <SectionCard title="Syysloman opiskelurytmi">
      <p className="text-sm leading-6 text-muted-foreground">
        BI05 on 19.–25.10. selvä pääaine, koska koe 1 on jo 29.10. Sitä tehdään joka päivä:
        ensin jäljellä oleva koealue, sitten aktiivinen palautus ja loppulomasta koetyylinen harjoittelu.
        KE04 pysyy lyhyempänä ylläpitona ja MAA06A jatkaa vain 130-tehtävätavoitteen vaatimaa tahtia.
      </p>
    </SectionCard> : null}
    <Maa06aPlannerCard course={course}/>
    <BasePlanView {...baseProps}/>
  </>;
}
