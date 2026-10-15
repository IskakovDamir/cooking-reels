// Core helpers: easing, progress, units, seeded noise. Everything is in frames.
import {Easing, interpolate, interpolateColors, random, useVideoConfig} from 'remotion';

export type EaseFn = (t: number) => number;

/** Curves used by the style. `expoOut` is the default for every entry (fast start, long settle). */
export const E = {
  linear: (t: number) => t,
  expoOut: Easing.bezier(0.16, 1, 0.3, 1),
  quartOut: Easing.bezier(0.25, 1, 0.5, 1),
  cubicOut: Easing.bezier(0.33, 1, 0.68, 1),
  sineOut: Easing.bezier(0.61, 1, 0.88, 1),
  expoIn: Easing.bezier(0.7, 0, 0.84, 0),
  cubicIn: Easing.bezier(0.32, 0, 0.67, 0),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  expoInOut: Easing.bezier(0.87, 0, 0.13, 1),
  backOut: Easing.bezier(0.34, 1.56, 0.64, 1),
} satisfies Record<string, EaseFn>;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0..1 progress of an animation that starts at `start` and lasts `dur` frames. */
export const prog = (frame: number, start: number, dur: number, ease: EaseFn = E.expoOut) =>
  interpolate(frame, [start, start + Math.max(1, dur)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

/** Triangle 0 -> 1 -> 0 over [start, start + dur]. */
export const pulse = (frame: number, start: number, dur: number) => {
  const t = (frame - start) / Math.max(1, dur);
  return t <= 0 || t >= 1 ? 0 : 1 - Math.abs(t * 2 - 1);
};

export const mixColor = (t: number, from: string, to: string) =>
  interpolateColors(clamp01(t), [0, 1], [from, to]);

/**
 * Short side of the frame. Every size in the library is authored at 1080 px of SHORT side, so a value
 * means the same thing in 16:9 (1920x1080) and in 9:16 (1080x1920). Positions stay in % of the frame.
 */
export const useShort = () => {
  const {width, height} = useVideoConfig();
  return Math.min(width, height);
};

/** Sizes are authored as % of frame height (vh) / width (vw) so any resolution works. */
export const useUnits = () => {
  const {width, height, fps} = useVideoConfig();
  return {
    width,
    height,
    fps,
    vh: (pct: number) => (pct / 100) * height,
    vw: (pct: number) => (pct / 100) * width,
    /** px authored at 1080p, scaled to the current height */
    p: (px1080: number) => (px1080 / 1080) * height,
  };
};

/** Deterministic noise in [-1, 1] that changes every `hold` frames (for jitter, glitches). */
export const jitter = (seed: string | number, frame: number, hold = 1) =>
  random(`${seed}-${Math.floor(frame / hold)}`) * 2 - 1;

/** Seconds -> frames. */
export const sec = (s: number, fps: number) => Math.round(s * fps);
