// Your reel (1080x1920). Write it as a beat sheet: one SceneSpec per shot (references/reels.md).
// 1. capture the product site:  node tools/capture_site.mjs https://your.site --name site --devices desktop --frames auto --dpr 3
// 2. point SITE.src at a frame (capture/site-home-desktop-at0.png) and copy rects from public/capture/site.json
// 3. bed:                        python3 <skill>/scripts/synth_audio.py public --style drive --bpm 130 --bars 5 --drop-beat 4 --end-beat 16
import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile} from 'remotion';
import {
  COLOR, FONT, Metric, MotionProfile, SAFE, Scramble, ScreenStudio, Sfx, Stream, Terminal, Timeline, beatDurations, beatGrid, sceneStarts,
  totalFrames, type Capture, type Rect, type SceneSpec, type Theme,
} from './hfm';

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const BPM = 130;
const g = beatGrid(BPM, FPS);

// 2-3 beats for a hit, 4-5 for anything with copy or UI to read; the second shot starts on the drop
const D = beatDurations(g, [4, 5, 4, 3, 4]);

/** brand accents: [replaces lime, replaces pink] - take them from the site's CSS */
const THEME: Theme = {accents: ['#8BCFF0', '#F97316']};

// a laptop viewport frame from capture_site.mjs ('' shows a placeholder screen until you capture)
const SITE: Capture = {src: '', pageW: 1440, pageH: 900, dpr: 3, viewH: 900};
const R: Record<string, Rect> = {
  hero: {x: 320, y: 110, w: 800, h: 180},
  cta: {x: 430, y: 405, w: 240, h: 52},
};

const Head: React.FC<{children: React.ReactNode; y?: number; size?: number; color?: string}> = ({children, y = SAFE.top + 4, size = 120, color = COLOR.ink}) => (
  <div style={{position: 'absolute', left: `${SAFE.side + 2}%`, right: `${SAFE.side + 2}%`, top: `${y}%`, fontFamily: FONT.display, fontWeight: 700, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.045em', color}}>{children}</div>
);
const center: React.CSSProperties = {position: 'absolute', left: 0, right: 0, display: 'flex', justifyContent: 'center'};

export const SCENES: SceneSpec[] = [
  {
    name: 'hook: the problem in two lines', dur: D[0], bg: 'paper', push: 0.03, out: {type: 'glitch'},
    el: (
      <Head y={30} size={150}>
        <Scramble text="the problem." start={0} cps={40} />
        <br />
        <span style={{color: COLOR.pink}}>
          <Scramble text="in two lines." start={9} cps={40} seed="b" />
        </span>
      </Head>
    ),
  },
  {
    name: 'site on a laptop (drop)', dur: D[1], bg: 'paper', in: {type: 'glitch'},
    el: (
      <ScreenStudio
        capture={SITE}
        camera={[{at: 0, zoom: 1}, {at: 12, focus: R.hero, fill: 0.94}, {at: 40, focus: R.cta, fill: 0.8}]}
        cursor={[{at: 42, to: {x: 640, y: 360}}, {at: 48, to: R.cta, click: true}]}
        spotlight={[{rect: R.cta, from: 58, to: 90, label: 'what it does'}]}
      />
    ),
  },
  {
    name: 'setup', dur: D[2], bg: 'darkGrid', push: 0.03, in: {type: 'zoom'},
    el: (
      <AbsoluteFill>
        <Head color="#F4F4F5">
          <Stream text="one command." start={0} unit="word" cps={30} tail={6} blur={10} accent={null} />
        </Head>
        <div style={{...center, top: '36%'}}>
          <Terminal command="npx your-cli login" at={6} output={['✓ signed in', '✓ connected']} w={94} />
        </div>
      </AbsoluteFill>
    ),
  },
  {
    name: 'proof: one number', dur: D[3], bg: 'acid', push: 0.04, in: {type: 'blur'},
    el: (
      <div style={{...center, top: '34%'}}>
        <Metric value={160} prefix="~" suffix=" ms" at={2} label="what the number means" size={180} />
      </div>
    ),
  },
  {
    name: 'cta', dur: D[4], bg: 'paper', push: 0.02, in: {type: 'blur'},
    el: (
      <AbsoluteFill>
        <Head y={26}>
          <Stream text="the promise in one line." start={0} unit="word" cps={30} tail={6} blur={10} accent={null} />
        </Head>
        <div style={{...center, top: '60%', fontFamily: FONT.display, fontWeight: 700, fontSize: 76, color: COLOR.ink}}>your.site</div>
      </AbsoluteFill>
    ),
  },
];

export const MAIN_FRAMES = totalFrames(SCENES);

export const Main: React.FC<{music?: string}> = ({music = 'music.wav'}) => {
  const st = sceneStarts(SCENES);
  return (
    <MotionProfile preset="reels">
      <AbsoluteFill>
        <Timeline scenes={SCENES} theme={THEME} />
        {music ? <Html5Audio src={staticFile(music)} /> : null}
        <Sfx name="glitch" at={st[1] - 3} volume={0.35} />
        <Sfx name="click" at={st[1] + 60} volume={0.3} />
        <Sfx name="typing" at={st[2] + 6} volume={0.2} dur={16} />
        <Sfx name="impact" at={st[3]} volume={0.35} />
      </AbsoluteFill>
    </MotionProfile>
  );
};
