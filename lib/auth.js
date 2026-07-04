import crypto from "crypto";

const COOKIE_NAME = "wds_admin_session";
const SESSION_HOURS = 12;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret-change-me";
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = `${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function isValidSessionToken(token) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (sign(payload) !== signature) return false;
  return Number(payload) > Date.now();
}

export function checkPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD || "changeme123";
  return candidate === expected;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
