// Text primitives: BlurIn, Stream (AI-streaming reveal with a hot colour tail), Scramble, Counter.
import {scaled, useSpeed} from './profile';
import React from 'react';
import {interpolateColors, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {E, clamp01, lerp, prog, type EaseFn, useShort} from './core';
import {COLOR, STREAM, BLUR_IN, FONT, SCRAMBLE} from './tokens';

/** Wraps anything in a blur-in: gaussian blur `px` -> 0, rise `y` (% of frame height), scale, opacity. */
export const BlurIn: React.FC<{
  delay?: number;
  dur?: number;
  px?: number;
  y?: number;
  x?: number;
  scale?: number;
  ease?: EaseFn;
  /** optional blur-out at the end: frame (local) when it starts, and its length */
  outAt?: number;
  outDur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({delay = 0, dur = BLUR_IN.frames, px = BLUR_IN.px, y = BLUR_IN.y, x = 0, scale = BLUR_IN.scale, ease = E.expoOut, outAt, outDur = 8, style, children}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const sp = useSpeed();
  const t = prog(f, delay, scaled(dur, sp), ease);
  const o = outAt === undefined ? 0 : prog(f, outAt, outDur, E.cubicIn);
  const k = height / 1080;
  const blur = px * k * (1 - t) + px * k * o;
  return (
    <div
      style={{
        ...style,
        opacity: clamp01(t * 2.2) * (1 - o),
        filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : undefined,
        transform: `${style?.transform ?? ''} translate(${x * (1 - t)}vh, ${y * (1 - t) - y * 0.5 * o}vh) scale(${lerp(scale, 1, t)})`,
      }}
    >
      {children}
    </div>
  );
};

type Run = {t: string; bold?: boolean; hl?: boolean};
/** "**bold** plain __highlight__" -> runs */
export const parseRuns = (s: string): Run[] => {
  const out: Run[] = [];
  const re = /(\*\*[^*]+\*\*|__[^_]+__)/g;
  let last = 0;
  for (const m of s.matchAll(re)) {
    if (m.index! > last) out.push({t: s.slice(last, m.index)});
    const tok = m[0];
    out.push(tok.startsWith('**') ? {t: tok.slice(2, -2), bold: true} : {t: tok.slice(2, -2), hl: true});
    last = m.index! + tok.length;
  }
  if (last < s.length) out.push({t: s.slice(last)});
  return out;
};

/**
 * The signature AI-streaming reveal: characters (or words) appear left to right at `cps`; each fresh
 * glyph is blurred and tinted with the accent ramp (pink -> orange) and settles to `color` within
 * `tail` frames. Layout is reserved, so centred text does not reflow while it streams.
 * Markup: **bold**, __highlight__ (coloured with `hlColor`).
 */
export const Stream: React.FC<{
  text: string;
  start?: number;
  /** characters per second (words per second when unit = 'word') */
  cps?: number;
  /** fit the whole text into this many frames instead of using cps */
  dur?: number;
  unit?: 'char' | 'word';
  tail?: number;
  /** settled colour; omit (with accent null) to inherit the parent's colour */
  color?: string;
  /** colours a glyph passes through while settling; null = no tint (plain blur-in per glyph) */
  accent?: readonly string[] | null;
  hlColor?: string;
  blur?: number;
  rise?: number;
  boldWeight?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  start = 0,
  cps = STREAM.cps,
  dur,
  unit = 'char',
  tail = STREAM.tail,
  color,
  accent = STREAM.accent,
  hlColor = COLOR.hl,
  blur = STREAM.blurPx,
  rise = 0,
  boldWeight = 600,
  style,
}) => {
  const f = useCurrentFrame();
  const {fps, width: frameW, height: frameH} = useVideoConfig();
  const height = Math.min(frameW, frameH);
  const k = height / 1080;
  const sp = useSpeed();
  tail = tail / sp;
  const runs = parseRuns(text);
  const total = unit === 'char' ? runs.reduce((a, r) => a + r.t.length, 0) : text.split(/\s+/).length;
  const step = dur !== undefined ? dur / Math.max(1, total) : fps / (cps * sp);
  let idx = 0;
  let wordIdx = 0;
  const glyph = (ch: string, run: Run, key: string, i: number) => {
    const age = f - (start + i * step);
    const t = clamp01(age / tail);
    // no colour given + no accent = inherit the parent's colour
    const final = run.hl ? hlColor : color ?? (accent && accent.length ? COLOR.ink : undefined);
    const ramp = final && accent && accent.length ? [...accent, final] : null;
    const c = ramp ? interpolateColors(t, ramp.map((_, j) => j / (ramp.length - 1)), ramp) : final;
    const b = blur * k * (1 - E.expoOut(t));
    return (
      <span
        key={key}
        style={{
          opacity: age < 0 ? 0 : clamp01(t * 3),
          color: c,
          filter: b > 0.05 && age >= 0 ? `blur(${b.toFixed(2)}px)` : undefined,
          display: 'inline-block',
          whiteSpace: 'pre',
          transform: rise ? `translateY(${rise * (1 - E.expoOut(t))}vh)` : undefined,
          fontWeight: run.bold ? boldWeight : undefined,
        }}
      >
        {ch}
      </span>
    );
  };
  const nodes: React.ReactNode[] = [];
  runs.forEach((run, ri) => {
    const words = run.t.split(/(\s+)/);
    words.forEach((w, wi) => {
      if (w === '') return;
      if (/^\s+$/.test(w)) {
        // a space is a glyph too (keeps timing even) but must stay breakable
        nodes.push(<span key={`${ri}-${wi}`}>{' '}</span>);
        if (unit === 'char') idx += w.length;
        return;
      }
      const chars = Array.from(w);
      const myWord = wordIdx++;
      nodes.push(
        <span key={`${ri}-${wi}`} style={{display: 'inline-block', whiteSpace: 'nowrap'}}>
          {unit === 'char'
            ? chars.map((ch, ci) => glyph(ch, run, `${ci}`, idx++))
            : [glyph(w, run, 'w', myWord)]}
        </span>,
      );
    });
  });
  return <span style={style}>{nodes}</span>;
};

const HEAD_GLYPHS = '[]{}/\\_`^~*xbcefhjmnoqzBXZ';

/**
 * Scramble-type / decode (v4, the core text effect of the offer archetype): the resolved text advances
 * left to right at `cps` (25-36 per line; run several lines in parallel with the same start), and the
 * 1-2 glyphs at the write head are random punctuation, alternating lime / pink, re-rolled every
 * `every` frames. `cursor` adds the pink "_". `outAt` deletes it again from the end with garbage glyphs.
 * `colorIn` = glyphs arrive in that colour and decay to `color` over 12 f (v4 "CLAIM UP TO" pink -> ink).
 */
export const Scramble: React.FC<{
  text: string;
  start?: number;
  cps?: number;
  head?: number;
  every?: number;
  colors?: readonly string[];
  color?: string;
  colorIn?: string;
  cursor?: boolean;
  outAt?: number;
  outCps?: number;
  seed?: string;
  style?: React.CSSProperties;
}> = ({text, start = 0, cps = SCRAMBLE.cps, head = 2, every = 2, colors = SCRAMBLE.colors, color, colorIn, cursor = false, outAt, outCps = 45, seed = 'scr', style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const chars = Array.from(text);
  const sp = useSpeed();
  cps = cps * sp;
  const tick = Math.floor(f / every);
  let n = Math.max(0, Math.min(chars.length, Math.floor(((f - start) * cps) / fps)));
  if (outAt !== undefined && f >= outAt) n = Math.max(0, chars.length - Math.floor(((f - outAt) * outCps) / fps));
  const typing = f >= start && (n < chars.length || (outAt !== undefined && f >= outAt));
  const headN = typing && n > 0 ? Math.min(head, chars.length - n + head) : typing ? 1 : 0;
  if (f < start) return <span style={{...style, opacity: 0}}>{text}</span>;
  return (
    <span style={{whiteSpace: 'pre', ...style}}>
      {chars.slice(0, n).map((ch, i) => {
        const at = start + (i * fps) / cps;
        const c = colorIn ? interpolateColors(f - at, [0, 12], [colorIn, color ?? COLOR.ink]) : color;
        return (
          <span key={i} style={{color: c}}>
            {ch}
          </span>
        );
      })}
      {Array.from({length: headN}, (_, j) => (
        <span key={`h${j}`} style={{color: colors[(j + tick) % colors.length]}}>
          {HEAD_GLYPHS[Math.floor(random(`${seed}-${tick}-${j}`) * HEAD_GLYPHS.length)]}
        </span>
      ))}
      {cursor && typing ? <span style={{color: COLOR.pink}}>_</span> : null}
      {/* reserve the full width so centred lines do not jitter */}
      <span style={{visibility: 'hidden'}}>{chars.slice(n + headN).join('')}</span>
    </span>
  );
};

/** Per-glyph fade-in left to right (v4 "$20,000,000"): each glyph light grey -> ink over `fade` f, `stagger` f apart. */
export const GlyphFade: React.FC<{text: string; start?: number; stagger?: number; fade?: number; from?: string; color?: string; style?: React.CSSProperties}> = ({
  text,
  start = 0,
  stagger = 1.7,
  fade = 9,
  from = '#E4E1E6',
  color = COLOR.ink,
  style,
}) => {
  const f = useCurrentFrame();
  const sp = useSpeed();
  return (
    <span style={{whiteSpace: 'pre', ...style}}>
      {Array.from(text).map((ch, i) => {
        const t = clamp01(((f - start) * sp - i * stagger) / fade);
        return (
          <span key={i} style={{opacity: clamp01(t * 3), color: interpolateColors(t, [0, 1], [from, color])}}>
            {ch}
          </span>
        );
      })}
    </span>
  );
};

export const formatNumber = (v: number, decimals = 0, sep = ',', dec = '.') => {
  const neg = v < 0;
  const [i, d] = Math.abs(v).toFixed(decimals).split('.');
  const body = i.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return `${neg ? '-' : ''}${body}${d ? dec + d : ''}`;
};

/**
 * Number roll with tabular figures. Measured (v4): counts are LINEAR (balance 10,000 -> 2,629 in 10 f;
 * pools count down at a constant rate). Keyframes allow multi-step stories. `tint` pulses the fill to a
 * colour while counting (triangle: up over the count, down over the same length after it). `hblur`
 * gives the digits the measured horizontal smear of the big pool counters (~5 px @1080).
 */
export const Counter: React.FC<{
  keys: readonly {at: number; value: number; dur?: number}[];
  dur?: number;
  ease?: EaseFn;
  decimals?: number;
  sep?: string;
  dec?: string;
  prefix?: string;
  suffix?: string;
  tint?: string;
  hblur?: number;
  style?: React.CSSProperties;
}> = ({keys, dur = 10, ease = E.linear, decimals = 0, sep = ',', dec = '.', prefix = '', suffix = '', tint, hblur = 0, style}) => {
  const f = useCurrentFrame();
  const height = useShort();
  let v = keys[0].value;
  let pulse = 0;
  for (let i = 1; i < keys.length; i++) {
    const d = keys[i].dur ?? dur;
    if (f >= keys[i].at) v = lerp(keys[i - 1].value, keys[i].value, prog(f, keys[i].at, d, ease));
    const p = f - keys[i].at;
    if (p >= 0 && p < 2 * d) pulse = Math.max(pulse, p < d ? p / d : 2 - p / d);
  }
  const id = React.useId().replace(/:/g, '');
  const hb = hblur * (height / 1080);
  return (
    <span style={{fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', ...style, color: tint && pulse > 0 ? interpolateColors(pulse, [0, 1], [String(style?.color ?? COLOR.ink), tint]) : style?.color, filter: hb > 0.2 ? `url(#hb${id})` : style?.filter}}>
      {hb > 0.2 ? (
        <svg style={{position: 'absolute', width: 0, height: 0}} aria-hidden>
          <filter id={`hb${id}`} x="-10%" width="120%">
            <feGaussianBlur stdDeviation={`${hb} 0`} />
          </filter>
        </svg>
      ) : null}
      {prefix}
      {formatNumber(v, decimals, sep, dec)}
      {suffix}
    </span>
  );
};

export {FONT};
