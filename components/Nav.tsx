"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const SECTIONS = [
  { href: "/characters", label: "Characters", short: "Characters", icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" /> },
  { href: "/frames", label: "Tiers & Levels", short: "Frames", icon: <path d="M4 4h16v16H4zM8 8h8v8H8z" /> },
  { href: "/legendary", label: "Legendary", short: "Legendary", icon: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" /> },
  { href: "/magic", label: "Character Magic", short: "Magic", icon: <path d="m4 20 10-10m2-6 .8 2.2L19 7l-2.2.8L16 10l-.8-2.2L13 7l2.2-.8zM19 13l.5 1.5L21 15l-1.5.5L19 17l-.5-1.5L17 15l1.5-.5z" /> },
  { href: "/basics", label: "veDUST Basics", short: "Basics", icon: <path d="M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z" /> },
];

function isActive(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
}

export function Nav() {
  const path = usePathname();
  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pt-5 sm:px-6">
        <Link href="/" className="font-display text-lg tracking-title text-ink">
          The veDUST <span className="whitespace-nowrap">Field Guide</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {[...SECTIONS, { href: "/faq", label: "FAQ" }].map((s) => (
            <Link
              key={s.href}
              href={s.href}
              aria-current={isActive(path, s.href) ? "page" : undefined}
              className="rounded-full px-3 py-2 text-sm font-semibold text-ink-secondary transition-colors hover:text-ink aria-[current=page]:bg-white/[0.08] aria-[current=page]:text-ink"
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <Link href="/faq" className="btn-ghost h-9 text-sm md:hidden">
          FAQ
        </Link>
      </header>

      <nav
        className="panel fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 gap-1 !rounded-[22px] p-1.5 md:hidden"
        aria-label="Sections"
      >
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            aria-current={isActive(path, s.href) ? "page" : undefined}
            className="flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[11px] font-semibold text-ink-muted transition-colors aria-[current=page]:bg-white/[0.08] aria-[current=page]:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {s.icon}
            </svg>
            {s.short}
          </Link>
        ))}
      </nav>
    </>
  );
}
