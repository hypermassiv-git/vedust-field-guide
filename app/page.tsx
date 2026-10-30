import Link from "next/link";
import { CHARACTERS, characterArt, framedArt } from "@/content/characters";
import { frameArt } from "@/lib/frames";
import { ShopLink } from "@/components/ui";
import { itemArt } from "@/content/magic";

const SHOWCASE = ["tootles", "coralie", "star-eye-selwyn", "luna", "nadette"];

const JOURNEY = [
  { step: "Lock DUST", body: "Lock any amount from 10 DUST for 28 to 365 days, or as an Infinite Lock." },
  { step: "Get a veDUST", body: "An NFT with one of 50 characters, framed by its power and lock time." },
  {
    step: "Use Magic",
    body: (
      <>
        Buy items in <ShopLink /> with DUST to make it shiny, swap it, or turn it Legendary.
      </>
    ),
  },
  { step: "Collect", body: "Earn badges and titles for owning Legendaries, shinies and full sets." },
];

const CARDS = [
  { href: "/characters", label: "Characters", title: "Meet all 50", body: "Lost Boys, Mermaids, Pirates, Pixies and Legendaries.", art: () => characterArt(CHARACTERS.find((c) => c.slug === "coralie")!) },
  { href: "/frames", label: "Tiers & Levels", title: "Read the frame", body: "What the 16 frames mean and how yours will change.", art: () => frameArt("ruby", "epic") },
  { href: "/legendary", label: "Legendary", title: "Go Legendary", body: "The two ways to get one of the 10 rarest characters.", art: () => characterArt(CHARACTERS.find((c) => c.slug === "nadette")!), golden: true },
  { href: "/magic", label: "Character Magic", title: "Use Magic", body: "Every item, what it costs, and your real shiny odds.", art: () => itemArt("mysterious-potion"), item: true },
];

export default function Home() {
  const showcase = SHOWCASE.map((s) => CHARACTERS.find((c) => c.slug === s)!).filter(Boolean);
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mx-auto max-w-3xl pt-16 text-center sm:pt-24">
        <h1 className="rise text-gradient font-display text-4xl leading-tight tracking-title sm:text-5xl lg:text-6xl">
          The veDUST
          <br />
          Field Guide
        </h1>
        <p className="rise mt-5 text-lg leading-relaxed text-ink-secondary sm:text-xl" style={{ "--d": "120ms" } as React.CSSProperties}>
          Every locked DUST position on Neverland is an NFT with a character. Here&apos;s how characters, frames, Legendaries
          and Character Magic all work.
        </p>
        <p className="rise mt-3 text-sm text-ink-secondary" style={{ "--d": "180ms" } as React.CSSProperties}>
          Made with love{" "}
          <svg
            viewBox="0 0 24 24"
            className="heartbeat inline-block size-4 -translate-y-px align-middle text-[#ff7eb6] drop-shadow-[0_0_6px_rgba(255,126,182,0.6)]"
            fill="currentColor"
            aria-label="love"
            role="img"
          >
            <path d="M12 21s-7.5-4.6-9.6-9.4C.9 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.1 5.4 3.1 1.8-2 3.3-3.1 5.4-3.1 3.6 0 5.7 3.7 4.2 7.1C19.5 16.4 12 21 12 21z" />
          </svg>{" "}
          by{" "}
          <a
            href="https://x.com/hypermassiv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-white/70"
          >
            Hyper
          </a>
        </p>
      </div>

      <div className="rise relative mx-auto mt-12 flex max-w-5xl justify-center" style={{ "--d": "200ms" } as React.CSSProperties}>
        <div className="glow-pulse absolute inset-x-10 inset-y-4 -z-10 rounded-full bg-violet/30 blur-3xl" aria-hidden />
        {showcase.map((c, i) => (
          <Link
            key={c.slug}
            href={`/characters/${c.slug}`}
            className="group -mx-[4.5%] w-[26%] sm:-mx-4 sm:w-1/5"
            style={{ transform: `rotate(${(i - 2) * 5}deg) translateY(${Math.abs(i - 2) * 10}px)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={framedArt(c)} alt={c.name} width={320} height={320} className="w-full rounded-2xl shadow-2xl shadow-black/50 transition-transform duration-200 ease-out group-hover:-translate-y-3 group-focus-visible:-translate-y-3" />
          </Link>
        ))}
      </div>

      <section className="mt-16">
        <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((j, i) => (
            <li key={j.step} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-lavender/30 text-sm font-bold tabular-nums text-lavender">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{j.step}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{j.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={`panel group relative flex items-center gap-5 p-5 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 ${c.golden ? "golden-hover" : ""}`}
          >
            {c.golden && <Sparkles />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.art()}
              alt=""
              width={112}
              height={112}
              className={`size-24 shrink-0 rounded-2xl sm:size-28 ${c.item ? "bg-white/[0.06] object-contain p-3" : ""}`}
            />
            <div>
              <p className="label">{c.label}</p>
              <p className="mt-1 text-xl font-bold">{c.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{c.body}</p>
              <p className="mt-2 text-sm font-semibold text-lavender transition-transform group-hover:translate-x-0.5">Explore →</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

/* Four-point stars placed around the card; they twinkle in on hover (see .golden-hover in globals.css). */
const SPARKLES = [
  { top: "8%", left: "6%", size: 14, d: "0ms" },
  { top: "14%", left: "88%", size: 18, d: "180ms" },
  { top: "72%", left: "94%", size: 12, d: "360ms" },
  { top: "82%", left: "34%", size: 10, d: "120ms" },
  { top: "-6%", left: "58%", size: 12, d: "260ms" },
  { top: "40%", left: "-2%", size: 10, d: "420ms" },
];

function Sparkles() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {SPARKLES.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="sparkle absolute"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, "--d": s.d } as React.CSSProperties}
        >
          <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}
