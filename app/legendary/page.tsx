import type { Metadata } from "next";
import { CharacterCard } from "@/components/CharacterCard";
import { LegendaryPathFinder } from "@/components/LegendaryPathFinder";
import { Callout, PageHeader, Section } from "@/components/ui";
import { CHARACTERS } from "@/content/characters";
import { LEGENDARY } from "@/content/rules";

export const metadata: Metadata = {
  title: "How to get a Legendary",
  description: "The two ways to get one of the 10 Legendary veDUST characters, and which one suits you.",
};

const fmt = (n: number) => n.toLocaleString("en-US");

export default function LegendaryPage() {
  const legendaries = CHARACTERS.filter((c) => c.archetype === "legendary");
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <PageHeader
        eyebrow="Legendary characters"
        title="How to get a Legendary"
        intro="10 of the 50 characters are Legendary. They're the rarest characters a veDUST can have, and there are exactly two ways to get one."
      />

      <Section>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {legendaries.map((c) => (
            <CharacterCard key={c.slug} c={c} compact />
          ))}
        </div>
      </Section>

      <Section label="The two paths" title="Start fresh or upgrade">
        <p className="-mt-2 mb-5 max-w-2xl text-ink-secondary">
          Path A uses DUST from your wallet to open a new veDUST. Path B turns a veDUST you already own into a Legendary.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <PathCard
            letter="A"
            title="Open a big new lock"
            cost={`${fmt(LEGENDARY.mintMinDust)}+ DUST in a new lock`}
            conditionsIntro="The new veDUST always comes with a Legendary character, as long as all 3 conditions are met:"
            conditions={[
              { title: "DUST from your wallet", body: "Lock DUST you already hold. Claiming rewards straight into a lock doesn't count." },
              { title: "A brand-new lock", body: "Open a new veDUST. Adding DUST to a lock you already have doesn't count." },
              { title: `At least ${fmt(LEGENDARY.mintMinDust)} DUST`, body: "In that one new lock. Timed or Infinite Lock both work." },
            ]}
          />
          <PathCard
            letter="B"
            title="Use an Ancient Manuscript"
            cost={`${fmt(LEGENDARY.manuscriptCost)} DUST, on a veDUST holding ${fmt(LEGENDARY.manuscriptMinLockDust)}+ DUST`}
            steps={[
              `Have a Lost Boy, Mermaid, Pirate or Pixie veDUST with at least ${fmt(LEGENDARY.manuscriptMinLockDust)} DUST locked.`,
              `Buy an Ancient Manuscript for ${fmt(LEGENDARY.manuscriptCost)} DUST and use it on that veDUST.`,
              "It becomes Legendary for good. Shiny status and shiny progress carry over.",
            ]}
            watch={["Limited supply, so they can sell out.", "Olympic editions can't use it."]}
          />
        </div>
      </Section>

      <Section label="Which path fits me?">
        <LegendaryPathFinder />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="What a Legendary gets you" tone="gold">
            Legendaries are the rarest characters in Neverland. Holding one earns the <strong>Legendary Holder</strong> badge,
            counts toward The Legendary title (all 50 characters), and can go shiny with a Mysterious Potion. Your voting
            power and USDC rewards come from your lock, the same as every veDUST.
          </Callout>
          <Callout title="Don't mix it up with the Legendary frame">
            The Legendary <em>Level</em> frame comes from having 10,000+ veDUST power, not from the character. See Tiers &amp;
            Levels for how frames work.
          </Callout>
        </div>
      </Section>
    </main>
  );
}

type Condition = { title: string; body: string };

function PathCard({
  letter,
  title,
  cost,
  steps,
  watch,
  conditionsIntro,
  conditions,
}: {
  letter: string;
  title: string;
  cost: string;
  steps?: string[];
  watch?: string[];
  conditionsIntro?: string;
  conditions?: Condition[];
}) {
  return (
    <div className="panel p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-legendary/15 text-lg font-bold text-legendary">
          {letter}
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="mt-3 text-sm font-semibold text-legendary">{cost}</p>
      {conditions && (
        <>
          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{conditionsIntro}</p>
          <ol className="mt-3 space-y-2">
            {conditions.map((c, i) => (
              <li key={c.title} className="inset flex gap-3 p-3.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-legendary/15 text-sm font-bold tabular-nums text-legendary">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-semibold">{c.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-ink-secondary">{c.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </>
      )}
      {steps && (
        <ol className="mt-4 space-y-2 text-sm leading-relaxed text-ink-secondary">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-2.5">
              <span className="mt-px text-xs font-bold tabular-nums text-ink-muted">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      )}
      {watch && (
        <div className="inset mt-4 p-4">
          <p className="label">Watch out</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-ink-secondary">
            {watch.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
