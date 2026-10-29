import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Quick answers about veDUST characters, frames, Legendaries and Character Magic.",
};

const FAQ = [
  {
    q: "Can I pick my character when I lock?",
    a: "No. A new lock under 10,000 DUST gets a core character (Lost Boy, Mermaid, Pirate or Pixie). A new lock of 10,000+ DUST always gets a Legendary. After that, Rare Crystal and Transmogrification Stew let you reroll.",
  },
  {
    q: "Does my character affect my rewards?",
    a: "No. Voting power and USDC rewards come only from the DUST locked and how long it's locked. The only perk is Pearls: each shiny veDUST adds +5%.",
  },
  {
    q: "Why did my frame change?",
    a: "Frames update live. On a timed lock, veDUST power and days left both shrink every day, so the Level (style) and Tier (gem) slide down. Extend the lock or add DUST to move back up.",
  },
  {
    q: "How do I get the Diamond frame?",
    a: "Diamond is the Tier for Infinite Locks. Switch your lock to an Infinite Lock.",
  },
  {
    q: "If I add DUST to an old lock and pass 10,000, do I get a Legendary?",
    a: "No. Only a brand-new lock of 10,000+ DUST mints a Legendary. For an existing veDUST, use an Ancient Manuscript (needs 15,000+ DUST locked).",
  },
  {
    q: "What happens to my shiny progress if I reroll or sell?",
    a: "It stays with the veDUST. Failed attempts keep counting after rerolls and transfers, and an Ancient Manuscript keeps shiny status too.",
  },
  {
    q: "How many shiny tries can I make per day?",
    a: "One per veDUST per day, reset at 00:00 UTC. Each extra try that day uses a Tick-Tock Clock (20 DUST).",
  },
  {
    q: "Can Olympic edition characters use Character Magic?",
    a: "Not yet. They're awarded for placements and give the Gold, Silver or Bronze Medalist badge while you hold them.",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6">
      <PageHeader eyebrow="FAQ" title="Quick answers" intro="The questions people ask most about veDUST NFTs." />
      <Section>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="panel group !rounded-[20px] p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span aria-hidden className="text-ink-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </main>
  );
}
