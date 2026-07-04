# Wemisville Driving School — Website & Admin Dashboard

Custom-coded MVP built with Next.js (App Router) + Tailwind CSS, per the approved PRD.
No WordPress or site builder — full control over design and the admin dashboard, with a
clear path to plug in a headless CMS so staff can edit content without a developer.

## What's included

- **Public site** (8 pages): Home, Courses, About, Gallery, FAQ, Contact, Enroll (inquiry form)
- **Admin dashboard** (`/admin`): password-protected inquiry inbox — view, filter, search,
  update status, add notes, export leads to CSV
- **Inquiry API**: the Enroll form posts to `/api/inquiries`, stored so the dashboard can read it
- Fully responsive, mobile-first, brand palette (yellow / black / purple / white)
- Self-hosted fonts (no external font requests at runtime)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Admin dashboard: `http://localhost:3000/admin`
(default password: `changeme123` — **change this before going live**, see below).

## Environment variables

Create a `.env.local` file (not committed) with:

```
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=a-long-random-string
```

If these are not set, the app falls back to an insecure development default —
fine for local testing, **not safe for production**.

## Known limitation to fix before launch: the data store

Inquiries are currently stored in a JSON file (`/data/inquiries.json`) for MVP simplicity.
This works for local development, but **most hosts (e.g. Vercel) have a read-only or
ephemeral filesystem in production, so new inquiries will not persist reliably once deployed.**

Before launch, swap `lib/db.js` for a real database (Postgres is recommended — e.g. via
Vercel Postgres, Supabase, or Neon). The rest of the app (API routes, the dashboard) calls
only the functions exported from `lib/db.js` (`listInquiries`, `createInquiry`,
`updateInquiry`, `deleteInquiry`), so this is a contained, low-risk swap.

## Connecting a CMS (so staff can edit content without a developer)

Course details, pricing, and copy currently live in `lib/courses.js` and directly in the
page files, so a developer is needed to change them today. To let staff edit this
themselves:

1. Create a free/starter account with a headless CMS — **Sanity**, **Strapi**, or
   **Storyblok** are all good fits and were the options discussed with the client.
2. Model the content types you need (e.g. `Course`, `Testimonial`, `FAQItem`, `SiteSettings`
   for phone/WhatsApp/address/hours).
3. Replace the static exports in `lib/courses.js` and `lib/site.js` with fetch calls to the
   CMS's API (most offer a JS/fetch-friendly API and a generous free tier).
4. Give staff a login to the CMS's own editor UI — no code required for routine updates
   (new course, price change, new testimonial, swapping a photo).

This keeps the actual website custom-built and fast, while giving the school the same
day-to-day editing convenience a WordPress site would offer.

## Notifications when a new inquiry comes in

Currently, new inquiries only appear in the admin dashboard. Before launch, wire up a
notification in `app/api/inquiries/route.js` (see the `POST` handler) — e.g.:

- Email via Resend, Postmark, or SES, or
- WhatsApp via the WhatsApp Business API or a service like Twilio

## Payment integration (not built — flagged in the PRD as a future item)

No payment processing is included in this MVP, per the approved scope. If the client
decides to move forward with Paystack or Flutterwave later, that is a contained addition:
a checkout step, a webhook handler to confirm payment, and a `paid` field on the inquiry
record.

## Multi-staff dashboard accounts (suggested, not required for launch)

The dashboard currently supports a single shared admin password. If more than one staff
member needs independent logins later (e.g. to track who handled which lead), that would
mean adding a small `users` table/collection and swapping the single-password check in
`lib/auth.js` for per-user authentication — a reasonable Phase 2 addition, not needed to launch.

## Security note

`npm audit` currently flags advisories in the pinned Next.js version (mostly relating to
server/middleware edge cases not exercised by this simple app). Run `npm audit` and
consider upgrading Next.js before a production launch.

## Content still needed from the client

See PRD Section 7 — logo, real course pricing/durations, photos (facility, vehicles,
simulator, instructors), FRSC certificate, and confirmed contact details. Placeholder
boxes marked "Photo" throughout the Gallery/About pages should be replaced with real
images.

## Project structure

```
app/
  (site)/           Public pages (share the site header/footer/WhatsApp button)
  admin/            Admin login + dashboard (separate, minimal layout)
  api/              Inquiry + admin auth API routes
components/         Shared UI (Header, Footer, CourseCard, Gauge, admin/Dashboard, etc.)
lib/                site.js (contact details), courses.js (course content), db.js, auth.js
data/               inquiries.json (swap for a real DB before launch — see above)
```
