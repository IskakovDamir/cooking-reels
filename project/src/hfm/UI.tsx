// Recreated product UI, measured in the references. Sizes in px @1080 (scaled to the composition) or
// % of frame height. v1 = Claude collab composer/status/choice/file/detection; v3 = agent pill composer,
// agent status block, chips, mascots; v4 = balance card.
import {scaled, useSpeed} from './profile';
import React from 'react';
import {Easing, interpolate, interpolateColors, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {E, clamp01, prog, useShort} from './core';
import {COLOR, FONT, SPRINGS, UI} from './tokens';
import {Counter, formatNumber, Stream} from './Text';
import {MediaFill, type Src} from './Media';
import {ClaudeLines, Flow, Pop, Shimmer, claudeColor} from './Motion';
import {Spark} from './Labels';

const useK = () => useShort() / 1080;

/** Brand icon tile (v1 Higgsfield-style lime rounded square, radius 13 %), any glyph or logo inside. */
export const IconTile: React.FC<{size?: number; top?: string; bottom?: string; children?: React.ReactNode}> = ({size = 92, top = UI.hfIconTop, bottom = UI.hfIconBottom, children}) => {
  const k = useK();
  return (
    <div style={{width: size * k, height: size * k, borderRadius: size * k * 0.13, background: `linear-gradient(180deg, ${top}, ${bottom})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: size * k * 0.5, color: COLOR.ink}}>
      {children}
    </div>
  );
};

/**
 * v1 Claude composer: big card (radius 75 px, soft shadow) with attachment thumbs (287 px, radius 48),
 * a file tile, the prompt typed at 50 cps with the whole text running the Claude colour ramp, "+",
 * model + mode, and the send button (#D97C60, radius 33 %). `sendAt` = press: 0.83x, cream fill, peach
 * halo, 19 f. Render it large and move a CameraPath over it (wide -> whip -> 2.1x close-up on send).
 */
export const ClaudeComposer: React.FC<{
  text: string;
  typeAt?: number;
  cps?: number;
  attachments?: Src[];
  file?: {name: string; ext?: string};
  model?: string;
  mode?: string;
  sendAt?: number;
  x?: number;
  y?: number;
  w?: number;
}> = ({text, typeAt = 0, cps = UI.claudeTypeCps, attachments = [], file, model = 'Opus 5.5', mode = 'Adaptive', sendAt, x = 25.5, y = 11.7, w = 90}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = useK();
  const sp = useSpeed();
  const n = Math.max(0, Math.min(text.length, Math.floor(((f - typeAt) * cps * sp) / fps)));
  const press = sendAt === undefined ? 0 : f >= sendAt && f < sendAt + 19 ? 1 : 0;
  const pressT = sendAt === undefined ? 0 : clamp01((f - sendAt) / 2) * (1 - clamp01((f - sendAt - 15) / 4));
  const halo = sendAt === undefined ? 0 : interpolate(f - sendAt, [0, 6, 19], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fill = sendAt === undefined ? UI.send : interpolateColors(f - sendAt, [-1, 1, 14, 19], [UI.send, UI.sendPressed, UI.sendPressed, UI.send]);
  const thumb = 287 * k;
  const fs = (UI.composerCap / 100) * useShort() * 1.38;
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${72.8}%`,
        background: '#FAF7FB',
        borderRadius: UI.composerRadius * k,
        boxShadow: `0 ${10 * k}px ${40 * k}px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.03)`,
        padding: `${72 * k}px ${72 * k}px`,
        boxSizing: 'border-box',
        fontFamily: FONT.ui,
      }}
    >
      <div style={{display: 'flex', gap: 24 * k}}>
        {attachments.map((a, i) => (
          <Pop key={i} at={i * 5} style={{width: thumb, height: thumb, borderRadius: 48 * k, overflow: 'hidden'}}>
            <MediaFill {...a} label={a.src ? undefined : 'photo'} />
          </Pop>
        ))}
        {file ? (
          <Pop at={attachments.length * 5 + 10} style={{width: thumb * 0.99, height: thumb * 0.99, borderRadius: 48 * k, background: '#ECE9ED', position: 'relative', boxShadow: `0 ${4 * k}px ${16 * k}px rgba(0,0,0,.06)`}}>
            <div style={{position: 'absolute', right: 24 * k, top: 22 * k, textAlign: 'right', color: '#656266', fontSize: 22 * k, lineHeight: 1.15, whiteSpace: 'pre-line'}}>{file.name}</div>
            <div style={{position: 'absolute', left: 22 * k, bottom: 22 * k, border: `${1.5 * k}px solid #666367`, color: '#666367', borderRadius: 12 * k, padding: `${4 * k}px ${14 * k}px`, fontSize: 20 * k}}>{file.ext ?? 'PDF'}</div>
          </Pop>
        ) : null}
      </div>
      <div style={{marginTop: 70 * k, fontSize: fs, color: claudeColor(f - typeAt), whiteSpace: 'pre'}}>{text.slice(0, n)}</div>
      <div style={{position: 'absolute', left: 102 * k, bottom: 92 * k, fontSize: 70 * k, lineHeight: 1, fontWeight: 300, color: COLOR.ink}}>+</div>
      <div style={{position: 'absolute', right: 110 * k, bottom: 70 * k, display: 'flex', alignItems: 'center', gap: 34 * k}}>
        <span style={{fontSize: fs * 0.95, color: '#4A4A4E'}}>{model}</span>
        <span style={{fontSize: fs * 0.95, color: '#8E8C90'}}>{mode} ⌄</span>
        <div style={{position: 'relative', width: 108 * k, height: 108 * k}}>
          <div style={{position: 'absolute', inset: -150 * k, borderRadius: '50%', background: `radial-gradient(circle, ${UI.sendHalo}dd 0%, ${UI.sendHalo}00 62%)`, opacity: halo}} />
          <div style={{position: 'absolute', inset: 0, borderRadius: '33%', background: fill, transform: `scale(${1 - 0.17 * pressT})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: press ? UI.send : '#fff', fontSize: 58 * k, fontWeight: 500, boxShadow: press ? `inset 0 0 0 ${3 * k}px #ffffffaa` : undefined}}>
            ↑
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * v3 pill composer: 1245 x 185 px fully rounded white pill, "+" left, black mic button right; springs up
 * from below (5 % overshoot, peak +8 f), types at 60-75 cps with a 2-3 glyph cyan head, no caret; at
 * `exitAt` lifts 40 px then drops out.
 */
export const PillComposer: React.FC<{text: string; at?: number; typeAt?: number; cps?: number; pause?: [number, number]; exitAt?: number; x?: number; y?: number; head?: string}> = ({
  text,
  pause,
  at = 0,
  typeAt = 9,
  cps = UI.pillTypeCps,
  exitAt,
  x = 41.3,
  y = 70.1,
  head = UI.pillHead,
}) => {
  const f = useCurrentFrame();
  const {fps, width: frameW, height: frameH} = useVideoConfig();
  const height = Math.min(frameW, frameH);
  const k = height / 1080;
  const s = spring({frame: f - at, fps, config: SPRINGS.pill});
  const enterY = (1 - s) * 415 * k;
  const exitY = exitAt === undefined ? 0 : interpolate(f, [exitAt, exitAt + 5, exitAt + 10], [0, -60 * k, 400 * k], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  // optional pause: after `pause[0]` characters, hold for `pause[1]` frames (v3: 20 chars, 30 f)
  const sp = useSpeed();
  let t = (f - at - typeAt) * sp;
  if (pause) {
    const pf = (pause[0] * fps) / cps;
    if (t > pf) t = Math.max(pf, t - pause[1]);
  }
  const n = Math.max(0, Math.min(text.length, Math.floor((t * cps) / fps)));
  if (f < at) return null;
  return (
    <div style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width: Math.min(1245 * k, 0.92 * frameW), height: 185 * k, transform: `translate(-50%,-50%) translateY(${enterY + exitY}px)`, background: '#fff', borderRadius: 92 * k, display: 'flex', alignItems: 'center', padding: `0 ${44 * k}px`, gap: 40 * k, boxSizing: 'border-box', fontFamily: FONT.ui}}>
      <div style={{width: 52 * k, height: 52 * k, borderRadius: '50%', border: `${3 * k}px solid #646165`, color: '#646165', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 * k, flex: 'none'}}>+</div>
      <div style={{flex: 1, fontSize: 47 * k, color: '#1C1A1E', whiteSpace: 'pre'}}>
        {Array.from(text.slice(0, n)).map((ch, i) => {
          const age = n - i;
          return (
            <span key={i} style={{color: age <= 3 ? interpolateColors(age, [1, 3], [head, '#1C1A1E']) : undefined}}>
              {ch}
            </span>
          );
        })}
      </div>
      <div style={{width: 75 * k, height: 75 * k, borderRadius: '50%', background: '#110F12', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 * k, flex: 'none'}}>●</div>
    </div>
  );
};

/**
 * v1 Claude status block: spark (wobbling) + lines revealed by ClaudeLines, riding the Flow choreography.
 * `head` = the big bold one-sentence variant (cap 7.8 %H, ink, rises with blur 7.5 -> 0, optional shimmer).
 */
export const ClaudeStatus: React.FC<{
  lines: string[];
  at?: number;
  outAt?: number;
  head?: boolean;
  shimmerAt?: number;
  icon?: React.ReactNode;
  y?: number;
  x?: number;
}> = ({lines, at = 0, outAt, head = false, shimmerAt, icon, y = 47, x = UI.claudeTextX}) => {
  const height = useShort();
  const cap = head ? UI.claudeHeadCap : UI.claudeBodyCap;
  const fs = (cap / 100) * height * 1.38;
  const sparkSize = head ? 14.6 : 6;
  return (
    <Flow at={at} outAt={outAt} rise={head ? 225 : 172} style={{position: 'absolute', left: 0, right: 0, top: `${y}%`}}>
      <div style={{position: 'absolute', left: `${x - (head ? 9.4 : 4.6)}%`, top: 0, transform: 'translateY(-50%)'}}>{icon ?? <Spark size={sparkSize} color={UI.claudeSpark} wobble />}</div>
      <div style={{position: 'absolute', left: `${x}%`, right: '5%', top: 0, transform: 'translateY(-50%)', fontFamily: FONT.ui, fontSize: fs, lineHeight: head ? 0.98 : 1.35, fontWeight: head ? 700 : 400, letterSpacing: head ? '-0.035em' : '-0.005em', whiteSpace: 'pre'}}>
        {head ? (
          lines.map((l, i) => (
            <div key={i}>
              {shimmerAt !== undefined ? (
                <Shimmer at={shimmerAt + i}>{l}</Shimmer>
              ) : (
                <span style={{color: UI.claudeHead}}>{l}</span>
              )}
            </div>
          ))
        ) : (
          <ClaudeLines lines={lines} at={at} />
        )}
      </div>
    </Flow>
  );
};

/**
 * v3 agent status block: [avatar] Agent • status (green), then title (regular cap 5.0 %H, or bold 4.3 %H),
 * grey sub, bullets. Words fade in 1 f apart with blur 8 -> 0 over 5 f; lines 7 f apart.
 */
export const AgentStatus: React.FC<{
  avatar?: React.ReactNode;
  agent: string;
  state?: string;
  done?: boolean;
  title: string;
  bold?: boolean;
  sub?: string;
  bullets?: string[];
  at?: number;
  x?: number;
  y?: number;
  hl?: string;
}> = ({avatar, agent, state, done = false, title, bold = false, sub, bullets = [], at = 0, x = UI.agentTextX, y = 22, hl}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const H = (p: number) => (p / 100) * height * 1.38;
  const words = (t: string, st: number, color: string, w = 400) => <Stream text={t} start={st} unit="word" cps={30} tail={5} blur={8} accent={null} color={color} hlColor={hl ?? COLOR.hl} boldWeight={w} />;
  return (
    <div style={{position: 'absolute', left: `${x}%`, top: `${y}%`, right: '6%', fontFamily: FONT.ui}}>
      {avatar ? <Pop at={at} style={{position: 'absolute', right: `calc(100% + ${H(1.6)}px)`, top: -H(0.4)}}>{avatar}</Pop> : null}
      <div style={{fontSize: H(UI.agentHeaderCap), color: COLOR.ink, display: 'flex', gap: H(0.8), alignItems: 'baseline', opacity: prog(f, at, 5, E.cubicOut)}}>
        <span style={{fontWeight: 600}}>{agent}</span>
        {state ? <span style={{color: UI.agentGreen}}>{done ? '✓' : '•'} {state}</span> : null}
      </div>
      <div style={{fontSize: H(bold ? UI.agentTitleBoldCap : UI.agentTitleCap), fontWeight: bold ? 700 : 400, color: '#060408', marginTop: H(0.9), letterSpacing: '-0.015em', lineHeight: 1.2}}>{words(title, at + 4, '#060408', bold ? 700 : 400)}</div>
      {sub ? <div style={{fontSize: H(UI.agentSubCap), color: UI.agentSub, marginTop: H(0.6)}}>{words(sub, at + 6, UI.agentSub)}</div> : null}
      {bullets.map((b, i) => (
        <div key={i} style={{fontSize: H(UI.agentSubCap), color: '#646165', marginTop: H(1.2), display: 'flex', gap: H(1), alignItems: 'center'}}>
          <span style={{width: H(2.4), height: H(2.4), borderRadius: '50%', border: `${H(0.25)}px dotted #CFCDD1`, display: 'inline-block', flex: 'none'}} />
          {words(b, at + 7 + i * 7, '#646165')}
        </div>
      ))}
    </div>
  );
};

/** v3 chip: fully rounded #EBE8EC pill, dark text cap 3.4 %H, avatar overlapping its left end; enters expo-out 8 f from an offset with motion blur. */
export const Chip: React.FC<{text: string; at?: number; avatar?: React.ReactNode; x?: number; y?: number; from?: [number, number]; size?: number}> = ({text, at = 0, avatar, x = 50, y = 80, from = [10, -20], size = 3.4}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const sp = useSpeed();
  const t = prog(f, at, scaled(8, sp, 4), E.expoOut);
  const fs = (size / 100) * height * 1.38;
  if (f < at) return null;
  const blur = f - at < 2 ? 8 * (height / 1080) : 0;
  return (
    <div style={{position: 'absolute', left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-50%) translate(${(1 - t) * from[0]}vh, ${(1 - t) * from[1]}vh)`, filter: blur ? `blur(${blur}px)` : undefined, display: 'flex', alignItems: 'center'}}>
      {avatar ? <div style={{marginRight: -fs * 0.6, zIndex: 2}}>{avatar}</div> : null}
      <div style={{background: UI.chip, borderRadius: 999, padding: `${fs * 0.62}px ${fs * 1.05}px ${fs * 0.62}px ${avatar ? fs * 1.2 : fs * 1.05}px`, fontFamily: FONT.ui, fontSize: fs, color: '#1F1C20', whiteSpace: 'nowrap'}}>
        <Stream text={text} start={at + 2} cps={70} tail={6} accent={null} color="#1F1C20" />
      </div>
    </div>
  );
};

/** File / document card. 'claude' (v1): #DFDDE0, 1390 x 223, Download | ⌄ button. 'agent' (v3): #F0F3F6 doc card with a blue doc icon. */
export const FileCard: React.FC<{title: string; meta?: string; variant?: 'claude' | 'agent'; at?: number; x?: number; y?: number; w?: number}> = ({title, meta, variant = 'claude', at = 0, x = 50, y = 50, w}) => {
  const k = useK();
  const claude = variant === 'claude';
  const width = (w ?? (claude ? 72.4 : 76.2)) + '%';
  return (
    <Flow at={at} rise={206} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width, transform: 'translate(-50%,-50%)'}}>
      <div style={{background: claude ? '#DFDDE0' : UI.docCard, borderRadius: (claude ? 30 : 21) * k, height: (claude ? 223 : 184) * k, display: 'flex', alignItems: 'center', gap: 34 * k, padding: `0 ${40 * k}px`, fontFamily: FONT.ui, overflow: 'hidden'}}>
        {claude ? (
          <div style={{width: 160 * k, height: 190 * k, marginTop: 60 * k, borderRadius: 14 * k, background: 'linear-gradient(180deg,#BBB9BC,#D3D1D4)', flex: 'none'}} />
        ) : (
          <div style={{width: 60 * k, height: 60 * k, borderRadius: 12 * k, background: '#DCE6FA', color: '#3F64CB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 * k, flex: 'none'}}>▤</div>
        )}
        <div style={{flex: 1}}>
          <div style={{fontSize: (claude ? 58 : 34) * k, fontWeight: claude ? 600 : 500, color: claude ? '#727073' : COLOR.ink}}>{title}</div>
          <div style={{fontSize: (claude ? 28 : 24) * k, color: claude ? '#B3B1B4' : COLOR.mute, marginTop: 6 * k}}>{meta ?? (claude ? 'Document · ZIP' : 'Document')}</div>
        </div>
        {claude ? (
          <div style={{background: '#C6C4C8', borderRadius: 18 * k, padding: `${22 * k}px ${30 * k}px`, fontSize: 36 * k, color: '#565357', display: 'flex', gap: 22 * k}}>
            Download <span style={{opacity: 0.5}}>|</span> ⌄
          </div>
        ) : (
          <div style={{fontSize: 34 * k, color: COLOR.mute}}>⤓</div>
        )}
      </div>
    </Flow>
  );
};

/**
 * v1 Claude question + Yes / No pills (397 x 190, fully rounded; Yes #CAC8CB, No #262327). Pills pop
 * 5 f apart; `pickAt` presses Yes: 0.78x and Claude coral for 6 f (1 f down, 5 f held, 2 f back).
 */
export const Choice: React.FC<{question: string; options?: [string, string]; at?: number; pickAt?: number; y?: number; icon?: React.ReactNode}> = ({question, options = ['Yes', 'No'], at = 0, pickAt, y = 42.6, icon}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const k = height / 1080;
  const fs = (4.9 / 100) * height * 1.38;
  const pressed = pickAt !== undefined && f >= pickAt + 1 && f < pickAt + 7;
  const pressT = pickAt === undefined ? 0 : interpolate(f - pickAt, [0, 1, 6, 8], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Flow at={at} rise={45} style={{position: 'absolute', left: 0, right: 0, top: `${y}%`}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30 * k, transform: 'translateY(-50%)'}}>
        {icon ?? <Spark size={6} color={UI.claudeSpark} wobble />}
        <div style={{fontFamily: FONT.ui, fontSize: fs}}>
          <ClaudeLines lines={[question]} at={at} color="#574E57" />
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 45 * k, marginTop: 30 * k}}>
        {options.map((o, i) => (
          <Pop key={o} at={at + i * 5} style={{width: 397 * k, height: 190 * k}}>
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 999,
                background: i === 0 ? (pressed ? UI.yesPressed : interpolateColors(pressT, [0, 1], ['#CAC8CB', UI.yesPressed])) : '#262327',
                color: i === 0 ? '#5D5B5F' : '#8D8B8E',
                transform: `scale(${i === 0 ? 1 - 0.22 * pressT : 1})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.ui,
                fontSize: 65 * k,
              }}
            >
              {o}
            </div>
          </Pop>
        ))}
      </div>
    </Flow>
  );
};

/**
 * v4 balance card on black: 89.6 %W, radius 40, gradient #FAF7FB -> #C9F214 with a lime bloom; label
 * left (cap 4.6 %H), big number right (cap 13.9 %H) counting LINEARLY with a tint pulse, right-anchored
 * underline that shrinks with the value; Spend label rises in pink, exits right; Cashback slides in from
 * the left in lime, then drops into the card. Times are local frames.
 */
export const BalanceCard: React.FC<{
  label: string[];
  from: number;
  to: number;
  spendAt?: number;
  refillAt?: number;
  spendLabel?: string;
  gainLabel?: string;
  at?: number;
  prefix?: string;
}> = ({label, from, to, spendAt = 50, refillAt = 109, spendLabel = 'Spend', gainLabel = 'Cashback', at = 0, prefix = '$'}) => {
  const f = useCurrentFrame() - at;
  const {width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  const k = height / 1080;
  const intro = interpolate(f, [0, 30], [0.05, 0.607], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.1, 0.6, 0.4, 1)});
  const push = interpolate(f, [30, 50], [0.607, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.7, 0, 0.2, 1)});
  const scale = f < 30 ? intro : push;
  const top = f < 30 ? interpolate(intro, [0.05, 0.607], [98.7, 23.4]) : interpolate(push, [0.607, 1], [23.4, 54.9]);
  const exitY = interpolate(f, [117, 144], [0, -110], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.3, 0, 0.7, 0.2)});
  const delta = Math.abs(to - from);
  const valueKeys = [{at: 0, value: from}, {at: spendAt + 1, value: to}, {at: refillAt, value: from}];
  const spendT = interpolate(f, [spendAt, spendAt + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const spendOut = interpolate(f, [spendAt + 16, spendAt + 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.6, 0, 1, 0.6)});
  const gainIn = interpolate(f, [spendAt + 34, spendAt + 48], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
  const gainDrop = interpolate(f, [spendAt + 53, spendAt + 63], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad)});
  const tint = f >= refillAt - 1 ? COLOR.gain : COLOR.spend;
  const cardW = 0.896 * width;
  return (
    <div style={{position: 'absolute', left: '50%', top: `${top}%`, width: cardW, transform: `translateX(-50%) translateY(${exitY}%) scale(${scale})`, transformOrigin: '50% 0%'}}>
      <div style={{position: 'absolute', left: '5%', right: '5%', top: -160 * k, height: 420 * k, background: `radial-gradient(ellipse at 50% 60%, ${COLOR.lime}99 0%, ${COLOR.lime}00 70%)`, filter: `blur(${60 * k}px)`}} />
      <div style={{position: 'relative', height: 700 * k, borderRadius: 40 * k, background: 'linear-gradient(180deg,#FAF7FB 0%,#FAF7FB 12%,#FAF9C9 30%,#FAF778 50%,#ECFA2A 72%,#C9F214 100%)', fontFamily: FONT.display}}>
        <div style={{position: 'absolute', left: 88 * k, top: 52 * k, fontSize: 69 * k, lineHeight: `${69 * k}px`, color: '#050400', fontWeight: 500, letterSpacing: '-0.02em'}}>
          {label.map((l, i) => (
            <div key={i} style={{textAlign: i === label.length - 1 ? 'right' : 'left'}}>{l}</div>
          ))}
        </div>
        <div style={{position: 'absolute', right: 92 * k, top: 40 * k, textAlign: 'right'}}>
          <div style={{fontSize: 207 * k, fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1}}>
            <Counter keys={valueKeys} dur={10} prefix={prefix} tint={tint} style={{color: '#181803'}} />
          </div>
          <div style={{height: 4 * k, background: '#181803', marginLeft: 'auto', width: `${interpolate(f, [spendAt + 1, spendAt + 10, refillAt, refillAt + 10], [100, 20, 20, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.expoOut})}%`, marginTop: 14 * k}} />
        </div>
      </div>
      <div style={{position: 'absolute', right: 92 * k, bottom: `calc(100% + ${12 * k}px)`, textAlign: 'right', fontFamily: FONT.display, color: COLOR.spend, opacity: spendT > 0 ? 1 - spendOut * 0.2 : 0, transform: `translate(${spendOut * 900 * k}px, ${(1 - spendT) * 173 * k}px)`, filter: f - spendAt < 4 ? `blur(${(4 - (f - spendAt)) * 3 * k}px)` : undefined}}>
        <div style={{fontSize: 95 * k, fontWeight: 600, lineHeight: 1}}>{spendLabel}</div>
        <div style={{fontSize: 196 * k, fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 1}}>-{prefix}{formatNumber(delta)}</div>
      </div>
      <div style={{position: 'absolute', right: 92 * k, bottom: `calc(100% + ${12 * k}px)`, textAlign: 'right', fontFamily: FONT.display, color: COLOR.gain, opacity: gainIn > 0 ? 1 - gainDrop : 0, transform: `translate(${(1 - gainIn) * -670 * k}px, ${gainDrop * 135 * k}px)`}}>
        <div style={{fontSize: 95 * k, fontWeight: 600, lineHeight: 1}}>{gainLabel}</div>
        <div style={{fontSize: 196 * k, fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 1}}>+{prefix}{formatNumber(delta)}</div>
      </div>
    </div>
  );
};

/**
 * v1 detection box: rounded rect (radius 18 px) whose stroke colour is the verdict (warn yellow, bad
 * red, good green), drawn on in 6 f; "Condition" typed 1 char/f; % counter LINEAR (~+8 %/f) in the box's
 * top-right; `good` boxes blink a light-green fill 3x (10 f period).
 */
export const DetectBox: React.FC<{x: number; y: number; w: number; h: number; label?: string; value: number; from?: number; verdict?: 'warn' | 'bad' | 'good'; at?: number; labelInside?: boolean; blink?: boolean}> = ({
  x,
  y,
  w,
  h: bh,
  label = 'Condition',
  value,
  from = 0,
  verdict = 'warn',
  at = 0,
  labelInside = false,
  blink,
}) => {
  const f = useCurrentFrame();
  const {fps, width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  const k = height / 1080;
  const col = UI.detect[verdict];
  const sp = useSpeed();
  const draw = prog(f, at, scaled(6, sp, 3), E.cubicOut);
  const pw = (w / 100) * width;
  const ph = (bh / 100) * frameH;
  const per = 2 * (pw + ph);
  // linear, ~+8.3 %/f @24 fps (v1)
  const v = Math.round(interpolate(f, [at + 2, at + 2 + Math.max(1, ((value - from) / 8.3) * (fps / 24) / sp)], [from, value], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const changing = f >= at + 2 && v < value;
  const bl = (blink ?? verdict === 'good') && f > at + 12 && f < at + 42 ? (Math.sin(((f - at - 12) / 10) * 2 * Math.PI - Math.PI / 2) + 1) / 2 : 0;
  const fs = 55 * k;
  if (f < at) return null;
  return (
    <div style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${bh}%`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 18 * k, background: UI.detect.goodFill, opacity: bl * 0.85}} />
      <svg width={pw} height={ph} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <rect x={2.5 * k} y={2.5 * k} width={pw - 5 * k} height={ph - 5 * k} rx={18 * k} fill="none" stroke={col} strokeWidth={5 * k} strokeDasharray={per} strokeDashoffset={per * (1 - draw)} />
      </svg>
      <div style={{position: 'absolute', left: labelInside ? 24 * k : 0, top: labelInside ? 18 * k : undefined, bottom: labelInside ? undefined : `calc(100% + ${10 * k}px)`, fontFamily: FONT.ui, fontWeight: 700, fontSize: fs, color: COLOR.ink, whiteSpace: 'pre'}}>
        {label.slice(0, Math.max(0, Math.floor(f - at)))}
      </div>
      <div style={{position: 'absolute', right: 24 * k, top: 14 * k, fontFamily: FONT.ui, fontWeight: 700, fontSize: fs, color: col, filter: changing ? `blur(${1.5 * k}px)` : undefined}}>{v}%</div>
    </div>
  );
};

export type CritterShape = 'blob' | 'flower' | 'square' | 'triangle' | 'drop' | 'bear' | 'pill' | 'clover';
const FACES = ['••', 'oo', '><', '^^', '--', '**', '++'];

/**
 * v3 mascot: flat colour blob with glyph eyes. Pops with an underdamped spring (1.20 at +3 f, 0.96 at
 * +7, settled +11), does one "breathing" bump to 1.26 over 9 f at `breatheAt`, swaps its face every 6-10 f.
 */
export const Critter: React.FC<{shape?: CritterShape; color?: string; size?: number; x?: number; y?: number; at?: number; breatheAt?: number; faces?: string[]; seed?: number}> = ({
  shape = 'blob',
  color = '#0073FF',
  size = 12.5,
  x = 50,
  y = 50,
  at = 0,
  breatheAt,
  faces,
  seed = 0,
}) => {
  const f = useCurrentFrame();
  const {fps, width: frameW, height: frameH} = useVideoConfig();
  const height = Math.min(frameW, frameH);
  const s = (size / 100) * height;
  const sp = useSpeed();
  const pop = spring({frame: (f - at) * sp, fps, config: SPRINGS.pop});
  const bt = breatheAt === undefined ? 0 : clamp01((f - breatheAt) / 9);
  const breathe = breatheAt === undefined || f < breatheAt ? 1 : 1 + 0.26 * Math.sin(Math.PI * bt);
  const list = faces ?? [FACES[seed % FACES.length], FACES[(seed + 2) % FACES.length]];
  const face = list[Math.floor((f + seed * 7) / (6 + (seed % 5))) % list.length];
  const radius: Record<CritterShape, string> = {
    blob: '46% 54% 50% 50% / 55% 50% 50% 45%',
    flower: '38%',
    square: '24%',
    triangle: '22%',
    drop: '50% 50% 46% 46% / 62% 62% 38% 38%',
    bear: '50%',
    pill: '999px',
    clover: '42%',
  };
  const dark = color === '#2A282C' || color === '#29272A';
  if (f < at) return null;
  return (
    <div style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width: s, height: shape === 'pill' ? s * 0.66 : s, transform: `translate(-50%,-50%) scale(${pop * breathe})`}}>
      <div style={{position: 'absolute', inset: 0, background: color, borderRadius: radius[shape], clipPath: shape === 'triangle' ? 'polygon(50% 6%, 97% 92%, 3% 92%)' : undefined}} />
      {shape === 'bear' ? (
        <>
          <div style={{position: 'absolute', left: '2%', top: '-6%', width: '32%', height: '32%', borderRadius: '50%', background: color}} />
          <div style={{position: 'absolute', right: '2%', top: '-6%', width: '32%', height: '32%', borderRadius: '50%', background: color}} />
        </>
      ) : null}
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.ui, fontWeight: 800, fontSize: s * 0.28, letterSpacing: '0.08em', color: dark ? '#fff' : '#111', paddingTop: shape === 'triangle' ? s * 0.18 : 0}}>{face}</div>
    </div>
  );
};

/** Deterministic set of 6 mascots placed around a lockup (v3 positions), popping in a ripple. */
export const CritterRing: React.FC<{at?: number}> = ({at = 0}) => {
  const set: {shape: CritterShape; color: string; x: number; y: number; d: number; b: number}[] = [
    {shape: 'blob', color: '#09B651', x: 83.8, y: 82.6, d: 6, b: 16},
    {shape: 'triangle', color: '#2A282C', x: 12.2, y: 82.2, d: 7, b: 22},
    {shape: 'clover', color: '#0073FF', x: 48.3, y: 21.7, d: 9, b: 30},
    {shape: 'square', color: '#E0DEE1', x: 86.7, y: 29.9, d: 10, b: 24},
    {shape: 'flower', color: '#FC7B1B', x: 16.1, y: 20.8, d: 12, b: 27},
    {shape: 'blob', color: '#8D54DD', x: 52, y: 77.9, d: 16, b: 25},
  ];
  return (
    <>
      {set.map((c, i) => (
        <Critter key={i} shape={c.shape} color={c.color} x={c.x} y={c.y} at={at + c.d} breatheAt={at + c.b} seed={i} />
      ))}
    </>
  );
};

/** Deterministic jitter helper re-exported for scenes that scatter mascots. */
export const scatter = (seed: string, n: number) => Array.from({length: n}, (_, i) => ({x: 8 + random(`${seed}x${i}`) * 84, y: 10 + random(`${seed}y${i}`) * 80}));

