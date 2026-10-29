"use client";

import { useMemo, useState } from "react";
import { LEVELS, TIERS, frameArt, frameFor, frameTimeline } from "@/lib/frames";
import { LOCK } from "@/content/rules";
import { TIER_COLOR } from "./FrameGrid";

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: n < 100 ? 1 : 0 });

function dateIn(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export function FrameSimulator() {
  const [dust, setDust] = useState(5_000);
  const [infinite, setInfinite] = useState(false);
  const [lockDays, setLockDays] = useState(365);
  const [day, setDay] = useState(0);

  const days = infinite ? null : lockDays;
  const timeline = useMemo(() => frameTimeline(dust, days), [dust, days]);
  const elapsed = infinite ? 0 : Math.min(day, lockDays);
  const now = frameFor(dust, infinite ? null : lockDays - elapsed);
  const levelLabel = LEVELS.find((l) => l.id === now.level)!.label;
  const tierLabel = TIERS.find((t) => t.id === now.tier)!.label;

  return (
    <div className="panel grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <label className="block">
          <span className="label">DUST locked</span>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="number"
              min={LOCK.newLockMinDust}
              value={dust}
              onChange={(e) => setDust(Math.max(0, Number(e.target.value) || 0))}
              className="inset h-12 w-40 px-4 text-lg font-semibold tabular-nums outline-none focus:border-violet-strong"
            />
            <div className="flex flex-wrap gap-1.5">
              {[50, 500, 5_000, 15_000].map((v) => (
                <button key={v} type="button" className="chip" aria-pressed={dust === v} onClick={() => setDust(v)}>
                  {fmt(v)}
                </button>
              ))}
            </div>
          </div>
        </label>

        <div>
          <span className="label">Lock length</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <button type="button" className="chip" aria-pressed={!infinite} onClick={() => setInfinite(false)}>
              Timed
            </button>
            <button type="button" className="chip" aria-pressed={infinite} onClick={() => setInfinite(true)}>
              Infinite
            </button>
          </div>
          {!infinite && (
            <div className="mt-3">
              <input
                type="range"
                min={LOCK.minDays}
                max={LOCK.maxDays}
                value={lockDays}
                onChange={(e) => {
                  setLockDays(Number(e.target.value));
                  setDay(0);
                }}
                className="w-full"
                aria-label="Lock length in days"
              />
              <p className="text-sm text-ink-secondary tabular-nums">{lockDays} days</p>
            </div>
          )}
        </div>

        {!infinite && (
          <div>
            <span className="label">Fast forward</span>
            <input
              type="range"
              min={0}
              max={lockDays}
              value={elapsed}
              onChange={(e) => setDay(Number(e.target.value))}
              className="mt-3 w-full"
              aria-label="Days from now"
            />
            <p className="text-sm text-ink-secondary tabular-nums">
              {elapsed === 0 ? "Today" : `In ${elapsed} days (${dateIn(elapsed)})`}, {lockDays - elapsed} days left
            </p>
          </div>
        )}

        <div>
          <span className="label">How this frame changes</span>
          {infinite ? (
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              Infinite Locks never decay. This frame stays {levelLabel} Diamond for as long as it stays an Infinite Lock.
            </p>
          ) : (
            <ol className="mt-2 space-y-1.5 text-sm">
              {timeline.map((c) => (
                <li key={c.day} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="w-28 shrink-0 text-ink-muted tabular-nums">{c.day === 0 ? "Today" : dateIn(c.day)}</span>
                  <span className="font-semibold">
                    {LEVELS.find((l) => l.id === c.level)!.label}{" "}
                    <span style={{ color: TIER_COLOR[c.tier] }}>{TIERS.find((t) => t.id === c.tier)!.label}</span>
                  </span>
                  <span className="text-ink-muted tabular-nums">({fmt(c.power)} veDUST)</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={frameArt(now.tier, now.level)} alt={`${levelLabel} ${tierLabel} frame`} width={300} height={300} className="w-full max-w-[300px] rounded-2xl" />
        <p className="text-xl font-bold">
          {levelLabel} <span style={{ color: TIER_COLOR[now.tier] }}>{tierLabel}</span>
        </p>
        <p className="text-sm text-ink-secondary tabular-nums">{fmt(now.power)} veDUST power</p>
        <p className="text-xs leading-relaxed text-ink-muted">
          {infinite
            ? "Diamond needs an Infinite Lock."
            : "Extending your lock or adding DUST moves the frame back up. Switching to an Infinite Lock gives Diamond."}
        </p>
      </div>
    </div>
  );
}
