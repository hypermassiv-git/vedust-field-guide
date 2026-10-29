import type { Metadata } from "next";
import { ShinySimulator } from "@/components/ShinySimulator";
import { ARCHETYPE_COLOR, ArchetypeBadge, Callout, PageHeader, Section } from "@/components/ui";
import { ARCHETYPES, ARCHETYPE_ORDER } from "@/content/characters";
import { MAGIC_ITEMS, MAGIC_KIND_LABEL, itemArt } from "@/content/magic";
import { SHINY } from "@/content/rules";

export const metadata: Metadata = {
  title: "Character Magic",
  description: "What each Character Magic item does, what it costs, which characters it works on, and your real odds of going shiny.",
};

export default function MagicPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <PageHeader
        eyebrow="Character Magic"
        title="Change your character"
        intro="Character Magic items are bought with DUST in the shop and used on a veDUST. They do three things: try to make it shiny, swap it for another character, or turn it Legendary."
      />

      <Section label="All 9 items">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MAGIC_ITEMS.map((m) => (
            <article key={m.slug} id={m.slug} className="panel flex scroll-mt-6 flex-col p-5 target:outline target:outline-1 target:outline-lavender/50">
              <div className="flex items-start justify-between gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={itemArt(m.slug)} alt="" width={88} height={88} className="size-20 object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]" />
                <span className="rounded-full bg-lavender/[0.12] px-3 py-1 text-sm font-bold tabular-nums text-lavender">
                  {m.costDust.toLocaleString("en-US")} DUST
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
              <p className="label mt-1">{MAGIC_KIND_LABEL[m.kind]}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{m.effect}</p>
              {m.notes && <p className="mt-2 text-xs leading-relaxed text-ink-muted">{m.notes}</p>}
            </article>
          ))}
        </div>
      </Section>

      <Section label="Which item works on what" title="Compatibility">
        {/* Phones: one row per item listing what it works on. Larger screens: the full table. */}
        <ul className="panel divide-y divide-white/[0.06] px-4 py-1 sm:hidden">
          {MAGIC_ITEMS.map((m) => (
            <li key={m.slug} className="flex items-start gap-3 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={itemArt(m.slug)} alt="" width={36} height={36} className="size-9 shrink-0 object-contain" />
              <div>
                <p className="text-sm font-semibold">{m.name}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {m.kind === "cooldown" ? (
                    <span className="text-xs text-ink-secondary">Any shiny attempt</span>
                  ) : (
                    m.compatibleWith.map((a) => <ArchetypeBadge key={a} archetype={a} />)
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="panel hidden overflow-x-auto p-2 sm:block sm:p-4">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr>
                <th className="p-3 text-left font-semibold text-ink-muted">Item</th>
                {ARCHETYPE_ORDER.map((a) => (
                  <th key={a} className="p-3 text-center font-semibold" style={{ color: ARCHETYPE_COLOR[a] }}>
                    {ARCHETYPES[a].plural}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MAGIC_ITEMS.map((m) => (
                <tr key={m.slug} className="border-t border-white/[0.06]">
                  <th scope="row" className="p-3 text-left font-semibold">
                    <span className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={itemArt(m.slug)} alt="" width={32} height={32} className="size-8 object-contain" />
                      {m.name}
                    </span>
                  </th>
                  {ARCHETYPE_ORDER.map((a) => {
                    const ok = m.kind === "cooldown" || m.compatibleWith.includes(a);
                    return (
                      <td key={a} className="p-3 text-center">
                        {ok ? (
                          <span className="text-low" aria-label="Works">✓</span>
                        ) : (
                          <span className="text-white/20" aria-label="Doesn't work">–</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-muted">
          Olympic edition characters can&apos;t use any Character Magic yet. The Tick-Tock Clock works with any shiny attempt. The Rare Crystal works on every veDUST, Legendaries included.
        </p>
      </Section>

      <Section label="Going shiny" title="Your real odds">
        <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
          <Fact big="1%" small="chance on your first try" />
          <Fact big="+0.5%" small="added after every failed try" />
          <Fact big={`Try ${SHINY.guaranteedAttempt}`} small="is guaranteed to work" />
        </div>
        <ShinySimulator />
        <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-ink-secondary md:grid-cols-3">
          <li className="inset p-4">
            <strong className="text-ink">One try a day.</strong> Each veDUST gets one shiny attempt per day, reset at 00:00
            UTC. A Tick-Tock Clock skips the wait.
          </li>
          <li className="inset p-4">
            <strong className="text-ink">Progress stays with the NFT.</strong> Failed tries keep counting even after a
            reroll or if you sell or transfer the veDUST.
          </li>
          <li className="inset p-4">
            <strong className="text-ink">Why go shiny?</strong> Each shiny veDUST adds a flat +5% to your Pearls, and the
            character becomes animated.
          </li>
        </ul>
      </Section>

      <Section label="Rerolls" title="Crystal or Stew?">
        <div className="grid gap-4 md:grid-cols-2">
          <RerollCard
            slug="rare-crystal"
            name="Rare Crystal"
            from="Pixie: Luna"
            to="Another Pixie"
            body="Swaps for a different character in the same archetype. Good when you like the archetype but want a different look, or are collecting all 10."
          />
          <RerollCard
            slug="transmogrification-stew"
            name="Transmogrification Stew"
            from="Pixie: Luna"
            to="A Mermaid, Pirate or Lost Boy"
            body="Swaps into one of the other core archetypes. It never gives a Legendary. Good for filling gaps in another archetype."
          />
        </div>
        <div className="mt-4">
          <Callout title="Rerolls keep everything else">
            Your locked DUST, lock time, voting power and shiny progress don&apos;t change. Only the character does. Neither item
            has a daily limit.
          </Callout>
        </div>
      </Section>
    </main>
  );
}

function Fact({ big, small }: { big: string; small: string }) {
  return (
    <div className="panel !rounded-[20px] px-2 py-4 text-center sm:!rounded-[var(--radius-card)] sm:p-5">
      <p className="text-xl font-bold text-lavender sm:text-3xl">{big}</p>
      <p className="mt-1 text-xs leading-snug text-ink-secondary sm:text-sm">{small}</p>
    </div>
  );
}

function RerollCard({ slug, name, from, to, body }: { slug: string; name: string; from: string; to: string; body: string }) {
  return (
    <div className="panel p-6">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={itemArt(slug)} alt="" width={56} height={56} className="size-14 object-contain" />
        <p className="text-lg font-semibold">{name}</p>
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm">
        <span className="inset px-3 py-2">{from}</span>
        <span aria-hidden className="text-ink-muted">→</span>
        <span className="inset px-3 py-2 font-semibold">{to}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{body}</p>
    </div>
  );
}
