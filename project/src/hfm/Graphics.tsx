// Rebuilt graphics: product UI and data drawn in code so every piece can animate on its own
// (terminal, warning toast, chips, bar / line / donut charts, metric, file map with agent cursors).
// Sizes are px @1080 short side; colours default to the theme but every component takes overrides.
import React from 'react';
import {random, useCurrentFrame, useVideoConfig} from 'remotion';
import {E, clamp01, lerp, prog, useShort} from './core';
import {COLOR, FONT} from './tokens';
import {useSpeed, useUi} from './profile';
import {formatNumber} from './Text';
import {Pop} from './Motion';

const useK = () => (useShort() / 1080) * useUi();

/**
 * Terminal window: a command typed at `cps` after a "$ " prompt, then output lines that appear one by
 * one (`every` frames) with their own colour; a line starting with "✓" is green, "!" amber, "x" red.
 */
export const Terminal: React.FC<{
  command: string;
  output?: string[];
  at?: number;
  cps?: number;
  every?: number;
  w?: number; // % of frame width
  title?: string;
  fontSize?: number; // px @1080
  dark?: boolean;
  style?: React.CSSProperties;
}> = ({command, output = [], at = 0, cps = 40, every = 5, w = 88, title = 'zsh', fontSize = 34, dark = true, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = useK();
  const sp = useSpeed();
  const n = Math.max(0, Math.min(command.length, Math.floor(((f - at) * cps * sp) / fps)));
  const typed = n >= command.length;
  const doneAt = at + (command.length * fps) / (cps * sp) + 4;
  const caret = !typed && Math.floor(f / 8) % 2 === 0;
  const lineColor = (l: string) => (l.startsWith('✓') ? '#3DDC84' : l.startsWith('!') ? '#FFC24B' : l.startsWith('x') ? '#FF5C5C' : dark ? '#A1A1AA' : '#55555E');
  return (
    <Pop at={at - 8} style={{width: `${w}%`, ...style}}>
      <div style={{borderRadius: 26 * k, overflow: 'hidden', background: dark ? '#0E0E11' : '#FFFFFF', boxShadow: `0 0 0 ${1.5 * k}px ${dark ? '#26262B' : '#E4E4E8'}, 0 ${30 * k}px ${80 * k}px rgba(0,0,0,0.28)`}}>
        <div style={{height: 54 * k, display: 'flex', alignItems: 'center', gap: 10 * k, padding: `0 ${22 * k}px`, background: dark ? '#17171B' : '#F3F3F5'}}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <div key={c} style={{width: 14 * k, height: 14 * k, borderRadius: '50%', background: c}} />
          ))}
          <div style={{marginLeft: 'auto', marginRight: 'auto', fontFamily: FONT.mono, fontSize: 20 * k, color: dark ? '#6B6B74' : '#888'}}>{title}</div>
        </div>
        <div style={{padding: `${30 * k}px ${34 * k}px ${36 * k}px`, fontFamily: FONT.mono, fontSize: fontSize * k, lineHeight: 1.5, color: dark ? '#F4F4F5' : COLOR.ink, whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
          <div>
            <span style={{color: COLOR.lime}}>$ </span>
            {command.slice(0, n)}
            <span style={{opacity: caret ? 1 : 0}}>▍</span>
          </div>
          {output.map((l, i) => {
            const t = prog(f, doneAt + i * (every / sp), 6 / sp, E.expoOut);
            if (t <= 0) return null;
            return (
              <div key={i} style={{color: lineColor(l), opacity: t, transform: `translateY(${(1 - t) * 14 * k}px)`, filter: t < 1 ? `blur(${(1 - t) * 6 * k}px)` : undefined}}>
                {l}
              </div>
            );
          })}
        </div>
      </div>
    </Pop>
  );
};

/** Notification / warning toast that drops in with a pop: icon dot, uppercase level chip, title, body. */
export const Toast: React.FC<{
  level?: string;
  title: string;
  body?: string;
  at?: number;
  color?: string;
  w?: number;
  icon?: React.ReactNode;
  dark?: boolean;
  style?: React.CSSProperties;
}> = ({level, title, body, at = 0, color = COLOR.pink, w = 86, icon, dark = false, style}) => {
  const f = useCurrentFrame();
  const k = useK();
  const sp = useSpeed();
  const t = prog(f, at, 12 / sp, E.expoOut);
  const pulse = 0.5 + 0.5 * Math.sin(((f - at) / 10) * Math.PI);
  if (f < at) return null;
  return (
    <div style={{width: `${w}%`, transform: `translateY(${(1 - t) * -60 * k}px) scale(${lerp(0.92, 1, t)})`, opacity: clamp01(t * 2), filter: t < 1 ? `blur(${(1 - t) * 10 * k}px)` : undefined, ...style}}>
      <div style={{borderRadius: 30 * k, background: dark ? '#141417' : '#FFFFFF', boxShadow: `0 0 0 ${1.5 * k}px ${dark ? '#2A2A30' : '#ECEAF0'}, 0 ${24 * k}px ${70 * k}px rgba(0,0,0,0.18)`, padding: `${30 * k}px ${34 * k}px`, display: 'flex', gap: 24 * k, alignItems: 'flex-start', fontFamily: FONT.ui}}>
        <div style={{width: 58 * k, height: 58 * k, borderRadius: 18 * k, background: color, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32 * k, boxShadow: `0 0 0 ${pulse * 10 * k}px ${color}33`}}>{icon ?? '!'}</div>
        <div style={{flex: 1}}>
          {level ? (
            <div style={{display: 'inline-block', fontFamily: FONT.mono, fontWeight: 600, fontSize: 22 * k, letterSpacing: '0.04em', color, background: `${color}1A`, borderRadius: 8 * k, padding: `${4 * k}px ${10 * k}px`, marginBottom: 12 * k}}>{level}</div>
          ) : null}
          <div style={{fontSize: 38 * k, fontWeight: 600, color: dark ? '#F4F4F5' : COLOR.ink, lineHeight: 1.2, letterSpacing: '-0.01em'}}>{title}</div>
          {body ? <div style={{fontSize: 28 * k, color: dark ? '#A1A1AA' : COLOR.mute, marginTop: 8 * k, lineHeight: 1.3}}>{body}</div> : null}
        </div>
      </div>
    </div>
  );
};

/**
 * Chips cascading in (`every` frames apart), optionally one highlighted that moves through the list
 * (`cycle` frames per step) - e.g. the five warning levels.
 */
export const ChipStack: React.FC<{items: string[]; at?: number; every?: number; highlight?: {from: number; cycle: number; color?: string}; mono?: boolean; size?: number; dark?: boolean; align?: 'left' | 'center'}> = ({
  items,
  at = 0,
  every = 3,
  highlight,
  mono = true,
  size = 40,
  dark = false,
  align = 'center',
}) => {
  const f = useCurrentFrame();
  const k = useK();
  const sp = useSpeed();
  const hi = highlight && f >= highlight.from ? Math.floor((f - highlight.from) / highlight.cycle) % items.length : -1;
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', gap: 18 * k}}>
      {items.map((it, i) => (
        <Pop key={it} at={at + (i * every) / sp} rise={30 * k}>
          <div
            style={{
              fontFamily: mono ? FONT.mono : FONT.ui,
              fontWeight: 600,
              fontSize: size * k,
              letterSpacing: mono ? '0.03em' : '-0.01em',
              padding: `${14 * k}px ${26 * k}px`,
              borderRadius: 14 * k,
              background: i === hi ? highlight?.color ?? COLOR.pink : dark ? '#1C1C21' : '#FFFFFF',
              color: i === hi ? '#fff' : dark ? '#D4D4D8' : COLOR.ink,
              boxShadow: `0 0 0 ${1.5 * k}px ${i === hi ? 'transparent' : dark ? '#2A2A30' : '#E6E4EA'}`,
              whiteSpace: 'nowrap',
            }}
          >
            {it}
          </div>
        </Pop>
      ))}
    </div>
  );
};

/** Horizontal bars growing from 0 (expo-out, staggered), value labels counting with them. */
export const BarChart: React.FC<{data: {label: string; value: number; color?: string}[]; at?: number; max?: number; unit?: string; w?: number; every?: number; dark?: boolean}> = ({
  data,
  at = 0,
  max,
  unit = '',
  w = 84,
  every = 4,
  dark = false,
}) => {
  const f = useCurrentFrame();
  const k = useK();
  const sp = useSpeed();
  const m = max ?? Math.max(...data.map((d) => d.value)) * 1.08;
  return (
    <div style={{width: `${w}%`, display: 'flex', flexDirection: 'column', gap: 30 * k, fontFamily: FONT.ui}}>
      {data.map((d, i) => {
        const t = prog(f, at + (i * every) / sp, 22 / sp, E.expoOut);
        return (
          <div key={d.label}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 30 * k, color: dark ? '#A1A1AA' : COLOR.mute, marginBottom: 10 * k, opacity: clamp01(t * 3)}}>
              <span>{d.label}</span>
              <span style={{fontFamily: FONT.display, fontWeight: 700, color: dark ? '#F4F4F5' : COLOR.ink, fontVariantNumeric: 'tabular-nums'}}>
                {formatNumber(d.value * t)}
                {unit}
              </span>
            </div>
            <div style={{height: 34 * k, borderRadius: 999, background: dark ? '#1C1C21' : '#ECEAF0', overflow: 'hidden'}}>
              <div style={{height: '100%', width: `${(d.value / m) * 100 * t}%`, borderRadius: 999, background: d.color ?? COLOR.ink}} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Line chart drawn left to right (stroke-dashoffset), area fading in under it, a dot riding the head. */
export const LineChart: React.FC<{values: number[]; at?: number; dur?: number; w?: number; h?: number; color?: string; dark?: boolean; label?: string}> = ({
  values,
  at = 0,
  dur = 30,
  w = 84,
  h = 26,
  color = COLOR.pink,
  dark = false,
  label,
}) => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const k = useK();
  const sp = useSpeed();
  const W = (w / 100) * width;
  const Hh = (h / 100) * height;
  const mn = Math.min(...values);
  const mx = Math.max(...values);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * W, Hh - ((v - mn) / Math.max(1e-6, mx - mn)) * Hh * 0.86 - Hh * 0.07]);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const t = prog(f, at, dur / sp, E.inOut);
  const len = pts.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);
  const headI = Math.min(pts.length - 1, t * (pts.length - 1));
  const i0 = Math.floor(headI);
  const fr = headI - i0;
  const head = pts[i0 + 1] ? [lerp(pts[i0][0], pts[i0 + 1][0], fr), lerp(pts[i0][1], pts[i0 + 1][1], fr)] : pts[i0];
  return (
    <div style={{position: 'relative', width: W}}>
      {label ? <div style={{fontFamily: FONT.ui, fontSize: 30 * k, color: dark ? '#A1A1AA' : COLOR.mute, marginBottom: 16 * k}}>{label}</div> : null}
      <svg width={W} height={Hh} style={{overflow: 'visible'}}>
        <defs>
          <linearGradient id="lcArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
          <clipPath id="lcClip">
            <rect x={0} y={-20} width={head[0]} height={Hh + 40} />
          </clipPath>
        </defs>
        <path d={`${d} L${W},${Hh} L0,${Hh} Z`} fill="url(#lcArea)" clipPath="url(#lcClip)" />
        <path d={d} fill="none" stroke={color} strokeWidth={6 * k} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - t)} />
        {t > 0 ? <circle cx={head[0]} cy={head[1]} r={11 * k} fill={color} stroke={dark ? '#0E0E11' : '#fff'} strokeWidth={4 * k} /> : null}
      </svg>
    </div>
  );
};

/** Donut / ring that sweeps to `value` (0..1) with the percentage counting in the middle. */
export const Donut: React.FC<{value: number; at?: number; size?: number; color?: string; track?: string; label?: string; dark?: boolean}> = ({value, at = 0, size = 360, color = COLOR.lime, track, label, dark = false}) => {
  const f = useCurrentFrame();
  const k = useK();
  const sp = useSpeed();
  const t = prog(f, at, 26 / sp, E.expoOut);
  const R = (size * k) / 2 - 22 * k;
  const C = 2 * Math.PI * R;
  return (
    <div style={{position: 'relative', width: size * k, height: size * k}}>
      <svg width={size * k} height={size * k} style={{transform: 'rotate(-90deg)'}}>
        <circle cx={(size * k) / 2} cy={(size * k) / 2} r={R} fill="none" stroke={track ?? (dark ? '#1C1C21' : '#ECEAF0')} strokeWidth={34 * k} />
        <circle cx={(size * k) / 2} cy={(size * k) / 2} r={R} fill="none" stroke={color} strokeWidth={34 * k} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - value * t)} />
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.display}}>
        <div style={{fontWeight: 800, fontSize: size * 0.24 * k, color: dark ? '#F4F4F5' : COLOR.ink, letterSpacing: '-0.04em'}}>{Math.round(value * 100 * t)}%</div>
        {label ? <div style={{fontFamily: FONT.ui, fontSize: size * 0.07 * k, color: dark ? '#A1A1AA' : COLOR.mute}}>{label}</div> : null}
      </div>
    </div>
  );
};

/** Big metric: number counting (linear) with prefix/suffix, a label, and an optional delta chip. */
export const Metric: React.FC<{value: number; from?: number; at?: number; dur?: number; prefix?: string; suffix?: string; label?: string; delta?: string; size?: number; color?: string; dark?: boolean; decimals?: number}> = ({
  value,
  from = 0,
  at = 0,
  dur = 18,
  prefix = '',
  suffix = '',
  label,
  delta,
  size = 260,
  color,
  dark = false,
  decimals = 0,
}) => {
  const f = useCurrentFrame();
  const k = useK();
  const sp = useSpeed();
  const t = clamp01((f - at) / (dur / sp));
  const v = lerp(from, value, t);
  const blur = t > 0 && t < 1 ? 3 * k : 0;
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: FONT.display}}>
      <div style={{fontWeight: 800, fontSize: size * k, lineHeight: 0.95, letterSpacing: '-0.05em', color: color ?? (dark ? '#F4F4F5' : COLOR.ink), fontVariantNumeric: 'tabular-nums', filter: blur ? `blur(${blur}px)` : undefined}}>
        {prefix}
        {formatNumber(v, decimals)}
        {suffix}
      </div>
      {label ? <div style={{fontFamily: FONT.ui, fontSize: 40 * k, color: dark ? '#A1A1AA' : COLOR.mute, marginTop: 14 * k}}>{label}</div> : null}
      {delta ? (
        <Pop at={at + dur / sp}>
          <div style={{marginTop: 18 * k, fontFamily: FONT.ui, fontWeight: 600, fontSize: 30 * k, background: COLOR.lime, color: COLOR.ink, borderRadius: 999, padding: `${6 * k}px ${18 * k}px`}}>{delta}</div>
        </Pop>
      ) : null}
    </div>
  );
};

export type MapFile = {path: string; x: number; y: number};
export type AgentCursorSpec = {name: string; color: string; path: {at: number; file: number}[]};

/**
 * Live map of files (rounded tiles at x/y % of the box) with named agent cursors gliding between them,
 * Figma-multiplayer style. `contested` makes a tile pulse in the warning colour from `at`.
 */
export const FileMap: React.FC<{files: MapFile[]; agents: AgentCursorSpec[]; contested?: {file: number; at: number}; w?: number; h?: number; dark?: boolean; warn?: string}> = ({
  files,
  agents,
  contested,
  w = 92,
  h = 58,
  dark = false,
  warn = COLOR.pink,
}) => {
  const f = useCurrentFrame();
  const k = useK();
  const sp = useSpeed();
  const pulse = contested && f >= contested.at ? 0.5 + 0.5 * Math.sin(((f - contested.at) / 6) * Math.PI) : 0;
  return (
    <div style={{position: 'relative', width: `${w}%`, height: `${h}%`}}>
      {files.map((fl, i) => {
        const t = prog(f, i * (2 / sp), 10 / sp, E.expoOut);
        const hot = contested && contested.file === i && f >= contested.at;
        return (
          <div
            key={fl.path}
            style={{
              position: 'absolute',
              left: `${fl.x}%`,
              top: `${fl.y}%`,
              transform: `translate(-50%,-50%) scale(${lerp(0.7, 1, t) * (hot ? 1 + 0.05 * pulse : 1)})`,
              opacity: t,
              fontFamily: FONT.mono,
              fontSize: 26 * k,
              color: hot ? '#fff' : dark ? '#D4D4D8' : COLOR.ink,
              background: hot ? warn : dark ? '#1C1C21' : '#FFFFFF',
              borderRadius: 14 * k,
              padding: `${12 * k}px ${18 * k}px`,
              boxShadow: hot ? `0 0 0 ${8 * k * pulse}px ${warn}33` : `0 0 0 ${1.5 * k}px ${dark ? '#2A2A30' : '#E6E4EA'}`,
              whiteSpace: 'nowrap',
            }}
          >
            {fl.path}
          </div>
        );
      })}
      {agents.map((a, ai) => {
        const keys = a.path;
        let x = files[keys[0].file].x;
        let y = files[keys[0].file].y;
        for (let i = 1; i < keys.length; i++) {
          if (f < keys[i].at) break;
          const t = E.inOut(clamp01((f - keys[i].at) / (14 / sp)));
          const tx = files[keys[i].file].x;
          const ty = files[keys[i].file].y;
          x = lerp(x, tx, t);
          y = lerp(y, ty, t);
        }
        const wob = Math.sin((f + ai * 17) / 9) * 0.6;
        const appear = prog(f, keys[0].at, 8 / sp, E.expoOut);
        if (f < keys[0].at) return null;
        return (
          <div key={a.name} style={{position: 'absolute', left: `${x + 3 + wob * 0.3}%`, top: `${y + 3 + wob}%`, opacity: appear, transform: `scale(${lerp(0.6, 1, appear)})`, zIndex: 5}}>
            <svg width={30 * k} height={36 * k} viewBox="0 0 22 28" style={{display: 'block'}}>
              <path d="M1 1 L1 22 L6.5 16.5 L10.5 26 L14 24.5 L10 15.5 L18 15.5 Z" fill={a.color} stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
            </svg>
            <div style={{marginLeft: 22 * k, marginTop: -6 * k, background: a.color, color: '#fff', fontFamily: FONT.ui, fontWeight: 600, fontSize: 24 * k, borderRadius: 10 * k, padding: `${5 * k}px ${12 * k}px`, whiteSpace: 'nowrap'}}>{a.name}</div>
          </div>
        );
      })}
    </div>
  );
};

/** Scattered "noise" dots for busy backgrounds (deterministic). */
export const dotsField = (seed: string, n: number) => Array.from({length: n}, (_, i) => ({x: random(`${seed}x${i}`) * 100, y: random(`${seed}y${i}`) * 100}));

