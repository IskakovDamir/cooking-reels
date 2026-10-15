// Media: footage/stills, before/after wipe, grids, 3D deck and fan, carousel, card -> fullscreen.
import {useSpeed} from './profile';
import React from 'react';
import {AbsoluteFill, Easing, Img, OffthreadVideo, interpolate, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {E, clamp01, lerp, prog, useShort} from './core';
import {COLOR, FONT, MEDIA, TAG, WIPE} from './tokens';

export type Src = {src: string; type?: 'image' | 'video'; trimBefore?: number; fit?: 'cover' | 'contain'; position?: string; /** placeholder label while src is empty */ label?: string};

const isUrl = (s: string) => /^(https?:|data:|blob:)/.test(s);

/**
  * Preview stand-ins: wrap the composition in <PlaceholderStills.Provider value={['stills/a.jpg', 'clips/b.mp4']}>
 * and every empty src renders one of these images or clips (picked by its label) instead of the grey card -
 * useful to judge pace and colour before the real footage exists. Leave it out for the final render.
 */
export const PlaceholderStills = React.createContext<string[] | null>(null);
const pick = (list: string[], key: string) => list[Math.abs(Array.from(key).reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7)) % list.length];
export const resolve = (s: string) => (isUrl(s) ? s : staticFile(s));

/** An image or video that fills its box. An empty src draws a labelled grey placeholder. */
export const MediaFill: React.FC<Src & {style?: React.CSSProperties}> = ({src, type, trimBefore = 0, fit = 'cover', position = 'center', style, label}) => {
  const height = useShort();
  const stills = React.useContext(PlaceholderStills);
  const st: React.CSSProperties = {width: '100%', height: '100%', objectFit: fit, objectPosition: position, display: 'block', ...style};
  if (!src && stills && stills.length) return <MediaFill src={pick(stills, label ?? 'media')} type={type} trimBefore={trimBefore} fit={fit} position={position} style={style} />;
  if (!src)
    return (
      <div style={{...st, background: 'linear-gradient(135deg,#d9d7de,#c9c6cf)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6d6a74', fontFamily: FONT.mono, fontSize: height * 0.018}}>
        {label ?? 'media'}
      </div>
    );
  const kind = type ?? (/\.(mp4|mov|webm|m4v)$/i.test(src) ? 'video' : 'image');
  return kind === 'video' ? <OffthreadVideo src={resolve(src)} trimBefore={trimBefore} muted style={st} /> : <Img src={resolve(src)} style={st} />;
};

/** Full-frame footage with a slow push (the references drift 1-2.2 %/s on holds). */
export const Footage: React.FC<Src & {push?: number; label?: string}> = ({push = MEDIA.footagePush, ...m}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{transform: `scale(${1 + push * (f / fps)})`}}>
      <MediaFill {...m} />
    </AbsoluteFill>
  );
};

/** Rounded media card on the paper background (video results, app screens). */
export const MediaCard: React.FC<Src & {w?: number; h?: number; x?: number; y?: number; radius?: number; label?: string; style?: React.CSSProperties}> = ({
  w = 56,
  h = 44,
  x = 50,
  y = 50,
  radius = MEDIA.cardRadius,
  style,
  ...m
}) => {
  const height = useShort();
  return (
    <div style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, transform: 'translate(-50%,-50%)', borderRadius: (radius / 1080) * height, overflow: 'hidden', ...style}}>
      <MediaFill {...m} />
    </div>
  );
};

/**
 * Rounded card that grows to full bleed (v3: x1.42 in 14 f, bezier(.45,0,.2,1), radius -> 0).
 * `w` = start width in % of frame; it ends at 100 %.
 */
export const CardToFull: React.FC<Src & {at?: number; dur?: number; w?: number; label?: string}> = ({at = 0, dur = 14, w = 70, ...m}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const t = interpolate(f, [at, at + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.45, 0, 0.2, 1)});
  const s = lerp(w / 100, 1, t);
  return (
    <AbsoluteFill style={{transform: `scale(${s})`, borderRadius: (15 / 1080) * height * (1 - t) / s, overflow: 'hidden'}}>
      <MediaFill {...m} />
    </AbsoluteFill>
  );
};

const scrambleGlyphs = '\\/|#%TDEFR*';

/**
 * Skewed BEFORE / AFTER tag (v2: skewX -25, box 79-94.9 %W x 86.6-91.9 %H, BEFORE white on pink,
 * AFTER ink on lime, heavy extended caps 3.2 %H). `enterAt` = centre-out letter reveal (4 f);
 * `swapAt` = 7 f scramble from BEFORE to AFTER growing from the centre.
 */
export const BATag: React.FC<{kind?: 'before' | 'after'; swapAt?: number; enterAt?: number; before?: string; after?: string}> = ({kind = 'before', swapAt, enterAt, before = 'BEFORE', after = 'AFTER'}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const swapping = swapAt !== undefined && f >= swapAt && f < swapAt + TAG.swapFrames;
  const isAfter = kind === 'after' || (swapAt !== undefined && f >= swapAt + TAG.swapFrames);
  const label = isAfter ? after : before;
  const st = (p: number) => ({bg: p > 0.5 ? COLOR.lime : COLOR.pink, fg: p > 0.5 ? COLOR.ink : '#fff'});
  const sp = swapping ? (f - swapAt!) / TAG.swapFrames : isAfter ? 1 : 0;
  const {bg, fg} = st(sp);
  const n = label.length;
  const enter = enterAt === undefined ? 1 : clamp01((f - enterAt) / 4);
  const visible = Math.ceil(enter * n);
  const text = Array.from(swapping ? (sp < 0.5 ? before : after) : label)
    .map((ch, i) => {
      const fromCentre = Math.abs(i - (n - 1) / 2);
      if (fromCentre > visible / 2 + 0.01) return ' ';
      if (swapping && fromCentre < sp * n) return random(`tg${i}${f}`) > 0.5 ? scrambleGlyphs[Math.floor(random(`g${i}${f}`) * scrambleGlyphs.length)] : ch;
      return ch;
    })
    .join('');
  const limeBand = swapping && sp < 0.75 ? sp / 0.75 : 0;
  if (enterAt !== undefined && f < enterAt) return null;
  return (
    <div style={{position: 'absolute', left: `${TAG.x}%`, top: `${TAG.y}%`, width: `${TAG.w}%`, height: `${TAG.h}%`, transform: `skewX(${TAG.skew}deg)`, background: bg, overflow: 'hidden', zIndex: 6, filter: enter < 1 ? `blur(${(1 - enter) * 4}px)` : undefined}}>
      {limeBand > 0 ? <div style={{position: 'absolute', top: 0, bottom: 0, left: `${50 - limeBand * 50}%`, width: `${limeBand * 100}%`, background: COLOR.lime}} /> : null}
      <div style={{position: 'absolute', inset: 0, transform: `skewX(${-TAG.skew}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sticker, fontWeight: 800, fontSize: (TAG.capPct / 100) * height * 1.35, color: limeBand > 0.4 ? COLOR.ink : fg, whiteSpace: 'pre', letterSpacing: '0.01em'}}>
        {text}
      </div>
    </div>
  );
};

const wipeIn = Easing.bezier(...WIPE.inBezier);
const wipeOut = Easing.bezier(...WIPE.outBezier);

/** Wipe line position (centre x in % of width) over time: in -> hold at 50.9 % -> out (v2 measured). */
export const wipeX = (f: number, at: number, fast = false) => {
  const tin = fast ? WIPE.fast.inFrames : WIPE.inFrames;
  const hold = fast ? WIPE.fast.holdFrames : WIPE.holdFrames;
  const tout = fast ? WIPE.fast.outFrames : WIPE.outFrames;
  if (f < at + tin) return interpolate(f, [at - 0.5, at + tin - 0.5], [-10.2, 50.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: wipeIn});
  if (f < at + tin + hold) return 50.9;
  return interpolate(f, [at + tin + hold, at + tin + hold + tout], [50.9, 125], {extrapolateRight: 'clamp', easing: wipeOut});
};

/**
 * Before/after (v2). 'wipe': a lime line slanted 25.1 deg from vertical (same slant as "/") sweeps in,
 * holds a split screen for 2 f at the centre, sweeps out; AFTER is revealed on the line's left.
 * 'burst': AFTER spreads from an impact point through an organic mask with a lime glow frontier.
 * Tags swap BEFORE -> AFTER when the line reaches them.
 */
export const BeforeAfter: React.FC<{
  before: Src;
  after: Src;
  at?: number;
  mode?: 'wipe' | 'burst';
  fast?: boolean;
  line?: string;
  origin?: [number, number];
  tags?: boolean;
  tagEnterAt?: number;
  push?: number;
}> = ({before, after, at = 20, mode = 'wipe', fast = false, line = COLOR.lime, origin = [22, 55], tags = true, tagEnterAt, push = MEDIA.footagePush}) => {
  const f = useCurrentFrame();
  const {fps, width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  const sp = useSpeed();
  const fw = at + (f - at) * sp; // profile-scaled clock for the wipe
  const sc = 1 + push * (f / fps);
  const lean = (Math.tan((WIPE.angleDeg * Math.PI) / 180) * frameH) / width * 100; // horizontal run of the line over the full height, % of width
  let clip = 'inset(0 100% 0 0)';
  let lineEl: React.ReactNode = null;
  let swapAt = at + (fast ? 9 : 14);
  if (mode === 'wipe') {
    const cx = wipeX(fw, at, fast);
    const top = cx + lean / 2;
    const bot = cx - lean / 2;
    clip = `polygon(-50% 0%, ${top}% 0%, ${bot}% 100%, -50% 100%)`;
    const visibleLine = fw >= at && cx < 120;
    lineEl = visibleLine ? (
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        <line x1={(top / 100) * width} y1={0} x2={(bot / 100) * width} y2={height} stroke={line} strokeWidth={(WIPE.lineW / 1080) * height} style={{filter: `drop-shadow(0 0 ${height * 0.002}px ${line})`}} />
      </svg>
    ) : null;
    // the tag (centre ~87 %W, 89 %H) is crossed when the line's x at that height passes it
    for (let fr = at; fr < at + 40; fr++) {
      const c = wipeX(fr, at, fast);
      if (c + lean / 2 - (lean * 89) / 100 > 87) {
        swapAt = at + (fr - at) / sp;
        break;
      }
    }
  } else {
    const t = prog(f, at, 6, E.cubicOut);
    const r = t * 160;
    clip = `circle(${r}% at ${origin[0]}% ${origin[1]}%)`;
    const glow = clamp01(1 - (f - at - 6) / 7) * (f >= at ? 1 : 0);
    lineEl =
      glow > 0 ? (
        <AbsoluteFill style={{background: `radial-gradient(circle at ${origin[0]}% ${origin[1]}%, transparent ${Math.max(0, r - 14)}%, ${COLOR.limeGlow} ${r}%, transparent ${r + 10}%)`, mixBlendMode: 'screen', opacity: glow}} />
      ) : null;
    swapAt = at;
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${sc})`}}>
        <MediaFill {...before} label={before.label ?? 'BEFORE plate'} />
      </AbsoluteFill>
      <AbsoluteFill style={{clipPath: clip}}>
        <AbsoluteFill style={{transform: `scale(${sc})`}}>
          <MediaFill {...after} label={after.label ?? 'AFTER plate'} />
        </AbsoluteFill>
      </AbsoluteFill>
      {lineEl}
      {tags ? <BATag swapAt={swapAt} enterAt={tagEnterAt} /> : null}
    </AbsoluteFill>
  );
};

/** Grid of media that pops in tile by tile (blur + scale), optional lime highlight on one tile. */
export const MediaGrid: React.FC<{
  items: Src[];
  cols?: number;
  gap?: number;
  w?: number;
  h?: number;
  start?: number;
  stagger?: number;
  radius?: number;
  highlight?: {index: number; at: number; color?: string};
}> = ({items, cols = 2, gap = 1.2, w = 70, h = 84, start = 0, stagger = 3, radius = 14, highlight}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const rows = Math.ceil(items.length / cols);
  return (
    <div style={{position: 'absolute', left: `${(100 - w) / 2}%`, top: `${(100 - h) / 2}%`, width: `${w}%`, height: `${h}%`, display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: `${gap}vh`}}>
      {items.map((it, i) => {
        const t = prog(f, start + i * stagger, 12, E.expoOut);
        const hl = highlight && highlight.index === i && f >= highlight.at;
        return (
          <div
            key={i}
            style={{
              borderRadius: (radius / 1080) * height,
              overflow: 'hidden',
              opacity: clamp01(t * 2),
              transform: `scale(${lerp(0.86, 1, t)})`,
              filter: t < 1 ? `blur(${(1 - t) * 14 * (height / 1080)}px)` : undefined,
              outline: hl ? `${(4 / 1080) * height}px solid ${highlight!.color ?? COLOR.lime}` : undefined,
              outlineOffset: hl ? -(4 / 1080) * height : undefined,
              background: '#fff',
            }}
          >
            <MediaFill {...it} />
          </div>
        );
      })}
    </div>
  );
};

/**
 * Wall of tiles (posts, thumbnails) that zooms out in eased steps (v3: 1 -> .72 -> .535, ~20 f each,
 * cubic in-out) while drifting up. `steps` = [{at, scale}].
 */
export const ThumbWall: React.FC<{items: React.ReactNode[] | Src[]; cols?: number; steps?: {at: number; scale: number}[]; tile?: number; gap?: number; drift?: number}> = ({
  items,
  cols = 7,
  steps = [{at: 10, scale: 0.72}, {at: 38, scale: 0.535}],
  tile = 20.6,
  gap = 1.5,
  drift = 0,
}) => {
  const f = useCurrentFrame();
  const {width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  let z = 1;
  for (const s of steps) z = interpolate(f, [s.at, s.at + 20], [z, s.scale], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.inOut});
  const tw = (tile / 100) * width;
  const n = Math.max(items.length, cols * 6);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${tw}px)`,
          gap: (gap / 100) * width,
          transform: `translate(-50%, -50%) translateY(${-drift * f}px) scale(${z})`,
        }}
      >
        {Array.from({length: n}, (_, i) => {
          const it = items[i % items.length];
          return (
            <div key={i} style={{width: tw, aspectRatio: '395/355', borderRadius: height * 0.012, overflow: 'hidden'}}>
              {it && typeof it === 'object' && 'src' in (it as Src) ? <MediaFill {...(it as Src)} /> : (it as React.ReactNode)}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/**
 * 3D deck of cards (v3): perspective ~3100 px, rotateY ~-22 deg; a new card replaces the front every
 * `every` frames (2), older cards stay as slivers 20 px apart to the left; optional collapse at `collapseAt`.
 */
export const CardStack3D: React.FC<{cards: React.ReactNode[]; every?: number; start?: number; rotY?: number; w?: number; h?: number; collapseAt?: number}> = ({
  cards,
  every = 2,
  start = 0,
  rotY = -22,
  w = 54,
  h = 83,
  collapseAt,
}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const k = height / 1080;
  const front = Math.min(cards.length - 1, Math.max(0, Math.floor((f - start) / every)));
  const collapse = collapseAt === undefined ? 0 : clamp01((f - collapseAt) / 2);
  return (
    <AbsoluteFill style={{perspective: 3100 * k}}>
      {cards.slice(0, front + 1).map((c, i) => {
        const d = front - i; // 0 = front
        if (d > 12) return null;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${50 - w / 2}%`,
              top: `${50 - h / 2}%`,
              width: `${w}%`,
              height: `${h}%`,
              transform: `translateX(${-d * 20 * k * (1 - collapse)}px) translateZ(${-d * 40 * k * (1 - collapse)}px) rotateY(${rotY}deg)`,
              zIndex: 100 - d,
              opacity: d > 0 ? 1 - collapse : 1,
              borderRadius: 41 * k,
              overflow: 'hidden',
            }}
          >
            {c}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export type FanLabel = {text: string; x: number; y: number; at: number; icon?: React.ReactNode; to?: [number, number]};

/**
 * Fan of app screens in 3D (v3): rotateY 38, rotateX 10, layers 85 px apart in depth, unfolding expo-out
 * over 16 f, mint glow behind, slow push (1 -> 1.106 over ~54 f), floating labels with leader lines.
 */
export const ScreenFan3D: React.FC<{screens: Src[]; labels?: FanLabel[]; start?: number; glow?: boolean; heading?: string}> = ({screens, labels = [], start = 0, glow = true, heading}) => {
  const f = useCurrentFrame();
  const {width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  const k = height / 1080;
  const unfold = prog(f, start + 6, 16, E.expoOut);
  const push = interpolate(f, [start + 22, start + 76], [1, 1.106], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
  return (
    <AbsoluteFill>
      {glow ? <AbsoluteFill style={{background: 'radial-gradient(36vw 22vw at 52% 52%, #C4DDDECC, #DDF0EF88 40%, transparent 70%)', opacity: unfold}} /> : null}
      <AbsoluteFill style={{perspective: 2200 * k, transform: `scale(${push})`}}>
        <AbsoluteFill style={{transformStyle: 'preserve-3d', transform: 'rotateY(38deg) rotateX(10deg)'}}>
          {screens.map((s, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '30%',
                top: '27%',
                width: '38%',
                height: '46%',
                borderRadius: 14 * k,
                overflow: 'hidden',
                transform: `translateZ(${-i * 85 * k * unfold}px) translateX(${i * 20 * k * unfold}px)`,
                boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
              }}
            >
              <MediaFill {...s} label={s.src ? undefined : `screen ${i + 1}`} />
            </div>
          ))}
        </AbsoluteFill>
      </AbsoluteFill>
      {heading ? <div style={{position: 'absolute', left: '5.2%', top: '5.2%', fontFamily: FONT.ui, fontSize: 0.043 * height, letterSpacing: '-0.03em', color: COLOR.ink}}>{heading}</div> : null}
      <svg width={width} height={frameH} style={{position: 'absolute', inset: 0}}>
        {labels.map((l, i) =>
          l.to && f >= l.at ? <line key={i} x1={(l.x / 100) * width} y1={(l.y / 100) * frameH} x2={(l.to[0] / 100) * width} y2={(l.to[1] / 100) * frameH} stroke="#fff" strokeWidth={1.2 * k} opacity={prog(f, l.at, 6, E.cubicOut)} /> : null,
        )}
      </svg>
      {labels.map((l, i) => {
        const t = prog(f, l.at, 8, E.backOut);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${l.x}%`,
              top: `${l.y}%`,
              transform: `translate(-50%,-50%) scale(${t})`,
              display: 'flex',
              alignItems: 'center',
              gap: 0.008 * height,
              padding: `${0.006 * height}px ${0.012 * height}px`,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.72)',
              boxShadow: `0 0 ${0.02 * height}px rgba(255,255,255,0.9)`,
              fontFamily: FONT.ui,
              fontSize: 0.0185 * height,
              color: COLOR.ink,
              whiteSpace: 'nowrap',
              opacity: clamp01(t * 2),
              filter: t < 1 ? `blur(${(1 - t) * 6}px)` : undefined,
            }}
          >
            {l.icon}
            {l.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/**
 * Horizontal carousel of 9:16 tiles (v3 UGC): enters with an expo-out offset (~1800 px @1080 over 30 f)
 * then drifts left at a constant 516 px/s; `dropAt` drops the strip out with an ease-in.
 */
export const Carousel: React.FC<{items: Src[]; speed?: number; h?: number; gap?: number; dropAt?: number}> = ({items, speed = 516, h = 89, gap = 39, dropAt}) => {
  const f = useCurrentFrame();
  const {fps, width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  const k = height / 1080;
  const tileH = (h / 100) * frameH;
  const tileW = tileH * (9 / 16);
  const enter = (1 - E.expoOut(clamp01(f / 30))) * 1805 * k;
  const x = enter - speed * k * (f / fps);
  const drop = dropAt === undefined ? 0 : interpolate(f, [dropAt, dropAt + 17], [0, frameH], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E.expoIn});
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: `${(100 - h) / 2}%`, left: width * 0.04 + x, display: 'flex', gap: gap * k, transform: `translateY(${drop}px)`}}>
        {[...items, ...items, ...items].map((it, i) => (
          <div key={i} style={{width: tileW, height: tileH, borderRadius: 15 * k, overflow: 'hidden', flex: 'none'}}>
            <MediaFill {...it} label={it.src ? undefined : 'UGC 9:16'} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
