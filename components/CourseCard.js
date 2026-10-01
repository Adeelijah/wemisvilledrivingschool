import Link from "next/link";

export default function CourseCard({ course, compact = false }) {
  return (
    <div className={`flex flex-col border-2 bg-paper ${course.featured ? "border-signal shadow-[0_8px_24px_rgba(17,17,17,0.12)]" : "border-ink"}`}>
      <div className="flex items-center justify-between bg-ink px-4 py-2">
        <span className="font-plate text-xs tracking-[0.15em] text-signal">{course.code}</span>
        {course.featured ? (
          <span className="rounded-sm bg-signal px-2 py-1 font-plate text-[9px] font-bold tracking-[0.12em] text-ink">
            MOST ENROLLED
          </span>
        ) : (
          <span className="h-2 w-6 bg-[repeating-linear-gradient(90deg,#F2C200_0,#F2C200_4px,#111111_4px,#111111_8px)]" aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl uppercase tracking-wide text-ink">{course.name}</h3>
        <p className="text-sm text-slate">{course.audience}</p>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="text-slate">Duration</dt>
          <dd className="text-ink">{course.duration}</dd>
          <dt className="text-slate">Price</dt>
          <dd className="text-ink">{course.price}</dd>
        </dl>
        {(!compact || course.includes.includes("Simulator training sessions")) && (
          <ul className="mt-1 space-y-1.5 text-sm text-ink">
            {(compact ? course.includes.filter((item) => item === "Simulator training sessions") : course.includes).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-road" />
                {item}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={`/enroll?course=${course.slug}`}
          className="mt-auto inline-flex items-center justify-center rounded-[4px] border-2 border-ink bg-signal px-4 py-2.5 font-body text-sm font-bold text-ink transition-colors hover:bg-signalDark"
        >
          Enroll in this course
        </Link>
      </div>
    </div>
  );
}
