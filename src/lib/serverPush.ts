import {
  createCipheriv,
  createECDH,
  createHash,
  createHmac,
  createPrivateKey,
  randomBytes,
  sign,
} from "node:crypto";

const P256_ORDER = BigInt(
  "0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551",
);

function b64url(value: Buffer | string) {
  const buffer = typeof value === "string" ? Buffer.from(value) : value;
  return buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function fromB64url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Buffer.from(padded, "base64");
}

function hmac(key: Buffer, value: Buffer) {
  return createHmac("sha256", key).update(value).digest();
}

function hkdfExpand(prk: Buffer, info: Buffer, length: number) {
  let block = Buffer.alloc(0);
  const output: Buffer[] = [];
  let generated = 0;
  let counter = 1;

  while (generated < length) {
    block = hmac(
      prk,
      Buffer.concat([block, info, Buffer.from([counter])]),
    );
    output.push(block);
    generated += block.length;
    counter += 1;
  }

  return Buffer.concat(output).subarray(0, length);
}

function privateScalarFromSecret(secret: string) {
  const digest = createHash("sha256")
    .update(`opintopaivakirja:vapid:${secret}`)
    .digest();
  const value = BigInt(`0x${digest.toString("hex")}`);
  const scalar = (value % (P256_ORDER - 1n)) + 1n;
  return Buffer.from(scalar.toString(16).padStart(64, "0"), "hex");
}

export function getVapidKeys() {
  const secret = process.env["SUPABASE_SECRET_KEY"];
  if (!secret) throw new Error("SUPABASE_SECRET_KEY is required for Web Push.");

  const privateKey = privateScalarFromSecret(secret);
  const ecdh = createECDH("prime256v1");
  ecdh.setPrivateKey(privateKey);
  const publicKey = ecdh.getPublicKey(undefined, "uncompressed");
  return {
    privateKey,
    publicKey,
    publicKeyBase64: b64url(publicKey),
  };
}

function vapidAuthorization(endpoint: string) {
  const { privateKey, publicKey, publicKeyBase64 } = getVapidKeys();
  const audience = new URL(endpoint).origin;
  const header = b64url(JSON.stringify({ typ: "JWT", alg: "ES256" }));
  const payload = b64url(
    JSON.stringify({
      aud: audience,
      exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
      sub: "https://opiskelupaivakirja.vercel.app",
    }),
  );
  const input = `${header}.${payload}`;

  const x = publicKey.subarray(1, 33);
  const y = publicKey.subarray(33, 65);
  const key = createPrivateKey({
    key: {
      kty: "EC",
      crv: "P-256",
      x: b64url(x),
      y: b64url(y),
      d: b64url(privateKey),
    },
    format: "jwk",
  });

  const signature = sign("sha256", Buffer.from(input), {
    key,
    dsaEncoding: "ieee-p1363",
  });

  return {
    authorization: `vapid t=${input}.${b64url(signature)}, k=${publicKeyBase64}`,
  };
}

function encryptPayload(
  payload: Buffer,
  clientPublicKey: Buffer,
  authSecret: Buffer,
) {
  const sender = createECDH("prime256v1");
  sender.generateKeys();
  const senderPublicKey = sender.getPublicKey(undefined, "uncompressed");
  const sharedSecret = sender.computeSecret(clientPublicKey);

  const prkKey = hmac(authSecret, sharedSecret);
  const keyInfo = Buffer.concat([
    Buffer.from("WebPush: info\0", "utf8"),
    clientPublicKey,
    senderPublicKey,
  ]);
  const ikm = hkdfExpand(prkKey, keyInfo, 32);

  const salt = randomBytes(16);
  const prk = hmac(salt, ikm);
  const contentEncryptionKey = hkdfExpand(
    prk,
    Buffer.from("Content-Encoding: aes128gcm\0", "utf8"),
    16,
  );
  const nonce = hkdfExpand(
    prk,
    Buffer.from("Content-Encoding: nonce\0", "utf8"),
    12,
  );

  const record = Buffer.concat([payload, Buffer.from([2])]);
  const cipher = createCipheriv(
    "aes-128-gcm",
    contentEncryptionKey,
    nonce,
  );
  const ciphertext = Buffer.concat([
    cipher.update(record),
    cipher.final(),
    cipher.getAuthTag(),
  ]);

  const recordSize = Buffer.alloc(4);
  recordSize.writeUInt32BE(4096, 0);

  return Buffer.concat([
    salt,
    recordSize,
    Buffer.from([senderPublicKey.length]),
    senderPublicKey,
    ciphertext,
  ]);
}

export type StoredPushSubscription = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export async function sendWebPush(
  subscription: StoredPushSubscription,
  payload: {
    title: string;
    body: string;
    url?: string;
    tag?: string;
  },
) {
  const clientPublicKey = fromB64url(subscription.keys.p256dh);
  const authSecret = fromB64url(subscription.keys.auth);
  const encrypted = encryptPayload(
    Buffer.from(JSON.stringify(payload), "utf8"),
    clientPublicKey,
    authSecret,
  );
  const { authorization } = vapidAuthorization(subscription.endpoint);

  return fetch(subscription.endpoint, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream",
      TTL: "86400",
    },
    body: encrypted,
  });
}
