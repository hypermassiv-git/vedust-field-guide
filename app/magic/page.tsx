import type { Metadata } from "next";
import { ShinySimulator } from "@/components/ShinySimulator";
import { ARCHETYPE_COLOR, ArchetypeBadge, Callout, PageHeader, Section } from "@/components/ui";
import Link from "next/link";
import { ARCHETYPES, ARCHETYPE_ORDER, characterArt, getCharacter } from "@/content/characters";
import { MAGIC_ITEMS, MAGIC_KIND_LABEL, itemArt } from "@/content/magic";
import { DOCS } from "@/content/rules";
import { expectedAttempts } from "@/lib/shiny";

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
        intro="Character Magic items are bought with DUST in Nadette's Shop and used on a veDUST. They do three things: try to make it shiny, swap it for another character, or turn it Legendary."
      />

      <Section id="nadettes-shop" label="Where to buy" title="Nadette's Shop">
        <ShopGuide />
      </Section>

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
          <Fact big={expectedAttempts().toFixed(1)} small="tries needed on average" />
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

const SHOP_STEPS = [
  { title: "Open your profile", body: "In the Neverland app, go to your own profile and tap the shop door." },
  { title: "Pick Character Magic", body: "The shop has three sections. Character Magic is where these 9 items live." },
  { title: "Pay with DUST", body: "Add items to your basket and check out with DUST." },
  { title: "Use it from your Inventory", body: "Items wait in your Inventory, stacked by quantity. Use one on a veDUST it works on." },
];

function ShopGuide() {
  const nadette = getCharacter("nadette");
  return (
    <div className="panel grid gap-6 p-5 sm:p-6 md:grid-cols-[200px_1fr] md:items-center">
      {nadette && (
        <Link href={`/characters/${nadette.slug}`} className="mx-auto block w-36 md:w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={characterArt(nadette)} alt="Nadette" width={200} height={200} className="aspect-square w-full rounded-2xl ring-1 ring-legendary/30" />
          <p className="mt-2 text-center text-xs text-ink-muted">Nadette runs the shop</p>
        </Link>
      )}
      <div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {SHOP_STEPS.map((s, i) => (
            <li key={s.title} className="inset flex gap-3 p-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-lavender/[0.12] text-sm font-bold text-lavender">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-secondary">
          <li>
            <strong className="text-ink">Some items run out.</strong> Limited items, like the Ancient Manuscript, show how
            many are left. Restocks happen at no set time.
          </li>
          <li>
            <strong className="text-ink">Friends can gift you items.</strong> Add items to your wish list, and if your profile is public, visitors to
            your profile can send them to you.
          </li>
        </ul>
        <a
          href={DOCS.profilesAndShop}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-lavender underline decoration-lavender/30 underline-offset-4"
        >
          More about the shop ↗
        </a>
      </div>
    </div>
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
