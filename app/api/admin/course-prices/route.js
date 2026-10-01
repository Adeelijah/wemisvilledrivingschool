import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { courses } from "@/lib/courses";
import { getCoursePricing, saveCoursePrice } from "@/lib/course-pricing";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "@/lib/auth";

function isAdmin() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceByCode, storageReady } = await getCoursePricing();
  const pricing = courses.map((course) => ({
    code: course.code,
    name: course.name,
    priceNgn: priceByCode[course.code],
  }));

  return NextResponse.json(
    { pricing, storageReady },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function PUT(request) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const knownCourse = courses.some((course) => course.code === body?.code);
  if (
    !knownCourse ||
    !Number.isSafeInteger(body?.priceNgn) ||
    body.priceNgn <= 0 ||
    body.priceNgn > 2147483647
  ) {
    return NextResponse.json({ error: "Enter a valid course and price in whole naira." }, { status: 400 });
  }

  try {
    const row = await saveCoursePrice(body.code, body.priceNgn);
    const course = courses.find((item) => item.code === row.course_code);
    return NextResponse.json({
      pricing: {
        code: row.course_code,
        name: course.name,
        priceNgn: Number(row.price_ngn),
      },
    });
  } catch {
    console.error("Course price update failed.");
    return NextResponse.json(
      { error: "Course prices could not be saved. Confirm the pricing migration has been applied and try again." },
      { status: 503 }
    );
  }
}
