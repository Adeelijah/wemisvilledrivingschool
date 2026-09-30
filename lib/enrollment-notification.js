import { Resend } from "resend";
import { courses } from "@/lib/courses";

const ADMIN_DASHBOARD_URL = "https://wemisvilledrivingschool.vercel.app/admin";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function singleLine(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

export async function sendAdminEnrollmentNotification(inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    return { sent: false, reason: "missing_configuration" };
  }

  try {
    const name = singleLine(inquiry.name) || "New student";
    const course = courses.find((item) => item.slug === inquiry.course)?.name
      || (inquiry.course === "not-sure" ? "Not sure yet" : inquiry.course || "Not specified");
    const message = String(inquiry.message || "").trim() || "None provided";
    const submittedAt = new Date(inquiry.createdAt);
    const submissionTime = Number.isNaN(submittedAt.getTime())
      ? "Not available"
      : submittedAt.toLocaleString("en-NG", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Africa/Lagos",
        });

    const details = [
      ["Student", name],
      ["Phone", inquiry.phone || "Not provided"],
      ["Email", inquiry.email || "Not provided"],
      ["Course", course],
      ["Preferred contact", inquiry.preferredContact || "Not provided"],
      ["Message", message],
      ["Submitted", submissionTime],
    ];
    const htmlDetails = details.map(([label, value]) => `
      <tr>
        <th align="left" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#5b5b60;font-size:13px;font-weight:600;vertical-align:top;">${escapeHtml(label)}</th>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111111;font-size:14px;line-height:1.5;vertical-align:top;">${escapeHtml(value).replace(/\r?\n/g, "<br>")}</td>
      </tr>`).join("");
    const textDetails = details.map(([label, value]) => `${label}: ${value}`).join("\n");
    const safeSubjectName = name.slice(0, 120);

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      subject: `New Enrollment — ${safeSubjectName}`,
      text: `New enrollment received\n\n${textDetails}\n\nAdmin dashboard: ${ADMIN_DASHBOARD_URL}`,
      html: `
        <div style="margin:0;padding:24px 12px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
          <div style="max-width:600px;margin:0 auto;padding:24px;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;">
            <h1 style="margin:0 0 18px;color:#111111;font-size:22px;line-height:1.3;">New enrollment</h1>
            <table role="presentation" style="width:100%;border-collapse:collapse;">${htmlDetails}</table>
            <p style="margin:22px 0 0;">
              <a href="${ADMIN_DASHBOARD_URL}" style="display:inline-block;padding:12px 16px;border-radius:4px;background:#f2c200;color:#111111;font-size:14px;font-weight:700;text-decoration:none;">Open admin dashboard</a>
            </p>
          </div>
        </div>`,
    });

    if (error) return { sent: false, reason: "provider_error" };
    return { sent: true };
  } catch {
    return { sent: false, reason: "provider_error" };
  }
}
