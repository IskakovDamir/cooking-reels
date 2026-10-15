#!/bin/bash
# Install the higgsfield-motion skill for Claude Code and check the tools it needs.
#   bash install.sh            -> ~/.claude/skills/higgsfield-motion (an older copy is kept as .bak-<time>)
#   CLAUDE_SKILLS_DIR=<dir> bash install.sh   -> another skills folder (e.g. <repo>/.claude/skills)
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
DEST="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}/higgsfield-motion"
mkdir -p "$(dirname "$DEST")"
if [ -d "$DEST" ]; then mv "$DEST" "$DEST.bak-$(date +%Y%m%d-%H%M%S)" && echo "kept the previous copy as $DEST.bak-*"; fi
cp -R "$HERE/skills/higgsfield-motion" "$DEST" && echo "skill installed: $DEST"

ok=1
say() { printf '  %-8s %s\n' "$1" "$2"; }
echo "checking tools:"
if command -v node >/dev/null && node -e 'process.exit(+process.versions.node.split(".")[0] >= 18 ? 0 : 1)'; then say ok "node $(node -v)"; else say MISSING "node >= 18 (brew install node)"; ok=0; fi
if command -v npm >/dev/null; then say ok "npm $(npm -v)"; else say MISSING "npm"; ok=0; fi
if command -v python3 >/dev/null; then
  if python3 -c 'import numpy, scipy, PIL' 2>/dev/null; then say ok "python3 + numpy, scipy, Pillow"; else say MISSING "python packages: pip3 install numpy scipy pillow"; ok=0; fi
else say MISSING "python3"; ok=0; fi
if command -v ffmpeg >/dev/null && [[ "$(ffmpeg -hide_banner -filters 2>/dev/null)" == *loudnorm* ]]; then say ok "$(ffmpeg -version | head -1 | cut -d' ' -f1-3)"; else say MISSING "ffmpeg with loudnorm (brew install ffmpeg; if it fails to load a dylib: brew reinstall ffmpeg)"; ok=0; fi
if command -v ffprobe >/dev/null; then say ok "ffprobe"; else say MISSING "ffprobe (comes with ffmpeg)"; ok=0; fi
[ $ok = 1 ] && echo "all set. next: cd project && npm install" || echo "install what is MISSING, then: cd project && npm install"
echo "start a new Claude Code session so it picks up the skill."
