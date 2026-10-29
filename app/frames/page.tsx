import type { Metadata } from "next";
import Link from "next/link";
import { FrameGrid } from "@/components/FrameGrid";
import { FrameSimulator } from "@/components/FrameSimulator";
import { Callout, PageHeader, Section } from "@/components/ui";
import { LEVELS, TIERS, frameArt } from "@/lib/frames";
import type { Level, Tier } from "@/lib/frames";
import { TIER_COLOR } from "@/components/FrameGrid";

export const metadata: Metadata = {
  title: "Tiers & Levels",
  description: "How a veDUST frame is set by veDUST power (Level) and days left on the lock (Tier).",
};

const SHORT_LEVEL: Record<Level, string> = {
  common: "Under 100",
  fine: "100+",
  epic: "1,000+",
  legendary: "10,000+",
};

const SHORT_TIER: Record<Tier, string> = {
  sapphire: "Under 120 days",
  emerald: "120+ days",
  ruby: "270+ days",
  diamond: "Infinite",
};

export default function FramesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <PageHeader
        eyebrow="Tiers & Levels"
        title="What your frame means"
        intro="The frame around your character shows two things at a glance: how much veDUST power it has (its Level) and how long the lock has left (its Tier)."
      />

      <Section label="The two parts of a frame">
        <div className="grid gap-4 lg:grid-cols-2">
          <FramePart
            label="Level: frame style"
            title="Set by veDUST power"
            from="Less power"
            to="More power"
            steps={LEVELS.map((l) => ({
              name: l.label,
              detail: SHORT_LEVEL[l.id],
              art: frameArt("sapphire", l.id),
            }))}
          />
          <FramePart
            label="Tier: frame gem"
            title="Set by days left on the lock"
            from="Fewer days"
            to="Infinite Lock"
            steps={TIERS.map((t) => ({
              name: t.label,
              detail: SHORT_TIER[t.id],
              art: frameArt(t.id, "epic"),
              color: TIER_COLOR[t.id],
            }))}
          />
        </div>
      </Section>

      <Section label="All 16 frames" title="The frame grid">
        <FrameGrid />
      </Section>

      <Section label="Try it" title="Which frame will I get?">
        <p className="mb-5 max-w-2xl text-ink-secondary">
          Frames update live. On a timed lock, veDUST power and days left both shrink every day, so the frame slides down
          over time. Move the slider to see when.
        </p>
        <FrameSimulator />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="Legendary Level is not a Legendary character" tone="gold">
            A <strong>Legendary Level</strong> frame only means 10,000+ veDUST power. A <strong>Legendary character</strong>{" "}
            is one of the 10 special characters. They often go together, because a new lock of 10,000+ DUST mints a
            Legendary character, but you can have either one without the other.{" "}
            <Link href="/legendary" className="font-semibold text-ink underline decoration-white/30 underline-offset-4">
              How to get a Legendary character
            </Link>
          </Callout>
          <Callout title="What actually changes your rewards">
            Frames, Legendary characters and Shiny status don&apos;t change your voting power or USDC rewards. Those come only
            from how much DUST you lock and for how long. The one bonus: each Shiny veDUST adds +5% to your Pearls.
          </Callout>
        </div>
      </Section>
    </main>
  );
}

/* One row of four frames that differ in only one way, so the change is easy to see. */
function FramePart({
  label,
  title,
  from,
  to,
  steps,
}: {
  label: string;
  title: string;
  from: string;
  to: string;
  steps: { name: string; detail: string; art: string; color?: string }[];
}) {
  return (
    <div className="panel p-5 sm:p-6">
      <p className="label">{label}</p>
      <h3 className="mt-2 text-xl font-bold">{title}</h3>
      <ol className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
        {steps.map((s) => (
          <li key={s.name} className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.art} alt={`${s.name} frame`} width={140} height={140} loading="lazy" className="aspect-square w-full rounded-lg sm:rounded-xl" />
            <p className="mt-2 text-sm font-semibold sm:text-base" style={s.color ? { color: s.color } : undefined}>
              {s.name}
            </p>
            <p className="text-[11px] leading-tight text-ink-muted tabular-nums sm:text-xs">{s.detail}</p>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-ink-muted sm:text-xs" aria-hidden>
        <span>{from}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-lavender/60" />
        <span className="text-lavender">→</span>
        <span>{to}</span>
      </div>
    </div>
  );
}
