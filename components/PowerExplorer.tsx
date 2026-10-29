"use client";

import { useState } from "react";
import { votingPower } from "@/lib/lock";
import { LOCK } from "@/content/rules";

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

const LENGTHS: { label: string; days: number | null }[] = [
  { label: "1 month", days: 30 },
  { label: "3 months", days: 91 },
  { label: "6 months", days: 182 },
  { label: "1 year", days: 365 },
  { label: "Infinite", days: null },
];

function dateIn(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Two plain questions instead of a decay chart:
 *   1. How much power does each lock length give for my DUST?
 *   2. How does that power change from today until unlock?
 */
export function PowerExplorer() {
  const [dust, setDust] = useState(1_000);
  const [pick, setPick] = useState(3);
  const chosen = LENGTHS[pick];
  const power = votingPower(dust, chosen.days);

  const milestones =
    chosen.days === null
      ? []
      : [0, 0.25, 0.5, 0.75, 1].map((f) => {
          const elapsed = Math.round(chosen.days! * f);
          return { elapsed, left: chosen.days! - elapsed, power: votingPower(dust, chosen.days! - elapsed) };
        });

  return (
    <div className="panel p-5 sm:p-8">
      <label className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-lg font-semibold">If I lock</span>
        <input
          type="number"
          min={LOCK.newLockMinDust}
          value={dust}
          onChange={(e) => setDust(Math.max(0, Number(e.target.value) || 0))}
          className="inset h-11 w-32 px-4 text-lg font-semibold tabular-nums outline-none"
          aria-label="DUST to lock"
        />
        <span className="text-lg font-semibold">DUST,</span>
        <span className="w-full text-lg font-semibold sm:w-auto">how much power do I get?</span>
      </label>

      <div className="mt-6 space-y-2">
        {LENGTHS.map((l, i) => {
          const p = votingPower(dust, l.days);
          const width = dust > 0 ? (p / dust) * 100 : 0;
          return (
            <button
              key={l.label}
              type="button"
              onClick={() => setPick(i)}
              aria-pressed={pick === i}
              className="group grid w-full grid-cols-[64px_1fr_52px] items-center gap-2 rounded-xl p-1.5 text-left transition-colors hover:bg-white/[0.03] aria-pressed:bg-white/[0.06] sm:grid-cols-[100px_1fr_120px] sm:gap-3"
            >
              <span className="text-xs font-semibold text-ink-secondary group-aria-pressed:text-ink sm:text-sm">{l.label}</span>
              <span className="h-6 overflow-hidden rounded-lg bg-white/[0.05] sm:h-7">
                <span
                  className="block h-full rounded-lg bg-gradient-to-r from-brand-to to-violet-strong transition-[width] duration-300"
                  style={{ width: `${Math.max(width, 1.5)}%` }}
                />
              </span>
              <span className="text-right text-sm tabular-nums text-ink-secondary">
                <span className="font-semibold text-ink">{fmt(p)}</span>
                <span className="hidden sm:inline"> veDUST</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-ink-muted">
        A 1-year or Infinite Lock gives 1 veDUST per DUST. Shorter locks give less: half a year gives about half.
      </p>

      <div className="inset mt-6 p-5">
        <p className="label">What happens to my {chosen.days === null ? "Infinite Lock" : `${chosen.label.toLowerCase()} lock`} over time</p>
        {chosen.days === null ? (
          <p className="mt-3 text-ink-secondary">
            Nothing. An Infinite Lock keeps <strong className="text-ink">{fmt(power)} veDUST</strong> every week, for as long
            as it stays locked.
          </p>
        ) : (
          <>
            {/*
              Power falls in a straight line from today to unlock. The shaded slope shows how much is left;
              labels sit in HTML on top so the SVG can stretch to any width without distorting text.
            */}
            <div className="relative mt-6 h-44 sm:h-52">
              <div className="absolute inset-x-[6%] bottom-12 top-8">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
                  <defs>
                    <linearGradient id="decay-fill" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--color-violet-strong)" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="var(--color-violet-strong)" stopOpacity="0.04" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 100,100 0,100" fill="url(#decay-fill)" />
                  <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.12)" vectorEffect="non-scaling-stroke" />
                  <line x1="0" y1="0" x2="100" y2="100" stroke="var(--color-violet-strong)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                </svg>
                {milestones.map((m, i) => {
                  const left = i * 25;
                  const top = 100 - (dust > 0 ? (m.power / dust) * 100 : 0);
                  return (
                    <div key={i} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
                      <span className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-night-deep bg-lavender" />
                      <span
                        className={`absolute bottom-3 whitespace-nowrap text-sm font-bold tabular-nums ${i === 0 ? "left-0 -translate-x-1" : i === 4 ? "right-0 translate-x-1" : "left-1/2 -translate-x-1/2"}`}
                      >
                        {fmt(m.power)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <ol className="absolute inset-x-[6%] bottom-0 h-10">
                {milestones.map((m, i) => (
                  <li
                    key={i}
                    className={`absolute top-0 whitespace-nowrap text-center ${i === 0 ? "-translate-x-[20%]" : i === 4 ? "-translate-x-[80%]" : "hidden -translate-x-1/2 sm:block"}`}
                    style={{ left: `${i * 25}%` }}
                  >
                    <span className="block text-xs font-semibold text-ink-secondary">
                      {i === 0 ? "Today" : i === 4 ? "Unlock" : dateIn(m.elapsed)}
                    </span>
                    <span className="block text-[11px] text-ink-muted tabular-nums">
                      {i === 4 ? dateIn(m.elapsed) : `${m.left} days left`}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
              Your power shrinks a little every day as the unlock date gets closer, and hits zero when the lock ends. Your
              DUST is still all there: you get it back at unlock. To keep your power up, extend the lock or switch to an Infinite Lock.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
