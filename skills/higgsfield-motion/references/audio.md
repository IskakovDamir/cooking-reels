# Audio: music, structure, SFX, loudness

Measured on the four references (ffmpeg ebur128, STFT onset envelope, autocorrelation tempo,
dynamic-programming beat tracker, band-limited RMS in 50 ms windows). No voice-over in any of them:
the music and the on-screen type carry everything.

## Numbers

| | v1 Claude collab | v2 skills bundle | v3 agents collab | v4 API offer |
|---|---|---|---|---|
| length | 41.3 s | 46.7 s | 59.6 s | 26.1 s |
| tempo | 85 BPM | 82.5 BPM | 87.75 BPM | 132.5 BPM |
| feel | trap, half-time | trap, half-time | trap, half-time | drive (4-on-floor-ish, offbeat 808) |
| kick/808 onsets per s | 2.6 | 3.3 | 3.0 | 4.4 |
| hat onsets per s | 7.4 | 6.8 | 8.8 | 9.8 |
| integrated loudness | -14.2 LUFS | -14.1 | -14.1 | -14.1 |
| true peak | -3.2 dBTP | -3.1 | -2.3 | -4.7 |
| loudness range | 3.5 LU | 4.3 | 3.2 | 1.6 |

So: **-14 LUFS, ~-3 dBTP, LRA 2-4 LU** (dense, limited, social-platform loudness), tempo either
**82-88 BPM half-time trap** (product / workflow stories) or **~132 BPM drive** (offers, numbers, urgency).
Hats run at 1/16 of the half-time beat (7-10 onsets per second) - the picture's "hyper" feeling comes
from the hats, while the 808 and snare move at half speed.

## Structure (sub-bass < 110 Hz, measured)

1. **Filtered intro under the logo lockup.** The sub is out or low for the first 1.7-4.0 s
   (v2: no sub 1.75-4.0 s; v4: stutter gap 1.1-1.7 s; v1: sub only from ~0.9 s, low until 3.7 s).
2. **The drop lands on the first content cut** - v1 3.75 s (lockup -> truck photo), v2 4.0-4.3 s
   (title whips out), v4 2.67 s (coin -> API chip). Plan the intro to be exactly N beats long and put the
   first content scene on that beat (`--drop-beat`).
3. **Pre-reveal 808 cuts.** Before the big reveals the sub stops for 0.3-1.0 s and the reveal cut lands
   where it returns (v1: sub out 11.55-12.55 s -> 3D render cut 12.42 s; 14.65-15.05 s -> parts wall cut
   15.04 s). Use `--breaks` for a full-bar break and a riser, or just drop the 808 for half a bar.
4. **One long break with a riser in long videos.** v3: an 11-second pitch riser (250 -> 1800 Hz) from
   28.5 s, sub out 37.95-39.45 s, drop at ~39.6 s on the next section. Short videos (26-47 s) skip it.
5. **Ending.** Two ways, both measured: the music stops as the white end card appears and the card holds
   1.5-2.2 s in near silence (v2: end card 44.5 s, music gone by 45.05 s; v4: 24.4 s / 24.5 s), or the
   bed rides to the last frame under a lockup (v1, v3). Default: stop + final hit on the end card.

## Sync

Cuts and focus pulls are **not locked to the beat grid** at +-2 frames (v1 42% of cuts on a beat vs 24%
by chance, p=0.13; v2 0% vs 18%; v3 12% vs 19%; v4 21% vs 29%). On the 8th-note grid they sit at chance
too. What *is* synced: the drop to the first content cut, reveals to the return of the 808, and the end
card to the music stop. Inside sections the edit follows the on-screen action (typing finishes, a status
line lands, a counter stops). Practical rule used by the skill: place scene boundaries on beats or 8ths
anyway (it never hurts), then nudge inner events to the action.

## SFX (heard in the spectrograms)

- **Pitch-up risers** into reveals (v1 ~11.5-12.3 s and ~23.3 s: rising partials; v3 0-3.5 s and 28.5-39.5 s).
- **Whooshes** on blur transitions and whips (broadband noise bursts under the focus pulls).
- **Glitch stutters / bit-crush** on scramble type and RGB-split cuts (v4).
- **UI ticks** on typing, a pop on the send button, soft dings on "ready" states.
- **Impact** (sub boom + noise) on the drop and on the final hit.

`scripts/synth_audio.py` generates all of it (CC0, synthesized): `whoosh`, `swish`, `riser`, `impact`,
`glitch`, `click`, `typing`, `pop`, `ding`, `coin`, `tick`, plus the bed with the structure above.
Volumes that sit right under a -14 LUFS bed: whoosh 0.35-0.5, glitch 0.3, click/tick 0.25, typing 0.2,
pop 0.4, impact 0.6.

## Mastering

Render, then `scripts/master.sh out.mp4 final.mp4` (two-pass loudnorm to -14 LUFS / -3 dBTP, video copied).
Check with `scripts/check_render.py final.mp4`.
