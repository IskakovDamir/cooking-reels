// v4 glitch kit: HUD tracking boxes with "x: N y: N" labels and connector lines, lime dot-matrix dither,
// pink smear bands. Scene renders it automatically on glitch entries/exits; use it directly for accents.
import {useShort} from './core';
import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLOR, FONT} from './tokens';

export const GlitchHud: React.FC<{amount: number; seed?: string; dark?: boolean}> = ({amount, seed = 'hud', dark = false}) => {
  const f = useCurrentFrame();
  const {width, height: frameH} = useVideoConfig();
  const height = Math.min(width, frameH);
  if (amount <= 0.01) return null;
  const k = height / 1080;
  const tick = Math.floor(f / 2);
  const r = (s: string) => random(`${seed}-${tick}-${s}`);
  const boxes = Array.from({length: 3 + Math.floor(r('n') * 3)}, (_, i) => ({
    x: 0.12 + r(`x${i}`) * 0.66,
    y: 0.18 + r(`y${i}`) * 0.6,
    w: 0.08 + r(`w${i}`) * 0.22,
    h: 0.05 + r(`h${i}`) * 0.12,
  }));
  const box = dark ? '#9B8C2A' : COLOR.hudBox;
  const label = dark ? '#9B2E31' : COLOR.hudLabel;
  const bands = Array.from({length: 2 + Math.floor(r('b') * 3)}, (_, i) => ({y: r(`by${i}`), h: 0.02 + r(`bh${i}`) * 0.06, x: r(`bx${i}`) * 0.6}));
  return (
    <AbsoluteFill style={{opacity: Math.min(1, amount * 1.5), pointerEvents: 'none'}}>
      {/* lime dot-matrix dither, 15 px pitch @1080 */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle, #E8F297 ${2 * k}px, transparent ${2.6 * k}px)`,
          backgroundSize: `${15 * k}px ${15 * k}px`,
          opacity: 0.55 * amount,
          mixBlendMode: dark ? 'screen' : 'multiply',
          WebkitMaskImage: boxes.map((b) => `radial-gradient(ellipse at ${(b.x + b.w / 2) * 100}% ${(b.y + b.h / 2) * 100}%, #000 0%, transparent ${b.w * 120}%)`).join(', '),
        }}
      />
      {bands.map((b, i) => (
        <div key={`b${i}`} style={{position: 'absolute', left: `${b.x * 100}%`, top: `${b.y * 100}%`, width: '45%', height: `${b.h * 100}%`, background: `${COLOR.pink}55`, filter: `blur(${6 * k}px)`}} />
      ))}
      <svg width={width} height={frameH} style={{position: 'absolute', inset: 0}}>
        {boxes.slice(1).map((b, i) => (
          <line key={`l${i}`} x1={(boxes[i].x + boxes[i].w / 2) * width} y1={(boxes[i].y + boxes[i].h / 2) * frameH} x2={(b.x + b.w / 2) * width} y2={(b.y + b.h / 2) * frameH} stroke={label} strokeWidth={k} opacity={0.6} />
        ))}
        {boxes.map((b, i) => (
          <rect key={`r${i}`} x={b.x * width} y={b.y * frameH} width={b.w * width} height={b.h * frameH} fill="none" stroke={box} strokeWidth={1.2 * k} />
        ))}
      </svg>
      {boxes.map((b, i) => (
        <div key={`t${i}`} style={{position: 'absolute', left: `${b.x * 100}%`, top: `calc(${b.y * 100}% - ${16 * k}px)`, fontFamily: FONT.mono, fontSize: 13 * k, color: label, whiteSpace: 'nowrap'}}>
          x: {Math.round(b.x * 1920)} y: {Math.round(b.y * 1080)}
        </div>
      ))}
    </AbsoluteFill>
  );
};

/** Blinking marks (v4 pink "*" at the four corners, 1-3 visible at a time, re-rolled every 3 f). */
export const CornerMarks: React.FC<{glyph?: string; color?: string; size?: number}> = ({glyph = '*', color = COLOR.pink, size = 1.7}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const pos: [number, number][] = [[5.2, 7.2], [94.7, 7.2], [5.2, 92.2], [94.7, 92.2]];
  return (
    <AbsoluteFill>
      {pos.map(([x, y], i) =>
        random(`cm${i}-${Math.floor(f / 3)}`) > 0.45 ? (
          <div key={i} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', color, fontFamily: FONT.display, fontWeight: 700, fontSize: (size / 100) * height * 1.6}}>
            {glyph}
          </div>
        ) : null,
      )}
    </AbsoluteFill>
  );
};
