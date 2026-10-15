// Archetype C - agent story with mascots. A shot-for-shot rebuild of reference v3 (59.6 s, 1787 frames
// @30, 87.75 BPM trap) with a neutral brand. Frame numbers are the measured ones.
// Bed:  python scripts/synth_audio.py public --bpm 87.75 --bars 22 --drop-beat 5 --breaks 13 --end-beat 86
// Replace AGENTS / BRAND / ASK and the plates (empty src = labelled placeholder).
import React from 'react';
import {AbsoluteFill, Easing, Html5Audio, interpolate, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  AgentStatus, CameraPath, CardStack3D, CardToFull, Carousel, Chip, Critter, CritterRing, E, FileCard, FONT, Footage, Lockup, MediaCard,
  MediaFill, PillComposer, Pop, ScreenFan3D, Sfx, Stream, ThumbWall, Timeline, sceneStarts, totalFrames, type CritterShape, type SceneSpec,
} from '../hfm';

const PARTNER = 'Atlas dots';
const BRAND = 'Northwind';
const ASK = 'Make me a viral app. Make no mistakes.';
const AGENTS: {name: string; desc: string; shape: CritterShape; color: string}[] = [
  {name: 'Research', desc: 'Find the signal', shape: 'drop', color: '#0073FF'},
  {name: 'Comments', desc: 'Find the signal', shape: 'bear', color: '#FC7B1B'},
  {name: 'Insights', desc: 'Understand what matters', shape: 'pill', color: '#2A282C'},
  {name: 'Video', desc: 'Plan the story', shape: 'square', color: '#E0DEE1'},
  {name: 'Skill', desc: 'Make work repeatable', shape: 'clover', color: '#0073FF'},
  {name: 'Script', desc: 'Find the right words', shape: 'blob', color: '#8D54DD'},
];
const avatar = (i: number, size = 6.5, at = 0) => <Critter shape={AGENTS[i].shape} color={AGENTS[i].color} size={size} x={50} y={50} at={at} seed={i} />;
const Av: React.FC<{i: number; size?: number; at?: number}> = ({i, size = 6.5, at = 0}) => (
  <div style={{position: 'relative', width: `${size * 1.1}vh`, height: `${size * 1.1}vh`}}>{avatar(i, size, at)}</div>
);

/** A dark social-post card (placeholder art). */
const Post: React.FC<{i: number}> = ({i}) => {
  const {height} = useVideoConfig();
  const k = height / 1080;
  return (
    <div style={{width: '100%', height: '100%', background: '#141217', borderRadius: 41 * k, padding: 40 * k, boxSizing: 'border-box', fontFamily: FONT.ui, color: '#fff', display: 'flex', flexDirection: 'column', gap: 18 * k}}>
      <div style={{display: 'flex', gap: 18 * k, alignItems: 'center'}}>
        <div style={{width: 72 * k, height: 72 * k, borderRadius: '50%', background: `hsl(${(i * 47) % 360} 40% 60%)`}} />
        <div style={{fontSize: 38 * k}}>Creator {i + 1}<div style={{fontSize: 26 * k, color: '#6D6A70'}}>@creator{i + 1}</div></div>
      </div>
      <div style={{fontSize: 30 * k, lineHeight: 1.35}}>I built a tiny drama app for the little gaps in the day. Short vertical episodes, saved series.</div>
      <div style={{flex: 1, borderRadius: 18 * k, overflow: 'hidden'}}><MediaFill src="" label={`post image ${i + 1}`} /></div>
      <div style={{fontSize: 24 * k, color: '#A09EA3', display: 'flex', gap: 60 * k}}>💬 334 🔁 13 ♡ 1k ▮ 15K</div>
    </div>
  );
};

// S1 / S24 lockup with six mascots
const Intro: React.FC<{typed?: boolean}> = ({typed = false}) => (
  <AbsoluteFill>
    <CritterRing at={0} />
    <Lockup left={{name: PARTNER, weight: 500}} right={{name: BRAND, weight: 600}} pill="Always-On-Agents" pillTyped={typed} at={0} size={6.4} y={46} />
  </AbsoluteFill>
);

// S2 white corridor flown through, mascots pass the camera
const Tunnel: React.FC = () => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: '#F4F6FA'}}>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        {[0, 1].map((x) => [0, 1].map((y) => <line key={`${x}${y}`} x1={x * width} y1={y * height} x2={width / 2} y2={height / 2} stroke="#D9D8DE" strokeWidth={1.5} />))}
        {Array.from({length: 7}, (_, i) => {
          const z = Math.pow(1.12, f + i * 6) % 12;
          const s = 0.02 * z;
          return <rect key={i} x={width / 2 - (width * s) / 2} y={height / 2 - (height * s) / 2} width={width * s} height={height * s} fill="none" stroke="#D9D8DE" strokeWidth={1.5} />;
        })}
      </svg>
      {AGENTS.map((a, i) => {
        const p = Math.pow(1.07, Math.max(0, f - 3 - i * 2)) - 1;
        const ang = (i / AGENTS.length) * Math.PI * 2;
        return <Critter key={i} shape={a.shape} color={a.color} size={4 + p * 6} x={50 + Math.cos(ang) * p * 22} y={50 + Math.sin(ang) * p * 22} at={-20} seed={i} />;
      })}
    </AbsoluteFill>
  );
};

// S4 chat app: user bubble + Research row, whip-pan right, cut to the zoomed-out app, drift to the sidebar
const ChatApp: React.FC = () => {
  const {height} = useVideoConfig();
  const k = height / 1080;
  return (
    <AbsoluteFill style={{fontFamily: FONT.ui}}>
      <div style={{position: 'absolute', left: '3%', top: '6%', width: '24%', bottom: '6%'}}>
        <div style={{fontSize: 34 * k, color: '#5F5D61'}}>Your dots</div>
        {[0, 1, 2].map((i) => <div key={i} style={{height: 90 * k, borderRadius: 20 * k, background: '#E8E6E9', marginTop: 24 * k}} />)}
      </div>
      <div style={{position: 'absolute', left: '29%', top: 0, bottom: 0, width: 1, background: '#E6E4EA'}} />
      <div style={{position: 'absolute', left: '33%', top: '6%', display: 'flex', gap: 16 * k, alignItems: 'center'}}><Av i={0} size={5} /><div style={{fontSize: 30 * k}}>Research<div style={{fontSize: 22 * k, color: '#8A8A93'}}>Find the signal.</div></div></div>
      <div style={{position: 'absolute', right: '6%', top: '26%', background: '#F0F3F6', borderRadius: 45 * k, padding: `${36 * k}px ${48 * k}px`, fontSize: 36 * k}}>{ASK.replace(/\.$/, '')}</div>
      <div style={{position: 'absolute', left: '35%', top: '50%', width: '55%'}}>
        <AgentStatus agent="Research" state="Researching" done title="Researching: On it. Mapping top drama apps and where there's room to win..." at={6} x={0} y={0} />
      </div>
      <div style={{position: 'absolute', left: '33%', right: '4%', bottom: '5%', height: 90 * k, borderRadius: 45 * k, border: '1px solid #E6E4EA', display: 'flex', alignItems: 'center', padding: `0 ${36 * k}px`, color: '#B5B3B6', fontSize: 28 * k}}>Message Research Bot</div>
    </AbsoluteFill>
  );
};

// S5 agent roster: rows pop every 15 f; stepped expo in-out scroll (300 px @1080 per step) over a slow drift
const Roster: React.FC = () => {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  const k = height / 1080;
  let y = 4 * f;
  [30, 45, 60, 75, 90].forEach((t) => (y += 300 * interpolate(f, [t, t + 13], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.exp)})));
  return (
    <AbsoluteFill style={{fontFamily: FONT.ui}}>
      <div style={{position: 'absolute', left: '8%', right: '30%', top: `calc(14% - ${y * k}px)`}}>
        <div style={{fontSize: 50 * k, color: '#5F5D61', marginBottom: 40 * k}}>Your dots</div>
        {AGENTS.map((a, i) => (
          <Pop key={a.name} at={i * 15} rise={40}>
            <div style={{height: 230 * k, borderRadius: 30 * k, background: '#EDEBEE', marginBottom: 70 * k, display: 'flex', alignItems: 'center', gap: 40 * k, padding: `0 ${50 * k}px`}}>
              <Av i={i} size={12} at={i * 15} />
              <div style={{fontSize: 60 * k, fontWeight: 600}}>
                <Stream text={a.name} start={i * 15 + 4} unit="word" cps={30} tail={6} blur={8} accent={null} color={a.color === '#E0DEE1' ? '#888' : a.color} />
                <div style={{fontSize: 40 * k, fontWeight: 400, color: '#8A8A93'}}>{a.desc}</div>
              </div>
            </div>
          </Pop>
        ))}
        <div style={{fontSize: 44 * k, color: '#8A8A93'}}>⊞ View all 15 dots</div>
      </div>
    </AbsoluteFill>
  );
};

// S11 comment thread: two stepped pulses, then exponential acceleration (x1.075/f) into the cut, with motion blur
const Comments: React.FC = () => {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  const k = height / 1080;
  let y = 0;
  for (let i = 0; i < f; i++) y += i < 16 ? 180 * Math.pow(0.74, i) : i < 52 ? 8 : 6 * Math.pow(1.075, i - 52);
  y += 390 * interpolate(f, [16, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.exp)});
  y += 570 * interpolate(f, [31, 49], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.exp)});
  const v = f > 52 ? 6 * Math.pow(1.075, f - 52) : 0;
  return (
    <AbsoluteFill style={{background: '#FBF9FC'}}>
      <div style={{position: 'absolute', left: '15.4%', width: '69.4%', top: 0, bottom: 0, background: '#171816', overflow: 'hidden'}}>
        <div style={{transform: `translateY(${-y * k}px)`, filter: v > 20 ? `blur(${Math.min(20, v / 8) * k}px)` : undefined, padding: 50 * k, fontFamily: FONT.ui, color: '#fff'}}>
          {Array.from({length: 24}, (_, i) => (
            <div key={i} style={{borderBottom: '1px solid #2C2C2C', padding: `${30 * k}px 0`}}>
              <div style={{fontSize: 34 * k}}>Viewer {i + 1} <span style={{color: '#6D6A70'}}>@viewer_{i + 1}</span></div>
              <div style={{fontSize: 24 * k, color: '#8A8A93'}}>Replying to <span style={{color: '#D4FF1F'}}>@app</span></div>
              <div style={{fontSize: 32 * k, marginTop: 10 * k, lineHeight: 1.35}}>{['finally a drama app that does not ask for coins every 2 episodes', 'watched 3 episodes on my lunch break and forgot to eat lol', 'the pick up where I left off thing is so underrated', 'opened it expecting another billionaire plot... ok episode 3 got me'][i % 4]}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// S19 mascot party: two big mascots, then 9, then 22, imploding to the centre
const Party: React.FC = () => {
  const f = useCurrentFrame();
  const shapes: CritterShape[] = ['blob', 'bear', 'drop', 'pill', 'square', 'clover', 'triangle', 'flower'];
  const colors = ['#FC7B1B', '#0073FF', '#8D54DD', '#09B651', '#2A282C', '#E0DEE1'];
  const implode = interpolate(f, [58, 66], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.expoIn});
  if (f < 25)
    return (
      <AbsoluteFill>
        <Critter shape="bear" color="#FC7B1B" size={26} x={31} y={49} at={5} seed={1} />
        <Critter shape="square" color="#E0DEE1" size={28} x={69} y={50} at={0} seed={3} />
      </AbsoluteFill>
    );
  const n = f < 45 ? 9 : 22;
  return (
    <AbsoluteFill>
      {Array.from({length: n}, (_, i) => {
        const x = 8 + random(`px${n}${i}`) * 84;
        const y = 12 + random(`py${n}${i}`) * 76;
        return <Critter key={`${n}-${i}`} shape={shapes[i % shapes.length]} color={colors[i % colors.length]} size={n === 9 ? 6.5 : 4.2} x={x + (50 - x) * implode} y={y + (55 - y) * implode} at={f < 45 ? 25 : 45} seed={i} />;
      })}
    </AbsoluteFill>
  );
};

const statusAv = (i: number) => <Av i={i} size={6} />;

export const STORY_SCENES: SceneSpec[] = [
  {name: 'S1 lockup', dur: 64, bg: 'sky', push: 0.016, out: {type: 'zoom', scale: 3.7, rot: 0, frames: 12, px: 30}, el: <Intro />},
  {name: 'S2 tunnel', dur: 29, bg: 'none', el: <Tunnel />},
  {
    name: 'S3 footage + ask', dur: 171, bg: 'none', in: {type: 'emerge'},
    el: (
      <AbsoluteFill>
        <Footage src="" label="AI live action: person at a laptop, night" push={0.02} />
        <PillComposer text={ASK} at={30} typeAt={9} cps={66} pause={[20, 30]} exitAt={130} />
      </AbsoluteFill>
    ),
  },
  {
    name: 'S4 chat', dur: 94, bg: 'white', in: {type: 'blur', frames: 21, px: 6},
    el: (
      <CameraPath motionBlur={30} keys={[{at: 0, x: 62, y: 40, zoom: 1.56}, {at: 35, x: 62, y: 40, zoom: 1.56}, {at: 47, x: 50, y: 40, zoom: 1.56, ease: E.expoIn}, {at: 48, x: 46, y: 50, zoom: 1, ease: () => 1}, {at: 77, x: 40, y: 50, zoom: 1, ease: E.expoOut}, {at: 93, x: 20, y: 30, zoom: 1.6, ease: E.expoIn}]}>
        <ChatApp />
      </CameraPath>
    ),
  },
  {name: 'S5 roster', dur: 107, bg: 'white', in: {type: 'zoom', scale: 0.7, px: 20, frames: 14}, out: {type: 'blur', frames: 6}, el: <Roster />},
  {
    name: 'S6 two agents', dur: 45, bg: 'white', in: {type: 'blur', frames: 10},
    el: (
      <AbsoluteFill>
        <AgentStatus avatar={statusAv(0)} agent="Research" state="Researching" done title="Got it. Scanning X for every viral app launch from the last 3 months..." at={0} y={18} />
        <AgentStatus avatar={statusAv(1)} agent="Comments" state="Researching" done title="Reading reviews: what viewers love, hate, and still want." at={22} y={52} />
      </AbsoluteFill>
    ),
  },
  {
    name: 'S7 post + tilt', dur: 45, bg: 'white', in: {type: 'blur', frames: 6},
    el: <PostTilt />,
  },
  {
    name: 'S8 deck', dur: 86, bg: 'white',
    el: (
      <AbsoluteFill>
        <CardStack3D cards={Array.from({length: 21}, (_, i) => <Post key={i} i={i} />)} every={2} collapseAt={66} />
        <Chip text="Analyzing every short drama post" at={68} avatar={<Av i={0} size={9} />} x={62} y={86} />
      </AbsoluteFill>
    ),
  },
  {name: 'S9 close-up', dur: 30, bg: 'white', el: (<AbsoluteFill><MediaCard src="" label="card art close-up" w={70} h={70} x={50} y={38} radius={41} /><Chip text="Reading 324 comments on top dramas" at={0} avatar={<Av i={1} size={14} />} x={52} y={84} from={[-8, 8]} /></AbsoluteFill>)},
  {name: 'S10 finding edge', dur: 72, bg: 'white', el: <FindingEdge />},
  {name: 'S11 comments', dur: 102, bg: 'none', el: <Comments />},
  {name: 'S12 wall', dur: 77, bg: 'white', el: <ThumbWall items={Array.from({length: 12}, (_, i) => <Post key={i} i={i} />)} cols={7} drift={0.3} />},
  {name: 'S13 one post', dur: 49, bg: 'white', in: {type: 'whip', dir: 'down', frames: 7}, el: <MediaCard src="" label="post card" w={48} h={78} x={50} y={50} radius={41} />},
  {
    name: 'S14 insights', dur: 30, bg: 'white', out: {type: 'whip', dir: 'up', frames: 4},
    el: <AgentStatus avatar={statusAv(2)} agent="Insights" state="Insights complete" done bold title="Huge demand. Here's your edge." sub="Viewers keep asking for the same three things." bullets={['01  Fair pricing: no coin traps, fewer ads', '02  Fresh stories: new episodes daily', '03  Launch on short-form: trailers, creator UGC']} at={0} y={18} />,
  },
  {name: 'S15 app screen', dur: 13, bg: 'white', in: {type: 'rise', frames: 11}, el: <MediaCard src="" label="web app screen" w={96} h={93} radius={15} />},
  {
    name: 'S16 fan', dur: 118, bg: 'white', in: {type: 'blur', frames: 8}, out: {type: 'zoom', scale: 3.2, rot: 0, frames: 17, px: 40},
    el: (
      <ScreenFan3D
        heading="Analyzing 150 apps..."
        screens={Array.from({length: 12}, () => ({src: ''}))}
        start={0}
        labels={[
          {text: 'Launch plan ready', x: 70, y: 20, at: 13, icon: <Av i={1} size={2.6} />},
          {text: 'App brief ready', x: 46, y: 24, at: 17, icon: <Av i={4} size={2.6} />},
          {text: '78 apps analyzed', x: 33, y: 33, at: 21, icon: <Av i={0} size={2.6} />},
          {text: 'Brand book reviewed', x: 44, y: 84, at: 25, icon: <Av i={1} size={2.6} />},
          {text: '6 screen layouts', x: 66, y: 80, at: 29, icon: <Av i={5} size={2.6} />},
          {text: 'Core features mapped', x: 70, y: 24, at: 49, icon: <Av i={3} size={2.6} />},
        ]}
      />
    ),
  },
  {
    name: 'S17 blueprint', dur: 79, bg: 'white', out: {type: 'blur', frames: 6},
    el: (
      <AbsoluteFill>
        <AgentStatus avatar={statusAv(4)} agent="Skill" state="Skill complete" done bold title="Your app blueprint is ready." sub="Research, demand, and your edge in one plan." at={8} y={34} />
        <FileCard variant="agent" title="Drama App Blueprint" at={16} x={54} y={66} />
      </AbsoluteFill>
    ),
  },
  {name: 'S18 building', dur: 45, bg: 'white', el: <AgentStatus avatar={statusAv(3)} agent="Build" state="Building" bold title="Building your drama app." sub={`Connecting the __${BRAND} API__`} bullets={['Plugging in cinematic scenes, motion transfer, and more...']} at={0} y={34} hl="#8DB51E" />},
  {name: 'S19 party', dur: 74, bg: 'white', el: <Party />},
  {
    name: 'S20 media', dur: 91, bg: 'white',
    el: (
      <AbsoluteFill>
        <AgentStatus avatar={<Av i={3} size={6} />} agent="Media" state="Working" bold title={`Generating episodes with ${BRAND}.`} bullets={['__Cinema__ for cinematic scenes.', '__Motion__ for motion transfer.', '__Posters__ for posters and ads.']} at={9} y={16} hl="#7FB51E" />
        <Pop at={30} style={{position: 'absolute', left: '16.2%', top: '70%', width: '16.7%', height: '45%', borderRadius: 15, overflow: 'hidden'}}><MediaFill src="" label="phone app" /></Pop>
      </AbsoluteFill>
    ),
  },
  {
    name: 'S21 phone', dur: 108, bg: 'white', out: {type: 'whip', dir: 'up', frames: 5},
    el: (
      <AbsoluteFill>
        <MediaCard src="" label="phone app screens" w={33.4} h={104} x={50} y={60} radius={30} />
        <Chip text="Publishing your app to the marketplace" at={71} avatar={<Av i={3} size={9} />} x={52} y={56} from={[-20, 0]} />
      </AbsoluteFill>
    ),
  },
  {
    name: 'S22 to fullscreen', dur: 100, bg: 'white', in: {type: 'rise', frames: 11},
    el: (
      <AbsoluteFill>
        <CardToFull src="" label="AI live action: reaction close-up" at={11} w={70} />
        <Chip text="Getting your app recommended by people" at={62} avatar={<Av i={1} size={14} />} x={68} y={74} from={[0, 6]} />
      </AbsoluteFill>
    ),
  },
  {name: 'S23 UGC', dur: 69, bg: 'white', el: <Carousel items={Array.from({length: 5}, () => ({src: ''}))} dropAt={51} />},
  {name: 'S24 lockup', dur: 89, bg: 'sky', push: 0.022, el: <Intro typed />},
];

function FindingEdge() {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  return (
    <CameraPath keys={[{at: 0, x: 50, y: 50, zoom: 1}, {at: 47, x: 50, y: 54, zoom: 1, ease: E.expoIn}, {at: 48, x: 42, y: 30, zoom: 1.475, ease: () => 1}, {at: 70, x: 42, y: 24, zoom: 1.475, ease: E.expoOut}]}>
      <AgentStatus avatar={statusAv(0)} agent="Research" state="Analyzing" title="Finding your edge in short drama." sub="Demand, competitors, and what viewers miss." bullets={['Mapping top drama apps.', 'Checking downloads and revenue.', "Reading reviews for what's missing."]} at={0} y={22} />
      {f >= 49 ? (
        <div style={{position: 'absolute', left: '19.6%', top: '8%', fontFamily: FONT.ui, fontSize: 0.05 * height * 1.38, color: '#060408'}}>
          <Stream text="Here's what I found." start={49} unit="word" cps={30} tail={5} blur={8} accent={null} />
        </div>
      ) : null}
    </CameraPath>
  );
}

function PostTilt() {
  const f = useCurrentFrame();
  const {height} = useVideoConfig();
  const tilt = interpolate(f, [11, 33], [0, -25], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut});
  const back = interpolate(f, [31, 44], [1, 0.81], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill style={{perspective: 3100 * (height / 1080)}}>
      <AbsoluteFill style={{transform: `scale(${back}) translateX(${(1 - back) * -60}%) rotateY(${tilt}deg)`}}>
        <div style={{position: 'absolute', left: '23%', top: '8.6%', width: '53.8%', height: '83.1%'}}><Post i={0} /></div>
        <Chip text="Analyzing every short drama post" at={1} avatar={<Av i={0} size={9} />} x={66} y={52} from={[12, -24]} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

export const STORY_FRAMES = totalFrames(STORY_SCENES); // 1787

export const AgentsStory: React.FC<{music?: string}> = ({music}) => {
  const st = sceneStarts(STORY_SCENES);
  return (
    <AbsoluteFill>
      <Timeline scenes={STORY_SCENES} />
      {music ? <Html5Audio src={staticFile(music)} /> : null}
      <Sfx name="whoosh" at={st[1]} volume={0.45} />
      <Sfx name="typing" at={st[2] + 39} volume={0.2} dur={50} />
      <Sfx name="whoosh" at={st[3] + 47} volume={0.3} />
      <Sfx name="swish" at={st[7] + 2} volume={0.3} />
      <Sfx name="whoosh" at={st[10] + 98} volume={0.35} />
      <Sfx name="whoosh" at={st[15] + 110} volume={0.4} />
      <Sfx name="pop" at={st[18] + 5} volume={0.3} />
      <Sfx name="impact" at={st[17]} volume={0.5} />
    </AbsoluteFill>
  );
};
