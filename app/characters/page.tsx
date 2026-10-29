import type { Metadata } from "next";
import Link from "next/link";
import { CharacterBrowser } from "@/components/CharacterBrowser";
import { PageHeader, Section } from "@/components/ui";
import { COLLECTION_TITLES } from "@/content/rules";

export const metadata: Metadata = {
  title: "All 50 characters",
  description: "Browse every veDUST character: 10 Lost Boys, 10 Mermaids, 10 Pirates, 10 Pixies and 10 Legendaries.",
};

export default function CharactersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <PageHeader
        eyebrow="Characters"
        title="Meet all 50"
        intro="Every veDUST carries one character. There are four core archetypes of 10 characters each, plus 10 Legendaries. Tap a character to see how to get it and what you can do with it."
      />
      <Section>
        <CharacterBrowser />
      </Section>
      <Section label="Collection titles" title="Collect them for a title">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTION_TITLES.map((t) => (
            <div key={t.name} className="panel p-5">
              <p className="font-semibold">{t.name}</p>
              <p className="mt-1 text-sm text-ink-secondary">{t.need}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          Shown on your Neverland profile. Rerolling with a{" "}
          <Link href="/magic#rare-crystal" className="font-semibold text-ink-secondary underline decoration-white/30 underline-offset-4 hover:text-ink">
            Rare Crystal
          </Link>{" "}
          or{" "}
          <Link href="/magic#transmogrification-stew" className="font-semibold text-ink-secondary underline decoration-white/30 underline-offset-4 hover:text-ink">
            Transmogrification Stew
          </Link>{" "}
          is the way to fill gaps.
        </p>
      </Section>
    </main>
  );
}
