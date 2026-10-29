import { describe, expect, it } from "vitest";
import { attemptsForChance, chanceOnAttempt, chanceWithin, cumulativeCurve, expectedAttempts } from "@/lib/shiny";
import { earlyUnlockPenalty, votingPower } from "@/lib/lock";
import { frameFor, frameTimeline, levelFor, tierFor } from "@/lib/frames";

describe("shiny odds", () => {
  it("starts at 1% and rises 0.5% per failure", () => {
    expect(chanceOnAttempt(1)).toBeCloseTo(0.01);
    expect(chanceOnAttempt(2)).toBeCloseTo(0.015);
    expect(chanceOnAttempt(101)).toBeCloseTo(0.51);
  });

  it("is guaranteed on attempt 199", () => {
    expect(chanceOnAttempt(199)).toBe(1);
    expect(chanceOnAttempt(198)).toBeLessThan(1);
    expect(chanceWithin(199)).toBe(1);
  });

  it("cumulative curve only goes up and ends at 100%", () => {
    const curve = cumulativeCurve();
    for (let i = 1; i < curve.length; i++) expect(curve[i].chance).toBeGreaterThanOrEqual(curve[i - 1].chance);
    expect(curve[curve.length - 1].chance).toBe(1);
  });

  it("carries earlier progress", () => {
    expect(chanceWithin(1, 198)).toBe(1);
    expect(expectedAttempts(100)).toBeLessThan(expectedAttempts(0));
  });

  it("gives sensible averages", () => {
    const e = expectedAttempts();
    expect(e).toBeGreaterThan(15);
    expect(e).toBeLessThan(25);
    expect(attemptsForChance(0.5)).toBeLessThan(attemptsForChance(0.9));
  });
});

describe("lock math", () => {
  it("gives 1 veDUST per DUST at 365 days or infinite", () => {
    expect(votingPower(1000, 365)).toBe(1000);
    expect(votingPower(1000, null)).toBe(1000);
    expect(votingPower(1000, 0)).toBe(0);
  });

  it("matches the documented early-unlock penalties", () => {
    expect(earlyUnlockPenalty(365)).toBeCloseTo(0.75);
    expect(earlyUnlockPenalty(182.5)).toBeCloseTo(0.5);
    expect(earlyUnlockPenalty(91.25)).toBeCloseTo(0.375);
    expect(earlyUnlockPenalty(30)).toBeCloseTo(0.291, 2);
    expect(earlyUnlockPenalty(0)).toBe(0);
    expect(earlyUnlockPenalty(null)).toBeCloseTo(0.75);
  });
});

describe("frames", () => {
  it("picks the level from veDUST power", () => {
    expect(levelFor(99.99)).toBe("common");
    expect(levelFor(100)).toBe("fine");
    expect(levelFor(999)).toBe("fine");
    expect(levelFor(1000)).toBe("epic");
    expect(levelFor(9999)).toBe("epic");
    expect(levelFor(10000)).toBe("legendary");
  });

  it("picks the tier from days left", () => {
    expect(tierFor(0)).toBe("sapphire");
    expect(tierFor(119)).toBe("sapphire");
    expect(tierFor(120)).toBe("emerald");
    expect(tierFor(269)).toBe("emerald");
    expect(tierFor(270)).toBe("ruby");
    expect(tierFor(365)).toBe("ruby");
    expect(tierFor(null)).toBe("diamond");
  });

  it("matches token #1: infinite 14,000 DUST is Legendary Diamond", () => {
    expect(frameFor(14_000, null)).toMatchObject({ level: "legendary", tier: "diamond" });
  });

  it("slides down over a timed lock", () => {
    const t = frameTimeline(20_000, 365);
    expect(t[0]).toMatchObject({ level: "legendary", tier: "ruby" });
    expect(t[t.length - 1]).toMatchObject({ level: "common", tier: "sapphire" });
    expect(frameFor(20_000, 0)).toMatchObject({ level: "common", tier: "sapphire" });
    expect(frameTimeline(500, null)).toHaveLength(1);
  });
});
