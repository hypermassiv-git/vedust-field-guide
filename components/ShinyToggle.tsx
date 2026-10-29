"use client";

import { useState } from "react";

export function ShinyToggle({ name, image, video }: { name: string; image: string; video: string }) {
  const [shiny, setShiny] = useState(false);
  return (
    <div>
      <div className="panel overflow-hidden p-2">
        {shiny ? (
          <video
            key="shiny"
            src={video}
            poster={image}
            autoPlay
            loop
            muted
            playsInline
            className="aspect-square w-full rounded-[22px] bg-night-deep"
            aria-label={`Shiny ${name}, animated`}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} width={480} height={480} className="aspect-square w-full rounded-[22px]" />
        )}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        <button type="button" className="chip" aria-pressed={!shiny} onClick={() => setShiny(false)}>
          Normal
        </button>
        <button type="button" className="chip" aria-pressed={shiny} onClick={() => setShiny(true)}>
          ✨ Shiny
        </button>
      </div>
    </div>
  );
}
