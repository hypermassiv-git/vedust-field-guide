"use client";

import { useState } from "react";
import { LEGENDARY, LOCK } from "@/content/rules";

type Answer = "none" | "core" | "legendary" | "olympic";

const fmt = (n: number) => n.toLocaleString("en-US");

export function LegendaryPathFinder() {
  const [has, setHas] = useState<Answer>("none");
  const [locked, setLocked] = useState(2_000);

  const manuscriptTopUp = Math.max(0, LEGENDARY.manuscriptMinLockDust - locked);

  return (
    <div className="panel grid gap-6 p-5 sm:p-8 md:grid-cols-2">
      <div className="space-y-5">
        <div>
          <p className="label">Do you already have a veDUST?</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(
              [
                ["none", "No"],
                ["core", "Yes, a Lost Boy, Mermaid, Pirate or Pixie"],
                ["legendary", "Yes, already Legendary"],
                ["olympic", "Yes, an Olympic edition"],
              ] as [Answer, string][]
            ).map(([v, label]) => (
              <button key={v} type="button" className="chip" aria-pressed={has === v} onClick={() => setHas(v)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        {has === "core" && (
          <label className="block">
            <span className="label">DUST locked in it</span>
            <input
              type="number"
              min={0}
              value={locked}
              onChange={(e) => setLocked(Math.max(0, Number(e.target.value) || 0))}
              className="inset mt-2 h-12 w-48 px-4 text-lg font-semibold tabular-nums outline-none"
            />
          </label>
        )}
      </div>

      <div className="space-y-3">
        <p className="label">Your options</p>
        {has === "legendary" && (
          <Option title="You're already there">
            Want more? Each new lock of {fmt(LEGENDARY.mintMinDust)}+ DUST mints another Legendary, and a Mysterious Potion
            can try to make it shiny.
          </Option>
        )}
        {has !== "legendary" && (
          <Option title={`${has === "core" ? "Path A: o" : "O"}pen a new lock of ${fmt(LEGENDARY.mintMinDust)}+ DUST`}>
            {has === "olympic" && (
              <>
                Olympic editions can&apos;t become Legendary: they can&apos;t use Character Magic yet, so an Ancient Manuscript
                won&apos;t work on them. A new lock instead{" "}
              </>
            )}
            {has === "olympic" ? "always" : "Always"} mints a Legendary, timed or Infinite Lock. Use DUST from your wallet in a brand-new lock: adding DUST to an
            existing lock or claiming rewards into one doesn&apos;t count.
          </Option>
        )}
        {has === "core" && (
          <Option
            title="Path B: use an Ancient Manuscript"
            cost={
              manuscriptTopUp > 0
                ? `Add ${fmt(manuscriptTopUp)} DUST to the lock, then ${fmt(LEGENDARY.manuscriptCost)} DUST for the Manuscript`
                : `${fmt(LEGENDARY.manuscriptCost)} DUST for the Manuscript`
            }
          >
            Turns the veDUST you already have into a Legendary for good. It needs at least{" "}
            {fmt(LEGENDARY.manuscriptMinLockDust)} DUST locked
            {manuscriptTopUp > 0 ? `, so top it up first (top-ups need ${LOCK.minDays}+ days left on the lock)` : ", which you have"}. Supply
            is limited.
          </Option>
        )}
        {has === "core" && (
          <p className="text-sm leading-relaxed text-ink-muted">
            Path A spends nothing but needs {fmt(LEGENDARY.mintMinDust)} DUST locked in a new position. Path B costs{" "}
            {fmt(LEGENDARY.manuscriptCost)} DUST outright but upgrades the veDUST you already own and keeps its shiny status.
          </p>
        )}
      </div>
    </div>
  );
}

function Option({ title, cost, children }: { title: string; cost?: string; children: React.ReactNode }) {
  return (
    <div className="inset p-4">
      <p className="font-semibold">{title}</p>
      {cost && <p className="mt-1 text-sm font-semibold text-legendary">{cost}</p>}
      <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{children}</p>
    </div>
  );
}
