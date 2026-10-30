import type { Metadata } from "next";
import { PowerExplorer } from "@/components/PowerExplorer";
import { PageHeader, Section } from "@/components/ui";
import { DOCS, GOVERNANCE, LOCK, REVENUE } from "@/content/rules";

export const metadata: Metadata = {
  title: "veDUST Basics",
  description: "Lock DUST to own a piece of Neverland: weekly USDC from protocol revenue, and a vote on where it goes next.",
};

const fmt = (n: number) => n.toLocaleString("en-US");

const REVENUE_SOURCES = [
  { title: "Borrow interest", body: "A slice of the interest borrowers pay in Neverland's lending markets." },
  { title: "Liquidations", body: `${REVENUE.liquidationFee * 100}% of the bonus paid when a loan is liquidated, on most markets.` },
  { title: "Flash loans", body: `The ${REVENUE.flashLoanPremium * 100}% fee on flash loans, on most main-market assets.` },
];

const VOTE_TOPICS = [
  { title: "Direction", body: "Where Neverland heads next." },
  { title: "Asset listings", body: "Which tokens can be supplied and borrowed." },
  { title: "Risk", body: "Major decisions on how risk is managed." },
  { title: "Governance", body: "How proposals and voting work." },
];

const RULES: { rule: string; detail: string }[] = [
  { rule: `Lock at least ${LOCK.newLockMinDust} DUST`, detail: `You can add more DUST to it later, as long as the lock has at least ${LOCK.minDays} days left.` },
  { rule: `Choose ${LOCK.minDays} days to 1 year, or an Infinite Lock`, detail: "Longer locks give more power. An Infinite Lock gives full power that never decays." },
  { rule: "Locks end on a Thursday", detail: `Unlock dates round down to ${LOCK.epochDay}, so a lock can end up to 6 days sooner than picked.` },
  { rule: "Your DUST stays locked until the end", detail: "Leaving early burns 25% to 75% of it. See the table below." },
  { rule: "You can merge, but not split", detail: "Two active locks combine into one with the later end date. An Infinite Lock can absorb a timed one, not the reverse." },
  { rule: "You can sell or send it", detail: "veDUST is an NFT, so it can be sold on marketplaces like OpenSea or sent to another wallet. Rewards earned before the transfer stay with the seller." },
];

const PENALTIES = [
  { left: "1 year left", cost: "75%" },
  { left: "6 months left", cost: "50%" },
  { left: "3 months left", cost: "37.5%" },
  { left: "1 month left", cost: "~29%" },
  { left: "Lock ended", cost: "0%" },
];

export default function BasicsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <PageHeader
        eyebrow="veDUST Basics"
        title="Own a piece of Neverland"
        intro="Lock your DUST and you get veDUST. It pays you part of what Neverland earns every week, in USDC, and gives you a vote on where Neverland goes next."
      />

      <Section label="What you get">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel flex flex-col p-6 sm:p-7">
            <p className="label">Perk 1</p>
            <h3 className="mt-2 text-2xl font-bold">Weekly USDC from Neverland&apos;s revenue</h3>
            <p className="mt-2 text-ink-secondary">
              Neverland earns fees from its lending markets. Part of that goes to veDUST holders, paid out in USDC every
              week.
            </p>
            <p className="label mt-5">Where it comes from</p>
            <ul className="inset mt-2 divide-y divide-white/[0.06]">
              {REVENUE_SOURCES.map((s) => (
                <li key={s.title} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 text-sm font-semibold sm:w-32">{s.title}</span>
                  <span className="text-sm leading-relaxed text-ink-secondary">{s.body}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2 pb-2 text-center text-ink-muted" aria-hidden>
              ↓
            </div>
            <div className="inset border-reward/30 p-4 text-center">
              <p className="font-semibold text-reward">
                Paid in{" "}
                <span className="whitespace-nowrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/tokens/usdc.svg" alt="" width={18} height={18} className="inline-block size-[18px] -translate-y-px align-middle" />{" "}
                  USDC
                </span>{" "}
                every week
              </p>
              <p className="mt-1 text-sm text-ink-secondary">
                Your cut = your veDUST power ÷ everyone&apos;s veDUST power
              </p>
            </div>
          </div>

          <div className="panel flex flex-col p-6 sm:p-7">
            <p className="label">Perk 2</p>
            <h3 className="mt-2 text-2xl font-bold">A vote on Neverland&apos;s future</h3>
            <p className="mt-2 text-ink-secondary">
              veDUST holders vote on the big decisions that shape Neverland. The more veDUST power you have, the more your
              vote counts.
            </p>
            <p className="label mt-5">What you vote on</p>
            <ul className="inset mt-2 divide-y divide-white/[0.06]">
              {VOTE_TOPICS.map((t) => (
                <li key={t.title} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="shrink-0 text-sm font-semibold sm:w-32">{t.title}</span>
                  <span className="text-sm leading-relaxed text-ink-secondary">{t.body}</span>
                </li>
              ))}
            </ul>
            {/* Side by side (lg+) the note sits above the arrow so both perk boxes line up; stacked, it follows the box. */}
            <p className="mt-3 text-sm text-ink-muted max-lg:order-last max-lg:mt-4">
              Votes are signed messages, not transactions. A proposal needs {fmt(GOVERNANCE.quorum)} veDUST to take part to
              count.{" "}
              <a href={DOCS.governance} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-ink">
                How voting works ↗
              </a>
            </p>
            <div className="mt-auto pt-2 pb-2 text-center text-ink-muted" aria-hidden>
              ↓
            </div>
            <div className="inset border-violet-strong/30 p-4 text-center">
              <p className="font-semibold text-violet-strong">Your votes = your veDUST power</p>
            </div>
          </div>
        </div>
      </Section>

      <Section label="Both perks grow with your power" title="How much power will I get?">
        <PowerExplorer />
      </Section>

      <Section label="Before you lock" title="The rules">
        <ol className="grid gap-3 md:grid-cols-2">
          {RULES.map((r, i) => (
            <li key={r.rule} className="panel flex gap-4 p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lavender/[0.12] text-sm font-bold tabular-nums text-lavender">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{r.rule}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{r.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="panel mt-4 p-5 sm:p-6">
          <p className="font-semibold">What leaving early costs</p>
          <p className="mt-1 text-sm text-ink-secondary">
            The burned part depends only on how long is left. Infinite Locks count as a full year.
          </p>
          {/* Phones: a simple list. Larger screens: five tiles in a row. */}
          <ul className="inset mt-4 divide-y divide-white/[0.06] sm:hidden">
            {PENALTIES.map((p) => (
              <li key={p.left} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <span className="text-ink-secondary">{p.left}</span>
                <span className={`font-bold tabular-nums ${p.cost === "0%" ? "text-low" : "text-high"}`}>{p.cost}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 hidden grid-cols-5 gap-2 text-center sm:grid">
            {PENALTIES.map((p) => (
              <div key={p.left} className="inset px-1 py-3">
                <p className={`font-bold tabular-nums ${p.cost === "0%" ? "text-low" : "text-high"}`}>{p.cost}</p>
                <p className="mt-0.5 text-xs leading-tight text-ink-muted">{p.left}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
