// Screen Studio-style product shots from a captured page (scripts/capture_site.mjs) or a user screenshot
// (scripts/ui_regions.py): a device (laptop / phone / browser / window / none) on a stage, the page scrolling
// inside it, a camera that glides and zooms onto elements, a cursor or touch dot that travels and
// clicks, a spotlight that dims everything but one element, and motion blur on fast moves.
// All targets are rects in PAGE CSS PIXELS (what capture_site.mjs writes into <name>.json).
// A website is shown on the laptop (desktop capture, ideally a --frames viewport shot); the phone is for
// mobile apps only.
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp01, useShort} from './core';
import {COLOR, FONT} from './tokens';
import {resolve} from './Media';
import {useSpeed} from './profile';

export type Rect = {x: number; y: number; w: number; h: number};
export type Capture = {
  /** full-page screenshot (public/ path or URL) */
  src: string;
  /** page width in CSS px (390 mobile, 1440 desktop; for a plain screenshot: its pixel width) */
  pageW: number;
  /** page height in CSS px */
  pageH: number;
  /** device scale factor of the image (3 mobile, 2 desktop, 1 plain screenshot) */
  dpr?: number;
  /** visible viewport height in CSS px (844 mobile, 900 desktop) */
  viewH?: number;
};

export type ScreenKey = {
  at: number;
  /** page scroll in CSS px (top of the visible screen) */
  scroll?: number;
  /** element to frame; the camera zooms so it fills ~`fill` of the frame's short side */
  focus?: Rect;
  /** explicit zoom (overrides the automatic one); 1 = whole device in frame */
  zoom?: number;
  /** fraction of the frame the focused element should fill (default .78) */
  fill?: number;
  /** frames this move takes (default 18 at the reference speed) */
  dur?: number;
};

export type CursorKey = {at: number; to: Rect | {x: number; y: number}; click?: boolean; dur?: number};

/** Screen Studio feel: quick start, long soft landing, no overshoot. */
const glide = Easing.bezier(0.45, 0, 0.12, 1);

const center = (r: Rect | {x: number; y: number}) => ('w' in r ? {x: r.x + r.w / 2, y: r.y + r.h / 2} : r);

/** Value of a keyed property at frame f: eases from the previous key's value over the key's `dur`. */
const track = <T,>(keys: {at: number; dur?: number}[], f: number, get: (k: number) => T, mix: (a: T, b: T, t: number) => T, dflt: number) => {
  let v = get(0);
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    if (f < k.at) break;
    const t = glide(clamp01((f - k.at) / Math.max(1, k.dur ?? dflt)));
    v = mix(v, get(i), t);
  }
  return v;
};

export type Device = 'laptop' | 'phone' | 'browser' | 'window' | 'none';

/** Laptop proportions, as fractions of the SCREEN width: bezels, lid radius, deck width and height. */
const LAPTOP = {side: 0.021, top: 0.03, bottom: 0.034, radius: 0.026, deck: 1.13, deckH: 0.032};

/** Device box (outer size) and where the screen sits inside it, for a screen of scrW x scrH px. */
const deviceBox = (kind: Device, scrW: number, scrH: number) => {
  if (kind === 'phone') {
    const bez = scrW * 0.035;
    return {boxW: scrW + bez * 2, boxH: scrH + bez * 2, padL: bez, padT: bez};
  }
  if (kind === 'laptop') {
    const lidW = scrW * (1 + LAPTOP.side * 2);
    const deckW = lidW * LAPTOP.deck;
    const lidH = scrH + scrW * (LAPTOP.top + LAPTOP.bottom);
    return {boxW: deckW, boxH: lidH + lidW * LAPTOP.deckH, padL: (deckW - lidW) / 2 + scrW * LAPTOP.side, padT: scrW * LAPTOP.top};
  }
  return {boxW: scrW, boxH: scrH, padL: 0, padT: 0};
};

/** Device chrome around the screen. */
const Chrome: React.FC<{kind: Device; w: number; h: number; url?: string; dark?: boolean; children: React.ReactNode}> = ({kind, w, h, url, dark = true, children}) => {
  const S = useShort();
  const k = S / 1080;
  if (kind === 'laptop') {
    const lidW = w * (1 + LAPTOP.side * 2);
    const lidH = h + w * (LAPTOP.top + LAPTOP.bottom);
    const deckW = lidW * LAPTOP.deck;
    const deckH = lidW * LAPTOP.deckH;
    const r = lidW * LAPTOP.radius;
    return (
      <div style={{position: 'relative', width: deckW, height: lidH + deckH}}>
        {/* contact shadow on the stage */}
        <div style={{position: 'absolute', left: '4%', right: '4%', top: lidH + deckH * 0.4, height: deckH * 1.6, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(0,0,0,0.32), rgba(0,0,0,0))'}} />
        {/* lid: black glass bezel with an aluminium rim and a camera dot */}
        <div style={{position: 'absolute', left: (deckW - lidW) / 2, top: 0, width: lidW, height: lidH, borderRadius: `${r}px ${r}px ${r * 0.25}px ${r * 0.25}px`, background: '#08080A', boxShadow: `inset 0 0 0 ${2.5 * k}px #3A3A40, inset 0 0 0 ${4 * k}px #0B0B0D`, padding: `${w * LAPTOP.top}px ${w * LAPTOP.side}px ${w * LAPTOP.bottom}px`, boxSizing: 'border-box'}}>
          <div style={{width: w, height: h, borderRadius: r * 0.22, overflow: 'hidden', position: 'relative', background: '#000'}}>{children}</div>
          <div style={{position: 'absolute', left: '50%', top: w * LAPTOP.top * 0.42, width: w * 0.0065, height: w * 0.0065, borderRadius: '50%', transform: 'translate(-50%,-50%)', background: '#1A1C22', boxShadow: `0 0 0 ${1.5 * k}px #121216`}} />
        </div>
        {/* deck: hinge line, aluminium edge, thumb notch, rounded front */}
        <div style={{position: 'absolute', left: 0, top: lidH, width: deckW, height: deckH, borderRadius: `${deckH * 0.25}px ${deckH * 0.25}px ${deckH * 1.4}px ${deckH * 1.4}px / ${deckH * 0.25}px ${deckH * 0.25}px ${deckH * 0.9}px ${deckH * 0.9}px`, background: 'linear-gradient(180deg, #5A5B61 0%, #3A3B40 22%, #26272B 60%, #141417 100%)', boxShadow: `inset 0 ${1.5 * k}px 0 rgba(255,255,255,0.28)`}}>
          <div style={{position: 'absolute', left: '50%', top: 0, width: deckW * 0.15, height: deckH * 0.38, transform: 'translateX(-50%)', borderRadius: `0 0 ${deckH * 0.3}px ${deckH * 0.3}px`, background: 'linear-gradient(180deg, #1C1C20, #2E2F34)'}} />
        </div>
      </div>
    );
  }
  if (kind === 'none') return <div style={{width: w, height: h, borderRadius: 18 * k, overflow: 'hidden', position: 'relative'}}>{children}</div>;
  if (kind === 'phone') {
    const bez = w * 0.035;
    return (
      <div style={{width: w + bez * 2, height: h + bez * 2, borderRadius: (w + bez * 2) * 0.16, background: '#0B0B0D', padding: bez, boxSizing: 'border-box', boxShadow: `0 0 0 ${2 * k}px #2A2A2E inset, 0 ${40 * k}px ${110 * k}px rgba(0,0,0,0.35)`, position: 'relative'}}>
        <div style={{width: w, height: h, borderRadius: w * 0.13, overflow: 'hidden', position: 'relative', background: '#000'}}>{children}</div>
        <div style={{position: 'absolute', left: '50%', top: bez + w * 0.03, width: w * 0.3, height: w * 0.085, borderRadius: 999, background: '#000', transform: 'translateX(-50%)'}} />
      </div>
    );
  }
  const bar = kind === 'browser' ? 46 * k : 34 * k;
  return (
    <div style={{width: w, borderRadius: 16 * k, overflow: 'hidden', boxShadow: `0 0 0 1px rgba(0,0,0,0.08), 0 ${30 * k}px ${90 * k}px rgba(0,0,0,0.3)`, background: dark ? '#1C1C1F' : '#F3F3F5'}}>
      <div style={{height: bar, display: 'flex', alignItems: 'center', gap: 8 * k, padding: `0 ${16 * k}px`}}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
          <div key={c} style={{width: 12 * k, height: 12 * k, borderRadius: '50%', background: c}} />
        ))}
        {kind === 'browser' ? (
          <div style={{marginLeft: 24 * k, flex: 1, maxWidth: '60%', height: 28 * k, borderRadius: 8 * k, background: dark ? '#2A2A2E' : '#E4E4E8', color: dark ? '#A1A1AA' : '#555', fontFamily: FONT.ui, fontSize: 15 * k, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{url}</div>
        ) : null}
      </div>
      <div style={{width: w, height: h - bar, overflow: 'hidden', position: 'relative'}}>{children}</div>
    </div>
  );
};

/**
 * The Screen Studio shot. Place it in a Scene (bg = the stage). `w` = device width in % of the frame
 * width (laptop in 9:16 ~94 %, in 16:9 ~70 %; phone in 9:16 ~68 %; browser in 16:9 ~78 %). Camera and
 * cursor keys use page CSS px. Default device: laptop (websites); phone only for mobile-app screens.
 */
export const ScreenStudio: React.FC<{
  capture: Capture;
  device?: Device;
  w?: number;
  x?: number;
  y?: number;
  url?: string;
  camera?: ScreenKey[];
  cursor?: CursorKey[];
  touch?: boolean;
  spotlight?: {rect: Rect; from: number; to: number; label?: string}[];
  tilt?: number;
}> = ({capture, device = 'laptop', w, x = 50, y = 50, url, camera = [{at: 0, scroll: 0}], cursor = [], touch, spotlight = [], tilt = 0}) => {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const S = useShort();
  const k = S / 1080;
  const sp = useSpeed();
  const dflt = 18 / sp;
  const viewH = capture.viewH ?? (device === 'phone' ? 844 : 900);
  const portrait = height > width;
  const wPct = w ?? (device === 'laptop' ? (portrait ? 94 : 70) : device === 'phone' ? (portrait ? 68 : 26) : portrait ? 92 : 78);
  const outerW = (wPct / 100) * width;
  // screen width: the laptop's w is its deck, so the screen is narrower
  const devW = device === 'laptop' ? outerW / (LAPTOP.deck * (1 + LAPTOP.side * 2)) : outerW;
  const s = devW / capture.pageW; // css px -> stage px
  const barH = device === 'browser' ? 46 * k : device === 'window' ? 34 * k : 0;
  const screenH = viewH * s + barH;
  const box = deviceBox(device, devW, screenH);
  // device top-left in stage px
  const dx = (x / 100) * width - box.boxW / 2;
  const dy = (y / 100) * height - box.boxH / 2;
  const sx0 = dx + box.padL;
  const sy0 = dy + box.padT + barH;

  const keys = camera.length ? camera : [{at: 0, scroll: 0}];
  // a key without `scroll` keeps the previous key's scroll
  const kScroll: number[] = [];
  keys.forEach((kf, i) => kScroll.push(kf.scroll ?? (i ? kScroll[i - 1] : 0)));
  const scrollAt = (fr: number) => track(keys, fr, (i) => kScroll[i], (a, b, t) => a + (b - a) * t, dflt);
  // camera target: centre point in stage px and zoom
  const camOf = (i: number) => {
    const kf = keys[i];
    const scroll = kScroll[i];
    if (!kf.focus && (kf.zoom ?? 1) === 1) return {cx: width / 2, cy: height / 2, z: 1};
    const r = kf.focus ?? {x: capture.pageW / 2 - 1, y: scroll + viewH / 2 - 1, w: 2, h: 2};
    const c = center(r);
    const fx = sx0 + c.x * s;
    const fy = sy0 + (c.y - scroll) * s;
    const fill = kf.fill ?? 0.78;
    const auto = kf.focus ? Math.min((width * fill) / (r.w * s), (height * fill) / (r.h * s)) : 1;
    return {cx: fx, cy: fy, z: Math.max(1, Math.min(4, kf.zoom ?? auto))};
  };
  const camAt = (fr: number) =>
    track(
      keys,
      fr,
      (i) => camOf(i),
      (a, b, t) => ({cx: a.cx + (b.cx - a.cx) * t, cy: a.cy + (b.cy - a.cy) * t, z: a.z * Math.pow(b.z / a.z, t)}),
      dflt,
    );
  const scroll = scrollAt(f);
  const cam = camAt(f);
  const prev = camAt(f - 1);
  const v = Math.hypot((cam.cx - prev.cx) * cam.z, (cam.cy - prev.cy) * cam.z) + Math.abs(scroll - scrollAt(f - 1)) * s * cam.z + Math.abs(Math.log(cam.z / prev.z)) * 900 * k;
  const mblur = Math.min(10 * k, v * 0.045);
  const tx = width / 2 - cam.cx * cam.z;
  const ty = height / 2 - cam.cy * cam.z;

  // cursor in screen-local px (stays on the screen while the page scrolls)
  const isTouch = touch ?? device === 'phone';
  const cur = cursor.length
    ? track(
        cursor,
        f,
        (i) => center(cursor[i].to),
        (a, b, t) => ({x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t}),
        14 / sp,
      )
    : null;
  const lastClick = [...cursor].reverse().find((c) => c.click && f >= c.at + (c.dur ?? 14 / sp));
  const clickAge = lastClick ? f - (lastClick.at + (lastClick.dur ?? 14 / sp)) : 99;
  const press = clickAge >= 0 && clickAge < 8 ? Math.sin((clickAge / 8) * Math.PI) : 0;
  const cursorVisible = cursor.length > 0 && f >= cursor[0].at - 4;

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{transformOrigin: '0 0', transform: `translate(${tx}px, ${ty}px) scale(${cam.z})`, filter: mblur > 0.4 ? `blur(${mblur.toFixed(2)}px)` : undefined}}>
        <div style={{position: 'absolute', left: dx, top: dy, transform: tilt ? `perspective(${2400 * k}px) rotateY(${tilt}deg)` : undefined}}>
          <Chrome kind={device} w={devW} h={device === 'phone' || device === 'laptop' ? viewH * s : screenH} url={url}>
            {capture.src ? (
              <Img src={resolve(capture.src)} style={{position: 'absolute', left: 0, top: -scroll * s, width: devW, height: capture.pageH * s, display: 'block'}} />
            ) : (
              // no capture yet: a neutral screen that says how to make one
              <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #16161A, #0B0B0D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontSize: 30 * s, color: '#6B6B74', textAlign: 'center', padding: 40 * s}}>
                node tools/capture_site.mjs https://your.site --devices desktop --frames auto --dpr 3
              </div>
            )}
            {spotlight.map((sl, i) => {
              const a = interpolate(f, [sl.from, sl.from + 8, sl.to - 6, sl.to], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
              if (a <= 0) return null;
              const pad = 10 * s;
              return (
                <div key={i} style={{position: 'absolute', left: sl.rect.x * s - pad, top: (sl.rect.y - scroll) * s - pad, width: sl.rect.w * s + pad * 2, height: sl.rect.h * s + pad * 2, borderRadius: 18 * s, boxShadow: `0 0 0 ${4000 * k}px rgba(0,0,0,${0.55 * a})`, outline: `${2 * s}px solid rgba(255,255,255,${0.7 * a})`}}>
                  {sl.label ? (
                    <div style={{position: 'absolute', left: 0, bottom: `calc(100% + ${10 * s}px)`, background: COLOR.lime, color: COLOR.ink, fontFamily: FONT.ui, fontWeight: 600, fontSize: 15 * s, padding: `${4 * s}px ${10 * s}px`, borderRadius: 999, opacity: a, whiteSpace: 'nowrap'}}>{sl.label}</div>
                  ) : null}
                </div>
              );
            })}
            {cursorVisible && cur ? (
              isTouch ? (
                <div style={{position: 'absolute', left: cur.x * s, top: (cur.y - scroll) * s, width: 46 * s, height: 46 * s, borderRadius: '50%', transform: `translate(-50%,-50%) scale(${1 - 0.25 * press})`, background: 'rgba(255,255,255,0.55)', border: `${2 * s}px solid rgba(255,255,255,0.9)`, boxShadow: '0 4px 18px rgba(0,0,0,0.35)'}}>
                  {clickAge < 14 ? <div style={{position: 'absolute', inset: -clickAge * 3 * s, borderRadius: '50%', border: `${2 * s}px solid rgba(255,255,255,${1 - clickAge / 14})`}} /> : null}
                </div>
              ) : (
                <div style={{position: 'absolute', left: cur.x * s, top: (cur.y - scroll) * s, transform: `scale(${(1.6 - 0.25 * press) * (device === 'phone' ? 1 : 1)})`, transformOrigin: '0 0'}}>
                  {clickAge < 14 ? <div style={{position: 'absolute', left: -clickAge * 2.2 * s, top: -clickAge * 2.2 * s, width: clickAge * 4.4 * s, height: clickAge * 4.4 * s, borderRadius: '50%', background: `rgba(10,132,255,${0.35 * (1 - clickAge / 14)})`}} /> : null}
                  <svg width={22 * s} height={30 * s} viewBox="0 0 22 30" style={{display: 'block', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))'}}>
                    <path d="M1 1 L1 23 L6.5 17.5 L10.5 27 L14 25.5 L10 16.5 L18 16.5 Z" fill="#000" stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
                  </svg>
                </div>
              )
            ) : null}
          </Chrome>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Look up a captured element by id or by (case-insensitive) text and return its rect. */
export const findEl = (els: {id: number; text: string; rect: Rect}[], q: number | string): Rect => {
  const e = typeof q === 'number' ? els.find((x) => x.id === q) : els.find((x) => x.text.toLowerCase().includes(q.toLowerCase()));
  if (!e) throw new Error(`capture element not found: ${q}`);
  return e.rect;
};
