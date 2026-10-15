// Pseudo-3D props built from CSS: flying coins, a rotating drum of words, a floating chip.
import {scaled, useSpeed} from './profile';
import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {E, clamp01, lerp, prog, useShort} from './core';
import {COLOR, FONT} from './tokens';

/** One coin: a disc with a darker rim, spinning around X/Y so it reads as 3D. */
export const Coin: React.FC<{size: number; color?: string; rotX?: number; rotY?: number; mark?: string}> = ({size, color = COLOR.lime, rotX = 0, rotY = 0, mark = '✦'}) => {
  const rim = Math.max(2, size * 0.07);
  return (
    <div style={{width: size, height: size, position: 'relative', transformStyle: 'preserve-3d', transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`}}>
      {Array.from({length: 4}, (_, i) => (
        <div key={i} style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `color-mix(in srgb, ${color} 70%, #5a6b00)`, transform: `translateZ(${-rim + (i * rim) / 3}px)`}} />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${color} 55%, white) 0%, ${color} 45%, color-mix(in srgb, ${color} 80%, #6f8500) 100%)`,
          boxShadow: `inset 0 0 0 ${size * 0.06}px color-mix(in srgb, ${color} 85%, #ffffff)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: `color-mix(in srgb, ${color} 70%, #4b5a00)`,
          fontSize: size * 0.42,
          transform: `translateZ(${rim * 0.1}px)`,
        }}
      >
        {mark}
      </div>
    </div>
  );
};

/**
 * Coin rain / burst: `count` coins fly across the frame along `dir` with spin and motion blur,
 * sizes spread for depth (big ones blurred, as if near the lens).
 */
export const Coins: React.FC<{count?: number; seed?: string; speed?: number; dir?: number; color?: string; start?: number; sizeMin?: number; sizeMax?: number}> = ({
  count = 22,
  seed = 'coins',
  speed = 0.35,
  dir = -60,
  color = COLOR.lime,
  start = 0,
  sizeMin = 6,
  sizeMax = 34,
}) => {
  const f = useCurrentFrame() - start;
  const {fps, width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  const rad = (dir * Math.PI) / 180;
  return (
    <AbsoluteFill style={{perspective: height * 1.5, overflow: 'hidden'}}>
      {Array.from({length: count}, (_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const depth = r('d');
        const size = ((sizeMin + (sizeMax - sizeMin) * depth * depth) / 100) * height;
        const v = speed * (0.6 + depth * 0.9) * width;
        const t = f / fps + r('t') * 3;
        const x0 = r('x') * width * 1.4 - width * 0.2;
        const y0 = r('y') * frameH * 1.4 - frameH * 0.2;
        const x = ((((x0 + Math.cos(rad) * v * t) % (width * 1.6)) + width * 1.6) % (width * 1.6)) - width * 0.3;
        const y = ((((y0 + Math.sin(rad) * v * t) % (frameH * 1.6)) + frameH * 1.6) % (frameH * 1.6)) - frameH * 0.3;
        const blur = depth > 0.75 ? (depth - 0.75) * 40 : depth < 0.25 ? (0.25 - depth) * 12 : 0;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, filter: blur > 0.5 ? `blur(${(blur * height) / 1080}px)` : undefined, opacity: f < 0 ? 0 : 1}}>
            <Coin size={size} color={color} rotX={(r('rx') * 60 + t * 140 * (r('s') > 0.5 ? 1 : -1)) % 360} rotY={(r('ry') * 70 + t * 90) % 360} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/**
 * Slot-machine wheel of words (v4 model list): labels sit radially on an arc whose pivot is at the left
 * edge (pivot (-6, 575) px @1080, radius 578 px, items 17.2 deg apart); the active item (next to the
 * black pointer) is big and black, neighbours shrink to ~55 % and fade to grey beyond +-35 deg.
 * `stops` = [{at, index}] - the wheel spins to each index with an expo-out settle and crawls
 * -0.5 deg/f in between (the measured dwell). A big index jump reads as the measured "whip skip".
 */
export const Wheel: React.FC<{
  items: string[];
  stops: {at: number; index: number}[];
  spin?: number;
  size?: number; // active cap % of frame height (v4 8.6)
  color?: string;
  dim?: string;
  pointer?: boolean;
}> = ({items, stops, spin = 14, size = 8.6, color = COLOR.ink, dim = '#BDBAC0', pointer = true}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const k = height / 1080;
  const step = 17.2;
  spin = scaled(spin, useSpeed(), 4);
  // angle of the wheel in "item units": interpolate between stop indices with expo-out, plus a slow crawl
  let pos = stops[0].index - 3;
  for (let i = 0; i < stops.length; i++) {
    const s0 = stops[i];
    const prev = i === 0 ? stops[0].index - 3 : stops[i - 1].index;
    if (f >= s0.at) pos = lerp(prev, s0.index, E.expoOut(clamp01((f - s0.at) / spin)));
  }
  const lastAt = [...stops].reverse().find((s0) => f >= s0.at)?.at ?? 0;
  const crawl = Math.max(0, f - lastAt - spin) * (0.5 / step);
  const p = pos + crawl;
  const R = 578 * k;
  const fs = (size / 100) * height * 1.38;
  return (
    <div style={{position: 'absolute', left: -6 * k, top: '53.2%', width: 0, height: 0}}>
      {pointer ? <div style={{position: 'absolute', left: (291 / 1276) * 1920 * k + 6 * k, top: -27 * k, width: 0, height: 0, borderTop: `${27 * k}px solid transparent`, borderBottom: `${27 * k}px solid transparent`, borderLeft: `${45 * k}px solid ${color}`}} /> : null}
      {items.map((it, i) => {
        const deg = (i - p) * step - 2.5;
        const a = Math.abs(deg);
        if (a > 70) return null;
        const active = a < step / 2;
        const sc = active ? 1 : interpolate(a, [step / 2, step, 35, 60], [0.75, 0.55, 0.42, 0.35], {extrapolateRight: 'clamp'});
        const op = interpolate(a, [0, 35, 60], [1, 0.9, 0], {extrapolateRight: 'clamp'});
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transformOrigin: '0 0',
              transform: `rotate(${deg}deg) translate(${R}px, -50%)`,
              whiteSpace: 'nowrap',
              fontFamily: FONT.display,
              fontWeight: active ? 800 : 600,
              fontSize: fs * sc,
              lineHeight: 1,
              color: active ? color : dim,
              opacity: op,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            {it}
          </div>
        );
      })}
    </div>
  );
};

/** Blinking cursor glyph (v4: 7 f on / 7 f off). */
export const Blink: React.FC<{glyph?: string; period?: number; at?: number; style?: React.CSSProperties}> = ({glyph = '_', period = 14, at = 0, style}) => {
  const f = useCurrentFrame();
  return <span style={{...style, opacity: f >= at && Math.floor((f - at) / (period / 2)) % 2 === 0 ? 1 : 0}}>{glyph}</span>;
};

/** Floating object (e.g. a 3D chip render) that rises and tilts in with a blur. */
export const FloatIn: React.FC<{at?: number; children: React.ReactNode; from?: number; rot?: number; style?: React.CSSProperties}> = ({at = 0, children, from = 12, rot = -10, style}) => {
  const f = useCurrentFrame();
  const t = prog(f, at, 20, E.expoOut);
  const bob = Math.sin(f / 14) * 0.6;
  return (
    <div style={{...style, transform: `${style?.transform ?? ''} translateY(${lerp(from, 0, t) + bob}vh) rotate(${lerp(rot, 0, t)}deg)`, opacity: clamp01(t * 2), filter: t < 1 ? `blur(${(1 - t) * 18}px)` : undefined}}>
      {children}
    </div>
  );
};
