import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CharacterCard } from "@/components/CharacterCard";
import { ShinyToggle } from "@/components/ShinyToggle";
import { ArchetypeBadge, Section } from "@/components/ui";
import { ARCHETYPES, CHARACTERS, characterArt, getCharacter, shinyVideo } from "@/content/characters";
import { MAGIC_ITEMS, itemArt } from "@/content/magic";
import { LEGENDARY } from "@/content/rules";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCharacter((await params).slug);
  return c ? { title: c.name, description: `${c.name}, a ${ARCHETYPES[c.archetype].label} veDUST character.` } : {};
}

const fmt = (n: number) => n.toLocaleString("en-US");

export default async function CharacterPage({ params }: Props) {
  const c = getCharacter((await params).slug);
  if (!c) notFound();
  const a = ARCHETYPES[c.archetype];
  const isLegendary = c.archetype === "legendary";
  const items = MAGIC_ITEMS.filter((m) => m.compatibleWith.includes(c.archetype));
  const siblings = CHARACTERS.filter((o) => o.archetype === c.archetype && o.slug !== c.slug);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <Link href="/characters" className="btn-ghost mt-8">
        ← All characters
      </Link>
      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,420px)_1fr]">
        <ShinyToggle name={c.name} image={characterArt(c)} video={shinyVideo(c)} />
        <div>
          <ArchetypeBadge archetype={c.archetype} />
          <h1 className="text-gradient mt-3 font-display text-4xl tracking-title sm:text-5xl">{c.name}</h1>
          {c.pendingName && <p className="mt-2 text-sm text-ink-muted">Official name coming soon.</p>}

          <div className="mt-6 space-y-3">
            <div className="inset p-5">
              <p className="label">How to get {c.pendingName ? "this character" : c.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                {isLegendary ? (
                  <>
                    Open a new lock of {fmt(LEGENDARY.mintMinDust)}+ DUST, or use an Ancient Manuscript on a core veDUST
                    holding {fmt(LEGENDARY.manuscriptMinLockDust)}+ DUST. Either gives one of the 10 Legendaries.{" "}
                    <Link href="/legendary" className="font-semibold text-ink underline decoration-white/30 underline-offset-4">
                      Legendary guide
                    </Link>
                  </>
                ) : (
                  <>
                    Lock DUST to mint a veDUST with a core character. If you get a different {a.label}, a Rare Crystal rerolls
                    within {a.plural}. From another archetype, a Transmogrification Stew can land you here.
                  </>
                )}
              </p>
            </div>

            <div className="inset p-5">
              <p className="label">Character Magic that works on it</p>
              <ul className="mt-4 space-y-4">
                {items.map((m) => (
                  <li key={m.slug} className="flex items-center gap-3 text-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={itemArt(m.slug)} alt="" width={36} height={36} className="size-9 shrink-0 object-contain" />
                    <span>
                      <span className="font-semibold">{m.name}</span>{" "}
                      <span className="text-ink-muted tabular-nums">({fmt(m.costDust)} DUST)</span>
                      <span className="block text-ink-secondary">{m.effect}</span>
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={itemArt("tick-tock-clock")} alt="" width={36} height={36} className="size-9 shrink-0 object-contain" />
                  <span>
                    <span className="font-semibold">Tick-Tock Clock</span> <span className="text-ink-muted">(20 DUST)</span>
                    <span className="block text-ink-secondary">Skips the daily wait between shiny tries.</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Section label={`More ${a.plural}`}>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
          {siblings.map((o) => (
            <CharacterCard key={o.slug} c={o} compact />
          ))}
        </div>
      </Section>
    </main>
  );
}
