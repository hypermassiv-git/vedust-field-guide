import type { Metadata } from "next";
import Link from "next/link";
import { FrameGrid } from "@/components/FrameGrid";
import { FrameSimulator } from "@/components/FrameSimulator";
import { Callout, PageHeader, Section } from "@/components/ui";
import { LEVELS, TIERS } from "@/lib/frames";
import { TIER_COLOR } from "@/components/FrameGrid";

export const metadata: Metadata = {
  title: "Tiers & Levels",
  description: "How a veDUST frame is set by veDUST power (Level) and days left on the lock (Tier).",
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
        <div className="grid gap-4 md:grid-cols-2">
          <div className="panel p-6">
            <p className="label">Level: frame style</p>
            <h3 className="mt-2 text-xl font-bold">Set by veDUST power</h3>
            <ul className="mt-4 space-y-2">
              {LEVELS.map((l) => (
                <li key={l.id} className="inset flex items-center justify-between px-4 py-2.5">
                  <span className="font-semibold">{l.label}</span>
                  <span className="text-sm text-ink-secondary tabular-nums">{l.range}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-6">
            <p className="label">Tier: frame gem</p>
            <h3 className="mt-2 text-xl font-bold">Set by days left on the lock</h3>
            <ul className="mt-4 space-y-2">
              {TIERS.map((t) => (
                <li key={t.id} className="inset flex items-center justify-between px-4 py-2.5">
                  <span className="font-semibold" style={{ color: TIER_COLOR[t.id] }}>
                    {t.label}
                  </span>
                  <span className="text-sm text-ink-secondary tabular-nums">{t.range}</span>
                </li>
              ))}
            </ul>
          </div>
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
