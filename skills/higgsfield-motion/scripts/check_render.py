#!/usr/bin/env python3
"""Self-check a render against the measured reference ranges (references/fingerprint.json).

  python check_render.py final.mp4 [--fingerprint ../references/fingerprint.json]

Prints every metric next to the reference min..max (four videos) and flags OUTSIDE. The metrics that
matter most for "does it feel like the references": events_per_10s (pace), blurred_share (a third of
the runtime should be in focus pulls / motion blur), focus_pulls_per_10s, light_share, lufs.
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from fingerprint import measure  # noqa: E402

KEYS = [
    ('events_per_10s', 'visual events (cuts + focus pulls) per 10 s'),
    ('cuts_per_10s', 'hard cuts per 10 s'),
    ('focus_pulls_per_10s', 'blur valleys per 10 s'),
    ('median_event_gap_s', 'median gap between events, s'),
    ('blurred_share', 'share of frames in a blur'),
    ('light_share', 'share of light frames (luma > 200)'),
    ('dark_share', 'share of dark frames (luma < 50)'),
    ('saturation_mean', 'mean saturation'),
    ('motion_mean', 'mean frame-to-frame motion'),
    ('lufs', 'integrated loudness, LUFS'),
    ('true_peak_db', 'true peak, dBTP'),
    ('bpm', 'tempo estimate, BPM'),
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('video')
    ap.add_argument('--fingerprint', default=str(Path(__file__).resolve().parent.parent / 'references' / 'fingerprint.json'))
    a = ap.parse_args()
    ref = json.load(open(a.fingerprint))['ranges']
    m = measure(a.video)
    print(f"{a.video}: {m['duration_s']} s @ {m['fps']} fps")
    bad = 0
    for k, label in KEYS:
        v = m.get(k)
        r = ref.get(k)
        if v is None or r is None:
            print(f'  {label:46s} {v!s:>8}')
            continue
        lo, hi = r['min'], r['max']
        tol = (hi - lo) * 0.15 + (0.5 if k in ('lufs', 'true_peak_db') else 0)
        flag = '' if lo - tol <= v <= hi + tol else '  OUTSIDE'
        if k == 'bpm' and flag:
            flag = '  (tempo: fine if your bed is intentional)'
        bad += flag.startswith('  OUTSIDE')
        print(f'  {label:46s} {v:>8}   ref {lo}..{hi} (median {r["median"]}){flag}')
    print('OK - inside the reference envelope' if not bad else f'{bad} metric(s) outside - see references/editing.md for what to change')


if __name__ == '__main__':
    main()
