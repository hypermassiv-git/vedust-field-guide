import { LEVELS, TIERS, frameArt } from "@/lib/frames";

export const TIER_COLOR = {
  sapphire: "var(--color-sapphire)",
  emerald: "var(--color-emerald)",
  ruby: "var(--color-ruby)",
  diamond: "var(--color-diamond)",
} as const;

/** 4x4 grid: Levels across (from veDUST power), Tiers down (from days left). */
export function FrameGrid() {
  return (
    <div className="panel overflow-x-auto p-4 sm:p-6">
      <div className="grid min-w-[560px] grid-cols-[110px_repeat(4,minmax(0,1fr))] gap-3">
        <div />
        {LEVELS.map((l) => (
          <div key={l.id} className="text-center">
            <p className="font-semibold">{l.label}</p>
            <p className="text-xs text-ink-muted tabular-nums">{l.range.replace(" veDUST power", "")}</p>
          </div>
        ))}
        {TIERS.map((t) => (
          <FrameRow key={t.id} tier={t} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-ink-muted">
        <span>Across: Level, set by veDUST power</span>
        <span>Down: Tier, set by days left on the lock</span>
      </div>
    </div>
  );
}

function FrameRow({ tier }: { tier: (typeof TIERS)[number] }) {
  return (
    <>
      <div className="flex flex-col justify-center">
        <p className="font-semibold" style={{ color: TIER_COLOR[tier.id] }}>
          {tier.label}
        </p>
        <p className="text-xs text-ink-muted">{tier.range}</p>
      </div>
      {LEVELS.map((l) => (
        <figure key={l.id} className="group relative" title={`${l.label} ${tier.label}: ${l.range}, ${tier.range.toLowerCase()}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frameArt(tier.id, l.id)}
            alt={`${l.label} level with ${tier.label} tier frame`}
            loading="lazy"
            width={160}
            height={160}
            className="aspect-square w-full rounded-xl transition-transform duration-200 group-hover:scale-[1.04]"
          />
          <figcaption className="sr-only">
            {l.label} {tier.label}: {l.range}, {tier.range}
          </figcaption>
        </figure>
      ))}
    </>
  );
}
