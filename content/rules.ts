/*
 * Every number the site shows, in one place. Sources:
 * https://docs.neverland.money/profiles-and-shop and https://docs.neverland.money/vedust-mechanics
 */
export const DOCS = {
  profilesAndShop: "https://docs.neverland.money/profiles-and-shop",
  vedustMechanics: "https://docs.neverland.money/vedust-mechanics",
  leaderboard: "https://docs.neverland.money/leaderboard",
  governance: "https://docs.neverland.money/governance",
  revenue: "https://docs.neverland.money/revenue-distribution",
  app: "https://app.neverland.money/governance",
};

export const LOCK = {
  minDays: 28,
  maxDays: 365,
  newLockMinDust: 10,
  topUpMinDust: 1,
  /** Unlock times round down to Thursday 00:00 UTC. */
  epochDay: "Thursday 00:00 UTC",
  penaltyFloor: 0.25,
  penaltyMax: 0.75,
};

export const SHINY = {
  baseChance: 0.01,
  stepPerFail: 0.005,
  guaranteedAttempt: 199,
  attemptsPerDay: 1,
  resetTime: "00:00 UTC",
  pearlBoost: 0.05,
};

export const LEGENDARY = {
  mintMinDust: 10_000,
  manuscriptMinLockDust: 15_000,
  manuscriptCost: 1_000,
};

export const COLLECTION_TITLES = [
  { name: "Collector", need: "20 unique characters" },
  { name: "Curator", need: "40 unique characters" },
  { name: "The Legendary", need: "All 50 characters" },
  { name: "Lost Boy Leader", need: "All 10 Lost Boys" },
  { name: "Lagoon Lounger", need: "All 10 Mermaids" },
  { name: "Pirate Captain", need: "All 10 Pirates" },
  { name: "Pixie Catcher", need: "All 10 Pixies" },
];

export const REVENUE = {
  payoutToken: "USDC",
  payoutDay: "Thursday 00:00 UTC",
  flashLoanPremium: 0.005,
  /** Protocol's cut of the liquidation bonus on most reserves (lending-model docs). */
  liquidationFee: 0.1,
};

export const GOVERNANCE = {
  votingDays: 7,
  quorum: 500_000,
  portal: "https://vote.neverland.money",
};
