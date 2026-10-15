# Editing: pace, transitions, sync, copy

## Build the edit as a beat sheet first

Write the film as a table before any code: `scene | frames | bg | in | out | content | sfx`. Rules
that keep it inside the measured envelope:

1. **Intro = lockup or title, 56-130 f** (v4 56, v3 64, v1 111, v2 130). It ends with a designed
   exit (zoom-whip, thermal, dolly-through) and **the music drops on the first content cut**.
2. **Content shots median 60 f (2 s)**, p10 24 f, p90 128 f. Status/claim cards 30-55 f, UI macro
   shots 90-115 f, before/after shots 70-110 f (BEFORE holds 20-45 f before the wipe), bundles
   ~165 f per feature.
3. **An event every 0.5-1.7 s**: a cut, a focus pull, a wipe, a scramble landing, a counter step,
   a camera punch. If a shot holds longer than ~2 s with nothing happening, add a push, a counter,
   a second line, a chip, a highlight.
4. **Spend 20-36 % of the runtime in a blur.** Default every scene entry to `blur` (or a stronger
   designed entry), give UI blocks `Flow` exits, use motion-blurred camera moves.
5. **Designed transitions ~3 of 4.** Pick by job:
   - same-type sections (feature after feature) -> `thermal` (out 9 f + in);
   - title -> content -> `zoom` out (7 f) or a dolly-through;
   - UI block -> next UI block -> `Flow` exit up, or `whip` up, or a 2-3 f white beat;
   - photo -> UI -> `burn` + shrink into the attachment;
   - urgency/numbers -> `glitch`, `glitch` to black, black -> paper in 8 f;
   - zoom into a card -> `emerge`, `CardToFull`;
   - inside a shot -> `CameraPath` punch-in (two keys a frame apart).
6. **End**: white end card (2 short uppercase lines, cap 3.5 %H) holding 44-58 f, music stopped -
   or a static CTA line over the hero footage (v1), or the lockup again with a slow push (v3).

Lengths: 26 s (offer), 41-47 s (demo, bundle), 60 s (story). For a 15 s cut keep: intro (~45 f),
3-4 strongest beats, end card (~40 f). For 30 s: intro, 6-8 beats, end card.

## Sync

- Measured: scene cuts are not locked to the beat grid at +-2 f (they are close to the dense 1/16
  hat grid by construction). What is synced: **drop = first content cut**, **808 back = reveal
  cut** (after a 0.3-1 s sub drop-out), **music stop = end card**, **riser -> big reveal**, hits on
  presses/explosions (v1 loudest hit one frame before the white flash).
- Practical: compute scene durations from beats with `beatDurations(beatGrid(bpm, fps), [...])`
  so cuts land on beats without drift; then nudge inner events to the action.
- At 85 BPM / 30 fps a beat is 21.18 f, a bar 84.7 f; at 132.5 BPM a beat is 13.58 f.

## Copy on screen

- Status lines = what the agent is doing right now, present continuous, specific:
  "Analyzing photo input", "Checking if this car can handle a monster truck build",
  "Reading 324 comments on top dramas". One bold lead sentence max: "**Frame is in perfect
  condition.** This rig is a prime candidate for mods."
- Results land as short declaratives with a period: "Your app blueprint is ready."
- Claims (offer): uppercase, 2-3 words per line, numbers huge: "100% {CASHBACK}", "WE'RE
  ALLOCATING / $20,000,000", "FIRST COME, / FIRST SERVED", "[SEPTEMBER ONLY]".
- Section titles are commands: "/color-grading". Descriptions 150-260 characters, typed in 1 s.
- End card: product + availability, uppercase, no exclamation marks: "AVAILABLE NOW ON BRAND.AI".
- No voice-over; the text must carry the story without sound.
- Russian: same rules; lines run ~15 % wider, so trim words, not font size.

## Vertical (9:16) versions

Product reels have their own rules (pace x1.4, safe zones, laptop shots of the site, rebuilt
graphics, theme): `references/reels.md`. To re-cut a 16:9 film vertically: render 1080x1920 inside
`MotionProfile preset="reels"` (sizes are px at the 1080 short side, so type keeps its size; stack
what sat side by side), keep text inside `SAFE`, put chips at 60-75 %H, and keep the pace.

## When check_render.py says OUTSIDE

| metric | fix |
|---|---|
| events/10 s low, gap high | shorten holds, add punches/counters/second lines, split long shots |
| events/10 s high | merge micro-shots, let lockups and the end card breathe |
| blurred share low | default entries to `blur`, add `Flow` exits, motion-blurred camera moves, thermal between sections |
| blurred share high | shorten blur tails (`frames` on `blur` in), fewer stacked blurs |
| light share high / saturation low | real plates instead of placeholders; add a dark scene (offer) or colour plates |
| motion low | add `push`, camera moves, scrolls; avoid static stills without push |
| LUFS | run `scripts/master.sh` |
