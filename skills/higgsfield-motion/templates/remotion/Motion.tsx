// Motion primitives measured in v1 (Claude collab) and v3 (agents): the upward-scroll Flow, the UI Pop,
// the Claude "thinking" line reveal, the headline shimmer and the pink-silhouette reveal.
import {useSpeed} from './profile';
import React from 'react';
import {AbsoluteFill, interpolate, interpolateColors, useCurrentFrame} from 'remotion';
import {clamp01, useShort} from './core';
import {CLAUDE_RAMP, FLOW, POP, UI} from './tokens';

/**
 * v1 upward-scroll choreography: the block rises in from +risePx (@1080) closing 16.4 % of the gap per
 * frame, drifts up slowly, and from `outAt` exits upward accelerating x1.18/f with blur and fade. The
 * whole film reads as one continuous scroll when every block uses it.
 */
export const Flow: React.FC<{at?: number; outAt?: number; rise?: number; drift?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({
  at = 0,
  outAt,
  rise = FLOW.risePx,
  drift = FLOW.driftPx,
  style,
  children,
}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const k = height / 1080;
  const sp = useSpeed();
  if (f < at) return null;
  const e = (f - at) * sp;
  const entry = rise * Math.pow(FLOW.rRise, e);
  const hold = -drift * Math.max(0, e - FLOW.entryFrames);
  const x = outAt === undefined ? 0 : Math.max(0, f - outAt) * sp;
  const exit = -FLOW.exitScalePx * (Math.pow(FLOW.kExit, x) - 1);
  const blurIn = interpolate(e, [0, FLOW.entryFrames], [FLOW.entryBlur, 0], {extrapolateRight: 'clamp'});
  const blurOut = outAt === undefined ? 0 : interpolate(x, [4, 4 + FLOW.exitFrames], [0, FLOW.exitBlur], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const op = interpolate(e, [0, 10], [0.2, 1], {extrapolateRight: 'clamp'}) * (outAt === undefined ? 1 : interpolate(x, [4, 4 + FLOW.exitFrames], [1, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const b = (blurIn + blurOut) * k;
  return <div style={{...style, transform: `${style?.transform ?? ''} translateY(${(entry + hold + exit) * k}px)`, filter: b > 0.1 ? `blur(${b.toFixed(2)}px)` : undefined, opacity: op}}>{children}</div>;
};

/**
 * v1 UI pop: scale 1 - r^f (95 % in ~8 f) with blur on the first frames. `origin` 'center' for pills,
 * tiles, thumbnails; 'top left' for the video card. Stagger siblings by POP.stagger frames.
 */
export const Pop: React.FC<{at?: number; origin?: string; r?: number; rise?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({
  at = 0,
  origin = 'center',
  r = POP.r,
  rise = 0,
  style,
  children,
}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const sp = useSpeed();
  if (f < at) return <div style={{...style, opacity: 0}}>{children}</div>;
  const s = 1 - Math.pow(r, (f - at + 1) * sp);
  const blur = (1 - s) * POP.blurPx * (height / 1080);
  return (
    <div style={{...style, transform: `${style?.transform ?? ''} translateY(${(1 - s) * rise}px) scale(${s})`, transformOrigin: origin, filter: blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : undefined}}>
      {children}
    </div>
  );
};

/** Colour of the Claude ramp `age` frames after a line starts. */
export const claudeColor = (age: number, final: string = CLAUDE_RAMP.colors[CLAUDE_RAMP.colors.length - 1]) =>
  interpolateColors(Math.max(0, age), [...CLAUDE_RAMP.frames], [...CLAUDE_RAMP.colors.slice(0, -1), final]);

/**
 * Claude "thinking" lines (v1): each line is revealed left -> right by a feathered wipe (7.5 f, ~200 px
 * feather) and the whole line runs the time-based colour ramp yellow -> orange -> magenta -> plum -> grey.
 * Lines start `stagger` frames apart. Use **bold** for a lead sentence (it darkens grey -> ink, no warm hues).
 */
export const ClaudeLines: React.FC<{lines: string[]; at?: number; stagger?: number; color?: string; boldColor?: string; warm?: boolean; style?: React.CSSProperties}> = ({
  lines,
  at = 0,
  stagger = CLAUDE_RAMP.lineStagger,
  color = UI.claudeBody,
  boldColor = UI.claudeHead,
  warm = true,
  style,
}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const sp = useSpeed();
  const feather = CLAUDE_RAMP.featherPx * (height / 1080);
  return (
    <div style={style}>
      {lines.map((line, i) => {
        const st = at + (i * stagger) / sp;
        const age = (f - st) * sp;
        const p = clamp01(age / CLAUDE_RAMP.wipeFrames);
        const mask = `linear-gradient(90deg, #000 calc(${p * 115}% - ${feather}px), transparent ${p * 115}%)`;
        const parts = line.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
        return (
          <div key={i} style={{WebkitMaskImage: mask, maskImage: mask, opacity: age < 0 ? 0 : 1, whiteSpace: 'pre'}}>
            {parts.map((part, j) =>
              part.startsWith('**') ? (
                <span key={j} style={{fontWeight: 600, color: interpolateColors(age, [0, 10], ['#928F93', boldColor])}}>
                  {part.slice(2, -2)}
                </span>
              ) : (
                <span key={j} style={{color: warm ? claudeColor(age, color) : interpolateColors(age, [0, 10], ['#928F93', color])}}>
                  {part}
                </span>
              ),
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Light band sweeping across bold text (v1 headline only): ~180 px wide @1080, linear ~168 px/f.
 * Wrap the text; the band is drawn with background-clip: text.
 */
export const Shimmer: React.FC<{at: number; color?: string; band?: string; speed?: number; width?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  at,
  color = UI.claudeHead,
  band = '#6E6E6E',
  speed = 168,
  width = 180,
  children,
  style,
}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const k = height / 1080;
  const x = (f - at) * speed * k;
  const w = (width / 2) * k;
  const active = f >= at && x < 4000 * k;
  return (
    <span
      style={{
        ...style,
        ...(active
          ? {
              backgroundImage: `linear-gradient(90deg, ${color} 0, ${color} ${x - w}px, ${band} ${x}px, ${color} ${x + w}px, ${color} 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }
          : {color}),
      }}
    >
      {children}
    </span>
  );
};

/**
 * Pink-silhouette reveal (v1 parts sheet): a transparent PNG first shows as a hot-pink silhouette, then
 * its real texture fades in over 3 f while an outline cycles orange -> amber -> lime -> off.
 */
export const PinkReveal: React.FC<{src?: string; at: number; style?: React.CSSProperties}> = ({src, at, style}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const t = clamp01((f - at) / 3);
  const o = f - at;
  const outline = interpolateColors(o, [0, 3, 6, 9], ['#F08A3A', '#F5C33B', '#DBEE45', 'rgba(219,238,69,0)']);
  const w = 3 * (height / 1080);
  const appear = clamp01((f - at + 4) / 2);
  if (!src)
    return (
      <div style={{position: 'relative', ...style, opacity: appear, borderRadius: 12, background: interpolateColors(t, [0, 1], [UI.silhouette, '#9A979D']), boxShadow: o >= 0 && o < 9 ? `0 0 0 ${w}px ${outline}` : undefined}} />
    );
  return (
    <div style={{position: 'relative', ...style, opacity: appear}}>
      <div style={{position: 'absolute', inset: 0, backgroundColor: UI.silhouette, WebkitMaskImage: `url(${src})`, maskImage: `url(${src})`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%', opacity: 1 - t}} />
      <img
        src={src}
        style={{width: '100%', height: '100%', display: 'block', opacity: t, filter: o >= 0 && o < 9 ? `drop-shadow(0 0 ${w}px ${outline}) drop-shadow(0 0 ${w}px ${outline})` : undefined}}
      />
    </div>
  );
};

/** A blank beat: 2-3 frames of pure paper between UI blocks (v1) or a 1-frame white flash after a hit. */
export const Blank: React.FC<{color?: string}> = ({color = '#FAF7FB'}) => <AbsoluteFill style={{backgroundColor: color}} />;
