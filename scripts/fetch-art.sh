#!/usr/bin/env bash
# Downloads character renders from Neverland's artwork CDN into public/art.
# Usage: npm run fetch:art
set -euo pipefail
B=https://artwork.neverland.money/renders
OUT="$(dirname "$0")/../public/art"
mkdir -p "$OUT/characters" "$OUT/frames"

# Frameless base art for each character.
for pair in mermaids:mermaid pixies:pixie pirates:pirate lost-boys:lostboy legendaries:legendary; do
  dir=${pair%%:*}; file=${pair##*:}
  for n in $(seq 1 10); do
    dest="$OUT/characters/${file}_${n}.avif"
    [ -s "$dest" ] || curl -sfL -o "$dest" "https://artwork.neverland.money/bases/$dir/${file}_${n}.avif"
  done
done

# Framed renders for the home page fan (keep in sync with SHOWCASE in app/page.tsx).
mkdir -p "$OUT/framed"
for item in lost-boys/lostboy_1 mermaids/mermaid_6 pirates/pirate_9 pixies/pixie_8 legendaries/legendary_3; do
  dest="$OUT/framed/${item##*/}.avif"
  [ -s "$dest" ] || curl -sfL -o "$dest" "$B/${item}_diamond_legendary.avif"
done

# All 16 frames on one character, for the Tiers and Levels grid.
for tier in sapphire emerald ruby diamond; do
  for level in common fine epic legendary; do
    dest="$OUT/frames/${tier}_${level}.avif"
    [ -s "$dest" ] || curl -sfL -o "$dest" "$B/pixies/pixie_8_${tier}_${level}.avif"
  done
done


# Character Magic item art from Nadette's Shop.
mkdir -p "$OUT/items"
for item in enchanted-coral rainbow-fruit fairy-wand lucky-doubloon tick-tock-clock mysterious-potion rare-crystal transmogrification-stew ancient-manuscript; do
  dest="$OUT/items/$item.avif"
  [ -s "$dest" ] || curl -sfL -o "$dest" "https://explore.neverland.money/consumables/$item.avif"
done
echo "Art saved to $OUT"
