import React from 'react';
import {Html5Audio, Sequence, staticFile} from 'remotion';

export type SfxName = 'whoosh' | 'swish' | 'riser' | 'impact' | 'glitch' | 'click' | 'typing' | 'pop' | 'ding' | 'coin' | 'tick';

/** Frames of pre-roll so the transient (not the file start) lands on `at` (30 fps; scaled for others). */
const PREROLL_S: Record<SfxName, number> = {whoosh: 0.31, swish: 0.13, riser: 1.5, impact: 0, glitch: 0, click: 0, typing: 0, pop: 0, ding: 0, coin: 0, tick: 0};

/**
 * One sound effect. `at` = frame where its hit/peak should land. `dur` trims it (typing).
 * Files come from public/sfx (scripts/synth_audio.py writes them).
 */
export const Sfx: React.FC<{name: SfxName; at: number; volume?: number; dur?: number; fps?: number; dir?: string}> = ({name, at, volume = 0.5, dur = 90, fps = 30, dir = 'sfx'}) => {
  const pre = Math.round(PREROLL_S[name] * fps);
  return (
    <Sequence from={Math.max(0, at - pre)} durationInFrames={dur + pre} layout="none" name={`sfx ${name}`}>
      <Html5Audio src={staticFile(`${dir}/${name}.wav`)} volume={volume} />
    </Sequence>
  );
};
