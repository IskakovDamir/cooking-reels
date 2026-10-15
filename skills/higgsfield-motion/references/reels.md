# Reels (9:16): product reels from a website or app screenshots

The four references are 16:9 launch films built around generated plates. A product reel is a
different job: 15-25 s, vertical, sound-optional, built from **the real product** (its site and
app screens) plus **rebuilt graphics** (UI and data redrawn in code so every part can move).
No image/video generation is needed. Worked example: `templates/examples/AgentmashReel.tsx`
(15 shots, 58 beats at 130 BPM, 26.8 s).

## Setup

```tsx
<Composition id="Reel" component={Reel} durationInFrames={FRAMES} fps={30} width={1080} height={1920} />

export const Reel: React.FC = () => (
  <MotionProfile preset="reels">                      {/* speed x1.2, UI x1.35 */}
    <Timeline scenes={SCENES} theme={THEME} />       {/* palette for this film only */}
  </MotionProfile>
);
```

- **Units.** Every library size is px at a 1080 px *short side* (`useShort()`), so a chip is the
  same size in 16:9 and 9:16; the vertical frame just has 1920 px of height to fill. Stack, don't
  shrink.
- **`MotionProfile preset="reels"`**: `speed` 1.2 divides every entry, typing rate, counter and
  camera move (fx lengths, `Stream`, `Scramble`, `Flow`, `Pop`, ScreenStudio glides), `ui` 1.35
  enlarges `Graphics` components for phone viewing. `reference` = the measured 1/1.
- **`SAFE`** = `{top: 11.5, bottom: 19.8, side: 5.6}` % of the frame: Instagram's username row,
  caption and buttons cover those bands. Headlines start at `SAFE.top + 4`; nothing important below
  `100 - SAFE.bottom`.
- **Theme.** `const THEME: Theme = {accents: ['#8BCFF0', '#F97316']}` swaps lime -> first and pink
  -> second everywhere tokens carry them: `COLOR`, background glows, the scramble head, the birth
  ramp / stream tail. Add `colors: {...}` / `fonts: {...}` for anything else. The theme is applied by
  `Timeline` before scenes render, so other compositions in the Studio keep their own palette.
  Take the accents from the brand's site (`capture_site.mjs` prints the palette; CSS variables are
  better: the site's accent is usually `--accent`-like). Read `COLOR.x` inside components, never at
  module level, or the theme can't reach it.

## Pace (faster than the 16:9 references, but readable on the first watch)

A first cut at x1.4 speed with 2.5-3 beat shots (20 s) was too fast to follow: viewers could not
read the toast, the site cards or the agent list before the cut. What reads:

| | 16:9 references | reels |
|---|---|---|
| speed profile | 1 | 1.2 (`preset="reels"`); 1.4 only for shots with nothing to read |
| shot length | median 1.96 s | 2-3 beats for a hit (a word, a number), **4-5 beats (1.8-2.3 s) for anything with copy or UI to read** (example: median 4 beats = 1.85 s) |
| visual events / 10 s | 4.3-8.1 | 5-7 |
| hook | intro 56-130 f | the first words readable by frame ~10; the problem in 2 short lines |
| music | 85 trap / 132 drive | 130 drive, drop on the first content cut (beat 4), 808 gap before the price reveal |

- One idea per shot. Headline = 2 lines max, 2-5 words each, 96-130 px, lowercase if the brand is.
- Reading budget: ~4 words per second on top of the entry; a toast or card with a title and a
  body needs ~1.5 s after it lands, a list of 20 names ~1 s after the last one pops.
- Inside a shot add one more event: a `Punch` (x1.06-1.18 jump that settles 4 % in 6 f), a camera
  glide, a counter, a cursor click, a highlight cycling through chips.
- Cut on the beat (`beatDurations`); half-beat lengths only to land the next cut on a downbeat.
- Mix dark and light scenes (3-5 dark of 15): all-light reels read flat and fail the light-share
  check; the dark site shots count.
- End: claim -> logo scramble (2 beats) -> CTA card with the command / URL; music stops on the CTA.

## Sources: website and app screenshots (no generation)

### Website -> laptop

A website is always shown **on a laptop** (desktop capture), even in a vertical reel. Phone frames
are only for mobile-app screens.

```bash
node tools/capture_site.mjs https://site.com --name site --devices desktop --frames auto --dpr 3
```

- `--frames auto` takes the real 1440x900 viewport at the top and at every h1/h2 section, after
  scrolling past it so on-scroll reveals fire (`--frames 0,1700,3640` for exact positions). Use
  frames for laptop shots: `-full.png` is stitched without scrolling, so pinned sections and reveal
  animations can be missing from it.
- Open `site-home-desktop-at1700-annotated.png`, pick the numbered elements, read their rects from
  `site.json` -> `pages.home.devices.desktop.frames[i].elements` (viewport CSS px; cards come as
  `kind: 'card'`).
- `--dpr 3` keeps text sharp at the 4x zoom cap.

```tsx
const HOW: Capture = {src: 'capture/site-home-desktop-at1700.png', pageW: 1440, pageH: 900, dpr: 3, viewH: 900};
<ScreenStudio
  capture={HOW}
  device="laptop"                                         // default; w = 94 % in 9:16, 70 % in 16:9
  camera={[{at: 0, zoom: 1}, {at: 9, focus: R.card, fill: 0.92}]}   // establish 9 f, glide in
  cursor={[{at: 22, to: {x: 1190, y: 330}}, {at: 26, to: R.chip, click: true}]}
  spotlight={[{rect: R.card, from: 18, to: 60, label: 'before every edit'}]}
/>
```

### App screenshots the user sends

```bash
python3 tools/ui_regions.py ~/Downloads/board.png --name app-board --out public/capture
```

Writes the image, `app-board-annotated.png` (numbered cards / blocks) and `app-board.json` (rects in
image px + palette). Use `capture={{src: 'capture/app-board.png', pageW: W, pageH: H, dpr: 1, viewH: H}}`
with `device="laptop"` / `"window"` for desktop apps, `"phone"` for a mobile app, `"none"` for a
bare floating screen.

### Screen Studio recipes

| move | keys | notes |
|---|---|---|
| establish -> zoom | `{at:0, zoom:1}`, `{at:9, focus, fill:.92}` | 9 f of the device, then a 13 f glide (bezier .45,0,.12,1) |
| open close, drift out | `{at:0, focus, zoom:4}`, `{at:1, focus, zoom:3.3, dur:30}` | second shot of the same screen: show the device edge at the end |
| element -> element | `{at:30, focus: R.cta, fill:.8}` | a glide, never a cut, within one screen |
| click | cursor `{at, to}` then `{at:+4, to: R.x, click:true}` | the click lands `dur` (10 f at reels speed) after its key: put the click SFX there |
| spotlight | `{rect, from, to, label}` | dims everything else 55 %, label pill in the first accent |

Zoom is capped at 4x. One camera move per 1.5 s at most; split a long site tour into two shots
cut with a blur. Motion blur comes from the camera speed automatically (max 10 px).

## Rebuild vs capture

Capture when authenticity is the point (the real site, the real app). Rebuild in code (`Graphics`)
whatever has to move part by part or would be illegible as a screenshot at phone size:

| component | use it for |
|---|---|
| `Terminal` | install / login commands typed, output lines with ✓ ! x colours |
| `Toast` | a warning or notification dropping in (`level`, title, body) |
| `ChipStack` | a list of states / features cascading, one highlighted cycling through |
| `BarChart`, `LineChart`, `Donut`, `Metric` | numbers: bars growing, a line drawing, a ring sweeping, a counter |
| `FileMap` | multiplayer: named cursors (agents, users) gliding between files, a contested tile pulsing |
| `Punch` | the hit inside a shot (x1.06-1.18) |

## Copy rules for product reels

- Only claims the product can back today; take numbers and limits from its own docs, not from
  memory. Prefer "20 coding agents, and any editor through git" over "all the agents".
- Problem first (2 lines), then the mechanism in one line per shot, then proof (a number), then the
  price / CTA.
- No voice-over; every shot must read with the sound off.

## Checking a reel

`check_render.py` compares against the 16:9 envelope. For reels expect `dark share` above 0.15
when the product's site is dark and low `saturation` with pastel brand accents (the example, sky
blue + orange on paper plus the dark site: events 5.6 / 10 s, median gap 1.63 s, dark .29,
saturation .072, motion 4.4 at the low edge). Treat those as informational; events, cuts, gaps,
blur share, light share, LUFS and peak should be inside. Then look at a 2 fps contact sheet: every shot must be readable at the frame it cuts.
