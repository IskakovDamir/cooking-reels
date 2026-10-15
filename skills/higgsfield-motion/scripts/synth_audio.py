#!/usr/bin/env python3
"""Synthesize a royalty-free (CC0, generated from scratch) music bed + SFX kit in the measured style.

The four references run on a dark, sub-heavy trap bed at 82-88 BPM (half-time snare, 1/16 hats with
rolls, long 808s) or, for the offer/promo type, a 130-135 BPM drive. Their structure is always:

  filtered intro (no sub, logo lockup)  ->  DROP on the first content cut (~2.7-4.3 s in)
  -> main  ->  optional break (sub out, riser)  ->  second drop  ->  stop on the end card + tail

Usage
  synth_audio.py OUT_DIR --bpm 85 --bars 16 --drop-beat 6 [--breaks 9] [--style trap|drive]
                 [--key F] [--seed 7] [--end-beat 60] [--lufs -14] [--tp -3]

  --drop-beat  beat (0-based, may be fractional) where the drop lands = start of your first content
               scene. At 85 BPM / 30 fps one beat = 21.18 frames: drop-beat 6 = frame 127 = 4.24 s.
  --breaks     bar numbers (0-based) whose bar is a break: drums + sub out, riser into the next bar.
  --gaps       pre-reveal 808 cuts as BEAT:LENGTH (beats), e.g. 15.5:0.5 22:1 - sub and kick drop out,
               hats keep going; put the reveal cut at BEAT+LENGTH, where the 808 returns.
  --end-beat   beat where the music stops with a final hit (default: last beat); the hit rings ~1.5 s.

Writes  OUT_DIR/music.wav (mastered, use this), OUT_DIR/music_raw.wav, OUT_DIR/sfx/*.wav and prints
the frame of every structural point for 24/25/30/60 fps. Needs numpy (+ scipy if present, faster);
ffmpeg on PATH for mastering.
"""
import argparse
import json
import shutil
import subprocess
import wave
from pathlib import Path

import numpy as np

try:
    from scipy.signal import lfilter
except Exception:  # pragma: no cover - slow fallback
    def lfilter(b, a, x):
        y = np.zeros_like(x)
        for n in range(len(x)):
            acc = b[0] * x[n]
            for k in range(1, len(b)):
                if n - k >= 0:
                    acc += b[k] * x[n - k]
            for k in range(1, len(a)):
                if n - k >= 0:
                    acc -= a[k] * y[n - k]
            y[n] = acc / a[0]
        return y

SR = 48000
NOTE = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def write_wav(path, x):
    x = np.asarray(x, np.float64)
    if x.ndim == 1:
        x = np.stack([x, x], 1)
    peak = np.abs(x).max() or 1.0
    if peak > 0.99:
        x = x / peak * 0.99
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype('<i2').tobytes())


# ---------- filters ----------
def biquad(x, kind, fc, q=0.707):
    fc = min(fc, SR * 0.45)
    w0 = 2 * np.pi * fc / SR
    al = np.sin(w0) / (2 * q)
    c = np.cos(w0)
    if kind == 'lp':
        b = [(1 - c) / 2, 1 - c, (1 - c) / 2]
    elif kind == 'hp':
        b = [(1 + c) / 2, -(1 + c), (1 + c) / 2]
    else:  # band-pass, constant peak gain
        b = [al, 0, -al]
    a = [1 + al, -2 * c, 1 - al]
    return lfilter(np.array(b) / a[0], np.array(a) / a[0], x)


def sweep_lp(x, f0, f1, q=0.9, blocks=64):
    """Time-varying low-pass (block-wise biquad), exponential sweep f0 -> f1."""
    out = np.zeros_like(x)
    n = len(x)
    edges = np.linspace(0, n, blocks + 1).astype(int)
    for i in range(blocks):
        a, b = edges[i], edges[i + 1]
        fc = f0 * (f1 / f0) ** (i / max(1, blocks - 1))
        seg = x[max(0, a - 2048):b]
        y = biquad(seg, 'lp', fc, q)
        out[a:b] = y[-(b - a):]
    return out


def env(n, a=0.002, d=0.3):
    t = np.arange(n) / SR
    att = np.clip(t / max(a, 1e-4), 0, 1)
    return att * np.exp(-t / d)


def sat(x, drive=2.0):
    return np.tanh(x * drive) / np.tanh(drive)


# ---------- instruments ----------
def kick(rng):
    n = int(0.32 * SR)
    t = np.arange(n) / SR
    f = 48 + 140 * np.exp(-t / 0.03)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.13)
    click = biquad(rng.standard_normal(n), 'hp', 3000) * np.exp(-t / 0.003) * 0.4
    return sat(body * 1.2 + click, 1.5)


def b808(freq, dur, glide_from=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = np.full(n, freq)
    if glide_from:
        g = np.exp(-t / 0.06)
        f = freq + (glide_from - freq) * g
    f = f * (1 + 0.6 * np.exp(-t / 0.012))  # punch
    x = np.sin(2 * np.pi * np.cumsum(f) / SR)
    e = np.clip(t / 0.004, 0, 1) * np.exp(-t / max(0.35, dur * 0.9))
    e[-int(0.02 * SR):] *= np.linspace(1, 0, int(0.02 * SR))
    return sat(x * e, 2.6) * 0.9


def clap(rng):
    n = int(0.35 * SR)
    x = np.zeros(n)
    noise = biquad(rng.standard_normal(n), 'bp', 1600, 0.8)
    for off in (0, 0.009, 0.019, 0.03):
        i = int(off * SR)
        x[i:] += noise[: n - i] * env(n - i, 0.0005, 0.012) * 0.6
    x += noise * env(n, 0.001, 0.12) * 0.7
    snap = np.sin(2 * np.pi * 220 * np.arange(n) / SR) * env(n, 0.0005, 0.03) * 0.5
    return sat(x + snap, 1.4) * 0.8


def hat(rng, open_=False):
    n = int((0.25 if open_ else 0.05) * SR)
    x = biquad(rng.standard_normal(n), 'hp', 8000)
    return x * env(n, 0.0005, 0.09 if open_ else 0.012) * (0.35 if open_ else 0.3)


def bell(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    mod = np.sin(2 * np.pi * freq * 3.5 * t) * 2.2 * np.exp(-t / 0.25)
    x = np.sin(2 * np.pi * freq * t + mod) * env(n, 0.002, 0.45)
    return x * 0.22


def pad(freqs, dur, rng):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for f in freqs:
        for det in (-0.12, 0, 0.12):
            ph = rng.random()
            x += 2 * ((t * f * 2 ** (det / 12) + ph) % 1) - 1
    x = biquad(x / (len(freqs) * 3), 'lp', 900, 0.7)
    e = np.minimum(1, t / 0.6) * np.minimum(1, (dur - t) / 0.4).clip(0, 1)
    return x * e * 0.35


def pluck(freq, dur, rng):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = (2 * ((t * freq) % 1) - 1) + 0.5 * (2 * ((t * freq * 1.005) % 1) - 1)
    x = biquad(x, 'lp', 2200, 1.4) * env(n, 0.001, 0.09)
    return x * 0.3


def air(n, rng):
    x = biquad(rng.standard_normal(n), 'bp', 6000, 0.5) * 0.05
    return x + biquad(rng.standard_normal(n), 'bp', 900, 0.7) * 0.03


# ---------- SFX ----------
def sfx_whoosh(rng, dur=0.55, f0=400, f1=5000, peak=0.6):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = rng.standard_normal(n)
    out = np.zeros(n)
    blocks = 40
    edges = np.linspace(0, n, blocks + 1).astype(int)
    for i in range(blocks):
        a, b = edges[i], edges[i + 1]
        u = i / (blocks - 1)
        fc = f0 * (f1 / f0) ** (u / peak if u < peak else (1 - (u - peak) / (1 - peak)))
        seg = biquad(x[max(0, a - 1024):b], 'bp', fc, 1.2)
        out[a:b] = seg[-(b - a):]
    e = np.where(t < dur * peak, (t / (dur * peak)) ** 2, np.exp(-(t - dur * peak) / (dur * 0.18)))
    return out * e * 1.6


def sfx_riser(rng, dur=1.6):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 180 * (8 ** (t / dur))
    s = 2 * ((np.cumsum(f) / SR) % 1) - 1
    noise = biquad(rng.standard_normal(n), 'hp', 2000) * (t / dur) ** 2
    x = biquad(s, 'lp', 3000) * 0.5 + noise * 0.4
    return x * (t / dur) ** 1.5


def sfx_impact(rng, dur=1.4):
    n = int(dur * SR)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(38 + 90 * np.exp(-t / 0.05)) / SR) * np.exp(-t / 0.45)
    crash = biquad(rng.standard_normal(n), 'hp', 3500) * np.exp(-t / 0.35) * 0.35
    return sat(boom * 1.3 + crash, 1.6)


def sfx_glitch(rng, dur=0.32):
    n = int(dur * SR)
    out = np.zeros(n)
    i = 0
    while i < n:
        L = int(rng.uniform(0.01, 0.04) * SR)
        f = rng.choice([180, 360, 720, 1440, 2880])
        tt = np.arange(min(L, n - i)) / SR
        sq = np.sign(np.sin(2 * np.pi * f * tt))
        crush = np.round(sq * rng.uniform(2, 6)) / 6
        out[i:i + len(tt)] = crush * rng.uniform(0.3, 0.8) * (rng.random() > 0.2)
        i += L
    return biquad(out, 'hp', 150) * 0.6


def sfx_click(rng):
    n = int(0.06 * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 1900 * t) * env(n, 0.0003, 0.008) + biquad(rng.standard_normal(n), 'hp', 5000) * env(n, 0.0002, 0.003) * 0.5) * 0.7


def sfx_typing(rng, dur=4.0, cps=16):
    n = int(dur * SR)
    out = np.zeros(n)
    tt = 0.0
    while tt < dur - 0.05:
        i = int(tt * SR)
        L = int(0.025 * SR)
        k = biquad(rng.standard_normal(L), 'bp', rng.uniform(2500, 4500), 2.0) * env(L, 0.0002, 0.004)
        out[i:i + L] += k * rng.uniform(0.25, 0.45)
        tt += (1 / cps) * rng.uniform(0.6, 1.4)
    return out


def sfx_pop(rng):
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    f = 300 + 900 * np.exp(-t / 0.02)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.0005, 0.06)
    shimmer = sum(np.sin(2 * np.pi * h * t) * env(n, 0.002, 0.18) for h in (2093, 2637, 3136)) * 0.12
    return body * 0.8 + shimmer


def sfx_ding(rng):
    n = int(1.0 * SR)
    t = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * h * t) * env(n, 0.001, d) * g for h, d, g in ((1318.5, 0.5, 0.5), (1975.5, 0.35, 0.3), (2637, 0.25, 0.2)))


def sfx_coin(rng):
    n = int(0.7 * SR)
    t = np.arange(n) / SR
    a = sum(np.sin(2 * np.pi * h * t) * env(n, 0.0005, 0.25) for h in (2200, 3300, 4950)) * 0.25
    b = np.zeros(n)
    i = int(0.07 * SR)
    b[i:] = a[: n - i] * 0.8
    return a + b


def sfx_tick(rng):
    n = int(0.03 * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * 3200 * t) * env(n, 0.0002, 0.004) * 0.5


# ---------- arrangement ----------
def build(args):
    rng = np.random.default_rng(args.seed)
    spb = 60.0 / args.bpm
    beats_total = args.bars * 4
    end_beat = args.end_beat if args.end_beat is not None else beats_total
    length = end_beat * spb + 1.8
    n = int(length * SR)
    drums = np.zeros(n)
    bass = np.zeros(n)
    music = np.zeros(n)
    root = 36 + NOTE[args.key]  # C2.. octave for 808

    def put(buf, x, at_s, gain=1.0):
        i = int(at_s * SR)
        if i >= len(buf):
            return
        m = min(len(x), len(buf) - i)
        buf[i:i + m] += x[:m] * gain

    K, CL = kick(rng), clap(rng)
    breaks = set(args.breaks or [])
    drop = args.drop_beat
    minor = [0, 3, 5, 7, 10, 12]
    bass_pat = [0, 0, -2, -4] if args.style == 'trap' else [0, 0, 3, -2]
    mel = [12, 10, 7, 10, 15, 12, 10, 7]
    for bar in range(args.bars):
        b0 = bar * 4
        if b0 >= end_beat:
            break
        in_intro = b0 + 4 <= drop
        is_break = bar in breaks
        chord_root = root + 12 + bass_pat[bar % 4]
        put(music, pad([hz(chord_root + 12), hz(chord_root + 15), hz(chord_root + 19)], 4 * spb + 0.3, rng), b0 * spb, 1.0)
        for j, st in enumerate(mel):
            if (j % 2 == 1 and rng.random() < 0.4) or (b0 + j * 0.5) >= end_beat:
                continue
            put(music, bell(hz(root + 36 + st + bass_pat[bar % 4] * 0), 0.6), (b0 + j * 0.5) * spb, 0.8)
        if not is_break:
            arp = [0, 7, 12, 15, 12, 7, 3, 7]
            for j in range(16):
                if (b0 + j / 4) >= end_beat:
                    break
                put(music, pluck(hz(chord_root + 24 + arp[j % 8]), spb / 2, rng), (b0 + j / 4) * spb, 0.55 if (b0 + j / 4) >= drop else 0.35)
        for s16 in range(16):
            beat = b0 + s16 / 4
            if beat >= end_beat:
                break
            post_drop = beat >= drop
            t = beat * spb
            if args.style == 'trap':
                hat_on = s16 % 2 == 0 or post_drop or (bar % 2 == 1 and s16 >= 12)
                if hat_on and not is_break:
                    put(drums, hat(rng), t, (0.95 if s16 % 2 == 0 else 0.55) if post_drop else 0.5)
                    if bar % 2 == 1 and s16 >= 12:  # 1/32 roll at the end of every second bar
                        put(drums, hat(rng), t + spb / 8, 0.6)
                if not post_drop or is_break:
                    continue
                if s16 in (0, 6, 10) or (bar % 2 and s16 == 14):
                    put(drums, K, t)
                    glide = hz(chord_root + 7) if s16 == 10 and bar % 2 else None
                    put(bass, b808(hz(chord_root), spb * (1.5 if s16 == 0 else 1.0), glide), t)
                if s16 == 8:
                    put(drums, CL, t, 0.9)
                if s16 == 14 and bar % 4 == 3:
                    put(drums, hat(rng, True), t, 0.8)
            else:  # drive: 130+ BPM, kick on every beat, offbeat 808 pumping, clap 2 & 4
                if not is_break:
                    put(drums, hat(rng), t, 0.7 if post_drop else 0.4)
                if not post_drop or is_break:
                    continue
                if s16 % 4 == 0:
                    put(drums, K, t)
                if s16 % 4 == 2:
                    put(bass, b808(hz(chord_root), spb * 0.45), t, 0.9)
                if s16 in (4, 12):
                    put(drums, CL, t, 0.85)
        if is_break:
            put(music, sfx_riser(rng, 4 * spb), b0 * spb, 0.6)

    # intro: everything low-passed, sweep opens into the drop; riser + reverse swell into the drop
    drop_s = drop * spb
    di = int(drop_s * SR)
    if di > SR * 0.3:
        seg = music[:di].copy()
        music[:di] = sweep_lp(seg, 500, 6000)
        put(music, sfx_riser(rng, min(drop_s, 2.5)), max(0, drop_s - min(drop_s, 2.5)), 0.55)
    put(drums, sfx_impact(rng), drop_s, 0.55)
    # final hit and tail
    end_s = end_beat * spb
    music[int(end_s * SR):] *= np.exp(-np.arange(n - int(end_s * SR)) / (0.35 * SR))
    put(drums, sfx_impact(rng), end_s, 0.9)
    put(bass, b808(hz(root), 1.6), end_s, 1.0)

    for g in args.gaps or []:
        b, L = (float(v) for v in g.split(':'))
        a0, a1 = int(b * spb * SR), int((b + L) * spb * SR)
        fade = int(0.01 * SR)
        for buf in (bass, drums):
            seg = buf[a0:a1]
            if len(seg) > 2 * fade:
                w = np.ones(len(seg))
                w[:fade] = np.linspace(1, 0, fade)
                w[fade:] = 0
                if buf is drums:  # keep hats in the gap: only notch the low end
                    seg[:] = seg - biquad(seg, 'lp', 180) * (1 - w)
                else:
                    seg[:] = seg * w
        put(music, sfx_riser(rng, max(0.3, L * spb)), b * spb, 0.5)
    # sum
    music += air(n, rng) * np.clip(np.arange(n) / (SR * 1.0), 0, 1)
    mix = drums * 0.85 + bass * 0.95 + music * 0.7
    mix = biquad(mix, 'hp', 25)
    mix = sat(mix * 0.8, 0.8)
    return mix, dict(spb=spb, drop_s=drop_s, end_s=end_s)


def master(raw, out, lufs, tp):
    if not shutil.which('ffmpeg'):
        print('ffmpeg not found - copy music_raw.wav and master it yourself (scripts/master.sh)')
        return
    j = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', str(raw), '-af', f'loudnorm=I={lufs}:TP={tp}:LRA=6:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
    m = json.loads(j[j.rfind('{'):j.rfind('}') + 1])
    flt = (f"loudnorm=I={lufs}:TP={tp}:LRA=6:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
           f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    subprocess.run(['ffmpeg', '-hide_banner', '-v', 'error', '-y', '-i', str(raw), '-af', flt, '-ar', str(SR), str(out)], check=True)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('out')
    ap.add_argument('--bpm', type=float, default=85)
    ap.add_argument('--bars', type=int, default=16)
    ap.add_argument('--drop-beat', type=float, default=6)
    ap.add_argument('--breaks', type=int, nargs='*', default=[])
    ap.add_argument('--end-beat', type=float, default=None)
    ap.add_argument('--gaps', nargs='*', default=[])
    ap.add_argument('--style', choices=['trap', 'drive'], default='trap')
    ap.add_argument('--key', default='F', choices=list(NOTE))
    ap.add_argument('--seed', type=int, default=7)
    ap.add_argument('--lufs', type=float, default=-14.0)
    ap.add_argument('--tp', type=float, default=-3.0)
    args = ap.parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    mix, info = build(args)
    write_wav(out / 'music_raw.wav', mix * 0.8)
    master(out / 'music_raw.wav', out / 'music.wav', args.lufs, args.tp)
    rng = np.random.default_rng(args.seed + 1)
    kit = {
        'whoosh': sfx_whoosh(rng), 'swish': sfx_whoosh(rng, 0.28, 800, 7000, 0.5), 'riser': sfx_riser(rng),
        'impact': sfx_impact(rng), 'glitch': sfx_glitch(rng), 'click': sfx_click(rng), 'typing': sfx_typing(rng),
        'pop': sfx_pop(rng), 'ding': sfx_ding(rng), 'coin': sfx_coin(rng), 'tick': sfx_tick(rng),
    }
    for k, v in kit.items():
        write_wav(out / 'sfx' / f'{k}.wav', v / (np.abs(v).max() or 1) * 0.8)
    print(f"bpm {args.bpm}  beat = {info['spb']:.4f} s  style {args.style}")
    for fps in (24, 25, 30, 60):
        bf = info['spb'] * fps
        print(f"  {fps} fps: beat = {bf:.3f} f, bar = {bf * 4:.2f} f, drop at frame {round(info['drop_s'] * fps)}, "
              f"final hit at frame {round(info['end_s'] * fps)}, file ends at frame {round((info['end_s'] + 1.8) * fps)}")
    print(f"wrote {out / 'music.wav'} and {len(kit)} SFX in {out / 'sfx'}")


if __name__ == '__main__':
    main()
