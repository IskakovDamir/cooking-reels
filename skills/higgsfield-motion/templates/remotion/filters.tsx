// SVG filters applied to HTML layers with `filter: url(#id)` (Chrome renders these per frame).
// Each filter is parametrised per frame; mount the <defs> next to the layer that uses it.
import React from 'react';
import {THERMAL} from './tokens';

const hidden: React.CSSProperties = {position: 'absolute', width: 0, height: 0, overflow: 'hidden'};

/** Directional (motion) blur: x/y standard deviations in px. Used by whips and scroll smears. */
export const DirBlurDef: React.FC<{id: string; x: number; y: number}> = ({id, x, y}) => (
  <svg style={hidden} aria-hidden>
    <defs>
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation={`${Math.max(0, x)} ${Math.max(0, y)}`} edgeMode="duplicate" />
      </filter>
    </defs>
  </svg>
);

/** Table for feFuncX from a list of hex stops (dark -> bright). */
const channel = (stops: readonly string[], c: 0 | 1 | 2) =>
  stops.map((h) => (parseInt(h.slice(1 + c * 2, 3 + c * 2), 16) / 255).toFixed(3)).join(' ');

/**
 * Thermal / heat-map look: luminance -> false-colour ramp (posterised when `discrete`), mixed with the
 * source by `amount` (0 = untouched, 1 = full heat map). `soften` blurs before mapping (blobby bands).
 */
export const ThermalDef: React.FC<{id: string; amount: number; soften?: number; stops?: readonly string[]; discrete?: boolean}> = ({
  id,
  amount,
  soften = 6,
  stops = THERMAL.stops,
  discrete = false,
}) => {
  const kind = discrete ? 'discrete' : 'table';
  const a = Math.min(1, Math.max(0, amount));
  return (
    <svg style={hidden} aria-hidden>
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation={soften * a} edgeMode="duplicate" result="b" />
          <feColorMatrix
            in="b"
            type="matrix"
            values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0"
            result="g"
          />
          <feComponentTransfer in="g" result="t">
            <feFuncR type={kind} tableValues={channel(stops, 0)} />
            <feFuncG type={kind} tableValues={channel(stops, 1)} />
            <feFuncB type={kind} tableValues={channel(stops, 2)} />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" in2="t" operator="arithmetic" k1={0} k2={1 - a} k3={a} k4={0} />
        </filter>
      </defs>
    </svg>
  );
};

/**
 * Digital glitch: horizontal band displacement (turbulence-driven) + RGB channel split.
 * `amount` 0..1, `seed` should change every 1-2 frames for the stutter look.
 */
export const GlitchDef: React.FC<{id: string; amount: number; seed: number; split?: number; shift?: number}> = ({
  id,
  amount,
  seed,
  split = 10,
  shift = 70,
}) => {
  const a = Math.min(1, Math.max(0, amount));
  const s = split * a;
  return (
    <svg style={hidden} aria-hidden>
      <defs>
        <filter id={id} x="-10%" y="0" width="120%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.00001 0.035" numOctaves={1} seed={seed} result="n0" />
          <feColorMatrix in="n0" type="matrix" values="4 0 0 0 -1.5  0 0 0 0 0.5  0 0 0 0 0  0 0 0 0 1" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={shift * a} xChannelSelector="R" yChannelSelector="G" result="d" />
          <feColorMatrix in="d" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
          <feOffset in="r" dx={s} dy={0} result="ro" />
          <feColorMatrix in="d" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
          <feColorMatrix in="d" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="bl" />
          <feOffset in="bl" dx={-s} dy={0} result="bo" />
          <feComposite in="ro" in2="g" operator="arithmetic" k1={0} k2={1} k3={1} k4={0} result="rg" />
          <feComposite in="rg" in2="bo" operator="arithmetic" k1={0} k2={1} k3={1} k4={0} />
        </filter>
      </defs>
    </svg>
  );
};

/**
 * Gradient map wrapper: maps luminance of its children onto `stops` (dark -> bright), e.g. the
 * lime/pink duotone footage ("CLAIM UP TO $100,000") or a full thermal look. `amount` 0..1.
 */
export const GradientMap: React.FC<{stops: readonly string[]; amount?: number; soften?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  stops,
  amount = 1,
  soften = 0,
  children,
  style,
}) => {
  const id = React.useId().replace(/:/g, '');
  return (
    <div style={{position: 'absolute', inset: 0, ...style}}>
      <ThermalDef id={`gm${id}`} amount={amount} soften={soften} stops={stops} />
      <div style={{position: 'absolute', inset: 0, filter: `url(#gm${id})`}}>{children}</div>
    </div>
  );
};
