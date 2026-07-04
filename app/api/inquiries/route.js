import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { listInquiries, createInquiry } from "@/lib/db";
import { isValidSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

// GET /api/inquiries — admin only, returns all leads
export async function GET() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ inquiries: listInquiries() });
}

// POST /api/inquiries — public, used by the site's Enroll/Inquiry form
export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.phone) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }
  const record = createInquiry(body);

  // NOTE: wire up real notifications here before launch, e.g.:
  //   - send an email via an SMTP provider (Resend, Postmark, SES, etc.)
  //   - or post to a WhatsApp Business API / Twilio endpoint
  // For the MVP, new leads simply appear in the admin dashboard inbox.

  return NextResponse.json({ ok: true, inquiry: record }, { status: 201 });
}
