// Type devices: flip-open stickers, tags, pills, bracket words, the slash motif (slash title, slash
// list, slash caret), section header, collab lockup, end card, spark icon, hero word, colour sweep.
import {scaled, useSpeed} from './profile';
import React from 'react';
import {Easing, Img, interpolate, interpolateColors, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {E, clamp01, lerp, prog, useShort} from './core';
import {COLOR, END, FONT, HEADER, STICKER} from './tokens';
import {Stream} from './Text';
import {resolve} from './Media';

const stickerEase = Easing.bezier(...STICKER.bezier);

/**
 * Block label (pink or black slab, white heavy extended caps) that flips open from edge-on around its
 * bottom edge (rotateX 90 -> 0, 7 f, bezier(.97,.02,0,.95) - "hold edge-on 3 f, snap open, settle").
 * `pose` tilts it in perspective like the corner-pinned stickers (negative = left side nearer).
 * `jitter` scales individual letters (v2 "SKiLLS": 1, 1, .62, .62, .62, .8).
 */
export const Sticker: React.FC<{
  text: string;
  at?: number;
  bg?: string;
  color?: string;
  size?: number; // cap height % of frame height
  rot?: number;
  pose?: number;
  x?: number;
  y?: number;
  jitter?: number[];
  font?: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({text, at = 0, bg = COLOR.ink, color = '#fff', size = 9, rot = -4, pose = 0, x = 50, y = 50, jitter, font = FONT.sticker, weight = 900, style}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const sp = useSpeed();
  const t = interpolate(f, [at, at + scaled(STICKER.frames, sp, 3)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: stickerEase});
  const fs = (size / 100) * height * 1.38;
  return (
    <div style={{position: 'absolute', left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-100%) rotate(${rot}deg)`, perspective: height * 1.2, ...style}}>
      <div
        style={{
          transform: `rotateY(${pose}deg) rotateX(${90 * (1 - t)}deg)`,
          transformOrigin: '50% 100%',
          opacity: f < at ? 0 : 1,
          background: bg,
          padding: `${fs * 0.08}px ${fs * 0.22}px ${fs * 0.04}px`,
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{fontFamily: font, fontWeight: weight, fontSize: fs, lineHeight: 1, color, letterSpacing: '-0.02em', textTransform: 'uppercase', display: 'flex', alignItems: 'baseline'}}>
          {jitter
            ? Array.from(text).map((ch, i) => (
                <span key={i} style={{fontSize: `${(jitter[i] ?? 1) * 100}%`}}>
                  {ch}
                </span>
              ))
            : text}
        </div>
      </div>
    </div>
  );
};

/**
 * Tag / pill pop (v4): starts as a thin bar (scaleY .18, scaleX .25), reaches full size in 3 f expo-out,
 * text arrives with a horizontal smear. variant 'pill' = pink #E71664 / white (radius 10 @1080),
 * 'dark' = #1C1F19 / lime (radius 14), or pass bg/color. `typed` types the label in L -> R as it opens.
 */
export const Tag: React.FC<{
  text: string;
  at?: number;
  variant?: 'pill' | 'dark' | 'lime';
  bg?: string;
  color?: string;
  size?: number; // cap % of frame height (v4: pill 7.2, pool pill 6.7, dark tag 7.8)
  typed?: boolean;
  font?: string;
  style?: React.CSSProperties;
}> = ({text, at = 0, variant = 'pill', bg, color, size = 6.7, typed = false, font = FONT.display, style}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const pal = {pill: [COLOR.pillPink, '#fff', 10], dark: [COLOR.tagDark, COLOR.tagLime, 14], lime: [COLOR.lime, COLOR.ink, 10]}[variant] as [string, string, number];
  const fs = (size / 100) * height * 1.38;
  const sp = useSpeed();
  const t = prog(f, at, scaled(3, sp, 2), E.expoOut);
  const shown = typed ? Math.min(text.length, Math.max(0, Math.round((f - at - 1) * 2.4 * sp))) : text.length;
  if (f < at) return null;
  return (
    <div style={{display: 'inline-block', transform: `scale(${lerp(0.25, 1, t)}, ${lerp(0.18, 1, t)})`, ...style}}>
      <div style={{background: bg ?? pal[0], borderRadius: (pal[2] / 1080) * height, padding: `${fs * 0.14}px ${fs * 0.36}px`}}>
        <div style={{fontFamily: font, fontWeight: 700, fontSize: fs, lineHeight: 1.08, color: color ?? pal[1], textTransform: 'uppercase', letterSpacing: '-0.015em', whiteSpace: 'pre', filter: t < 1 ? `blur(${(1 - t) * 6}px)` : undefined}}>
          {text.slice(0, shown)}
          <span style={{visibility: 'hidden'}}>{text.slice(shown)}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Outlined rounded pill (v3 "Always-On-Agents": 1.5 px #A2A0A4 border, medium text cap 3.5 %H).
 * `typed` = the end-card variant: letters type 1/frame while the outline grows with them.
 */
export const Pill: React.FC<{text: string; at?: number; size?: number; color?: string; border?: string; bg?: string; typed?: boolean}> = ({
  text,
  at = 0,
  size = 3.5,
  color = COLOR.ink,
  border = '#A2A0A4',
  bg = 'transparent',
  typed = false,
}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const fs = (size / 100) * height * 1.4;
  const t = prog(f, at, 7, E.cubicOut);
  const shown = typed ? Math.max(0, Math.min(text.length, Math.floor(f - at))) : text.length;
  return (
    <div
      style={{
        display: 'inline-block',
        opacity: typed ? (f >= at ? 1 : 0) : t,
        transform: typed ? undefined : `translateY(${(1 - t) * 0.014 * height}px)`,
        border: `${Math.max(1, height * 0.0014)}px solid ${typed && shown < 4 ? 'transparent' : border}`,
        borderRadius: 999,
        padding: `${fs * 0.36}px ${fs * 0.85}px`,
        fontFamily: FONT.ui,
        fontWeight: 500,
        fontSize: fs,
        color,
        background: bg,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {text.slice(0, shown)}
    </div>
  );
};

/** Word wrapped in coloured brackets: {CASHBACK}, [SEPTEMBER ONLY]. Brackets spring outwards. */
export const Brackets: React.FC<{children: React.ReactNode; open?: string; close?: string; color?: string; at?: number; gap?: number}> = ({children, open = '{', close = '}', color = COLOR.lime, at = 0, gap = 0.12}) => {
  const f = useCurrentFrame();
  const t = prog(f, at, 14, E.expoOut);
  return (
    <span style={{display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
      <span style={{color, transform: `translateX(${lerp(0.6, 0, t)}em)`, marginRight: `${gap}em`, fontWeight: 400, opacity: clamp01(t * 2)}}>{open}</span>
      {children}
      <span style={{color, transform: `translateX(${lerp(-0.6, 0, t)}em)`, marginLeft: `${gap}em`, fontWeight: 400, opacity: clamp01(t * 2)}}>{close}</span>
    </span>
  );
};

const slashEase = Easing.bezier(...HEADER.slashBezier);

/**
 * Title written right-to-left by its own slash (v2): the "/" travels from `from` to `x` (% of frame
 * width) in 13 f, bezier(.84,0,.19,1); glyphs are revealed to the right of it; while it moves fast it is
 * drawn as a wide translucent pink smear. The title is born yellow-orange -> pink -> crimson -> ink (18 f).
 */
export const SlashTitle: React.FC<{text: string; at?: number; x?: number; from?: number; y?: number; size?: number; font?: string; weight?: number; color?: string}> = ({
  text,
  at = 0,
  x = HEADER.titleX,
  from = HEADER.slashFrom,
  y = 50,
  size = HEADER.titleFontPct,
  font = FONT.sticker,
  weight = 800,
  color = COLOR.ink,
}) => {
  const f = useCurrentFrame();
  const {width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  const fs = (size / 100) * height;
  const sp = useSpeed();
  const pos = (fr: number) => interpolate(fr, [at, at + scaled(HEADER.slashFrames, sp, 6)], [from, x], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: slashEase});
  const sx = pos(f);
  const speed = (Math.abs(pos(f) - pos(f - 1)) / 100) * width; // px per frame
  const smear = clamp01((speed - 0.08 * height) / (0.15 * height));
  const age = f - at;
  const c = interpolateColors(age, [0, 6, 8, 12, 13, 18], ['#E19229', '#D9A520', '#E2457E', '#BE1E5A', '#710838', color]);
  if (f < at) return null;
  return (
    <div style={{position: 'absolute', left: 0, top: `${y}%`, width: '100%', height: fs * 1.3, transform: 'translateY(-50%)', fontFamily: font, fontWeight: weight, fontSize: fs, lineHeight: 1.3, letterSpacing: '-0.03em', whiteSpace: 'nowrap'}}>
      <div style={{position: 'absolute', left: `${x}%`, color: c, clipPath: `inset(0 0 0 ${Math.max(0, ((sx - x) / 100) * width)}px)`}}>/{text.replace(/^\//, '')}</div>
      {sx > x + 0.05 ? (
        <div style={{position: 'absolute', left: `${sx}%`, color: smear > 0.05 ? COLOR.pink : c, opacity: 1 - smear * 0.5, transform: `scaleX(${1 + smear * 2.5})`, transformOrigin: 'left center'}}>/</div>
      ) : null}
    </div>
  );
};

const stampEase = Easing.out(Easing.poly(5));

/**
 * Slash list (v2): each line's "/" stamps from 2.3x to 1x in 5 f, the word is born with the birth ramp;
 * after `scrollAt` the list accelerates upward (ease-in) and leaves with vertical motion blur.
 */
export const SlashList: React.FC<{
  items: string[];
  start?: number;
  every?: number;
  size?: number; // x-height-ish font size in % of frame height
  pitch?: number; // line pitch % of frame height
  x?: number;
  y?: number;
  align?: 'left' | 'center';
  color?: string;
  scrollAt?: number;
  scrollFrames?: number;
}> = ({items, start = 0, every = 4, size = 8.3, pitch = 15.2, x = 12.1, y = 30, align = 'left', color = COLOR.ink, scrollAt, scrollFrames = 30}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const fs = (size / 100) * height;
  const sp = useSpeed();
  const sc = scrollAt === undefined ? 0 : interpolate(f, [scrollAt, scrollAt + scrollFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad)});
  const scrollY = sc * (items.length * pitch + y + 10);
  const vblur = scrollAt === undefined ? 0 : Math.max(0, (sc - 0.55) * 120) * (height / 1080);
  return (
    <div
      style={{
        position: 'absolute',
        left: align === 'left' ? `${x}%` : '50%',
        top: `${y - scrollY}%`,
        transform: align === 'center' ? 'translateX(-50%)' : undefined,
        fontFamily: FONT.sticker,
        fontWeight: 700,
        fontSize: fs,
        lineHeight: `${(pitch / 100) * height}px`,
        letterSpacing: '-0.03em',
        whiteSpace: 'nowrap',
        filter: vblur > 0.3 ? `blur(${vblur.toFixed(1)}px)` : undefined,
      }}
    >
      {items.map((it, i) => {
        const st = start + i * every;
        if (f < st) return <div key={i} style={{opacity: 0}}>/{it}</div>;
        const s = interpolate(f, [st, st + scaled(5, sp, 3)], [2.3, 1], {extrapolateRight: 'clamp', easing: stampEase});
        return (
          <div key={i} style={{display: 'flex', alignItems: 'baseline'}}>
            <span style={{display: 'inline-block', transform: `scale(${s})`, transformOrigin: '50% 70%', color}}>/</span>
            <Stream text={it.replace(/^\//, '')} start={st + 2} cps={240} tail={9} color={color} />
          </div>
        );
      })}
    </div>
  );
};

/**
 * Giant slash wipe (v2 ending): a full-height pink "/" sweeps right -> left in 3 f with an echo trail,
 * erasing what is left of it (pass the content as children), then shrinks and darkens into a cursor at
 * (9 %W, 50 %H) over 11 f.
 */
export const SlashWipe: React.FC<{at?: number; children?: React.ReactNode}> = ({at = 0, children}) => {
  const f = useCurrentFrame();
  const {width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  const sweep = interpolate(f, [at, at + 3], [1.15, 0.12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.expoOut});
  const shrink = interpolate(f, [at + 3, at + 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.cubicOut});
  const col = interpolateColors(shrink, [0, 0.5, 1], [COLOR.pink, '#760038', COLOR.ink]);
  const h = lerp(frameH * 1.06, height * 0.077, shrink);
  const x = sweep * width;
  const slant = Math.tan((25.1 * Math.PI) / 180);
  const cx = lerp(x, 0.09 * width, shrink);
  const cy = frameH / 2;
  const wSl = h * 0.16;
  if (f < at) return <>{children}</>;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, clipPath: `polygon(0 0, ${((x + (h / 2) * slant) / width) * 100}% 0, ${((x - (h / 2) * slant) / width) * 100}% 100%, 0 100%)`, opacity: shrink > 0 ? 0 : 1}}>{children}</div>
      <svg width={width} height={frameH} style={{position: 'absolute', inset: 0}}>
        {(shrink === 0 ? [0.15, 0.35, 0.6, 1] : [1]).map((o, i, arr) => {
          const dx = shrink === 0 ? (arr.length - 1 - i) * 0.05 * width : 0;
          const top = cx + dx + (h / 2) * slant;
          const bot = cx + dx - (h / 2) * slant;
          return <polygon key={i} points={`${top - wSl / 2},${cy - h / 2} ${top + wSl / 2},${cy - h / 2} ${bot + wSl / 2},${cy + h / 2} ${bot - wSl / 2},${cy + h / 2}`} fill={col} opacity={o} />;
        })}
      </svg>
    </>
  );
};

/**
 * Section header band (v2): 17.4 %H tall on paper with a lime glow off the right end; spark icon,
 * "/feature-name" written by its slash, right-anchored description typed at 7.5 chars/frame with the
 * birth ramp. Put the section's footage below it: <AbsoluteFill style={{top: `${HEADER.heightPct}%`}}>.
 */
export const SkillHeader: React.FC<{name: string; desc: string; at?: number; icon?: React.ReactNode; descWidth?: number}> = ({name, desc, at = 0, icon, descWidth = 36}) => {
  const height = useShort();
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: `${HEADER.heightPct}%`,
        backgroundColor: COLOR.paper,
        backgroundImage: 'radial-gradient(circle at 105% 60%, #E5E489 0%, #F5F4D3 9vw, rgba(251,249,252,0) 18vw)',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {icon ? <div style={{position: 'absolute', left: '2.4%', top: '50%', transform: 'translateY(-50%)'}}>{icon}</div> : null}
      <SlashTitle text={name} at={at} y={50} />
      <div
        style={{
          position: 'absolute',
          right: `${100 - HEADER.descRight}%`,
          top: '50%',
          transform: 'translateY(-50%)',
          width: `${descWidth}%`,
          fontFamily: FONT.ui,
          fontWeight: 500,
          fontSize: (HEADER.descFontPct / 100) * height,
          lineHeight: 1.44,
          color: '#100A0A',
        }}
      >
        <Stream text={desc} start={at + 1} cps={HEADER.descCharsPerFrame * 30} tail={6} color="#100A0A" accent={['#E2457E', '#B0185A']} blur={5} />
      </div>
    </div>
  );
};

/** Spring that overshoots ~13 % and peaks at +3 f (v3 partner-icon pop). */
const popCfg = {mass: 1, stiffness: 1400, damping: 41};

/**
 * Collab lockup (v3 / v2 choreography): left logo whips up from below (overshoot, 9 f), its name drops in;
 * the group slides aside (expo-out, 12 f) as the partner logo pops (13 % overshoot) and the partner name
 * assembles glyph by glyph in shuffled order; the × fades in; the pill rises while the lockup lifts.
 * Logos are user-supplied files (never redraw a real brand's mark).
 */
export const Lockup: React.FC<{
  left: {logo?: string; name: string; font?: string; weight?: number};
  right?: {logo?: string; name: string; font?: string; weight?: number};
  pill?: string;
  pillTyped?: boolean;
  at?: number;
  size?: number; // cap height % of frame height (v3 6.4, v2 wordmark 6.1)
  y?: number;
  times?: string;
  /** v1: the finished lockup (held at `liftScale`) moves up `liftBy` %H and settles to 1x over 16 f, bezier(.70,.05,.15,1) */
  liftAt?: number;
  liftBy?: number;
  liftScale?: number;
}> = ({left, right, pill, pillTyped = false, at = 0, size = 6.4, y = 46, times = '×', liftAt, liftBy = 15.6, liftScale = 1.11}) => {
  const sp = useSpeed();
  const f = (useCurrentFrame() - at) * sp;
  const {fps, width: frameW, height: frameH} = useVideoConfig();
  const height = Math.min(frameW, frameH);
  const fs = (size / 100) * height * 1.38;
  const logoH = fs * 1.25;
  const gap = fs * 0.32;
  const rightW = right ? (right.logo ? logoH + gap : 0) + right.name.length * fs * 0.55 + gap * 2 + fs * 0.5 : 0;
  const slide = right ? interpolate(f, [11, 23], [rightW / 2, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.expoOut}) : 0;
  const lift = pill ? interpolate(f, [29, 39], [0, -0.055 * height], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut}) : 0;
  const lt = liftAt === undefined ? 1 : interpolate(f + at, [liftAt, liftAt + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.7, 0.05, 0.15, 1)});
  const liftY = liftAt === undefined ? 0 : (1 - lt) * (liftBy / 100) * height;
  const liftS = liftAt === undefined ? 1 : lerp(liftScale, 1, lt);
  const iconY = interpolate(f, [2, 6, 11], [0.11 * height, -0.032 * height, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.cubicOut});
  const iconBlur = f < 4 ? 8 * (height / 1080) : 0;
  const nameT = prog(f, 7, 3, E.cubicOut);
  const pop = right ? spring({frame: f - 12, fps, config: popCfg}) : 0;
  const rx = right ? interpolate(f, [12, 21], [0.14 * height, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.expoOut}) : 0;
  const order = right ? Array.from(right.name).map((_, i) => i).sort((a, b) => random(`lk${a}`) - random(`lk${b}`)) : [];
  const glyphAt = (i: number) => 12 + order.indexOf(i) * (16 / Math.max(1, order.length));
  const logo = (src: string, extra: React.CSSProperties) => <Img src={resolve(src)} style={{height: logoH, width: 'auto', display: 'block', ...extra}} />;
  if (f < 0) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: `${y}%`, transform: `translateY(calc(-50% + ${lift + liftY}px)) scale(${liftS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: fs * 0.55}}>
      <div style={{display: 'flex', alignItems: 'center', gap, transform: `translateX(${slide}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap}}>
          {left.logo ? logo(left.logo, {transform: `translateY(${iconY}px)`, filter: iconBlur ? `blur(${iconBlur}px)` : undefined, opacity: f < 2 ? 0 : 1}) : null}
          <span style={{fontFamily: left.font ?? FONT.ui, fontWeight: left.weight ?? 500, fontSize: fs, color: COLOR.ink, letterSpacing: '-0.025em', whiteSpace: 'nowrap', opacity: nameT, transform: `translateY(${(1 - nameT) * 0.04 * height}px)`, filter: nameT < 1 ? `blur(${(1 - nameT) * 8}px)` : undefined}}>
            {left.name}
          </span>
        </div>
        {right ? (
          <>
            <span style={{fontFamily: FONT.ui, fontSize: fs * 0.45, color: '#949296', opacity: prog(f, 12, 4, E.cubicOut)}}>{times}</span>
            <div style={{display: 'flex', alignItems: 'center', gap, transform: `translateX(${rx}px)`}}>
              {right.logo ? logo(right.logo, {transform: `scale(${pop})`}) : null}
              <span style={{fontFamily: right.font ?? FONT.ui, fontWeight: right.weight ?? 600, fontSize: fs, color: COLOR.ink, letterSpacing: '-0.025em', whiteSpace: 'nowrap'}}>
                {Array.from(right.name).map((ch, i) => {
                  const g = prog(f, glyphAt(i), 3, E.cubicOut);
                  return (
                    <span key={i} style={{display: 'inline-block', opacity: g, transform: `scale(${lerp(0.6, 1, g)})`, filter: g < 1 ? `blur(${(1 - g) * 6}px)` : undefined, whiteSpace: 'pre'}}>
                      {ch}
                    </span>
                  );
                })}
              </span>
            </div>
          </>
        ) : null}
      </div>
      {pill ? (
        <Pill text={pill} at={at + (pillTyped ? 3 : 33)} typed={pillTyped} />
      ) : null}
    </div>
  );
};

/**
 * End card / CTA line. 'slide' (v2): uppercase lines centred, full opacity, slide up 13.9 %H in 10 f
 * (bezier(.11,.11,.17,.9)) and hold ~49 f. 'fade' (v4): pure linear opacity 6 f, hold ~44 f.
 * 'none' (v1): static CTA over the hero footage (use color '#FCFAF7', weight 500). 'stream': birth ramp.
 */
export const EndCard: React.FC<{lines: string[]; at?: number; size?: number; color?: string; entry?: 'slide' | 'stream' | 'fade' | 'none'; weight?: number}> = ({
  lines,
  at = 0,
  size = END.capPct,
  color = COLOR.ink,
  entry = 'slide',
  weight = 400,
}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const fs = (size / 100) * height * 1.42;
  const t = interpolate(f, [at, at + END.slideFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...END.slideBezier)});
  if ((entry === 'slide' || entry === 'fade' || entry === 'none') && f < at) return null;
  const fade = entry === 'fade' ? clamp01((f - at + 1) / END.fadeFrames) : 1;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        opacity: fade,
        transform: `translateY(-50%) translateY(${entry === 'slide' ? (1 - t) * END.slidePct : 0}%)`,
        textAlign: 'center',
        fontFamily: FONT.ui,
        fontWeight: weight,
        fontSize: fs,
        lineHeight: `${(END.linePitchPct / 100) * height * (size / END.capPct)}px`,
        color,
        textTransform: 'uppercase',
        filter: entry === 'slide' && t < 0.25 ? `blur(${(0.25 - t) * 12}px)` : undefined,
      }}
    >
      {lines.map((l, i) => (
        <div key={i}>{entry === 'stream' ? <Stream text={l} start={at + i * 6} cps={END.cps} tail={9} color={color} /> : l}</div>
      ))}
    </div>
  );
};

/**
 * Spark / asterisk mark with 12 irregular rounded rays (stand-in for an agent icon).
 * `wobble` (v1): rays change length independently +-25 % and the spark turns slowly - the "thinking" look.
 * `boil` (v2 header): the shape re-draws in steps every 3 f on a 30 f loop. `pop`: quint-out scale-in
 * over 16 f; `cycle`: the v2 entry hue cycle lime -> mustard -> orange -> coral -> pink-red -> coral.
 */
export const Spark: React.FC<{size?: number; color?: string; rays?: number; spin?: number; at?: number; pop?: boolean; cycle?: boolean; boil?: boolean; wobble?: boolean; style?: React.CSSProperties}> = ({
  size = 3,
  color = COLOR.terracotta,
  rays = 12,
  spin,
  at = 0,
  pop = false,
  cycle = false,
  boil = false,
  wobble = false,
  style,
}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const s = (size / 100) * height;
  const sc = pop ? interpolate(f, [at, at + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: stampEase}) : 1;
  const c = cycle ? interpolateColors(f - at, [0, 3, 5, 8, 10, 15, 23], ['#E9FF86', '#D3D660', '#D0A15E', '#CD665E', '#C93660', '#C93660', color]) : color;
  const phase = boil ? Math.floor(((f - at) % 30) / 3) : 0;
  const rot = (spin ?? (wobble ? 0.6 : 0)) * f;
  return (
    <svg width={s} height={s} viewBox="-50 -50 100 100" style={{display: 'inline-block', flex: 'none', transform: `rotate(${rot}deg) scale(${sc})`, ...style}}>
      {Array.from({length: rays}, (_, i) => {
        const base = 34 + random(`ray${i}-${phase}`) * 12;
        const len = wobble ? base * (1 + 0.25 * Math.sin(f / (5 + random(`w${i}`) * 4) + random(`p${i}`) * 6.28)) : base;
        return <rect key={i} x={-4.5} y={-Math.min(48, len) - 2} width={9} height={Math.min(48, len)} rx={4.5} fill={c} transform={`rotate(${(360 / rays) * i + (random(`a${i}`) - 0.5) * 9})`} />;
      })}
    </svg>
  );
};

/**
 * Hero word (v1 "OPUS 5.5"): serif caps (cap 24 %H) that blur in on twos (3 steps), then hard-swap
 * material textures (stones, shells, leaves... AI stills, 2-6 f each), then a left-to-right cream
 * light-burn sweeps the letters (~0.8 f per letter, 10 f each) and they settle to a coral gradient.
 * Rendered as SVG text so every layer shares exact glyph geometry.
 */
export const HeroWord: React.FC<{
  text: string;
  textures?: string[];
  /** local frame each texture appears (same length as textures) */
  swaps?: number[];
  burnAt?: number;
  gradient?: [string, string];
  bloom?: string;
  font?: string;
  weight?: number;
  size?: number;
  y?: number;
  at?: number;
  tracking?: number;
}> = ({text, textures = [], swaps, burnAt, gradient = ['#D4775D', '#E68A6E'], bloom = '#FBE5C2', font = FONT.serif, weight = 500, size = 24, y = 56.8, at = 0, tracking = -0.02}) => {
  const f = useCurrentFrame();
  const {width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  const id = React.useId().replace(/:/g, '');
  const fs = (size / 100) * height * 1.42;
  const k = height / 1080;
  // blur-in on twos: three held states
  const step = f < at ? -1 : f < at + 2 ? 0 : f < at + 4 ? 1 : 2;
  const blurIn = [15, 6, 0][Math.max(0, step)] * k;
  const sw = swaps ?? textures.map((_, i) => at + 6 + i * 6);
  let tex = -1;
  sw.forEach((s0, i) => {
    if (f >= s0) tex = i;
  });
  const burnStart = burnAt ?? (sw.length ? sw[sw.length - 1] + 4 : at + 8);
  const sweepDur = Math.max(8, text.length * 1);
  const p = interpolate(f, [burnStart, burnStart + sweepDur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const settle = interpolate(f, [burnStart + sweepDur, burnStart + sweepDur + 10], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const x0 = 0.12 * width;
  const x1 = 0.88 * width;
  const px = x0 + (x1 - x0) * p;
  const band = 0.08 * width;
  const common = {x: width / 2, y: (y / 100) * frameH, textAnchor: 'middle' as const, dominantBaseline: 'middle' as const, fontFamily: font, fontWeight: weight, fontSize: fs, letterSpacing: `${tracking}em`};
  if (step < 0) return null;
  const done = f >= burnStart + sweepDur;
  return (
    <svg width={width} height={frameH} style={{position: 'absolute', inset: 0, filter: blurIn > 0.1 ? `blur(${blurIn}px)` : undefined}}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradient[1]} />
          <stop offset="100%" stopColor={gradient[0]} />
        </linearGradient>
        {textures.map((t, i) => (
          <pattern key={i} id={`p${id}${i}`} patternUnits="userSpaceOnUse" width={width} height={frameH}>
            <image href={resolve(t)} x={0} y={0} width={width} height={frameH} preserveAspectRatio="xMidYMid slice" />
          </pattern>
        ))}
        <linearGradient id={`mL${id}`} gradientUnits="userSpaceOnUse" x1={0} x2={width} y1={0} y2={0}>
          <stop offset={Math.max(0, (px - band) / width)} stopColor="#fff" />
          <stop offset={Math.min(1, px / width)} stopColor="#000" />
        </linearGradient>
        <linearGradient id={`mB${id}`} gradientUnits="userSpaceOnUse" x1={0} x2={width} y1={0} y2={0}>
          <stop offset={Math.max(0, (px - band * 1.6) / width)} stopColor="#000" />
          <stop offset={Math.max(0, (px - band * 0.5) / width)} stopColor="#fff" />
          <stop offset={Math.min(1, (px + band * 0.4) / width)} stopColor="#000" />
        </linearGradient>
        <mask id={`ml${id}`}><rect width={width} height={frameH} fill={`url(#mL${id})`} /></mask>
        <linearGradient id={`mR${id}`} gradientUnits="userSpaceOnUse" x1={0} x2={width} y1={0} y2={0}>
          <stop offset={Math.max(0, (px - band) / width)} stopColor="#000" />
          <stop offset={Math.min(1, px / width)} stopColor="#fff" />
        </linearGradient>
        <mask id={`mr${id}`}><rect width={width} height={frameH} fill={`url(#mR${id})`} /></mask>
        <mask id={`mb${id}`}><rect width={width} height={frameH} fill={`url(#mB${id})`} /></mask>
        <filter id={`bl${id}`}><feGaussianBlur stdDeviation={12 * k} /></filter>
      </defs>
      {/* material (right of the sweep) */}
      {!done ? (
        <text {...common} fill={tex >= 0 ? `url(#p${id}${tex})` : `url(#g${id})`} mask={p > 0 ? `url(#mr${id})` : undefined}>
          {text}
        </text>
      ) : null}
      {/* settled coral gradient (left of the sweep) */}
      {p > 0 ? (
        <text {...common} fill={`url(#g${id})`} mask={done ? undefined : `url(#ml${id})`}>
          {text}
        </text>
      ) : null}
      {/* cream bloom riding the sweep, fading as letters settle */}
      {p > 0 && settle > 0 ? (
        <text {...common} fill={bloom} mask={done ? undefined : `url(#mb${id})`} filter={`url(#bl${id})`} opacity={done ? settle : 1}>
          {text}
        </text>
      ) : null}
    </svg>
  );
};

/** A colour band (blue -> teal -> green -> olive -> orange -> coral -> red-pink) sweeps through a word right-to-left (v3 "dots", 16 f). */
export const SweepText: React.FC<{text: string; at?: number; dur?: number; color?: string; style?: React.CSSProperties}> = ({text, at = 0, dur = 16, color = COLOR.ink, style}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <span
      style={{
        ...style,
        backgroundImage: `linear-gradient(90deg, ${color} 0%, ${color} 30%, #3C56AC 38%, #62B6A7 44%, #7FD774 50%, #AFBD60 56%, #D69D41 62%, #EB7C5D 66%, #DA6060 70%, ${color} 76%, ${color} 100%)`,
        backgroundSize: '400% 100%',
        backgroundPosition: `${lerp(0, 100, t)}% 0`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {text}
    </span>
  );
};

