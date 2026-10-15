# Story archetypes

The four references are four different stories told with one visual language. Pick the archetype
from the brief first: it fixes length, tempo, backgrounds and the shot list. Each one has a complete,
rendered, shot-for-shot example in `templates/examples/` - start from it and replace content.

| archetype | reference | example | length | tempo | carried by |
|---|---|---|---|---|---|
| **A. Agent workflow demo** | v1 Higgsfield MCP x Claude | `AgentDemo.tsx` (1240 f) | 35-45 s | 85 BPM trap | composer macro, Claude status lines, generated results |
| **B. Feature bundle** | v2 Production Skills Bundle | `BundlePromo.tsx` (1399 f) | 40-50 s | 82.5 BPM trap | one section per feature: slash header + before/after |
| **C. Agent story with characters** | v3 OpenAI dots x Higgsfield | `AgentsStory.tsx` (1787 f) | 50-60 s | 87.75 BPM trap | a human ask, mascot agents at work, result in use |
| **D. Offer / numbers** | v4 Higgsfield API cashback | `OfferPromo.tsx` (782 f) | 20-30 s | 132.5 BPM drive | claims, counters, scramble type, deadline |

Brief -> archetype: "show what the agent/MCP/model does on one task" = A; "launch N features /
skills / templates" = B; "explain a product of several agents to normal people" = C; "a discount,
credits, pricing, deadline, numbers" = D. Mixed briefs: take the spine of one and borrow scenes.

All four share: lockup/title intro -> drop on the first content cut -> an event every 0.5-1.7 s ->
end card (or CTA over hero footage / the lockup again).

---

## A. Agent workflow demo (v1) - frames @30

| frames | scene | how |
|---|---|---|
| 111 | collab lockup builds (holds 1.11x, lifts), hero word blurs in on twos, swaps materials, burns to coral | `Lockup liftAt`, `HeroWord`, `bg:'peach'`, out `thermal palette v1` |
| 49 | input photo through a warm heat-map crossfade | `Footage`, in `thermal v1`, out `burn` |
| 112 | photo shrinks into the composer, prompt types (50 cps, Claude ramp), file pops, camera accelerates, whips to 2.1x on send, press + halo | `ClaudeComposer` in `CameraPath` |
| 3 | blank beat | white |
| 47 | "Analyzing photo input / Analyzing Diagnostic Report about vehicle" | `ClaudeStatus` |
| 52 | bold "Checking if this car can handle / a monster truck build" + shimmer; riser into the cut | `ClaudeStatus head shimmerAt` |
| 55 | 3D render explodes, lime ANALYZE pill types in | `Footage`, `Tag variant lime typed` |
| 24 + 1 | pill close-up squashes .8, blows up 1.32 -> 1 f white flash on the biggest hit | custom (see example) |
| 30 + 25 | parts sheet: pink silhouettes resolve row by row; close-up scan | `PinkReveal` grid |
| 25 / 22 / 49 | three detection shots: warn 67 %, bad 16 %, good 84 -> 96 % with blink | `DetectBox` |
| 42 | "**Frame is in perfect condition.** This rig is a prime / candidate for mods." | `ClaudeStatus` |
| 44 | partner line with lime tile | `ClaudeStatus icon={IconTile}` |
| 120 | build stages with captions wiping in/out | `Footage` + caption |
| 45 | "The truck is ready..." + partner line, block zooms out to a header | `ClaudeLines` |
| 65 | 2x2 variants pop 5 f apart, push x1.155, one highlighted | `MediaGrid highlight` |
| 44 + 66 | "Building the final 3D model" -> becomes the caption of a card growing from its top-left | `Pop origin top left` |
| 57 | "Compile a universal build guide?" Yes/No, Yes pressed | `Choice` |
| 30 | download card rises; exits toward camera with a horizontal smear | `FileCard`, out `zoom` |
| 115 | hero outcome footage + static uppercase CTA | `Footage` + `EndCard entry none` |

## B. Feature bundle (v2) - frames @30

| frames | scene | how |
|---|---|---|
| 130 | wordmark + stickers flip open (1, 11, 18), tagline per word, beat snaps (or AI hands), zoom-whip out | `Sticker` x3, out `zoom` |
| 35 | slash list stamps in, accelerates out | `SlashList`, `bg:'list'` |
| 186 / 130 / 85 / 146 / 172 / 131 / 169 | seven features: header "/name" written by its slash, description typed (7.5 chars/f), body = BEFORE -> lime wipe (hold at centre) -> AFTER, or a burst reveal, or footage; sections joined by `thermal` | `SkillHeader` + `BeforeAfter`, in/out `thermal` |
| (last) | fade to paper 8 f | out `fade` |
| 157 | lockup replays, shrinks .67, paragraph types (234 cps); giant pink slash erases it; end list stacks and scrolls away | `SlashWipe`, `SlashList` |
| 58 | end card slides up 13.9 %H, holds, music stops | `EndCard` |

## C. Agent story (v3) - frames @30

| frames | scene | how |
|---|---|---|
| 64 | lockup + 6 mascots popping and breathing, push | `Lockup`, `CritterRing`, `bg:'sky'` |
| 29 | flight through a white corridor, mascots pass the camera | custom tunnel |
| 171 | card emerges into live action; pill composer types the ask with a pause | in `emerge`, `PillComposer` |
| 94 | chat: bubble + agent row, whip right, cut to the zoomed-out app, drift to the sidebar | `CameraPath` over a chat layout |
| 107 | agent roster pops every 15 f, stepped scroll | rows + `Critter` |
| 45 | two agent rows researching | `AgentStatus` x2 |
| 45 + 86 + 30 | post card with chip tilts 25 deg; deck flips a card every 2 f; close-up chip | `Chip`, `CardStack3D` |
| 72 | "Finding your edge..." + bullets, punch-in x1.475 to "Here's what I found." | `AgentStatus` in `CameraPath` |
| 102 + 77 + 49 | comment thread scroll (steps, then x1.075/f acceleration); wall zooming out; one card | custom scroll, `ThumbWall` |
| 30 + 13 + 118 | insights; app screen rises; 3D fan with labels, fly-in | `AgentStatus bold`, in `rise`, `ScreenFan3D` |
| 79 + 45 | blueprint ready + doc card; building + highlighted API | `AgentStatus`, `FileCard agent` |
| 74 | mascot party: 2 -> 9 -> 22, implode | `Critter` |
| 91 + 108 | media status; phone app + chip | `AgentStatus`, `MediaCard`, `Chip` |
| 100 + 69 | card to fullscreen reaction + chip; UGC carousel | `CardToFull`, `Carousel` |
| 89 | lockup again, pill typed, push | `Lockup pillTyped` |

## D. Offer (v4) - frames @30

| frames | scene | how |
|---|---|---|
| 56 | "100% {CASHBACK}" scramble-typed, pink pill pops, coins, group settles .60 -> 1 | `Scramble`, `Brackets`, `Tag pill`, `Coins`, `bg:'offer'` |
| 24 + 15 + 20 | product object; coin stack + dark tags "+$25,000" / "+$30,000" | `FloatIn`/render, `Tag dark` |
| 59 + 2 | "WE'RE ALLOCATING / $20,000,000 / CASHBACK POOL" (per-glyph fade, pill wipes), exit zoom; 2 f white | `GlyphFade`, `Tag` |
| 57 | "FIRST COME, / FIRST SERVED" scramble on the tech frame, punch-in, un-type, glitch to black | `Scramble`, `bg:'tech'`, out `glitch to black` |
| 146 | balance card: 10,000 -> 2,629 (Spend) -> 10,000 (Cashback) | `BalanceCard` |
| 41 | black -> paper, brand {API} typed, shrinks; "MOST AFFORDABLE / ON THE MARKET" | `Scramble` |
| 96 | corner headline + wheel of model names | `Wheel`, `Blink` |
| 101 | duotone heat plate + "CLAIM UP TO / $100.000 / PER ORGANIZATION", scramble-out, glitch to black | `GradientMap THERMAL.v4`, `CornerMarks` |
| 47 + 68 | "[SEPTEMBER ONLY]" + pool counting down; "UNUSED CASHBACK / EXPIRES SEPTEMBER 30th", counter to 0, fade to white | `bg:'calendar'`, `Counter hblur`, out `fade` |
| 50 | end card fades in (6 f), music gone | `EndCard entry fade` |
