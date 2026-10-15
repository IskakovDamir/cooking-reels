# Assets: what code makes, what has to be footage

Code does every overlay, transition, UI, chart and type. What has to be a file comes from, in order:

1. **The product's own website** - captured by script, shown on a laptop.
2. **Screenshots the user sends** (app screens, dashboards) - regions detected by script.
3. **Generated plates** (photos, 3D, live action) - only for the 16:9 film look of the references,
   with any image/video model. Optional; a product reel needs none.

Plan sources before writing scenes, and never ship grey placeholders as final.

## 1. Website capture (`tools/capture_site.mjs`)

```bash
npm i -D puppeteer-core@25.12.0            # once (the scaffold already has it)
node tools/capture_site.mjs https://site.com --name site --devices desktop --frames auto --dpr 3
```

Uses Remotion's headless Chrome (or `CHROME_PATH`). Writes to `public/capture/`:

- `site-home-desktop-at<scroll>.png` (+ `-annotated.png`): the real 1440x900 viewport at the top and
  at every h1/h2 section, taken after scrolling past it so on-scroll reveals have fired. **Use these
  for laptop shots** (`capture={{src, pageW: 1440, pageH: 900, dpr: 3, viewH: 900}}`).
- `site-home-desktop-full.png`: the stitched page for long scroll shots. Sections that animate on
  scroll or are pinned can be empty in it - check before using.
- `site.json`: every heading / button / card / image / code element with its rect (page CSS px; frame
  elements in viewport px), text and computed style; the palette and fonts. Pick ids from the
  annotated PNGs. Take brand accents from it (or from the site's CSS variables) for `Timeline theme`.
- `--devices mobile` exists for mobile web, but **a website goes on the laptop**, also in 9:16.
  `--paths /,/pricing` captures more pages.

## 2. Screenshots (`tools/ui_regions.py`)

```bash
python3 tools/ui_regions.py ~/Downloads/board.png --name app-board --out public/capture
```

Copies the image and writes `app-board-annotated.png` (blue = cards / panels, orange = blocks,
numbered) and `app-board.json` (rects in image px, background, 8-colour palette). Needs numpy,
Pillow, scipy. Use the rects as `focus` / `spotlight` / cursor targets with `dpr: 1`. Device:
`laptop` / `window` for desktop apps, `phone` for mobile apps, `none` for a bare screen.

Rebuild instead of showing a screenshot when the thing has to move part by part or is illegible at
phone size: `Terminal`, `Toast`, `ChipStack`, charts, `Metric`, `FileMap` (see `reels.md`).

## 3. Generated plates (16:9 film look)

The references are motion design wrapped around **AI-generated plates**: photos, 3D renders,
turntables, live-action clips, UGC selfies.

## Per archetype

| archetype | plates (file, length, spec) |
|---|---|
| A agent demo (v1) | input photo (still, the "problem object"); 3D render that explodes into parts (3-5 s video); parts knolling sheet (transparent PNGs per part, or one flat-lay still); 3 close-ups for detection boxes (stills/video 1-2 s); build-stage turntable (4 s); 4 variant stills (16:9 cut-outs on white); result turntable on dark (2 s); cinematic hero clip of the outcome (4 s) |
| B feature bundle (v2) | per feature: BEFORE and AFTER plates of the *same* framing (stills or 2-5 s clips, 25-30 fps), optional matte/composite passes; one AI clip of hands touching the title (optional); a live-FX clip for the last feature |
| C agent story (v3) | live action of the person with the problem (6 s); post/card art (6-20 stills); app screens (10-12 stills, 16:10); phone app screens (portrait); reaction close-up (3 s); 4-6 UGC 9:16 clips of people holding the app |
| D offer (v4) | product object render (chip/coin, 1 s turntable or still with alpha); an office plate for the duotone (3 s, any light footage - the gradient map recolours it). Coins, wheel, counters, cards are code |

Footage enters as `{src: 'plates/x.mp4'}` (in `public/`) or an https URL. Videos play through
`OffthreadVideo` (muted); stills through `Img`. Keep plates 1920x1080 (cards may be any aspect;
`fit:'cover'`). Name them by role (`photo_input.jpg`, `ba_colorgrade_before.mp4`).

## Generating plates (any image/video model; optional)

Write prompts in English; match the look of the references: clean studio light, neutral backgrounds,
no text in the image, 16:9.

- **Problem object photo**: "candid smartphone photo of a [rusty red 1980s compact pickup] in a
  backyard, overcast daylight, slightly messy, documentary, 16:9, no text".
- **Exploding 3D render**: "low-poly-ish matte 3D model of [object] on a seamless light-grey studio
  cyclorama #D7D4D8, parts separate and float apart in an exploded view, slow orbit, clean render".
- **Knolling sheet**: "flat-lay knolling of every part of a [object] in neat rows on a pale grey
  background #F0EEF2 with faint blueprint lines, top-down, even light" (or render parts as PNGs with
  alpha for `PinkReveal`).
- **Variant grid**: "studio cut-out of a [monster-truck version of the pickup], [colour scheme],
  pure white background, 3/4 view" x4 colourways.
- **Result turntable**: "[final object] on a dark graphite studio set, slow 360 turntable, rim light".
- **Hero outcome clip**: "cinematic [monster truck doing a wheelie in a stadium], dark grade, motion
  blur, epic, 16:9" - this carries the end CTA.
- **Before/after pairs**: generate the BEFORE plate, then the AFTER as an edit of the same image
  (same framing!). The wipe only reads when everything except the improvement lines up.
- **Live action (story)**: "young man at a laptop on his bed at blue hour, window city view, warm
  lamp, handheld slow push-in, cinematic, 16:9".
- **UGC**: "selfie video, 9:16, person holding a phone showing [app], natural light, smiling".
- **Duotone plate**: any office footage; `GradientMap stops={THERMAL.v4}` gives the heat look.

## Logos and real brands

Logos are **user-supplied files** (`Lockup left={{logo: 'logos/brand.svg'}}`). Never redraw a
company's logo in code; `Spark` / `IconTile` are generic stand-ins. Model names, partner names and
product UI in the examples are neutral placeholders - replace them with what the user is entitled to
show. A collab video ("Brand × Claude") needs the partner's approval in real life; the skill only
provides the motion.

## Fonts

`fonts.ts` loads free Google fonts with Latin + Cyrillic: Inter (UI), Inter Tight (display caps),
Unbounded (stickers/titles, slanted with skewX), Playfair Display (collab serif), Geologica, JetBrains
Mono. Russian copy works out of the box; keep Russian lines ~15 % shorter (Cyrillic sets wider).

## Audio files

`scripts/synth_audio.py public ...` writes `music.wav` (+ `music_raw.wav`) and `sfx/*.wav`. A
licensed track works too: master it to -14 LUFS, find its drop, and put your first content scene on
it. Keep SFX in `public/sfx/` with the same names (`Sfx name="whoosh"` etc.).
