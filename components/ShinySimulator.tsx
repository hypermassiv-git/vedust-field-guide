"use client";

import { useMemo, useState } from "react";
import { attemptsForChance, chanceOnAttempt, cumulativeCurve, expectedAttempts } from "@/lib/shiny";
import { SHINY } from "@/content/rules";

const NEAR_CERTAIN = 0.9995;
import { MAGIC_ITEMS } from "@/content/magic";

const CORE_COST = MAGIC_ITEMS.find((m) => m.slug === "fairy-wand")!.costDust;
const LEGENDARY_COST = MAGIC_ITEMS.find((m) => m.slug === "mysterious-potion")!.costDust;
const CLOCK_COST = MAGIC_ITEMS.find((m) => m.slug === "tick-tock-clock")!.costDust;

/** Shows one decimal near the top, rounded down, so nothing reads 100% before the curve really gets there. */
const pct = (x: number) => {
  if (x >= NEAR_CERTAIN) return "100%";
  if (x >= 0.99) return `${(Math.floor(x * 1000) / 10).toFixed(1)}%`;
  return `${(x * 100).toLocaleString("en-US", { maximumFractionDigits: x < 0.1 ? 1 : 0 })}%`;
};
const num = (x: number) => Math.round(x).toLocaleString("en-US");

const W = 560;
const H = 220;
const PAD = { l: 44, r: 12, t: 12, b: 28 };

export function ShinySimulator() {
  const [legendary, setLegendary] = useState(false);
  const [progress, setProgress] = useState(0);
  const [attempts, setAttempts] = useState(20);
  const [rush, setRush] = useState(false);

  // The curve stops once the chance reaches 100% (to one decimal). More tries after that add nothing visible.
  const curve = useMemo(() => {
    const full = cumulativeCurve(progress);
    const end = full.findIndex((p) => p.chance >= NEAR_CERTAIN);
    return end === -1 ? full : full.slice(0, end + 1);
  }, [progress]);
  const maxAttempts = curve.length;
  const n = Math.min(attempts, maxAttempts);
  const chance = curve[n - 1].chance;
  const avg = expectedAttempts(progress);
  const itemCost = legendary ? LEGENDARY_COST : CORE_COST;
  // Spending all `n` attempts in one day: the first is free of cooldown, the rest each burn a clock.
  const cost = n * itemCost + (rush ? (n - 1) * CLOCK_COST : 0);

  const x = (a: number) => PAD.l + ((a - 1) / Math.max(1, maxAttempts - 1)) * (W - PAD.l - PAD.r);
  const y = (c: number) => PAD.t + (1 - c) * (H - PAD.t - PAD.b);
  const path = curve.map((p, i) => `${i ? "L" : "M"}${x(p.attempt).toFixed(1)},${y(p.chance).toFixed(1)}`).join("");

  return (
    <div className="panel grid gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0 space-y-5">
        <div className="flex flex-wrap gap-1.5">
          <button type="button" className="chip" aria-pressed={!legendary} onClick={() => setLegendary(false)}>
            Core character ({CORE_COST} DUST per try)
          </button>
          <button type="button" className="chip" aria-pressed={legendary} onClick={() => setLegendary(true)}>
            Legendary ({LEGENDARY_COST} DUST per try)
          </button>
        </div>

        <label className="block">
          <span className="label">Failed attempts so far on this veDUST</span>
          <input
            type="range"
            min={0}
            max={SHINY.guaranteedAttempt - 1}
            value={progress}
            onChange={(e) => {
              setProgress(Number(e.target.value));
              setAttempts(1);
            }}
            className="mt-3 w-full"
          />
          <span className="text-sm text-ink-secondary tabular-nums">
            {progress} failed, so the next try has a {pct(chanceOnAttempt(progress + 1))} chance
          </span>
        </label>

        <label className="block">
          <span className="label">Number of tries</span>
          <input type="range" min={1} max={maxAttempts} value={n} onChange={(e) => setAttempts(Number(e.target.value))} className="mt-3 w-full" />
          <span className="text-sm text-ink-secondary tabular-nums">
            {n} {n === 1 ? "try" : "tries"} from now. Each try uses one {legendary ? "Mysterious Potion" : "Rainbow Fruit, Enchanted Coral, Lucky Doubloon or Fairy Wand"}.
          </span>
        </label>

        {/* Axis labels are HTML so they stay readable when the chart shrinks on phones. */}
        <div className="relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Chance of shiny rises to ${pct(chance)} after ${n} attempts`}>
            {[0, 0.25, 0.5, 0.75, 1].map((c) => (
              <line key={c} x1={PAD.l} x2={W - PAD.r} y1={y(c)} y2={y(c)} stroke="rgba(255,255,255,0.08)" />
            ))}
            <path d={path} fill="none" stroke="var(--color-violet-strong)" strokeWidth={2.5} strokeLinejoin="round" />
            <line x1={x(n)} x2={x(n)} y1={PAD.t} y2={H - PAD.b} stroke="var(--color-lavender)" strokeDasharray="3 4" />
            <circle cx={x(n)} cy={y(chance)} r={5} fill="var(--color-lavender)" />
          </svg>
          {[0, 0.25, 0.5, 0.75, 1].map((c) => (
            <span
              key={c}
              className="absolute left-0 -translate-y-1/2 text-right text-xs tabular-nums text-ink-muted"
              style={{ top: `${(y(c) / H) * 100}%`, width: `${((PAD.l - 8) / W) * 100}%` }}
            >
              {c * 100}%
            </span>
          ))}
          <span className="absolute bottom-0 text-xs text-ink-muted" style={{ left: `${(PAD.l / W) * 100}%` }}>
            1
          </span>
          <span className="absolute bottom-0 right-0 text-xs text-ink-muted">
            {maxAttempts} {maxAttempts === 1 ? "try" : "tries"}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-ink-muted">
          Chances are rounded to one decimal. By the end of the chart, fewer than 1 in 2,000 veDUSTs are still not
          shiny.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1">
        <div className="col-span-3 lg:col-span-1">
          <Stat label={`Chance of shiny within ${n} tries`} value={pct(chance)} big />
        </div>
        <Stat label="Average tries needed" value={avg.toFixed(1)} />
        <Stat label="Tries for a 90% chance" value={String(attemptsForChance(0.9, progress))} />
        <Stat label="99.9%+ chance by try" value={String(maxAttempts)} />
        <div className="inset col-span-3 p-4 lg:col-span-1">
          <p className="label">Most you&apos;d spend</p>
          <p className="mt-1 text-2xl font-bold tabular-nums">{num(cost)} DUST</p>
          <label className="mt-2 flex items-start gap-2 text-sm text-ink-secondary">
            <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} className="mt-1 accent-violet-strong" />
            <span>
              Do them all today with Tick-Tock Clocks (+{CLOCK_COST} DUST each) instead of one a day over {n} days
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className={`inset ${big ? "p-4" : "p-3 sm:p-4"}`}>
      <p className={big ? "label" : "label !text-[0.6rem] !tracking-[0.12em] sm:!text-[0.68rem] sm:!tracking-[0.18em]"}>{label}</p>
      <p className={`mt-1 font-bold tabular-nums ${big ? "text-3xl text-lavender" : "text-lg sm:text-xl"}`}>{value}</p>
    </div>
  );
}
