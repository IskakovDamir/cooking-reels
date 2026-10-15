<!-- Frame-accurate forensic breakdown of reference v2, produced by a measuring agent (template matching, blur fits, colour sampling). Numbers are measured at 1276x718 and converted to 1080p. Use it to rebuild a shot exactly; the library defaults already encode the recurring values. -->

# v2 — Higgsfield "PRODUCTION SKILLS BUNDLE for Claude Opus 5.5" — forensic motion breakdown

Source: `videos/v2.mp4`, 1276x718 (IG downscale of 1920x1080), 30 fps, 1399 frames (46.63 s), AAC audio.
Conventions: all frame numbers are 0-based source frames at 30 fps. Pixel values are measured at 1276x718 and
converted to 1920x1080 with x1.504 (written as "@1080"). "%W / %H" = percent of frame width / height.

---------------------------------------------------------------------------------------------------
## 0. Global facts you need before anything else

* **Two time bases.** Every live-action / render clip inside the edit is a **25 fps source dropped into a 30 fps
  timeline by frame duplication** (no blending): an exact duplicate every 5th frame (e.g. 228, 233, 238 ... 263;
  585 ... 700; 782 ... 835). All graphics (header, wipes, thermal, typing, stickers) are rendered at native 30 fps
  (no duplicates). Image-fixer before/after plates are **stills** (928-946, 958-974 are frozen). In Remotion just
  use `<OffthreadVideo>` for 25 fps sources; everything else animates per 30 fps frame.
* **The brand slash "/" is the master motif**: it is the list bullet, the typing cursor, the title-reveal wipe
  head, the end-of-paragraph caret, the giant pink end wipe, and the diagonal wipe lines are drawn at the same
  slant (25 deg from vertical, top leaning right).
* **"Text birth" colour ramp** (used for every newly written word/line, measured on darkest glyph pixels):
  t0 pale lime/yellow (#D8E04A at partial alpha, glyphs thin/squashed) -> t0+1..2 hot pink #D0476D/#C02659 ->
  +3 #A1074D -> +4 #8A0644 -> +5 #730437 -> +6 #560328 -> +7 #380217 -> +8 #20010C -> +9 #070001 (black).
  i.e. ~8 frames pink->black, roughly linear in RGB, plus blur 5-6 px -> 0 on the same window. Faster variant in
  the end list (5 frames).
* **Palette (sampled, median of patches):**
  - background off-white `#FBF9FC` (also `#FDF9FC` in the centre of the intro canvas)
  - hot pink (sticker / BEFORE tag / giant slash) `#EE1174` (tag measures #EC1371-#ED1275)
  - black `#000000` (stickers), text black `#0C0309` / `#100A0A` (very slightly warm), end card `#030104`
  - lime (AFTER tag, wipe line) `#D4FF1F` (line core #D3FF1E; tag reads #D1F916 after chroma loss)
  - lime glow (BEFORE->AFTER energy reveal) `#ECFB66`
  - bg glow lime `#DEF760` / `#D9F950`, bg glow pink `#F38FBA` / `#F28AB9`, corner peach `#E1B48F`/`#E7C291`,
    corner coral `#ED818F`, corner ochre `#E2DB81`
  - Claude coral (asterisk icon, "Opus 5.5") `#D2745C` measured (= Claude brand `#D97757` after compression);
    tagline asterisk lighter `#EC9F8C`
  - thermal LUT: see section "Thermal transition".
* **Fonts (candidates):**
  - Sticker words "PRODUCTION / SKILLS / BUNDLE", BEFORE/AFTER tags, section titles, slash lists: heavy **extended
    grotesk** with single-storey shapes, tight sidebearings — candidates: *Unbounded Black/ExtraBold*, *Monument
    Extended Black*, *Archivo Expanded Black*, *Druk Text Wide Heavy*. Stickers additionally use per-letter size
    jitter ("SKiLLS": S,K 100%, I,L,L ~62%, S ~80%).
  - "Higgsfield" wordmark + description paragraphs + end paragraph: neo-grotesk medium (*Inter Medium 500*,
    *SF Pro Text Medium*, *Aeonik Medium*).
  - "for ✳ Claude Opus 5.5": transitional serif (*Tiempos Text / Copernicus* — Anthropic brand serif; fallbacks
    *Source Serif 4*, *Newsreader*), regular.
  - End card: neo-grotesk regular (*Inter 400* / *Helvetica Now Text*), uppercase.
* **Music**: ~82.5 BPM grid (beat period 21.8 frames; strong onsets at 102, 124, 146, 168, 190, 211, 233, 255, 277,
  299, 321, 342, 364, 386, 408, 430, 451, 473, 495, 517, 539, 561, 582, 604, 626, 648, 670, 691, 714 ...).
  Energy dip 45-60 (riser), drop ~100. Hi-hats drop out at ~1148 (breakdown pad), fade-out 1330->1398.
  Edit sync: hard cut 130 on low onset 130; thermal transitions start on onsets 342, 473, 552, 703(708), 877, 1003;
  sticker pose snaps on 58, 78-80, 100-102, 120-124.

---------------------------------------------------------------------------------------------------
## 1. Segment map (frames, 30 fps)

| # | frames | dur | content | in | out |
|---|--------|-----|---------|----|-----|
| S1 | 0-31 | 32 | Brand lockup build on glow bg (stickers unfold, logo, tagline) | from bg | seamless handoff |
| S2 | 32-122 | 91 | AI image-to-video continuation: real hands press/stretch stickers; sticker pose snaps on beats | seamless (frame 31 = seed) | |
| S3 | 123-129 | 7 | Zoom-whip exit: expo-in scale 1->~2.9, CCW roll -5 deg, directional blur | | hard cut @130 |
| S4 | 130-164 | 35 | Slash stamp -> slash sweeps left writing "/vectorize", list of 10 slash commands stacks & scrolls | hard cut | list scroll-blur up |
| S5 | 165-184 | 20 | Footage panel slides up from bottom (expo-out) and docks under a 17.4%H header; header title rolls exploded-view -> destruction-studio | | |
| S6 | 185-341 | 157 | /destruction-studio: car BEFORE (Blender) -> lime energy reveal -> AFTER; hard cut 271 building BEFORE -> white-line diagonal wipe -> AFTER | | thermal T1 |
| S7 | 342-471 | 130 | T1 thermal (342-367) -> /color-grading BEFORE -> lime wipe 405-434 -> AFTER | thermal | thermal T2 |
| S8 | 472-552 | 81 | T2 thermal (472-496) -> /exploded-view 3D renders, hard cuts 506, 522 | thermal | thermal T3 |
| S9 | 553-702 | 150 | T3 thermal (553-577) -> /shot-composer: plate / matte / composite / sky, 4 baked 45 deg lime hairline wipes | thermal | thermal T4 |
| S10 | 703-875 | 173 | T4 thermal -> /shot-cleanup: valley BEFORE -> lime wipe 748-777 -> AFTER; hard cut 794 studio BEFORE -> lime wipe 837-869 -> AFTER | thermal | thermal T5 |
| S11 | 876-1003 | 128 | T5 thermal -> /image-fixer: portrait still BEFORE -> fast lime wipe 903-926 -> AFTER; line-less diagonal slide 948-956 -> kitchen BEFORE -> lime wipe 975-998 -> AFTER | thermal | thermal T6 |
| S12 | 1004-1176 | 173 | T6 thermal -> /use-touchdesigner continuous AI footage | thermal | linear fade to #FBF9FC 1176-1184 |
| S13 | 1184-1261 | 78 | End lockup rebuild (== S1 frames 1..30 replayed, plain bg, no tagline) -> lockup shrinks 0.67x & rises -> paragraph types in -> hold | from white | giant pink slash wipe |
| S14 | 1262-1340 | 79 | Giant pink "/" sweeps R->L erasing lockup, shrinks into cursor; 9-item slash list stacks, scrolls up, ghost-echo blur | | hard cut |
| S15 | 1341-1398 | 58 | End card (2 uppercase lines) slides up 13.9%H into centre (10 f) and holds 49 f | slide-up | end |

---------------------------------------------------------------------------------------------------
## 2. Segment details

### S1 — Brand lockup build (0-31)

**Background (static, 0-129):** base `#FDF9FC`/`#FBF9FC`. Two radial glows + corner tints + halftone dots:
* Lime glow: centre ≈ (0%W, 75%H), radius ≈ 25%W to fade; peak `#DEF760` at the left edge, y 60-80%.
* Pink glow: centre ≈ (100%W, 38%H), radius ≈ 25%W; peak `#F38FBA` at right edge y≈38%.
* Corner tints: bottom-left `#E1B48F` (peach), top-right `#E7C291` (peach/ochre), both ~8-10%W radius.
* Dot grid over the glows only: white dots ~2 px @1276 (3 px @1080), pitch 10.3 px (≈15.5 px @1080), ~50% alpha,
  masked by glow intensity (invisible on the plain centre).
* Banding rings visible in the gradients are compression artefacts — do not reproduce.

**Elements & timings**

| element | what animates | frames | measured |
|---|---|---|---|
| PRODUCTION sticker (pink #EE1174, white type) | flip-open from edge-on line: rotateX 90->0 about its **bottom edge** (hinge), full width from first frame | 1-8 | visible-area fraction: f2 1.3%, f3 4.8%, f4 16%, f5 85%, f6 94%, f7 98%, f8 100%. Fit: cubic-bezier(0.97,0.02,0,0.95) over 7 f (start 1) — "hold edge-on 3 f, snap open in 1 f, settle 3 f". Bottom edge stays at y≈420-437 (59-61%H) |
| Higgsfield icon (black squiggle) | stroke draw-on (path trim 0->1) at centre x≈47.7%W | 2-8 | ink px: 22,86,196,426,834,1161 (f2-7) |
| Higgsfield icon | slides left 142 px (11.1%W; 214 px @1080) to make room for the wordmark | 8-13 | progress 4,16,65,93,99,100% (f8-13): 4-frame snap, bezier ≈ (0.7,0,0.2,1); 2 f horizontal motion blur |
| "Higgsfield" wordmark | per-letter reveal in random order, each letter blur-in ~2 f | 10-18 | f10 "Hg", f11 "Hi g s", f12-13 "Higgs i", f16 "Higgsfiel", f17-18 full |
| SKILLS sticker (black, white type) | identical flip-open curve, offset +10 f | 11-17 | area 0.9,3.8,11.6,82,94,98,99% (f11-17) |
| whole group re-centre | PRODUCTION jumps up 82 px (11.4%H) and grows 165->186 px tall as SKILLS arrives | 13-15 | PRODUCTION centre y 330,318,261,254,252 (f12-16) -> 0,15,86,95,98% |
| BUNDLE sticker | flip-open + simultaneous horizontal stretch, heavy horizontal motion blur on f21 | 18-23 | |
| Pose swap A->B ("re-pose") | each sticker snaps to a mirrored perspective (left-near -> right-near) and the type switches to condensed/jittered letters; 2-3 f directional blur | BUNDLE 21-22, SKILLS 22-23, PRODUCTION 23-27 | PRODUCTION top edge 168->180->147->117->114 (f23-27) |
| Tagline "for ✳ Claude Opus 5.5" | per-word fade+blur-in, 1-frame stagger: ✳ glow 18, "for" 19-20, "Claude" 21, "Opus" 22, "5.5" 23; blur from ~8 px@1080 resolves for all words together by f30 | 18-30 | sharpness ratio vs final: f24 .12, f26 .29, f27 .44, f28 .64, f29 .75, f30 .96 |
| Hold | static lockup | 27-31 (5 f) | |

**Sticker geometry** (corner-pin targets, %W,%H; TL, TR, BR, BL):
* Pose 0 (f9, PRODUCTION alone, mild right-near): (28.0,35.7) (75.0,34.3) (75.1,59.2) (27.6,49.7). Left edge 101 px, right 179 px.
* Pose A (f17, left-near, "wide" look): PRODUCTION (22.3,20.9) (73.3,33.3) (73.0,47.5) (26.0,48.1) — left edge 195 px, right 102 px.
  SKILLS (16.9,48.6) (56.8,48.1) (59.2,68.8) (12.3,70.5) — italic slant ≈ 20.6 deg.
* Pose B (f31, final, right-near, "condensed" look): PRODUCTION (26.5,25.1) (72.3,14.8) (74.4,45.1) (24.3,38.0) — left edge 93 px vs right 218 px
  (2.34x perspective ratio; top edge rises 7.2 deg, bottom falls 4.6 deg).
  SKILLS (12.5,36.5) (54.6,42.9) (55.6,59.2)* (15.1,69.2). BUNDLE (30.4,63.0)* (83.3,50.6) (83.5,79.5) (33.0,79.1). (*extrapolated, hidden corner).
  Stacking order: PRODUCTION under SKILLS, BUNDLE on top. Lockup bbox x 12.5-83.5%W, y 14.8-79.5%H.
* Type inside stickers: white, ~70-75% of sticker height, left/right padding ≈ 5% of sticker width; SKILLS letter
  sizes S,K 1.0 / I,L,L 0.62 / S 0.8 (baseline-aligned at bottom).
* Higgsfield lockup (final): icon x 34.3-39.3%W, y 6.8-14.6%H (84 px @1080); wordmark x 40.5-61.6%W, cap 44 px
  (6.1%H, ≈66 px cap @1080 -> font-size ≈92 px). Logo block centre x ≈48%W.
* Tagline: x 30.6-69.7%W, y 82.2-90.1%H, cap ≈33 px (4.6%H, ≈50 px @1080, font-size ≈69 px). "for"/"Claude"
  `#111` ink, ✳ `#EC9F8C` (thin 12-ray spark), "Opus 5.5" `#D87659`.

### S2 — AI hands (32-122)

Image-to-video continuation seeded on frame 31 (frames 31->32 differ by 1.5 mean luma; no dup frames -> native 30 fps).
Logo, tagline and background stay locked; two photoreal hands enter from the bottom at 33-35 (right hand from
bottom-right, left from bottom-left), press and pinch the stickers (36-58), then hold sticker corners (60-122).
Stickers do **pose snaps** — the sticker group jumps to a new corner-pin pose in 2-3 frames with directional
motion blur, logo/tagline untouched:

| snap | frames | pink sticker width (px @1276) |
|---|---|---|
| up | 76-80 | 611 -> 707 (+16%), top edge 116 -> 19 |
| down | 85-88 | 707 -> 581 |
| up | 99-102 | 593 -> 611, top 82 -> 17 |
| down | 107-110 | 597 -> 540 |
| up | 114-115 | 546 -> 556 |
| up | 119-121 | 566 -> 642 |
| exit | 123-129 | see S3 |

Snaps land on beat 80, 102, 124 and the off-beats ~86, ~108, ~120.

### S3 — Zoom-whip exit (123-129) -> hard cut 130

Sticker group scale (sqrt of black area, f122 = 1): 1.00 (122), 1.02 (123), 1.06-1.10 (124), 1.12-1.21 (125),
1.34 (126), 1.56 (127), ~2.0 (128), ~2.9 (129; optical-flow estimate). Per-frame ratio grows 1.03 -> 1.47 => **expo-in**.
Zoom anchor ≈ (50%W, 59%H) (SKILLS/BUNDLE stay in frame, PRODUCTION exits top). From 126 the whole frame (logo
too) zooms; rotation 0 -> -5 deg (counter-clockwise, mostly 128-129). Directional blur along the sticker axis
(≈ -10 deg from horizontal): ≈30 px @1080 (126), 48 (127), 68 (128), 77 (129). Logo/tagline layers scale but
are much less blurred. Hard cut at 130 (hdiff 1.35) on a low-end hit.

### S4 — Slash stamp + command list (130-165)

New background (static): lime glow left (peak `#D9F950` at y≈63%H), coral corner BL `#ED818F`, pink glow right
(peak `#F28AB9` at y≈50%H), ochre corner TR `#E2DB81`, same dot grid. Radial-gradient centres ≈ (0%,63%) r≈38%W and
(100%,49%) r≈27%W.

* 130-134 **Slash stamp**: black "/" at frame centre (50%,50%) scales 1.9x -> 1.0x; heights 107,81,69,61,56 px
  (final slash = 56 px = 7.8%H, 84 px @1080). Progress 31,65,81,92,99% => quintOut, ~8 f (start 129.4).
* 135-140 **Slash sweep**: slash travels left from x≈50% to ≈13%W (640 -> 285 px by 139 -> 160 px by 141) with
  strong horizontal smear (rendered as a wide grey 50%-alpha parallelogram at 135-137). Letters of "vectorize"
  appear **behind (to the right of) the moving slash**, born pale lime/peach, wide-tracked and thin, tightening and
  pinking (138-140), black by ~150.
* 140-160 **List stacking** (items, first-visible frame): vectorize 138, project-sorter 140, cartoon-shaders 144,
  scene-builder 148, color-grading ~152, use-touchdesigner ~157, image-fixer ~161, shot-cleanup ~165,
  shot-composer ~167, exploded-view ~168. Every new line starts with a big slash (≈2.3x, 140 px tall at f140) that
  stamps down to 1x in ~4 f, then its word is written to the right of it with the text-birth ramp (8 f to black).
* Layout: left x = 155 px (12.1%W, 233 px @1080); line pitch 109 px (15.2%H, 164 px @1080); x-height 34 px
  (4.7%H, 51 px @1080; font-size ≈ 90 px @1080); slash glyph 60 px tall.
* Scroll: list top y 328 (146), 316 (150), 281 (154), 206 (158), 140 (160), 94 (161), 34 (162) — accelerating
  (3 -> 60 px/frame, ease-in), then 162-166 heavy vertical motion blur (smear ≈ 40-60 px @1276) and out the top.

### S5 — Panel dock + header roll (165-184)

* Footage panel (false-colour version of the next clip) rises from the bottom; top edge y (px@718):
  562 (166), 456, 384, 331, 291, 259, 233, 211, 193, 178, 166, 155, 147, 141, 135, 131, 128, 126, 125 (184).
  Progress 26,44,56,65,72,77,82,85,89,91,93,95,96,97,98,99,99.5,100%. Fit: **expo-out, 19.5 f from 165**
  (cubic-bezier(0.08,0.42,0.14,1.0); `Easing.out(Easing.exp)` over 29 f also fits rms 0.8%). The rising edge carries a
  ~25 px vertical motion-blur band.
* While the panel rises, the list keeps rolling up behind the header area: "/shot-composer" and "/exploded-view"
  decode in (167-171) and "/exploded-view" lands as the **header title** at 172.
* 174-181 header **slot roll**: "/exploded-view" scrolls up out of the header while "/destruction-studio" is revealed
  right-to-left behind a pink translucent block cursor (f175 "dio", 176 "on-studio", 177 "truction-studio",
  178 "struction-studio", 179 "destruction-studio", 180 "/destruction-studio"); title pink-red 180-185 -> black 188.
* A pink "/" caret at x≈62%W, y≈15%H (168-174) becomes the description caret.
* Simultaneously the panel content transitions from neon false-colour (green/yellow/magenta gradient map) to the
  real Blender grey over 170-181 (frame saturation 0.50 -> 0.06).

**Header bar (persistent 172-1183)** — height 125 px = **17.4%H (188 px @1080)**, bg `#FBF9FC` with a lime/ochre
radial glow off the right end (x>86%W: `#F5F4D3` -> `#E5E489` at the edge, warmer `#E6D182` at the bottom) and a
faint lime tint bottom-left. No border/shadow; hard edge to footage.
* Icon: Claude-style coral spark (12 irregular rays), x 2.4-7.6%W, y 4.5-13.8%H (≈66 px -> 99 px @1080), colour
  settles to `#D2745C`. First entry 185-194: scale 0->1 (widths 8,25,35,43,48,52,56,58,58,60 px => quintOut ~16 f
  from 184.5), hue cycle lime `#E9FF86` (185-187) -> mustard `#D3D660` (188-189) -> orange `#D0A15E` (190-192) ->
  coral `#CD665E` (193-194) -> pink-red `#C93660` (195-199) -> back to coral `#CC6A62` (208+). Afterwards it loops
  a 30-frame (1 s) "boiling" pose cycle (shape morphs in steps every 2-3 f; identical poses at 212/242/272/302).
* Title: "/<skill-name>", lowercase, heavy extended grotesk, black `#0C0309`. Left x 97 px (7.6%W, 146 px @1080),
  baseline y 87 px (12.1%H), x-height 33 px (4.6%H, 50 px @1080 => font-size ≈ 88-90 px), ascender 45 px (6.3%H).
  Long names are scaled down: destruction-studio x-height 31 px (x 106-794, i.e. ends at 62.2%W),
  use-touchdesigner 28 px. Max title width ≈ 55%W.
* Description: neo-grotesk medium, `#100A0A`, left-aligned block whose **right edge is fixed at 97.8%W (1878 px @1080)**;
  line pitch 23 px (3.2%H, 34.6 px @1080), cap ≈ 11 px (≈ 16.5 px @1080, font-size ≈ 23-24 px @1080), 3-4 lines,
  vertically centred in the bar (block centre ≈ 9.2%H). (destruction-studio: 5 lines, smaller ≈ 0.78x, right edge 94.9%W.)
  Texts:
  - destruction-studio: "Generates destruction scenes in Blender: car crashes, building and bridge collapses, and more. Configures fracturing, debris physics, breakable constraints, dust, and camera movement - driving the workflow from base model to final animation."
  - color-grading: "A color grading skill for DaVinci Resolve Studio. Analyzes shots and references to balance exposure, white balance, contrast, and saturation while preserving natural skin tones and shot-to-shot consistency. All generated node trees remain fully controllable."
  - exploded-view: "Animates layer-by-layer assembly or disassembly of objects and full scenes in Blender. Perfect for high-impact product reveals that showcase internal mechanics, components, and device architecture."
  - shot-composer: "A skill for crafting VFX shots in After Effects. Works with green screen footage or existing layers, generating missing pass layers motion-matched to the source video as needed."
  - shot-cleanup: "A dedicated skill for cleaning up plates in After Effects. Removes markers, unwanted objects while seamlessly reconstructing clean plates, matching texture."
  - image-fixer: "Cleans up unnatural textures or unwanted objects from sets, smooths surfaces, fixes visual anomalies, and enhances detail in noisy areas."
  - use-touchdesigner: "Simplifies TouchDesigner workflows by creating, tweaking, and controlling real-time video FX via an AI agent. Select effects from the library or describe them using text or image references."
* Description typing: word-by-word, **≈7.5 characters/frame (≈225 chars/s)**; each new word appears pink
  (`#E2457E`-ish, blurred ~5 px @1080) and resolves to black ~6 f later; black "/" caret follows the last word
  (moves to the next line start when wrapping). Measured completions: color-grading (≈260 ch) 363->397,
  exploded-view (≈197 ch) 493->517, shot-composer (≈178) 575->603, shot-cleanup (≈152) 724->744,
  image-fixer (≈137) 897->915, touchdesigner (≈190) 1025->1052.

### S6 — /destruction-studio (185-341)

* 182-211 BEFORE: Blender viewport screen recording (grey car hits a pole), full-bleed below the header (no editorial
  zoom — UI is static). BEFORE tag present.
* **211-224 Lime energy reveal (BEFORE -> AFTER)**: AFTER footage is revealed through an organic mask that starts at
  the pole (x≈22%W) and spreads along the car to the right; the mask frontier carries a lime glow `#ECFB66`.
  Lime-pixel coverage of the footage: 1.5% (212), 4.9% (213), 21% (214-216), 14% (218), 9% (220), 0 (222).
  Reveal 211-216 (6 f), glow haze decays 216-222 (≈7 f). Frame luma jumps 138 -> 186 at 213-214.
* 211-218 Tag swap BEFORE -> AFTER (see "Tag swap").
* 219-270 AFTER: real slow-motion car crash (25 fps source).
* 271 hard cut (between low onset 267 and beat 277; not tightly beat-locked) -> building BEFORE (Blender render, light grey `#D8D8D8`, 25 fps).
* **297-322 diagonal wipe with WHITE line** (only white-line instance): line x at y=400 (55.7%H):
  155 (298), 289, 400, 478, 532, 573, 598, 617, 630, 638, 644, 646, 647 (310), 651, 657, 668, 684, 707, 739,
  784, 850, 945, 1072 (320), off at 321-322. => in 297-309 (quintOut, ~17 f from 296.5), hold 309-311 at 50.8%W,
  out 311-322 accelerating. Line 8-9 px wide @1276, `#FFFBF8`. Left of line = AFTER (aerial demolition), right = BEFORE.
* 314-320 tag swap -> AFTER; 322-341 AFTER (dust cloud).

### Thermal transition (T1 342-367; same recipe T2-T6)

Applied to the **whole frame including the header** (title + description blur and get tinted; header bg turns peach/orange on the right).

| phase | T1 frames | measured |
|---|---|---|
| blur ramp | 342-348 | equivalent gaussian sigma @1080: 1.5 (342), 3.1, 4.7, 6.1, 7.3, 8.2, 8.7 (348) |
| thermal gradient-map + posterize fade-in | 343-349 | warm tones creep from highlights; full LUT by ~348 |
| hold at max (σ ≈ 9-10 px @1080, ~7-8 posterize levels) | 348-351 | |
| content swap (crossfade inside thermal) | 351-354 | correlation to outgoing 0.74 -> 0.43 -> -0.14; incoming visible by 354 |
| header title cleared, pink caret at x 55.5%W | 357 | |
| thermal fade-out | 355-363 | saturation 0.39 (355) -> 0.15 (363) |
| blur decay (long tail) | 360-390 | σ @1080: 6.8 (360), 5.9, 4.8, 3.9, 3.5, 3.3, 3.0 (366), 2.5 (368), 2.1 (370), 1.8 (372), 1.3 (375), 1.1 (380), 0.8 (390) |
| residual posterization | 363-371 | visible banding on skin, smooths out |

Thermal LUT (gradient map by input luminance; k-means at peak frames 350/486/564/712):
`0.00 #3A2729 · 0.30 #3F2D31 · 0.45 #4C4B52 (slate) · 0.52 #772520 · 0.60 #A60900 · 0.67 #D03A01 · 0.75 #E35800 · 0.83 #EC7C02 · 0.90 #F39F0E · 0.95 #F5BD49 · 0.98 #F7DFB8 · 1.00 #FAE8D3`
(dark areas = aubergine/slate, mid = deep red, highlights = orange -> cream). Bright incoming plates therefore flash
almost entirely orange/yellow (T2 sat peaks 0.84 at 483-484; luma 90 -> 180).

All six thermal transitions (start = first blur frame, on a music onset):

| T | start | swap | thermal peak (sat) | sharp again | title sweep start | next section |
|---|---|---|---|---|---|---|
| T1 | 342 | 351-354 | 349-353 (0.44) | ~372 | 357 | color-grading |
| T2 | 472 | 480-486 | 482-485 (0.84) | ~498 | 486 | exploded-view |
| T3 | 553 | 565-569 | 563-566 (0.85) | ~582 | 569 | shot-composer |
| T4 | 703 | 711-713 | 711-714 (0.67) | ~730 | 717 | shot-cleanup |
| T5 | 876 | 881-886 | 884-886 (0.60) | ~901 | 890 | image-fixer |
| T6 | 1004 | 1013-1018 | 1011-1016 (0.63) | ~1030 | 1019 | use-touchdesigner |

Total ≈ 24-26 frames start -> readable; title sweep starts at T+14..16.

### Title slash-sweep (every section after a thermal)

The new title is written **right-to-left by its own slash**: the "/" appears at x = 708 px (55.5%W) at frame T0 and
travels to x = 97 px (7.6%W) in 13 frames; glyphs appear immediately to the right of the moving slash (clip-reveal),
so the word fills in backwards ("ding" -> "or-grading" -> "olor-grading" -> "/color-grading").
Measured slash-left x (identical in all 5 later sections): 708, 704, 696, 679, 650, 602, 475, 261, 174, 135, 115,
104, 98, 97 => progress 0,1,2,5,9,17,38,73,87,94,97,99,100,100%. Fit: **cubic-bezier(0.84,0,0.19,1) over 13 f**
(≈ expo-in-out). At peak speed (f6-7, ≈ 230 px/f @1276) the slash is drawn as a wide translucent pink
parallelogram (motion smear) — the "pink selection box" seen behind the first letters.
Title colour: born yellow-orange `#E19229`/`#D9A520` under the residual thermal tint (T0..+6), hot pink by +8,
crimson `#BE1E5A` +12, maroon `#710838` +13, black `#130009` by +18.

### S7 — /color-grading (357-471)

* 357-363 BEFORE tag entry: centre-out (1 char 359, "FO" 360, "EFOR" 361, "BEFORE" 362), box grows from centre
  with glow, sharp at 363.
* 362-404 BEFORE: graded-flat shot of a woman in a cockpit (source has its own camera move: pull-out ≈1%/f and roll
  +0.33 deg/f — keep the clip as-is).
* **405-434 lime diagonal wipe** (canonical preset, see section 3.4). AFTER shows the same shot graded + a DaVinci node
  strip overlay (baked in footage).
* 431-438 tag swap BEFORE->AFTER. 439-471 AFTER.

### S8 — /exploded-view (472-552)

T2 thermal 472-496 (incoming white product render flashes orange). Title sweep 486-499. No BEFORE/AFTER tags.
496-505 Blender render of a white synth device (layers start separating), **hard cut 506** to macro close-up of the
key bed (static camera, parts lift), **hard cut 522** to wide exploded stack on grey `#C8C8C8`-ish gradient (parts
float apart, 25 fps). Hold until T3 at 553.

### S9 — /shot-composer (553-702)

T3 thermal 553-577; title sweep 569-582. All wipes here are **baked into the source clip** (25 fps, duplicate every
5th frame): thin lime hairline (`#E7F360`-`#F5FF6E`, ≈3 px @1080) at **45 deg** (top-left to bottom-right), moving
right->left at constant speed (linear): 
* W1 577-602 plate (woman drinking, grey studio) -> alpha matte (white silhouette on black); ≈88 px per source frame.
* W2 614-642 matte -> composite on green hills / blue sky; ≈80 px/source frame.
* W3 652-670 composite -> sky/cloud plate (lower part transparent checkerboard); ≈120 px/source frame.
* W4 672-695 clouds -> final composite (woman, hills, clouds); ≈92 px/source frame.
Rebuild: x(f) linear, ≈73 px per 30-fps frame @1276 (≈110 px @1080), crossing in 18-28 frames.

### S10 — /shot-cleanup (703-875)

T4 703-728; title sweep 717-730; BEFORE tag from ~719 (pink from 724).
724-747 valley with construction site BEFORE; **lime wipe 748-777** (identical curve to color-grading, see 3.4);
765-772 tag swap; 773-793 AFTER (clean valley). **Hard cut 794** -> studio with lighting gear BEFORE (tag instantly
BEFORE); **lime wipe 837-869** (same curve, starts 1 f slower: 837->853 hold 853-854); 852-858 tag swap; 859-875 AFTER.

### S11 — /image-fixer (876-1003)

T5 876-900; title sweep 890-902; BEFORE tag ~891-898.
898-903 BEFORE portrait (still image). **Fast lime wipe 903-926**: x@400 = -82 (903), -62, 22, 157, 322, 446, 524, 574,
606, 627, 640, 647 (914), 649, 651 (916), 658, 671, 692, 725, 775, 852, 977, 1142, 1277, 1362 (926)
=> in 11 f (fit cubic-bezier(0.44,0.56,0.24,0.94) from 903.5), hold 2 f, out 10 f (time-mirrored).
919-925 tag swap. 927-947 AFTER still.
**948-956 line-less diagonal slide**: kitchen still revealed left->right behind a hard 25 deg edge (no line, no glow),
edge x@400: 180 (950), 424, 712, 948, 1124, 1244 (955), done 956 — single pass ≈8 f, ease-in-out, peak 288 px/f.
953-955 tag swap AFTER->BEFORE. 956-974 kitchen BEFORE still; **lime wipe 975-998** (frame-for-frame identical to
903-926 shifted +72); 989-995 tag swap. 995-1003 AFTER.

### S12 — /use-touchdesigner (1004-1176)

T6 1004-1028; title sweep 1019-1032; continuous AI-style footage of a person holding a sheet with live magenta/green
video FX (no tags). **1176-1184 linear crossfade to `#FBF9FC`**: frame mean +15.3/frame, i.e. opacity 0->1 linear over
8 frames (header fades with it).

### S13 — End lockup (1184-1261)

* 1184-1212: exact replay of S1 frames 1-29 (mask XOR error < 2% for offset 1183) on flat `#FBF9FC` (no glows, no
  dots) and **without the tagline**; the re-pose (B) differs slightly.
* **1213-1223 shrink & rise**: whole lockup scales to **0.67x** (pink sticker width 586 -> 396 px) and its centre
  rises ≈17 px; widths 586,471,440,426,418,412,407,403,401,399,398 => 2,61,77,85,89,92,94,96,97,98,99%:
  1 f snap with motion blur + long settle (fit cubic-bezier(0.09,0.72,0,0.93) over 11 f from 1213; expoOut ~10 f).
  Final lockup: logo icon+wordmark x 40.3-57.1%W, y 13.0-18.7%H; stickers bbox x 27.4-70.3%W, y 19.5-57.7%H.
  PRODUCTION (35.4,24.2)(63.9,19.5)(65.1,36.4)(34.2,31.6); SKILLS TL (27.4,31.5) TR (52.7,35.1) BL (28.8,51.3);
  BUNDLE TR (70.3,40.0) BR (70.2,57.5) BL (39.4,57.7).
* **1214-1247 paragraph typing**: "Proprietary Higgsfield skills built for Claude Opus 5.5 that dramatically accelerate
  workflows in professional creative software and supercharge production processes for teams of any size."
  (188 chars, 4 lines). Leading edge 1214 -> ~1238 (≈7.8 chars/f), words born blurred lime-yellow (first 2-3 words,
  1214-1218) then pink, resolving to black ≈8-9 f behind the caret; fully black at 1247. Black "/" caret after the last
  word (also on the empty line start when wrapping).
  Layout: left-aligned at x 213 px (16.7%W), lines top 465/510/556/601 (64.8%H first line), pitch 45.5 px (6.3%H,
  68 px @1080), cap ≈ 22 px (3.1%H, font-size ≈ 46 px @1080), medium weight, `#090308`; longest line ends 83.5%W.
* 1247-1261 hold (15 f).

### S14 — Giant slash wipe + end list (1262-1340)

* **1262-1265 giant pink slash**: a full-frame-height "/" in `#EE1174` (≈13x cursor size, width ≈30%W incl. smear)
  sweeps from bottom-right to left (x: enters 1262 at right edge, centre ≈70% (1263), ≈35% (1264), ≈12% (1265)),
  with a multi-copy echo/motion trail to its right that erases the lockup (frame 1264: lockup visible only left of
  the slash, faded by the trail).
* 1265-1276 the slash decelerates into the top-left, **shrinks and darkens**: x-extent 405 -> 302 -> 239 -> 201 -> 176 ->
  159 -> 147 -> 138 px, colour `#D4006D` -> `#C30063` -> `#B5005B` -> `#A80056` -> `#9C0051` -> `#8F004B` -> `#830044`
  -> `#760038` (1272) -> `#721142` -> `#5D002F` -> `#4D0025` -> `#40001E` (1276) and becomes the 55 px black cursor at
  (8-10%W, 46-54%H) by 1277.
* 1277-1282 cursor drifts right, accelerating (x 99,103,107,112,120,130), 1283-1287 jumps to x = 483 px (37.9%W) with
  horizontal smear while "project-sorter" is written to its right (text x 519 = 40.7%W), pink `#CD6C91` -> `#AE0B51` ->
  `#980847` -> `#6E0733` -> black in **5 f** (faster ramp than the intro).
* Items (first frame): project-sorter 1283, vectorize 1290, cartoon-shaders 1297, scene-builder 1303,
  color-grading 1308, use-touchdesigner 1314, shot-cleanup 1319, shot-composer 1326, exploded-view 1331-1333
  (≈6-7 f apart). Each new line: a slash caret appears on the next line ~2-3 f before the word; the word "unfolds"
  vertically — first frame is a row of dots/dashes (glyphs at scaleY≈0.1), then full glyphs, pink, then black.
* Layout: line pitch 70 px (9.75%H, 105 px @1080), x-height 17 px (2.4%H, ≈26 px @1080; font-size ≈45 px).
* Scroll: first-line top y 339 (1290), 338 (1295), 331 (1300), 295 (1310), 220 (1320), 144 (1326), 72 (1330),
  27 (1332), 1 (1333) — ease-in acceleration (0 -> 45 px/f); 1333-1340 vertical motion blur grows (≈10 -> 60 px)
  plus a stacked ghost-echo of the list (1339-1340), out of frame by 1340. Hard cut 1341.

### S15 — End card (1341-1398)

Two centred uppercase lines, neo-grotesk regular, `#030104` on `#FBF9FC`:
"PRODUCTION SKILLS BUNDLE FOR CLAUDE OPUS 5.5" / "AVAILABLE NOW ON HIGGSFIELD.AI".
Line 1 x 207-1060 (16.2-83.1%W), cap 25 px (3.5%H, 37.6 px @1080 => font-size ≈ 52 px), line pitch 59 px
(8.2%H, 89 px @1080); block centre y = 50.1%H at rest (line 1 cap 318-342, line 2 377-402).
Entry: slides up 100 px (13.9%H, 150 px @1080): top y 418,389,368,354,342,334,328,323,320,318 (1341-1350) =>
23,45,62,72,82,88,92,96,98,100% => cubic-bezier(0.11,0.11,0.17,0.90) over 10 f from 1340 (≈ quartOut). Full opacity
from the first frame, slight vertical motion blur on 1341-1342. Static hold 1350-1398 (49 f, frames identical).

---------------------------------------------------------------------------------------------------
## 3. Signature patterns (exact parameters)

### 3.1 Sticker flip-open
rotateX 90 -> 0 deg, transform-origin bottom edge, perspective ≈ 1000-1400 px, 7 frames,
`Easing.bezier(0.97,0.02,0,0.95)` (area 1,5,16,85,94,98,100%). Stagger 10 f (PRODUCTION 1, SKILLS 11), BUNDLE 18
(7 f). Every arrival re-centres the group (4-frame snap, 86% done in 1 frame) and the 3rd arrival triggers the
A->B "re-pose" (mirrored perspective + condensed/jittered type), 2-4 f with directional blur, staggered 1 f
bottom-to-top (BUNDLE 21, SKILLS 22, PRODUCTION 23).

### 3.2 Text birth (lists, titles, descriptions, paragraph)
Per word/line: opacity 0->1 in 1-2 f, blur 5-6 px @1080 -> 0 in 6-8 f, colour ramp
`[#D8E04A, #D0476D, #A1074D, #730437, #380217, #070001]` at t = 0,1,3,5,7,9 (intro list/titles) or 5-frame version
(end list). Newest item is always pink while older ones are black.

### 3.3 Slash cursor / slash sweep
* Slash glyph slant ≈ 25 deg from vertical; cursor size = 1 line height.
* Stamp: 1.9-2.3x -> 1x in 4-5 f (quintOut).
* Sweep-reveal: slash moves right->left, glyphs revealed to its right. Title preset: 55.5%W -> 7.6%W in 13 f,
  `bezier(0.84,0,0.19,1)`; at > 150 px/f it is drawn as a 3-4x wider, ~50% alpha smear.
* Typing caret for paragraphs: "/" placed 0.3 em after the last revealed word, jumps per word.
* Giant slash wipe (end): full-height pink slash sweeps R->L in 3 f with echo trail, then shrinks/darkens into the cursor
  over 11 f.

### 3.4 Lime diagonal wipe (BEFORE -> AFTER)
* Line: `#D4FF1F`, ≈12 px thick @1080 (9 px horizontal @1276), soft 1 px glow, angle 25.1 deg from vertical (dx/dy = -0.469:
  top end to the right — same slant as "/"), spans the footage area (y 17.4-100%H). Destruction-studio first wipe uses white `#FFFBF8`.
* Mask: AFTER on the left of the line, BEFORE on the right (tags travel with their layers, but a tag swap animation also fires).
* Motion of x at y = 55.7%H (px @1276; canonical color-grading 405-434, identical at 748-777 and 837-869):
  -95, -49, 22, 125, 258, 379, 465, 524, 565, 595, 616, 631, 640, 646, 649 (419) | 650, 652 (hold 419-421) |
  658, 668, 683, 704, 733, 775, 834, 920, 1041, 1174, 1278, 1348, 1392 (434).
  As %W: -7.4 ... 50.9 (hold) ... 109. Peak speed 133 px/f (10.4%W/f, 200 px/f @1080) in both phases.
  In: from -10.2%W at 404.5 to 50.9%W over 15 f, `bezier(0.43,0.37,0.19,0.98)`.
  Hold: 2 f. Out: 50.9%W -> ~112%W over 14.5 f, time-mirrored `bezier(0.81,0.02,0.57,0.63)`.
  Fast variant (image-fixer 903-926, 975-998): in 11 f `bezier(0.44,0.56,0.24,0.94)`, hold 2 f, out 10 f.
  White-line variant (297-322): in quintOut ~13 f, hold 3 f, out 11 f.

### 3.5 BEFORE/AFTER tag
* Parallelogram, skewX ≈ -25 deg (top shifted right, edge slope 0.53 px/px), no radius, no shadow. Box x 79.0-94.9%W
  (BEFORE; AFTER 79.8-94.3%W), y 86.6-91.9%H (height 38 px = 5.3%H, 57 px @1080; width ≈ 186 px @1276 = 280 px @1080).
* BEFORE: `#EE1174` box, white text; AFTER: `#D4FF1F` box, black text; text heavy extended, cap 23 px (3.2%H, 35 px @1080),
  upright, centred, horizontal padding ≈ 27 px @1080.
* Entry (after thermal): centre-out char reveal 1 -> 2 -> 4 -> 6 chars over 4 f, box grows from centre, blur/glow -> sharp (5 f).
* Swap (7 f, starts when the wipe line reaches the tag): f0 thin lime glitch line at centre char, f1-2 scrambled centre glyph,
  f3-4 lime band with black glyphs ("T","D") grows from centre inside the pink box, f5 "BEFTRE" half/half, f6 lime box
  redrawn from centre with glow and partial "\FTEF", f7 clean "AFTER". Measured 211-218, 431-438, ~765-772, ~852-858, ~919-925, ~989-995; reverse 953-955.

### 3.6 Thermal (false-colour heat-map) section transition
Whole-frame: gaussian blur 0 -> σ≈9 px @1080 in 7 f (≈1.3 px/f), gradient-map LUT + 7-8-level posterize mix 0 -> 1 in
~7 f, hold 3-4 f, 3-frame crossfade to the next section's first frame (under the effect), LUT mix 1 -> 0 over ~9 f,
blur decays with a long expo-out tail (σ 6.8 -> 0.8 px over 30 f). Header participates. Title cleared at +15,
slash-sweep title at +15..28, description typing from +15.

### 3.7 Panel dock (first section only)
Footage panel y-top 100% -> 17.4%H, 19.5 f expo-out (`bezier(0.08,0.42,0.14,1.0)`), 25 px leading-edge blur,
starts while the list above is still scrolling out with vertical blur.

### 3.8 Energy reveal (lime glow mask)
Noise/organic mask grows from an impact point (pole) across the subject in 6 f; edge glow `#ECFB66` ~40-60 px wide,
glow residue fades in ~7 f; frame luma +35%.

### 3.9 Holds & pacing
Lockup hold 5 f (S1), BEFORE holds 20-45 f before a wipe, mid-wipe split-screen hold 2-3 f, AFTER holds 6-40 f,
sections 67-173 f, end lockup hold 15 f, end card hold 49 f. Cuts/transitions land on ~82.5 BPM beats.

---------------------------------------------------------------------------------------------------
## 4. Rebuild recipe (Remotion, 1920x1080 @30 fps)

```ts
const W = 1920, H = 1080, fps = 30;
const C = {bg:'#FBF9FC', pink:'#EE1174', lime:'#D4FF1F', ink:'#0C0309', coral:'#D97757'};
const birth = (t:number) => interpolateColors(t, [0,1,3,5,7,9], ['#D8E04A','#D0476D','#A1074D','#730437','#380217','#070001']);
```

1. **Background**: `<AbsoluteFill style={{background: C.bg}}>` + two `radial-gradient` divs:
   lime `radial-gradient(circle at 0% 75%, #DEF760 0%, rgba(222,247,96,0) 25vw)`, pink
   `radial-gradient(circle at 100% 38%, #F38FBA 0%, transparent 25vw)`, corner peach blobs 8-10vw.
   Dots: an SVG `<pattern>` 15.5 px pitch, 3 px white circles at 50% alpha, `mask-image` = the same two radial gradients.
   S4 variant: lime centre (0%,63%) r 38vw with coral corner, pink (100%,49%) r 27vw with ochre corner.
   End (S13-S15): flat `#FBF9FC`.
2. **Stickers**: absolutely positioned divs, one per word, each corner-pinned with `transform: matrix3d(...)` computed from
   the 4 target corners above (homography from the unit rect; any `getPerspectiveTransform` helper). Animate the 4 corners
   with `interpolate` between pose 0 -> A -> B (snap curves 3.1) — this reproduces both the perspective swing and the
   "wide -> condensed" type look. Flip-open: wrap each sticker in a parent with `perspective: 1200px` and child
   `transform: rotateX(${interpolate(f,[s,s+7],[90,0],{easing:Easing.bezier(.97,.02,0,.95), extrapolateRight:'clamp'})}deg)`,
   `transformOrigin:'50% 100%'`. Motion blur on the snap frames: `@remotion/motion-blur` `<CameraMotionBlur shutterAngle={180} samples={6}>`
   around the sticker group only.
3. **Higgsfield logo**: icon SVG path with `strokeDasharray` draw-on frames 2-8, then `translateX` −214 px (@1080) over
   frames 8-13 `Easing.bezier(.7,0,.2,1)`; wordmark letters shuffled order, each `opacity 0->1, filter blur(6px)->0` over 2 f,
   one letter per ~0.8 f from frame 10.
4. **Tagline**: words with `delay = [19,18(icon),21,22,23]`, opacity over 2 f, shared `blur(8px)->0` ending frame 30 (linear).
5. **AI hands (S2)**: generate with an image-to-video model seeded on the frame-31 still; or approximate with sticker
   corner "pose snaps" on beats (3-frame `bezier(0.2,0.9,0.1,1)` corner moves + CameraMotionBlur).
6. **Zoom-whip (S3)**: `scale = interpolate(f,[122,123,124,125,126,127,128,129],[1,1.02,1.08,1.17,1.34,1.56,2.0,2.9])` (expo-in),
   `rotate: interpolate(f,[125,129],[0,-5])deg`, transformOrigin `50% 59%`; directional blur via an SVG
   `feGaussianBlur stdDeviation="${b} 0"` inside a group rotated -10deg, `b` = 0,10,16,23,26 px for 125..129. Hard cut at 130.
7. **Slash list (S4)**: component `<SlashLine text start/>`: slash `scale interpolate(f,[s,s+5],[2.3,1],{easing:Easing.out(Easing.poly(5))})`,
   word clip-revealed by the travelling slash (first line) or written instantly with `birth(f-s)` colour + `blur(interpolate(f-s,[0,8],[6,0]))`.
   Container `translateY` = −(sum of ease-in scroll) with the measured offsets; wrap last 5 frames in CameraMotionBlur.
8. **Header bar**: `<div style={{height:188, background: C.bg}}>` + right-end glow `radial-gradient(circle at 105% 60%, #E5E489, transparent 18vw)`.
   Footage `<OffthreadVideo>` in `top:188, height:892, objectFit:'cover'`. First dock: panel `translateY` from 1080 to 188 over 19.5 f
   `Easing.bezier(.08,.42,.14,1)`.
   Title: `<span>` at left 146 px, baseline 131 px, font-size ≈ 88 px (fit to ≤ 1060 px width), slash-sweep reveal:
   `const x = interpolate(f-T0,[0,13],[1065,146],{easing:Easing.bezier(.84,0,.19,1)})`; render slash at `x`, clip title with
   `clipPath: inset(0 0 0 ${x-146}px)`; when |dx/df| > 150 px render the slash with `scaleX(3)` + opacity .5 + pink.
   Description: right-anchored block (`right: 41px`), font 24 px / line-height 34.6 px, Inter 500. Reveal by characters
   (`Math.floor((f-T0-1)*7.5)`), group by word; word age `a` -> `color birth-like pink->#100A0A over 6 f`, `blur(5->0px)`; caret "/" after last char.
   Icon: Claude spark SVG, `scale interpolate(f,[184.5,200],[0,1],{easing:Easing.out(Easing.poly(5))})`, colour keyframes
   lime->mustard->orange->coral->pink-red->coral across frames 185-208, then a 30-frame looping pose cycle (stepped every 2-3 f).
9. **Lime wipe**: two layers BEFORE (with pink tag) and AFTER (with lime tag); line position
   `x = f<=T+15 ? interpolate(f,[T-0.5,T+14.5],[-196,977],{easing:Easing.bezier(.43,.37,.19,.98)}) : f<=T+16.5 ? 977 :
   interpolate(f,[T+16.5,T+31],[977,2150],{easing:Easing.bezier(.81,.02,.57,.63)})` (px @1080 at y = 602 px), line
   `rotate(25.1deg)`, 12 px wide `C.lime`; AFTER `clipPath: polygon(...)` = left half-plane of the line.
   (T = 405 for color-grading.) Fast variant: durations 11 / 2 / 10.
10. **Tag**: `<div style={{transform:'skewX(-25deg)', background}}><span style={{transform:'skewX(25deg)'}}>BEFORE</span></div>`
    at left 1517, top 935, 280x57 px; swap = 7-frame sequence (centre-out character scramble + lime box `scaleX` from centre).
11. **Thermal**: SVG `<filter>`: `feGaussianBlur stdDeviation={σ}` -> `feColorMatrix type="matrix"` (luma) ->
    `feComponentTransfer` with `feFuncR/G/B type="discrete"` (8 steps) or `type="table"` from the LUT -> `feComposite`/mix with the
    original by `mix`. Drive per frame: `σ = interpolate(f-T,[0,6,10,18,24,40],[0,9,10,7,3,0])` (px @1080, fit to measured table),
    `mix = interpolate(f-T,[0,7,12,21],[0,1,1,0])`, content crossfade at `f-T ∈ [9,12]`. Apply to the full frame (header included).
12. **Energy reveal**: mask = threshold of an animated fractal-noise radial field centred on the pole, radius grows
    0 -> 140%W over 6 f; edge glow = blurred (24 px) lime `#ECFB66` band at the mask frontier with `mix-blend-mode: screen`, fade 7 f.
13. **Fade to white**: overlay `C.bg` opacity `interpolate(f,[1176,1184],[0,1])` (linear).
14. **End lockup**: reuse S1 component (no tagline) from 1184 (= S1 frame 1), then `scale interpolate(f,[1213,1224],[1,0.67],{easing:Easing.bezier(.09,.72,0,.93)})`
    with origin at lockup centre and `translateY −26 px`; paragraph at left 320 px, top 699 px, 46 px Inter 500, line-height 68 px,
    width 1283 px, words revealed at 7.8 chars/f from 1214 with `birth` colours (first words start lime) and blur 6->0 px.
15. **Giant slash wipe**: pink parallelogram ≈ 1150 px tall rotated with the slash slant; x from 2000 -> 140 px over 1262-1265
    (expo-out), 3 echo copies at 60/35/15% opacity trailing right; mask lockup to the left of it; then 1265-1276 scale 1 -> 0.075 toward
    (9%W, 50%H) with colour `#EE1174 -> #40001E -> #0C0309`.
16. **End list**: same `<SlashLine>` at 45 px, pitch 105 px, x 727 px; items every ~6.5 f from 1283; 5-frame colour ramp; container
    `translateY` ease-in (`Easing.in(Easing.quad)`) from 0 at 1295 to −510 px at 1333, then CameraMotionBlur + 3 ghost copies 1333-1340.
17. **End card**: `<div>` centred, Inter 400 52 px uppercase, line-height 89 px, `translateY interpolate(f,[1340,1350],[150,0],{easing:Easing.bezier(.11,.11,.17,.9)})`.
