// Scene = one shot. Timeline = scenes back to back (hard cuts) with per-scene entry/exit effects.
// The references almost never overlap two shots: a "transition" is the outgoing shot's exit effect
// followed by the incoming shot's entry effect across a hard cut. That keeps beat math trivial:
// every scene starts exactly where the previous one ends.
import {scaled, useSpeed} from './profile';
import React, {useId} from 'react';
import {AbsoluteFill, Easing, Series, useCurrentFrame, useVideoConfig} from 'remotion';
import {E, clamp01, lerp} from './core';
import {DirBlurDef, GlitchDef, ThermalDef} from './filters';
import {GlitchHud} from './Glitch';
import {Background, type BgName} from './Backgrounds';
import {COLOR, FX, THERMAL, setTheme, type Theme} from './tokens';

export type Dir = 'left' | 'right' | 'up' | 'down';

export type Fx =
  | {type: 'cut'}
  /** rack focus: gaussian blur `px` (@1080) -> 0. Calibrated default = the measured full-frame focus pull. */
  | {type: 'blur'; frames?: number; px?: number; scale?: number; ease?: keyof typeof E}
  /** fade from/to a colour (default paper; v2 fades to #FBF9FC linearly in 8 f) */
  | {type: 'fade'; frames?: number; color?: string}
  /** whip pan: short travel along `dir` with directional motion blur */
  | {type: 'whip'; dir?: Dir; frames?: number; px?: number; dist?: number}
  /** in: scale `scale` -> 1 with blur. out: v2 zoom-whip, expo-in scale to `scale` with roll + directional blur */
  | {type: 'zoom'; frames?: number; scale?: number; px?: number; rot?: number; axis?: 'x' | 'y'}
  /** in only: v3 card emerging from the vanishing point (scale .05 -> 1 expo-out 14 f, blur 12 -> 0, radius -> 0) */
  | {type: 'emerge'; frames?: number}
  /** in only: v2 panel dock, rises from below the frame with a leading-edge smear */
  | {type: 'rise'; frames?: number}
  /** false-colour heat map: out = blur + LUT ramp (9 f); in = LUT fades (11 f) while blur decays (30 f tail) */
  | {type: 'thermal'; frames?: number; palette?: 'v2' | 'v1'}
  /** v1 overexposure punch (out): highlights burn to white, x1.3 zoom, 4 f */
  | {type: 'burn'; frames?: number}
  /** v4 glitch: RGB split + band displacement + HUD boxes / dot matrix; `to` steps the frame to black or white */
  | {type: 'glitch'; frames?: number; to?: 'black' | 'white'; hud?: boolean};

export type SceneProps = {
  /** duration in frames */
  dur: number;
  in?: Fx;
  out?: Fx;
  /** camera push-in, scale fraction per second (0.02 = +2 %/s, the measured hold drift). Negative = pull out. */
  push?: number;
  bg?: BgName | React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

type FxState = {
  blur: number; dx: number; dy: number; tx: number; ty: number; scale: number; rot: number;
  opacity: number; thermal: number; glitch: number; veil: number; veilColor: string; radius: number; hud: boolean; burn: number; palette: 'v2' | 'v1';
};
const neutral = (): FxState => ({blur: 0, dx: 0, dy: 0, tx: 0, ty: 0, scale: 1, rot: 0, opacity: 1, thermal: 0, glitch: 0, veil: 0, veilColor: COLOR.paper, radius: 0, hud: false, burn: 0, palette: 'v2'});
const vec: Record<Dir, [number, number]> = {left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1]};
const riseEase = Easing.bezier(0.08, 0.42, 0.14, 1);

export const fxFrames = (fx?: Fx, phase: 'in' | 'out' = 'in') => {
  if (!fx || fx.type === 'cut') return 0;
  if (fx.frames !== undefined) return fx.frames;
  if (phase === 'out') {
    if (fx.type === 'blur') return FX.blur.outFrames;
    if (fx.type === 'zoom') return FX.zoom.outFrames;
    if (fx.type === 'thermal') return FX.thermal.outFrames;
  }
  if (fx.type === 'emerge') return 14;
  if (fx.type === 'burn') return 4;
  return FX[fx.type].frames;
};

/** t = 0..1 progress through the effect, n = its length in frames, k = height / 1080 */
const apply = (s: FxState, fx: Fx | undefined, phase: 'in' | 'out', t: number, n: number, k: number) => {
  if (!fx || fx.type === 'cut') return;
  const fl = t * n; // frames into the effect
  switch (fx.type) {
    case 'blur': {
      const px = (fx.px ?? FX.blur.px) * k;
      const e = phase === 'in' ? 1 - E[fx.ease ?? FX.blur.ease](t) : E.cubicIn(t);
      s.blur = Math.max(s.blur, px * e);
      s.scale *= lerp(1, fx.scale ?? FX.blur.scale, e);
      break;
    }
    case 'fade': {
      s.veil = Math.max(s.veil, phase === 'in' ? 1 - t : t);
      s.veilColor = fx.color ?? COLOR.paper;
      break;
    }
    case 'whip': {
      const [vx, vy] = vec[fx.dir ?? 'left'];
      const px = (fx.px ?? FX.whip.px) * k;
      const dist = fx.dist ?? FX.whip.dist;
      const e = phase === 'in' ? 1 - E.expoOut(t) : E.expoIn(t);
      const sign = phase === 'in' ? -1 : 1;
      s.tx += sign * vx * e * dist;
      s.ty += sign * vy * e * dist;
      s.dx = Math.max(s.dx, Math.abs(vx) * px * Math.min(1, e * 2.5));
      s.dy = Math.max(s.dy, Math.abs(vy) * px * Math.min(1, e * 2.5));
      break;
    }
    case 'zoom': {
      if (phase === 'in') {
        const e = 1 - E.expoOut(t);
        s.scale *= lerp(1, fx.scale ?? FX.zoom.scaleIn, e);
        s.blur = Math.max(s.blur, (fx.px ?? FX.zoom.px) * k * e);
      } else {
        const e = E.expoIn(t);
        s.scale *= lerp(1, fx.scale ?? FX.zoom.scaleOut, e);
        s.rot += (fx.rot ?? FX.zoom.outRot) * e;
        if (fx.axis === 'y') s.dy = Math.max(s.dy, (fx.px ?? FX.zoom.outDirPx) * k * e);
        else s.dx = Math.max(s.dx, (fx.px ?? FX.zoom.outDirPx) * k * e);
      }
      break;
    }
    case 'emerge': {
      const e = E.expoOut(t);
      s.scale *= lerp(0.05, 1, e);
      s.blur = Math.max(s.blur, 12 * k * (1 - clamp01(fl / 13)));
      s.radius = Math.max(s.radius, 21 * k * (1 - e) + 0.01);
      break;
    }
    case 'rise': {
      const e = riseEase(t);
      s.ty += (1 - e) * 100;
      s.dy = Math.max(s.dy, 25 * k * (1 - e));
      break;
    }
    case 'thermal': {
      s.palette = fx.palette ?? 'v2';
      if (phase === 'out') {
        s.thermal = Math.max(s.thermal, clamp01(t * 1.3));
        s.blur = Math.max(s.blur, THERMAL.peakPx * k * t);
      } else {
        // LUT holds ~2 f, then fades over the rest of mixFrames; blur decays with tau = 11 f (measured)
        s.thermal = Math.max(s.thermal, 1 - E.inOut(clamp01((fl - 2) / (FX.thermal.mixFrames - 2))));
        s.blur = Math.max(s.blur, THERMAL.peakPx * k * Math.exp(-fl / 11));
      }
      break;
    }
    case 'burn': {
      s.burn = Math.max(s.burn, phase === 'out' ? t : 1 - t);
      s.scale *= lerp(1, 1.3, phase === 'out' ? Math.min(1, t * 3) : 1 - t);
      break;
    }
    case 'glitch': {
      s.glitch = Math.max(s.glitch, phase === 'in' ? 1 - t : t);
      s.hud = fx.hud ?? true;
      if (fx.to) {
        // measured luma steps 237/207/152/84/0 (ease-in) on the way out, linear on the way in
        s.veil = Math.max(s.veil, phase === 'out' ? Math.pow(t, 1.6) : 1 - t);
        s.veilColor = fx.to === 'black' ? '#000000' : COLOR.paper;
      }
      break;
    }
  }
};

/** One shot with entry/exit effects, background and an optional continuous push-in. */
export const Scene: React.FC<SceneProps> = ({dur, in: fxIn, out: fxOut, push = 0, bg = 'paper', children, style}) => {
  const f = useCurrentFrame();
  const {fps, width: frameW, height: frameH} = useVideoConfig();
  const height = Math.min(frameW, frameH);
  const id = useId().replace(/:/g, '');
  const k = height / 1080;
  const s = neutral();
  const sp = useSpeed();
  const nIn = fxIn && fxIn.type !== 'cut' && fxIn.frames === undefined ? scaled(fxFrames(fxIn), sp) : fxFrames(fxIn);
  const nOut = fxOut && fxOut.type !== 'cut' && fxOut.frames === undefined ? scaled(fxFrames(fxOut, 'out'), sp) : fxFrames(fxOut, 'out');
  if (nIn > 0 && f < nIn) apply(s, fxIn, 'in', clamp01(f / nIn), nIn, k);
  if (nOut > 0 && f >= dur - nOut) apply(s, fxOut, 'out', clamp01((f - (dur - nOut) + 1) / nOut), nOut, k);

  const filters: string[] = [];
  if (s.blur > 0.05) filters.push(`blur(${s.blur.toFixed(2)}px)`);
  if (s.dx + s.dy > 0.05) filters.push(`url(#${id}d)`);
  if (s.thermal > 0.005) filters.push(`url(#${id}t)`);
  if (s.burn > 0.01) filters.push(`brightness(${(1 + 2.2 * s.burn).toFixed(2)}) contrast(${(1 + 0.4 * s.burn).toFixed(2)})`);
  if (s.glitch > 0.005) filters.push(`url(#${id}g)`);
  // overscan so blurred edges never pull in the page behind the layer (and a whip's short travel never shows an edge)
  const card = s.radius > 0;
  const overscan = card ? 1 : 1 + (2.5 * Math.max(s.blur, s.dx, s.dy)) / height + (2 * Math.max(Math.abs(s.tx), Math.abs(s.ty))) / 100 + Math.abs(s.rot) * 0.02;
  const pushScale = 1 + push * (f / fps);

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: card ? COLOR.paper : '#000', ...style}}>
      {s.dx + s.dy > 0.05 ? <DirBlurDef id={`${id}d`} x={s.dx} y={s.dy} /> : null}
      {s.thermal > 0.005 ? <ThermalDef id={`${id}t`} amount={s.thermal} soften={0} discrete={s.palette === 'v2'} stops={s.palette === 'v1' ? THERMAL.v1 : THERMAL.stops} /> : null}
      {s.glitch > 0.005 ? <GlitchDef id={`${id}g`} amount={s.glitch} seed={Math.floor(f / 2) + 1} /> : null}
      <AbsoluteFill
        style={{
          transform: `translate(${s.tx}%, ${s.ty}%) scale(${s.scale * overscan}) rotate(${s.rot}deg)`,
          opacity: s.opacity,
          filter: filters.length ? filters.join(' ') : undefined,
          borderRadius: card ? s.radius / Math.max(0.05, s.scale) : undefined,
          overflow: card ? 'hidden' : undefined,
        }}
      >
        {typeof bg === 'string' ? <Background name={bg as BgName} /> : bg}
        <AbsoluteFill style={{transform: pushScale !== 1 ? `scale(${pushScale})` : undefined}}>{children}</AbsoluteFill>
      </AbsoluteFill>
      {s.hud && s.glitch > 0.05 ? <GlitchHud amount={s.glitch} seed={id} dark={bg === 'dark' || bg === 'darkGrid'} /> : null}
      {s.veil > 0.002 ? <AbsoluteFill style={{backgroundColor: s.veilColor, opacity: s.veil}} /> : null}
    </AbsoluteFill>
  );
};

export type SceneSpec = Omit<SceneProps, 'children'> & {el: React.ReactNode; name?: string};

/** Total length of a scene list in frames. */
export const totalFrames = (scenes: SceneSpec[]) => scenes.reduce((a, s) => a + s.dur, 0);

/** Start frame of every scene (for placing SFX / music cues). */
export const sceneStarts = (scenes: SceneSpec[]) => {
  let acc = 0;
  return scenes.map((s) => {
    const st = acc;
    acc += s.dur;
    return st;
  });
};

/** Plays scenes back to back. */
/** The film: scenes back to back. `theme` (accents / colours / fonts) applies before any scene renders; none = the measured Higgsfield palette. */
export const Timeline: React.FC<{scenes: SceneSpec[]; theme?: Theme}> = ({scenes, theme}) => {
  setTheme(theme);
  return (
    <Series>
      {scenes.map(({el, name, ...rest}, i) => (
        <Series.Sequence key={i} durationInFrames={rest.dur} name={name ?? `scene ${i + 1}`}>
          <Scene {...rest}>{el}</Scene>
        </Series.Sequence>
      ))}
    </Series>
  );
};
