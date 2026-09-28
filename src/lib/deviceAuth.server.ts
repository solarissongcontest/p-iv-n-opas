import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export type DeviceTokenClaims = {
  aud: "authenticated";
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  role: "authenticated";
  aal: "aal1";
  session_id: string;
  email: string;
  phone: string;
  is_anonymous: false;
  app_metadata: { provider: "device"; providers: ["device"] };
  user_metadata: { display_name: "Arthur"; app: "opintopaivakirja" };
};

function encode(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function signatureFor(unsigned: string, secret: string) {
  return createHmac("sha256", secret).update(unsigned).digest();
}

export function signArthurDeviceToken(input: {
  ownerId: string;
  supabaseUrl: string;
  jwtSecret: string;
  ttlSeconds?: number;
}) {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (input.ttlSeconds ?? 60 * 60 * 24 * 30);
  const claims: DeviceTokenClaims = {
    aud: "authenticated",
    exp,
    iat: now,
    iss: `${input.supabaseUrl.replace(/\/$/, "")}/auth/v1`,
    sub: input.ownerId,
    role: "authenticated",
    aal: "aal1",
    session_id: randomUUID(),
    email: "",
    phone: "",
    is_anonymous: false,
    app_metadata: { provider: "device", providers: ["device"] },
    user_metadata: { display_name: "Arthur", app: "opintopaivakirja" },
  };
  const header = { alg: "HS256", typ: "JWT" };
  const unsigned = `${encode(JSON.stringify(header))}.${encode(JSON.stringify(claims))}`;
  return {
    token: `${unsigned}.${encode(signatureFor(unsigned, input.jwtSecret))}`,
    expiresAt: exp * 1000,
    claims,
  };
}

export function verifyArthurDeviceToken(token: string, jwtSecret?: string) {
  const secret = jwtSecret ?? process.env["SUPABASE_JWT_SECRET"];
  if (!secret) throw new Error("SUPABASE_JWT_SECRET puuttuu palvelimen ympäristömuuttujista.");

  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Virheellinen laitetunniste.");
  const [headerPart, payloadPart, signaturePart] = parts;
  if (!headerPart || !payloadPart || !signaturePart) throw new Error("Virheellinen laitetunniste.");

  const unsigned = `${headerPart}.${payloadPart}`;
  const expected = signatureFor(unsigned, secret);
  const actual = Buffer.from(signaturePart, "base64url");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new Error("Laitetunnisteen allekirjoitus ei täsmää.");
  }

  const header = JSON.parse(Buffer.from(headerPart, "base64url").toString("utf8")) as { alg?: string };
  const claims = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8")) as DeviceTokenClaims;
  if (header.alg !== "HS256") throw new Error("Laitetunnisteen algoritmi ei kelpaa.");
  if (claims.role !== "authenticated" || claims.aud !== "authenticated" || !claims.sub) {
    throw new Error("Laitetunnisteen oikeudet eivät kelpaa.");
  }
  if (!claims.exp || claims.exp <= Math.floor(Date.now() / 1000)) {
    throw new Error("Laitetunniste on vanhentunut.");
  }
  return claims;
}
