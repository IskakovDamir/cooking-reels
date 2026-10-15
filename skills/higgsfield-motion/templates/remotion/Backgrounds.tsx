// Backgrounds: #FBF9FC paper with soft corner glows and a dot grid, dark grid, technical grid.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {BG, COLOR, FONT, type BgSpec, type Glow} from './tokens';
import {jitter, useShort} from './core';

const glowGradient = (g: Glow, alpha = 1) =>
  `radial-gradient(circle at ${g.x}% ${g.y}%, ${g.color}${alpha < 1 ? Math.round(alpha * 255).toString(16).padStart(2, '0') : ''} 0%, ${g.color}00 ${g.r}vw)`;

/** Soft radial glows (centre x/y in % of frame, radius r in % of frame width). They drift ~1 % so the frame never sits dead. */
export const Glows: React.FC<{glows: readonly Glow[]; drift?: number}> = ({glows, drift = 0.8}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: glows
          .map((g, i) => glowGradient({...g, x: g.x + Math.sin(t * 0.35 + i * 1.7) * drift, y: g.y + Math.cos(t * 0.3 + i * 2.3) * drift}, g.opacity ?? 1))
          .join(', '),
      }}
    />
  );
};

/**
 * Dot grid. 'all' = faint dots everywhere (v3: #F3F0F4, 41 px pitch @1080);
 * 'glow' = white halftone dots only where the glows are (v2: 3 px, 15.5 px pitch, 50 % alpha).
 */
export const Dots: React.FC<{mode: 'all' | 'glow'; glows?: readonly Glow[]}> = ({mode, glows = []}) => {
  const height = useShort();
  const k = height / 1080;
  const pitch = (mode === 'all' ? 41 : 15.5) * k;
  const r = (mode === 'all' ? 1.6 : 1.5) * k;
  const color = mode === 'all' ? '#F3F0F4' : 'rgba(255,255,255,0.5)';
  const mask = mode === 'glow' && glows.length ? glows.map((g) => glowGradient({...g, color: '#000000'})).join(', ') : undefined;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(circle, ${color} ${r}px, transparent ${r + 0.6}px)`,
        backgroundSize: `${pitch}px ${pitch}px`,
        backgroundPosition: 'center center',
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  );
};

export const Paper: React.FC<{spec?: BgSpec; dots?: 'all' | 'glow' | 'none'}> = ({spec = BG.hf, dots}) => {
  const mode = dots ?? (spec.dots ? 'glow' : 'all');
  return (
    <AbsoluteFill style={{backgroundColor: spec.base}}>
      <Glows glows={spec.glows} />
      {mode !== 'none' ? <Dots mode={mode} glows={spec.glows} /> : null}
    </AbsoluteFill>
  );
};

/** Faint square grid (dark or light), optional crosshair marks and code columns (tech look). */
export const Grid: React.FC<{
  cell?: number;
  color?: string;
  base?: string;
  crosshairs?: boolean;
  code?: boolean;
  vignette?: boolean;
}> = ({cell = 6.5, color = 'rgba(0,0,0,0.05)', base = COLOR.paper, crosshairs = false, code = false, vignette = false}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const px = (cell / 100) * height;
  return (
    <AbsoluteFill style={{backgroundColor: base}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: `${px}px ${px}px`,
          backgroundPosition: 'center center',
        }}
      />
      {crosshairs
        ? [
            [18, 22],
            [82, 22],
            [18, 78],
            [82, 78],
          ].map(([x, y], i) => (
            <div key={i} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', color: COLOR.mute, fontSize: height * 0.03, fontFamily: FONT.ui, opacity: 0.7}}>
              +
            </div>
          ))
        : null}
      {code ? (
        <div style={{position: 'absolute', left: '2%', top: '30%', width: '16%', fontFamily: FONT.mono, fontSize: height * 0.009, lineHeight: 1.5, color: COLOR.mute, opacity: 0.55, whiteSpace: 'pre'}}>
          {Array.from({length: 18}, (_, i) => {
            const n = Math.abs(jitter(`code${i}`, f, 3));
            return `${(n * 1e6).toFixed(0).padStart(6, '0')}  ${n > 0.5 ? 'fetch(api)' : 'await job()'}  ${(n * 99).toFixed(1)}\n`;
          }).join('')}
        </div>
      ) : null}
      {vignette ? <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)'}} /> : null}
    </AbsoluteFill>
  );
};

/** v4 deadline background: near-black with an inverted vignette, warm red edge, faint calendar grid. */
export const Calendar: React.FC = () => {
  const height = useShort();
  const k = height / 1080;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, #080509 0%, #141013 35%, #1B191A 70%)'}}>
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(120,20,40,0.25), transparent 15%)'}} />
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: `100% ${125 * k}px`}} />
      <div style={{position: 'absolute', top: 6 * k, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', fontFamily: FONT.ui, fontSize: 14 * k, color: 'rgba(255,255,255,0.18)'}}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/** v4 technical frame: 1 px #E9E7EB rectangle extended to the frame edges, black "+" marks at its corners, binary and code in the margins. */
export const TechFrame: React.FC<{rect?: [number, number, number, number]}> = ({rect = [8.3, 19.6, 91.5, 79.9]}) => {
  const f = useCurrentFrame();
  const height = useShort();
  const k = height / 1080;
  const [x0, y0, x1, y1] = rect;
  const line = (st: React.CSSProperties) => <div style={{position: 'absolute', background: '#E9E7EB', ...st}} />;
  const plus = (x: number, y: number) => (
    <div key={`${x}-${y}`} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', width: 33 * k, height: 33 * k}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 2 * k, background: '#000', transform: 'translateY(-50%)'}} />
      <div style={{position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2 * k, background: '#000', transform: 'translateX(-50%)'}} />
    </div>
  );
  const code = ['guidance: 7.5,', 'if (!job.ready) return null;', 'const buf = new Uint8Array(1 << 20);', '// resolve latent', 'stream.pipe(decoder);', 'export type Latent = Float32Array', 'render(frame[i]);', 'git commit -m "open source"'];
  return (
    <AbsoluteFill style={{backgroundColor: '#FAF7FB'}}>
      {line({left: 0, right: 0, top: `${y0}%`, height: 1})}
      {line({left: 0, right: 0, top: `${y1}%`, height: 1})}
      {line({top: 0, bottom: 0, left: `${x0}%`, width: 1})}
      {line({top: 0, bottom: 0, left: `${x1}%`, width: 1})}
      {[plus(x0, y0), plus(x1, y0), plus(x0, y1), plus(x1, y1)]}
      <div style={{position: 'absolute', right: '2%', top: '2%', width: `${100 - x1 - 3}%`, fontFamily: FONT.mono, fontSize: 18 * k, lineHeight: 1.35, color: '#D4D2CF', wordBreak: 'break-all'}}>
        {Array.from({length: 70}, (_, i) => (jitter(`bin${i}`, f, 4) > 0 ? '1 ' : '0 ')).join('')}
      </div>
      <div style={{position: 'absolute', left: '1.5%', bottom: '3%', fontFamily: FONT.mono, fontSize: 18 * k, lineHeight: 1.5, color: '#D3D8D4', whiteSpace: 'pre'}}>{code.join('\n')}</div>
      <div style={{position: 'absolute', left: 0, top: 0, width: `${x0}%`, height: `${y0}%`, background: 'linear-gradient(135deg, #E9F4F9, #FAF7FB)'}} />
      <div style={{position: 'absolute', right: 0, bottom: 0, width: `${100 - x1}%`, height: `${100 - y1}%`, background: '#F6EEE1'}} />
    </AbsoluteFill>
  );
};

export type BgName = 'paper' | 'white' | 'list' | 'offer' | 'peach' | 'sky' | 'dark' | 'darkGrid' | 'calendar' | 'tech' | 'acid' | 'none';

export const Background: React.FC<{name: BgName}> = ({name}) => {
  switch (name) {
    case 'paper':
      return <Paper spec={BG.hf} />;
    case 'list':
      return <Paper spec={BG.hfList} />;
    case 'offer':
      return <Paper spec={BG.offer} />;
    case 'calendar':
      return <Calendar />;
    case 'white':
      return <Paper spec={{base: COLOR.paper, glows: []}} dots="all" />;
    case 'peach':
      return <Paper spec={BG.peach} dots="none" />;
    case 'sky':
      return <Paper spec={BG.sky} dots="all" />;
    case 'acid':
      return <Paper spec={BG.acid} dots="glow" />;
    case 'dark':
      return <AbsoluteFill style={{backgroundColor: COLOR.dark}} />;
    case 'darkGrid':
      return <Grid base={COLOR.dark} color="rgba(255,255,255,0.045)" vignette />;
    case 'tech':
      return <TechFrame />;
    case 'none':
      return null;
  }
};
