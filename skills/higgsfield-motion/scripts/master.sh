#!/bin/bash
# Master a render to the measured loudness of the references (two-pass EBU R128 loudnorm, video copied).
# Usage: master.sh in.(mp4|wav) out.(mp4|wav) [LUFS=-14] [TRUE_PEAK=-3]
set -euo pipefail
IN=$1; OUT=$2; I=${3:--14}; TP=${4:--3}
J=$(ffmpeg -hide_banner -nostats -i "$IN" -af "loudnorm=I=$I:TP=$TP:LRA=6:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$J" | sed -n "s/.*\"$1\" : \"\\(.*\\)\".*/\\1/p"; }
if ffprobe -v error -select_streams v:0 -show_entries stream=codec_type -of csv=p=0 "$IN" | grep -q video; then
  CODEC=(-c:v copy -c:a aac -b:a 256k)
else
  CODEC=(-c:a pcm_s16le)
fi
ffmpeg -hide_banner -v error -y -i "$IN" -af "loudnorm=I=$I:TP=$TP:LRA=6:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true" -ar 48000 "${CODEC[@]}" "$OUT"
ffmpeg -hide_banner -nostats -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
