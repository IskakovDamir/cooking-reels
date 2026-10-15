<!-- Frame-accurate forensic breakdown of reference v4, produced by a measuring agent (template matching, blur fits, colour sampling). Numbers are measured at 1276x718 and converted to 1080p. Use it to rebuild a shot exactly; the library defaults already encode the recurring values. -->

# v4 — Higgsfield API "100% CASHBACK" promo: frame-accurate breakdown

Source: `videos/v4.mp4`, 1276x718 (IG downscale of 1920x1080), 30 fps, 782 frames (f0..f781), 26.07 s.
Conversion used everywhere: **px@1080 = px@1276 x 1.5047**. "% H" = share of frame height (718), "% W" = share of width (1276).

Method: all 782 frames extracted; dense native-fps contact sheets for every event; bounding boxes from colour masks; template matching (OpenCV, multi-scale) for scale/position tracks; polar-unwrap cross-correlation for wheel rotation; 10-90 % edge-width for blur; OCR + visual read for counters; spectral flux for audio. Easing fitted against 17 standard curves + a cubic-bezier grid search (rms on normalised progress).

---

## 0. Global facts

| item | value |
|---|---|
| Music tempo | **132.5 BPM** (beat = 13.58 f, 8th = 6.79 f). Cuts and big moves land on the 8th-note grid (see §14) |
| Music end | RMS falls 0.30 -> 0.02 over f722-f730 (synced to the white fade f718-f731); silence from ~f745 |
| Light bg | off-white **#FAF7FB** (exact, sampled in 6 scenes) |
| Dark bg | true black **#000000** (card scene), near-black **#080509 -> #1B191A** (September scenes) |
| Lime accent | flat UI lime **#D2F719 / #D3F714 / #D0F913**, tag text **#D9F906**, 3D coin body avg **#94A905** (shadow #7F9A00, highlight #D9F244) |
| Pink accent | pill pink **#E71664** (title), **#E1135D** (pool pill), scramble glyph pink **#F91489**, Spend text **#F616A1** |
| Type | One grotesk family for all display text: bold/heavy, slightly condensed, tight tracking (~-2 %), ink-trap/notched **B** (middle junction cut), flag-heavy **1**, curved **R** leg. Candidates: *Bricolage Grotesque (Bold, opsz 96, slightly condensed)*, *Space Grotesk Bold*, *PP Neue Machina* (less likely). `{API}` and code snippets in a **monospace** with slab I (Space Mono / JetBrains Mono). End card in a regular-weight neo-grotesk (Inter / Neue Montreal Regular). |
| Text case | display text ALL CAPS everywhere except card labels ("Your / Higgsfield {API} / Balance", "Spend", "Cashback") and "30th" |

### Shot/segment table

| # | frames | dur | kind | content | in | out |
|---|---|---|---|---|---|---|
| S1 | 0-55 | 56 | title-card | "100% {CASHBACK} [ON HIGGSFIELD API]" + 3D lime coins | open (bg present at f0) | camera dolly-through f54-64 |
| S2 | 56-79 | 24 (clean 64-79) | 3d-render | lime 3D "HIGGSFIELD {API}" chip, traces grow | zoom-through | hard cut f80 |
| S3 | 80-94 | 15 | 3d-render | coin stack + black tag "+$25,000" | hard cut | hard cut f95 |
| S4 | 95-114 | 20 | 3d-render | coins dropping onto stack + "+$30,000" | hard cut | hard cut f115 |
| S5 | 115-173 | 59 | counter/title | "WE'RE ALLOCATING / $20,000,000 / [CASHBACK POOL]" + coins | hard cut | zoom-in accel -> white f174 |
| S6 | 174-228 | 55 | title-card | "FIRST COME, / FIRST SERVED" scramble-typed on technical grid | 2 f white hold | glitch zoom-to-black f229-232 |
| S7 | 233-378 | 146 | chat-ui / counter | dark scene, lime-glow balance card $10,000 -> $2,629 -> $10,000 with Spend/Cashback | glitch | card flies up f350-377, black f378-379 |
| S8 | 379-419 | 41 | brand-intro / title-card | "Higgsfield {API}" lockup typed while bg ramps black->white; shrinks up; "MOST AFFORDABLE / ON THE MARKET" | black | split/glitch f420-431 |
| S9 | 420-511 | 92 | other (3D wheel list) | headline in corners + rotating wheel of model names | split | glitch/smear f508-518 |
| S10 | 516-617 | 102 | ai-video (thermal) | false-colour footage + "CLAIM UP TO / $100.000 / PER ORGANIZATION" | glitch smear | grade-shift + pixel dissolve to black f600-617 |
| S11 | 617-663 | 47 | counter | "[SEPTEMBER ONLY]" + counter $20,000,000 down | dot-matrix converge | glitch f656-664 |
| S12 | 664-731 | 68 | counter | "UNUSED CASHBACK / EXPIRES SEPTEMBER 30th" + counter to 0 | glitch | fade to white f718-731 |
| S13 | 732-781 | 50 | end-card | "STARTS NOW AT OPEN.HIGGSFIELD.AI" | opacity fade f733-738 | hold to end |

Hard cuts (hdiff spikes): f80 (0.72), f95 (0.37), f115 (0.57), f174 (1.07, to white). Everything else is a designed transition.

---

## S1 — f0-55: "100% {CASHBACK} ON HIGGSFIELD API" (title-card)

**Background** #FAF7FB with soft radial glows (all gaussian, radius ~25-35 % W):
- yellow/lime glow left-middle: centroid (210,466)@1276 at f0 -> (97,451) by f50 (moves outward = bg also scales up), peak colour ~#F4FA4B, fades to bg.
- pink glow right: centroid (1078,315) -> off-right; peak #F982AC.
- small pink bottom-left (245,618) #FA8293, small yellow top-right (1039,163) #FAE96E.
- the right pink glow carries a **white dot halftone**: dot pitch **10.8 px@1276 = 16 px@1080**, dot ~3 px, square grid, only visible inside the pink area.
- f0-2: bg zooms (blob centroids move ~60 px outward in 2 frames) -> fast push already in progress at the first frame.

**Text block** (centred on x=628-630 throughout; whole block scales as one group):
- Line 1 "100%": black #000000, heavy, cap/digit height **152 px@1276 = 21.2 % H = 228 px@1080** (at f50). "1" has a long flag, no foot.
- Line 2 "CASHBACK": cap **115 px = 16.0 % H = 173 px@1080**, x 269-1007 (w 739 = 57.9 % W). Tracking tight.
- Curly braces "{" "}" flanking line 2: **3D lime glass/extruded braces** (#CAE85E face, #99BE27 shade, highlights #D9F47B), 160 px tall (22.3 % H), outer x 175 and 1110; gap to word ~25 px.
- Pill "ON HIGGSFIELD API": flat pink **#E71664** rect x304-973, y492-582 (**670x90 = 52.5 % W x 12.5 % H = 1008x135 px@1080**), corner radius ~6-7 px@1276 (**~10 px@1080**), no shadow. Text white #FFFFFF, cap **52 px = 7.2 % H = 78 px@1080**, centred.
- Vertical rhythm @1276 (f50): 100% top 138, bottom 289; CASHBACK 335-449; pill 492-582.

**Animations**
1. *Group scale-in (camera push on text)*: template-tracked scale of "100%" = 0.66 (f3) -> 0.80 (f12) -> 0.90 (f22) -> 0.95 (f30) -> 0.99 (f39) -> 1.00 (f44-51). Fit: **quad-out**, rms 0.016; best bezier **(0.40, 1.00, 1.00, 1.00)**. Progress at 25/50/75 % of f3-46: **46 % / 75 % / 92 %**. No overshoot. Extrapolated start ~0.60 at f0. Text-group centre y drifts 264 -> 213.5 (block grows downward as lines are added; keep the block's top-middle anchor ~ (628, 138+...)).
2. *Blur-in*: 10-90 % edge width 11 px (f3) -> 10 (f5) -> 9 (f6) -> 7 (f8) -> 6 (f10) -> 5 (f12) -> 3 (f15, = native sharpness). => gaussian sigma ~4.1 px@1276 = **~6 px@1080 (CSS blur ~6px) -> 0 over f3-15 (12 f)**, roughly linear/slightly ease-out. f0-2: only a faint lime "C/" smudge at centre (sharpness metric 1.4 = fully blurred).
3. *Scramble typing of "CASHBACK"* (lime -> black): f3-5 "{A}", f6 "{AS}", f7 "{CAS}", f8 "CASH[", f9 "CASH{", f10-11 "CASHB}", f12-13 "CASHBA/", f14-15 "CASHBAC/", f16 "CASHBACK". **8 letters in 13 f (~18 chars/s)**; the trailing 1-2 glyphs are random punctuation (`{ } [ / \`) re-rolled each 1-2 frames. Braces start hugging the partial word and **slide outward** to their final positions as the word grows (f8-16), with slight blur.
4. *Colour ramp of CASHBACK*: lime #CFF00D (f6-7) -> #889F19 (f8) -> #738A05 (f12) -> #4A5A03 (f15) -> #1F2602 (f18) -> #000000 (f20). **Lime -> black over f6-20 (14 f), ~linear in luma** (153 -> 0).
5. *Pill pop*: f16 a pink blurred blob 63 px wide at centre; widths 63 (f17) -> 233 (f18) -> 483 (f19) -> 571 (f20) -> 598 (f21) -> 610 (f24) then grows only with the group scale (669 at f50). **Horizontal scale-from-centre 0.1 -> 0.9 in 3 f (f17-20), expo-out**, height full from the start (84-90 px), edges blurred during f16-19.
6. *Pill text*: typed L->R f18-25 ("IGGSFIEL" visible f18, "ON HIGGSFIELD AP" f19), trailing ~5 chars lighter pink-white and blurred, fully white by ~f25-26.
7. *Coins*: pre-rendered 3D lime coins (4-point sparkle emboss) with depth of field. First coin enters top-right f8, ~8 coins by f20, ~14 by f40; they tumble slowly and drift (a few px/frame), foreground coins strongly defocused (bottom corners). Treat as a video/PNG-sequence layer above bg and partly in front of the text edges.
8. *Hold*: f26-51 composition essentially static except coin drift (diff < 1.5).

**Transition out: 3D dolly-through into the API chip (f52-64, 12 f).** A lime 3D "HIGGSFIELD {API}" chip is already parked behind the letter "B" (visible through gaps from f54). Camera accelerates toward it: template scale of "100%" 1.00 (f51) -> 1.01 (f53) -> 1.03 (f55) -> 1.07 (f57) -> 1.13 (f59); "100%" exits top, "CASHBACK" exits up-left, pill exits down-left, everything slides left (camera pans right). **Vertical motion blur** grows: vertical edge width 3 (f56) -> 5 (f58) -> 13 (f60) -> 20 (f61) -> 22 (f62) -> 33 px (f63) => ~50 px@1080 smear at peak, horizontal stays ~3-10. f63 smeared pink pill across chip, f64 only a pill fragment top-left, f65 clean chip. Easing: ease-in (accelerating), ~expo-in.

---

## S2 — f56/64-79: 3D API chip (3d-render)

- Lime 3D chip (rounded square, label "HIGGSFIELD" small + "{API}" mono, small dot below), centre locked at **(641,355)@1276 = 50.2 % W, 49.4 % H**, scale ~1.0 constant (template score 0.99 at f72).
- Lime circuit traces (rods with right-angle bends) **draw on** outward from the chip f65-79 (left trace first f65-67, top-left by f69, right/bottom f71-79). Slow 3D orbit/rotation of chip (perspective changes, faces darken).
- Bg: white with strong pink gradient on the right half (#F76F9D near top-right, #F6A0BD lower right), coins defocused at left edge.
- Out: **hard cut f80**.

## S3 — f80-94: coin stack + "+$25,000" (3d-render)

- Close-up of a lime coin hovering over lime rods; more coins land on a stack (2nd at f86, 3rd at f88) — 3D render.
- **Tag pop** (signature): black tag **#1C1F19** (rounded rect, radius ~9 px@1276 = **14 px@1080**), lime text **#D9F906** "+$25,000".
  - f83: thin dark bar 88x16 px at centre (x624-711, y468-483); f84-85: bar grows, text heavily horizontally motion-blurred; **f86: full 335x84**; f89+: **344x90 px@1276 (27 % W x 12.5 % H = 518x135 px@1080)**, text bbox 302x69 (digit cap ~56 px = 7.8 % H = 84 px@1080), centred in tag.
  - So: scaleY 0.18 -> 1 and scaleX 0.25 -> 1 in **3 f (f83-86)**, expo-out, with horizontal blur ~15 px@1080 -> 0.
  - Tag then rides the camera: y 534 -> 524 over f89-94 (~2 px/f upward drift).
- Out: hard cut f95.

## S4 — f95-114: falling coins + "+$30,000" (3d-render)

- Diagonal composition: lime rods, defocused API chip top-left, coins dropping onto a stack (stack grows 1 -> ~5 coins f103-112, ~1 coin per 2 f).
- Same tag pop: f99 thin bar 98x18 (y428-445) -> f101 blurred text -> **f102 273x85 -> f103 310 -> f104 340 -> f105 346x90** (expo-out from centre, 4-6 f). Tag text "+$30,000". Tag tracks the stack (drifts up ~4 px/f f105-114).
- Out: hard cut f115.

## S5 — f115-173: "WE'RE ALLOCATING / $20,000,000 / CASHBACK POOL" (counter/title)

Layout (f150, @1276): line 1 "WE'RE ALLOCATING" black, x351-922, y212-261 (cap ~48 px = **6.7 % H = 72 px@1080**, curly apostrophe ’); line 2 "$20,000,000" black, x217-1056 (w 839 = 65.8 % W), digits y304-409 (**106 px = 14.8 % H = 159 px@1080**); pill "CASHBACK POOL" pink **#E1135D**, x368-955 y460-543 (**588x84 = 46 % W x 11.7 % H = 885x126 px@1080**), radius ~6 px@1276, white text cap 48 px (6.7 % H). All centred on x~637.
Coins: big 3D lime coins in front of (overlapping the "$" and pill left end) and behind the text, plus a stack bottom-left; pink haze at right edge (#FCC3DA).

Animations
1. **Per-character fade-in, left->right, both lines in parallel** (not a numeric count): each glyph goes light grey -> black. Line 2 glyph darkness reaches <30 luma at: "$" f119, "2" f121, "0" f123, "," f125, "0" f127, "0" f129, "," ~f131, "0" f131, "0" f133, "0" f135, "0" f136 => **stagger ~1.7 f/char, each glyph fade ~8-10 f (opacity 0->1, linear-ish)**. Line 1 stagger ~1.3 f/char, last glyph done ~f139.
2. **Pill wipe from centre**: f117 x589-704 (w115) -> f119 x332-961 (w629) -> f121 full; text typed inside: f117-118 "CASHB", f121 "CASHBAC", f123 "CASHBACK P", f125 "CASHBACK POO", f127 "CASHBACK POOL" (~1.2 chars/f).
3. **Settle (camera pull-back)**: group height (line-1 top -> pill bottom) 387 px (f117) -> 358 (f125) -> 344 (f133) -> 337 (f141) -> 333 (f149) -> 330 (f155-159) => **scale 1.17 -> 1.00 over f115-157 (42 f), cubic-out** (rms 0.032; bezier (0.20,0.80,0.70,1.00)); progress 59/82/95 % at 25/50/75 %.
4. **Exit zoom-in (accelerating)**: "WE'RE ALLOCATING" width 568 (f159) -> 581 (f163) -> 619 (f167) -> 705 (f171) -> 828 (f173) => scale 1.00 -> 1.46 over f158-173, **quart-in** (bezier (0.40,0,0.90,0.20)); progress 3/13/36 % at 25/50/75 %. Thin pink/grey HUD connector lines flash in f171-173.
5. **Cut to white**: f174-175 pure #FAF7FB (2 frames), no content.

---

## S6 — f174-228: "FIRST COME, / FIRST SERVED" (title-card on technical grid)

**Layout (hold f202-224, @1276)**: line 1 "FIRST COME," x246-1002, y236-356 (incl. comma); line 2 "FIRST SERVED" x208-1040 (w 833 = 65 % W), y374-476 => **cap 103 px = 14.3 % H = 155 px@1080**; line pitch 138 px (1.34 x cap); both centred on x 625. Black #000.
**Technical grid background**: #FAF7FB; a **frame rectangle of 1 px lines #E9E7EB** spanning x106-1168, y141-574 (8.3-91.5 % W, 19.6-79.9 % H) with lines extended to frame edges; **black "+" crosshair marks (~22 px arms, 1.5 px stroke)** at the 4 corners; outside cells contain: top-right binary digits ("1 0 1 1 0 0 1...", #D4D2CF, ~12 px), bottom-left JS code (`guidance: 7.5,`, `if (!job.ready) return null;`, `const buf = new Uint8Array(1 << 20);`, `// resolve latent`, `stream.pipe(decoder);`, `export type Latent = Float32Array`, `render(frame[i]);`, `git commit -m "open source"` ... #D3D8D4, ~12 px mono), top-left pale blue gradient cell (#E9F4F9), bottom-right peach/pink grid cell (#F6EEE1 with fine grid), a grey pixel-block "loading" glyph at bottom centre (y ~670).

**Animations**
1. f176-177: first scramble glyphs "\h" tiny at centre; f178-179: diagonal 1 px HUD lines cross the frame; frame-rectangle lines at the frame edges (y 12/705) then collapse inward.
2. **Scramble typing, both lines simultaneously, growing in size**: f180 "FIRSj Ye / Fdmno n" -> f182 "FIRST Cec / FIRST n`m" -> f184 "FIRST COc[ / FIRST SEmq" -> f186 "FIRST COM[ / FIRST SERq`" -> f188 "FIRST COMEB / FIRST SERV`" -> f190 "FIRST COME, / FIRST SERVE_" -> f192 "... SERVED" (D lime) -> f194 final. **~11-12 chars per line in ~14 f = 0.85 char/f = ~25 chars/s per line**. Trailing 1-2 glyphs random lowercase/punctuation (`c [ m q ` B _ e n`) coloured alternately **lime #D2F719 / pink #F91489**; a **pink underscore cursor "_"** trails line 2. Resolved glyphs black.
   Simultaneously cap height grows 65 -> 77 (f180-184) -> 85 (f188) -> 86-89 (f196-198), and the frame rectangle shrinks from full-frame to x292-986, y245-478 (f185-188).
3. **Punch-in at f199** (on audio onset f200): text cap 89 -> 101 (f200) -> 102 (f202) -> 103 (f204) (x1.16-1.20), frame rectangle 694x233 -> 1062x433 (f199-202). **4 f, expo-out** step zoom.
4. **Hold f202-224** (23 f, template scale exactly 1.000).
5. **Un-type + zoom (f224-228)**: last chars de-resolve into scramble ("FIRST COMEB / FIRST SERV`_" f225-226; "FIRST COMEB / FIRST SEmq" f227-228) while text scales up 1.25x and lines drift apart.

**Transition out — glitch zoom to black (f229-232, 4 f + black f233):** text punches ~1.3x per frame (huge crop "IRST COM[", "ST CO"), lime dot-matrix/ASCII dither overlay (#E8F297 glyph cells on ~10 px@1276 pitch), HUD connector lines & "x: N y: N" labels, **bg darkens in steps: #EDEEEB (f229) -> #CFCFD0 (f230) -> #989896 (f231) -> #545256 (f232) -> #000000 (f233)** (luma 237->207->152->84->0, ease-in). Audio onset f227, kick f229.

---

## S7 — f233-378: Balance card (dark UI + counter)

**Background**: #000000 with a very faint square grid (lines ~#0D0B0C, +10-13 luma), cell pitch ~51-61 px@1276 during intro, ~48.5 px@1276 (73 px@1080) after the push (grid counter-scales against the card — dolly feel).

**Card** (final f282-349): rounded rect x66-1209 (**1143 px = 89.6 % W = 1720 px@1080**), top at y394 (54.9 % H), extends below frame; **corner radius ~26 px@1276 = ~40 px@1080**. Fill: vertical gradient **#FAF7FB (top 0-15 %) -> #FAF9C9 (y500) -> #FAF778 (y560) -> #ECFA2A (y620) -> #C9F214 (y700)**. Outer glow: lime-yellow bloom above and around the card (#626F27 at 64 px above top edge, #78853D at 14 px above) — large soft glow (~150 px@1276 radius), brightest at top centre.
Card text (@1276, f281): left block "Your" (x125, cap 33 px = **4.6 % H = 50 px@1080**), "Higgsfield {API}" (x127-460, "{API}" in mono), "Balance" **right-aligned** to x460; line pitch ~46 px; colour #050400 (near-black). Right: big number right-aligned at x1148, digit cap ~100 px (**13.9 % H = 150 px@1080**), with a horizontal tint gradient inside the glyphs (left #181803 -> right #504D4D in the neutral state). Under it a 2.5 px@1276 (4 px@1080) underline, right-aligned to x1148, width 494 px (full number) in the idle state.

**Animations**
1. **Card intro (f233-262, 30 f)**: card rises from bottom-centre while scaling up (HUD wireframe box + pink "x: 980 y: 810" labels around it f234-238, halftone flicker inside f236-238). Width 78 (f233) -> 260 (f235) -> 405 (f238) -> 494 (f241) -> 589 (f246) -> 636 (f250) -> 670 (f255) -> 691 (f261); top y 709 -> 168. Fit **quart-out** (rms 0.044), bezier **(0.10, 0.60, 0.40, 1.00)**; progress **65 / 87 / 96 %** at 25/50/75 %. Text inside: "$10,0" typed/scrambled pink f239-245 -> "$10,000" black by f249; labels "Your / Higgsfield (API / Bala" typed f241-251 (pink partial labels).
2. **Card push-in (f262-282, 20 f)**: width 694 -> 704 (f264) -> 733 (f267) -> 811 (f270) -> 985 (f272) -> 1079 (f274) -> 1123 (f277) -> 1143 (f282); top y 168 -> 394 (camera moves to the card's lower part). Fit **ease-in-out, bezier (0.70, 0.00, 0.20, 1.00)** (rms 0.015); progress **9 / 65 / 96 %**. Motion blur on f270-273 (fast middle). Scale x1.65.
3. **Spend label in (f282-296, 15 f)**: pink block right-aligned at x1148: "Spend" (cap 46 px = **6.4 % H = 69 px@1080**, #F613A0) over "-$7,371" (digits ~95 px = 13.2 % H; colour #F616A1 left -> #FBA7F9 right gradient). Top edge y 288 (f282) -> 240 (f284) -> 215 (f286) -> 202 (f288) -> 192 (f291) -> 185 (f296): **rise ~115 px@1276 (~173 px@1080), cubic-out** (bezier (0.10,-0.20,0.00,1.00)); progress 61/87/96 %. Starts heavily blurred (f282-284) -> sharp by f286.
4. **Countdown (f283-293)**: $10,000 -> $9,263 (f284) -> 8,526 -> 7,789 -> 7,052 -> 6,315 -> 5,577 -> 4,840 -> 4,103 -> 3,366 -> **$2,629 (f293)**: **linear, -737.1 per frame, 10 frames**. Underline shrinks (right-anchored) 494 -> 247 (f286) -> 151 (f288) -> 112 (f290) -> 97 px (f292) and stays 97-98 px.
5. **Pink tint pulse on the balance number**: neutral -> #782541 (f287) -> #AC2864 (f289) -> #DD2F86 (f291) -> **#F62F98 / right end #FA5FE6 (f293, peak)** -> #DF2D88 (f295) -> #AF2869 (f297) -> #83234C (f299) -> #501F28 (f301) -> neutral #1A1A04 (f303). **Triangle: 10 f up (linear) + 10 f down.** Underline tinted with the number.
6. **Gloss sweep on "-$7,371"**: lavender-white highlight (#F7A7F5) travels left->right across the number f292-298 (~6 f); at f293 left part light, f295 middle, f297 right end.
7. **Spend exit (f298-312, 14 f)**: slides right off-frame; left x 768 -> 776 (f300) -> 800 (f303) -> 850 (f306) -> 936 (f309) -> 1164 (f312). **cubic-in** (bezier (0.60,0,1,0.60)); progress 5/16/38 %. Horizontal motion blur f308-312.
8. **Cashback label in (f316-330, 14 f)**: lime block "Cashback" (cap 47) / "+$7,371" (#D2F61F, highlight #E8F945 near x980) slides in from the left: left x 309 (f317) -> 452 (f319) -> 584 (f321) -> 654 (f323) -> 708 (f325) -> 738 (f327) -> 754 (f330). **quad-out** (bezier (0.20,0.20,0.30,1.00)); progress 48/80/96 %. ~445 px@1276 travel (670 px@1080), strong horizontal blur on f317-319.
9. **Cashback drops into the card (f335-345, 10 f)**: top y 196 -> 206 (f338) -> 226 (f341) -> 261 (f343) -> gone (f345); blur + fade; **quad-in**.
10. **Count-up (f342-352)**: $2,629 -> $3,366 (f343) -> ... -> **$10,000 (f352)**, linear +737.1/f, 10 f. Lime tint pulse on the number: neutral #121600 (f342) -> #535F08 (f345) -> #93AD0F (f348) -> **#E1F912 / right #F7FA50 (f352, peak)** -> #A7C60D (f355) -> #677C0A (f358) -> #2D3103 (f361) -> neutral (f362). Triangle 10 up / 10 down, linear.
11. **Card exit up (f350-377, ~27 f)**: top y 394 -> 385 (f354) -> 364 (f358) -> 327 (f362) -> 271 (f366) -> 190 (f370) -> 70 (f374) -> 0 (f376), off by f377. **quad-in** (bezier (0.30,0,0.70,0.20), rms 0.004); vertical motion blur f373-377. f377-378 black (with faint glow residue).

---

## S8 — f379-419: "Higgsfield {API}" lockup + "MOST AFFORDABLE / ON THE MARKET"

1. **Typing on black while the bg brightens**: f379 pink "H"; f380 "Hig {}" pink; f381 "$ Higgs {}" (logo squiggle appears as pink "$"-like glyph); f382 "Higgsf {}"; f383 "Higgsfi {_}"; f384 "Higgsfie {_}"; f385-386 "Higgsfiel {A_}" **lime**; f387 "Higgsfiel {AP_}" black; f388-390 "Higgsfield {API_}"; **f391 final "Higgsfield {API}"**. ~1 char/f (30 cps), braces placed first and filled; colour cycles **pink -> lime -> black** per glyph as it resolves; underscore cursor inside the braces.
   **Bg ramp** #000 -> #1E1B1F (f381) -> #5E5B5F (f383) -> #9E9B9F (f385) -> #DBD9DD (f387) -> #FAF7FB (f388): **linear, +31.5 luma/f over f380-388 (8 f)**. Faint code text at bottom-left visible during the ramp.
2. Lockup final (f392): squiggle logo mark (x294-365, 72x56) + "Higgsfield" (grotesk, mixed case; H cap 56 px = **7.8 % H = 84 px@1080**) + "{API}" (mono, braces 78 px tall). Width 657 px (51.5 % W), centred y 382.
3. **Shrink-up with glitch (f392-401, 9 f)**: template scale 1.00 -> 0.99 (f393) -> 0.96 (f394) -> 0.89 (f395) -> 0.80 (f396) -> 0.74 (f397) -> 0.71 (f398) -> 0.69 (f399) -> 0.67 (f401); centre y 382 -> 275. Bezier (0.60,0.20,0.10,0.80) (in-out with fast middle). During f395-399: RGB split (lime/pink fringes ±4-6 px), dot-matrix fill in glyphs, HUD boxes + pink coordinate labels and connector lines.
4. **"MOST AFFORDABLE / ON THE MARKET" scramble-in (f397-413)**: f397-398 "Mel] W\" / "j"; f399-400 "MOST A\\ehZ / Oi o"; f401-402 "MOST AFFOhZW / ON TH` h\"; f403-404 "MOST AFFORDAXb / ON THE M\mf"; f405-406 "MOST AFFORDABb / ON THE MARf`"; f407-408 "MOST AFFORDABL[ / ON THE MARK`"; f409 "... MARKEo"; f410-413 "... MARKET" (T lime) ; **f414 clean**. ~14 chars per line in ~14 f (**~1 char/f/line**), two-frame holds (glyphs update on 2s). Random trailing glyphs lime/pink.
   Final (f415): lockup y247-301; line 1 x248-1027 y334-401 (**cap 68 px = 9.5 % H = 102 px@1080**); line 2 x312-963 y426-492; pitch 92 px. Hold f414-419 (6 f).

## S9 — f420-511: corner headline + rotating model-name wheel

**Transition in (f420-433, "split")**: f420-421 HUD lines; f422 lockup glitches pink then disappears; f423-425 "MOST AFFORDABLE" drifts up-left and "ON THE MARKET" down-right (lines separate, RGB-split/dot-matrix fill); f426 words split ("MOST" / "ON THE"); f427-431 text re-set small in the corners with scramble ("MOST / WA\" -> "MOST / AFFORDWX" -> "AFFORDABL[" -> "AFFORDABLE" by f433; "ON THE / MAR" -> "_ON THE / MARKET" by f431). Wheel items fly in with heavy motion blur (pink/lime ghost copies) f427-430.

**Layout (f450)**:
- Top-left "MOST /" + "AFFORDABLE": x66-487, y34-148; **cap 54 px = 7.5 % H = 81 px@1080**; left edge 5.2 % W, top 4.7 % H. Left-aligned.
- Bottom-right "_ON THE" + "MARKET": x953-1223, y563-681; same cap; right-aligned at 95.8 % W, bottom 94.8 % H.
- Pointer: solid black right-pointing triangle, 30x36 px@1276 (45x54@1080), at x291-320 (centre 24 % W), y341-376 (centre 49.9 % H).
- **Wheel**: item baselines lie on an arc. Least-squares circle through item centres -> **pivot (-4, 382)@1276 = (-6, 575)@1080, radius 384 px@1276 = 578 px@1080**; items spaced **~17.2 deg**; the active item sits at ~-2.5 deg (just above horizontal, next to the pointer). Each label is rotated to its angle (radial), larger and sharper when active: active "SEEDANCE 2.5" cap ~62 px (8.6 % H = 93 px@1080), x384-956; neighbours ~35-40 px cap; items beyond ±35 deg fade to light grey and shrink (perspective of a drum).
- Items seen (top -> bottom order on the drum): WAN 3.0, SOUL CINEMA, SEEDANCE 2.0 4K, SEEDANCE 2.5, MARKETING STUDIO IMAGE, MINIMAX H3, KLING OMNI 3, SOUL 2.0, SOUL CINEMA, KLING 3.0, HIGGSFIELD GENJUTSU, CINEMA STUDIO 4, WAN 2.7 (sequence crosses a whip-skip at f472-475).
- Bg #FAF7FB with very light code snippet block lower-left (`npm i @higgsfield/sdk`, `await Promise.all(queue...`, `{ status: "completed" }`, `const job = await hf.i...`, `POST /v1/generations`, `seed = Math.floor(rand...`, `export type Latent = F...`), a faint vertical divider at x~355 and horizontal at y~487 (#E9E7EB).

**Wheel rotation (measured, polar cross-correlation; negative = items move up)** deg/frame:
f429 -24.8, f430 -20.0, f431 -4.5, f432 -4.0, f433 -3.5, f435 -3.0, f437 -2.5, f439 -2.0, f441 -1.75, f443 -1.25, f445 -1.0, f448 -0.75, f450-458 -0.5 (dwell; "SEEDANCE 2.5" active), f459-462 -0.75, f463-464 -1.0, f465 -1.25, f466-467 -1.5, f468 -2.0, f469 -2.25, f470 -2.75, f471 -3.5, f472 -5.5, **f473-475 whip (heavy blur frame f473, skip of ~3 items)**, f476 -3.75, f477 -2.75, f478 -2.25, f479 -1.75, f481 -1.5, f483 -1.0, f486 -0.75, f490-498 -0.5 (dwell; "KLING 3.0" active), f499 -0.75, f502 -1.0, f504 -1.25, f506 -1.5, f508 -1.75, f509-510 -2.0, f511 -2.25 (accelerating into exit).
Pattern = **ease-out spin-in (f429-450, ~-85 deg total), constant crawl -0.5 deg/f, ease-in acceleration, whip skip, ease-out settle, crawl, ease-in** (a slot-machine/drum feel). Active label at f431 "SOUL CINEMA", f440 "SEEDANCE 2.0 4K", f450 "SEEDANCE 2.5", f467-470 "MARKETING STUDIO IMAGE", f478 "SOUL CINEMA", f490-500 "KLING 3.0", f506-510 "HIGGSFIELD GENJUTSU". Motion blur along the arc whenever |v| > 2 deg/f.

**Blinking glyphs**
- "_" cursor before "ON THE": **7 f on / 7 f off (period 14 f = 2.14 Hz)**: on f431-437, off 438-444, on 445-451, off 452-458, on 459-465, off 466-472, on 473-479, off 480-486, on 487-493, off 494-500, on 501-507.
- Slash counter after "MOST": none (f433-438) -> "/" (f439) -> "//" (f456) -> "/" (f475) -> none (f494): steps every ~17-19 f.

**Transition out (f508-518, glitch -> footage)**: f508-511 HUD boxes + "x: 1536 y: 648" labels around every wheel item, items pixelate; f512-514 headline corners become blocky mosaic (8-16 px blocks), "ON THE MARKET" turns lime; f515-516 pink rectangular blocks bottom-right (#F09DC9-ish), everything smears horizontally (directional blur ~60-100 px@1276); f516-518 cross-dissolve into the thermal footage (hdiff 0.6-0.8 for 4 f). Audio kick f514.

---

## S10 — f516-617: thermal AI footage + "CLAIM UP TO $100.000 PER ORGANIZATION"

**Footage**: AI video of a person at a desk with monitor, rendered in a **false-colour "depth/thermal" palette**: near = hot magenta-pink (#E73562 / #E1674F), mid = orange (#DD8841), far = lime-yellow (#D0E81B / #F2F9C4), farthest = cream/white (#F9F9E8). Camera practically static f520-588 (phase correlation < 0.3 px/f), then slow move f589-600 (dy +1-2 px/f), shot changes to a wider office (left monitor edge, people in background) ~f600-603.
Lime/pink dot-matrix noise (character cells) flicker in the pink areas f517-525 and HUD connector lines f517-524.
**Pink asterisks "*"** (~12 px@1276 = 18 px@1080, #F0-pink) blink at 4 corner anchors: (66,52), (1208,52), (66,662), (1208,662)@1276 = (5.2 %, 7.2 %) / (94.7 %, 92.2 %) — 1-3 visible at a time, toggling every 2-4 f.

**Text** (black #000000 when settled, centred on x~638):
- "CLAIM UP TO": x304-886, y208-271, cap **64 px = 8.9 % H = 96 px@1080** (starts 38 px further right than the line below — keep x 304).
- "$100.000" (period as thousands separator): x266-1010 (58.3 % W), digits y289-418 => **130 px = 18.1 % H = 196 px@1080**.
- "PER ORGANIZATION": x276-1002, y418-479, cap **62 px = 8.6 % H = 93 px@1080**.
- Lines nearly touch (leading ~0.95-1.0).
**Typing (sequential lines)**: "CLAIM UP TO" f520-523 (~3 chars/f), "$100.000" f524-528 (~2 chars/f: "$100" f525, "$100." f526, "$100.00" f527), "PER ORGANIZATION" f528-538 (~1.6 chars/f: "P" 528, "PE" 529, "PER" 530, "PER OR" 531, "PER ORG" 532, "PER ORGANIZ" 534, "PER ORGANIZATI" 536, full 538).
**Colour**: text types in **pink** (#E23E62 f522, #E63565 f526) and darkens to black: #CA187F (f528) -> #9D1164 (f530) -> #710B48 (f532) -> #44062A (f534) -> #17000C (f536) -> #000 (f538). **Pink -> black, ~linear over f526-538 (12 f).**
Hold f538-579 (42 f).
**Scramble-out (f580-595)**: f580-581 "PER ORGANIZAT***"; f582 "PER ORGANI_***"; f583 "PER ORO-_***"; f584 "PER Ox2-_***"; f585-586 "PER o-_***"; f587 "PER_"; f588 "P*x"; f589 "$100._x"; f590-591 "$10x)-"; f592 "x1-"; f593 "x"; f594 "CLAIM x"; f595 gone. Lines delete from the end with "*", "_", "x", "-" garbage. Colour reverses black -> pink (#9B1161 f584, #D7447B f588) -> salmon (#DA7767 f590) -> orange-yellow (#D8AD44 f592) -> dissolves into bg.
**Out (f600-617)**: footage colour grade shifts from thermal to a dim olive/grey (#90927C, #97A266, #AFD212) over f600-613 (luma 231 -> 97), then f614-616 pixel-dissolve into lime/pink dot-matrix clusters (big hdiff 0.45-1.2), f617 black.

---

## S11 — f617-663: "[SEPTEMBER ONLY]" + counter (counter)

**Bg**: near-black with an inverted vignette — darkest #080509 behind the text centre, #1B191A at mid-right, warm/red tint on the left edge (#2E1018); faint calendar grid (day labels "Mon Tue Wed Thu Fri Sat Sun" across the very top ~y6, row lines every ~83 px@1276, left axis tick labels in dim red).
**Entry (f617-631)**: f617-620 lime/pink dot-matrix particle cloud converges to centre (bright white streak line at y~470); f621 glitch text "c[[]fc" with HUD boxes; f622-623 "[S[fj[cX[h e"; f624-625 "[SEPTEMBEh edb"; f626-627 "[SEPTEMBER ONb"; f628-631 "[SEPTEMBER ONLY]" with ghost HUD boxes; clean from f632.
**Layout**: "[SEPTEMBER ONLY]" white #F9F6FA, square brackets lime #D0F913, x308-1011 (w 703 = 55 % W, centre 660), y326-391 => **cap 66 px = 9.2 % H = 99 px@1080**. Counter below centred x509-759, y446-479, digit cap ~28 px (**~3.9 % H = 42 px@1080**), white with **horizontal directional blur** (edge width 8 px horizontal vs 3 px vertical => ~8 px@1080 h-blur), appears grey #A2A0A4.
**Counter A**: **$20,000,000 at f621, decreasing linearly 90,601.5/frame** (f623 $19,818,797; f625 $19,637,594; f640 $18,278,571; f656 $16,828,947). Displayed with commas.
**Camera**: slow zoom-out, template scale 1.006 (f628) -> 1.000 (f640) -> 0.992 (f652-655) => **-0.05 %/frame (~-1.6 %/s), linear**.
**Pre-glitch colour flicker**: f654-655 closing "]" turns pink; f656 "LY" lime+pink.
**Transition (f657-664, 8 f glitch)**: RGB split, HUD boxes on every word, scramble "SEPTEMBER ONL" -> "SEPTEMBER O" -> "kyw{z yw~xwy" (lime/pink, enlarged 1.5x, cropped), pink horizontal smear bands, counter enlarged ~3x and smeared, words flash "UNCLAIMED CASHBACK" (f663-664) before settling on "UNUSED CASHBACK" (f665).

## S12 — f664-731: "UNUSED CASHBACK / EXPIRES SEPTEMBER 30th" + counter to 0

**Layout** (f700): "UNUSED CASHBACK" x263-1012 y271-333; "EXPIRES SEPTEMBER 30th" x137-1133 (w 996 = 78 % W) y368-430; **cap 63-64 px = 8.9 % H = 96 px@1080**, white #F9F6FA, centred x 637, line pitch 97-98 px. Counter x525-751, y467-499 (same style as S11).
**Typing**: f665 "EXPIRES S{f{x{" -> f666-667 "EXPIRES SEPTEMBE IF" (I lime, F pink) -> f668-669 "...SEPTEMBER 3F" -> f670-675 "...SEPTEMBER 30t" + random -> f676 final ("30th", lowercase th). Counter shrinks from ~3x to 1x f663-666.
**Counter B**: $9,173,155 (f664) -> $9,042,110 (f665) -> $8,911,065 (f666) ... $4,455,532 (f700) ... $655,225 (f729), **linear -131,045/frame, reaching $0 at f734** (70 f x 131,045 = 9,173,155 exactly). Horizontal blur as in S11.
**Camera**: slow zoom-out 1.022 (f667) -> 1.010 (f685) -> 1.000 (f700) -> 0.982 (f727) => **-0.067 %/frame (~-2 %/s), linear**.
**Fade to white (f718-731, 14 f)**: mean luma 32.8 (f718) -> 39 (f720) -> 51 (f722) -> 72 (f724) -> 111 (f726) -> 176 (f728) -> 235 (f730) -> 246 (f731). **quad-in** (bezier (0.80,0,0.80,1.00)); progress 5/19/58 % at 25/50/75 %. Text stays white so it vanishes into the white. Music fades out over the same frames.

## S13 — f732-781: end card

- Bg #FAF7FB. Single line **"STARTS NOW AT OPEN.HIGGSFIELD.AI"**, black #000000, **regular weight** neo-grotesk (Inter/Neue Montreal-like), uppercase, normal tracking, centred: x321-955 (w 635 = 49.8 % W), y346-371 => **cap 26 px = 3.6 % H = 39 px@1080**, vertical centre 358.5 (49.9 % H).
- **Fade-in f733-738 (6 f), pure opacity, linear**: darkest pixel 247 -> 196 -> 155 -> 110 -> 63 -> 16 -> 0 (opacity 0.21, 0.38, 0.56, 0.75, 0.94, 1.0). No blur (edge width constant 2 px), no movement.
- **Hold f738-781 (44 f, 1.47 s)**, completely static.

---

## Signature patterns (with parameters)

1. **Scramble-type ("decode") text** — used in S1, S6, S8, S9, S10, S11, S12. Resolved glyphs advance L->R at **0.85-1.2 chars/frame per line (25-36 cps)**, both lines of a 2-line title typed **in parallel**; glyph updates often on 2s. The 1-2 glyphs at the write head are random from a punctuation-heavy set (`[ ] { } / \ _ ` ^ ~ * x b c e f h j m n o q z B X Z`) coloured **alternately lime #D2F719 and pink #F91489**, re-rolled every 1-2 f; optional pink "_" cursor. Exit = same thing in reverse (delete from the end with `* _ x -` garbage, ~1-2 chars/f). Colour-in variant: glyphs arrive pink (or lime) and decay to the final colour over 12-14 f.
2. **Tag/pill pop from centre** — dark tag (#1C1F19, lime text) or pink pill: starts as a thin horizontal bar (scaleY ~0.18, scaleX ~0.25), reaches full size in **3-4 f, expo-out**, text arrives with ~15 px@1080 horizontal blur -> 0 in the same 3 f.
3. **Counter with tint pulse** — 10-frame **linear** count (balance $10,000 <-> $2,629, step 737.1/f), the number's fill tints toward pink (#F62F98) or lime (#E1F912) **linearly over the 10 counting frames and back over the next 10** (triangle), plus a right-anchored underline that shrinks with the value. Big money counters in S11/S12 are plain linear (-90,601.5 and -131,045 per frame) with horizontal motion blur on the digits.
4. **Glitch transition kit** (4-11 f): RGB split ±4-8 px@1276, ASCII/dot-matrix dither fill (lime #E8F297 cells on ~10 px@1276 = 15 px@1080 pitch), **HUD tracking overlays** (1 px olive/lime rectangles (#A9B750 on light bg, #596E29-#9B8C2A on dark) around word clusters + 8-9 px@1276 (13 px@1080) pink-red labels "x: 980 y: 810" (#D35786 on light bg, #9B2E31 on dark) + 1 px connector lines between box centres), mosaic blocks, horizontal smear bands (pink), and a quick bg luma ramp (white->black in 4 f ease-in: 237/207/152/84/0; black->white linear in 8 f).
5. **Accelerating zoom exits / decelerating zoom settles** — scene openers settle from ~1.17-1.5x to 1.0 with cubic/quad-out over 40-45 f; exits accelerate (quart-in/quad-in) over 15-27 f into a cut or flash.
6. **Slow linear camera drift on holds** — dark text scenes zoom out ~-0.05 to -0.07 %/frame; title scenes otherwise frozen (holds of 22-44 f).
7. **Motion-blurred slides** for labels: in = quad/cubic-out over 14-15 f with blur only in the first 2-3 frames; out = cubic/quad-in over 10-14 f with blur in the last 3-4 frames.
8. **Palette discipline**: off-white #FAF7FB / black, one lime, one pink. Lime = gain/positive, pink = spend/emphasis.
9. **Edit rhythm**: transitions on the 132.5 BPM eighth grid (6.79 f). Cut/hit frames vs audio onsets: f78/80 (cut f80), f95, f173/174, f200 (punch-in f199), f227-229 (glitch), **f282 (strongest onset = Spend + countdown start)**, f316 (Cashback in), f343 (count-up), f378 (card gone), f391 (lockup resolves), f418 (split), f473 (whip), f499, f514 (glitch to footage), f582 (scramble-out), f616 (dissolve), f664 (glitch), music out f722-730 with the white fade.

---

## Rebuild recipe (Remotion, 1920x1080 @ 30 fps, 782 frames)

General: `const f = useCurrentFrame()`; use `interpolate(f, [a,b], [x,y], {easing, extrapolateLeft:'clamp', extrapolateRight:'clamp'})`. Easing constants:
`OUT_QUAD = Easing.bezier(0.40,1,1,1)` (title settle), `OUT_QUART = Easing.bezier(0.10,0.60,0.40,1)` (card intro), `INOUT = Easing.bezier(0.70,0,0.20,1)` (card push), `IN_QUAD = Easing.bezier(0.30,0,0.70,0.20)` (card exit / fades), `IN_QUART = Easing.bezier(0.40,0,0.90,0.20)` (zoom-in exits), `OUT_CUBIC = Easing.out(Easing.cubic)` (label rises / settles), `IN_CUBIC = Easing.bezier(0.60,0,1,0.60)` (label exits). No springs with overshoot were measured anywhere (overshoot 0 %).

1. **Sequences** (from, duration): S1 0/64 (overlap into S2 for the dolly), S2 56/24, S3 80/15, S4 95/20, S5 115/59, white 174/2, S6 176/57 (incl. glitch out 229-232), S7 233/146, S8 379/41, S9 420/98, S10 516/102, S11 617/47, S12 664/68, S13 732/50.
2. **ScrambleText component**: props `{text, startF, cps=27, colorFinal, headColors=['#D2F719','#F91489'], headLen=2, updateEvery=2, cursor:'_'|null, reverseAt?}`. `n = floor((f-startF)*cps/30)`; render `text.slice(0,n)` + `headLen` random glyphs from `'[]{}/\\_`^~*xbcefhjmnoqzBXZ'` seeded by `floor(f/updateEvery)+i` (use `random()` from remotion for determinism), head glyph colours alternate. For colour-in, per-glyph colour `interpolateColors(f - glyphStart_i, [0,12], [pink, final])`.
3. **S1 title**: wrapper `scale = interpolate(f,[0,46],[0.60,1],{easing:OUT_QUAD})`, `filter: blur(${interpolate(f,[3,15],[6,0])}px)`; "100%" 228 px font cap (≈ font-size 310 px for a 0.735 cap-height font), "CASHBACK" 173 px cap; braces = 3D lime PNG/SVG with bevel, `translateX` from ±(wordHalfWidth) to final over f8-16; CASHBACK colour `interpolateColors(f,[6,20],['#CFF00D','#000'])`. Pill `scaleX = interpolate(f,[16,20],[0.1,0.92],{easing:Easing.out(Easing.exp)})` then follows group scale; pill bg #E71664, radius 10 px, 1008x135. Halftone on pink glow: CSS `radial-gradient(circle, #fff 1.5px, transparent 2px) 0 0/16px 16px` masked by the glow's radial gradient. Coins: pre-rendered transparent video (`<OffthreadVideo>`/PNG sequence) with DOF.
4. **Dolly-through (f52-64)**: animate the text layer `scale` 1 -> ~2.5 with `IN_QUART` around origin ≈ (50 %, 61 %) plus `translateX` -6 %, chip layer scale 0.4 -> 1 behind it; add vertical motion blur by stacking 6-8 copies offset in Y (or SVG `feGaussianBlur stdDeviation="0 25"`) peaking at f61-63 (~25 px@1080 sigma).
5. **Tag pop**: `scaleY = interpolate(f,[t,t+3],[0.18,1],{easing:Easing.out(Easing.exp)})`, `scaleX = interpolate(f,[t,t+3],[0.25,1],{...})`; text `filter: blur(${interpolate(f,[t,t+3],[8,0])}px)` horizontally (use SVG filter `stdDeviation="8 0"`). Tag 518x135, radius 14, #1C1F19, text #D9F906 ~84 px cap.
6. **S5 per-glyph fade**: glyph i of "$20,000,000" `opacity = interpolate(f, [119+1.7*i-8, 119+1.7*i], [0,1])`; line 1 stagger 1.3 f; pill `clipPath: inset(0 ${50-50*p}% 0 ${50-50*p}%)` with p over f117-121; group `scale = interpolate(f,[115,157],[1.2,1],{easing:OUT_CUBIC})` then `interpolate(f,[158,173],[1,1.46],{easing:IN_QUART})`.
7. **S6 grid scene**: frame rect via absolutely positioned 1 px lines #E9E7EB spanning the full frame at x=8.3 %/91.5 %, y=19.6 %/79.9 %; crosshairs as 2 crossed 33x2 px bars at intersections; punch-in at f199: `scale = interpolate(f,[199,203],[0.83,1],{easing:Easing.out(Easing.exp)})` for text, separate width/height interpolation for the rect (694x233 -> 1062x433 @1276 => 1044x351 -> 1598x652 @1080).
8. **Glitch transition** (reusable `<Glitch from dur>`): per frame random horizontal slices (3-6 bands, height 4-12 % H, offset ±2-8 % W), RGB split by rendering the layer 3x with `mix-blend-mode: screen` and colour matrices (R/G/B) offset ±6-12 px@1080, a dot-matrix overlay (`repeating` 15 px cell with 4 px lime glyph, opacity 0.6-1), HUD boxes (1 px #A9B750 strokes) with 13 px #D35786 mono labels `x: ${rand} y: ${rand}`, 1 px pink/grey connector lines, and a bg luma ramp. To black: luma [237,207,152,84,0] over 5 f. Duration 4-8 f.
9. **S7 card**: card div 1720 px wide, radius 40, `background: linear-gradient(180deg,#FAF7FB 0%,#FAF7FB 12%,#FAF9C9 30%,#FAF778 50%,#ECFA2A 72%,#C9F214 100%)`, glow = `box-shadow: 0 -40px 220px 60px rgba(210,247,25,0.55)` (or a blurred lime ellipse behind, blur ~120 px). Intro: `scale = interpolate(f,[232,262],[0.05,0.607],{easing:OUT_QUART})` with transform-origin bottom-centre and `translateY` so the top goes 98.7 % -> 23.4 % H; push: `scale = interpolate(f,[262,282],[0.605,1],{easing:INOUT})`, top -> 54.9 % H. Exit: `translateY = interpolate(f,[350,377],[0,-110],{easing:IN_QUAD})` in % of card height. Counter `value = interpolate(f,[283,293],[10000,2629])`, `Math.round`, `toLocaleString('en-US')`; count-up `interpolate(f,[342,352],[2629,10000])`. Tint: `t = interpolate(f,[283,293,303],[0,1,0])`; fill = `linear-gradient(90deg, mix(#181803,#AF2669,t), mix(#504D4D,#E558B4,t))` via `background-clip:text`. Spend block `translateY = interpolate(f,[281,296],[173,0],{easing:OUT_CUBIC})`, blur 12 -> 0 over f282-286; exit `translateX = interpolate(f,[298,312],[0,600],{easing:IN_CUBIC})`. Cashback `translateX = interpolate(f,[316,330],[-670,0],{easing:Easing.out(Easing.quad)})`, exit `translateY = interpolate(f,[335,345],[0,135],{easing:Easing.in(Easing.quad)})` + opacity 1 -> 0. Gloss: a 120 px wide white->lavender gradient band in `background-clip:text` moving left->right across "-$7,371" over f292-298.
10. **S8 lockup**: bg `interpolateColors(f,[380,388],['#000000','#FAF7FB'])`; per-glyph colour pink -> lime -> black (2-3 f each); shrink `scale = interpolate(f,[392,401],[1,0.67],{easing:Easing.bezier(0.6,0.2,0.1,0.8)})`, `translateY` -107 px@1276 (-161 px@1080).
11. **S9 wheel**: container at pivot (-6 px, 575 px)@1080; items `rotate(${(i*17.2) + angle(f)}deg) translateX(578px)`, font-size by |deg| (active 93 px cap -> 55 % at ±17 deg -> 40 % at ±35 deg), opacity 1 -> 0.25 beyond ±35 deg, plus `perspective(1200px) rotateY(-20deg)` for drum feel. `angle(f)` = cumulative sum of the measured deg/frame table (keyframes: f428 0, f431 -49, f440 -74, f450 -85, f458 -88.75, f465 -95, f470 -105, f472 -114, then add -51.6 (3 items) for the whip over f473-475, f478 -173, f490 -186, f498 -190, f505 -197, f511 -207). Arc motion blur: when |dAngle| > 2 deg/f, render 3 ghost copies at ±dAngle/3 with 30 % opacity. Cursor `_` opacity `Math.floor((f-431)/7)%2===0 ? 1 : 0`; slash string by frame ranges (439/456/475/494).
12. **S10**: `<OffthreadVideo>` of the thermal clip (or a normal clip passed through an SVG `feColorMatrix`/gradient-map: luminance-> [#E73562, #DD8841, #D0E81B, #F9F9E8]); text typed per §S10 schedule, colour `interpolateColors(f,[526,538],['#E63565','#000'])`; scramble-out with reverse colour ramp; grade shift f600-613 via CSS `filter: saturate(0.4) brightness(0.45) hue-rotate(20deg)` interpolated; asterisks: 4 absolutely positioned "*" (18 px, pink) with deterministic random visibility each 3 f.
13. **S11/S12**: bg radial gradient `radial-gradient(ellipse at 50% 50%, #080509 0%, #141013 35%, #1B191A 70%)` + left red tint `linear-gradient(90deg, rgba(120,20,40,0.25), transparent 15%)` + faint calendar grid (1 px lines rgba(255,255,255,0.03), red labels). Wrapper `scale = interpolate(f,[621,663],[1.01,0.99])` / `interpolate(f,[664,731],[1.024,0.979])`. Counter: `interpolate(f,[621,841.75],[20e6,0])` for A (slope 90,601.5) and `interpolate(f,[664,734],[9173155,0])` for B; digits with SVG horizontal blur stdDeviation "5 0" (@1080) and colour #F6F4F7 at ~70 % opacity. White fade: overlay `opacity = interpolate(f,[717,731],[0,1],{easing:Easing.bezier(0.8,0,0.8,1)})`.
14. **S13**: `opacity = interpolate(f,[732.5,738],[0,1])`, text 39 px cap (font-size ~54 px Inter Regular), centred at 50 %/50 %, hold.
