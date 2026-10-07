import type { ComponentProps } from "react";
import { PlanView as BasePlanView } from "./PlanViewBase";
import { Maa06aPlannerCard } from "@/features/maa06a/Maa06aPanels";

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

  return <>
    <Maa06aPlannerCard course={course}/>
    <BasePlanView {...baseProps}/>
  </>;
}
