---
name: higgsfield-motion
description: Write Remotion (React) videos in the style of Higgsfield's fast launch promos and fast 9:16 product Reels: a rack-focus blur on almost every shot, AI-streaming and scramble type, UI shown huge under a moving camera, Screen Studio-style laptop shots of a real website (captured by script) or of app screenshots, UI and charts rebuilt in code (terminal, toasts, chips, bar/line/donut charts, counters, multiplayer file maps), stickers, before/after wipes, thermal and glitch transitions, 85 BPM trap or 130 BPM drive at -14 LUFS, and a theme that swaps the palette to the brand's colours. Numbers measured frame by frame from four reference videos; five rendered examples. Use for a Higgsfield-style video, an AI product / agent / MCP / model launch promo, a product Reel / Short / TikTok built from a website or screenshots, a feature or skills bundle reel, an offer / pricing promo, fast dynamic motion design for an AI tool, "как у Higgsfield", "рилс про продукт", or any Remotion composition that should feel like these.
---

# higgsfield-motion

A Remotion library + workflow that reproduces the motion language of four Higgsfield launch promos
(v1 MCP x Claude agent demo, v2 skills bundle, v3 agents story with mascots, v4 API cashback offer).
Every default is measured: per-frame sharpness/diff analysis of all 4,958 frames, four shot-by-shot
forensic breakdowns (template matching, blur fits, colour sampling, curve fitting), a blur-in
calibrated by rendering 93 configurations against the reference curve, and audio analysis (tempo,
structure, loudness). Not affiliated with Higgsfield, Anthropic or OpenAI.

Two formats share the library: the **16:9 launch film** (the references: generated plates, 20-60 s)
and the **9:16 product Reel** (15-25 s, built from the product's real site on a laptop and its app
screenshots plus graphics rebuilt in code, 1.2x faster; `references/reels.md`). No image/video
generation is required for either; the Higgsfield MCP is optional.

## The style in numbers

- **Pace.** Shots median 1.96 s (p10 0.8, p90 4.3). A visual event every 0.5-1.7 s (4.3-8.1 per 10 s).
- **Always moving.** 20-36 % of all frames are inside a blur (focus pull, motion blur, heat map).
  Default entry = gaussian 14 px -> 0 over 36 f expo-out (visibly sharp in 12 f) - calibrated.
- **Designed edits.** Only 23 % plain cuts. The rest: zoom / punch 11 %, whip 11 %, thermal 9 %,
  white beat / fade 9 %, wipe / slide 8 %, glitch 7 %, blur cut 5 %, motion match-cut 4 %, other 13 %.
- **Text is born, not placed.** Per-glyph birth ramp (lime -> pink -> crimson -> ink, 9 f), the Claude
  line ramp (yellow -> orange -> magenta -> grey, 27.5 f, under a feathered wipe), scramble-type with a
  lime/pink punctuation head, per-word fades 1 f apart. Typing 50-75 cps, descriptions 225 cps.
- **Palette.** Paper #FBF9FC, ink #0C0309, lime #D4FF1F, pink #EE1174 (Claude collab: coral #D97757,
  peach intro). Colour comes only from accents. Thermal LUT, duotone plates, glitch HUDs for flashes.
- **Type.** Inter-like UI (status 4.5 %H cap, prompts 4.9), heavy extended caps for stickers/titles,
  neo-grotesk caps for claims (8.6-21 %H), serif hero for Claude collabs (24 %H), end card 3.5 %H caps.
- **Motion curves.** Expo-out entries, expo-in exits, linear counters, springs only on mascots (1.20 at
  +3 f), the input pill (5 %) and partner logos (13 %). UI shown huge and cropped under a camera.
- **Sound.** No voice-over. 82-88 BPM half-time trap (demos, bundles, stories) or ~132 BPM drive
  (offers); -14 LUFS, ~-3 dBTP, LRA 2-4. Drop on the first content cut; 808 drop-outs before reveals;
  music stops on the end card.

## Workflow

0. **Format.** A product Reel / Short / TikTok, or anything built from a website or screenshots ->
   follow `references/reels.md` (capture -> beat sheet -> `MotionProfile preset="reels"` ->
   `<Timeline theme>`), starting from `AgentmashReel.tsx`. A 16:9 launch film -> steps 1-7.
1. **Pick the archetype** (`references/archetypes.md`): A agent demo (one task end to end, 35-45 s),
   B feature bundle (N features, before/after, 40-50 s), C agent story with mascots (50-60 s),
   D offer/numbers (20-30 s, 132 BPM). Confirm length, language (Russian works: fonts have Cyrillic)
   and what real plates/logos exist.
2. **Write the beat sheet** before code: `scene | frames | bg | in | out | content | sfx`, using
   `references/editing.md` (intro 56-130 f, content median 60 f, designed transition on ~3 of 4
   cuts, an event every 0.5-1.7 s, end card 44-58 f). Copy rules: present-continuous status lines,
   one bold lead, uppercase 2-3-word claims, "/command" section titles.
3. **Plan the sources** (`references/assets.md`): the product's own site first
   (`node tools/capture_site.mjs <url> --devices desktop --frames auto --dpr 3`: real viewports +
   element rects + palette), then screenshots the user sends (`python3 tools/ui_regions.py shot.png`),
   then generated plates for the film look (prompt templates there; any model) or `src: ''`
   placeholders. Logos are user files - never redraw a real brand's mark.
4. **Scaffold**: `bash scripts/setup_project.sh <dir> [--reels]` (Remotion 4.0.530 pinned, library in
   `src/hfm`, the five examples in `src/examples`, `src/Main.tsx` (1080x1920 reels profile with
   `--reels`), the capture tools in `tools/`, a synthesized bed in `public/`).
   For an existing project the same script adds `src/hfm` + `src/examples` without touching the rest.
5. **Write the film** in `src/Main.tsx` as `SceneSpec[]` - start by copying the example of your
   archetype (`AgentDemo`, `BundlePromo`, `AgentsStory`, `OfferPromo`: rendered and verified
   shot-for-shot rebuilds of v1-v4; `AgentmashReel` for reels) and replace content. Durations from
   beats: `beatDurations(beatGrid(BPM, 30), [beats...])`. Brand colours go in one place:
   `<Timeline scenes={SCENES} theme={{accents: [replacesLime, replacesPink]}} />`.
6. **Sound**: `python3 scripts/synth_audio.py public --bpm 85 --bars N --drop-beat <intro beats>
   [--gaps BEAT:LEN ...] [--breaks BAR] [--end-beat <end card beat>] [--style drive]` -> `music.wav`
   + `sfx/`. Place `<Sfx name=... at=frame>`: whoosh on designed transitions, glitch on glitch cuts,
   typing under prompts, pop on presses, impact on the drop / white flash, riser into the big reveal.
7. **Render + check**: `npx remotion render src/index.ts Main out/raw.mp4`, then
   `bash scripts/master.sh out/raw.mp4 out/final.mp4` (-14 LUFS / -3 dBTP) and
   `python3 scripts/check_render.py out/final.mp4` - fix anything OUTSIDE (table in editing.md).
   Then look: extract a 2 fps contact sheet and compare it with the reference breakdown of your
   archetype (`references/breakdowns/`). Judge pace/colour with real plates or `PlaceholderStills`,
   never with grey placeholders (they read too light and too static by design).

```tsx
// src/Main.tsx - the shape of every film
const g = beatGrid(85, 30);
const D = beatDurations(g, [5, 3, 2.5, 4, 3]);           // the first content scene starts on beat 5 = the drop
export const SCENES: SceneSpec[] = [
  {dur: D[0], bg: 'paper', out: {type: 'zoom'}, el: <Lockup left={{name: 'Brand MCP', weight: 700}} right={{name: 'Claude', font: FONT.serif}} liftAt={30} />},
  {dur: D[1], bg: 'none', in: {type: 'thermal', palette: 'v1'}, out: {type: 'burn'}, el: <Footage src="plates/photo.jpg" />},
  {dur: D[2], bg: 'white', el: <ClaudeStatus lines={['Analyzing photo input', 'Reading the diagnostic report']} at={2} outAt={50} />},
  {dur: D[3], bg: 'white', in: {type: 'blur'}, el: <BeforeAfter before={{src: 'plates/before.jpg'}} after={{src: 'plates/after.jpg'}} at={30} />},
  {dur: D[4], bg: 'white', el: <EndCard lines={['Product name', 'Available now on brand.ai']} />},
];
```

## Library (`templates/remotion`, import from `./hfm`)

| area | exports |
|---|---|
| engine | `Scene`, `Timeline` (`theme`), `SceneSpec`, `totalFrames`, `sceneStarts`; Fx `blur fade whip zoom emerge rise thermal glitch burn cut`; `push` |
| profile | `MotionProfile` (`preset="reference"` 1/1 or `"reels"` speed 1.2 / UI 1.35), `useSpeed`, `useUi`, `scaled`; `useShort` (sizes are px at a 1080 short side) |
| screen | `ScreenStudio` (device `laptop` default / `phone` / `browser` / `window` / `none`; camera glides + auto-zoom to element rects, cursor or touch clicks, spotlight with label, motion blur), `findEl`, `Capture`, `ScreenKey`, `CursorKey` |
| graphics | `Terminal`, `Toast`, `ChipStack`, `BarChart`, `LineChart`, `Donut`, `Metric`, `FileMap` (named agent cursors), `dotsField` |
| backgrounds | `bg`: `paper` (lime/pink glows + halftone), `list`, `offer`, `white`, `sky` (blue corners + dot grid), `peach`, `acid`, `dark`, `darkGrid`, `calendar`, `tech`, `none`; `Paper`, `Glows`, `Dots`, `Grid`, `TechFrame` |
| text | `Stream`, `ClaudeLines`, `Scramble`, `GlyphFade`, `Counter`, `Shimmer`, `SweepText`, `BlurIn`, `HeroWord` |
| motion | `Flow` (v1 scroll choreography), `Pop`, `CameraPath`, `Drift`, `Punch`, `Blank` |
| labels | `Sticker`, `Tag`, `BATag`, `Brackets`, `Pill`, `Lockup`, `SlashTitle`, `SlashList`, `SlashWipe`, `SkillHeader`, `EndCard`, `Spark`, `IconTile`, `CornerMarks`, `Blink` |
| UI | `ClaudeComposer`, `PillComposer`, `ClaudeStatus`, `AgentStatus`, `Chip`, `Choice`, `FileCard`, `DetectBox`, `BalanceCard`, `Critter`, `CritterRing` |
| media | `Footage`, `MediaFill`, `MediaCard`, `CardToFull`, `BeforeAfter`, `MediaGrid`, `ThumbWall`, `CardStack3D`, `ScreenFan3D`, `Carousel`, `PinkReveal`, `GradientMap`, `Coins`, `Wheel`, `FloatIn`, `PlaceholderStills` |
| tokens | `COLOR`, `FONT`, `BG`, `THERMAL`, `FX`, `BIRTH`, `CLAUDE_RAMP`, `FLOW`, `POP`, `SPRINGS`, `UI`, `HEADER`, `WIPE`, `TAG`, `END`, `SCRAMBLE`, `STICKER` (all measured; don't edit to "taste"), `SAFE` (Reels UI bands), `Theme` / `setTheme` / `mixHex` (brand palette via `Timeline theme`) |
| audio/beat | `Sfx` (whoosh, swish, riser, impact, glitch, click, typing, pop, ding, coin, tick), `beatGrid`, `onBeat`, `beatDurations`, `snap` |

What each one looks like, when to use it and its measured parameters: `references/techniques.md`.

## Rules the measurements back up

- Enter (almost) every shot through a focus pull or a stronger designed entry; give UI blocks a
  `Flow` exit (rise in from +170 px, drift, accelerate out upward with blur).
- Between same-type sections use `thermal`; title -> content `zoom`; UI -> UI `Flow` / `whip up` /
  2-3 f white beat; photo -> UI `burn`; numbers/urgency `glitch` (to black, back to paper in 8 f).
- Fresh text is coloured before it settles: birth ramp (Higgsfield), Claude ramp (Claude collabs),
  cyan head (pill composer), lime/pink scramble head (offers). Settled text is ink or grey.
- One lime + one pink (or the Claude coral). Paper, ink and greys everywhere else; no gradients on
  cards except the lime balance card and the thermal/duotone looks.
- Numbers count linearly (balances in 10 f, pools at a constant rate); big money that should feel
  written uses `GlyphFade`. Springs only on mascots, the input pill and partner logos.
- Show UI huge and cropped and move a `CameraPath` to the action; punch in with two keys one frame
  apart (x1.475, x2.1, x2.3). Holds drift 1-2 %/s (`push`).
- A website is shown on a **laptop** (desktop capture), also in 9:16; the phone frame is for
  mobile-app screens only. Establish the device for ~9 f, then glide onto the element.
- Status copy is what the agent is doing now; results land with a period; claims are 2-3 uppercase
  words per line; end card = product + availability in two small uppercase lines.

## Anti-patterns (break the look)

- Static sharp frames longer than 2 s; plain crossfades; slides without blur; ease-in-out on entries.
- Bouncy springs on type or UI; counters with ease-out "slot machine" curves (measured: linear).
- Dark-mode-by-default, purple/blue gradients, drop shadows on everything, coloured card fills.
- More than one accent family; neon on neon; glow on text.
- Voice-over-driven pacing (these films are music + type); captions instead of designed type.
- Shipping grey placeholders, or redrawing real logos instead of using supplied files.

## References

- `references/archetypes.md` - the four story structures with frame-by-frame plans
- `references/techniques.md` - every device -> component -> parameters -> reference
- `references/editing.md` - beat-sheet rules, transition choice, sync, on-screen copy, 9:16, fixes
- `references/measurements.md` - all numbers: pace, transitions, focus-pull calibration, curves, type, colour, validation
- `references/audio.md` - tempo, structure, SFX, loudness, the synth bed
- `references/reels.md` - 9:16 product reels: profile, safe zones, theme, pace, site capture -> laptop shots, screenshots, rebuilt graphics, checks
- `references/assets.md` - sources per archetype (site capture, screenshots, generated plates), prompts, logos, fonts
- `references/breakdowns/v1..v4-*.md` (+ `.segments.json`) - shot-by-shot forensic breakdowns of the references
- `references/fingerprint.json` - reference metric ranges used by `check_render.py`
- `templates/examples/*.tsx` - four rendered shot-for-shot rebuilds + `AgentmashReel` (9:16 reel from a live site); `templates/project/` - scaffold
- `scripts/setup_project.sh`, `capture_site.mjs` (site -> viewport frames, full page, element rects, palette), `ui_regions.py` (screenshot -> numbered regions), `synth_audio.py`, `master.sh`, `check_render.py`, `fingerprint.py` (measure any new reference the same way)
