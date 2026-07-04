import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateInquiry, deleteInquiry } from "@/lib/db";
import { isValidSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

function requireAdmin() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}

export async function PATCH(request, { params }) {
  if (!requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const allowed = {};
  if (typeof body.status === "string") allowed.status = body.status;
  if (typeof body.notes === "string") allowed.notes = body.notes;
  const updated = updateInquiry(params.id, allowed);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ inquiry: updated });
}

export async function DELETE(request, { params }) {
  if (!requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  deleteInquiry(params.id);
  return NextResponse.json({ ok: true });
}
