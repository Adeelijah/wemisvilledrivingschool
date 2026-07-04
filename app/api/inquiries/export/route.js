import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { listInquiries } from "@/lib/db";
import { isValidSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

function csvEscape(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export async function GET() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = listInquiries();
  const header = ["Name", "Phone", "Email", "Course", "Preferred Contact", "Status", "Message", "Notes", "Submitted"];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [r.name, r.phone, r.email, r.course, r.preferredContact, r.status, r.message, r.notes, r.createdAt]
        .map(csvEscape)
        .join(",")
    );
  }
  const csv = lines.join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="wemisville-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
