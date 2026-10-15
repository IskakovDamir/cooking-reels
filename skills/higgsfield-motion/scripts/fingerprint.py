#!/usr/bin/env python3
"""Measure the style fingerprint of a video (the same metrics the reference corpus was measured with).

  python fingerprint.py video.mp4 [more.mp4 ...] [--json out.json]

Per video: duration, fps, hard cuts / 10 s, focus pulls (blur-in/out valleys) / 10 s, all section
events / 10 s, median gap between events, share of time spent blurred, light / dark frame share,
mean saturation, motion energy, integrated loudness, true peak, tempo estimate.
Frames are analysed at 320x180 so numbers are comparable across resolutions.
Needs numpy, opencv-python (cv2) and ffmpeg/ffprobe on PATH; scipy is optional.
"""
import argparse
import json
import re
import subprocess
import sys

import numpy as np

W, H = 320, 180


def probe(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate', '-show_entries',
                          'format=duration', '-of', 'json', path], capture_output=True, text=True, check=True).stdout
    j = json.loads(out)
    num, den = j['streams'][0]['r_frame_rate'].split('/')
    return float(num) / float(den), float(j['format']['duration'])


def frames(path):
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', path, '-vf', f'scale={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    while True:
        b = p.stdout.read(W * H * 3)
        if len(b) < W * H * 3:
            break
        yield np.frombuffer(b, np.uint8).reshape(H, W, 3).astype(np.float32)


def laplace_var(g):
    lap = -4 * g[1:-1, 1:-1] + g[:-2, 1:-1] + g[2:, 1:-1] + g[1:-1, :-2] + g[1:-1, 2:]
    return float(lap.var())


def peaks(x, height=None, distance=1, prominence=None):
    try:
        from scipy.signal import find_peaks
        kw = {'distance': max(1, int(distance))}
        if height is not None:
            kw['height'] = height
        if prominence is not None:
            kw['prominence'] = prominence
        return find_peaks(x, **kw)[0]
    except Exception:
        idx = [i for i in range(1, len(x) - 1) if x[i] >= x[i - 1] and x[i] > x[i + 1] and (height is None or x[i] >= height)]
        out = []
        for i in idx:
            if not out or i - out[-1] >= distance:
                out.append(i)
        return np.array(out, int)


def rolling_max(x, size):
    h = size // 2
    return np.array([x[max(0, i - h):i + h + 1].max() for i in range(len(x))])


def loudness(path):
    err = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', path, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    tail = err[err.rfind('Summary'):]
    i = re.search(r'I:\s+(-?[\d.]+) LUFS', tail)
    pk = re.search(r'Peak:\s+(-?[\d.]+|-inf) dBFS', tail)
    return (float(i.group(1)) if i else None), (float(pk.group(1)) if pk and pk.group(1) != '-inf' else None)


def tempo(path):
    try:
        raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', '22050', '-f', 's16le', '-'], capture_output=True, check=True).stdout
    except subprocess.CalledProcessError:
        return None
    x = np.frombuffer(raw, '<i2').astype(np.float32) / 32768
    if len(x) < 22050 * 4:
        return None
    hop, nfft = 256, 2048
    nfr = (len(x) - nfft) // hop
    win = np.hanning(nfft)
    mags = np.array([np.log1p(100 * np.abs(np.fft.rfft(x[i * hop:i * hop + nfft] * win))) for i in range(nfr)])
    on = np.maximum(0, np.diff(mags, axis=0)).sum(1)
    on = on - on.mean()
    ac = np.correlate(on, on, 'full')[len(on) - 1:]
    fr = 22050 / hop
    bpms = np.arange(70, 181, 0.25)
    sc = np.array([np.interp(60 / b * fr, np.arange(len(ac)), ac) + 0.5 * np.interp(120 / b * fr, np.arange(len(ac)), ac) for b in bpms])
    best = float(bpms[int(np.argmax(sc))])
    # half-time trap: dense 1/16 hats pull the estimate to double time; prefer the half if it is nearly as strong
    if best > 140:
        half = best / 2
        i = int(np.argmin(np.abs(bpms - half)))
        if sc[i] >= 0.6 * sc.max():
            return float(bpms[i])
    return best


def measure(path):
    fps, dur = probe(path)
    luma, sat, sharp, hd, diff = [], [], [], [], []
    prev = prevh = None
    for f in frames(path):
        g = f @ np.array([0.299, 0.587, 0.114], np.float32)
        mx, mn = f.max(2), f.min(2)
        sat.append(float(np.where(mx > 0, (mx - mn) / np.maximum(mx, 1), 0).mean()))
        luma.append(float(g.mean()))
        sharp.append(laplace_var(g))
        h = np.concatenate([np.histogram(f[..., c], bins=16, range=(0, 256))[0] for c in range(3)]).astype(np.float32)
        h /= h.sum()
        hd.append(float(np.abs(h - prevh).sum()) if prevh is not None else 0.0)
        diff.append(float(np.abs(g - prev).mean()) if prev is not None else 0.0)
        prev, prevh = g, h
    luma, sat, hd, diff = map(np.array, (luma, sat, hd, diff))
    sh = np.log10(np.array(sharp) + 1)
    n = len(sh)
    cuts = peaks(hd, height=0.6, distance=4)
    rm = rolling_max(sh, int(fps * 2))
    vals = [v for v in peaks(-sh, distance=int(fps * 0.4), prominence=0.4) if rm[v] - sh[v] > 0.5]
    ev = np.unique(np.concatenate([cuts, np.array(vals, int)])) if n else np.array([])
    ev = ev[np.concatenate([[True], np.diff(ev) > 2])] if len(ev) else ev
    blurred = (sh < rm - 0.35).mean() if n else 0
    lufs, tp = loudness(path)
    secs = n / fps
    return {
        'file': path, 'fps': round(fps, 3), 'duration_s': round(dur, 2), 'frames': n,
        'cuts_per_10s': round(len(cuts) / secs * 10, 2),
        'focus_pulls_per_10s': round(len(vals) / secs * 10, 2),
        'events_per_10s': round(len(ev) / secs * 10, 2),
        'median_event_gap_s': round(float(np.median(np.diff(ev))) / fps, 2) if len(ev) > 2 else None,
        'blurred_share': round(float(blurred), 3),
        'light_share': round(float((luma > 200).mean()), 3),
        'dark_share': round(float((luma < 50).mean()), 3),
        'saturation_mean': round(float(sat.mean()), 3),
        'motion_mean': round(float(diff.mean()), 2),
        'lufs': lufs, 'true_peak_db': tp, 'bpm': tempo(path),
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('videos', nargs='+')
    ap.add_argument('--json')
    a = ap.parse_args()
    res = [measure(v) for v in a.videos]
    for r in res:
        print(json.dumps(r, ensure_ascii=False))
    if a.json:
        json.dump(res, open(a.json, 'w'), indent=1)


if __name__ == '__main__':
    sys.exit(main())
