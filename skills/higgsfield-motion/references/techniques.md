# Technique catalog

Every recurring device in the four references, what it does for the viewer, and how to call it.
Numbers are measured (see `measurements.md`); components live in `templates/remotion/`.

## Scene entries and exits (`Scene` `in` / `out`)

| Fx | looks like | use it for | defaults | ref |
|---|---|---|---|---|
| `{type:'blur'}` in | the shot racks into focus from 14 px | the default entry of any shot; a third of the film is spent in these | 36 f expo-out, visible in 12 f, scale 1.04 -> 1 | all |
| `{type:'blur'}` out | shot softens just before the cut | leaving a UI/text block | 7 f cubic-in | v1, v3 |
| `{type:'thermal'}` out + in | frame burns into a posterised heat map, swaps, cools down | between sections of the same kind (one per feature in a bundle) | out 9 f, in 30 f (LUT gone by 11 f); `palette:'v1'` = warm charcoal/red/amber | v2 (x6), v1 |
| `{type:'zoom'}` out | accelerating push with roll and directional smear | leaving a title/lockup into the first content | 7 f, x2.9, roll -5 deg, 77 px smear; `axis:'y'` for a vertical smear | v2, v4 |
| `{type:'zoom'}` in | scale-down settle with blur | landing after a punch | 12 f from 1.25 | v1 |
| `{type:'whip', dir}` | short travel + heavy motion blur | UI blocks leaving upward, sideways pans, card stacks | 6 f, 18 % travel, 60 px blur | v1, v3 |
| `{type:'emerge'}` in | a rounded card flies out of the vanishing point and fills the frame | after a tunnel / zoom-through | 14 f expo-out from .05, blur 12 -> 0 | v3 |
| `{type:'rise'}` in | the whole panel docks from below | first section of a list, app screens | 20 f bezier(.08,.42,.14,1) | v2, v3 |
| `{type:'glitch'}` | RGB split, band displacement, HUD boxes, dot matrix | offers, numbers, urgency; `to:'black'` steps to black (237/207/152/84/0) | 6 f | v4 |
| `{type:'burn'}` out | highlights clip to white with a x1.3 punch | photo -> UI (the input photo becomes an attachment) | 4 f | v1 |
| `{type:'fade', color}` | linear fade to paper | before an end lockup; to white at the very end | 8 f (v2), 14 f (v4) | v2, v4 |
| 1-3 f `bg:'white'` scene | blank beat | between UI blocks, after an explosion (1 f flash) | - | v1, v4 |

`push` on a scene = constant camera push (fraction per second): 0.016-0.022 on lockups and holds,
negative 0.016-0.02 for dark text scenes (they drift out).

## Text

| component | what | when | ref |
|---|---|---|---|
| `Stream` | per-glyph reveal; fresh glyphs blurred and tinted through `accent`, settle in `tail` f. Default accent = v2 birth ramp (lime -> pink -> crimson -> ink, 9 f). `unit:'word'` + `accent:null` = v3 per-word fade (1 f stagger, blur 8 -> 0 in 5 f). Markup `**bold**`, `__highlight__` | descriptions (225 cps), paragraphs (234 cps), status titles, list items | v2, v3 |
| `ClaudeLines` | whole-line Claude ramp (yellow -> orange -> magenta -> plum -> grey, 27.5 f) under a L->R feathered wipe | everything Claude "says" in a Claude collab | v1 |
| `Scramble` | resolved prefix + random punctuation head (lime/pink, re-rolled every 2 f), optional `_` cursor, `outAt` deletes; `colorIn` arrives pink and decays | offers, big claims, model names, deadlines | v4 |
| `GlyphFade` | grey -> ink per glyph, 1.7 f apart | big money figures that should feel "written", not counted | v4 |
| `Counter` | linear by default, `tint` pulse, `hblur` smear, keyframes for multi-step stories | balances, pools counting down, percentages | v1, v4 |
| `Shimmer` | light band across bold text, 168 px/f | one bold headline per film | v1 |
| `SweepText` | colour band (blue -> red) crossing a word right-to-left in 16 f | the partner name in a collab lockup | v3 |
| `SlashTitle` | the "/" writes the title right-to-left in 13 f, smearing pink when fast | section titles in a bundle | v2 |
| `SlashList` | each "/" stamps 2.3x -> 1x, word born with the birth ramp, list accelerates out | the feature list, the end list | v2 |
| `HeroWord` | serif hero blurs in on twos, hard-swaps material textures, light-burn sweep to a coral gradient | the product/model name in a Claude collab opener | v1 |

## Labels and marks

| component | what | ref |
|---|---|---|
| `Sticker` | pink/black slab with heavy extended white caps; flips open about its bottom edge (7 f), `pose` perspective, `jitter` per-letter sizes | v2 |
| `Tag` | pop from a thin bar in 3 f (`pill` pink / `dark` lime-on-black / `lime`), optional typed text | v4, v1 (ANALYZE) |
| `BATag` | skewed BEFORE (pink) / AFTER (lime) tag, centre-out entry, 7 f scramble swap | v2 |
| `Brackets` | {WORD} / [WORD] with lime brackets sliding outward | v4 |
| `Pill` | outlined rounded pill (1.5 px #A2A0A4), `typed` grows with its text | v3 |
| `Lockup` | collab lockup: left logo whips up, group slides aside, partner pops (13 %), partner glyphs assemble shuffled, × fades, pill rises; `liftAt` = v1 lift (1.11x -> 1x, up 15.6 %H) | v1-v3 |
| `Spark` | 12-ray agent mark: `wobble` (Claude thinking), `boil` + `cycle` + `pop` (v2 header) | v1, v2 |
| `IconTile` | partner tile (lime gradient rounded square) | v1 |
| `EndCard` | `slide` (v2), `fade` (v4), `none` (v1 CTA over footage), `stream` | v1, v2, v4 |
| `CornerMarks`, `Blink` | blinking "*" corner marks; 7/7 f cursor | v4 |

## UI recreations

| component | what | ref |
|---|---|---|
| `ClaudeComposer` | composer card (radius 75), attachments, file tile, prompt typed at 50 cps with the Claude ramp, model + mode, send button pressed (0.83x, cream, peach halo, 19 f). Put it under a `CameraPath`: wide -> accelerate -> whip to a 2.1x close-up of send | v1 |
| `PillComposer` | 1245 x 185 pill, spring entry (5 %), 60-75 cps with a cyan head, optional pause, lift-and-drop exit | v3 |
| `ClaudeStatus` | spark + ClaudeLines riding `Flow`; `head` = bold 7.2 %H headline with optional shimmer | v1 |
| `AgentStatus` | mascot + "Agent • status" + title (regular or bold) + sub + bullets, per-word reveal | v3 |
| `Chip` | #EBE8EC pill with a mascot over its left end, expo-out from an offset | v3 |
| `Choice` | Claude question + Yes/No pills, Yes pressed (0.78x, coral) | v1 |
| `FileCard` | `claude` download card / `agent` doc card, rising in with blur | v1, v3 |
| `DetectBox` | verdict-coloured box drawn on in 6 f, "Condition" typed, linear % counter, success blink | v1 |
| `BalanceCard` | lime-gradient card on black with linear counts, tint pulses, Spend / Cashback labels | v4 |
| `Critter`, `CritterRing` | flat mascots: spring pop (1.20 at +3 f), breathing bump, face swaps | v3 |

## Media layouts

| component | what | ref |
|---|---|---|
| `Footage` | full-frame plate with a slow push | all |
| `MediaCard`, `CardToFull` | rounded card; card grows to full bleed (x1.42, 14 f) | v1, v3 |
| `BeforeAfter` | `wipe`: 25.1 deg lime line, in 15 f -> hold 2 f at centre -> out; `fast`; `line` colour (white variant). `burst`: AFTER spreads from an impact point with a lime glow | v2 |
| `MediaGrid` | tiles pop 5 f apart, `highlight` one with a lime outline | v1 |
| `ThumbWall` | wall of tiles zooming out in eased steps | v3 |
| `CardStack3D` | deck: a new front card every 2 f, slivers behind, `collapseAt` | v3 |
| `ScreenFan3D` | fan of screens in 3D, mint glow, floating labels with leader lines | v3 |
| `Carousel` | 9:16 tiles enter with an expo-out offset, drift at 516 px/s, drop out | v3 |
| `PinkReveal` | hot-pink silhouette -> texture with a scanning outline (knolling sheets) | v1 |
| `GradientMap` | luminance -> colour stops (duotone heat plates: `THERMAL.v4`) | v4 |
| `Coins`, `Wheel`, `FloatIn` | coin rain with depth blur; slot-machine wheel of names; floating 3D object | v4 |

## Camera

`CameraPath keys=[{at, x, y, zoom, ease}]` moves a virtual camera over its children (x/y = point
of the layout that sits at frame centre). Two keys one frame apart make a **punch-in / whip cut**
(`ease: () => 1`) - the v1 composer whip (x1 -> x2.1) and the v3 punch-ins (x1.475, x2.3) are built
that way. `motionBlur` adds blur proportional to camera speed. `Flow` (v1) and the stepped-scroll
pattern (v3, see `AgentsStory.tsx` Roster/Comments) are the two scroll languages: Flow = every block
rises in, drifts and leaves upward; stepped = 300 px expo in-out steps every 15 f over a drift, the
last one accelerating x1.075/f straight into the next shot (motion match-cut).

## The house rules these add up to

1. The picture is in motion or in a blur 20-36 % of the time; a sharp static frame lasts < 2 s
   except the end card.
2. Three of four edits are designed (blur, zoom, whip, thermal, glitch, wipe); hard cuts land on a
   blurred or already-moving first frame.
3. New text is never simply "there": it streams, wipes, scrambles or fades glyph by glyph, and fresh
   text is coloured (lime/pink, the Claude ramp, cyan) before it settles to ink.
4. One lime, one pink (or the Claude coral in a Claude collab). Everything else is paper, ink, grey.
5. Numbers count linearly; type moves on expo curves; only mascots/pills/logos spring.
6. UI is shown huge and cropped, with a camera that travels to where the action is.

## Product reels: screens and rebuilt graphics

| component | what | parameters |
|---|---|---|
| `ScreenStudio` | a captured page or screenshot inside a device on the stage; camera glides (bezier .45,0,.12,1, 18 f / speed) and auto-zooms so `focus` fills `fill` of the frame (cap 4x); cursor arrow or touch dot travels and clicks (ripple); `spotlight` dims the rest 55 % with an accent label; motion blur from camera speed (max 10 px) | `device` laptop (default, w 94 % in 9:16 / 70 % in 16:9) / phone / browser / window / none; rects in page CSS px |
| `Terminal` | window chrome, command typed after "$ ", output lines one by one; "✓" green, "!" amber, "x" red | `cps` 40, `every` 5 f, `fontSize` 34 |
| `Toast` | warning / notification card dropping in with a pop | `level`, `title`, `body`, `color` (default second accent) |
| `ChipStack` | chips cascading in, one highlighted moving through the list | `every` 3 f, `highlight {from, cycle}`, `mono`, `dark` |
| `BarChart` / `LineChart` / `Donut` | bars grow expo-out staggered with counting labels / line draws with a riding dot / ring sweeps with a counting % | `every`, `dur`, `max`, `unit` |
| `Metric` | big number counting linearly with prefix / suffix, label, delta chip | `size` 260, `dur` 18 f |
| `FileMap` | file tiles with named cursors gliding between them (multiplayer), a contested tile pulsing | `agents[{name, color, path[{at, file}]}]`, `contested {file, at}` |
| `Punch` | a jump in scale that settles the last 4 % in 6 f: the hit inside a shot | `keys[{at, scale, x, y}]`, x1.06-1.18 in reels |

All sizes are px at a 1080 short side, multiplied by the profile's `ui` (1.35 in reels). Colours
default to the theme (`Timeline theme`), so brand accents apply without touching components.
