import type { Archetype } from "./characters";

export type MagicKind = "shiny" | "cooldown" | "reroll" | "elevate";

export type MagicItem = {
  slug: string;
  name: string;
  costDust: number;
  kind: MagicKind;
  /** Archetypes it can be used on. Empty for the Tick-Tock Clock, which works on shiny attempts. */
  compatibleWith: Archetype[];
  effect: string;
  notes?: string;
};

const CORE: Archetype[] = ["lostBoy", "mermaid", "pirate", "pixie"];

export const MAGIC_ITEMS: MagicItem[] = [
  {
    slug: "rainbow-fruit",
    name: "Rainbow Fruit",
    costDust: 5,
    kind: "shiny",
    compatibleWith: ["lostBoy"],
    effect: "Tries to make a Lost Boy shiny.",
  },
  {
    slug: "enchanted-coral",
    name: "Enchanted Coral",
    costDust: 5,
    kind: "shiny",
    compatibleWith: ["mermaid"],
    effect: "Tries to make a Mermaid shiny.",
  },
  {
    slug: "lucky-doubloon",
    name: "Lucky Doubloon",
    costDust: 5,
    kind: "shiny",
    compatibleWith: ["pirate"],
    effect: "Tries to make a Pirate shiny.",
  },
  {
    slug: "fairy-wand",
    name: "Fairy Wand",
    costDust: 5,
    kind: "shiny",
    compatibleWith: ["pixie"],
    effect: "Tries to make a Pixie shiny.",
  },
  {
    slug: "mysterious-potion",
    name: "Mysterious Potion",
    costDust: 50,
    kind: "shiny",
    compatibleWith: ["legendary"],
    effect: "Tries to make a Legendary shiny.",
  },
  {
    slug: "tick-tock-clock",
    name: "Tick-Tock Clock",
    costDust: 20,
    kind: "cooldown",
    compatibleWith: [],
    effect: "Skips the once-a-day wait so you can make another shiny attempt today.",
    notes: "Used automatically when you try again before the 00:00 UTC reset.",
  },
  {
    slug: "rare-crystal",
    name: "Rare Crystal",
    costDust: 50,
    kind: "reroll",
    compatibleWith: [...CORE, "legendary"],
    effect: "Rerolls into a different character of the same archetype.",
    notes: "No daily limit.",
  },
  {
    slug: "transmogrification-stew",
    name: "Transmogrification Stew",
    costDust: 50,
    kind: "reroll",
    compatibleWith: CORE,
    effect: "Rerolls into a character from another core archetype. Never gives a Legendary.",
    notes: "No daily limit.",
  },
  {
    slug: "ancient-manuscript",
    name: "Ancient Manuscript",
    costDust: 1_000,
    kind: "elevate",
    compatibleWith: CORE,
    effect: "Permanently turns a core character into a Legendary.",
    notes: "The veDUST must hold at least 15,000 DUST. Limited supply. Shiny status and attempt progress carry over.",
  },
];

export const MAGIC_KIND_LABEL: Record<MagicKind, string> = {
  shiny: "Shiny attempt",
  cooldown: "Cooldown skip",
  reroll: "Reroll",
  elevate: "Make Legendary",
};

/** Item art from Nadette's Shop, saved by `npm run fetch:art`. */
export function itemArt(slug: string) {
  return `/art/items/${slug}.avif`;
}
