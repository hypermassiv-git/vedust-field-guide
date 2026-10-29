"use client";

import { useState } from "react";
import type { Archetype } from "@/content/characters";
import { ARCHETYPES, ARCHETYPE_ORDER, CHARACTERS } from "@/content/characters";
import { CharacterCard } from "./CharacterCard";
import { ARCHETYPE_COLOR } from "./ui";

export function CharacterBrowser() {
  const [filter, setFilter] = useState<Archetype | "all">("all");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = CHARACTERS.filter((c) => (filter === "all" || c.archetype === filter) && (!q || c.name.toLowerCase().includes(q)));

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          <button type="button" className="chip" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            All 50
          </button>
          {ARCHETYPE_ORDER.map((a) => (
            <button key={a} type="button" className="chip" aria-pressed={filter === a} onClick={() => setFilter(a)}>
              <span className="size-1.5 rounded-full" style={{ backgroundColor: ARCHETYPE_COLOR[a] }} aria-hidden />
              {ARCHETYPES[a].plural}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search by name"
          aria-label="Search characters by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="inset h-10 w-full px-4 text-sm outline-none placeholder:text-ink-muted sm:w-56"
        />
      </div>

      {ARCHETYPE_ORDER.map((a) => {
        const group = shown.filter((c) => c.archetype === a);
        if (!group.length) return null;
        return (
          <section key={a} className="mt-10">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-xl tracking-title" style={{ color: ARCHETYPE_COLOR[a] }}>
                {ARCHETYPES[a].plural}
              </h2>
              <p className="text-xs text-ink-muted">
                Collect all 10: <span className="font-semibold text-ink-secondary">{ARCHETYPES[a].core ? ARCHETYPES[a].collectionTitle : "counts toward The Legendary"}</span>
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {group.map((c) => (
                <CharacterCard key={c.slug} c={c} />
              ))}
            </div>
          </section>
        );
      })}
      {shown.length === 0 && <p className="mt-10 text-center text-ink-muted">No characters match that search.</p>}
    </>
  );
}
