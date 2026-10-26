import type { ComponentProps } from "react";
import { StudyOSMap } from "./StudyOSMap";

type Props = ComponentProps<typeof StudyOSMap>;

export function PlanView(props: Props) {
  return <StudyOSMap {...props} />;
}
