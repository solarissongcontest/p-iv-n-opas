import type { ComponentProps } from "react";
import { TodayView as BaseTodayView } from "./TodayViewBase";
import { Maa06aTodayCard } from "@/features/maa06a/Maa06aPanels";

type Props = ComponentProps<typeof BaseTodayView>;

export function TodayView(props: Props) {
  const course = props.courses.find((candidate) => candidate.code === "MAA06A");
  if (!course) return <BaseTodayView {...props}/>;

  const courseId = course.id;
  const baseProps: Props = {
    ...props,
    courses: props.courses.filter((candidate) => candidate.id !== courseId),
    topics: props.topics.filter((item) => item.course_id !== courseId),
    sessions: props.sessions.filter((item) => item.course_id !== courseId),
    exams: props.exams.filter((item) => item.course_id !== courseId),
    plan: props.plan.filter((item) => item.course_id !== courseId),
    tests: props.tests.filter((item) => item.course_id !== courseId),
    attempts: props.attempts.filter((item) => item.course_id !== courseId),
    mistakes: props.mistakes.filter((item) => item.course_id !== courseId),
  };

  return <>
    <Maa06aTodayCard course={course}/>
    <BaseTodayView {...baseProps}/>
  </>;
}
