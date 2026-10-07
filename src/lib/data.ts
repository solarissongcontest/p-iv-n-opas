import {
  ensureKe04ForCurrentUser as ensureKe04Base,
  useCourses as useCoursesBase,
  usePreferences as usePreferencesBase,
} from "./data-base";
import { ensureMaa06aForCurrentUser } from "./maa06a-data";

export * from "./data-base";
export * from "./maa06a-data";

/**
 * Hide the canonical MAA06A seed from fresh-account onboarding detection.
 * The course is provisioned during bootstrap, but it should only become part
 * of the visible course list after onboarding has been completed.
 */
export function useCourses() {
  const coursesQuery = useCoursesBase();
  const preferencesQuery = usePreferencesBase();
  const onboardingComplete = preferencesQuery.data?.onboarding_completed === true;
  const data = onboardingComplete
    ? coursesQuery.data
    : coursesQuery.data?.filter((course) => course.code !== "MAA06A");

  return { ...coursesQuery, data };
}

/**
 * App bootstrap kept under the legacy export name so existing call sites do
 * not need to know which canonical courses are provisioned. KE04 remains the
 * first course and MAA06A is repaired immediately afterwards.
 */
export async function ensureKe04ForCurrentUser(): Promise<string> {
  const ke04Id = await ensureKe04Base();
  await ensureMaa06aForCurrentUser();
  return ke04Id;
}
