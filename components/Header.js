"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import { site } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex items-center gap-1 rounded-[4px] border-2 border-ink bg-signal px-2 py-1 font-plate text-sm font-bold tracking-wider text-ink md:text-base">
            WDS
          </span>
          <span className="hidden font-display text-lg uppercase tracking-wide text-ink sm:inline md:text-xl">
            {site.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-[15px] font-medium text-ink transition-colors hover:text-road"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.phoneHref}
            className="rounded-[4px] border-2 border-ink bg-signal px-4 py-2 font-body text-sm font-bold text-ink transition-colors hover:bg-signalDark"
          >
            Call Now
          </a>
          <Link
            href="/enroll"
            className="rounded-[4px] bg-road px-4 py-2 font-body text-sm font-bold text-paper transition-colors hover:bg-roadLight"
          >
            Enroll Now
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center border-2 border-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-[2px] w-5 bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute left-0 bottom-0 h-[2px] w-5 bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </Container>

      {open && (
        <div className="border-t-2 border-ink bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 font-body text-base font-medium text-ink hover:bg-chalk"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3">
              <a href={site.phoneHref} className="flex-1 rounded-[4px] border-2 border-ink bg-signal px-4 py-3 text-center font-body text-sm font-bold text-ink">
                Call Now
              </a>
              <Link href="/enroll" onClick={() => setOpen(false)} className="flex-1 rounded-[4px] bg-road px-4 py-3 text-center font-body text-sm font-bold text-paper">
                Enroll Now
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
