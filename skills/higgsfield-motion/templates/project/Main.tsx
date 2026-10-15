// Your film. Write it as a beat sheet: one SceneSpec per shot (see references/editing.md).
// Durations come from beats so cuts land on the grid without drift.
import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile} from 'remotion';
import {
  COLOR, EndCard, FONT, Footage, Lockup, Scramble, Sfx, Stream, Timeline, beatDurations, beatGrid, sceneStarts, totalFrames,
  type SceneSpec,
} from './hfm';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const BPM = 85; // 82-88 trap for demos/bundles/stories, ~132 drive for offers
const g = beatGrid(BPM, FPS);

// beats per scene; the first content scene starts on the drop (synth_audio.py --drop-beat = sum of intro beats)
const BEATS = [5, 4, 3, 3, 4];
const D = beatDurations(g, BEATS);

const H: React.CSSProperties = {fontFamily: FONT.display, fontWeight: 800, color: COLOR.ink, letterSpacing: '-0.035em', lineHeight: 0.98, textAlign: 'center'};

export const SCENES: SceneSpec[] = [
  {name: 'lockup', dur: D[0], bg: 'paper', out: {type: 'zoom'}, el: <Lockup left={{name: 'Brand'}} right={{name: 'Partner'}} pill="What it is" />},
  {name: 'first content (drop)', dur: D[1], bg: 'none', in: {type: 'blur'}, el: <Footage src="" label="hero plate" />},
  {
    name: 'claim', dur: D[2], bg: 'white', in: {type: 'blur'},
    el: (
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{...H, fontSize: 160}}><Scramble text="ONE CLAIM" start={2} /></div>
      </AbsoluteFill>
    ),
  },
  {
    name: 'status', dur: D[3], bg: 'white', in: {type: 'blur'},
    el: (
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontFamily: FONT.ui, fontSize: 64}}>
        <Stream text="**One bold lead.** Then what the agent is doing." start={2} cps={60} />
      </AbsoluteFill>
    ),
  },
  {name: 'end card', dur: D[4], bg: 'white', el: <EndCard lines={['Product name', 'Available now on brand.ai']} at={0} />},
];

export const MAIN_FRAMES = totalFrames(SCENES);

export const Main: React.FC<{music?: string}> = ({music = 'music.wav'}) => {
  const st = sceneStarts(SCENES);
  return (
    <AbsoluteFill>
      <Timeline scenes={SCENES} />
      {music ? <Html5Audio src={staticFile(music)} /> : null}
      <Sfx name="whoosh" at={st[1]} volume={0.4} />
    </AbsoluteFill>
  );
};
