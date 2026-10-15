// Archetype D - offer / numbers. A shot-for-shot rebuild of reference v4 (26.1 s, 782 frames @30,
// 132.5 BPM drive) with a neutral brand. Every frame number below is the measured one.
// Bed:  python scripts/synth_audio.py public --style drive --bpm 132.5 --bars 14 --drop-beat 6 --end-beat 53
// Swap BRAND, the numbers and the plates (empty src = labelled placeholder).
import React from 'react';
import {AbsoluteFill, Easing, Html5Audio, interpolate, interpolateColors, staticFile, useCurrentFrame} from 'remotion';
import {
  BalanceCard, Blink, Brackets, COLOR, Coins, CornerMarks, Counter, E, EndCard, FONT, GlitchHud, GlyphFade, GradientMap, MediaFill,
  Scramble, Sfx, THERMAL, Tag, Timeline, Wheel, sceneStarts, totalFrames, type SceneSpec,
} from '../hfm';

const BRAND = 'Northwind';
const H: React.CSSProperties = {fontFamily: FONT.display, fontWeight: 800, color: COLOR.ink, letterSpacing: '-0.035em', lineHeight: 0.98, textAlign: 'center', whiteSpace: 'nowrap'};
const center: React.CSSProperties = {justifyContent: 'center', alignItems: 'center', flexDirection: 'column'};
/** cap height % of frame -> font-size px @1080 for Inter Tight (cap / em ~ 0.727) */
const cap = (pct: number) => (pct / 100) * 1080 / 0.727;

// S1 0-55: title, group scale .60 -> 1 (bezier .40,1,1,1) over 46 f, blur 6 -> 0 over f3-15
const Title: React.FC = () => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 46], [0.6, 1], {extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 1, 1, 1)});
  const blur = interpolate(f, [3, 15], [6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Coins count={16} start={-20} speed={0.05} dir={-80} />
      <AbsoluteFill style={{...center, transform: `scale(${s})`, filter: blur > 0.1 ? `blur(${blur}px)` : undefined}}>
        <div style={{...H, fontSize: cap(21.2)}}>100%</div>
        <div style={{...H, fontSize: cap(16)}}>
          <Brackets at={8}>
            <Scramble text="CASHBACK" start={3} cps={18} colorIn={COLOR.lime} color={COLOR.ink} />
          </Brackets>
        </div>
        <div style={{marginTop: 30}}>
          <Tag text={`on ${BRAND} api`} at={16} variant="pill" size={7.2} typed />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// S5 115-173: per-glyph fades, pill wipes from centre, settle 1.17 -> 1 (cubic-out, 42 f), exit zoom 1 -> 1.46 (quart-in, 15 f)
const Pool: React.FC = () => {
  const f = useCurrentFrame();
  const settle = interpolate(f, [0, 42], [1.17, 1], {extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.7, 1)});
  const exit = interpolate(f, [43, 58], [1, 1.46], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.9, 0.2)});
  return (
    <AbsoluteFill>
      <Coins count={12} seed="pool" start={-40} speed={0.04} dir={-100} sizeMin={10} sizeMax={40} />
      <AbsoluteFill style={{...center, transform: `scale(${settle * exit})`}}>
        <div style={{...H, fontSize: cap(6.7)}}><GlyphFade text="WE'RE ALLOCATING" start={-4} stagger={1.3} /></div>
        <div style={{...H, fontSize: cap(14.8), marginTop: 18}}><GlyphFade text="$20,000,000" start={-4} stagger={1.7} fade={8} /></div>
        <div style={{marginTop: 26}}><Tag text="cashback pool" at={2} variant="pill" size={6.7} typed /></div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// S6 176-232: scramble both lines in parallel, text grows, punch-in at 199 (x1.18, 4 f expo-out), un-type at 224
const FirstCome: React.FC = () => {
  const f = useCurrentFrame();
  const grow = interpolate(f, [4, 22], [0.73, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.cubicOut});
  const punch = interpolate(f, [23, 27], [1, 1.18], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.expoOut});
  const out = interpolate(f, [48, 53], [1, 1.25], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{...center, transform: `scale(${grow * punch * out})`}}>
      <div style={{...H, fontSize: cap(12.1), lineHeight: 1.12}}>
        <Scramble text="FIRST COME," start={4} cps={25} outAt={48} seed="a" />
        <br />
        <Scramble text="FIRST SERVED" start={4} cps={25} outAt={48} seed="b" cursor />
      </div>
    </AbsoluteFill>
  );
};

// S8 379-419: bg black -> paper linear over 8 f, lockup typed pink -> ink, shrinks up, headline scrambles in
const Affordable: React.FC = () => {
  const f = useCurrentFrame();
  const bg = interpolateColors(f, [1, 9], ['#000000', '#FAF7FB']);
  const s = interpolate(f, [13, 22], [1, 0.67], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.6, 0.2, 0.1, 0.8)});
  const y = interpolate(f, [13, 22], [0, -14.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.6, 0.2, 0.1, 0.8)});
  return (
    <AbsoluteFill style={{backgroundColor: bg}}>
      <GlitchHud amount={f >= 16 && f <= 20 ? 0.8 : 0} seed="aff" />
      <AbsoluteFill style={{...center, transform: `translateY(${y}%) scale(${s})`}}>
        <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: cap(7.8), letterSpacing: '-0.03em', whiteSpace: 'nowrap'}}>
          <Scramble text={BRAND} start={0} cps={30} colorIn={COLOR.pink} color={COLOR.ink} />{' '}
          <span style={{fontFamily: FONT.mono, fontWeight: 500}}>
            <Scramble text="{API}" start={4} cps={30} colorIn={COLOR.lime} color={COLOR.ink} />
          </span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{...center, paddingTop: '14%'}}>
        <div style={{...H, fontSize: cap(9.5), lineHeight: 1.1}}>
          <Scramble text="MOST AFFORDABLE" start={18} cps={30} seed="m1" />
          <br />
          <Scramble text="ON THE MARKET" start={18} cps={30} seed="m2" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// S9 420-515: corner headline + wheel of model names (neutral list), glitch out
const MODELS = ['CAMERA 2.7', 'CINEMA 2.5', 'STUDIO 4K', 'MOTION 3.0', 'PORTRAIT XL', 'SOUND FX 2', 'LIPSYNC 3', 'VOICE 2.0', 'CINEMA 2.5', 'ANIMATE 3.0', 'TEXTURE PRO', 'SCENE 4', 'UPSCALE 2.7'];
const Market: React.FC = () => {
  const f = useCurrentFrame();
  const slashes = f < 19 ? '' : f < 36 ? '/' : f < 55 ? '//' : f < 74 ? '/' : '';
  const corner: React.CSSProperties = {...H, position: 'absolute', fontSize: cap(7.5), lineHeight: 1.05};
  return (
    <AbsoluteFill>
      <div style={{...corner, left: '5.2%', top: '4.7%', textAlign: 'left'}}>
        MOST {slashes}
        <br />
        <Scramble text="AFFORDABLE" start={7} cps={60} seed="c1" />
      </div>
      <div style={{...corner, right: '4.2%', bottom: '5.2%', textAlign: 'right'}}>
        <Blink at={11} />ON THE
        <br />
        <Scramble text="MARKET" start={7} cps={60} seed="c2" />
      </div>
      <Wheel
        items={MODELS}
        stops={[{at: 9, index: 1}, {at: 18, index: 2}, {at: 28, index: 3}, {at: 44, index: 4}, {at: 53, index: 8}, {at: 66, index: 9}, {at: 84, index: 10}]}
      />
    </AbsoluteFill>
  );
};

// S10 516-616: duotone heat plate, corner marks, typed pink -> ink, scramble-out at 580
const Claim: React.FC = () => (
  <AbsoluteFill>
    <GradientMap stops={THERMAL.v4}>
      <MediaFill src="" label="AI footage: person at a desk (gets the heat palette)" />
    </GradientMap>
    <CornerMarks />
    <AbsoluteFill style={center}>
      <div style={{...H, fontSize: cap(8.9)}}><Scramble text="CLAIM UP TO" start={4} cps={90} colorIn={COLOR.pillPink} outAt={64} outCps={60} /></div>
      <div style={{...H, fontSize: cap(18.1), lineHeight: 0.95}}><Scramble text="$100.000" start={8} cps={60} colorIn={COLOR.pillPink} outAt={68} outCps={60} /></div>
      <div style={{...H, fontSize: cap(8.6)}}><Scramble text="PER ORGANIZATION" start={12} cps={48} colorIn={COLOR.pillPink} outAt={64} outCps={60} /></div>
    </AbsoluteFill>
  </AbsoluteFill>
);

const white: React.CSSProperties = {...H, color: '#F9F6FA'};

export const OFFER_SCENES: SceneSpec[] = [
  {name: 'S1 title', dur: 56, bg: 'offer', out: {type: 'zoom', scale: 2.5, rot: 0, axis: 'y', px: 50, frames: 12}, el: <Title />},
  {
    name: 'S2 product object', dur: 24, bg: 'paper', in: {type: 'blur', px: 20, frames: 12},
    el: (
      <AbsoluteFill style={center}>
        <div style={{width: 430, height: 430, borderRadius: 70, background: `linear-gradient(145deg, ${COLOR.lime}, #A8C514)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, color: '#5B6E00'}}>
          <div style={{fontSize: 34, fontFamily: FONT.display, fontWeight: 700, letterSpacing: '0.08em'}}>{BRAND.toUpperCase()}</div>
          <div style={{fontSize: 110}}>{'{API}'}</div>
        </div>
      </AbsoluteFill>
    ),
  },
  {name: 'S3 stack + tag', dur: 15, bg: 'paper', el: (<AbsoluteFill style={center}><Coins count={10} seed="s3" speed={0.02} dir={90} sizeMin={14} sizeMax={30} /><Tag text="+$25,000" at={3} variant="dark" size={7.8} /></AbsoluteFill>)},
  {name: 'S4 stack + tag', dur: 20, bg: 'paper', el: (<AbsoluteFill style={center}><Coins count={12} seed="s4" speed={0.12} dir={90} sizeMin={10} sizeMax={26} /><Tag text="+$30,000" at={4} variant="dark" size={7.8} /></AbsoluteFill>)},
  {name: 'S5 pool', dur: 59, bg: 'offer', el: <Pool />},
  {name: 'white beat', dur: 2, bg: 'white', el: null},
  {name: 'S6 first come', dur: 57, bg: 'tech', out: {type: 'glitch', to: 'black', frames: 5}, el: <FirstCome />},
  {
    name: 'S7 balance', dur: 146, bg: 'darkGrid', in: {type: 'glitch', frames: 6},
    el: <BalanceCard label={['Your', `${BRAND} {API}`, 'Balance']} from={10000} to={2629} spendAt={49} refillAt={109} />,
  },
  {name: 'S8 affordable', dur: 41, bg: 'none', el: <Affordable />},
  {name: 'S9 wheel', dur: 96, bg: 'white', in: {type: 'glitch', frames: 8}, out: {type: 'glitch', frames: 8}, el: <Market />},
  {name: 'S10 claim', dur: 101, bg: 'none', in: {type: 'glitch', frames: 4}, out: {type: 'glitch', to: 'black', frames: 17}, el: <Claim />},
  {
    name: 'S11 september', dur: 47, bg: 'calendar', push: -0.016, in: {type: 'glitch', frames: 10}, out: {type: 'glitch', frames: 8},
    el: (
      <AbsoluteFill style={center}>
        <div style={{...white, fontSize: cap(9.2)}}>
          <Brackets open="[" close="]" at={4}><Scramble text="SEPTEMBER ONLY" start={4} cps={30} color="#F9F6FA" /></Brackets>
        </div>
        <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: cap(3.9), color: '#A2A0A4', marginTop: 24}}>
          <Counter keys={[{at: 4, value: 20000000}, {at: 4, value: 20000000 - 90601.5 * 43, dur: 43}]} prefix="$" hblur={5} />
        </div>
      </AbsoluteFill>
    ),
  },
  {
    name: 'S12 expires', dur: 68, bg: 'calendar', push: -0.02, out: {type: 'fade', frames: 14},
    el: (
      <AbsoluteFill style={center}>
        <div style={{...white, fontSize: cap(8.9), lineHeight: 1.05}}>
          <Scramble text="UNUSED CASHBACK" start={0} cps={60} color="#F9F6FA" seed="u1" />
          <br />
          <Scramble text="EXPIRES SEPTEMBER 30th" start={1} cps={60} color="#F9F6FA" seed="u2" />
        </div>
        <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: cap(3.9), color: '#A2A0A4', marginTop: 24}}>
          <Counter keys={[{at: 0, value: 9173155}, {at: 0, value: 0, dur: 70}]} prefix="$" hblur={5} />
        </div>
      </AbsoluteFill>
    ),
  },
  {name: 'S13 end card', dur: 50, bg: 'white', el: <EndCard lines={[`Starts now at open.${BRAND.toLowerCase()}.ai`]} at={1} entry="fade" size={3.6} color="#000" />},
];

export const OFFER_FRAMES = totalFrames(OFFER_SCENES); // 782

export const OfferPromo: React.FC<{music?: string}> = ({music}) => {
  const st = sceneStarts(OFFER_SCENES);
  return (
    <AbsoluteFill>
      <Timeline scenes={OFFER_SCENES} />
      {music ? <Html5Audio src={staticFile(music)} /> : null}
      <Sfx name="whoosh" at={st[1]} volume={0.4} />
      <Sfx name="pop" at={st[2] + 3} volume={0.35} />
      <Sfx name="pop" at={st[3] + 4} volume={0.35} />
      <Sfx name="coin" at={st[4] + 8} volume={0.25} />
      <Sfx name="glitch" at={st[6] + 4} volume={0.3} />
      <Sfx name="glitch" at={st[7] - 3} volume={0.35} />
      <Sfx name="tick" at={st[7] + 50} volume={0.25} />
      <Sfx name="tick" at={st[7] + 109} volume={0.25} />
      <Sfx name="glitch" at={st[8] + 16} volume={0.25} />
      <Sfx name="glitch" at={st[9]} volume={0.3} />
      <Sfx name="swish" at={st[9] + 53} volume={0.3} />
      <Sfx name="glitch" at={st[10] - 2} volume={0.3} />
      <Sfx name="glitch" at={st[11]} volume={0.3} />
      <Sfx name="glitch" at={st[12] - 4} volume={0.3} />
    </AbsoluteFill>
  );
};
