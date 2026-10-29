import { DOCS } from "@/content/rules";

export function Disclaimer() {
  return (
    <footer className="mx-auto mt-16 max-w-3xl px-4 pb-10 text-center text-xs leading-relaxed text-ink-muted">
      <p>
        An independent explainer, not affiliated with or endorsed by Neverland. Rules can change, so check{" "}
        <a href={DOCS.profilesAndShop} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-ink">
          Neverland&apos;s docs
        </a>{" "}
        before spending DUST. Character art belongs to Neverland.
      </p>
    </footer>
  );
}
