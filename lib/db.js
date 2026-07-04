// Lightweight file-based store for the MVP so the admin dashboard has
// somewhere to read/write leads without standing up a database.
//
// IMPORTANT — production note: this works for local dev and small-scale use,
// but most serverless hosts (e.g. Vercel) have a read-only or ephemeral
// filesystem, so writes here will NOT persist in production. Before going
// live, swap this module's implementation for a real database (Postgres,
// SQLite on a persistent volume, or a hosted service) while keeping the
// same function signatures (list, create, update, remove) so the rest of
// the app (API routes, admin dashboard) doesn't need to change.

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readAll() {
  ensureStore();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeAll(records) {
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf-8");
}

export function listInquiries() {
  return readAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function createInquiry(data) {
  const records = readAll();
  const record = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: data.name?.trim() || "",
    phone: data.phone?.trim() || "",
    email: data.email?.trim() || "",
    course: data.course?.trim() || "",
    preferredContact: data.preferredContact || "Call",
    message: data.message?.trim() || "",
    status: "New",
    notes: "",
    createdAt: new Date().toISOString(),
  };
  records.push(record);
  writeAll(records);
  return record;
}

export function updateInquiry(id, patch) {
  const records = readAll();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], ...patch };
  writeAll(records);
  return records[idx];
}

export function deleteInquiry(id) {
  const records = readAll().filter((r) => r.id !== id);
  writeAll(records);
}
