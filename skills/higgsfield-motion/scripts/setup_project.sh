#!/bin/bash
# Scaffold a Remotion project wired with the higgsfield-motion library, the five examples, a Main.tsx
# and the capture tools.
# Usage: setup_project.sh <dir> [--reels] [--no-install] [--bpm 85] [--style trap|drive]
#   --reels   Main.tsx is a 1080x1920 product reel (reels profile, laptop site shot, theme); bed 130 drive
# Adds the library to an EXISTING Remotion project too: it only rewrites src/hfm, src/examples and
# tools/, and writes Main/Root/index/package/tsconfig only where they are missing.
set -euo pipefail
SKILL="$(cd "$(dirname "$0")/.." && pwd)"
DIR=${1:?usage: setup_project.sh <dir> [--reels]}; shift || true
INSTALL=1; BPM=""; STYLE=""; REELS=0
while [ $# -gt 0 ]; do case "$1" in --no-install) INSTALL=0;; --reels) REELS=1;; --bpm) BPM=$2; shift;; --style) STYLE=$2; shift;; esac; shift; done
if [ $REELS = 1 ]; then BPM=${BPM:-130}; STYLE=${STYLE:-drive}; else BPM=${BPM:-85}; STYLE=${STYLE:-trap}; fi
mkdir -p "$DIR/src" "$DIR/public/capture" "$DIR/out" "$DIR/tools"
rm -rf "$DIR/src/hfm" "$DIR/src/examples"
cp -R "$SKILL/templates/remotion" "$DIR/src/hfm"
cp -R "$SKILL/templates/examples" "$DIR/src/examples"
cp "$SKILL/scripts/capture_site.mjs" "$SKILL/scripts/ui_regions.py" "$DIR/tools/"
# the AgentmashReel example's laptop frames
for f in "$SKILL"/assets/capture/*.png; do [ -f "$DIR/public/capture/$(basename "$f")" ] || cp "$f" "$DIR/public/capture/"; done
if [ ! -f "$DIR/src/Main.tsx" ]; then
  if [ $REELS = 1 ]; then cp "$SKILL/templates/project/MainReel.tsx" "$DIR/src/Main.tsx"; else cp "$SKILL/templates/project/Main.tsx" "$DIR/src/Main.tsx"; fi
fi
for f in Root.tsx index.ts; do [ -f "$DIR/src/$f" ] || cp "$SKILL/templates/project/$f" "$DIR/src/$f"; done
for f in package.json tsconfig.json; do [ -f "$DIR/$f" ] || cp "$SKILL/templates/project/$f" "$DIR/$f"; done
grep -q "ExampleAgentmashReel" "$DIR/src/Root.tsx" || echo "note: your Root.tsx predates the reel example; add: import {AgentmashReel, REEL_FRAMES} from './examples/AgentmashReel'; <Composition id=\"ExampleAgentmashReel\" component={AgentmashReel} durationInFrames={REEL_FRAMES} fps={30} width={1080} height={1920} />"
if grep -q "WIDTH" "$DIR/src/Root.tsx" && ! grep -q "export const WIDTH" "$DIR/src/Main.tsx"; then echo "note: Root.tsx reads WIDTH/HEIGHT from Main.tsx; add: export const WIDTH = 1920; export const HEIGHT = 1080;"; fi
grep -q "puppeteer-core" "$DIR/package.json" || echo "note: for tools/capture_site.mjs run: npm i -D puppeteer-core@25.12.0"
if [ $INSTALL = 1 ]; then (cd "$DIR" && npm install --no-audit --no-fund >/dev/null && echo "npm install: ok"); fi
if [ -f "$DIR/public/music.wav" ]; then
  echo "audio: kept your public/music.wav (delete it to get a fresh bed)"
elif command -v python3 >/dev/null; then
  if [ $REELS = 1 ]; then ARGS=(--bars 5 --drop-beat 4 --end-beat 16); else ARGS=(--bars 12 --drop-beat 5); fi
  python3 "$SKILL/scripts/synth_audio.py" "$DIR/public" --bpm "$BPM" --style "$STYLE" "${ARGS[@]}" | tail -3 || echo "audio: run scripts/synth_audio.py yourself (needs numpy)"
fi
echo "ready: cd $DIR && npx remotion studio src/index.ts   (compositions: Main, ExampleOffer, ExampleBundle, ExampleAgentDemo, ExampleAgentsStory, ExampleAgentmashReel)"
echo "capture a site: node tools/capture_site.mjs https://your.site --devices desktop --frames auto --dpr 3"
