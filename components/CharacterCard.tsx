import Link from "next/link";
import type { Character } from "@/content/characters";
import { characterArt } from "@/content/characters";
import { ArchetypeBadge } from "./ui";

export function CharacterCard({ c, compact }: { c: Character; compact?: boolean }) {
  return (
    <Link
      href={`/characters/${c.slug}`}
      className="group panel block overflow-hidden !rounded-[20px] p-2 transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={characterArt(c)}
        alt={c.name}
        loading="lazy"
        width={240}
        height={240}
        className="aspect-square w-full rounded-[14px] transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {!compact && (
        <div className="px-1.5 pb-1 pt-2.5">
          <p className={`truncate text-sm font-semibold ${c.pendingName ? "text-ink-muted" : ""}`}>{c.name}</p>
          <div className="mt-1">
            <ArchetypeBadge archetype={c.archetype} />
          </div>
        </div>
      )}
    </Link>
  );
}
