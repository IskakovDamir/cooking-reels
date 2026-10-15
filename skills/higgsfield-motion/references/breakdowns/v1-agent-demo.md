<!-- Frame-accurate forensic breakdown of reference v1, produced by a measuring agent (template matching, blur fits, colour sampling). Numbers are measured at 1276x718 and converted to 1080p. Use it to rebuild a shot exactly; the library defaults already encode the recurring values. -->

# v1: Higgsfield MCP × Claude "OPUS 5.5" promo. Forensic breakdown

Source: `videos/v1.mp4`, 1276×718 (Instagram downscale of 1920×1080), 24 fps, 990 frames (0–989), 41.25 s, AAC audio.
All pixel values below are measured at **718p** and converted to **1080p (×1.504)** where it matters. Positions are given as % of frame (x from left, y from top).
Frame numbers are 0-based, matching `data/v1_frames.json`.

Conversion: px@1080 = px@718 × 1.504. Gaussian blur σ@1080 = σ@718 × 1.5 (CSS `blur(Npx)` uses N = σ).

---

## 0. Global facts

| item | value |
|---|---|
| Edit rhythm | 23 segments in 41 s. Median shot is about 36 f (1.5 s); the longest is the 3D build (96 f) and the end footage (92 f). |
| UI background (all "Claude" screens) | **#FAF7FB** (very light lavender white). It does not change between screens. |
| Signature "flow" | Nearly every block **enters from below with an expo-out rise, drifts up slowly, then exits upward with an expo-in plus blur and fade**, so the whole film reads like one continuous upward scroll. |
| Blank beats | 2–3 frames of pure #FAF7FB between some UI blocks: 218–219, 516–518, 649, 737–738, 827–828. A white frame also appears at 361, after the lime pill "explodes". |
| Cuts vs music | Hi‑hat 16th grid every **4.27 f (0.178 s)**, i.e. **≈84.3 BPM** (4 per beat) or 168.6 BPM (2 per beat). Hard cuts at 298, 342, 385, 405, 482, 518, 649, 737 and 898 land within ±1 f of a hat tick. A rising chirp (riser, 300→1500 Hz) runs over 281–295 into the cut at 298. The loudest hit (+19.8 dB onset) is at f360, one frame before the white flash at 361. |
| Fonts (candidates) | UI text: neo‑grotesk with a large x-height (x/cap ≈ 0.75) and single-storey g, i.e. **Inter / SF Pro Display / Styrene B**. Serif ("Claude", "OPUS 5.5"): high-contrast bracketed serif, i.e. **Copernicus / Tiempos Headline / GT Super**. "Higgsfield MCP": bold grotesk with wide caps. ANALYZE pill: bold wide grotesk caps. CTA: medium grotesk caps. |

### Recurring palette (sampled)
- UI bg **#FAF7FB**; settled body text gray **#595459 / #5C4F58 / #5F5D60**; bold headline black **#09070A** (Checking) and **#19171B** (Frame is…).
- Claude coral (spark): **#D1795F** (status lines), lockup spark **#D9876C**. Send button **#D97C60**; pressed Yes **#D67255**.
- Transient "thinking" text gradient (time-based): **#DBDF2C → #CA874C → #A12C57 (magenta, deepest) → #893658 → #5C505A**.
- Higgsfield lime icon **#C0F64A** (gradient #C6F959 top → #BCF927 bottom), pill lime **#DAF725**, scan outline lime **#DBEE45**.
- Hot-pink silhouettes **#FD2283** (core) / mean #E05B75; newly typed pill letters **#E8286A**.
- Detection: yellow **#F7DA38**, red **#F52F4A**, green stroke **#ADD05C**, green fill tint **#EAF1DC**.
- Intro peach: base **#E1D0BB**, blobs **#EE9D83 / #EB9279 / #EFBDA5**, light center **#E7D6C4**, OPUS coral **#DB7C5F** (p10 #D4775D, p90 #E68A6E).
- Thermal: bg **#1B191C–#272528**, truck **#C42901 → #E06400 → #E8A558**.
- 3D studio bg **#D7D4D8** (exploded truck), **#D8D6DA→#FAF7FB** (build, top→floor).
- UI grays: PDF tile **#ECE9ED**, download card **#DFDDE0**, its button **#C6C4C8**, Yes pill **#CAC8CB**, No pill **#262327**.

---

## 1. Segment-by-segment

Segments here do not map one-to-one onto `v1_segments.json`:
- S2 and S3 below are one JSON segment, 89–127.
- S4 is split in the JSON into 128–182 (wide chat card) and 183–217 (close-up and press).
- The JSON has 23 contiguous segments covering 0–989.

### S1 · 0–88 · Brand intro: lockup + "OPUS 5.5" material morph (89 f)

**Background**
- f0 is flat beige **#E1D0BB** with a very slightly lighter radial center (#E2D4C8).
- 0–14: large soft circular gradient blobs fade in, measured as bottom-left luma 211.6 → 180 over 14 f (linear-ish).
  - Blob 1, bottom-left: coral **#EE9D83/#EB9279**, circle Ø ≈ 70 % of frame height, centered off-frame at about (8 %, 105 %).
  - Blob 2, top-right: **#EFBDA5/#E9A787**, about 60 % H, centered near (95 %, −5 %).
  - Lighter center **#E7D6C4**.
- Thin coral circle-outline arcs (1–2 px, about 30 % alpha) cross the top-left and bottom-right.
- No camera move: phase correlation shift < 0.1 px/frame over 0–88. Blob tint keeps evolving slowly (top-right luma 202 → 193 over 38–70).

**Final lockup** (measured f75)
- One centered row: `[Higgsfield squiggle mark] Higgsfield MCP × [Claude spark] Claude`.
- x 226–1058 (17.7 %–82.9 %, width 65.2 %); center y = 242 px (33.7 %).
- Mark: 64×58 px (5.0 %W × 8.1 %H), black.
- "Higgsfield MCP": bold grotesk, black **#030000**, cap H = 44 px (6.1 %H → 66 px@1080).
- "×": thin, 23 px wide, **#342518**.
- Spark: coral **#D9876C**, about 52 px.
- "Claude": serif, **#160C04**, cap C = 47 px (6.5 %H → 71 px@1080).
- Gaps: mark→text 16 px, MCP→× 23 px, ×→spark 18 px, spark→Claude 21 px.

**Lockup build** (frame-accurate)
- **f5–11, mark draw-on.** The squiggle is stroked on like handwriting, at an offset position x 337–401 (≈ 29 % of W) rather than its final spot. Ink pixels per frame: 9 → 65 → 80 → 108 → 130 → 133.
- **f11–15, mark slide.** The mark slides left 160 px to its final x 179–249, with horizontal motion blur at 12–13.
- **f5–17, Claude spark.** It appears at about (85 %, 49 %) as a **glowing cream star #FCE4C3** with a coral halo (#EDBBA5 ring, radius about 75 px). Size 90 px at f7–9.
  - f11–18: it travels left to its slot in front of "Claude", shrinking to about 60 px.
  - f18–33: the glow dies and the color goes cream → pale pink → coral #D9876C (coral is solid by f33).
- **f11–14, "×".** Pops in, ink 0.05 → 0.29 → 0.62 → 0.79 → 1.0 by f16.
- **f13–21, "Higgsfield".** Built **glyph by glyph in non-linear order** (H, g, s first, then i, f, e, l, d), each letter popping with a little vertical drop. The **i-dots fall in separately** from about 20 px above (f15–20). Coverage 0.28 → 0.41 → 0.53 → 0.64 → 0.70 → 0.75 → 0.84 → 0.97 → 1.0 at f13–22.
- **f15–20, "Claude".** Fade-up: dy +22 → +13 → +6 → +3 → +2 → 0 px; opacity 0.14 → 0.39 → 0.75 → 0.93 → 1.0; blur ≤ 1.5 px.
- **f17–24, "MCP".** Gaussian blur-in: σ 8 → 5 → 4 → 2.5 → 1.5 → 1 → 0.5 → 0 (718p), i.e. **12 → 0 px@1080**. Opacity 0.3 → 1.
- **f21–25, hold.** The lockup holds at **scale 1.11**, centered at y 355 (49.4 %).

**f24–37, lockup move up** (template-matched)
- Center y 355 → 242.5 px (Δ = 112.5 px@718 = **169 px@1080**). Scale **1.11 → 1.00**.
- Progress: f26 3.6 %, f27 7 %, f28 14 %, f29 28 %, **f30 59 %**, f31 80 %, f32 89 %, f33 95 %, f34 97 %, f35 99 %.
- Best fit: **cubic-bezier(0.70, 0.05, 0.15, 1.00) over f24→f37 (13 f)**, RMSE ≈ 0.
- Motion blur peaks at f30–31 (sharpness 25 → 1.7; f31 is almost invisible). Peak speed 35 px/f@718.

**f31–36, "OPUS 5.5" appears** under the lockup
- Text is "OPUS 5.5" in caps. Final box x 183–1089 (14.3 %–85.3 %, width 71 %), y 322–494 (center 56.8 %). **Cap height 172 px = 24 %H → 259 px@1080.**
- High-contrast serif, about 500 weight, tight tracking (≈ −2 %).
- It **blurs in on twos**: f32 heavily blurred (sharpness 25), f34 medium (84), f36 sharp (212). This is a stepped 3-state blur-in, not a smooth one.
- Initial material is a stained-glass/terrazzo mosaic in ochre, olive, rust and cream.

**f37–56, material swaps.** Hard switches with 0 diff between them, i.e. a held image per material.

| frames | material |
|---|---|
| 37–42 | pebbles / river stones, 6 f |
| 43–47 | sea shells, 5 f |
| 48–50 | red leaves / petals, 3 f |
| 51–55 | green & yellow leaves, 5 f |
| 56–57 | speckled eggs, 2 f |

**f58–72, morph to smooth 3D coral serif.** This is a left-to-right "light-burn" dissolve; per-letter timing:

| letter | flash starts | cream peak |
|---|---|---|
| O | 58 | 61–62, #FBEDCB |
| P | 59 | 63 |
| U | 59 | 63 |
| S | 60 | 64 |
| first 5 | 61 | 64 |
| last 5 | 62–63 | 65 |

- The sweep is about 180 px/f@718 (≈ 0.8 f per letter).
- Each letter goes material → **cream-white bloom #FBE5C2 at full blur** (sharpness ≤ 10, σ ≈ 8–10 px@718) → coral.
- Settled colors: O **#D97A5D** by f72, 5 #D8785C by f68, U stays lighter (#F8A586, a specular highlight).
- Sharp again by f68–73 (O sharpness 116).
- Final look: coral 3D letters with a soft bevel gradient (#D4775D → #E68A6E).

**f72–88, hold** (17 f). Region diff < 1/frame.
**Audio.** Descending whoosh at 0–0.5 s; chime tones 1–3 kHz at f58–79.

### S2 · 89–103 · Thermal / false-colour transition (15 f)

- **f89–92:** the lockup dims and desaturates; frame luma 168 → 122 → 87 → 65. It crossfades with a **false-colour depth/heat render of the truck photo**.
  - f90–91 show a gray-mauve, low-contrast version: bg #564C4F, truck rose #795B5D.
  - The lockup is still faintly visible at f93.
- **f93–99, heat map.**
  - Background charcoal **#1B191C–#272528**; house and sky mid-gray #45433F/#4B4B4F.
  - Truck body **#C42901 → #E06400 → #E8A558**; ground gradient dark red #7B261B → orange #E06400 at the bottom.
  - Colours **warm up every frame**: red (f94) → orange (f96) → amber/yellow (f99).
  - The image is soft (blur σ ≈ 4–6 px@718).
- **f100–104:** crossfade from the heat map to the real photo. f101 is about 50 % (orange tint over the photo); f104 is fully real. Sharpness 46 → 131 → 267 → 700 → 1275.
- **Audio:** hits at f88 and f101 (+11.8 dB), one at each end of the transition.

### S3 · 104–127 · Truck photo (24 f)

- Real photo of a red, rusty early-80s compact pickup in a yard with the front bumper hanging off.
- Near-static. SIFT drift is **+0.7 px/f right and −0.55 px/f up (718p)**; scale is constant (1.0002).
- It is a still with a tiny pan, not a zoom.

### S4 · 128–217 · Claude chat-input UI (90 f)

**Entry, f128–131: overexposure + zoom punch** (4 f)
- f128: highlights clip to white (luma-key "burn": sky and house go white first while the red truck survives). The image is **scaled ≈ 1.3×**.
- f129: almost all white; only edges of the truck remain.
- f130: the truck as a cut-out on white, about 1.25×.
- f131: the photo returns, **heavily zoom-blurred**, already inside a rounded rect about 80 % of frame width.

**f131–145, photo shrinks into the attachment thumbnail**
- Width 1023 → 713 → 514 → 409 → 336 → 292 → 260 → 237 → 222 → 212 → 203 → 197 → 193 → 192 → 191 px.
- Remaining fraction per frame ≈ **×0.65**, i.e. expo-out; 95 % complete at f138.
- Final thumbnail **191×192 px** (15 %W / 26.7 %H; 287 px@1080), top-left (374, 133), **radius ≈ 32 px@718 (48 px@1080)**.
- Zoom blur is gone by f136.

**Card (input box)**
- White **#FAF7FB** card on the same bg, distinguished only by its shadow. Left edge x 326 (25.5 %), top y 84 (11.7 %), bottom y 607 (84.5 %); it runs off the right edge.
- **Radius ≈ 50 px@718 (75 px@1080).**
- Shadow: bottom edge falls from luma 153 at the edge to 249 at +30 px; top and left edges are lighter (224 → 248 over 15 px).
  - CSS ≈ `0 10px 40px rgba(0,0,0,.22)` plus `0 0 0 1px rgba(0,0,0,.03)`.
- **"+" icon:** 40×40 px, 2 px stroke, black, at (394, 542).

**PDF chip, f152–170**
- **Note:** this is a fly-in followed by a shrink-to-nothing and a re-pop.
- f152: a "Diagnostic Report / PDF" tile appears large at the right, about 200 px wide, centered about (80 %, 39 %).
- f152–156: it arcs up and left to about (62 %, 22 %).
- f157–160: it scales down to a dot (dissolves into depth).
- f161–170: it re-pops in its slot next to the photo with blur, settling with an expo-out about ×0.7/f.
- Final tile **190×190 px**, fill **#ECE9ED**, radius 32 px, soft shadow.
- Labels:
  - "Diagnostic / Report": right-aligned, top-right, 2 lines, **#656266**, about 12 px cap@718.
  - "PDF": outlined pill bottom-left with a 1 px #666367 outline and #666367 text, about 60×30 px.

**Typing, f145–165**
- Text: "Turn this rust bucket into a monster truck" (42 chars, sentence case, regular weight). x 332+, baseline y 399 (55.6 %).
- **Cap T = 35 px (4.9 %H → 53 px@1080)**, x-height 27 px.
- Rate: f146 "Tu", 147 "Turn", 148 "Turn t", 149 "Turn thi", 150 "Turn this r", 151 "…rus", 152 "…rust", 153 "…bu", 154 "…buck", 155 "…bucket", 156 "…i", 157 "…int", 158 "…into", 159 "…a", 160 "…mon", 161 "…monst", 162 "…monster", 163 "…t", 164 "…tru", 165 complete.
  - That is **≈ 2.1 chars/frame ≈ 50 chars/s**, roughly linear. **No cursor.**
- **Colour animates globally over time** (all characters share one colour):

| f | colour |
|---|---|
| 146 | #DBDF2C yellow |
| 148 | #D1B52E |
| 150 | #CA874C orange |
| 152 | #C65C57 |
| 154 | #AF3759 |
| 156 | #A12C56 magenta, deepest |
| 160 | #8E355A |
| 164 | #6C4B5F |
| 168 | **#5C505A** settled gray-plum |

  This is a 22-frame colour ramp starting when typing starts.

**Camera pan, f150–182.** The card slides left; "+" center x goes 393 → 390 (f155) → 383 → 372 → 356 (f170) → 329 → 306 → 284 → 269 → 249 (f182).
- This is an **expo/ease-in acceleration** to 20 px/f, with motion blur from about f178.

**f183: whip cut to a 2.1× close-up** of the card's bottom-right corner. The scale is derived from corner radius 105 vs 50 px and confirmed by the text size.
- Motion continues leftward and **decelerates**: send button x 784 → 734 → 702 → 680 → 662 → 646 → 634 → 622 → 614 → 604 → 598 → 592 → 586 → 580 → 576 → 574 (f198), i.e. expo-out.
- **Close-up content (f198):**
  - "Opus 5.5": dark gray #4A4A4E-ish, regular, cap ≈ 45 px@718.
  - "Adaptive ⌄": lighter gray #8E8C90.
  - **Send button:** rounded square 151×151 px@718 (≈ 72 px in wide-shot scale), **radius ≈ 50 px (33 %)**, fill **#D97C60**, white ↑ arrow with 3 px stroke. Card corner radius here is 105 px.

**Send press, f199–213** (15 f)
- f199–200: the button **shrinks to ≈ 0.83×** (151 → 125 px) and the fill turns **cream #FAEDD2**.
- An **orange glow halo #FBAF94** blooms out to about 100 px@718 beyond the edge (cream/peach glow region is about 350 px wide).
- f204–210: a white specular rim highlight travels around the edge (glossy "jelly" look).
- f211–214: back to orange (#EDBBA0 → #DF8C70) and scale 1.0.
- **Audio:** onset at f198, one frame before the press.

**Exit, f214–217.** The card whips **up**: button y 284 → 186 → 164 → 134 (22–30 px/f, accelerating) with blur. f218 is blank #FAF7FB.

### S5 · 218–255 · Status lines "Analyzing…" (38 f)

**Layout (f240)**
- Spark: coral **#D1795F**, 55×65 px at x 132–187 (10.3–14.7 %), vertically centered on line 1.
- Line 1: "Analyzing photo input", regular, **#595459**.
- Line 2: "Analyzing Diagnostic Report about vehicle", regular. It is still magenta-plum **#734257** at f240 and settles to #5C4F58 by f244.
- Text left x 219 (17.2 %). **Cap A = 32 px (4.5 %H → 48 px@1080)**, x-height 24 px. Baselines y 342 and 401, so **leading 59 px@718 (89 px@1080)**.
- Line 1 spans x 219–596; line 2 spans x 219–950.

**Entry**
- Line 1 starts at f220 and line 2 at f225 (**5 f stagger**).
- Each line is revealed **left→right with a soft feathered edge** about 120 px wide. Line 1 reaches full width in 5 f (x_max 285 → 313 → 440 → 473 → 536 → 596); line 2 in 6 f (414 → 562 → 749 → 868 → 950).
- The group **rises**: dy +94 (f220), 77, 64, 53, 44, 36, 30, 24, 19, 15, 12 (f230), 6 (f232), 3, 1 (f236).
  - Ratio ≈ **0.82 per frame**, a pure exponential ease-out.
  - Start offset ≈ 115 px@718 (**172 px@1080**). 95 % done ≈ 13 f after start.
- Same timed colour ramp as the typing: pale yellow #EDEECB → #DCAF8C → #D4706E → **#B82863 (≈ +7 f)** → #8E375F (+13) → #5E4D5D (+19) → #595459 (+20).
- The spark wobbles in with the line (see "Claude spark" in the signature patterns).

**Drift.** About 0.5–1 px/f upward while holding (f236–244).

**Exit, f245–255**
- Accelerating up: dy −4 (f244), −7, −10, −15, −23, −27, −34, −42 (f255). Ratio ≈ **×1.23/f** (expo-in).
- Gaussian blur σ 0 → 3 px@718 (→ 4.5@1080). Opacity 1 → 0.47. Text also desaturates to light gray #BAB7BB, i.e. a fade.
- Direct swap to S6 at f256 with no blank frame.

### S6 · 256–297 · Bold headline "Checking if this car can handle / a monster truck build" (42 f)

**Layout**
- Large spark: 105×113 px at x 74–179, centered y 339 (47 %).
- Two lines, **bold (≈ 700), black #09070A**, left x 234 (18.3 %).
- **Cap C ≈ 56 px (7.8 %H → 84 px@1080)**, x-height 43 px. Baselines y 375 and 446, so **leading 71 px@718 ≈ 0.92 × font-size**. Tracking slightly tight.
- Line 1 spans x 234–1212 (76.6 % W).

**Entry, f256–266**
- Rises from dy +151 → 113 → 90 → 73 → 60 → 49 → 40 → 32 → 25 → 20 → 15 (ratio ≈ 0.80/f).
- **Gaussian blur σ 5 → 4 → 3 → 2.5 → 2 → 2 → 1.5 → 1.5 → 1 → 0.5 → 0 (718p) = 7.5 → 0 px@1080 over 10 f.**
- Opacity 0.24 → 0.41 → 0.49 → 0.60 → 0.69 → 0.80 → 0.87 → 0.96 → 1.0 (f264).
- Colour goes from mid-gray to black (#928F93 → #09070A), the same ramp idea without the warm hues.

**Shimmer sweep, f271–280**
- A lighter band (peak luma ≈ 110 on black text, i.e. a highlight #6E6E6E) about **120 px@718 wide (180 px@1080)** travels **left→right at ≈ 140 px/f@718 (210 px/f@1080)**, linear.
- It crosses the line in about 8 f; line 2 is swept a frame later.

**Drift/exit**
- Steady about −2.7 px/f (f268–284), then accelerating: −32 (284), −44, −60, −79, −105, −139, −161, −189, −227 (297).
- Blur rises to σ 3 and opacity drops to 0.69 at f297.
- **Whole trajectory fit:** y = +200 → −340 px@718 over f255→298.5 with **cubic-bezier(0.10, 0.70, 0.90, 0.00)**, RMSE 2.5 px. That is a "fast-slow-fast" pass.

**Audio:** a riser chirp across f281–295 leads into the hard cut at 298.

### S7 · 298–341 · 3D render: exploded truck + "ANALYZE" pill (44 f)

- Hard cut. Studio bg flat **#D7D4D8**.
- The red pickup is a low-poly-ish 3D model with a matte red #B14940 body.
- f298–304: the render slides **up** about 42 px (red-body top y 198 → 180 → 170 → 164 → 160 → 158 → 156), expo-out, with a 2-frame blur-in (sharpness 120 → 333 → 417).
- f304–330: the model **explodes**. The body lifts, the chassis and frame separate down, the wheels and parts spread, and the camera slowly orbits and pulls back (SIFT scale 0.97 per 3 f with small rotation). This is pre-rendered footage; use the video asset.
- **ANALYZE pill, f330–341**
  - Lime **#DAF725** pill, bottom-center below the model.
  - Grows from w133 h39 (f330, blurred) to **w273 h75 px@718 (411×113 px@1080; 21.4 %W)**. Widths 133, 181, 207, 227, 241, 251, 259, 265, 269, 271, 273 (expo-out ×0.68/f).
  - Center (638, 597), i.e. (50 %, 83 %). Fully rounded (radius 37.5 px). A **lime glow halo** about 60 px tints the bg toward #D9E78B.
  - Text "ANALYZE": **bold wide grotesk caps, #131407, cap 32 px@718 (48 px@1080)**.
    - It is **typed**: f332 "A", f333 "ANA", f334 "ANAL", f335 "ANALYZ", f336 "ANALYZE" (≈ 1.4 chars/f).
    - The **newest 1–2 letters are hot pink #E8286A** and turn black on the next frame.

### S8 · 342–360 · ANALYZE close-up "press and explode" (19 f) → white flash f361

- Hard cut (sync onset at 342) to a **2.87× close-up** of the pill: w785 h219 px@718 (61.5 %W × 30.5 %H), centered (638, 349).
- Text cap 93 px@718 (**140 px@1080**). Bg #D6D3D7 with a lime glow.
- f342–349: hold.
- f350–352: **squash to 0.80×** (w 769 → 691 → 629), ease-in.
- f353–360: **rebound and keep growing**: 651, 689, 737, 773, 809, 859, 939, 1033 (scale 1.32 at f360).
  - The glow area triples and the fill lightens #D9F921 → **#EAF548**.
  - Reads as "the pill blows up toward camera".
- **f361: full white frame #FAF7FB** (hdiff 1.68). It coincides with the biggest audio hit (f360).

### S9 · 361–384 · Parts "knolling" sheet reveal (24 f)

- Flat-lay of all truck parts (frame, panels, doors, seats, axles, springs, small hardware) in rows on **#F0EEF2** with a faint light-gray blueprint grid / technical drawings at about 6 % contrast.
- **f362–370, scale-in:** the layout scales from about 0.6 to 1.0, anchored at the top-left (240, 145)px. Scale 0.77 (f365), 0.85, 0.91, 0.95, 0.98, 1.0 (f370); remaining factor ≈ ×0.6/f.
- **Row cascade, f363–384:** parts first appear as **solid hot-pink silhouettes (#FD2283; first frames are a pale pink #FCBAD9 fade-in)**, then each resolves to its real texture.
  - The cascade runs row by row, top → bottom: row 1 (y < 22 %) resolved by f366, rows 2–3 by f368–370, row 4 by f372–375, row 5 by f377+, row 6 still pink at f384.
  - Within a row, items resolve left→right.
- **Lime outline flash #DBEE45** (about 4 px stroke following the silhouette) around some items as they resolve. It peaks at f368–370 and again at f374–375.

### S10 · 385–404 · Parts close-up with scanning outlines (20 f)

- Hard cut to about a 2.1× close-up of the lower rows. Settles from scale 1.22 over f386–390.
- Then a **slow pan left, 3.5 px/f@718 (5.3 px/f@1080)**.
- Each part has a thick soft outline (≈ 6–8 px@718) whose colour cycles **orange #F08A3A → amber → lime #DBEE45 → off** as it is "scanned".
- Unscanned small parts are pink silhouettes that resolve to texture as the scan wave passes. The wave runs top row first, about 6 f per row.

### S11 · 405–424 · Detection "Condition 67%": engine head (20 f)

- Hard cut. A close-up grid of parts; slow **pan down +1.06 px/f**.
- **Box draw, f408–414:** the right edge line grows first (f408–413), then the full box appears at f414.
  - Box x 494–783, y 222–511 px@718 (289×289; 22.6 %W × 40 %H), centered (50 %, 51 %).
  - Stroke ≈ 4 px **#F7DA38**, radius ≈ 12 px.
- **Label "Condition"** above the box, left-aligned with it: bold black, cap ≈ 37 px@718 (55 px@1080). Typed at **1 char/f (f409–417)**.
- **Counter**, inside the box top-right, yellow bold, cap ≈ 37 px.
  - Visible values: "2" (f413, fading in), 34, 42, 50, 59, **67%** (f418).
  - That is **linear ≈ +8.3 per frame**, implying 0 → 67 over f410–418. Changing digits are motion-blurred.
- Hold f418–424.

### S12 · 425–442 · Detection "Condition 16%": tyres (18 f)

- Hard cut, tighter zoom; slow **pan up −1.4 px/f**.
- Box **#F52F4A** around two tyres: x ≈ 140–1019 px of a 2× zoom; stroke ≈ 5 px; radius ≈ 16 px.
- "Condition": bold black, cap 63 px@718. "16%" in red at the top-right inside.
- Same draw, typing and counter scheme.

### S13 · 443–481 · Detection "Condition 84% → 96%": chassis frame (39 f)

- Hard cut. Slow **push-in 0.18 %/f (≈ 4.4 %/s)** around the center, plus drift (−1.2, −0.7) px/f.
- **Box draw, f449–454:** stroke pixel count 253 → 1607 → 7568 → 9484 → 10980 → 11620.
  - Green **#ADD05C**, about 3 px, x 126–1104 / y 74–624 px@718 (77 %W × 77 %H), radius ≈ 10 px.
  - Label "Condition" top-left inside: cap 38 px, black, bold.
- Counter top-right in green: "84%" (by f456) → **"96%"** (by f463).
- **Blink, f460–480:** box fill **#EAF1DC** (light green) and the chassis recoloured olive **#2C301B**. **Three pulses with an 8 f period**, peaks at f462–463, 470–471 and 478–479. Each pulse is about 4 f on and 4 f off with 2-frame ramps. One period ≈ two hat ticks.
- **Exit, f473–481:** everything slides up with acceleration (box top y 56 → 0); hard cut at 482.

### S14 · 482–517 · Status "Frame is in perfect condition. This rig is a prime candidate for mods." (36 f)

**Layout**
- Spark 47×43 px at x 138–185.
- Text left x 214 (16.8 %). Two lines.
  - **"Frame is in perfect condition."** is **bold #19171B**.
  - " This rig is a prime / candidate for mods." is **regular gray #5E5C5F**, inline continuation.
- Cap F ≈ 31 px@718 (4.3 %H → 47 px@1080). Baselines y 360 and 406, so **leading 46 px**.

**Motion**
- Entry: whole block, no colour ramp on the bold part (it starts gray and darkens). dy 63 → 52 → 43 → 36 → 29 → 24 → 19 → 15 → 12 → 7 (492) → 3 (494); **ratio 0.82/f**; blur σ 1.5 → 0; opacity 0.21 → 1 by f489.
- The second line (gray part) fades in **3 f later** (f485) with the same rise.
- Hold f494–503.
- Exit f504–515: dy −9, −15, −23, −34, −50, −61, −75, −95 (×1.22/f); blur σ → 2 px.
- **Blank f516–518.**

### S15 · 518–552 · Status "Using Higgsfield to calculate 3D geometry / and testing suspension." (35 f)

**Layout**
- **Higgsfield icon**: lime square 61×61 px@718 (92 px@1080), x 164–225. Gradient #C6F959 → #BCF927; black squiggle mark; radius ≈ 13 % of size.
- Text x 248 (19.4 %), regular, **cap U = 35 px@718 (53 px@1080)**. Two lines with **leading 55 px**.
- Settled colour **#5B4F5B**.

**Motion**
- Entry f519–526: L→R feathered wipe. Line 1 at 519–523, line 2 at 523–525 (4 f stagger).
- Colour ramp yellow #E6E8B7 → orange #C49C6F → **magenta #BC255F (f526)** → plum #7C3654 (531) → gray #564B55 (f537).
- Rise ratio 0.8/f.
- Exit f541–552: upward expo-in.
- Hard cut to S16 at f553.

### S16 · 553–648 · 3D build stages with small captions (96 f)

- Pre-rendered studio turntable.
  - Light gray cyclorama: top **#D8D6DA**, floor fading to **#FAF7FB** at the bottom.
  - Progression: bare ladder chassis with an engine (553–590), orange roll-cage tube frame + coilovers (590–610), giant brown/orange tyres "materialising" translucent → black (600–625), full monster-truck rolling chassis (625–648).
  - Slow orbit and pull-back (scale 0.993 per 6 f, rotation −0.04 to −0.1°/6 f).
- **Entry f553–556:** blur-in (sharpness 148 → 460 → 567) plus a slide up of 25 px.
- **Caption block, bottom-center**
  - Higgsfield icon **33×33 px@718 (50 px@1080)** at (638, 600) = (50 %, 83.6 %). It enters f553–558 rising from y 627 to 600 (expo-out).
  - Caption text below it, centered on x 638 (baseline y ≈ 651 = 90.7 %). **Light gray #A8A6A9, medium weight, cap B ≈ 18–19 px@718 (≈ 28 px@1080).**
  - Captions **wipe in L→R in 3–4 f**, hold, then **erase R→L in 3 f** (x_max shrinks while x_min stays). Each holds about 22 f.

| caption | wipe in | erase |
|---|---|---|
| "Building the suspension…" | 555–557 | 572–575 |
| "Mapping body and wheel mounts…" | 576–580 | 594–597 |
| "Adding oversized …" (tyres) | 599–602 | 617–620 |
| "Reassembling the final build.." | 621–624 | 647 |

- **Exit f641–648:** icon and render move up (icon y 584 → 560, accelerating), then a hard cut at 649 to white.

### S17 · 649–684 · Status "The truck is ready for any challenge." + "Generating Monster Truck design visuals." (36 f)

**Layout**
- Spark 65×67 px at x 134–199.
- **Line 1: semibold gray #5F5D60, cap T = 40 px@718 (5.6 %H → 60 px@1080)**, x 235.
- Line 2: Higgsfield icon 64×65 px at x 229–293, then regular text **cap G = 31 px@718 (47 px@1080)** starting x 312, in magenta **#8A314B** at f670 settling to plum-gray. Line pitch 85 px.

**Motion**
- Line 1 entry f649–656: wipe plus rise (dy from about +70); the colour ramp is short (warm → gray in about 6 f).
- Line 2 enters **f662–670** (13 f after line 1): the lime icon pops first (f662–664), then the text wipes L→R in 6 f (x_max 432 → 542 → 647 → 759 → 847 → 925 → 1014 → 1023) with the warm ramp (lime-ish → #8E6A50 → **#924254 magenta (f669)** → #5F3F48 → #514D4A by f681).
- **f675–684, zoom-out:** the whole block **scales down from 1.0 to 0.53** and moves to the top-left (center (613, 316) → (390, 30)) in about 10 f. The last 2 frames (683–684) are blurred, with a double image as the scale jumps. Easing: slow start (dy −4/f at 677) accelerating to the jump at 684–685.
- Result: the two status lines sit as a small header at the top-left (y 12–95 px@718), and the grid appears below.

### S18 · 685–736 · 2×2 grid of generated monster-truck variants (52 f)

**Tiles**
- White **#FAF7FB** cards with a very soft shadow (luma dip 249 → 237 over about 10 px). Aspect 16:9: 473×267 px@718 at f700 (37 %W). Gap ≈ 12 px. Radius ≈ 12 px.
- Images: red classic (TL), lime/green with yellow slime graphics (TR), silver skull-face (BL), purple with grinning mouth (BR). All are studio cut-outs on white.

**Pop-in.** Order TL → TR → BL → BR, starting **f685, 689, 693, 697 (4 f stagger)**.
- Each tile **scales from 0 → 1 with gaussian blur** (blurred on its first 2 frames).
- TR width progress: 0.29, 0.59, 0.74, 0.83, 0.89, 0.93, 0.96, 0.98, 0.99 (**expo-out ×0.62/f**, 95 % at 6 f).
- Tiles also rise about 10 px while scaling.

**Camera push-in, f701–710.** The grid **scales 1.155×** (TL–TR center distance 482 → 557 px), expo-out over about 9 f. The header text slides up and out (f700–705).

**Selection, f711–722**
- The **TR (green) tile is selected**: its bg darkens from #FAF7FB to **#737074** over 11 f (#F7F5F7 711, #E1DFDE 713, #B5B4AD 715, #949291 717, #83817D 720, #737074 722). Roughly linear-to-ease-out.
- Its image switches to a darker studio shot: grey bg, truck lit.
- f722–736: a **thin lime border/glow #D0D778** (about 2 px) appears on the selected tile.

**Exit, f728–736:** the whole grid blurs out (sharpness 805 → 134), drifting slightly. **Blank f737–738.**

### S19 · 737–773 · Higgsfield status "Building the final 3D model" (37 f)

**Layout (f760)**
- Lime icon **77×79 px@718 (116 px@1080)** at x 230–307, y 314–393 (center y 49 %).
- Text **"Building the final 3D model"**: semibold, cap B = 45 px@718 (6.3 %H → **68 px@1080**), x 346–1050 (block centered: icon + text span 230–1050, center x 640). Settled colour **#575158**.

**Motion**
- Entry f739–747:
  - The icon pops first (739–741, lime).
  - The text wipes **L→R in about 7 f** with a feathered edge about 150 px. The leading edge is pale peach/transparent; mid is coral #E17B7C → **magenta #C31F64** (f748) → plum #852A4E (750) → #593C49 (755) → gray #4A4247 (757+).
  - Block rises from about +70 px (dy center 423 → 383 → 364 → 358 → 352), ratio ≈ 0.8/f.
- Drift f757–772: −2 to −8 px/f, accelerating.
- **Exit/transform, f773–776:** the line **shrinks to 0.43× and jumps to the top-left** (x 130–482, y 32–67) in about 3 f with blur. It becomes the caption of the video card.

### S20 · 774–826 · Video card: final 3D model turntable (53 f)

**Card**
- x 127–1148, y 87–661 px@718: **1021×574 (80 %W × 80 %H; 1536×864 @1080)**, left-aligned with the caption at 10 %.
- **Radius 42 px@718 (63 px@1080).** No visible shadow or border (hard edge).
- Caption above: icon 33 px plus "Building the final 3D model" in #575158, cap ≈ 14 px@718.

**Grow, f776–790**
- **Anchored at the top-left**: width 0 → 379 → 580 → 707 → 793 → 856 → 902 → 938 → 964 → 985 → 1000 → 1010 → 1017 → 1020 → 1021 (**expo-out ×0.70/f**).
- The early frames have a blurred edge.

**Content**
- Dark studio render (#1E2024–#3B4145 bg) of the monster truck.
- f777–792: **body colour cycles red → orange → yellow → lime-green** (≈ 3 f per hue), like a material re-skin sweep.
- f792–826: slow turntable rotation from front view to 3/4 view.

**Exit**
- f806–826: the group drifts up with acceleration (card bottom 661 → 576).
- f823–826: blur-out.
- **f827–828 blank.**

### S21 · 827–873 · Claude question "Compile a universal build guide?" + Yes / No (47 f)

**Layout (f850)**
- Spark 49×61 px at x 284–333. Question regular, **#574E57, cap C = 35 px@718 (53 px@1080)**, x 365–985, baseline y 306 (42.6 %).
- **Yes pill:** x 330–594, y 371–497 (264×126 px@718; 397×190 px@1080), fully rounded, fill **#CAC8CB**, label "Yes" in **#5D5B5F**, regular, cap 43 px.
- **No pill:** x 624–889, same size, fill **#262327**, label "No" in **#8D8B8E**. Gap 30 px.

**Entry**
- Question: wipe L→R f829–835 with the warm ramp (#D7A895 → #D16D64 → **#B9265C (f837)** → #5F4B59 by f846) and a rise of about 30 px.
- Yes pops from f829–830 and **No pops f834–847**: width 27 → 83 → 140 → 177 → 201 → 218 → 232 → 241 → 249 → 254 → 258 → 261 → 263 → 264 (expo-out ×0.70/f), rising cy 472 → 435. **Stagger Yes→No ≈ 4–5 f.**
- The group drifts up about 1 px/f.

**Yes press, f856–863** ("tap")

| f | state |
|---|---|
| 856 | normal, slight blur |
| 857 | **scale ≈ 0.78**, colour mid (#D09F92) |
| 858–862 | scale 0.78, **fill #D67255** (Claude coral); label stays #5D5B5F |
| 863 | returning (#D09F91) |
| 864 | normal gray, scale 1.0 |

So: 1 f down, 5 f held, 1–2 f up.

**Exit, f864–873:** upward, accelerating (pill bottom 483 → 433). Hard cut at f874.

### S22 · 874–897 · Download card "Full Build Guide" (24 f)

**Card**
- x 176–1100, y 298–446 at rest: **924×148 px@718 (72.4 %W; 1390×223 px@1080)**. Fill **#DFDDE0**, radius ≈ 20 px, no shadow.
- Left icon: stacked document tiles, gradient #BBB9BC → #D3D1D4, with a white page glyph and lines; about 140×130 px, partially clipped at the card bottom.
- **"Full Build Guide"**: semibold, **#727073, cap F = 28 px@718 (42 px@1080)**, x 384.
- "Document  ZIP": regular **#B3B1B4**, cap 20 px.
- **Button "Download | ⌄"**: fill **#C6C4C8**, radius ≈ 12 px, about 280×72 px; label **#565357**, cap 26 px; thin divider; chevron.

**Motion**
- **Entry, f874–890:** it comes up from below already blurred. Center y 498 → 465 → 444 → 428 → 416 → 406 → 398 → 391 → 385 → 380 → 375 → 372 → 368 → 366 → 364 → 362 → 361. That is expo-out about ×0.82/f, a start offset of +137 px@718, with blur fading (sharpness 5 → 24).
- **Exit, f891–897:** the card **scales up toward camera with horizontal motion blur**. Width 929 → 941 → 964 → 998 → 1048 → 1126 → 1254 (expo-in about ×1.25/f); gx/gy falls 1.0 → 0.5 (horizontal smear). Hard cut on the hat tick at 898.

### S23 · 898–989 · End footage + CTA (92 f)

- Cinematic AI video: the green monster truck with lime rims and slime graphics in a dark stadium. It approaches, does a stoppie/wheelie and flips (f905–989); a big screen in the background shows the same truck.
- Dark grade: frame mean ≈ #2C2219.
- **CTA "TRY OPUS 5.5 ON CLAUDE WITH HIGGSFIELD MCP"**
  - All caps, medium weight grotesk, **#FCFAF7**.
  - Centered: x 228–1047 (64 %W), y 346–371. **Cap height 25 px@718 (3.5 %H → 38 px@1080).** Letter-spacing ≈ 0.
  - **Static: present from f898 to f989**, no animation, no fade-out at the end.

---

## 2. Signature patterns (with exact parameters)

1. **Upward-scroll choreography.** Every UI/text block follows one model.

   ```
   y(f) = y_rest + A · 0.80^(f−f_in)           (entry, A ≈ +95…+150 px@718 = +140…+225 px@1080)
   y(f) = y_rest − v·(f−f_hold)                (drift, v ≈ 0.5…2.7 px/f@718)
   y(f) = y_rest − B · (1.23^(f−f_out) − 1)    (exit, B ≈ 3…5 px@718; reaches −40…−230 px in 10–13 f)
   ```

   - Entry: opacity 0.2 → 1 and blur σ 5 → 0 (@718) over the first 8–10 f.
   - Exit: blur σ 0 → 3 and opacity 1 → 0.5 over the last 6 f.
   - Single-curve alternative: `cubic-bezier(0.10, 0.70, 0.90, 0.00)` over the block's whole life, from +300 px to −510 px @1080.
2. **Claude "thinking" text colour ramp.** It is time-based and applies to whole lines, not per glyph.

   ```
   0 f  #DBDF2C (yellow, partially transparent)
   +4 f #CA874C (orange)
   +8 f #A12C57 (magenta, deepest)   ← status lines are deepest at +7…+9: #B82863 / #C31F64
   +14 f #8E355A
   +18 f #654959
   +22 f #5C505A / #595459 (final gray)
   ```

   - Combined with a **left→right feathered wipe**: 5–7 f per line, feather ≈ 120–150 px@718 (180–225 @1080).
   - **4–5 f stagger** between lines.
3. **Higgsfield lines.** Same as pattern 2, but the lime icon (#C0F64A rounded square, radius 13 %) pops 1–3 f before the text, scale 0 → 1 expo-out.
4. **UI pop (cards, pills, tiles, thumbnails).** Scale 0 → 1 with gaussian blur on the first 2 f.

   ```
   s(f) = 1 − r^(f−f0),   r = 0.62…0.70   (95 % in 6–8 f)
   ```

   - Siblings stagger by **4 f** (grid tiles, Yes/No).
   - The video card grows from a **top-left anchor**; everything else grows from its center.
5. **Press interaction.**
   - Send button: scale 0.83, cream fill #FAEDD2, orange halo #FBAF94 (≈ 100 px@718), rim specular, 15 f.
   - Yes pill: scale 0.78, coral fill #D67255, 1 f in / 5 f hold / 1–2 f out.
   - ANALYZE pill: squash 0.80 in 3 f, then overshoot growth to 1.32 in 8 f, then a white frame.
6. **Typing.**
   - Prompt: **2.1 chars/f (50 cps)**, no cursor, global colour ramp.
   - Pill: 1.4 chars/f, with the newest 1–2 chars hot pink #E8286A.
   - Labels: 1 char/f.
7. **Counters.** Linear about +8.3 %/f (0 → 67 % in 8 f), digits blurred while changing; the percentage sits in the box's top-right, coloured like the box.
8. **Detection box.** Rounded rect (radius 10–16 px@718), stroke 3–5 px, colour = verdict (yellow #F7DA38 / red #F52F4A / green #ADD05C).
   - Draw: one edge grows first, the full box lands in about 6 f.
   - Label "Condition" in bold black above or inside the box, top-left.
   - Success blink: fill #EAF1DC plus subject tint #2C301B, **8 f period × 3**.
9. **Knolling scan.** Hot-pink silhouettes #FD2283, then the real texture, in a row cascade top → bottom (≈ 2–3 f per row). Outline glow cycles orange → amber → lime #DBEE45 → off as the scan passes.
10. **Shimmer.** On the bold headline only: a 120 px@718 light band, linear 140 px/f@718, about 8 f per line.
11. **Transitions used**

   | type | where | length / feel |
   |---|---|---|
   | Hard cut on the hat grid | most section changes | ±1 f of a hat tick |
   | Blank-white beat | 218, 516–518, 649, 737, 827 | 2–3 f |
   | White flash after pill explode | 361 | 1 f |
   | False-colour thermal crossfade | 89–103 | 15 f |
   | Overexposure luma-burn + 1.3× zoom punch | 128–130 | 3 f |
   | Photo shrink into thumbnail | 131–145 | 12 f, zoom blur |
   | Accelerating pan → whip cut to 2.1× close-up continuing the motion | 150–198 | ease-in, then ease-out |
   | Upward whip | 214–217 | — |
   | Zoom-out of the text block to a small header | 675–685 | 10 f |
   | Blur-out of the grid | 728–736 | — |
   | Text block shrinks to a caption | 773–776 | 3 f |
   | Card scale-to-camera with horizontal smear | 891–897 | 7 f |

12. **Claude spark.** Coral #D1795F, 12 rounded rays. It never sits still on status screens: rays change length independently (±20–30 %) and the whole spark rotates slowly. Reads like the Claude "thinking" asterisk.
13. **Spacing system @718.** Text left edge 214–235 px (≈ 17–18 %W). Spark sits about 30–50 px left of the text. Status body cap 31–35 px; headline cap 40–56 px; captions 18 px; CTA 25 px.

---

## 3. Rebuild recipe (Remotion, 1920×1080 @ 24 fps)

Use `const f = useCurrentFrame()`. All px values below are **1080p**.

```ts
const expoOut = (f: number, f0: number, r = 0.8) => (f < f0 ? 0 : 1 - Math.pow(r, f - f0));
const expoIn  = (f: number, f0: number, k = 1.23) => (f < f0 ? 0 : Math.pow(k, f - f0) - 1);

// Status block (pattern 1)
const rise   = (1 - expoOut(f, start, 0.8)) * 170;          // +170px → 0
const drift  = -1.5 * Math.max(0, f - (start + 14));        // slow up-drift
const exit   = -5 * expoIn(f, end - 11, 1.23);              // reaches ≈ −200px in 11 f
const blurIn = interpolate(f, [start, start + 10], [7.5, 0], {extrapolateRight: 'clamp'});
const blurOut= interpolate(f, [end - 6, end], [0, 4.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
style={{ transform: `translateY(${rise + drift + exit}px)`, filter: `blur(${blurIn + blurOut}px)`,
         opacity: interpolate(f,[start,start+8],[0.2,1],{extrapolateRight:'clamp'}) * interpolate(f,[end-6,end],[1,0.5],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}) }}
```

- **Equivalent Remotion easings.**
  - r = 0.80/f ≈ `Easing.out(Easing.exp)` over **31 f**.
  - r = 0.65/f ≈ `Easing.out(Easing.exp)` over **16 f**.
  - Exit ×1.23/f ≈ the tail of `Easing.in(Easing.exp)` over about 33 f; just use the formula.
  - Lockup move: `Easing.bezier(0.70, 0.05, 0.15, 1)` over 13 f.
- **Colour ramp + wipe** (patterns 2 and 3):

  ```ts
  const color = interpolateColors(f - start, [0, 4, 8, 14, 18, 22],
    ['#DBDF2C', '#CA874C', '#A12C57', '#8E355A', '#654959', '#5C505A']);
  const p = interpolate(f - start, [0, 6], [0, 1], {extrapolateRight: 'clamp'});   // per line, +5 f per next line
  const mask = `linear-gradient(90deg,#000 ${p*120-20}%, transparent ${p*120}%)`;    // ~200px feather
  // style={{ color, WebkitMaskImage: mask, maskImage: mask }}
  ```

- **UI pop:**

  ```ts
  const s = 1 - Math.pow(0.65, Math.max(0, f - f0));
  // style={{ transform: `scale(${s})`, filter: `blur(${(1 - s) * 10}px)` }}
  ```

  Stagger siblings with f0 + 4·i. For the video card use `transformOrigin: 'top left'`.
- **Typing:**

  ```ts
  const n = Math.floor((f - 145) * 2.1);
  text.slice(0, n);
  ```

  No cursor; feed `color` from the ramp. For the pill, render the last 2 visible chars in `#E8286A`.
- **Counter:**

  ```ts
  Math.round(interpolate(f, [410, 418], [0, 67], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}))
  ```

  Add `filter: blur(1.5px)` on frames where the value changes.
- **Shimmer:**

  ```css
  background: linear-gradient(90deg, #09070A 0, #09070A calc(x - 90px), #6E6E6E x, #09070A calc(x + 90px));
  -webkit-background-clip: text;
  color: transparent;
  ```

  with `x = (f - 271) * 210px`.
- **Detection box:** an SVG `rect` with `rx=18` (1080p) and `strokeDasharray` draw-on over 6 f, then the label typed and the counter. Blink fill with:

  ```ts
  opacity = (Math.sin(((f - 458) / 8) * 2 * Math.PI - Math.PI / 2) + 1) / 2
  ```

  for f458–481, fill `#EAF1DC` at about 0.8 alpha; tint the subject via a multiply overlay `#2C301B`.
- **Knolling:** per part, a pink mask `#FD2283` (CSS `filter: brightness(0) saturate(100%)` + `backgroundColor` mask, or two layers: silhouette + texture), crossfading over 3 f at `rowDelay = 2.5 f × row`. Outline: `filter: drop-shadow(0 0 0 6px color)` (or a stacked drop-shadow) with colour `interpolateColors(t,[0,3,6,9],['#F08A3A','#F5C33B','#DBEE45','rgba(219,238,69,0)'])`.
- **Thermal transition:** an SVG `<filter>` with `feColorMatrix type="saturate" values="0"` → `feComponentTransfer` (table R `0.1 0.25 0.77 0.88 0.91`, G `0.1 0.12 0.16 0.39 0.65`, B `0.11 0.1 0.04 0.0 0.35`), plus `blur(8px)`. Animate a hue/brightness offset so the colours warm f93→99, then crossfade (`opacity` 0 → 1 over 100–104) to the clean photo.
- **Overexposure punch (f128–130):**

  ```ts
  filter: `brightness(${[2.2, 3.5, 2.6][f-128]}) contrast(1.4)`;
  transform: `scale(1.3)`;
  ```

  Then the thumbnail shrink with `scale = 1 - 0.85*(1 - 0.65^(f-130))` and a zoom blur (approximate with `blur(12→0px)`).
- **Pan → whip:**
  - f150–182: `translateX(-(Math.pow(1.11, f-150)-1)*6px)`.
  - At f183, swap to the close-up composition (2.1× scale), `translateX` from +315 px → 0 with `1 - 0.8^(f-183)`.
  - Use `filter: blur(Npx)` scaled by per-frame speed as fake motion blur, or Remotion `<CameraMotionBlur>` / `<Trail>`.
- **Send press:**

  ```ts
  scale = f in [199,212] ? 0.83 : 1
  fill  = interpolateColors(f, [198,200,211,214], ['#D97C60','#FAEDD2','#FAEDD2','#DF8C70'])
  ```

  Halo: `box-shadow: 0 0 120px 60px rgba(251,175,148,.85)`, opacity peaking at f204.
- **ANALYZE explode:**

  ```ts
  scale = interpolate(f, [349,352,356,360], [1,0.8,0.98,1.32], {easing: Easing.inOut(Easing.quad)})
  ```

  Glow `box-shadow` radius 40 → 160 px. At f361 render a solid `#FAF7FB` frame.
- **Intro lockup:**
  - Mark: SVG path stroke-dashoffset draw f5–11, then translateX −240 px, f11–15.
  - Spark: cream `#FCE4C3` plus a radial coral halo, moving from x 85 % to its slot over f11–18; `interpolateColors` to `#D9876C` by f33.
  - Letters of "Higgsfield": random-order pops f13–21 (each 2 f, from y −15 px, blur 4 → 0).
  - "MCP": `blur(12→0)` f17–24.
  - "Claude": `translateY(33→0)` + opacity f15–20.
  - Group: scale 1.11 → 1 and translateY −169 px with `Easing.bezier(0.7,0.05,0.15,1)` f24–37.
- **OPUS 5.5:**
  - Six pre-made texture fills (mosaic, pebbles, shells, red leaves, green leaves, eggs) clipped to the text (`background-clip:text` or an SVG `<clipPath>`), hard-switched at f32 (mosaic, blur 15 px), f34 (blur 6 px), f36 (sharp), then 37, 43, 48, 51, 56.
  - Morph f58–72: per letter i (delay 0.8 f·i), animate `blur(0→14→0px)` and colour material → `#FBE5C2` → `#D97A5D` over 10 f; final fill a vertical gradient `#E68A6E → #D4775D` with a subtle inner highlight.
- **Peach background:** 2–3 absolutely positioned radial-gradient circles (`#EE9D83`, `#EFBDA5`) at 50–70 % H diameter on `#E1D0BB`, with opacity 0 → 1 over f0–14, plus SVG circles (stroke `#E39A85`, 1.5 px, opacity 0.3).
- **Footage segments** (photo, 3D renders, video card, AI end footage) are `<OffthreadVideo>`/`<Img>` assets. Only the overlays and transitions are code.
- **CTA:** `font: 500 38px Inter; letter-spacing: 0; text-transform: uppercase; color: #FCFAF7`, centered at y = 50 %, static from f898.
- **Audio:** cut on the 4.27 f grid (`Math.round(n*4.27)+89` gives hat ticks); place the riser over 281–295 and the impact at 360.
