import Link from "next/link";
import Image from "next/image";
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
            <Image src="/faviconnew.png" alt="Wemisville Driving School logo" width={28} height={28} className="h-7 w-7 object-contain" />
            <p className="font-display text-xl uppercase tracking-wide text-paper">{site.name}</p>
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
            <li><a href={site.phoneHref} className="hover:text-signal">{site.phoneDisplay}</a></li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-plate text-xs uppercase tracking-[0.15em] text-signal">Follow Us</p>
          <ul className="space-y-2 text-sm text-chalkLine/90">
            <li><a href="#" className="hover:text-signal">Facebook</a></li>
            <li><a href="#" className="hover:text-signal">Instagram</a></li>
            <li><a href={`https://wa.me/${site.whatsappNumber}`} className="hover:text-signal">WhatsApp</a></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-chalkLine/20 py-5 text-center text-xs text-chalkLine/60">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
