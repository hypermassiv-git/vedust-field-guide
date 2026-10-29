import { LEVELS, TIERS, frameArt } from "@/lib/frames";

export const TIER_COLOR = {
  sapphire: "var(--color-sapphire)",
  emerald: "var(--color-emerald)",
  ruby: "var(--color-ruby)",
  diamond: "var(--color-diamond)",
} as const;

/**
 * 4x4 grid: Levels across (from veDUST power), Tiers down (from days left).
 * On phones each Tier's label sits on its own row above its four frames, so the grid fits without scrolling.
 */
export function FrameGrid() {
  return (
    <div className="panel p-4 sm:p-6">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-[110px_repeat(4,minmax(0,1fr))] sm:gap-3">
        <div className="hidden sm:block" />
        {LEVELS.map((l) => (
          <div key={l.id} className="text-center">
            <p className="text-sm font-semibold sm:text-base">{l.label}</p>
            <p className="text-[11px] text-ink-muted tabular-nums sm:text-xs">{l.range.replace(" veDUST power", "")}</p>
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
      <div className="col-span-4 mt-2 flex items-baseline gap-2 sm:col-span-1 sm:mt-0 sm:flex-col sm:justify-center sm:gap-0">
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
            className="aspect-square w-full rounded-lg transition-transform sm:rounded-xl duration-200 group-hover:scale-[1.04]"
          />
          <figcaption className="sr-only">
            {l.label} {tier.label}: {l.range}, {tier.range}
          </figcaption>
        </figure>
      ))}
    </>
  );
}
