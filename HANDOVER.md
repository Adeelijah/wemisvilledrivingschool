# Wemisville Driving School — AI Coding Handover

## Active Project Snapshot — 2026-10-07

This section is the current snapshot and supersedes older inspection dates and working-tree/deployment statements below. The remaining sections describe the established app architecture and data flows; re-check them against code before changing production behavior.

- **Workspace:** `C:\Users\USER\Downloads\wemisville-driving-school-site`.
- **Git:** branch `main`, `HEAD` is `671d762 Remove simulator and course pricing features`; this commit is local and has not been pushed. `origin/main` still points to `9ad7ec4`.
- **Production build:** rebuild before release after the current course-card and admin cleanup.
- **Local preview:** the built app is running at `http://localhost:3000` in the current local session; the homepage returned HTTP 200. This is a local process and is not a production deployment.
- **Dependencies/data:** no package dependency, enrollment, authentication, email, or gallery storage/API behavior was changed. The course price editor, pricing API, helper, and migration have been removed; any existing `course_prices` table is left untouched and unused.

## Current Status

- Active repository snapshot: 2026-10-07.
- Local project: `C:\Users\USER\Downloads\wemisville-driving-school-site`.
- Live URL supplied for this project: <https://wemisvilledrivingschool.vercel.app/>.
- Current code has an authenticated inquiry dashboard. Course cards display duration and course features; prices are handled by direct inquiry rather than an in-dashboard editor.
- The old clean-tree/`77f9585` state is historical and no longer current; use the Active Project Snapshot and Git & Deployment sections below for the current branch and working tree.
- No secrets or environment-variable values are included here.

## Architecture

- **Framework:** Next.js 14.2.35 using the App Router; React 18.3.1.
- **Styling:** Tailwind CSS 3.4 with global design tokens/styles in `app/globals.css`; shared components provide the site layout and cards. Fonts are bundled locally via `@fontsource` (Oswald, Work Sans, Space Mono).
- **Hosting:** The supplied production URL is a Vercel `vercel.app` URL. No `.vercel` project-link file, `vercel.json`, or locally available Vercel CLI was found, so the project’s Vercel/GitHub integration settings were not independently verified.
- **GitHub remote:** `origin` is `https://github.com/Adeelijah/wemisvilledrivingschool.git`; the production URL and repository relationship suggest Vercel hosting, but automatic deployments on pushes were not verified.
- **Database:** Neon PostgreSQL through `@neondatabase/serverless`, using the server-side `DATABASE_URL` variable.
- **Admin authentication:** One shared password checked server-side; an HMAC-SHA256 signed, 12-hour `wds_admin_session` cookie is used for the admin session.
- **Environment variable names referenced by current code:** `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL`, `RESEND_FROM_EMAIL`. No values are documented here.
- **Other dependencies of note:** `resend` for enrollment notifications. No ORM is present.

## Public Site

The public pages share `app/(site)/layout.js`, which renders the Header, Footer, and floating WhatsApp button.

- `/` — Homepage hero, course cards, “Why Wemisville,” and enrollment/process content.
- `/courses` — Course cards, grouped Other Services cards, and separate Corporate / Fleet Training card.
- `/about` — School story, accreditation copy, school images, school statistics, and instructor profiles.
- `/gallery` — Facility, FRSC event, and graduation photos.
- `/faq` — Enrollment, documents, duration, FRSC test, payment, and corporate/group training answers.
- `/contact` — Address, two clickable phone numbers, email, weekday hours, call/WhatsApp links, and map embed.
- `/enroll` — Student inquiry form. It collects name, phone, optional email, course slug, preferred contact method, and optional message.
- `/admin/login` — Shared-password login form.
- `/admin` — Protected inquiry and gallery dashboard.

Relevant APIs are listed under **Admin Dashboard** below.

## Admin Dashboard

- **Route:** `/admin` (`app/admin/page.js`) renders `components/admin/Dashboard.js`.
- **Authentication:** `middleware.js` checks for the session cookie before allowing `/admin/*` routes through (except `/admin/login`). API routes separately validate the signed token and expiry with `isValidSessionToken` from `lib/auth.js`. Login is `POST /api/admin/login`; logout is `POST /api/admin/logout`.
- **Existing inquiry management:** Dashboard loads inquiries, filters by status, searches name/phone/course, displays inquiry details, updates status and notes, and exports CSV. The existing data behavior is implemented in `lib/db.js` and `app/api/inquiries/*`.
- **Current modernization:** commit `9ad7ec4` adds the Overview default section with real inquiry/gallery KPI values and inquiry-based charts, responsive navigation for Overview/Inquiries/Gallery, inquiry date groups (Today, This week, Last month, Older), and deletion from the inquiry detail view. Existing status, notes, search/filter, CSV export, and gallery tools remain.
- **Inquiry deletion:** `DELETE /api/inquiries/[id]` is handled by the existing inquiry API route and the dashboard removes a row only after a successful response. No schema change was needed.
- **Gallery Manager:** The admin section continues to use `components/admin/GalleryManager.js` and `/api/admin/gallery` routes.
- **Admin components/modules:** `components/admin/Dashboard.js`, `app/admin/page.js`, `app/admin/login/page.js`, `lib/auth.js`, `middleware.js`.

## Database

- **Connection:** `@neondatabase/serverless` is used with `DATABASE_URL` for inquiries.
- **Inquiry table:** The code defines `inquiries` with `id TEXT PRIMARY KEY`, `name TEXT NOT NULL`, `phone TEXT NOT NULL`, `email`, `course`, `preferred_contact`, `message`, `status`, `notes`, and `created_at TIMESTAMPTZ`. `ensureTable()` in `lib/db.js` issues `CREATE TABLE IF NOT EXISTS inquiries` lazily before inquiry reads/writes. Inquiry CRUD uses parameterized Neon tagged-template queries.
- **Known schema boundary:** The repository defines no course catalog table and contains no ORM schema or migration framework. `inquiries.course` stores the existing course slug as text; it is not a relation to a courses table. `data/inquiries.json` remains in the repository, but no current application code references it.
- **Migration status:** `migrations/002_gallery_items.sql` remains in the repository. The former course-prices migration and runtime integration have been removed. Any already-applied `course_prices` table in Neon is unused and was not dropped.
- **Local environment:** The variable name is read by the code, but this handover does not inspect or disclose any secret values.

## Course catalog

Course names, audiences, durations, and included instruction are maintained in `lib/courses.js`. Course cards show duration as the first bullet point and do not display prices. Visitors are directed to contact the school for current pricing. Basic and Advanced course audiences are intentionally swapped from the previous catalog copy.
## Recent Changes

Most relevant recent commits from local Git history:

- `9ad7ec4` — Modernize admin dashboard and inquiry tools; this is the current local `HEAD` and tracked `origin/main` commit as of 2026-10-05.

- `77f9585` — Historical commit adding the course pricing manager, since removed from the current app.
- `f6c4c79` — Update homepage course details and opening hours; removed the homepage stats/trust strip, showed course details on home, set Monday–Friday hours to 8:00 AM–6:00 PM.
- `5d83006` — Update contact details and group other services WDS-401–403.
- `3559e8c` — Add TikTok and X footer links.
- `2ed6ff4` — Swap Basic and Advanced course details.
- `bf26a77` — Add admin enrollment email notifications via Resend.
- `02320ce` — Update school story and training stats.
- `d593ea7` — Update driving courses and services.

Other earlier work visible in history includes the Neon inquiry database swap and media integration. The working project currently uses Neon, real media, shared site contact details, and icon links in the footer.

## Important Files

- `app/(site)/layout.js` — Shared public Header/Footer/WhatsApp layout.
- `app/(site)/page.js` — Homepage; renders course data from the static catalog.
- `app/(site)/courses/page.js` — Courses and Other Services; renders course data from the static catalog.
- `app/(site)/about/page.js` — School story, stats, FRSC accreditation copy, instructor cards.
- `app/(site)/contact/page.js` — Contact details and map.
- `app/(site)/enroll/page.js`, `components/EnrollForm.js` — Public inquiry form.
- `app/(site)/faq/page.js`, `app/(site)/gallery/page.js` — FAQ and gallery.
- `components/Header.js`, `components/Footer.js`, `components/CourseCard.js`, `components/WhatsAppButton.js` — Shared public UI.
- `components/admin/Dashboard.js` — Admin navigation and inquiry inbox.
- `app/admin/page.js`, `app/admin/login/page.js` — Admin routes.
- `app/api/admin/login/route.js`, `app/api/admin/logout/route.js` — Authentication endpoints.
- `app/api/inquiries/route.js`, `app/api/inquiries/[id]/route.js`, `app/api/inquiries/export/route.js` — Inquiry API.
- `lib/courses.js` — Static course catalog, corporate training data, grouped other services, enrollment steps, testimonials.
- `lib/db.js` — Neon inquiry persistence and lazy `inquiries` table initialization.
- `lib/auth.js`, `middleware.js` — Signed admin cookie and `/admin` route gate.
- `lib/enrollment-notification.js` — Server-side Resend notification.
- `lib/site.js` — Central phones, WhatsApp target, email, address, hours, and rating metadata.
- `app/globals.css`, `tailwind.config.js` — Global styling and Tailwind theme.
- `package.json` / `package-lock.json` — Dependencies and scripts.
- `README.md` — Contains stale pre-Neon/pre-pricing-manager notes (including JSON storage and older launch guidance); verify against code before relying on it.
- `data/inquiries.json` — Legacy data file; not referenced by current runtime code found in this inspection.

## Git & Deployment

- Current branch (2026-10-05): `main`.
- Current local `HEAD`: `9ad7ec4 feat(admin): modernize dashboard and inquiry tools`; upstream is `origin/main`.
- The current cleanup is a local, uncommitted working-tree change.
- Remote: `origin` → `https://github.com/Adeelijah/wemisvilledrivingschool.git`.
- Live site URL supplied by the user is the Vercel domain above. No live deployment inspection or Vercel dashboard check was performed. A push to `main` may trigger an automatic deployment if the Vercel Git integration is enabled; that integration was not verified.
- The currently running local preview is at `http://localhost:3000`; it is not evidence of a production deployment.
- Course-pricing UI, API, database helper, and migration source have been removed. Any existing remote `course_prices` table is left untouched and unused.

## Risks / Do Not Break

- Treat `app/api/inquiries/route.js`, `lib/db.js`, inquiry APIs, and `components/EnrollForm.js` as production-critical. The public POST validates name/phone, saves the inquiry first, then sends a best-effort email; email failure must not fail a saved enrollment.
- Do not alter inquiry persistence behavior.
- Do not expose `DATABASE_URL`, admin secrets, or Resend credentials. Do not move Neon or Resend calls into client components.
- Keep the course slugs (`basic`, `intense`, `advanced`) stable; enrollment records store course slugs as text and notifications map them back to course names.
- `README.md` is out of date about JSON persistence, course editing, and setup. Inspect current code before following it.
