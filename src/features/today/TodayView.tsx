import type { ComponentProps } from "react";
import { StudyOSFlow } from "./StudyOSFlow";

type Props = ComponentProps<typeof StudyOSFlow>;

export function TodayView(props: Props) {
  return <StudyOSFlow {...props} />;
}
