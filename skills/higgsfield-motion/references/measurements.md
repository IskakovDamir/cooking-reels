# Measurements

Everything the library's defaults are built from. Corpus: four Higgsfield launch promos, 16:9,
1276x718 (Instagram downscale of 1920x1080), 4,958 frames, 173.7 s.

| id | what | length | fps | tempo |
|---|---|---|---|---|
| v1 | Higgsfield MCP x Claude "Opus 5.5" - agent workflow demo | 41.3 s | 24 | 85 BPM trap |
| v2 | Production Skills Bundle for Claude Opus 5.5 - feature bundle | 46.6 s | 30 | 82.5 BPM trap |
| v3 | OpenAI dots x Higgsfield "Always-On-Agents" - agent story with mascots | 59.6 s | 30 | 87.75 BPM trap |
| v4 | Higgsfield API 100 % cashback - offer / numbers | 26.1 s | 30 | 132.5 BPM drive |

Methods: per-frame Laplacian sharpness, luma/histogram difference, saturation and gradient energy at
320x180 (`scripts/fingerprint.py`); four measuring agents went through every segment at native fps
(template matching, bounding-box tracking, colour sampling, 10-90 % edge widths for blur, curve
fitting against standard easings and a cubic-bezier grid). Full per-shot data:
`breakdowns/v1..v4-*.md` and `*.segments.json`. v1 runs at 24 fps; every v1 number used in the
library has been converted to 30 fps (frames x1.25, per-frame decay r -> r^0.8).

## Pace

- 75 designed segments: **median 1.96 s** (p10 0.80 s, p90 4.27 s). Per video median: v1 1.58 s,
  v2 2.70 s, v3 2.52 s, v4 1.83 s.
- Visual events (hard cuts + focus pulls) **4.3-8.1 per 10 s** (median 5.7); median gap between
  events 0.47-1.70 s.
- **20-36 % of all frames are inside a blur** (focus pull, motion blur, thermal). This is the single
  most characteristic number of the style - the picture is almost never just sitting there sharp.
- Holds: lockups 5-17 f, BEFORE plates 20-45 f, end cards 44-58 f, hero footage up to 115 f.

## Transitions (75 segment exits, classified)

| type | share | where |
|---|---|---|
| hard cut (often onto a blurred or moving first frame) | 23 % | everywhere |
| zoom / punch-in / scale-to-camera / dolly-through | 11 % | v1, v3, v4 |
| whip / directional motion blur / accelerating scroll out | 11 % | v1, v2, v3 |
| thermal false-colour flash | 9 % | v1 (1), v2 (6, between every feature) |
| fade to paper / 1-3 f white beat / white flash | 9 % | v1, v2, v4 |
| wipe / slide / rise | 8 % | v2, v3 |
| glitch (RGB split, HUD boxes, dot matrix, steps to black) | 7 % | v4 |
| blur cut | 5 % | v1, v3 |
| motion match-cut (velocity carried across the cut) | 4 % | v3 |
| other (shrink-into-thumbnail, text block becomes a header, card from vanishing point...) | 13 % | v1, v3 |

Compare Apple recaps: 92 % plain cuts. Here **three of four edits are designed**.

## Focus pull (the default scene entry), calibrated

75 sharpness valleys; two populations:

| | n | recovery to 90 % | blur-out (sharp -> max) | depth |
|---|---|---|---|---|
| full-frame transitions | 30 | **11.2 f** (p25 9, p75 15.8) | **6.1 f** | 2.33 decades |
| local text / element blur-ins | 45 | 16 f (p25 8.8, p75 24) | 6 f | 0.95 decades |

Recovery shape (fraction of sharpness recovered at 25/50/75 % of the time): **.30 / .64 / .80**.
Calibration renders (27 + 60 + 6 configurations on six reference stills) chose **gaussian 14 px
@1080 -> 0 over 36 f, expo-out**: measures 12 f, .29/.63/.87, 2.2 decades. That is `FX.blur`.
Exit default: cubic-in to 14 px over 7 f.

## Motion vocabulary (measured curves)

| move | numbers | ref |
|---|---|---|
| block rise-in (scroll flow) | from +170 px @1080, closes 16.4 %/f (0.8/f @24), blur 7.5 -> 0 and opacity .2 -> 1 over 12.5 f | v1 |
| block exit up | velocity x1.18/f (1.23 @24), blur -> 4.5 px, opacity -> .5 | v1 |
| UI pop | scale 1 - 0.71^f (95 % in ~8 f), blur first 2 f, siblings 5 f apart | v1 |
| mascot pop | spring k 1200, c 32: 1.20 at +3 f, .96 at +7, settled +11; breathing bump 1.26 over 9 f | v3 |
| input pill entry | spring k 260, c 22: 5 % overshoot at +8 f | v3 |
| partner logo pop | 13 % overshoot at +3 f (k 1400, c 41) | v3 |
| sticker flip-open | rotateX 90 -> 0 about bottom edge, 7 f, bezier(.97,.02,0,.95), stagger 10 f | v2 |
| slash title | slash 55.5 %W -> 7.6 %W in 13 f, bezier(.84,0,.19,1), glyphs revealed behind it | v2 |
| lime wipe | 25.1 deg from vertical; in 15 f bezier(.43,.37,.19,.98) to 50.9 %W, hold 2 f, out 14.5 f bezier(.81,.02,.57,.63); fast: 11/2/10 | v2 |
| zoom-whip exit | expo-in scale 1 -> 2.9 in 7 f, roll -5 deg, directional blur to 77 px | v2 |
| thermal | out: blur 0 -> 9 px + LUT 0 -> 1 in 9 f; in: LUT holds 2 f, fades by 11 f, blur decays tau 11 f | v2 |
| panel dock | rise from bottom, bezier(.08,.42,.14,1), 20 f | v2 |
| lockup lift | scale 1.11 -> 1 and up 15.6 %H, bezier(.70,.05,.15,1), 16 f | v1 |
| card -> fullscreen | x1.42 in 14 f, bezier(.45,0,.2,1), radius -> 0 | v3 |
| card from vanishing point | scale .05 -> 1 expo-out 14 f, blur 12 -> 0 | v3 |
| 3D tilt | rotateY 25 deg, perspective 3100 px, 22 f ease-in-out | v3 |
| deck flip | new front card every 2 f, slivers 20 px apart | v3 |
| stepped scroll | 300 px steps, expo in-out 13 f, every 15 f, on a 4-5 px/f drift; last step accelerates x1.075/f into the cut | v3 |
| title settle / exit | scale .60 -> 1 bezier(.40,1,1,1) 46 f; group 1.17 -> 1 cubic-out 42 f; exit 1 -> 1.46 quart-in 15 f | v4 |
| tag pop | scaleY .18 / scaleX .25 -> 1 in 3 f expo-out, text smeared horizontally | v4 |
| balance card | in from bottom bezier(.10,.60,.40,1) 30 f; push x1.65 bezier(.70,0,.20,1) 20 f; exit up quad-in 27 f | v4 |
| counters | LINEAR (10 f for a balance change; pools at constant rate), tint pulse 10 f up / 10 f down | v4 |
| hold drift | push 1-2.2 %/s on lockups and holds; dark text scenes pull out 1.6-2 %/s | v3, v4 |

v4 has **no overshoot anywhere** (springs only in v3's mascots, pill and logo pop).

## Text reveal families

| family | numbers | ref |
|---|---|---|
| birth ramp (per glyph) | glyph born pale lime #D8E04A -> #D0476D -> #A1074D -> #730437 -> #380217 -> ink in 9 f, blur 6 -> 0 | v2 |
| Claude ramp (whole line, time-based) | #DBDF2C -> #CA874C -> #A12C57 (deepest +10 f) -> #8E355A -> #654959 -> #5C505A by 27.5 f, on a L->R wipe (7.5 f, 200 px feather), lines 6 f apart | v1 |
| per-word fade | words 1 f apart, blur 8 -> 0 over 5 f, lines 7 f apart | v3 |
| typing head | prompt 50 cps whole-text ramp (v1); pill 60-75 cps with 2-3 cyan #1BA7E7 head glyphs (v3); descriptions 225 cps, paragraph 234 cps (v2) | v1-v3 |
| scramble / decode | 25-36 resolved chars/s per line, lines in parallel, 1-2 head glyphs from `[]{}/\_^~*xbc...` alternating lime #D2F719 / pink #F91489, re-rolled every 2 f, pink "_" cursor; exit in reverse | v4 |
| per-glyph fade | grey -> ink, 1.7 f stagger, 8-10 f each ("$20,000,000" is not a counter) | v4 |
| shimmer | light band 180 px, 168 px/f @30, bold headline only | v1 |

## Typography (cap height in % of frame height)

| role | cap | face | ref |
|---|---|---|---|
| hero word ("OPUS 5.5") | 24.0 | high-contrast serif | v1 |
| offer headline numbers ("100%", "$100.000") | 18-21 | heavy neo-grotesk caps | v4 |
| offer headline words ("CASHBACK", "FIRST COME") | 14-16 | same | v4 |
| stickers | 10-14 (letters jittered .62-1) | heavy extended grotesk, white on pink/black | v2 |
| claim lines ("MOST AFFORDABLE", "CLAIM UP TO") | 8.6-9.5 | heavy neo-grotesk caps | v4 |
| section title "/feature" | font 8.1 (x-height 4.6) | heavy extended, lowercase | v2 |
| bold status headline | 7.8 (7.2 in Inter) | grotesk 700 | v1 |
| lockup wordmarks | 6.1-6.4 | grotesk 500-700, partner in serif when Claude | v1-v3 |
| agent status title | 5.0 regular / 4.3 bold | Inter-like | v3 |
| Claude status body | 4.5 | Inter-like 400 | v1 |
| prompt text | 4.9 (v1) / 3.2 (v3 pill) | Inter-like 400 | v1, v3 |
| end card / CTA | 3.5-3.6, uppercase, 400-500 | Inter-like | v1, v2, v4 |
| chips | 3.4 | Inter-like 400 | v3 |
| BEFORE/AFTER tag | 3.2 | heavy extended caps | v2 |
| header description | font 2.2 | Inter-like 500 | v2 |
| build captions | ~2.6 | Inter-like 500, grey #A8A6A9 | v1 |

Text left edge on UI screens: 16-20 %W (v1 17.2 %, v3 19.6 %). Free substitutes with Cyrillic:
Inter (UI), Inter Tight (display), Unbounded (extended, slant with skewX), Playfair Display (serif),
Geologica (quirky caps), JetBrains Mono.

## Colour

- Paper: **#FBF9FC** (v2, v3), #FAF7FB (v1, v4). Ink #0C0309 / #000. Dark: #000, #080509-#1B191A.
- Higgsfield lime **#D4FF1F** (flat UI #D2F719), glow #ECFB66; pink **#EE1174** (v2), #E71664 (v4
  pill), #F91489 (scramble), #F616A1 (spend).
- Claude collab: coral #D97757 / spark #D1795F, send #D97C60, peach intro #E1D0BB with #EE9D83 /
  #EFBDA5 blobs, hero coral gradient #E68A6E -> #D4775D.
- Glows: v2 lime (0 %,75 %) r 25 vw #DEF760 + pink (100 %,38 %) r 25 vw #F38FBA + peach corners,
  white halftone dots 15.5 px pitch over the glows; v3 blue corners #D0E2F5 / #D2E0EC + #F3F0F4 dots
  at 41 px everywhere; v4 lime #F4FA4B left, pink #F982AC right with halftone.
- Thermal LUT (v2): #3A2729 . #3F2D31 . #4C4B52 . #772520 . #A60900 . #D03A01 . #E35800 . #EC7C02 .
  #F39F0E . #F5BD49 . #F7DFB8 . #FAE8D3 (posterised ~8 levels). v1 warm heat: charcoal -> red ->
  orange -> amber. v4 duotone footage: magenta #E73562 -> orange #DD8841 -> lime #D0E81B -> cream.
- Colour comes from accents only: UI, cards and backgrounds stay neutral; one lime and one pink.

## Audio

See `audio.md`: 82-88 BPM half-time trap or ~132 BPM drive, -14 LUFS, ~-3 dBTP, LRA 2-4 LU, no
voice-over, drop on the first content cut, 808 drop-outs before reveals, music stops on the end card.

## Fingerprint ranges (for check_render.py)

`fingerprint.json` stores the per-video values and min/median/max of: events/10 s 4.29/5.73/8.06,
cuts/10 s 1.34/2.53/5.37, focus pulls/10 s 2.57/4.48/5.54, blurred share .20/.32/.36, light share
.21/.47/.61, dark share 0/.05/.15, saturation .11/.17/.27, motion 4.96/6.13/8.55, -14.1 LUFS.
Validation of the bundled examples (rendered at half size, mastered, measured):

| example | events/10 s | blurred | light | sat | motion | LUFS | BPM | verdict |
|---|---|---|---|---|---|---|---|---|
| OfferPromo (no footage needed) | 6.5 | .31 | .54 | .19 | 5.8 | -14.0 | 132.5 | inside |
| BundlePromo, footage stand-ins | 6.7 | .22 | .30 | .24 | 6.4 | -13.9 | 83.3 | inside |
| AgentsStory, footage stand-ins | 5.2 | .32 | .65 | .09 | 5.8 | -14.0 | 87.5 | inside (light/sat at the edge) |
| AgentDemo, footage stand-ins | 8.5 | .38 | .66 | .14 | 5.3 | -13.9 | 84.8 | cuts 6.5/10 s vs max 5.4 (part of it is cuts inside the stand-in clips) |

With the grey placeholders the footage-heavy examples read too light, too grey and too static (light
share .85-.92, motion ~2) - expected, a placeholder is not footage. Judge pace and colour with real
plates or with `PlaceholderStills` stand-ins, never with grey cards.
