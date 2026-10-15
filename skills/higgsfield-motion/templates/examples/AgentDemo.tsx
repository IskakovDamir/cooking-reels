// Archetype A - agent workflow demo (Claude collab). A shot-for-shot rebuild of reference v1
// (41.25 s; measured at 24 fps, every frame number here converted to 30 fps: x1.25).
// Bed:  python scripts/synth_audio.py public --bpm 85 --bars 15 --drop-beat 5.25 --gaps 15.5:0.75 18.75:0.5 --end-beat 58.5
// Replace BRAND, PROMPT, the steps and the plates. Empty src = labelled placeholder.
import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, interpolate, interpolateColors, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  CameraPath, ClaudeComposer, ClaudeLines, ClaudeStatus, Choice, DetectBox, E, EndCard, FONT, FileCard, Footage, HeroWord, IconTile,
  Lockup, MediaFill, MediaGrid, PinkReveal, Pop, Sfx, Spark, Tag, Timeline, UI, sceneStarts, totalFrames, type SceneSpec,
} from '../hfm';

const BRAND = 'Northwind';
const PROMPT = 'Turn this rust bucket into a monster truck';
const HERO = 'OPUS 5.5';
const icon = (size = 92) => <IconTile size={size}>✦</IconTile>;

// 1. intro: lockup builds, holds at 1.11x, lifts 15.6 %H; hero word blurs in on twos, swaps materials, light-burn to coral
const Intro: React.FC = () => (
  <AbsoluteFill>
    <Lockup left={{name: `${BRAND} MCP`, weight: 700}} right={{name: 'Claude', font: FONT.serif, weight: 500}} at={6} size={6.3} y={33.7} liftAt={30} />
    <HeroWord text={HERO} at={40} textures={[]} swaps={[46, 54, 60, 64, 70]} burnAt={72} />
  </AbsoluteFill>
);

// 3. composer: the photo shrinks into the attachment slot (x0.71/f), prompt types with the Claude ramp,
// file tile pops, camera accelerates left, whip-cuts to a 2.1x close-up of the send button, press.
const ShrinkIntoThumb: React.FC = () => {
  const f = useCurrentFrame();
  const {height, width} = useVideoConfig();
  const k = height / 1080;
  const t = 1 - Math.pow(0.71, f);
  const tx = 0.255 * width + 72 * k;
  const ty = 0.117 * height + 72 * k;
  const w = interpolate(t, [0, 1], [width * 0.8, 287 * k]);
  const h = interpolate(t, [0, 1], [height * 0.8, 287 * k]);
  const x = interpolate(t, [0, 1], [width * 0.1, tx]);
  const y = interpolate(t, [0, 1], [height * 0.1, ty]);
  if (f > 15) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 48 * k, overflow: 'hidden', filter: f < 6 ? `blur(${(6 - f) * 2 * k}px)` : undefined}}>
      <MediaFill src="" label="input photo" />
    </div>
  );
};
const Composer: React.FC = () => (
  <AbsoluteFill>
    <CameraPath
      motionBlur={18}
      keys={[
        {at: 0, x: 50, y: 50, zoom: 1},
        {at: 28, x: 50, y: 50, zoom: 1},
        {at: 68, x: 58, y: 50, zoom: 1, ease: E.expoIn},
        {at: 69, x: 100, y: 73, zoom: 2.1, ease: () => 1},
        {at: 88, x: 104, y: 73, zoom: 2.1, ease: E.expoOut},
      ]}
    >
      <ClaudeComposer text={PROMPT} typeAt={21} attachments={[{src: '', label: 'photo'}]} file={{name: 'Diagnostic\nReport'}} sendAt={89} />
    </CameraPath>
    <ShrinkIntoThumb />
  </AbsoluteFill>
);

// 7-8. lime action pill, then the close-up where it squashes to .8 and blows up to 1.32
const ExplodingPill: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 9, 13, 18, 23], [1, 1, 0.8, 0.98, 1.32], {extrapolateRight: 'clamp', easing: E.inOut});
  const glow = interpolate(f, [13, 23], [1, 3], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fill = interpolateColors(f, [13, 23], ['#D9F921', '#EAF548']);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'absolute', width: 1180 * glow, height: 330 * glow, borderRadius: 999, background: 'radial-gradient(ellipse, #D9E78Bcc 0%, #D9E78B00 70%)'}} />
      <div style={{width: 1180, height: 329, borderRadius: 999, background: fill, transform: `scale(${s})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sticker, fontWeight: 800, fontSize: 190, color: '#131407'}}>ANALYZE</div>
    </AbsoluteFill>
  );
};

// 9-10. parts sheet: tiles appear as hot-pink silhouettes and resolve row by row (3 f per row) with a scan outline
const Knolling: React.FC<{zoom?: number; pan?: number; rowDelay?: number}> = ({zoom = 1, pan = 0, rowDelay = 3}) => {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  const s = zoom === 1 ? interpolate(f, [0, 10], [0.6, 1], {extrapolateRight: 'clamp', easing: E.expoOut}) : zoom;
  const rows = 7;
  const cols = 12;
  return (
    <AbsoluteFill style={{backgroundColor: '#F0EEF2'}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '64px 64px'}} />
      <div style={{position: 'absolute', left: '12%', top: '10%', width: '78%', transform: `translateX(${-pan * f}px) scale(${s})`, transformOrigin: '0 0', display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: height * 0.022}}>
        {Array.from({length: rows * cols}, (_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const ar = 0.7 + random(`kn${i}`) * 1.3;
          return <PinkReveal key={i} at={2 + r * rowDelay + c * 0.4} style={{width: '100%', aspectRatio: `${ar}`}} />;
        })}
      </div>
    </AbsoluteFill>
  );
};

// 17. build stages: footage + bottom caption that wipes in L->R (4 f), holds, erases R->L (4 f)
const CAPTIONS = ['Building the suspension…', 'Mapping body and wheel mounts…', 'Adding oversized wheels and tyres…', 'Reassembling the final build..'];
const BuildStages: React.FC = () => {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  const i = Math.min(CAPTIONS.length - 1, Math.floor(f / 29));
  const local = f - i * 29;
  const inP = interpolate(local, [3, 7], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const outP = i < CAPTIONS.length - 1 ? interpolate(local, [24, 28], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  return (
    <AbsoluteFill>
      <Footage src="" label="3D build stages (turntable render)" push={-0.012} />
      <div style={{position: 'absolute', left: 0, right: 0, top: '83.6%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: height * 0.012}}>
        <Pop at={0}>{icon(50)}</Pop>
        <div style={{fontFamily: FONT.ui, fontWeight: 500, fontSize: 0.026 * height * 1.38, color: '#A8A6A9', clipPath: `inset(0 ${100 - inP + outP}% 0 0)`}}>{CAPTIONS[i]}</div>
      </div>
    </AbsoluteFill>
  );
};

// 19. "ready" status, second line with the partner tile, then the block zooms out into a small header
const Ready: React.FC = () => {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  const z = interpolate(f, [33, 45], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.expoIn});
  const fs = 0.056 * height * 1.38;
  return (
    <AbsoluteFill style={{transform: `translate(${-z * 30}%, ${-z * 40}%) scale(${1 - 0.47 * z})`, filter: z > 0.7 ? `blur(${(z - 0.7) * 12}px)` : undefined}}>
      <div style={{position: 'absolute', left: '10.5%', top: '40%'}}><Spark size={6.2} color={UI.claudeSpark} wobble /></div>
      <div style={{position: 'absolute', left: '18.4%', top: '40%', fontFamily: FONT.ui, fontWeight: 600, fontSize: fs, lineHeight: 1.1}}>
        <ClaudeLines lines={['The truck is ready for any challenge.']} color="#5F5D60" />
      </div>
      <div style={{position: 'absolute', left: '17.9%', top: '54%', display: 'flex', alignItems: 'center', gap: 22}}>
        <Pop at={16}>{icon(96)}</Pop>
        <div style={{fontFamily: FONT.ui, fontSize: 0.043 * height * 1.38}}>
          <ClaudeLines lines={['Generating monster truck design visuals.']} at={18} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 20. 2x2 variants: pops 5 f apart, camera push 1.155 (expo-out), one tile is selected (darkens, lime border)
const Variants: React.FC = () => {
  const f = useCurrentFrame();
  const push = interpolate(f, [20, 31], [1, 1.155], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.expoOut});
  return (
    <AbsoluteFill style={{transform: `scale(${push})`}}>
      <MediaGrid items={['red', 'green', 'silver', 'purple'].map((c) => ({src: '', label: `variant: ${c}`}))} cols={2} w={76} h={70} start={0} stagger={5} radius={18} highlight={{index: 1, at: 40, color: '#D0D778'}} />
    </AbsoluteFill>
  );
};

// 22-23. partner status centred, then it becomes the caption of a card that grows from its top-left corner
const FinalModel: React.FC = () => {
  const {height} = useVideoConfig();
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
        <Pop at={2}>{icon(116)}</Pop>
        <div style={{fontFamily: FONT.ui, fontWeight: 600, fontSize: 0.063 * height * 1.38, color: '#575158'}}>
          <ClaudeLines lines={['Building the final 3D model']} at={3} color="#575158" />
        </div>
      </div>
    </AbsoluteFill>
  );
};
const ResultCard: React.FC = () => {
  const {height} = useVideoConfig();
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: '10%', top: '4.5%', display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT.ui, fontSize: 0.02 * height * 1.38, color: '#575158'}}>
        {icon(50)} Building the final 3D model
      </div>
      <Pop at={2} origin="top left" r={0.752} style={{position: 'absolute', left: '10%', top: '12%', width: '80%', height: '80%', borderRadius: 63, overflow: 'hidden'}}>
        <MediaFill src="" label="result video (turntable)" />
      </Pop>
    </AbsoluteFill>
  );
};

export const AGENT_SCENES: SceneSpec[] = [
  {name: '1 intro', dur: 111, bg: 'peach', out: {type: 'thermal', palette: 'v1', frames: 5}, el: <Intro />},
  {name: '2-3 input photo', dur: 49, bg: 'none', in: {type: 'thermal', palette: 'v1', frames: 19}, out: {type: 'burn'}, el: <Footage src="" label="input photo (still, tiny pan)" push={0.004} />},
  {name: '4 composer', dur: 112, bg: 'white', out: {type: 'whip', dir: 'up', frames: 5}, el: <Composer />},
  {name: 'blank', dur: 3, bg: 'white', el: null},
  {name: '5 analyzing', dur: 47, bg: 'white', el: <ClaudeStatus lines={['Analyzing photo input', 'Analyzing Diagnostic Report about vehicle']} at={2} outAt={34} y={45} />},
  {name: '6 checking', dur: 52, bg: 'white', el: <ClaudeStatus head lines={['Checking if this car can handle', 'a monster truck build']} at={0} shimmerAt={19} outAt={35} y={47} />},
  {
    name: '7 3D render + pill', dur: 55, bg: 'none', in: {type: 'blur', frames: 12},
    el: (
      <AbsoluteFill>
        <Footage src="" label="3D render: vehicle explodes into parts" push={-0.01} />
        <div style={{position: 'absolute', left: 0, right: 0, top: '83%', display: 'flex', justifyContent: 'center', transform: 'translateY(-50%)'}}>
          <Tag text="Analyze" at={40} variant="lime" size={4.4} typed font={FONT.sticker} />
        </div>
      </AbsoluteFill>
    ),
  },
  {name: '8 pill close-up', dur: 24, bg: 'none', el: <AbsoluteFill style={{backgroundColor: '#D6D3D7'}}><ExplodingPill /></AbsoluteFill>},
  {name: 'flash', dur: 1, bg: 'white', el: null},
  {name: '9 parts sheet', dur: 30, bg: 'none', el: <Knolling />},
  {name: '10 parts scan', dur: 25, bg: 'none', in: {type: 'zoom', scale: 1.22, px: 0, frames: 6}, el: <Knolling zoom={2.1} pan={5.3} rowDelay={7} />},
  {name: '11 detect warn', dur: 25, bg: 'none', push: 0.03, el: <AbsoluteFill><Footage src="" label="close-up: engine head" push={0} /><DetectBox x={37.7} y={31} w={22.6} h={40} value={67} verdict="warn" at={4} /></AbsoluteFill>},
  {name: '12 detect bad', dur: 22, bg: 'none', el: <AbsoluteFill><Footage src="" label="close-up: tyres" push={0} /><DetectBox x={11} y={22} w={68} h={62} value={16} verdict="bad" at={3} /></AbsoluteFill>},
  {name: '13 detect good', dur: 49, bg: 'none', push: 0.044, out: {type: 'whip', dir: 'up', frames: 8}, el: <AbsoluteFill><Footage src="" label="close-up: chassis frame" push={0} /><DetectBox x={10} y={10} w={77} h={77} value={96} from={84} verdict="good" at={7} labelInside /></AbsoluteFill>},
  {name: '14 frame ok', dur: 42, bg: 'white', el: <ClaudeStatus lines={['**Frame is in perfect condition.** This rig is a prime', 'candidate for mods.']} at={0} outAt={28} y={45} x={16.8} />},
  {name: 'blank', dur: 3, bg: 'white', el: null},
  {name: '16 partner status', dur: 44, bg: 'white', el: <ClaudeStatus lines={[`Using ${BRAND} to calculate 3D geometry`, 'and testing suspension.']} at={1} outAt={29} y={47} x={19.4} icon={icon(92)} />},
  {name: '17 build stages', dur: 120, bg: 'none', in: {type: 'blur', frames: 10}, out: {type: 'whip', dir: 'up', frames: 8}, el: <BuildStages />},
  {name: '19 ready', dur: 45, bg: 'white', el: <Ready />},
  {name: '20 variants', dur: 65, bg: 'white', out: {type: 'blur', frames: 10}, el: <Variants />},
  {name: 'blank', dur: 2, bg: 'white', el: null},
  {name: '22 final model', dur: 44, bg: 'white', out: {type: 'zoom', scale: 0.43, rot: 0, px: 10, frames: 4}, el: <FinalModel />},
  {name: '23 result card', dur: 66, bg: 'white', out: {type: 'blur', frames: 5}, el: <ResultCard />},
  {name: 'blank', dur: 2, bg: 'white', el: null},
  {name: '25 choice', dur: 57, bg: 'white', out: {type: 'whip', dir: 'up', frames: 8}, el: <Choice question="Compile a universal build guide?" at={2} pickAt={34} />},
  {name: '26 file', dur: 30, bg: 'white', out: {type: 'zoom', scale: 1.35, rot: 0, px: 40, frames: 9}, el: <FileCard title="Full Build Guide" at={0} y={52} />},
  {name: '27 hero footage + CTA', dur: 115, bg: 'none', el: <AbsoluteFill><Footage src="" label="AI hero footage of the outcome" push={0.01} /><EndCard lines={[`Try ${HERO} on Claude with ${BRAND} MCP`]} entry="none" color="#FCFAF7" weight={500} size={3.5} /></AbsoluteFill>},
];

export const AGENT_FRAMES = totalFrames(AGENT_SCENES); // 1240 (= 41.3 s)

export const AgentDemo: React.FC<{music?: string}> = ({music}) => {
  const st = sceneStarts(AGENT_SCENES);
  return (
    <AbsoluteFill>
      <Timeline scenes={AGENT_SCENES} />
      {music ? <Html5Audio src={staticFile(music)} /> : null}
      <Sequence from={st[2] + 21} durationInFrames={30} layout="none"><Sfx name="typing" at={0} volume={0.2} dur={30} /></Sequence>
      <Sfx name="pop" at={st[2] + 89} volume={0.4} />
      <Sfx name="whoosh" at={st[3]} volume={0.35} />
      <Sfx name="riser" at={st[6]} volume={0.4} />
      <Sfx name="click" at={st[7] + 9} volume={0.3} />
      <Sfx name="impact" at={st[8]} volume={0.5} />
      <Sfx name="tick" at={st[11] + 4} volume={0.2} />
      <Sfx name="ding" at={st[13] + 14} volume={0.25} />
      <Sfx name="click" at={st[24] + 34} volume={0.35} />
      <Sfx name="whoosh" at={st[26] - 4} volume={0.35} />
    </AbsoluteFill>
  );
};

