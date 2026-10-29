import { LOCK } from "@/content/rules";

/** veDUST power for `dust` locked with `daysLeft` remaining. `null` means an infinite lock. */
export function votingPower(dust: number, daysLeft: number | null) {
  if (daysLeft === null) return dust;
  return (dust * Math.max(0, Math.min(daysLeft, LOCK.maxDays))) / LOCK.maxDays;
}

/** Share of the locked DUST lost when unlocking early. Infinite locks convert to a 365-day lock first. */
export function earlyUnlockPenalty(daysLeft: number | null) {
  const d = daysLeft === null ? LOCK.maxDays : Math.min(daysLeft, LOCK.maxDays);
  if (d <= 0) return 0;
  return LOCK.penaltyFloor + ((LOCK.penaltyMax - LOCK.penaltyFloor) * d) / LOCK.maxDays;
}
