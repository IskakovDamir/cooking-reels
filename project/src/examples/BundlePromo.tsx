// Archetype B - feature bundle. A shot-for-shot rebuild of reference v2 (46.6 s, 1399 frames @30,
// 82.5 BPM trap). Cut points sit at the measured thermal swap frames (351, 481, 566, 712, 884, 1015).
// Bed:  python scripts/synth_audio.py public --bpm 82.5 --bars 16 --drop-beat 6 --end-beat 61
// Replace BRAND / FEATURES / plates. Empty src = labelled placeholder.
import React from 'react';
import {AbsoluteFill, Easing, Html5Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  BeforeAfter, COLOR, EndCard, FONT, Footage, HEADER, SkillHeader, SlashList, SlashWipe, Spark, Sticker, Stream,
  Timeline, sceneStarts, totalFrames, type SceneSpec, type Src, Sfx,
} from '../hfm';

const BRAND = 'Northwind';
const PARTNER = 'Claude Opus 5.5';
const TITLE = ['Production', 'Skills', 'Bundle'];
const plate = (label: string): Src => ({src: '', label});

/** The three stickers in their final (v2 "pose B") layout. `snap` = extra scale on beat snaps. */
const StickerStack: React.FC<{at?: number; snap?: number}> = ({at = 0, snap = 1}) => (
  <AbsoluteFill style={{transform: `scale(${snap})`, transformOrigin: '50% 59%'}}>
    <Sticker text={TITLE[0]} at={at + 1} bg={COLOR.pink} size={10.5} rot={-7} pose={-24} x={49} y={41} />
    <Sticker text={TITLE[1]} at={at + 11} size={13.5} rot={8} pose={-14} x={34} y={66} jitter={[1, 1, 0.62, 0.62, 0.62, 0.8]} />
    <Sticker text={TITLE[2]} at={at + 18} size={12} rot={-10} pose={-20} x={57} y={80} />
  </AbsoluteFill>
);

/** Wordmark: logo file optional (logos are user-supplied). Letters assemble in shuffled order. */
const Wordmark: React.FC<{at?: number; size?: number}> = ({at = 0, size = 6.1}) => {
  const {height} = useVideoConfig();
  const fs = (size / 100) * height * 1.38;
  return (
    <div style={{fontFamily: FONT.ui, fontWeight: 600, fontSize: fs, color: COLOR.ink, letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: fs * 0.3}}>
      <Spark size={size * 1.3} color={COLOR.ink} rays={8} at={at} pop />
      <Stream text={BRAND} start={at + 8} cps={45} tail={4} accent={null} blur={8} />
    </div>
  );
};

// S1-S3 (0-129): lockup builds, stickers flip open, tagline, beat snaps (stand-in for the AI hands), zoom-whip out
const Lockup: React.FC = () => {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  const snaps: [number, number][] = [[76, 1.16], [85, 1.0], [99, 1.03], [107, 0.92], [114, 0.94], [119, 1.06]];
  let snap = 1;
  for (const [at, v] of snaps) snap = interpolate(f, [at, at + 3], [snap, v], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.9, 0.1, 1)});
  const fs = 0.046 * height * 1.38;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: '10.7%', display: 'flex', justifyContent: 'center', transform: 'translateY(-50%)'}}>
        <Wordmark at={2} />
      </div>
      <StickerStack snap={snap} />
      <div style={{position: 'absolute', left: 0, right: 0, top: '86%', textAlign: 'center', fontFamily: FONT.serif, fontSize: fs, color: COLOR.ink}}>
        <Stream text="for" start={19} unit="word" cps={30} tail={8} blur={8} accent={null} />{' '}
        <Spark size={4} color={COLOR.sparkLight} at={18} pop style={{verticalAlign: 'middle'}} />{' '}
        <Stream text="Claude" start={21} unit="word" cps={30} tail={8} blur={8} accent={null} />{' '}
        <span style={{color: COLOR.terracotta}}>
          <Stream text="Opus 5.5" start={22} unit="word" cps={30} tail={8} blur={8} accent={null} />
        </span>
      </div>
    </AbsoluteFill>
  );
};

/** Body area below the 17.4 %H header. */
const Body: React.FC<{children: React.ReactNode}> = ({children}) => <AbsoluteFill style={{top: `${HEADER.heightPct}%`, overflow: 'hidden'}}>{children}</AbsoluteFill>;

type Feature = {name: string; desc: string; dur: number; shots: React.ReactNode};
const FEATURES: Feature[] = [
  {
    name: 'destruction-studio', dur: 186,
    desc: 'Generates destruction scenes: car crashes, building collapses and more. Configures fracturing, debris physics, dust and camera movement, from base model to final animation.',
    shots: (
      <>
        <Sequence durationInFrames={106} layout="none">
          <BeforeAfter before={plate('BEFORE: viewport render')} after={plate('AFTER: final render')} mode="burst" at={46} origin={[22, 60]} />
        </Sequence>
        <Sequence from={106} layout="none">
          <BeforeAfter before={plate('BEFORE: grey model')} after={plate('AFTER: demolition')} at={26} line="#FFFBF8" />
        </Sequence>
      </>
    ),
  },
  {
    name: 'color-grading', dur: 130,
    desc: 'A colour grading skill. Analyzes shots and references to balance exposure, white balance, contrast and saturation while keeping skin tones natural. Every generated node tree stays controllable.',
    shots: <BeforeAfter before={plate('BEFORE: flat log')} after={plate('AFTER: graded')} at={54} tagEnterAt={6} />,
  },
  {
    name: 'exploded-view', dur: 85,
    desc: 'Animates layer-by-layer assembly or disassembly of objects and full scenes. Built for product reveals that show internal mechanics and components.',
    shots: (
      <>
        <Sequence durationInFrames={25} layout="none"><Footage src="" label="render: device" push={0.01} /></Sequence>
        <Sequence from={25} durationInFrames={16} layout="none"><Footage src="" label="macro: parts lift" push={0.01} /></Sequence>
        <Sequence from={41} layout="none"><Footage src="" label="wide: exploded stack" push={0.01} /></Sequence>
      </>
    ),
  },
  {
    name: 'shot-composer', dur: 146,
    desc: 'Builds VFX shots from green-screen footage or existing layers, generating missing passes motion-matched to the source video.',
    shots: (
      <>
        <Sequence durationInFrames={48} layout="none"><BeforeAfter before={plate('plate')} after={plate('alpha matte')} at={11} fast tags={false} /></Sequence>
        <Sequence from={48} durationInFrames={38} layout="none"><BeforeAfter before={plate('alpha matte')} after={plate('composite')} at={0} fast tags={false} /></Sequence>
        <Sequence from={86} layout="none"><BeforeAfter before={plate('composite')} after={plate('final with sky')} at={6} fast tags={false} /></Sequence>
      </>
    ),
  },
  {
    name: 'shot-cleanup', dur: 172,
    desc: 'Cleans up plates: removes markers and unwanted objects while reconstructing clean plates that match texture.',
    shots: (
      <>
        <Sequence durationInFrames={82} layout="none"><BeforeAfter before={plate('BEFORE: site')} after={plate('AFTER: clean valley')} at={36} tagEnterAt={7} /></Sequence>
        <Sequence from={82} layout="none"><BeforeAfter before={plate('BEFORE: studio rig')} after={plate('AFTER: clean studio')} at={43} /></Sequence>
      </>
    ),
  },
  {
    name: 'image-fixer', dur: 131,
    desc: 'Cleans up unnatural textures or unwanted objects, smooths surfaces, fixes visual anomalies and restores detail in noisy areas.',
    shots: (
      <>
        <Sequence durationInFrames={64} layout="none"><BeforeAfter before={plate('BEFORE: portrait')} after={plate('AFTER: portrait')} at={19} fast tagEnterAt={7} /></Sequence>
        <Sequence from={64} layout="none"><BeforeAfter before={plate('BEFORE: kitchen')} after={plate('AFTER: kitchen')} at={27} fast /></Sequence>
      </>
    ),
  },
  {
    name: 'use-touchdesigner', dur: 169,
    desc: 'Creates, tweaks and controls real-time video FX through an agent. Pick effects from the library or describe them with text or image references.',
    shots: <Footage src="" label="AI footage: live FX" push={0.015} />,
  },
];

const Section: React.FC<{feat: Feature; titleAt: number}> = ({feat, titleAt}) => (
  <AbsoluteFill>
    <Body>{feat.shots}</Body>
    <SkillHeader name={feat.name} desc={feat.desc} at={titleAt} icon={<Spark size={9.2} color={COLOR.terracotta} at={titleAt - 2} pop cycle boil />} />
  </AbsoluteFill>
);

// End: lockup replay (no tagline), shrink to .67 and rise, paragraph types at 7.8 chars/f; giant slash wipe; end list
const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  const s = interpolate(f, [29, 40], [1, 0.67], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.09, 0.72, 0, 0.93)});
  const lockup = (
    <AbsoluteFill style={{backgroundColor: COLOR.paper}}>
      <AbsoluteFill style={{transform: `translateY(${(s - 1) * 0.08 * height}px) scale(${s})`, transformOrigin: '50% 38%'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: '10.7%', display: 'flex', justifyContent: 'center', transform: 'translateY(-50%)'}}>
          <Wordmark at={1} />
        </div>
        <StickerStack />
      </AbsoluteFill>
      <div style={{position: 'absolute', left: '16.7%', top: '64.8%', width: '67%', fontFamily: FONT.ui, fontWeight: 500, fontSize: 0.031 * height * 1.38, lineHeight: 1.48, color: COLOR.ink}}>
        <Stream text={`Proprietary ${BRAND} skills built for ${PARTNER} that dramatically accelerate workflows in professional creative software and supercharge production processes for teams of any size.`} start={30} cps={234} tail={9} />
      </div>
    </AbsoluteFill>
  );
  const items = ['project-sorter', 'vectorize', 'cartoon-shaders', 'scene-builder', 'color-grading', 'use-touchdesigner', 'shot-cleanup', 'shot-composer', 'exploded-view'];
  return (
    <AbsoluteFill style={{backgroundColor: COLOR.paper}}>
      <SlashWipe at={78}>{lockup}</SlashWipe>
      {f >= 99 ? <SlashList items={items} start={99} every={6.5} size={4.2} pitch={9.75} x={37.9} y={46} scrollAt={111} scrollFrames={45} /> : null}
    </AbsoluteFill>
  );
};

const LIST = ['vectorize', 'project-sorter', 'cartoon-shaders', 'scene-builder', 'color-grading', 'use-touchdesigner', 'image-fixer', 'shot-cleanup', 'shot-composer', 'exploded-view'];
const thermal = {type: 'thermal' as const};
const titleAt = [7, 6, 5, 3, 5, 6, 4];

export const BUNDLE_SCENES: SceneSpec[] = [
  {name: 'lockup + stickers', dur: 130, bg: 'paper', out: {type: 'zoom'}, el: <Lockup />},
  {name: 'slash list', dur: 35, bg: 'list', el: <SlashList items={LIST} start={4} every={3.2} y={38} scrollAt={20} scrollFrames={15} />},
  ...FEATURES.map((feat, i): SceneSpec => ({
    name: `/${feat.name}`,
    dur: feat.dur,
    bg: 'white',
    in: i === 0 ? {type: 'rise'} : thermal,
    out: i < FEATURES.length - 1 ? thermal : {type: 'fade', frames: 8},
    el: <Section feat={feat} titleAt={titleAt[i]} />,
  })),
  {name: 'outro', dur: 157, bg: 'white', el: <Outro />},
  {name: 'end card', dur: 58, bg: 'white', el: <EndCard lines={[`Production skills bundle for ${PARTNER}`, `Available now on ${BRAND.toLowerCase()}.ai`]} at={0} />},
];

export const BUNDLE_FRAMES = totalFrames(BUNDLE_SCENES); // 1399

export const BundlePromo: React.FC<{music?: string}> = ({music}) => {
  const st = sceneStarts(BUNDLE_SCENES);
  return (
    <AbsoluteFill>
      <Timeline scenes={BUNDLE_SCENES} />
      {music ? <Html5Audio src={staticFile(music)} /> : null}
      <Sfx name="whoosh" at={st[1]} volume={0.45} />
      {st.slice(3, 9).map((s, i) => (
        <Sfx key={i} name="whoosh" at={s} volume={0.35} />
      ))}
      <Sfx name="swish" at={st[9] + 78} volume={0.4} />
      <Sfx name="impact" at={st[1]} volume={0.4} />
    </AbsoluteFill>
  );
};

