import Link from "next/link";
import Container from "./Container";
import LaneDivider from "./LaneDivider";
import PlateBadge from "./PlateBadge";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-chalk">
      <LaneDivider tone="dark" />
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="mb-3 inline-flex">
            <PlateBadge tone="dark">FRSC ACCREDITED</PlateBadge>
          </div>
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 rounded-full bg-signal motion-safe:animate-pulse" />
            <p className="font-display text-base font-semibold uppercase tracking-[0.08em] text-paper">WEMISVILLE DRIVING SCHOOL</p>
          </div>
          <p className="mt-2 max-w-xs text-sm text-chalkLine/80">
            Comprehensive driving instruction, driving-simulation technology, and personalised training in Akure, Ondo State.
          </p>
        </div>

        <div>
          <p className="mb-3 font-plate text-xs uppercase tracking-[0.15em] text-signal">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/courses" className="hover:text-signal">Courses</Link></li>
            <li><Link href="/about" className="hover:text-signal">About Us</Link></li>
            <li><Link href="/faq" className="hover:text-signal">FAQ</Link></li>
            <li><Link href="/enroll" className="hover:text-signal">Enroll</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-plate text-xs uppercase tracking-[0.15em] text-signal">Contact</p>
          <ul className="space-y-2 text-sm text-chalkLine/90">
            <li>{site.address}</li>
            {site.phoneNumbers.map((phone) => (
              <li key={phone.href}><a href={phone.href} className="hover:text-signal">{phone.display}</a></li>
            ))}
            <li><a href={`mailto:${site.email}`} className="hover:text-signal">{site.email}</a></li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-plate text-xs uppercase tracking-[0.15em] text-signal">Follow Us</p>
          <ul className="flex items-center gap-2">
            <li>
              <a href="https://www.instagram.com/wemisvilledrivingschool/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-chalkLine/25 text-chalkLine/80 transition-colors hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@wemisvilledrivingschool" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-chalkLine/25 text-chalkLine/80 transition-colors hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@wemisvilledrivingschool" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-chalkLine/25 text-chalkLine/80 transition-colors hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M19.6 7.2a6.2 6.2 0 0 1-3.8-1.3v8.2a6.2 6.2 0 1 1-5.4-6.1v3.2a3.1 3.1 0 1 0 2.2 3V2h3.2c.2 2.1 1.5 3.8 3.8 4.2v1Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://x.com/wemisville" target="_blank" rel="noopener noreferrer" aria-label="X" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-chalkLine/25 text-chalkLine/80 transition-colors hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.5l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 17.9h1.7L7.3 3.9H5.5l12.3 16Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://web.facebook.com/wemisville/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-chalkLine/25 text-chalkLine/80 transition-colors hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.2V13H10v8h3.5Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-chalkLine/25 text-chalkLine/80 transition-colors hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.4 3.6A11.8 11.8 0 0 0 1.8 17.8L.5 23.5l5.8-1.5A11.8 11.8 0 0 0 20.4 3.6Z" />
                  <path d="M8.2 7.4c-.3-.6-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.5 1.5 3.7c.2.3 2.6 4.1 6.4 5.6 3.2 1.3 3.8 1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5l-2.5-1.2c-.3-.1-.6-.2-.8.2l-1.1 1.4c-.2.3-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.7.1-.3 0-.5 0-.7L8.2 7.4Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-chalkLine/20 py-5 text-center text-xs text-chalkLine/60">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
