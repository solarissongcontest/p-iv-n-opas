import { getDeviceAccessToken } from "./deviceSession";

export type Ke04SeedStatus = {
  ok: boolean;
  version: string;
  questions: number;
  reserve: number;
};

export async function ensureKe04QuestionBankSeed(courseId: string): Promise<Ke04SeedStatus> {
  const token = getDeviceAccessToken();
  if (!token) throw new Error("Arthur-laitetunnistus puuttuu.");

  const response = await fetch("/api/questions/seed-ke04", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId }),
  });

  const payload = await response.json().catch(() => ({})) as Partial<Ke04SeedStatus> & { error?: string };
  if (!response.ok) throw new Error(payload.error ?? "KE04-tehtäväpankin alustaminen epäonnistui.");
  if (!payload.ok || payload.questions !== 780 || payload.reserve !== 45) {
    throw new Error("KE04-tehtäväpankin varmennus ei täsmää odotettuun sisältöön.");
  }
  return payload as Ke04SeedStatus;
}
