import type { Metadata } from "next";
import Link from "next/link";
import { CharacterCard } from "@/components/CharacterCard";
import { LegendaryPathFinder } from "@/components/LegendaryPathFinder";
import { Callout, PageHeader, Section, ShopLink } from "@/components/ui";
import { CHARACTERS, characterArt } from "@/content/characters";
import { itemArt } from "@/content/magic";
import { LEGENDARY } from "@/content/rules";

export const metadata: Metadata = {
  title: "How to get a Legendary",
  description:
    "The two ways to get one of the 10 Legendary veDUST characters, and which one suits you.",
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
        {/*
          Phones: two rows of large cards gliding in opposite directions, faded at the edges.
          Each row is drawn twice so the loop is seamless; the copy is inert and hidden from screen readers.
          Larger screens: two rows of five.
        */}
        <div className="marquee -mx-4 space-y-3 sm:hidden">
          {[legendaries.slice(0, 5), legendaries.slice(5)].map((row, r) => (
            <div key={r} className="overflow-hidden py-1">
              <div
                className={`marquee-track flex w-max ${r === 1 ? "marquee-reverse" : ""}`}
              >
                {[...row, ...row].map((c, i) => {
                  const copy = i >= row.length;
                  return (
                    <Link
                      key={i}
                      href={`/characters/${c.slug}`}
                      className={`w-40 shrink-0 pr-3 ${copy ? "marquee-copy" : ""}`}
                      aria-hidden={copy || undefined}
                      tabIndex={copy ? -1 : undefined}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={characterArt(c)}
                        alt={copy ? "" : c.name}
                        width={160}
                        height={160}
                        className="aspect-square w-full rounded-2xl shadow-lg shadow-black/40 ring-1 ring-legendary/30"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden grid-cols-5 gap-3 sm:grid">
          {legendaries.map((c) => (
            <CharacterCard key={c.slug} c={c} compact />
          ))}
        </div>
      </Section>

      <Section label="The two paths" title="Start fresh or upgrade">
        <p className="-mt-2 mb-5 max-w-2xl text-ink-secondary">
          Path A uses DUST from your wallet to open a new veDUST. Path B turns a
          veDUST you already own into a Legendary.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <PathCard
            letter="A"
            title="Open a big new lock"
            conditionsIntro="The new veDUST always comes with a Legendary character, as long as all 3 conditions are met:"
            conditions={[
              {
                title: "DUST from your wallet",
                body: "Lock DUST you already hold. Claiming rewards straight into a lock doesn't count.",
              },
              {
                title: "A brand-new lock",
                body: "Open a new veDUST. Adding DUST to a lock you already have doesn't count.",
              },
              {
                title: `At least ${fmt(LEGENDARY.mintMinDust)} DUST`,
                body: "In that one new lock. Timed or Infinite Lock both work.",
              },
            ]}
          />
          <PathCard letter="B" title="Use an Ancient Manuscript">
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
              Upgrade a Lost Boy, Mermaid, Pirate or Pixie you already own.
              Instead of {fmt(LEGENDARY.mintMinDust)} DUST in a new lock, it
              needs two things:
            </p>
            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
              <div className="inset flex flex-col items-center justify-center p-4 text-center">
                <p className="text-2xl font-bold tabular-nums text-legendary">
                  {fmt(LEGENDARY.manuscriptMinLockDust)}+
                </p>
                <p className="mt-1 text-sm leading-snug text-ink-secondary">
                  DUST locked in that veDUST
                </p>
              </div>
              <span
                aria-hidden
                className="self-center text-xl font-bold text-ink-muted"
              >
                +
              </span>
              <div className="inset flex flex-col items-center justify-center p-4 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={itemArt("ancient-manuscript")}
                  alt=""
                  width={56}
                  height={56}
                  className="size-12 object-contain"
                />
                <p className="mt-1 text-sm font-semibold leading-snug">
                  Ancient Manuscript
                </p>
                <p className="text-xs text-ink-muted">
                  {fmt(LEGENDARY.manuscriptCost)} DUST in <ShopLink />
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
              Use the Manuscript on the veDUST and it becomes Legendary for
              good, keeping its shiny status and shiny progress.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Manuscripts are limited and can sell out. Olympic editions
              can&apos;t use them.
            </p>
          </PathCard>
        </div>
      </Section>

      <Section label="Which path fits me?">
        <LegendaryPathFinder />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout title="What a Legendary gets you" tone="gold">
            Legendaries are the rarest characters in Neverland. Holding one
            earns the <strong>Legendary Holder</strong> badge, counts toward The
            Legendary title (all 50 characters), and can go shiny with a
            Mysterious Potion. Your voting power and USDC rewards come from your
            lock, the same as every veDUST.
          </Callout>
          <Callout title="Don't mix it up with the Legendary frame">
            The Legendary <em>Level</em> frame comes from having 10,000+ veDUST
            power, not from the character. See Tiers &amp; Levels for how frames
            work.
          </Callout>
        </div>
      </Section>
    </main>
  );
}

type Condition = { title: string; body: React.ReactNode };

function PathCard({
  letter,
  title,
  conditionsIntro,
  conditions,
  children,
}: {
  letter: string;
  title: string;
  conditionsIntro?: string;
  conditions?: Condition[];
  children?: React.ReactNode;
}) {
  return (
    <div className="panel p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-legendary/15 text-lg font-bold text-legendary">
          {letter}
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      {conditionsIntro && (
        <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
          {conditionsIntro}
        </p>
      )}
      {conditions && (
        <ol className="mt-3 space-y-2">
          {conditions.map((c, i) => (
            <li key={c.title} className="inset flex gap-3 p-3.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-legendary/15 text-sm font-bold tabular-nums text-legendary">
                {i + 1}
              </span>
              <span>
                <span className="block font-semibold">{c.title}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-ink-secondary">
                  {c.body}
                </span>
              </span>
            </li>
          ))}
        </ol>
      )}
      {children}
    </div>
  );
}
