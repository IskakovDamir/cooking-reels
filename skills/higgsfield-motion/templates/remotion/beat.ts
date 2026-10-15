// Beat grid helpers. Everything in frames; fractional frames per beat are handled by rounding once.
// The references run at 82-88 BPM (trap, half-time) or ~132 BPM (drive). At 85 BPM / 30 fps a beat is
// 21.18 frames, so "4 beats" is not "84 frames" forever: always round from the running beat count.

export type BeatGrid = {bpm: number; fps: number; offset: number; beat: number; bar: number};

export const beatGrid = (bpm: number, fps: number, offset = 0): BeatGrid => {
  const beat = (60 / bpm) * fps;
  return {bpm, fps, offset, beat, bar: beat * 4};
};

/** Frame of beat n (0-based, fractions allowed: onBeat(g, 2.5) = the "and" of beat 3). */
export const onBeat = (g: BeatGrid, n: number) => Math.round(g.offset + n * g.beat);

/** Scene durations from beat lengths without drift: [4, 2, 2.5] -> frames that sum exactly to onBeat(8.5). */
export const beatDurations = (g: BeatGrid, beats: number[]) => {
  let acc = 0;
  return beats.map((b) => {
    const a = onBeat(g, acc);
    acc += b;
    return onBeat(g, acc) - a;
  });
};

/** Snap a frame to the nearest subdivision (1 = beat, 2 = 8th, 4 = 16th). */
export const snap = (g: BeatGrid, frame: number, subdivision = 2) => {
  const step = g.beat / subdivision;
  return Math.round(g.offset + Math.round((frame - g.offset) / step) * step);
};
