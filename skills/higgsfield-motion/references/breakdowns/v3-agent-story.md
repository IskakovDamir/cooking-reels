<!-- Frame-accurate forensic breakdown of reference v3, produced by a measuring agent (template matching, blur fits, colour sampling). Numbers are measured at 1276x718 and converted to 1080p. Use it to rebuild a shot exactly; the library defaults already encode the recurring values. -->

# v3 — "OpenAI dots × Higgsfield — Always-On-Agents" : frame-accurate breakdown

Source: `videos/v3.mp4`, 1276×718 (Instagram downscale of 1920×1080), 30 fps, 1787 frames (0–1786), 59.57 s.
All pixel numbers are measured at 718p and given as `Npx@718 → Mpx@1080` (×1.504). Frame numbers are 0-based (frame = round(t·30)).

---------------------------------------------------------------------------------------------------

## 0. Global look

| Token | Value |
|---|---|
| Canvas bg | `#fbf9fc` (warm off-white, very slightly violet) |
| Dot grid on bg | dots `#f3f0f4`, ~5px@718 soft (≈3px solid dot @1080), pitch 27.3px@718 → **41px@1080** both axes. Visible on every light scene. |
| Corner glow TR | radial, centre at top-right corner, colour `#d0e2f5` at corner → `#dae8fa` (1100,0) → `#eef3fb` (940,0) → bg by x≈860 along top and y≈400 along right edge. Ellipse radii ≈ 420×400px@718 → **630×600px@1080** |
| Corner glow BL | radial, centre bottom-left, `#d2e0ec` at corner → `#dae5f1` (120,712) → bg by x≈450 along bottom, y≈240 along left. Radii ≈ 450×480@718 → **680×720@1080** |
| Primary ink | `#000000`–`#060408` titles; body grey `#5d5a61`/`#626266`; tertiary `#b5b3b6` |
| Status green | label `#197e69`–`#28816f`, status dot `#0b7b64`/`#117b65`, check ✓ `#286559` (lighter shimmer state `#85c9bc`) |
| Chip / bubble fills | chip `#ebe8ec` (fully rounded); chat bubble & doc card `#f0f3f6` (cool grey) |
| Mascot palette | orange `#fc7b1b`/`#ff7b13`, blue `#0073ff`, purple `#8d54dd`, green `#09b651`, black `#2a282c`/`#29272a`, light grey `#e0dee1`, Higgsfield lime `#d0f914` |
| Dark cards | post cards `#141217`, comment panel `#171816`, phone app `#1f182a` |
| Typing "head" colours | cyan `#1ba7e7` (input pill), lime `~#c8e630` (Media screen), gradient `#2f6e5e → #bdda1e` for product names |
| Fonts | UI text: neo-grotesk, Inter / SF Pro (Regular for body, Semibold–Bold for 2nd-half titles). Lockup: "OpenAI dots" = OpenAI Sans Medium-ish (or Inter Display Medium), "Higgsfield" = Semibold geometric grotesk. Fan heading "Analyzing 150 apps..." tight negative tracking (≈ −3%). Post cards: Inter. Card-inside art: serif (decor only). |

Mascots ("dots"): flat blobs with two black dot-eyes or expression glyphs (`••`, `oo`, `><`, `^^`, `--`, `**`, `++`). Shapes: orange flower / orange bear-head, blue rounded-teardrop, blue 4-lobe clover, purple heptagon blob, purple heart, green sprout-head, black rounded triangle, black pill, light-grey rounded square, white ghost. No outlines, no shadows. Size in lockups ≈ 90px@718 → **135px@1080** (12.5% H).

Audio: music ≈ 86–90 BPM (flux autocorrelation peak at 21 frames), onsets on a ~5-frame grid. Hard cuts land on onsets within ±2 f: 264 (onset 261), 510 (508), 641 (642), 671 (673), 743 (745), 922 (924), 971 (975), 1001 (1002), 1629 (1627), 1698 (1696). Strongest hits: 302 (pan starts 299), 405, 611, 734, 1393, 1434 (phone lands 1430), 1537 (footage card), 1578, 1619.

---------------------------------------------------------------------------------------------------

## 1. Shot list

| # | Frames | Dur | Kind | Content | In → Out |
|---|---|---|---|---|---|
| S1 | 0–63 | 64 | brand-intro | lockup + 6 mascots assemble | cold open → zoom-through |
| S2 | 64–109 | 46 | transition | zoom into lockup → 3D white tunnel → blurred video card emerges | → card fills frame |
| S3 | 108–263 | 156 | footage + chat-ui overlay | AI live-action guy at laptop at night, input pill types "Make me a viral app. Make no mistakes." | hard cut 264 |
| S4 | 264–357 | 94 | chat-ui | chat thread (bubble + Research status row), whip-pan, zoom-out to full app | zoom-blur cut 357/358 |
| S5 | 358–464 | 107 | card-stack (list) | "Your dots" agent list, mascots fly in, stepped scroll | blur cut 465 |
| S6 | 465–509 | 45 | chat-ui / status-line | Research + Comments status rows typing | cut 510 |
| S7 | 510–554 | 45 | card | "Elena Voss" post card + chip, 3D tilt | cut 555 |
| S8 | 555–640 | 86 | card-stack | 21-card 3D deck flip, lands on "Amara Ellis" card | punch-in cut 641 |
| S9 | 641–670 | 30 | card close-up | card bottom + orange chip "Reading 324 comments on top dramas" | cut 671 |
| S10 | 671–742 | 72 | status-line | "Research • Analyzing / Finding your edge in short drama." + bullets; punch-in 719 "Here's what I found." | motion match-cut 743 |
| S11 | 743–844 | 102 | card (comments) | dark comment thread scrolling with motion blur | motion match-cut 845 |
| S12 | 845–921 | 77 | grid | grid of post cards, 2-step zoom-out | motion cut 922 |
| S13 | 922–970 | 49 | card | single post card (Aster Club) | cut 971 |
| S14 | 971–1000 | 30 | status-line | "Insights ✓ Insights complete / Huge demand. Here's your edge." 3-item list | vertical push 1001 |
| S15 | 1001–1013 | 13 | ai-video / app UI | "The Last Promise." web-app screen slides up | blur shrink 1014 |
| S16 | 1014–1131 | 118 | 3d-render | screen shrinks → 3D fan of ~12 app screens with floating labels, "Analyzing 150 apps..." | fly-in to front screen |
| S17 | 1132–1210 | 79 | status-line | front screen slides up to strip; "Skill ✓ Skill complete / Your app blueprint is ready." + doc card | blur-out up |
| S18 | 1211–1255 | 45 | status-line | "Build • Building / Building your drama app." | text dissolves, mascot stays |
| S19 | 1256–1329 | 74 | mascots | grey + orange mascots, crowd of 9 → 22, implode | to Media |
| S20 | 1330–1420 | 91 | status-line | "Media • Working / Generating episodes with Higgsfield." + phone placeholder | phone moves centre |
| S21 | 1421–1528 | 108 | chat-ui (phone) | "plotline." app: Stories → Library → Picnic secret + chip "Publishing your app to the marketplace" | vertical whip 1529 |
| S22 | 1529–1628 | 100 | footage | card zooms to full-frame close-up of guy; chip "Getting your app recommended by people" | hard cut 1629 |
| S23 | 1629–1697 | 69 | footage (UGC grid) | horizontal carousel of 9:16 UGC selfie clips holding phones | drop-out 1680–1697, cut 1698 |
| S24 | 1698–1786 | 89 | end-card | lockup re-assembles (same choreography as S1, offset +1697 f) | end |

---------------------------------------------------------------------------------------------------

## 2. Segment-by-segment

### S1 — Brand intro, f0–63

Background: `#fbf9fc` + dot grid + TR/BL blue corner glows (static; they are present from f0). f0–2: empty bg.

**OpenAI icon** (black rounded square `#100c10`, 87×87px@718 → 131px@1080, corner radius ≈16px@718 → 24px@1080, white OpenAI knot):
- f2–5: rises from below with vertical motion blur (f2 a 34×66 smear at y≈553, f3 y=395–471, f4 cy 364, f5 cy 333, f6 cy 324 = top of travel, ~35px overshoot above rest), then sinks back: cy 328 (7), 336 (8), 344 (9), 350 (10), 355 (11). Pop-up ~4 f + settle ~5 f.
- Composition initially centred on "OpenAI dots" alone (icon x 361–446).
- **"OpenAI dots"** text: f7 drops in from below with ≈8px@718 vertical blur (seen ~40px below the line in f7), lands f8–9.
- **Lockup slide left**: f11→f23 icon x 350 → 168 (182px@718 → 274px@1080). Positions: 11:350, 17:189, 18:184, 19:177, 20:172, 21:170, 22:169, 23:168 → ≈88% done by f17 (6 f of 12) → **expo-out**.
- **Higgsfield icon** (lime `#d0f914`, 84px, black squiggle logo): f12 appears at x≈928 as 8px dot, scales: 8→42→78→**95**(f15)→92→88→85→84 = **13% overshoot at +3 f**, settled +6 f; simultaneously slides left 928→755 (expo-out, 50% at ~f15).
- **"Higgsfield"** word: per-glyph scrambled reveal f12–~30 — glyphs pop in out of order with morphing shapes (f13 "Hi g s", f16 "Hl g∽", f18 "Higgs i", end card f1721 "Higgs il.", f1725 "Higgsfiel", complete f1726). ≈2 f per glyph, random order, each glyph scales/blur-pops in ~2 f.
- **"×"** grey `#949296`, ~22px, appears with the Higgsfield group.
- Lockup final metrics: icons 87px; cap height "OpenAI dots" / "Higgsfield" 46–47px@718 = **6.4% H → 70px@1080**; full lockup width x 165→1109 (74% W), centred x=638; icon centre y 320 (44.6% H).
- **"dots" gradient sweep** f20–36: a multicolour band moves **right→left** through the word "dots" (letters to the right colour first; 's' leads 'd' by ~3 f). Per-letter colour timeline (d): black → `#3c56ac` blue (23) → `#62b6a7` teal (25) → `#7fd774` green (26–27) → `#afbd60` olive (29) → `#d69d41` orange (31) → `#eb7c5d` coral (33) → `#da6060`/`#af415d` red-pink (34–35) → black (36). Spatial band (left→right): blue, teal, green, yellow-olive, orange, coral, red-pink; band width ≈380px@718 (≈ 570px@1080), speed ≈32px/f@718 → 48px/f@1080; whole sweep 16 f.
- **Pill "Always-On-Agents"**: f33–40 rises ~15px from below + fades in; right edge grows 796→828 (f36–38). Final: x 449–828, y 385–448 → **380×64px@718 → 571×96px@1080**, fully rounded (r = 48px@1080), 1.5px border `#a2a0a4`, transparent fill (bg shows), text black Medium, cap 25px@718 (3.5% H → 37px@1080), centred x=638; pill centre y=416 (58% H).
- **Lockup lift** to make room: f29→39 icon y 316 → 277 (39px@718 → 59px@1080). Progress: 29:3%, 30:10%, 31:21%, 32:33%, 33:51%, 34:67%, 35:79%, 36:87%, 37:95%, 39:100% → **cubic ease-in-out**, 10 f.

**Mascots** (pop-in order, final centre @718, size):
| mascot | appears | centre (final) | size | 2nd pulse peak |
|---|---|---|---|---|
| green sprout `#09b651` | f6 | (1069,593) | 75×91 | f16 |
| black triangle `#2a282c` | f7 | (156,590) | 90×93 | f22 |
| blue clover `#0073ff` | f9 | (616,156) | 90×86 | f30 |
| grey square `#e0dee1` | f10 | (1106,215) | 91×90 | f23–24 |
| orange flower `#fc7b1b` | f12 | (206,149) | 94×86 | f27 |
| purple heptagon `#8d54dd` | f16 | (664,559) | 92×92 | f25 |

- **Pop-in curve** (black triangle width / final): 0.36 (+0) → 0.82 → 1.11 → **1.20 (+3 f)** → 1.14 → 1.08 → 1.00 → **0.97–0.96 (+7…+8)** → 1.0 (+11). Overshoot 20%, undershoot 4% → underdamped spring, ζ≈0.46, peak at 3 f. Same shape for every mascot (blue: 8→54→89→106→108→100→92→88; final 90).
- **"Breathing" pulse**: ~10–15 f after pop each mascot does one smooth scale bump 1.0 → **1.26** → 1.0 over ~9 f (triangle 19–27: 1.00,1.09,1.18,1.24,1.23,1.15,1.07,1.00). The pulses ripple around the frame: green 16, triangle 22, square 23, purple 25, orange 27, blue 30.
- Expressions: orange `><`, blue `••`, grey `••`, black `++`, purple `><`, green `^^`.
- Slow push-in during hold: radial distances from centre grow ~1.6% over 30 f (≈1.5–2%/s).

Hold f40–50 (static apart from drift).

### S2 — Zoom-through tunnel, f51–109

1. **Mascots sucked into vanishing point** f51–69: all mascots travel to screen centre while shrinking to ~5px. Orange x progress: 55:3%, 57:6%, 59:11%, 61:17%, 62:22%, 63:29%, 64:39%, 65:58%, 66:81%, 67:91%, 68:96%, 69:100% → **ease-in (quint-like) with a 3-frame settle**. Sizes 90→5px.
2. **Camera pushes into lockup** f64–75: lime icon width 86 → 88 → 92 → 98 → 104 → 114 → 126 → 146 → 184 → 258 → 314(f75): scale 1.0, 1.02, 1.07, 1.14, 1.21, 1.33, 1.47, 1.70, 2.14, 3.0, 3.65 → **expo-in**, ~×3.7 in 11 f and beyond. Text gets radial/zoom blur (f74: "dots" & pill smeared outward, ~15px@718 blur).
3. **f76–92 3D tunnel**: white corridor (walls `#f4f6fa`→white, thin grey perspective edge lines converging to centre, small dark UI-screen panels on walls, light blue corner glows still at frame corners). Foreground letters ("ls" of the lockup) fly past camera at f76 with heavy blur. Mascots re-appear near the vanishing point at f79 (≈50px) and fly outward/past camera: e.g. orange 56px (79) → 124 (83) → 146 (86) → 168 (93) → 213 (95) → off (97); blue moves outward to x≈375, purple downward, green upward. Growth ≈ ×1.05–1.08/f, accelerating at the end (perspective).
4. **Video card emerges** f93–109 at vanishing point (centre 638,359): rounded-corner card (r ≈ 14px@718) with the footage (guy in dark room). Width 67 (95) → 474 → 654 → 781 → 881 → 960 → 1026 → 1079 → 1124 → 1161 → 1192 → 1216 → 1236 → 1252 → 1263 (109) → 1271 (110). Linear-width progress 34% @1 f, 59% @3 f, 74% @5 f, 88% @8 f, 97% @12 f → **expo-out** over 14 f. Card edge blur (10–90% edge width): 21px (96) → 13 → 10 → 8 → 6 → 5 → 4 → 4 → 3 → 3 → 2 → 2 → 1 (108) → σ ≈ **8px@718 (12px@1080) → 0 over 13 f**. Card touches frame edges at f110 (corner pixels go dark).

### S3 — Footage A + floating chat input, f108–263

**Footage**: AI-generated live action, guy at a laptop on a bed at blue hour (window, mushroom lamps, orange door light, "STATIC" tee). The footage has its own continuous dolly-in (camera tracker: ×1.012–1.025 per frame, ~×3 from f108 to f205 — in-video camera move, not a 2D zoom) and a pull-back f221–235 as he closes the laptop and lies back (f262 lying in bed). Source has one duplicated frame every 10 f (117,127,…) ≈ 27 fps source.

**Chat input pill** (overlay):
- Geometry at rest: x 114–941, y 442–564 → **828×123px@718 = 64.9% W × 17.1% H → 1245×185px@1080**, centre (527.5, 503) = 41.3% W, 70.1% H. Fully rounded (r = 92px@1080). Fill white `#fbf9fc`/`#ffffff`, no stroke, no visible shadow. Left: circled "+" icon (stroke `#646165`, ≈34px@718). Right: black circle mic button (`#110f12`, ≈50px@718 → 75px@1080) with white mic glyph.
- Text: Regular, `#1c1a1e`, cap M 23px@718 = **3.2% H → 34px@1080**, left x=223 (17.5% W).
- **Entry f123–136: spring slide-up from below frame.** Top edge: 718(123) → 673 → 600 → 518 → 471 → 448 → 442 → 430 → **428 (131)** → 433 → 438 → 442(134) → 444 → 443 → 442. Progress: 16%, 43%, 72%, 89%, 98%, 100%, 104%, **105%**, 103%, 101%, 100%. Overshoot **5.1%** (14px@718), peak at +8 f, settled by +11 f.
- **Typing**: "Make me a viral app." f132–139 (20 chars / 8 f ≈ **75 cps**); hold 30 f (140–169); " Make no mistakes." f170–178 (18 chars / 9 f ≈ **60 cps**). Newly revealed characters render **cyan `#1ba7e7`** (≈2–3 glyphs / 25–50px wide leading band) and fade to black within ~2 f. No caret.
- **Send shimmer** f208–217: soft blue glow `#4a9ff2` (≈90×40px@718 blob, additive) sweeps **right→left** over "mistakes." from x≈800 to x≈560 (≈24px/f). Strong audio onset at 220.
- **Exit f223–233**: anticipation lift −40px (cy 503 → 463 at f228, 5 f, ease-out) then drop out of frame (cy 476, 522, 618, 687, 709 → gone f234; ease-in, 5 f).
- Footage continues f234–263 without overlay.

### S4 — Chat UI, f264–357

- **f264 hard cut** (hdiff 1.95) dark footage → light UI. Entry: content slides **up 42px@718 (63px@1080)** + opacity 0.25→1 + slight blur (σ≈4px@718 on f265) over 12 f. Blue mascot y: 445,437,430,425,421,419,416,414,412,411,410,409 (275)…406 (285) → progress 25%@t=0.25, 90%@t=0.5 of 21 f → **quart-out**. Sharpness 5 → 440 by f274.
- Layout (f300): user bubble right-aligned x 600–1171, y 187–292 (571×105 → 859×158px@1080), fill `#f0f3f6`, r≈30px@718, text "Make me a viral app. Make no mistakes" (no final period), black, cap 17px@718 (2.4% H → 25px@1080).
  Agent row at x=252: blue drop mascot 62px at (195,406) `••`/`><`; "Research" Semibold black cap 18px; "✓" `#286559`; "Researching" shimmering teal `#85c9bc`→`#538178`; body "Researching: On it. Mapping top drama apps and where there's room to win..." `#262327`, cap 17px@718, 2 lines (line pitch ≈29px@718).
- Hold f274–298.
- **Whip-pan right f299–311**: content moves right with increasing speed (bubble cx 878 → 880, 882, 884, 888, 892, 894, 896, 902, 908, 916, 932, 946 = ease-in) and horizontal motion blur (sharp 500 → 25).
- **f312 blur-cut to zoomed-out framing** (scale ×0.64: bubble 564→360px wide) continuing the rightward motion and decelerating: bubble cx 660 (312) → 696 → 716 → 738 → 744 → 762 → 766 → 772 → 774 → 777 … 800 (330); second push 331–340 (808 → 826 → 846 → 882 → 912 → 930 → 944 → 952 → 958 → 960) → settles 341. Reveals full app: left sidebar "Your dots" + search icon + grey list placeholder; chat panel header "Research / Find the signal." (blue mascot), input "Message Research Bot" with black mic button; 1px vertical divider.
- f341–351 hold; f352–357 content moves down (camera up/left toward the sidebar) accelerating (bubble cy 186 → 194 → 200 → 208 → 220 → 232), f356–357 heavy zoom blur toward sidebar → **f358 zoom-cut** into the sidebar list.

### S5 — "Your dots" list, f358–464

- Zoomed sidebar: "Your dots" grey `#5f5d61` Regular + search icon; rows = rounded rectangles `#e8e6e9`-ish (r≈20px@718), each with mascot (≈70px@718) + bold name + grey description.
- **f358–372 settle**: list slides down 125px@718 with velocities 32, 24, 18.1, 13.8, 10.4, 8.2, 5.8, 4.5, 3.2, 1.9, 1.6, 1.2 → decay ratio ≈0.76/f → **expo-out**, ~14 f; blue mascot scales 86 → 136px (×1.58) over the same window.
- Rows appear one per ~15 f: Research ("Find the signal"), Comments ("Find the signal"), Insights ("Understand what matters"), Video ("Plan the story"), Skill ("Make work repeatable"), Script ("Find the right words"), then button "⊞ View all 15 dots" (grid icon, grey text).
- **Per-row choreography** (Comments row, f394–408):
  - f394–396: mascot flies in from lower-left (from ≈(150,390)@718) with horizontal motion blur (~40–60px streak), lands in its slot at f397 (3 f), face `><`.
  - f398–404: name + description fade in with blur (opacity 0 → 1, blur ≈6px@718 → 0, ~6 f), coloured faintly at first (name appears in mascot-tinted colour, e.g. orange "Comments" then darkens).
  - f408: expression swap `><` → `oo` (1-frame glyph swap). Mascots swap faces every 6–10 f throughout (`- -`, `oo`, `><`, `••`).
- **Stepped scroll** (phase-correlation): one row ≈ **200px@718 (300px@1080)** per step. Peaks at f395 (40px/f), 410.5 (41), 425.5 (42), 440 (128px/f, a 2.7-row jump through Video/Skill with heavy motion blur), 463. Step profile (f405–420): 5.7, 7.4, 10, 14.9, 21.6, **41.4**, 34.7, 17.9, 12.3, 8.9, 6.7, 5.7 → symmetric **expo in-out**, ~12–14 f, plus a constant baseline drift ≈5px/f between steps. Cadence 15 f (0.5 s).
- f459–464 final scroll blurs out (sharp 33 at 464) → f465 cut.

### S6 — Chat thread with two agents, f465–509

- f465 cut (sharp 13 → 83): same chat (bubble top-right "Make me a viral app. Make no mis…" cropped by frame), framing ×~1.4 zoomed on agent rows.
- Research row: "Research ✓ Researching" where "Researching" types in letter by letter in light teal f467–485 (≈1 char per 2 f); body "Got it. Scanning X for every viral app launch from the last 3 months..." already present.
- f484–487: content scrolls up ~70px@718 with vertical motion blur (single 3-f burst); orange Comments mascot lands at left.
- Comments row: "Comments ✓ Researching", body "Reading reviews: Reading viewer reviews: what they love, hate, and still want." revealed word-by-word f489–505 (~77 chars / 16 f ≈ **4.8 chars/f = 145 cps**), each word fading in grey with ≈4px@718 blur.
- f506–508 hold, f509 blur/fade.

### S7 — "Elena Voss" post card + chip, f510–554

- **f510 cut** (hdiff 0.81): dark post card already near full size, blurred (sharp 98 → 1917 at f513 = ~3 f deblur). Scale 0.964 → 1.0 over f512–521 (width 663 → 688, expo-out).
- Card: x 294–980, y 62–658 → **687×597px@718 = 53.8% W × 83.1% H → 1034×898px@1080**, fill `#141217`, r ≈27px@718 → 41px@1080 (subtle top gradient: top area slightly warmer `#2a2426` → `#141217`). Contents: round avatar 72px@718; "Elena Voss" white Regular cap ≈26px@718; "@elenamakes" `#6d6a70`; body "I built Sotto Drama for those little gaps in the day when I want a good story. Short vertical episodes, saved series," white 2 lines cap ≈20px@718; image (red velvet seat, phone "Before the Curtain", card "Sotto Drama") r≈12px; stats row "💬 334  🔁 13  ♡ 1k  ▮▮▮ 15K" grey `#a09ea3`.
- **Chip** "Analyzing every short drama post": rest x 538–1155, y 314–424 → **618×111px@718 = 48% W × 15.5% H → 929×167px@1080**, fill `#ebe8ec`, fully rounded, text `#1f1c20` Regular cap 25px@718 (3.4% H → 37px@1080), left padding ≈40px@718. Blue drop mascot (92×100px@718, `**` eyes) overlaps the chip's left end and the card image.
  Entry f511–522: chip + mascot travel **diagonally from top-right to bottom-left**: chip left x 680→536, top y 87→315; y progress 512:45%, 513:70%, 514:86%, 515:93%, 516:96%, 517:98% → **expo-out ~8 f** with motion blur on f511–512.
- **3D tilt f521–541**: rotateY so the left edge comes closer: right-edge/left-edge height ratio 1.00 → 0.99 (523) → 0.983 (527) → 0.971 (531) → 0.96 (533) → 0.943 (535) → 0.921 (537) → 0.894 (539) → 0.876 (541) → 0.869 (543, final). Width 688 → 623. Solving the perspective: **θ ≈ 25°, perspective ≈ 2085px@718 ≈ 3100px@1080**. Progress 8% @2 f, 44% @14 f, 82% @18 f → **ease-in-out (sine/cubic), 22 f**. Chip and mascot tilt with the card (same plane).
- **Pull-back f541–554**: card shrinks to 0.81 and moves left/down (bbox x 299–921/y 42–675 → x 213–718/y 103–615), accelerating (ease-in); chip text blurs.

### S8 — 3D card-deck flip, f555–640

- f555 cut to the deck: same perspective (rotateY ≈ −20…−25°), each new card face replaces the front **every 2 frames** f555→595 (21 cards: Mateo Rios/Roam Stories, Nora Ivers/Mise Studio, Jalen Hale, …, Ledger Studio, Sprout Scripts, Crumb Teasers, Episprout/Brass Horizon, Aster Club, Forkfable, North Boards, Craft Titles, Catfolio, …). Each previous card stays as a sliver behind, offset ≈12–15px@718 to the left → a growing receding stack (up to ~12 visible slivers).
- Deck motion (bbox, threshold ink): 555 x201–791 (h567) → 561 x148–928 (h638, max) → 567 h530 → 571 x0–762 → **577–579 smallest: x0–649, h465 (0.73)** → 583 h488 → 587 h565 → 591 h656 → 593 h700 → **595 overfills frame** (Amara card lands huge). Horizontal motion blur throughout (gx/gy 0.48–0.70).
- f595–619 settle: Amara card shrinks from overfill to x0–1059 (right edge 1275 → 1251 → 1202 → 1165 → 1135 → 1111 → 1091 → 1076 → 1066 → 1060 → 1059) → expo-out ~24 f; behind it the stack of slivers recedes left.
- **f621–623 stack collapse**: all slivers vanish into the front card in 2 frames (bbox left 0 → 120 → 297).
- f623–640: single Amara Ellis card centred x 295–1075, y 46–677; slow scale-up (h 636 → 677 by f639, ≈+0.35%/f); chip "Analyzing every short drama post" at bottom-right of card (same style); mascot expression changes `oo` → `><`.

### S9 — Close-up, f641–670

- f641 **punch-in cut** (hdiff 0.53, scale ≈×2.3) to the card's lower half: serif card art ("FEARS: Failure / Irrelevance, SECRET: The Master's Daughter", green chess queen), stats "45 · 87 · 746" white, and below the card a chip **"Reading 324 comments on top dramas"** with orange blob mascot (120×102px@718, `--`/`oo`).
- Motion f641–651: everything still travelling down-left from the cut (chip left x 572 → 480, top 407 → 499; expo-out ~9 f), sharpness 934 → 1170 in 4 f (light deblur).
- f651–670 slow drift up ≈1px/f. Mascot face swaps `--` → `oo` at ~f662.

### S10 — "Finding your edge" status + punch-in, f671–742

- **f671 cut** to white (light): faded grey ghost of the post card at the top (y 0–115, fill `#e4e1e5`, ~10% opacity) and the status block below.
- Layout (f712): blue drop mascot 70×76px at x150–219, y158–233. Header "Research" Regular black cap 20px@718 (2.8% H → 29px@1080) + "•" `#0b7b64` + "Analyzing" teal `#4d9d8d` (shimmer). Title **"Finding your edge in short drama."** Regular `#060408`, cap 36px@718 (**5.0% H → 54px@1080**), left x=250 (19.6% W), y 233–268. Sub "Demand, competitors, and what viewers miss." `#5d5a61` cap 23px@718 (3.2% H → 34px@1080). Bullets (x=292 text, spinner dotted-circle icon at x≈270, `#cfcdd1`): "Mapping top drama apps." / "Checking downloads and revenue." / "Reading reviews for what's missing." `#646165` cap 23px, line pitch 57px@718 (85px@1080).
- **Reveal**: mascot pops (scale 0 → 1, f671–674). Header f671–675. Title per-word, word onsets f675, 677, 678, 678.5, 679, 680 (**≈1 f stagger**), each word ~5–6 f opacity 0→1 with blur ≈4–6px@718 (6–9px@1080), left-to-right — reads like a fast typewriter with a soft trailing edge. Sub f676–686; bullet 1 f677–683; bullet 2 f682–690; bullet 3 f690–698 (≈6–8 f stagger per line).
- Hold f690–700 (camera static, scale 1.000).
- **Scroll-up ease-in** f700–718: dy −0.2, −0.5, −0.7, −1.0, −1.3, −2.0, −3.4, −5.2, −8.3, −12.6 px/f.
- **f719 punch-in cut ×1.475** (no blur), the upward motion continues and decelerates (−19.3, −13.6, −9.3, −6.2, −5, −3.3 … −1.7 px/f). New line **"Here's what I found."** (same 36px@718 style, scaled → H cap 54px@718 on screen) types in word-by-word f720–731 next to the blue mascot (110px on screen), words fading in grey `#514f52` → black.
- f737–742 scroll-up accelerates again (−2.7 → −11.8 px/f) → match-cut.

### S11 — Comment thread, f743–844

- f743 cut to dark: top shows the Amara card bottom (image + stats), then replies. Panel x 196–1080 (**885px = 69.4% W → 1331px@1080**), full height, fill `#171816` with a subtle dot texture, comment rows separated by 1px `#2c2c2c` dividers.
- Comment entries (white names, grey `@handles`, "Replying to @amarakeepsnotes" with lime handle, white body, icon row 💬 🔁 ♡ ⇪, lime-yellow "1 more reply" with "⋮" thread line): Derek Mills @derekmills_23 "Ok.. this is actually really good. watched 3 episodes on my lunch break and forgot to eat lol" · Kayla Moon "finally a drama app that doesn't ask for coins every 2 episodes. please never change that" · Rosa Delgado @rosadelgado "the pick up where I left off thing is so underrated. every other app loses my spot" · Tyler Grant @tylergrant_91 "Opened it expecting another billionaire plot and... ok episode 3 got me" · Munkvoo "wait there's no ad every 30 seconds?? downloading" · Nina Petrova …
- Scroll velocity (px/f@718):
  - f744–758 continuing deceleration from the cut: 119.5, 89.9, 59.5, 41.7, 30.3, 22, 16, 11.8, 9.1, 7.1, 5.9, 5.0 (ratio ≈0.74/f, expo-out).
  - Pulse 1 f759–773: 5.7 → 8 → 14 → 20 → 28 → **45.9 (765)** → 40 → 26 → 17 → 12 → 10 → 8.4 (≈262px, expo in-out 14 f).
  - Pulse 2 f774–792: peak **54 (783)**, ≈380px.
  - f795–844 **continuous exponential acceleration** 4.2 → 143 px/f (×≈1.075 per frame, expo-in, ~2050px total) with strong vertical motion blur (sharp 2200 → 270).
- f844 velocity ≈256px/f → cut.

### S12 — Grid of posts, f845–921

- f845/846 cut: grid of dark post cards rising into place, continuing the upward scroll and decelerating (−44, −17, −13, −11 px/f → settled ~f853).
- Grid (f880): cards 263×236px@718 (395×355px@1080), gap 19px@718 (28px@1080), pitch 281px; bg `#fbf9fc`. Card internals = same post template (avatar, name, 2-line quote, inner reply card, image, stats).
- **Zoom-out in two eased steps**: scale 1.0 → 0.72 (f855–875, peak −4.3%/f at f865) → slow −0.4%/f → 0.70 → 0.535 (f883–905, peak −3.3%/f at f893) → 0.532 (910). Each step ≈20 f, symmetric ease-in-out (cubic). Final: ~7 columns × 4+ rows visible.
- f910–921 grid accelerates downward (dy 2.4, 2.7, 2.8, 3.2, 3.6, 4.1, 4.8, 5.8, 6.8, 8, 9.9, 11.9, 14.3, 16.6, 18.3 px/f = ease-in) → f922 cut.

### S13 — Single card, f922–970

- f922 cut: one card (Aster Club; "Morgan Webb") enters from the top with strong **vertical motion-blur smear** (f922–925 appears as vertical streaks; sharp 416 → 156) and settles by f928–930. Final bbox x 329–944, y 78–638 (615×560px@718 → 925×842px@1080), centred.
- Hold f930–970 (40 f, static).

### S14 — "Insights complete", f971–1000

- f971 cut to light. Black pill mascot (74×49px@718, `#29272a`, white `••` eyes) at x103–176, y144–192.
- Header "Insights" Semibold cap 17px@718 + "✓" `#8daca7` + "Insights complete" `#197e69`.
- Title **"Huge demand. Here's your edge."** **Bold** `#050306`, cap 31px@718 (**4.3% H → 46px@1080**), x=208 (16.3% W). Sub "Viewers keep asking for the same three things." `#5f5f61` cap 19px@718.
- Numbered list: "01" `#6f6f71` (cap 16px) + "Fair pricing:" `#3b383c` (cap 19px) / "No coin traps · Fewer ads" `#b5b3b6`; "02 Fresh stories: / New episodes daily · Made with AI"; "03 Launch on short-form: / Trailers · Creator UGC · X". Item pitch ≈90px@718.
- Reveal: title words f971–975 (≈1 word/f), mascot pops f973–976 with blur, header f976, sub f978, items stagger ≈4 f each (f978–994), each item fading from very light to final grey.
- **Exit f996–1000**: block moves up and blurs out (4 f).

### S15 — "The Last Promise." app screen, f1001–1013

- Vertical **slide-up push**: dark web-app screen enters from bottom with vertical motion blur. Top edge y: 688 (1000) → 558 → 391 → 265 → 186 → 134 → 96 → 68 → 47 → 32 → 20 → 12 (1011). Progress 23% @1 f, 46% @2 f, 64% @3 f, 75% @4 f, 88% @6 f, 95% @8 f → **expo-out, 11 f**. Ends as a 1234×694 card (r≈10px) with 20px margins, sharp f1009–1013.
- Content: "✳ PREMIERE" nav, pills "Discover / This week / My reminders", "• TONIGHT · A NEW STORY BEGINS", "The Last Promise." (large white geometric display, ~6.5% H), CTA "▷ Watch the trailer" (light-blue pill), countdown widget "00 : 18 : 42", schedule row "Your week, in stories." with 7 poster cards.

### S16 — 3D fan of app screens, f1014–1131

- **f1014 blur-shrink**: screen jumps to blurred (sharp 2496 → 265) and shrinks: bbox w 1154 (1014) → 973 → 883 → 818 → 766 → 718 (1019) — ×0.62 in 5 f, expo-out, moving slightly left/up.
- **Fan-out f1020–1036**: screen becomes the front layer of a 3D stack (rotateY ≈ +35–40°, rotateX ≈ 10°, layers spaced ~50–60px@718 along the depth axis) — ~12 app screens (Rain Check, FINISHED., yellow "50 MIN. THEN YOU'RE DONE", blue, dark green, orange "UNRATED", white, Run After Midnight, purple…) spread out to the right; bbox right edge 908 → 1004 (f1035) (expo-out ~15 f). A soft **mint/cyan radial glow** appears behind the fan (`#ddf0ef` / `#c4ddde` near the fan, fading to bg over ≈350px), and heading **"Analyzing 150 apps..."** top-left (x 67, y 37; Regular, cap 22px@718 = 3.1% H → 33px@1080, tracking ≈ −3%).
- **Floating labels** with thin 1px white leader lines to individual screens (each = mascot icon 30–40px + black text cap 13px@718 (20px@1080), on a semi-transparent white pill with soft white glow): "Launch plan ready" (orange), "App brief ready" (blue clover `^^`), "78 apps analyzed" (blue drop), "Brand book reviewed" (orange flower `><`), "6 screen layouts" (purple heart `^^`), "UX copy drafted" (purple blob `--`), "Core features mapped" (grey ghost `><`). They pop in one by one (scale 0→1 + blur, ~4 f each), ~3–6 f apart starting f1027, some fade out and are replaced (labels cycle through f1036–1114; "Launch plan ready" gone by ~1063, "Core features mapped" in at ~1063).
- Camera: slow push-in scale 1.000 → 1.106 over f1036–1090 (0.4%/f decaying to 0), static 1090–1113.
- **Fly-in f1114–1131**: camera accelerates toward the fan's front screen while the fan rotates to face camera; bbox right edge 1013 → 1231 (f1127); motion blur increases (sharp 941 → 273). f1132–1138 front screen ("Rain Check.", portrait of a man) fills frame with r≈12px corners, blur clearing (sharp 317 → 1136).

### S17 — "Your app blueprint is ready.", f1139–1210

- f1139–1148: the screen slides **up** and out, leaving its bottom row ("Your week, in stories." poster row) as a strip at the top (y 0–~60) — bbox bottom 711 → 489 (ease-in-out, 10 f, peak −44px/f).
- Text (f1190): blue clover mascot 37×46px at x130–167 pops at f1155 (0→1 in ~3 f); header "Skill ✓ Skill complete" (`#1a7b67`) fades in f1161–1166; title **"Your app blueprint is ready."** Bold black cap 31px@718 (4.3% H), x=209, **typed char by char f1140–1166 (28 chars / 26 f ≈ 32 cps)** with soft fade on the newest 2–3 glyphs; sub "Research, demand, and your edge in one plan." grey, typed f1148–1172.
- Doc card: x 207–1180, y 395–517 → **973×122px@718 → 1464×184px@1080**, fill `#f0f3f6`, r≈14px@718, no border; doc icon `#3f64cb` on light-blue square (≈40px), "Drama App Blueprint" black cap ≈16px, "Document" grey, download ⤓ icon right. Fades/slides in f1148–1151.
- Hold f1166–1205 with a slow upward drift (≈0.2px/f) and a faint white shimmer passing over the doc card (~f1172–1185).
- f1205–1210 blur-out upward.

### S18 — "Building your drama app.", f1211–1255

- Grey square mascot `><` (48px) at x≈107–147, header "Build • Building" (green), title **"Building your drama app."** Bold cap 31px@718 at x=210, "Connecting the **Higgsfield API**" (product name in green→lime gradient ending `#b5d921`), "Plugging in Cinema Studio, Genjutsu, and more..." grey.
- f1211–1220 block slides in from below/blur; lines typed f1214–1232 (word-by-word with lime head).
- Hold f1235–1250. f1250–1256 text fades and drifts left/up with blur; mascot remains.

### S19 — Mascot party, f1256–1329

- f1256–1260: grey square moves right and scales up ×≈4 (to 200×200px@718) with blur.
- **f1261 orange bear "smash-in"** from left with horizontal motion blur (one frame smear), pushing the grey square right; f1262–1265 both settle: orange bear x 295–497, y 262–451 (203×190px@718 → 305×286@1080) and grey square x ≈780–979, y 259–458 (200×200 → 300×300@1080, r≈40px@718). Eyes `••`.
- Hold f1265–1278 (tiny drift apart).
- f1279–1280 both squash + blur → **f1281 cut**: 9 mascots scattered (each 40–50px@718): orange bear, orange flower, blue drop ×2, black pill, grey square ×2, purple ×2, orange round. f1281–1284 pop/settle; hold to 1297.
- f1298–1300 blur → **f1301**: 22 smaller mascots (~30px@718) incl. green, black triangle, blue diamonds; hold f1301–1313.
- **Implode f1314–1321**: all fly to centre (640,490) with radial motion blur streaks (ease-in, 7 f), merge into one ~25px blob (f1320–1323), shrink to a tiny grey ghost mascot (~10px) f1324–1329.

### S20 — "Generating episodes with Higgsfield.", f1330–1420

- Ghost mascot (61×65px@718, `#e0dee1`, `><`) travels from centre to header position (x107–168, y187–252) f1330–1338.
- Header "Media • Working" (black Semibold cap 17px + dot `#117b65` + "Working" `#28816f`). Title **"Generating episodes with Higgsfield."** Bold cap 31px@718 (G 249–279), x=208. Lines: "**Cinema Studio** for cinematic scenes." / "**Genjutsu** for motion transfer." / "**Marketing Studio** for posters and ads." — product names in a per-word left→right gradient `#2f6e5e` (dark teal) → `#73916d` → `#a5c450` → `#bdda1e` (lime); rest `#626266`. "Here's your app, ready to launch" `#62605f`.
- **Typing with lime head**: title f1339–1347 (≈4 chars/f), lines f1341–1352; newest characters render lime (`~#c8e630`) and settle to final colour in ~6 f (f1345 "Here's your app, ready to launch" fully lime → grey by f1351).
- Phone placeholder: f1360 grey rect `#e5e2e6` at x207–420 (213px wide = 16.7% W), y542 → off bottom, r≈10px; f1363–1372 cross-fades to near-black; f1378–1390 app UI ("plotline." logo, "Stories.", portrait, "Caught · Part 1", purple play button) fades in inside; f1402 → "Library." screen; f1408–1417 goes dark again.

### S21 — plotline phone app, f1421–1528

- f1420–1426: status text blurs/fades out upward; phone moves to centre and scales up (expo-out, ~10 f; strong audio hit 1434 when it lands ~f1430). Phone: x 425–851 (426px = 33.4% W → 641px@1080), y 87 → bottom bleed, r≈20px@718, bg `#1f182a`, purple accent `#7b3fe4`-ish (logo, active pill, play button).
- Screens: "Stories." (f1430–1443) → "Library." with search "Find a scene", tabs "All scenes 6 / Spanish / Portuguese", grid of scene thumbs (f1444–1470) → Portuguese tab selected and grid re-flows (f1471–1486, phone slides up 8px).
- f1487–1495: phone scrolls/zooms up with vertical motion blur to the "Picnic secret" scene detail (video with PT subtitles "Deviamos fazer isto mais vezes.", player bar, "SCENE 03 / Picnic secret", tags "Portuguese captions · English audio · 12 s", "The same US couple laughs together at a…").
- Ghost mascot (white, `••`, 60px) + chip **"Publishing your app to the marketplace"** (chip style `#ebe8ec`) slide in from the left f1492–1498 with blur, text typed; hold f1501–1527; phone drifts up ~25px.
- f1528–1532: everything whips **upward** with vertical motion blur (sharp 1581 → 245).

### S22 — Footage B card → fullscreen, f1529–1628

- f1530–1532: footage card (guy at laptop, night city window) appears from below in blur; f1533–1540 rises: bbox top 212 → 116 (cy 464 → 368, expo-out). Card x 191–1085 (895×506px@718 = 70% W → 1346×761@1080), r≈10px.
- **Scale to fullscreen f1540–1554**: width 898 → 907 → 924 → 952 → 995 → 1052 → 1111 → 1159 → 1195 → 1220 → 1240 → 1254 → 1264 → 1271 → 1275. Progress 3%, 7%, 14%, 25%, 41%, 56%, 69%, 79%, 85%, 91%, 94%, 97%, 99%, 100% → **ease-in-out, front-weighted (peak speed at 36% of duration)** ≈ cubic-bezier(0.45, 0, 0.2, 1), 14 f.
- Close-up footage of guy looking at laptop, smiling (f1555–1628).
- **Chip** "Getting your app recommended by people" with orange blob mascot (`**`, 120×102px@718): f1591 horizontally blurred, f1592–1595 rises 60px (y 510 → 450, expo-out 4 f), then drifts down ~11px by f1600 with the footage. Chip at rest x 539–1211, y 450–547 → **673×98px@718 → 1012×147px@1080**, fill `#ebe8ec`/`#f6f4f7` (opaque light), text `#1c1a1e` cap 21px@718 (2.9% H → 31px@1080).

### S23 — UGC carousel, f1629–1697

- f1629 hard cut (hdiff 1.34) to white bg with a horizontal strip of **9:16 UGC tiles** (people holding phones showing the plotline app): tile 352×640px@718 (→ 529×963px@1080), gap 26px@718 (39px@1080), top y=45, r≈10px@718.
- Horizontal velocity (content moves left, px/f@718): 452.8 (1630), 226.5, 128, 92, 73, 61, 52, 46, 41, 37, 34, 31, 28, 26, 25, 23.5, 22, 21, 19.5, 19, 18, 17, 16, 15.3, 14.9, 14.1, 13.7, 13, 12.3, 12 → **11.4 px/f constant from f1660** (=343px/s@718 → 516px/s@1080). I.e. linear drift 11.4 px/f + an expo-out entry offset of ≈1200px over ~30 f.
- **Exit f1680–1697**: strip drops down with ease-in (dy 0.4, 0.7, 1.5, 2.1, 2.8, 3.5, 4.3, 5.3, 6.4, 7.8, 9.3, 11.3, 13.7, 16.8, 20.8, 26.8, 36.4, 54.6, 116 px/f) while the horizontal drift continues.

### S24 — End lockup, f1698–1786

- f1698 cut to the S1 background. Same choreography as S1 with a +1697 f offset for mascots (green 1703, triangle ~1704, blue 1706, square ~1707, orange 1709, lime icon 1709, purple 1713) and the same pop/pulse curves (square second pulse 116px at f1721, triangle 109 at 1721).
- Differences from S1: OpenAI icon whips up from below straight into its final left position (x 183, f1700–1701, no centred phase); "OpenAI" drops in from above f1702–1703, "dots" drops in f1703–1704; **pill "Always-On-Agents" types letter by letter f1701–1716 (16 chars ≈ 1 char/f) while the pill outline grows with the text** (outline visible from f1708); "Higgsfield" glyph-scramble f1709–1726; "dots" gradient sweep f1719–1735.
- Mascot final positions differ slightly from S1: orange (155,121), blue (626,128), grey square (1121,133), purple (647,617), green (1104,608), triangle (157,590).
- Camera: continuous push-in ≈ **+4.5% over 62 f (≈2.2%/s)**, measured from icon (w 86 → 90) and radial distances of all mascots (e.g. green 466 → 487px from centre f1720 → 1782). No fade-out; video ends on f1786.

---------------------------------------------------------------------------------------------------

## 3. Signature patterns (with parameters)

1. **Mascot pop-in spring**: scale 0 → 1.20 (+3 f) → 0.96 (+7 f) → 1.00 (+11 f). Underdamped, ζ≈0.46, peak at 3 f. Optional motion-blurred approach from off-slot (3 f). Followed 6–15 f later by a **"breathing" bump** 1.0 → 1.26 → 1.0 over 9 f (sine), rippling across mascots 2–3 f apart.
2. **Expression swaps**: mascot eye glyphs change instantly (`><` ↔ `oo` ↔ `••` ↔ `--`) every 6–10 f while on screen.
3. **Status block** (S4, S6, S10, S14, S17, S18, S20): `[mascot 48–70px] Agent-name • status` (status teal-green `#197e69`–`#28816f`, dot `#0b7b64`, or ✓ + label), then a big title (Regular 36px@718 in the first half, **Bold 31px@718** in the second half), grey sub, then bullets/list. Left aligned at ≈16–20% W.
4. **Text reveal**: per-word (or per-char) opacity 0→1 + blur ≈4–6px@718 (6–9px@1080) → 0 over 5–6 f, **≈1 f word stagger**, lines staggered 6–8 f. Typing variant: fast char reveal (30–75 cps) with a coloured head (cyan `#1ba7e7` on the input, lime on Media) fading to final colour in 2–6 f. No caret anywhere.
5. **Chips**: fully rounded `#ebe8ec` pill, Regular dark text (cap 21–25px@718), mascot (≈100px@718) overlapping the chip's left end; enter with 8 f expo-out from an offset (diagonal from top-right in S7, up 60px in S22) with motion blur on the first 1–2 f.
6. **Scroll language**: stepped scrolls, each step = symmetric expo-in-out ~12–14 f, peak 40–55px/f@718, on a 15 f cadence, riding on a constant 4–5px/f baseline drift; final steps accelerate exponentially (×1.075/f) into the next cut.
7. **Motion match-cuts**: velocity is continuous across the cut (743, 845, 922, 1001, 1629). The incoming shot starts at high speed and decelerates (expo-out, ratio ≈0.74–0.76 per frame).
8. **Punch-in cuts**: hard scale jumps mid-move (×1.475 at 719; ≈×2.3 at 641; ×1/0.64 zoom-out at 312; zoom-blur into sidebar at 358).
9. **3D cards**: rotateY ≈ 25°, perspective ≈ 3100px@1080, tilt in over 22 f (ease-in-out); deck flip = new card every 2 f, previous cards kept as slivers offset 12–15px@718 to the left; deck pushes away to 0.73 then rushes toward camera to overfill; stack collapses in 2 f.
10. **Zoom-through tunnel**: expo-in push ×3.7 in 11 f with zoom blur → white 3D corridor → mascots fly past camera → content card emerges at the vanishing point (expo-out width 5% → 100% in 14 f, blur σ 12px@1080 → 0).
11. **Card → fullscreen**: rounded card scales ×1.42 to full bleed, ease-in-out (cubic-bezier ≈ 0.45,0,0.2,1), 14 f.
12. **Slow push-in on holds**: 1–2.2%/s (S1, S24, fan +10.6% over 54 f decelerating).
13. **"dots" gradient sweep**: multicolour band blue → teal → green → olive → orange → coral → red-pink, ≈570px@1080 wide, moving right→left at ≈48px/f@1080, 16 f.
14. **Palette discipline**: everything on `#fbf9fc` + dot grid; colour only from mascots, status green, and the lime/teal product-name gradient. No drop shadows on UI except a faint soft shadow under the 3D fan and dark cards.

---------------------------------------------------------------------------------------------------

## 4. Rebuild recipe (Remotion, 1920×1080, 30 fps, 1787 frames)

All 1080p values = 718p × 1.504.

**Base layer** (`<Bg/>`): `background:#fbf9fc`; dot grid `radial-gradient(circle, #f3f0f4 1.6px, transparent 2px) 0 0/41px 41px`; TR glow `radial-gradient(630px 600px at 100% 0%, #d0e2f5 0%, #dae8fa 25%, rgba(251,249,252,0) 100%)`; BL glow `radial-gradient(680px 720px at 0% 100%, #d2e0ec 0%, #dae5f1 25%, rgba(251,249,252,0) 100%)`.

**Springs / easings**
```ts
const popSpring = {mass: 1, stiffness: 1200, damping: 32};      // 20% overshoot, peak ~3 f (mascots, small icons)
const pillSpring = {mass: 1, stiffness: 260, damping: 22};      // ~5% overshoot, peak ~8 f (chat input slide-up)
const expoOut = Easing.out(Easing.exp);                         // card emerge, slide-up push, list settle, chip entries
const expoIn  = Easing.in(Easing.exp);                          // tunnel push, scroll accel into cuts
const quartOut = Easing.out(Easing.poly(4));                    // chat UI entry (21 f)
const inOut   = Easing.inOut(Easing.cubic);                     // lockup lift (10 f), grid zoom steps (20 f), 3D tilt (22 f)
const toFull  = Easing.bezier(0.45, 0, 0.2, 1);                 // card -> fullscreen (14 f)
```
- Mascot: `scale = spring({frame: f - start, fps, config: popSpring})`, then add pulse `1 + 0.26 * Math.sin(π * clamp((f - pulseStart)/9, 0, 1))`. Eyes as absolutely positioned glyph swaps keyed on frame ranges.
- Breathing ripple start frames (relative to lockup start): green 10, triangle 15, square 16, purple 19, orange 22, blue 26 (pulse midpoints 16, 22, 23, 25, 27, 30).

**S1 lockup**
- Icon: translateY from +120px → −52px → 0 (`interpolate(f,[2,6,11],[120,-52,0])`, ease-out then ease-in-out) + `filter: blur()` 8px on f2–3 only (vertical motion blur: use `transform: scaleY(1.6)` plus blur, or a CSS `filter:url(#motionY)` SVG feGaussianBlur stdDeviation="0 10").
- Group x: `interpolate(f,[11,23],[+268,0],{easing:expoOut})` (1080p px).
- HF icon: scale `spring(popSpring)` from f12 (13% overshoot) + x `interpolate(f,[12,21],[+260,0],{easing:expoOut})`.
- "Higgsfield": split glyphs, each with its own start in a shuffled order over f12–30 (~2 f apart); each glyph: opacity 0→1 + scale 0.6→1 + blur 6→0 px over 3 f.
- "dots": `background: linear-gradient(90deg, #000 0%, #000 30%, #4a7fc0 38%, #5fb8a8 44%, #8fd27a 50%, #c9b050 56%, #e08a50 62%, #d65a62 68%, #000 76%, #000 100%); background-size: 400% 100%; -webkit-background-clip: text; color: transparent;` animate `background-position-x` so the band crosses right→left during f20–36 (linear).
- Pill: from f33, `translateY(interpolate(f,[33,40],[22,0]))`, opacity 0→1, `width` reveal 95%→100%; lockup `translateY(interpolate(f,[29,39],[0,-59],{easing:inOut}))`.
- Push-in: wrap the scene in `scale(1 + 0.00055*(f-0))` (≈1.6%/s) in S1; `scale(1 + 0.00073*(f-1698))` in S24.

**S2 tunnel**
- f51–69 mascots: `progress = interpolate(f,[51,69],[0,1],{easing: Easing.in(Easing.poly(5))})`, `translate = lerp(pos, center, progress)`, `scale = lerp(1, 0.05, progress)`.
- f64–76 lockup: `scale = interpolate(f,[64,76],[1,5],{easing:expoIn})`, transform-origin at the lime icon (~ (1136,481)@1080), plus `filter: blur(interpolate(f,[70,76],[0,20]))`.
- f76–95 corridor: a CSS 3D box (`perspective: 900px`) of 4 white planes (`#f4f6fa`→`#ffffff`) with 1px `#d9d8de` edge lines and small screenshot panels; animate the camera `translateZ` linearly forward ~3000px over 20 f; mascots as `translateZ` sprites placed along the corridor so they pass the camera between f83 and f97.
- f93–109 card: `scale = interpolate(f,[93,109],[0.05,1],{easing:expoOut})`, `filter: blur(interpolate(f,[96,109],[12,0]))`, `border-radius: 21px` → 0 as it fills.

**S3 input pill**: 1245×185px, `border-radius: 92px`, `background:#fff`; enter `translateY = (1 - spring({frame:f-123, config:pillSpring})) * 415`; exit `translateY = interpolate(f,[223,228,233],[0,-60,+380],{easing:…})` (ease-out up, ease-in down). Typing: `text.slice(0, n)` with n from `interpolate(f,[132,139],[0,20])` and `[170,178],[20,38]`; render the last 3 visible chars in `#1ba7e7` with opacity ramp to black over 2 f. Send shimmer: a 135×60px `radial-gradient(#4a9ff2aa, transparent)` with `mix-blend-mode: screen`, x from 1200 → 840 (1080p) over f208–217.

**Status-text component** (reuse for S10/S14/S17/S18/S20): words as spans; `opacity = interpolate(f - (start + i*1), [0,5],[0,1])`, `filter: blur(interpolate(…,[0,5],[8,0]) px)`, optional `translateY 6px→0`. Lines start 6–8 f apart. Typing variant: per char `start + i/charsPerFrame`, head colour lime `#c8e630` → final over 6 f.

**Scroll steps**: `y = baseline*f + Σ step_k * interpolate(f,[t_k, t_k+13],[0,1],{easing: Easing.inOut(Easing.exp)})`, step = 300px@1080, baseline 7px/f, t_k every 15 f; enable motion blur via Remotion `<CameraMotionBlur shutterAngle={180} samples={10}>` on the scrolling layer (or `<Trail>`), which reproduces the 40–55px/f streaks.

**Match cuts**: start the incoming shot's position with `expoOut` decay from the outgoing velocity: `y = v0 * (1 - 0.75^(f-cut)) / (1-0.75)` with v0 = outgoing px/f (×1.504).

**3D card tilt**: parent `perspective: 3100px`; card `rotateY(interpolate(f,[521,543],[0,-25],{easing:inOut}) deg)`, transform-origin centre; pull-back `scale 1 → 0.81`, `translateX 0 → -220px`, f541–554 `Easing.in(Easing.cubic)`.
**Deck**: array of 21 cards; `frontIndex = floor((f-555)/2)`; card k rendered at `translateX(-(frontIndex-k)*20px) translateZ(-(frontIndex-k)*40px)`, `rotateY(-22deg)`; deck scale keyframes `[555,561,578,595,619] → [0.93,1.0,0.73,1.35,1.0]` (expo in/out between); collapse: `interpolate(f,[621,623],[1,0])` on all non-front cards' X offsets and opacity.

**Fan (S16)**: 12 screens in a `preserve-3d` group, `rotateY(38deg) rotateX(10deg)`, layer i at `translateZ(-i*85px) translateX(i*20px)`; unfold `translateZ` multiplier 0→1 over f1020–1036 (expoOut); camera `scale(interpolate(f,[1036,1090],[1,1.106],{easing:Easing.out(Easing.quad)}))`; fly-in f1114–1131 `scale 1.1 → 3.2` + group rotateY → 0 (expoIn) with CameraMotionBlur. Glow: `radial-gradient(700px 420px at 52% 52%, #c4dddecc, #ddf0ef88 40%, transparent 70%)`. Labels: pill `rgba(255,255,255,0.7)` + `backdrop-filter: blur(8px)`, 1px white leader lines, pop with popSpring 4–6 f apart.

**Card → fullscreen (S22)**: card 1346×761 → 1920×1080, `scale = interpolate(f,[1540,1554],[1,1.427],{easing:toFull})`, radius 15px → 0.

**UGC carousel (S23)**: `x = -(1200*1.504) * Easing.out(Easing.exp)(clamp((f-1629)/30)) - 17.1*(f-1629)` (1080p px/f), tiles 529×963, gap 39px, radius 15px; exit `translateY = 1080 * Easing.in(Easing.exp)(clamp((f-1680)/17))`.

**Sound sync**: put hard cuts on the beat grid (≈20–21 f per beat, onsets every 5 f); add whoosh SFX on the tunnel push (f64–76), each scroll step peak, the deck flip (f555–595), the fan fly-in (f1114–1131), and the implode (f1314–1321).
