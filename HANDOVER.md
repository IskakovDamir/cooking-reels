# cooking-reels: handover

**To the Claude Code session that receives this folder.** Read this file top to bottom. Run
[Setup](#setup) step by step and confirm the [smoke test](#4-smoke-test) passes. After that, route
every request for a promo video, a product Reel / Short / TikTok, or "motion like Higgsfield"
through the `higgsfield-motion` skill. Follow the [decisions](#decisions-already-made-keep-them)
below: they were agreed with Damir and his feedback already rejected the alternatives.

**To the teammate.** Open Claude Code in this folder and say:
`Read HANDOVER.md and set everything up, then render the agentmash reel to check it works.`

---

## What this is

- **`skills/higgsfield-motion`** is a Claude Code skill: a Remotion (React) motion library plus a
  workflow, docs and scripts. It makes two kinds of video:
  - **16:9 launch films** in the style of Higgsfield's promos (rack-focus blur on almost every shot,
    AI-streaming / scramble type, UI shown huge under a moving camera, stickers, before/after wipes,
    thermal and glitch cuts). Every default comes from measuring four reference videos frame by frame.
  - **9:16 product Reels** built from the product's real website (shown on a laptop, Screen Studio
    style: camera glides, zooms, cursor clicks, spotlight) and app screenshots, with UI and charts
    rebuilt in code (terminal, toasts, chips, bar / line / donut charts, counters, multiplayer file
    maps).
- **No AI generation is required.** Sources are the live site (captured by a script) and
  screenshots. Music and SFX are synthesized from scratch (royalty-free) and mastered to -14 LUFS.
  The Higgsfield MCP is not needed.
- **Proof it works:** `renders/agentmash-reel-9x16.mp4` (26.8 s, 1080x1920, 30 fps) was made with
  exactly this skill and project. Damir signed it off after two rounds of feedback.

## What's in the folder

| path | what | in the GitHub repo |
|---|---|---|
| `HANDOVER.md` | this file | yes |
| `install.sh` | copies the skill to `~/.claude/skills/higgsfield-motion` and checks node / python / ffmpeg | yes |
| `.claude-plugin/` | plugin + marketplace manifests (install from GitHub instead of copying) | yes |
| `skills/higgsfield-motion/` | **the skill**: `SKILL.md`, `references/`, `scripts/`, `templates/`, `assets/` | yes |
| `project/` | ready-to-run Remotion project: library in `src/hfm`, 5 examples, reel `Main.tsx`, capture tools, agentmash captures, the reel's music | yes |
| `renders/agentmash-reel-9x16.mp4` | the finished agentmash reel (target quality) | yes |
| `private/reference-videos/v1..v4.mp4` | the four Higgsfield promos the style was measured from | **no**: someone else's content, team use only |
| `private/agentmash-features.md` | internal agentmash feature list (source of the reel's claims), with notes on what must not be claimed | **no**: internal |

Repo: https://github.com/IskakovDamir/cooking-reels (public). A teammate who only clones the repo
won't have `private/`. The skill does not need it to generate. It matters only for re-measuring the
style or checking claims.

---

## Setup

Tested on macOS (Apple Silicon) with node 22.23, Python 3 (numpy 2.4, scipy 1.18, Pillow 12.2) and
ffmpeg 9.0.2. Linux works with the apt equivalents.

### 1. Tools

```bash
brew install node ffmpeg python      # skip what you already have
pip3 install numpy scipy pillow
```

You need node >= 18 with npm, python3 with numpy/scipy/Pillow (music synth, render checks,
screenshot regions), and ffmpeg + ffprobe with the `loudnorm` filter (mastering and checks).
Rendering also needs internet: fonts load from Google Fonts, and Remotion downloads its headless
Chrome on the first render.

### 2. Install the skill (pick ONE way)

**A. Copy (works offline, from this folder):**
```bash
bash install.sh
```
This installs to `~/.claude/skills/higgsfield-motion` and prints `ok` / `MISSING` for every tool.
For one repository only: `CLAUDE_SKILLS_DIR=<repo>/.claude/skills bash install.sh`.

**B. Plugin from GitHub (updates with `claude plugin update`):**
```bash
claude plugin marketplace add IskakovDamir/cooking-reels
claude plugin install cooking-reels@cooking-reels
```
The skill then shows up as `cooking-reels:higgsfield-motion`. The manifests pass
`claude plugin validate`, and loading the folder as a plugin lists the skill.

Don't install both ways: Claude would see two copies of the skill. **Start a new Claude Code
session** afterwards. The skill list should then include `higgsfield-motion`.

### 3. The project

```bash
cd project
npm install
```
This takes about 1-2 minutes. Remotion 4.0.530, React 19.1.1 and TypeScript 5.9.2 are pinned, plus
puppeteer-core 25.12.0 for site capture.

### 4. Smoke test

```bash
cd project
npx tsc --noEmit                                                                  # no output = ok
npx remotion still src/index.ts ExampleAgentmashReel out/check.png --frame=200    # laptop zoomed on "it reads before it writes"
npm run render:agentmash                                                          # ~1-2 min -> out/agentmash-reel-raw.mp4
bash ../skills/higgsfield-motion/scripts/master.sh out/agentmash-reel-raw.mp4 out/agentmash-reel.mp4
python3 ../skills/higgsfield-motion/scripts/check_render.py out/agentmash-reel.mp4
```

With plugin install (B), the skill lives in the plugin cache. Use the `skills/` path of a clone of
the repo, or ask Claude for the skill's base directory.

Expected `check_render` output, identical to `renders/agentmash-reel-9x16.mp4`. This was verified on
a clean copy of this folder: fresh `npm install` -> render -> master -> check.

| metric | value | 16:9 reference range |
|---|---|---|
| length | 26.8 s | |
| visual events / 10 s | 5.6 | 4.3-8.1 |
| hard cuts / 10 s | 3.0 | 1.3-5.4 |
| median gap between events | 1.63 s | 0.47-1.7 |
| share of frames in a blur | 0.26 | 0.20-0.36 |
| light frames | 0.56 | 0.21-0.61 |
| dark frames | 0.29 | 0.0-0.15 **OUTSIDE, expected**: agentmash.dev is dark |
| saturation | 0.072 | 0.11-0.27 **OUTSIDE, expected**: pastel blue + orange accents |
| frame-to-frame motion | 4.44 | 4.96-8.55 (slightly low: the pace was slowed on purpose, not flagged) |
| loudness | -14.0 LUFS | -14.2..-14.1 |
| true peak | about -3.1 dBTP | -4.7..-2.3 |
| tempo | 129 BPM | |

Studio for live editing: `npx remotion studio src/index.ts`. Compositions: `Main` (a reel template),
`ExampleAgentmashReel`, and the four 16:9 rebuilds `ExampleOffer`, `ExampleBundle`,
`ExampleAgentDemo`, `ExampleAgentsStory`.

---

## How to make a new agentmash Reel (the main job)

1. **Facts first.** Read https://agentmash.dev/llms.txt (and `private/agentmash-features.md` if
   you have it). Put only claims the site supports on screen. Numbers that are easy to get wrong:
   - **20 coding agents** connect through one login: Claude Code, Codex, Cursor, GitHub Copilot,
     Devin, Amp, Antigravity, Cline, Crush, Factory Droid, Gemini CLI, goose, Junie, Kilo Code,
     Kiro, OpenCode, OpenHands, Qwen Code, Continue, Zed. Any other editor joins through git.
   - **22 is the crew:** ready-made Claude Code agents, one job each (mash, tally, scout, flex, pipe,
     swipe, index, patch, batch, spell, lingo, probe, gavel, snag, prune, bump, rail, quill, higgs,
     plain, tempo, inspo). **Never write "22 coding agents".** The reel shows both numbers in
     separate shots.
   - Free for 2 developers, unlimited agents, 7 days of history. Team plan $20 per developer a month.
   - The check before an edit waits at most 1500 ms (site). About 160 ms on localhost and about 450
     ms across the Atlantic (features doc).
   - Don't say "all the models", "connect absolutely everything" or "agentmash is open source"
     (only the crew is MIT).
   - Re-check both lists against llms.txt before reusing them: they were true on 2026-10-15.
2. **Capture the site fresh.** It changes, so do this before every new reel:
   ```bash
   cd project
   node tools/capture_site.mjs https://agentmash.dev --name agentmash --devices desktop --frames auto --dpr 3
   ```
   Open `public/capture/agentmash-home-desktop-at<scroll>-annotated.png` and pick the numbered
   elements. Their rects are in `public/capture/agentmash.json` -> `pages.home.devices.desktop.frames[i].elements`.
   `--frames 0,1700,3640,4310` gives exact scroll positions: hero, how-it-works, pricing, closing CTA.
3. **Write the film.** Start from `src/examples/AgentmashReel.tsx`: copy it into `src/Main.tsx` or a
   new file and register it in `src/Root.tsx` at 1080x1920. Write the beat sheet first: one
   `SceneSpec` per shot, durations in beats via `beatDurations(beatGrid(130, 30), [...])`.
4. **Music.** Generate a bed that matches the beat sheet:
   ```bash
   python3 ../skills/higgsfield-motion/scripts/synth_audio.py public/<name> --style drive --bpm 130 \
     --bars <ceil(total beats / 4)> --drop-beat <beats of shot 1> --gaps <beat before the price reveal>:0.5 --end-beat <first beat of the end card>
   ```
   Pass `music="<name>/music.wav"` as a prop. Place `<Sfx>` hits: whoosh on designed cuts, glitch on
   glitch cuts, click where the cursor clicks, typing under the terminal, impact on the price.
5. **Render, master, check, look:** the commands from the smoke test. Then look at a 2 fps
   contact sheet. Every headline and card must be readable before its shot cuts.
   ```bash
   ffmpeg -i out/final.mp4 -vf "fps=2,scale=216:384,tile=10x6" -frames:v 1 out/sheet.png
   ```

### Decisions already made (keep them)

These come from Damir's feedback on earlier cuts. Keep them unless he says otherwise.

- **The website is always shown on a laptop** (`<ScreenStudio device="laptop">`, desktop capture),
  never in a phone frame, even though the Reel is vertical. The phone frame is only for mobile-app
  screenshots.
- **Pace:** `<MotionProfile preset="reels">` (x1.2 speed, UI x1.35). A x1.4 cut with 2.5-3 beat
  shots (20 s) was rejected as too fast to understand. Give **4-5 beats (1.8-2.3 s at 130 BPM) to
  any shot with copy or UI to read**. Use 2-3 beats only for a single word or number. A reel runs
  about 25-30 s.
- **Colours:** `<Timeline theme={{accents: ['#8BCFF0', '#F97316']}}>`. The sky blue is the site's
  `--hp-accent` and replaces the Higgsfield lime. Orange replaces the hot pink. The type is Manrope
  (the site's font), lowercase like the site.
- **Layout:** headlines at most 2 lines, 96-150 px, inside the `SAFE` zones. Instagram covers the
  top 11.5 %, the bottom 19.8 % and 5.6 % on each side.
- **Rhythm:** mix 3-5 dark shots with the light ones. No voice-over: every shot must read with the
  sound off.
- **Ending:** claim -> `agentmash` scramble -> CTA card (`$ npx agentmash login` + `agentmash.dev`).
  The music stops on the CTA.

## Other jobs

| request | do this |
|---|---|
| a Reel for another product / site | same steps. Take the accents from the site's CSS variables (`capture_site.mjs` prints the palette) and pass them as `theme.accents`. Read `skills/higgsfield-motion/references/reels.md` |
| a Reel from app screenshots | `python3 tools/ui_regions.py shot.png --name app --out public/capture` -> numbered regions + rects. Use `ScreenStudio` with `device="laptop"` / `"window"` for desktop apps, `"phone"` for mobile apps |
| a 16:9 Higgsfield-style launch film | `SKILL.md` steps 1-7. Pick the archetype in `references/archetypes.md`, start from the matching example (`AgentDemo`, `BundlePromo`, `AgentsStory`, `OfferPromo`) |
| a new project from scratch | `bash <skill>/scripts/setup_project.sh <dir> --reels` (or without `--reels` for 16:9) |
| measure a new reference video | `python3 <skill>/scripts/fingerprint.py video.mp4`, the same method as `references/measurements.md` |

### Prompts that work

- `Make a 9:16 reel for agentmash about <feature> with the higgsfield-motion skill. Site on a laptop, same pace and colours as the agentmash example.`
- `Here are 3 screenshots of our app. Make a Screen Studio-style reel: zoom into <element>, then <element>.`
- `Make a 16:9 Higgsfield-style launch film for <product>, offer archetype, 25 s.`
- In Russian too: `Сделай рилс 9:16 для agentmash про <фичу> по скиллу higgsfield-motion, сайт на ноутбуке.`

---

## Map of the skill

| file | read it when |
|---|---|
| `SKILL.md` | always: the workflow, the library table, the rules |
| `references/reels.md` | any 9:16 / product reel: profile, safe zones, theme, pace, capture -> laptop, screenshots, rebuilt graphics |
| `references/techniques.md` | which component does what, with parameters |
| `references/editing.md` | beat sheet, transitions, copy rules, what to fix when a check is OUTSIDE |
| `references/archetypes.md` | 16:9 film structures (agent demo, feature bundle, agent story, offer) |
| `references/audio.md` | music structure, SFX, loudness |
| `references/assets.md` | sources: site capture, screenshots, generated plates |
| `references/measurements.md`, `breakdowns/` | the measured numbers and shot-by-shot breakdowns of v1-v4 |
| `scripts/` | `setup_project.sh`, `capture_site.mjs`, `ui_regions.py`, `synth_audio.py`, `master.sh`, `check_render.py`, `fingerprint.py` |
| `templates/remotion/` | the library (copied to `src/hfm`): `ScreenStudio`, `Graphics`, `Scene`, `Text`, `tokens` (`Theme`, `SAFE`), `profile` |
| `templates/examples/` | `AgentmashReel` (9:16) + four shot-for-shot 16:9 rebuilds |

## Troubleshooting

| symptom | fix |
|---|---|
| `dyld: Library not loaded ... libx265...dylib` from ffmpeg after a brew upgrade | `brew reinstall ffmpeg` (or `ffmpeg-full`) |
| `puppeteer-core is missing` | `npm i -D puppeteer-core@25.12.0` in the project |
| `No Chrome found` | `npx remotion browser ensure`, or set `CHROME_PATH` |
| empty sections in `-full.png` | sites that reveal on scroll: use `--frames` viewport shots, never the full page, for laptop shots |
| `ui_regions.py needs scipy` | `pip3 install scipy` |
| fonts render as a fallback | rendering needs internet for Google Fonts |
| colours not themed in a custom component | read `COLOR.x` inside the component at render time, not at module level |
| `tsc` fails on an unused import | `noUnusedLocals` is on: remove it |
| the skill appears twice | it was installed by copy and as a plugin: remove one |
| `setup_project.sh` on an existing project | it rewrites only `src/hfm`, `src/examples` and `tools/`. It keeps your Main / Root / `music.wav` and prints what to add by hand |

## Updating

The source of truth is `skills/higgsfield-motion` in the repo. After a change: copy installs re-run
`bash install.sh`; plugin installs run `claude plugin update cooking-reels`. To refresh a project's
library: `bash <skill>/scripts/setup_project.sh <project> --no-install`.
