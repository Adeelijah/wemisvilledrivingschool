// Data layer for inquiries — backed by Neon Postgres (via Vercel's Neon
// Marketplace integration).
//
// Setup (one-time):
//   1. In the Vercel dashboard: Project -> Storage -> Create Database -> Neon.
//   2. Connect it to this project. This adds a DATABASE_URL env var
//      automatically -- no manual copy-pasting needed.
//   3. For local development, run `vercel env pull .env.local` from the
//      project root (requires the Vercel CLI: `npm i -g vercel`, then
//      `vercel link` once) to pull that same env var down to your machine.
//
// The table is created automatically the first time this module runs a
// query (see ensureTable), so there's no separate migration step to run.

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

let tableReady = null;

function ensureTable() {
  if (!tableReady) {
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT DEFAULT '',
        course TEXT DEFAULT '',
        preferred_contact TEXT DEFAULT 'Call',
        message TEXT DEFAULT '',
        status TEXT DEFAULT 'New',
        notes TEXT DEFAULT '',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
  }
  return tableReady;
}

function toRecord(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    course: row.course,
    preferredContact: row.preferred_contact,
    message: row.message,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at instanceof Date ? new Date(row.created_at).toISOString() : row.created_at,
  };
}

export async function listInquiries() {
  await ensureTable();
  const rows = await sql`SELECT * FROM inquiries ORDER BY created_at DESC;`;
  return rows.map(toRecord);
}

export async function createInquiry(data) {
  await ensureTable();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const name = data.name?.trim() || "";
  const phone = data.phone?.trim() || "";
  const email = data.email?.trim() || "";
  const course = data.course?.trim() || "";
  const preferredContact = data.preferredContact || "Call";
  const message = data.message?.trim() || "";

  const rows = await sql`
    INSERT INTO inquiries (id, name, phone, email, course, preferred_contact, message, status, notes)
    VALUES (${id}, ${name}, ${phone}, ${email}, ${course}, ${preferredContact}, ${message}, 'New', '')
    RETURNING *;
  `;
  return toRecord(rows[0]);
}

export async function updateInquiry(id, patch) {
  await ensureTable();
  if (typeof patch.status === "string") {
    await sql`UPDATE inquiries SET status = ${patch.status} WHERE id = ${id};`;
  }
  if (typeof patch.notes === "string") {
    await sql`UPDATE inquiries SET notes = ${patch.notes} WHERE id = ${id};`;
  }
  const rows = await sql`SELECT * FROM inquiries WHERE id = ${id};`;
  return rows[0] ? toRecord(rows[0]) : null;
}

export async function deleteInquiry(id) {
  await ensureTable();
  await sql`DELETE FROM inquiries WHERE id = ${id};`;
}
