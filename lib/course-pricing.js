import { neon } from "@neondatabase/serverless";
import { courses } from "@/lib/courses";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

function fallbackPrices() {
  return Object.fromEntries(
    courses.map((course) => [
      course.code,
      Number(String(course.price).replace(/\D/g, "")),
    ])
  );
}

export async function getCoursePricing() {
  const priceByCode = fallbackPrices();

  if (!sql) {
    return { priceByCode, storageReady: false };
  }

  try {
    const rows = await sql`SELECT course_code, price_ngn FROM course_prices;`;
    for (const row of rows) {
      if (Object.hasOwn(priceByCode, row.course_code) && Number.isSafeInteger(Number(row.price_ngn))) {
        priceByCode[row.course_code] = Number(row.price_ngn);
      }
    }
    return { priceByCode, storageReady: true };
  } catch {
    console.error("Course pricing lookup failed; serving built-in prices.");
    return { priceByCode, storageReady: false };
  }
}

export async function getCoursesWithPrices() {
  const { priceByCode } = await getCoursePricing();
  return courses.map((course) => ({
    ...course,
    price: `₦${priceByCode[course.code].toLocaleString("en-NG")}`,
  }));
}

export async function saveCoursePrice(courseCode, priceNgn) {
  if (!sql) {
    throw new Error("Course pricing database is not configured.");
  }

  const rows = await sql`
    INSERT INTO course_prices (course_code, price_ngn, updated_at)
    VALUES (${courseCode}, ${priceNgn}, NOW())
    ON CONFLICT (course_code)
    DO UPDATE SET price_ngn = EXCLUDED.price_ngn, updated_at = NOW()
    RETURNING course_code, price_ngn;
  `;

  return rows[0];
}
