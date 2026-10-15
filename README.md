# cooking-reels

A Claude Code skill, **higgsfield-motion**, for motion-design videos in Remotion:

- **9:16 product Reels** built from your real website, shown on a laptop Screen Studio-style
  (camera glides, zooms, cursor clicks, spotlight), and from app screenshots, with UI and charts
  rebuilt in code, synthesized music and your brand colours.
- **16:9 launch films** in the style of Higgsfield's promos: rack-focus blur on almost every shot,
  streaming and scramble type, UI under a moving camera, before/after wipes, thermal and glitch cuts.
  Every default is measured frame by frame from four reference videos.

No image or video generation needed. Example output: [`renders/agentmash-reel-9x16.mp4`](renders/agentmash-reel-9x16.mp4).

## Install

```bash
claude plugin marketplace add IskakovDamir/cooking-reels
claude plugin install cooking-reels@cooking-reels
```

or copy it: `git clone https://github.com/IskakovDamir/cooking-reels && bash cooking-reels/install.sh`.

Then `cd project && npm install && npx remotion studio src/index.ts`.

**Setup, smoke test, workflow and the decisions behind the example: [HANDOVER.md](HANDOVER.md).**

## Layout

- `skills/higgsfield-motion/`: the skill (`SKILL.md`, references, scripts, Remotion library, examples)
- `project/`: a ready-to-run Remotion project with all examples and the agentmash reel's assets
- `renders/`: finished example output
