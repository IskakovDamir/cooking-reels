// Vertical Reel (1080x1920, 'reels' profile, 130 BPM drive) for agentmash, built from the live site
// (shown on a laptop) and rebuilt UI, in the site's colours: sky blue #8BCFF0 + orange accents.
// Every claim is one the product actually supports (see the feature list).
//
// 1. capture the site:   node tools/capture_site.mjs https://agentmash.dev --name agentmash --devices desktop --frames 0,1700 --dpr 3
//    (viewport frames; rects below are from the frames in public/capture/agentmash.json / *-at*-annotated.png)
// 2. bed:                python3 scripts/synth_audio.py public --style drive --bpm 130 --bars 15 --drop-beat 4 --gaps 47:0.5 --end-beat 53
// Register: <Composition id="AgentmashReel" component={AgentmashReel} durationInFrames={REEL_FRAMES} fps={30} width={1080} height={1920} />
import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Manrope';
import {
  BarChart, COLOR, ChipStack, FileMap, FONT, GlyphFade, Metric, MotionProfile, Pop, Punch, SAFE, Scramble, ScreenStudio, Sfx, Stream, Terminal,
  Timeline, Toast, beatDurations, beatGrid, sceneStarts, totalFrames, type Capture, type Rect, type SceneSpec, type Theme,
} from '../hfm';

const brand = loadFont('normal', {weights: ['500', '600', '700', '800'], subsets: ['latin']}).fontFamily;

const g = beatGrid(130, 30);
// 15 shots, 58 beats (~27 s): a cut every ~1.8 s plus punches and camera moves inside the shots.
// Shots that carry reading (toast, site cards, terminal, agent lists, CTA) get 4-5 beats.
const D = beatDurations(g, [4, 4, 3.5, 5, 3.5, 4, 4.5, 3, 3, 4, 4, 5, 3.5, 2, 5]);

/** agentmash.dev palette: lime -> the site's sky blue (--hp-accent), pink -> orange. */
const THEME: Theme = {accents: ['#8BCFF0', '#F97316']};

// agentmash.dev on a laptop: real 1440x900 viewports (dpr 3) at scroll 0 (hero) and 1700 (how it works)
const TOP: Capture = {src: 'capture/agentmash-home-desktop-at0.png', pageW: 1440, pageH: 900, dpr: 3, viewH: 900};
const HOW: Capture = {src: 'capture/agentmash-home-desktop-at1700.png', pageW: 1440, pageH: 900, dpr: 3, viewH: 900};
const R: Record<string, Rect> = {
  hero: {x: 321, y: 112, w: 798, h: 180},
  connect: {x: 431, y: 406, w: 242, h: 52},
  reads: {x: 980, y: 226, w: 300, h: 245},
  collision: {x: 1012, y: 371, w: 114, h: 20},
  decide: {x: 1100, y: 608, w: 300, h: 212},
  overlap: {x: 1120, y: 744, w: 260, h: 38},
};

const AGENT = {claude: '#D97757', gemini: '#4C8DF6', cursor: '#111114', codex: '#10A37F'};

/** Big lowercase headline in the brand face, kept inside the Reels safe area. */
const Head: React.FC<{children: React.ReactNode; y?: number; size?: number; color?: string}> = ({children, y = SAFE.top + 4, size = 112, color = COLOR.ink}) => (
  <div style={{position: 'absolute', left: `${SAFE.side + 2}%`, right: `${SAFE.side + 2}%`, top: `${y}%`, fontFamily: brand, fontWeight: 700, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.045em', color}}>{children}</div>
);
const center: React.CSSProperties = {position: 'absolute', left: 0, right: 0, display: 'flex', justifyContent: 'center'};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Head y={17} size={150}>
      <Scramble text="two agents." start={0} cps={40} />
      <br />
      <span style={{color: COLOR.pink}}>
        <Scramble text="one file." start={9} cps={40} seed="b" />
      </span>
    </Head>
    <div style={{...center, top: '42%', height: '38%'}}>
      <FileMap
        w={94}
        h={100}
        files={[{path: 'api/users.ts', x: 26, y: 10}, {path: 'db/schema.ts', x: 74, y: 22}, {path: 'list.tsx', x: 50, y: 66}]}
        agents={[
          {name: "ana's claude code", color: AGENT.claude, path: [{at: 2, file: 0}, {at: 12, file: 2}]},
          {name: "ben's gemini cli", color: AGENT.gemini, path: [{at: 4, file: 1}, {at: 16, file: 2}]},
        ]}
        contested={{file: 2, at: 26}}
      />
    </div>
  </AbsoluteFill>
);

const Warned: React.FC = () => (
  <AbsoluteFill>
    <Head>
      <Stream text="warned before" start={0} unit="word" cps={30} tail={6} blur={10} accent={null} />
      <br />
      <Stream text="the edit." start={3} unit="word" cps={30} tail={6} blur={10} accent={null} />
    </Head>
    <Punch keys={[{at: 24, scale: 1.08, y: 52}]}>
      <div style={{...center, top: '44%'}}>
        <Toast level="ACTIVE COLLISION" title="ben's gemini cli just changed list.tsx" body="you're about to edit the same file. read it first." at={6} w={84} />
      </div>
    </Punch>
  </AbsoluteFill>
);

const FiveWarnings: React.FC = () => (
  <AbsoluteFill>
    <Head color="#F4F4F5">
      <Stream text="one of five" start={0} unit="word" cps={30} tail={6} blur={10} accent={null} />
      <br />
      <Stream text="warnings." start={2} unit="word" cps={30} tail={6} blur={10} accent={null} />
    </Head>
    <div style={{...center, top: '40%'}}>
      <ChipStack items={['ACTIVE COLLISION', 'STALE READ', 'PARALLEL EDIT', 'RECENT EDIT', 'NEARBY EDIT']} at={4} every={2.5} size={52} highlight={{from: 14, cycle: 5}} dark />
    </div>
  </AbsoluteFill>
);

// laptop wide for 12 f (establish), glide onto step 05, click the warning chip
const ReadsBeforeWrites: React.FC = () => (
  <ScreenStudio
    capture={HOW}
    device="laptop"
    camera={[{at: 0, zoom: 1}, {at: 12, focus: R.reads, fill: 0.92}]}
    cursor={[{at: 32, to: {x: 1190, y: 330}}, {at: 38, to: R.collision, click: true}]}
    spotlight={[{rect: R.reads, from: 24, to: 90, label: 'before every edit'}]}
  />
);

// opens close on step 06 and drifts back a little while the cursor hits the overlap notice
const YouDecide: React.FC = () => (
  <ScreenStudio
    capture={HOW}
    device="laptop"
    camera={[{at: 0, focus: R.decide, zoom: 4}, {at: 1, focus: R.decide, zoom: 3.3, dur: 44}]}
    cursor={[{at: 8, to: {x: 1300, y: 700}}, {at: 14, to: R.overlap, click: true}]}
    spotlight={[{rect: R.decide, from: 0, to: 90, label: 'collided anyway? you decide'}]}
  />
);

const Room: React.FC = () => {
  const files = [
    {path: 'src/app.tsx', x: 24, y: 8},
    {path: 'api/auth.ts', x: 74, y: 14},
    {path: 'list.tsx', x: 34, y: 38},
    {path: 'db/schema.ts', x: 76, y: 46},
    {path: 'ui/button.tsx', x: 22, y: 70},
    {path: 'routes/index.ts', x: 66, y: 82},
  ];
  return (
    <AbsoluteFill>
      <Head>
        <Stream text="every agent" start={0} unit="word" cps={30} tail={6} blur={10} accent={null} />
        <br />
        <Stream text="sees the room." start={2} unit="word" cps={30} tail={6} blur={10} accent={null} />
      </Head>
      <Punch keys={[{at: 34, scale: 1.18, x: 36, y: 55}]}>
      <div style={{...center, top: '37%', height: '42%'}}>
        <FileMap
          w={94}
          h={100}
          files={files}
          agents={[
            {name: 'claude code', color: AGENT.claude, path: [{at: 4, file: 0}, {at: 18, file: 2}, {at: 44, file: 4}]},
            {name: 'cursor', color: AGENT.cursor, path: [{at: 6, file: 1}, {at: 24, file: 3}]},
            {name: 'codex', color: AGENT.codex, path: [{at: 8, file: 5}, {at: 30, file: 2}]},
            {name: 'gemini cli', color: AGENT.gemini, path: [{at: 10, file: 4}, {at: 36, file: 1}]},
          ]}
          contested={{file: 2, at: 32}}
        />
      </div>
      </Punch>
    </AbsoluteFill>
  );
};

const Login: React.FC = () => (
  <AbsoluteFill>
    <Head color="#F4F4F5">
      <Stream text="one command" start={0} unit="word" cps={30} tail={6} blur={10} accent={null} />
      <br />
      <Stream text="per developer." start={2} unit="word" cps={30} tail={6} blur={10} accent={null} />
    </Head>
    <Punch keys={[{at: 30, scale: 1.1, y: 55}]}>
      <div style={{...center, top: '40%'}}>
        <Terminal command="npx agentmash login" at={6} cps={34} every={4} fontSize={30} output={['✓ signed in with github', '✓ found claude code, codex,', '  cursor, gemini cli', '✓ connected 4 agents', '  nothing committed to the repo']} w={94} />
      </div>
    </Punch>
  </AbsoluteFill>
);

const SpeedMetric: React.FC = () => (
  <AbsoluteFill>
    <Head>
      <Stream text="it never slows" start={0} unit="word" cps={30} tail={6} blur={10} accent={null} />
      <br />
      <Stream text="you down." start={3} unit="word" cps={30} tail={6} blur={10} accent={null} />
    </Head>
    <Punch keys={[{at: 16, scale: 1.08, y: 52}]}>
      <div style={{...center, top: '42%'}}>
        <Metric value={160} prefix="~" suffix=" ms" at={4} dur={12} label="to check before an edit" size={150} />
      </div>
    </Punch>
  </AbsoluteFill>
);

const SpeedBars: React.FC = () => (
  <AbsoluteFill>
    <div style={{...center, top: '30%'}}>
      <BarChart at={0} every={3} unit=" ms" w={88} max={1500} data={[{label: 'localhost', value: 160, color: COLOR.lime}, {label: 'across the atlantic', value: 450, color: COLOR.pink}, {label: 'hard ceiling', value: 1500, color: COLOR.ink}]} />
    </div>
  </AbsoluteFill>
);

const AGENTS = ['claude code', 'codex', 'cursor', 'github copilot', 'gemini cli', 'opencode', 'kilo code', 'cline', 'goose', 'amp', 'devin', 'junie', 'kiro', 'qwen code', 'crush', 'openhands', 'antigravity', 'factory droid', 'continue', 'zed'];
const Twenty: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div style={{...center, top: '13%'}}>
        <Metric value={20} at={0} dur={10} label="coding agents. one login." size={300} />
      </div>
      <div style={{position: 'absolute', left: '6%', right: '6%', top: '42%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16}}>
        {AGENTS.map((a, i) => (
          <Pop key={a} at={6 + i * 1.3}>
            <div style={{fontFamily: FONT.mono, fontSize: 34, padding: '10px 20px', borderRadius: 14, background: i < 2 ? COLOR.ink : '#FFFFFF', color: i < 2 ? '#fff' : COLOR.ink, boxShadow: '0 0 0 1.5px #E6E4EA', opacity: f > 6 + i * 1.3 ? 1 : 0}}>{a}</div>
          </Pop>
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: '72%', textAlign: 'center', fontFamily: FONT.ui, fontWeight: 600, fontSize: 46, color: COLOR.ink}}>
        <Stream text="and any editor through git." start={16} unit="word" cps={30} tail={6} blur={8} accent={null} />
      </div>
    </AbsoluteFill>
  );
};

// the crew (features doc s.8 / agentmash.dev/docs/crew): 22 ready-made Claude Code agents, one job each
const CREW = ['mash', 'tally', 'scout', 'flex', 'pipe', 'swipe', 'index', 'patch', 'batch', 'spell', 'lingo', 'probe', 'gavel', 'snag', 'prune', 'bump', 'rail', 'quill', 'higgs', 'plain', 'tempo', 'inspo'];
const Crew: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div style={{...center, top: '13%'}}>
        <Metric value={22} at={0} dur={10} label="ready-made agents. one job each." size={300} dark />
      </div>
      <div style={{position: 'absolute', left: '7%', right: '7%', top: '42%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16}}>
        {CREW.map((a, i) => (
          <Pop key={a} at={6 + i * 1.2}>
            <div style={{fontFamily: FONT.mono, fontSize: 36, padding: '10px 22px', borderRadius: 14, background: i === 0 ? COLOR.lime : '#1C1C21', color: i === 0 ? '#04131B' : '#E4E4E7', boxShadow: '0 0 0 1.5px #2A2A30', opacity: f > 6 + i * 1.2 ? 1 : 0}}>{a}</div>
          </Pop>
        ))}
      </div>
      <div style={{position: 'absolute', left: '8%', right: '8%', top: '71%', textAlign: 'center', fontFamily: FONT.ui, fontWeight: 600, fontSize: 46, lineHeight: 1.25, color: '#F4F4F5'}}>
        <Stream text="one command adds them to your repository." start={22} unit="word" cps={30} tail={6} blur={8} accent={null} />
      </div>
    </AbsoluteFill>
  );
};

// laptop -> push onto the headline -> glide down to the CTA and click it
const Hero: React.FC = () => (
  <ScreenStudio
    capture={TOP}
    device="laptop"
    camera={[{at: 0, zoom: 1}, {at: 4, focus: R.hero, fill: 0.94}, {at: 38, focus: R.connect, fill: 0.8}]}
    cursor={[{at: 40, to: {x: 640, y: 360}}, {at: 46, to: R.connect, click: true}]}
    spotlight={[{rect: R.connect, from: 57, to: 90}]}
  />
);

const Free: React.FC = () => (
  <AbsoluteFill>
    <div style={{...center, top: '24%'}}>
      <div style={{fontFamily: brand, fontWeight: 800, fontSize: 420, letterSpacing: '-0.06em', color: COLOR.ink, lineHeight: 1}}>
        <GlyphFade text="$0" start={0} stagger={3} fade={8} />
      </div>
    </div>
    <Head y={52} size={96}>
      <div style={{textAlign: 'center'}}>
        <Stream text="for two developers." start={8} unit="word" cps={30} tail={6} blur={10} accent={null} />
      </div>
    </Head>
    <div style={{...center, top: '66%', fontFamily: FONT.ui, fontSize: 38, color: COLOR.mute}}>
      <Stream text="unlimited agents. 7 days of history." start={16} unit="word" cps={30} tail={6} blur={8} accent={null} />
    </div>
  </AbsoluteFill>
);

const End: React.FC = () => (
  <AbsoluteFill>
    <Head y={24} size={104}>
      <Stream text="stop untangling your agents' merge conflicts by hand." start={0} unit="word" cps={30} tail={6} blur={10} accent={null} />
    </Head>
    <div style={{...center, top: '58%', flexDirection: 'column', alignItems: 'center', gap: 28}}>
      <Pop at={16}>
        <div style={{fontFamily: FONT.mono, fontSize: 52, background: COLOR.ink, color: '#fff', borderRadius: 22, padding: '22px 36px'}}>
          <span style={{color: COLOR.lime}}>$ </span>npx agentmash login
        </div>
      </Pop>
      <Pop at={22}>
        <div style={{fontFamily: brand, fontWeight: 700, fontSize: 76, letterSpacing: '-0.03em', color: COLOR.ink}}>agentmash.dev</div>
      </Pop>
    </div>
  </AbsoluteFill>
);

export const REEL_SCENES: SceneSpec[] = [
  {name: 'hook', dur: D[0], bg: 'paper', push: 0.03, out: {type: 'glitch'}, el: <Hook />},
  {name: 'warned', dur: D[1], bg: 'paper', push: 0.03, in: {type: 'glitch'}, el: <Warned />},
  {name: 'five warnings', dur: D[2], bg: 'darkGrid', push: 0.04, in: {type: 'zoom'}, el: <FiveWarnings />},
  {name: 'site: reads before writes', dur: D[3], bg: 'paper', in: {type: 'blur'}, el: <ReadsBeforeWrites />},
  {name: 'site: you decide', dur: D[4], bg: 'paper', in: {type: 'blur', px: 8}, out: {type: 'whip', dir: 'up'}, el: <YouDecide />},
  {name: 'room', dur: D[5], bg: 'sky', push: 0.025, in: {type: 'whip', dir: 'up'}, el: <Room />},
  {name: 'login', dur: D[6], bg: 'darkGrid', push: 0.03, in: {type: 'zoom'}, el: <Login />},
  {name: 'speed', dur: D[7], bg: 'acid', push: 0.03, in: {type: 'blur'}, el: <SpeedMetric />},
  {name: 'bars', dur: D[8], bg: 'white', push: 0.03, in: {type: 'whip', dir: 'left'}, el: <SpeedBars />},
  {name: 'twenty', dur: D[9], bg: 'list', push: 0.03, in: {type: 'glitch'}, el: <Twenty />},
  {name: 'crew', dur: D[10], bg: 'darkGrid', push: 0.03, in: {type: 'zoom'}, el: <Crew />},
  {name: 'site: hero', dur: D[11], bg: 'paper', in: {type: 'blur'}, out: {type: 'zoom'}, el: <Hero />},
  {name: 'free', dur: D[12], bg: 'acid', push: 0.04, in: {type: 'blur'}, el: <Free />},
  {name: 'blank', dur: D[13], bg: 'white', in: {type: 'glitch'}, el: <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}><div style={{fontFamily: brand, fontWeight: 800, fontSize: 140, letterSpacing: '-0.05em', color: COLOR.ink}}><Scramble text="agentmash" start={0} cps={60} /></div></AbsoluteFill>},
  {name: 'end', dur: D[14], bg: 'paper', push: 0.02, in: {type: 'blur'}, el: <End />},
];

export const REEL_FRAMES = totalFrames(REEL_SCENES);

export const AgentmashReel: React.FC<{music?: string}> = ({music}) => {
  const st = sceneStarts(REEL_SCENES);
  return (
    <MotionProfile preset="reels">
      <AbsoluteFill>
        <Timeline scenes={REEL_SCENES} theme={THEME} />
        {music ? <Html5Audio src={staticFile(music)} /> : null}
        <Sfx name="glitch" at={st[1] - 3} volume={0.35} />
        <Sfx name="pop" at={st[1] + 6} volume={0.35} />
        <Sfx name="whoosh" at={st[2]} volume={0.3} />
        <Sfx name="whoosh" at={st[3]} volume={0.35} />
        <Sfx name="click" at={st[3] + 50} volume={0.3} />
        <Sfx name="click" at={st[4] + 26} volume={0.3} />
        <Sfx name="whoosh" at={st[5]} volume={0.35} />
        <Sfx name="typing" at={st[6] + 6} volume={0.2} dur={23} />
        <Sfx name="ding" at={st[6] + 35} volume={0.2} />
        <Sfx name="tick" at={st[7] + 5} volume={0.2} />
        <Sfx name="swish" at={st[8]} volume={0.3} />
        <Sfx name="glitch" at={st[9]} volume={0.3} />
        <Sfx name="whoosh" at={st[10]} volume={0.3} />
        <Sfx name="click" at={st[11] + 58} volume={0.35} />
        <Sfx name="impact" at={st[12]} volume={0.4} />
        <Sfx name="glitch" at={st[13]} volume={0.3} />
      </AbsoluteFill>
    </MotionProfile>
  );
};
