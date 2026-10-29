import { votingPower } from "./lock";

/*
 * A veDUST frame has two parts, named as in the NFT metadata:
 *   Level (frame style) from current veDUST power.
 *   Tier (frame gem) from days left on the lock.
 * Both update live, so a timed lock slides down over time.
 */
export type Level = "common" | "fine" | "epic" | "legendary";
export type Tier = "sapphire" | "emerald" | "ruby" | "diamond";

export const LEVELS: { id: Level; label: string; min: number; range: string }[] = [
  { id: "common", label: "Common", min: 0, range: "0 to 99 veDUST power" },
  { id: "fine", label: "Fine", min: 100, range: "100 to 999 veDUST power" },
  { id: "epic", label: "Epic", min: 1_000, range: "1,000 to 9,999 veDUST power" },
  { id: "legendary", label: "Legendary", min: 10_000, range: "10,000+ veDUST power" },
];

export const TIERS: { id: Tier; label: string; minDays: number; range: string }[] = [
  { id: "sapphire", label: "Sapphire", minDays: 0, range: "0 to 119 days left" },
  { id: "emerald", label: "Emerald", minDays: 120, range: "120 to 269 days left" },
  { id: "ruby", label: "Ruby", minDays: 270, range: "270 to 365 days left" },
  { id: "diamond", label: "Diamond", minDays: Infinity, range: "Infinite Lock" },
];

export function levelFor(power: number): Level {
  return [...LEVELS].reverse().find((l) => power >= l.min)!.id;
}

export function tierFor(daysLeft: number | null): Tier {
  if (daysLeft === null) return "diamond";
  return [...TIERS].reverse().find((t) => daysLeft >= t.minDays)!.id;
}

export function frameFor(dust: number, daysLeft: number | null) {
  const power = votingPower(dust, daysLeft);
  return { power, level: levelFor(power), tier: tierFor(daysLeft) };
}

export function frameArt(tier: Tier, level: Level) {
  return `/art/frames/${tier}_${level}.avif`;
}

export type FrameChange = { day: number; daysLeft: number; level: Level; tier: Tier; power: number };

/**
 * Every day on which a timed lock's frame changes, starting with day 0.
 * Infinite locks never change, so they return a single entry.
 */
export function frameTimeline(dust: number, lockDays: number | null): FrameChange[] {
  if (lockDays === null) {
    const f = frameFor(dust, null);
    return [{ day: 0, daysLeft: Infinity, ...f }];
  }
  const out: FrameChange[] = [];
  for (let day = 0; day <= lockDays; day++) {
    const daysLeft = lockDays - day;
    const f = frameFor(dust, daysLeft);
    const prev = out[out.length - 1];
    if (!prev || prev.level !== f.level || prev.tier !== f.tier) out.push({ day, daysLeft, ...f });
  }
  return out;
}
