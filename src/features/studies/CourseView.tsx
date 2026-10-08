import { useEffect, useState, type ComponentProps } from "react";
import { createPortal } from "react-dom";
import { CourseView as BaseCourseView, type CourseTab } from "./CourseViewBase";
import { Maa06aCourseView } from "@/features/maa06a/Maa06aPanels";
import { ProgressTrajectoryChart } from "@/features/progress/ProgressTrajectoryChart";
import { usePracticeAttempts } from "@/lib/data";
import { usePlanItemEvents } from "@/lib/progress-data";
import "./CourseViewTrajectory.css";

export type { CourseTab } from "./CourseViewBase";

type Props = ComponentProps<typeof BaseCourseView>;

export function CourseView(props: Props) {
  const [activeTab, setActiveTab] = useState<CourseTab>(props.initialTab ?? "Yleiskuva");
  const [analysisTarget, setAnalysisTarget] = useState<HTMLElement | null>(null);
  const historyQuery = usePlanItemEvents(props.plan);
  const attemptsQuery = usePracticeAttempts();
  const course = props.courses.find((candidate) => candidate.id === props.selected);

  useEffect(() => setActiveTab(props.initialTab ?? "Yleiskuva"), [props.initialTab, props.selected]);

  useEffect(() => {
    if (activeTab !== "Analyysi" || !course || course.code === "MAA06A") {
      setAnalysisTarget(null);
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      setAnalysisTarget(document.querySelector<HTMLElement>(".course-analysis-v2 .course-detail-main > .space-y-4"));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeTab, course?.id, course?.code]);

  if (course?.code === "MAA06A") {
    return <Maa06aCourseView
      course={course}
      topics={props.topics}
      onBack={() => props.onSelect(null)}
      onStart={() => props.onStart()}
    />;
  }

  const handleTabChange = (tab: CourseTab) => {
    setActiveTab(tab);
    props.onTabChange?.(tab);
  };

  return <div className={activeTab === "Analyysi" ? "course-analysis-v2" : undefined}>
    <BaseCourseView {...props} onTabChange={handleTabChange}/>
    {activeTab === "Analyysi" && course && analysisTarget && createPortal(
      <ProgressTrajectoryChart
        course={course}
        plan={props.plan}
        sessions={props.sessions}
        events={historyQuery.data ?? []}
        attempts={attemptsQuery.data ?? []}
        title="Suunnitelma, toteuma ja ennuste"
      />,
      analysisTarget,
    )}
  </div>;
}
