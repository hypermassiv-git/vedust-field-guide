import type { Archetype } from "@/content/characters";
import { ARCHETYPES } from "@/content/characters";

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl pt-12 text-center sm:pt-16">
      <p className="rise label">{eyebrow}</p>
      <h1
        className="rise text-gradient mt-3 font-display text-3xl leading-tight tracking-title sm:text-5xl"
        style={{ "--d": "60ms" } as React.CSSProperties}
      >
        {title}
      </h1>
      <p
        className="rise mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg"
        style={{ "--d": "120ms" } as React.CSSProperties}
      >
        {intro}
      </p>
    </div>
  );
}

export function Section({ label, title, children, className = "" }: { label?: string; title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`mt-14 ${className}`}>
      {label && <p className="label">{label}</p>}
      {title && <h2 className="mt-2 text-2xl font-bold sm:text-[28px]">{title}</h2>}
      <div className={label || title ? "mt-5" : ""}>{children}</div>
    </section>
  );
}

export const ARCHETYPE_COLOR: Record<Archetype, string> = {
  mermaid: "var(--color-mermaid)",
  pixie: "var(--color-pixie)",
  pirate: "var(--color-pirate)",
  lostBoy: "var(--color-lostboy)",
  legendary: "var(--color-legendary)",
};

export function ArchetypeBadge({ archetype }: { archetype: Archetype }) {
  const color = ARCHETYPE_COLOR[archetype];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-[var(--radius-chip)] px-2 py-0.5 text-xs font-semibold"
      style={{ color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      {ARCHETYPES[archetype].label}
    </span>
  );
}

export function Callout({ title, children, tone = "violet" }: { title: string; children: React.ReactNode; tone?: "violet" | "gold" }) {
  const color = tone === "gold" ? "var(--color-legendary)" : "var(--color-violet-strong)";
  return (
    <div className="inset p-5" style={{ borderColor: `color-mix(in srgb, ${color} 35%, transparent)` }}>
      <p className="font-semibold" style={{ color }}>
        {title}
      </p>
      <div className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{children}</div>
    </div>
  );
}

export function Dust({ value }: { value: number }) {
  return <span className="tabular-nums">{value.toLocaleString("en-US")} DUST</span>;
}
