/*
 * The 50 veDUST characters. `index` matches the artwork file number on Neverland's CDN
 * (e.g. renders/pixies/pixie_8_<tier>_<level>.avif), which is how names were matched to art.
 * Names with `pendingName` haven't been confirmed yet and show a placeholder.
 */
export type Archetype = "mermaid" | "pixie" | "pirate" | "lostBoy" | "legendary";

export type Character = {
  slug: string;
  name: string;
  archetype: Archetype;
  index: number;
  pendingName?: boolean;
};

export const ARCHETYPES: Record<
  Archetype,
  { label: string; plural: string; artFile: string; artDir: string; collectionTitle: string; core: boolean }
> = {
  mermaid: { label: "Mermaid", plural: "Mermaids", artFile: "mermaid", artDir: "mermaids", collectionTitle: "Lagoon Lounger", core: true },
  pixie: { label: "Pixie", plural: "Pixies", artFile: "pixie", artDir: "pixies", collectionTitle: "Pixie Catcher", core: true },
  pirate: { label: "Pirate", plural: "Pirates", artFile: "pirate", artDir: "pirates", collectionTitle: "Pirate Captain", core: true },
  lostBoy: { label: "Lost Boy", plural: "Lost Boys", artFile: "lostboy", artDir: "lost-boys", collectionTitle: "Lost Boy Leader", core: true },
  legendary: { label: "Legendary", plural: "Legendaries", artFile: "legendary", artDir: "legendaries", collectionTitle: "The Legendary", core: false },
};

export const ARCHETYPE_ORDER: Archetype[] = ["lostBoy", "mermaid", "pirate", "pixie", "legendary"];

const NAMED: Record<Archetype, Record<number, string>> = {
  mermaid: {
    1: "Nerida", 2: "Tsuyu", 3: "Tempest", 4: "Crimsyn", 5: "Inga",
    6: "Coralie", 7: "Kailani", 8: "Pearl", 9: "Thalassa", 10: "Marina",
  },
  pixie: {
    1: "Sierra", 2: "Hikaru", 3: "Afina", 4: "Ember", 5: "Hazel",
    6: "Rayna", 7: "Aurelia", 8: "Luna", 9: "Seraphina", 10: "Nyx",
  },
  pirate: {
    1: "Boomskull Calder", 2: "Two Pistol Perry", 3: "Cutlass Jake", 4: "Blue Fins Phil", 5: "Needles Northwick",
    6: "Mad Barrel Billy", 7: "Finn Blackscale", 8: "Dread Roberts", 9: "Star-Eye Selwyn", 10: "Cpt George Redwake",
  },
  lostBoy: {
    1: "Tootles", 2: "Davy", 3: "Nibs", 4: "Cubby", 5: "Dan-Dan",
    6: "Benny", 7: "Gendry", 8: "Pip", 9: "Jack", 10: "Curly",
  },
  legendary: {
    1: "Peter Pan", 2: "Wendy Darling", 3: "Nadette", 4: "Captain Hook", 5: "Tick-Tock Croc",
    6: "Michael Darling", 7: "John Darling", 8: "Tiger Lily", 9: "Mr. Smee", 10: "Nana",
  },
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const CHARACTERS: Character[] = ARCHETYPE_ORDER.flatMap((archetype) =>
  Array.from({ length: 10 }, (_, i) => {
    const index = i + 1;
    const known = NAMED[archetype][index];
    const name = known ?? `${ARCHETYPES[archetype].label} #${index}`;
    return {
      slug: known ? slugify(known) : `${ARCHETYPES[archetype].artFile}-${index}`,
      name,
      archetype,
      index,
      ...(known ? {} : { pendingName: true }),
    };
  }),
);

export function characterArt(c: Pick<Character, "archetype" | "index">) {
  return `/art/characters/${ARCHETYPES[c.archetype].artFile}_${c.index}.avif`;
}

/** Diamond Legendary framed render. Only downloaded for the home page fan characters. */
export function framedArt(c: Pick<Character, "archetype" | "index">) {
  return `/art/framed/${ARCHETYPES[c.archetype].artFile}_${c.index}.avif`;
}

/** Shiny characters are animated; the videos are large, so they stream from Neverland's CDN on demand. */
export function shinyVideo(c: Pick<Character, "archetype" | "index">) {
  const a = ARCHETYPES[c.archetype];
  return `https://artwork.neverland.money/shinies/${a.artDir}/${a.artFile}_${c.index}.mp4`;
}

export function getCharacter(slug: string) {
  return CHARACTERS.find((c) => c.slug === slug);
}
