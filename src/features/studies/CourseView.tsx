import type { ComponentProps } from "react";
import { CourseView as BaseCourseView } from "./CourseViewBase";
import { Maa06aCourseView } from "@/features/maa06a/Maa06aPanels";

export type { CourseTab } from "./CourseViewBase";

type Props = ComponentProps<typeof BaseCourseView>;

export function CourseView(props: Props) {
  const course = props.courses.find((candidate) => candidate.id === props.selected);
  if (course?.code === "MAA06A") {
    return <Maa06aCourseView
      course={course}
      topics={props.topics}
      onBack={() => props.onSelect(null)}
      onStart={() => props.onStart()}
    />;
  }
  return <BaseCourseView {...props}/>;
}
