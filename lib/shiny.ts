import { SHINY } from "@/content/rules";

/** Chance that attempt number `n` (1-based) succeeds, given every earlier attempt failed. */
export function chanceOnAttempt(n: number) {
  return Math.min(1, SHINY.baseChance + SHINY.stepPerFail * (n - 1));
}

/** Chance of being shiny after at most `n` attempts, starting from `progress` earlier failures. */
export function chanceWithin(n: number, progress = 0) {
  let miss = 1;
  for (let k = 1; k <= n; k++) miss *= 1 - chanceOnAttempt(progress + k);
  return 1 - miss;
}

/** Cumulative curve, one point per attempt, until it reaches 100%. */
export function cumulativeCurve(progress = 0) {
  const points: { attempt: number; chance: number }[] = [];
  let miss = 1;
  for (let k = 1; progress + k <= SHINY.guaranteedAttempt; k++) {
    miss *= 1 - chanceOnAttempt(progress + k);
    points.push({ attempt: k, chance: 1 - miss });
    if (miss <= 0) break;
  }
  return points;
}

/** Average number of attempts until shiny. */
export function expectedAttempts(progress = 0) {
  let total = 0;
  let miss = 1;
  for (let k = 1; progress + k <= SHINY.guaranteedAttempt; k++) {
    total += miss;
    miss *= 1 - chanceOnAttempt(progress + k);
    if (miss <= 0) break;
  }
  return total;
}

/** Smallest number of attempts that reaches at least `target` chance. */
export function attemptsForChance(target: number, progress = 0) {
  const curve = cumulativeCurve(progress);
  return (curve.find((p) => p.chance >= target - 1e-12) ?? curve[curve.length - 1]).attempt;
}
