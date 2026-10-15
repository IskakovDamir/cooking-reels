// Camera: keyframed virtual camera over an oversized layer (UI macro shots), plus simple push/drift.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {E, type EaseFn} from './core';

export type CamKey = {
  /** local frame */
  at: number;
  /** point of the layer (in % of the frame, 50/50 = centre) that sits at the frame centre */
  x?: number;
  y?: number;
  /** zoom (1 = layer at frame size) */
  zoom?: number;
  /** rotation in degrees (rare; tiny Dutch tilts only) */
  rot?: number;
  /** easing INTO this key */
  ease?: EaseFn;
};

/**
 * Moves a virtual camera over its children. Children are laid out on a frame-sized canvas; the
 * camera looks at (x, y) with `zoom`. Between keys it eases with `ease` (default expoInOut feel of
 * the references: a quick whip of attention, then a long settle).
 */
export const CameraPath: React.FC<{keys: CamKey[]; children: React.ReactNode; motionBlur?: number}> = ({keys, children, motionBlur = 0}) => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const at = (fr: number) => {
    let x = keys[0].x ?? 50;
    let y = keys[0].y ?? 50;
    let z = keys[0].zoom ?? 1;
    let r = keys[0].rot ?? 0;
    for (let i = 1; i < keys.length; i++) {
      const a = keys[i - 1];
      const b = keys[i];
      if (fr <= a.at) break;
      const t = interpolate(fr, [a.at, b.at], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: b.ease ?? E.expoInOut});
      x = (a.x ?? 50) + ((b.x ?? a.x ?? 50) - (a.x ?? 50)) * t;
      y = (a.y ?? 50) + ((b.y ?? a.y ?? 50) - (a.y ?? 50)) * t;
      z = (a.zoom ?? 1) + ((b.zoom ?? a.zoom ?? 1) - (a.zoom ?? 1)) * t;
      r = (a.rot ?? 0) + ((b.rot ?? a.rot ?? 0) - (a.rot ?? 0)) * t;
    }
    return {x, y, z, r};
  };
  const c = at(f);
  const p = at(f - 1);
  const speed = Math.hypot(((c.x - p.x) / 100) * width * c.z, ((c.y - p.y) / 100) * height * c.z);
  const blur = motionBlur > 0 ? Math.min(motionBlur, speed * 0.25) : 0;
  // with transform-origin at the target point, scaling keeps it in place; translate brings it to centre
  const tx = 50 - c.x;
  const ty = 50 - c.y;
  return (
    <AbsoluteFill style={{filter: blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : undefined}}>
      <AbsoluteFill style={{transform: `translate(${tx}%, ${ty}%) scale(${c.z}) rotate(${c.r}deg)`, transformOrigin: `${c.x}% ${c.y}%`}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Constant-speed drift: translate (% of frame per second) + scale rate (fraction per second). */
export const Drift: React.FC<{x?: number; y?: number; zoom?: number; rot?: number; children: React.ReactNode}> = ({x = 0, y = 0, zoom = 0, rot = 0, children}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  return <AbsoluteFill style={{transform: `translate(${x * t}%, ${y * t}%) scale(${1 + zoom * t}) rotate(${rot * t}deg)`}}>{children}</AbsoluteFill>;
};

/**
 * Punch-ins (v3 measured x1.475 / x2.3 jumps): the layer jumps to `scale` at `at` and settles the last
 * 4 % over ~6 f, so the cut feels like a hit, not a zoom. Origin in % of the layer.
 */
export const Punch: React.FC<{keys: {at: number; scale: number; x?: number; y?: number}[]; children: React.ReactNode}> = ({keys, children}) => {
  const f = useCurrentFrame();
  let s = 1;
  let ox = 50;
  let oy = 50;
  for (const k of keys) {
    if (f < k.at) break;
    const t = interpolate(f, [k.at, k.at + 6], [0, 1], {extrapolateRight: 'clamp', easing: E.expoOut});
    s = k.scale * (1.04 - 0.04 * t);
    ox = k.x ?? ox;
    oy = k.y ?? oy;
  }
  return <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: `${ox}% ${oy}%`}}>{children}</AbsoluteFill>;
};
