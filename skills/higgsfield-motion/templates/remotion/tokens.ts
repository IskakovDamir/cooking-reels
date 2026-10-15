// Measured style tokens. Sources: references/measurements.md (v1-v4 = the four reference promos).
// Sizes: % of frame height unless noted. Frames: at 30 fps.
import {inter, interTight, unbounded, geologica, playfair, mono} from './fonts';

export const FPS = 30;

export const COLOR = {
  /** page background, all light scenes (v2 #FBF9FC) */
  paper: '#FBF9FC',
  ink: '#0C0309',
  inkSoft: '#3B3B40',
  mute: '#8A8A93',
  line: '#E6E4EA',
  /** Higgsfield lime: AFTER tag, wipe line (v2 #D4FF1F) */
  lime: '#D4FF1F',
  limeGlow: '#ECFB66',
  limeSoft: '#F5F4D3',
  limeDeep: '#8DB51E',
  /** hot pink: stickers, BEFORE tag, giant slash (v2 #EE1174) */
  pink: '#EE1174',
  peach: '#F2B59B',
  /** Claude coral (spark icon, "Opus 5.5") */
  terracotta: '#D97757',
  sparkLight: '#EC9F8C',
  sky: '#D6E6F7',
  dark: '#0B0B0C',
  hl: '#7FB51E',
  ok: '#3DAA6B',
  alert: '#E8304A',
  choice: '#E8A99A',
  /** v4 offer palette */
  tagDark: '#1C1F19',
  tagLime: '#D9F906',
  pillPink: '#E71664',
  spend: '#F616A1',
  gain: '#D2F61F',
  hudBox: '#A9B750',
  hudLabel: '#D35786',
};

export const FONT = {
  /** UI, status lines, descriptions, end card (Inter / SF Pro Text-like) */
  ui: `${inter}, "SF Pro Text", -apple-system, sans-serif`,
  /** big uppercase claims and numbers (neo-grotesk bold) */
  display: `${interTight}, ${inter}, sans-serif`,
  /** heavy extended grotesk: stickers, section titles, slash lists, BEFORE/AFTER tags */
  sticker: `${unbounded}, ${interTight}, sans-serif`,
  quirky: `${geologica}, ${interTight}, sans-serif`,
  /** transitional serif for Claude collab lines ("for Claude Opus 5.5", "OPUS 5.5") */
  serif: `${playfair}, Georgia, serif`,
  mono: `${mono}, ui-monospace, monospace`,
};

export type Glow = {x: number; y: number; r: number; color: string; opacity?: number};
export type BgSpec = {base: string; glows: readonly Glow[]; dots?: boolean};

/** Background presets: glow centres x/y in % of frame, radius r in % of frame width. */
export const BG = {
  /** v2 lockup: lime glow left, pink right, peach corners, halftone dots over the glows */
  hf: {
    base: '#FBF9FC',
    dots: true,
    glows: [
      {x: 0, y: 75, r: 25, color: '#DEF760'},
      {x: 100, y: 38, r: 25, color: '#F38FBA'},
      {x: 0, y: 100, r: 9, color: '#E1B48F'},
      {x: 100, y: 0, r: 9, color: '#E7C291'},
    ],
  },
  /** v2 slash-list variant */
  hfList: {
    base: '#FBF9FC',
    dots: true,
    glows: [
      {x: 0, y: 63, r: 38, color: '#D9F950'},
      {x: 100, y: 49, r: 27, color: '#F28AB9'},
      {x: 0, y: 100, r: 9, color: '#ED818F'},
      {x: 100, y: 0, r: 9, color: '#E2DB81'},
    ],
  },
  peach: {
    base: '#F4E6DA',
    glows: [
      {x: 85, y: 20, r: 38, color: '#F3A889', opacity: 0.7},
      {x: 10, y: 95, r: 34, color: '#F6B79C', opacity: 0.6},
    ],
  },
  /** v3: blue corner glows (TR #D0E2F5 ~630 px, BL #D2E0EC ~700 px @1080) + faint dot grid everywhere */
  sky: {
    base: '#FBF9FC',
    glows: [
      {x: 100, y: 0, r: 33, color: '#D0E2F5'},
      {x: 0, y: 100, r: 36, color: '#D2E0EC'},
    ],
  },
  /** v4 offer title: lime glow left-middle, pink glow right with halftone, small pink BL / yellow TR */
  offer: {
    base: '#FAF7FB',
    dots: true,
    glows: [
      {x: 16, y: 65, r: 30, color: '#F4FA4B'},
      {x: 84, y: 44, r: 28, color: '#F982AC'},
      {x: 19, y: 86, r: 12, color: '#FA8293'},
      {x: 81, y: 23, r: 12, color: '#FAE96E'},
    ],
  },
  acid: {
    base: '#F6F6F2',
    glows: [
      {x: 5, y: 20, r: 40, color: '#D7F23A', opacity: 0.9},
      {x: 100, y: 80, r: 34, color: '#FF3D9A', opacity: 0.7},
    ],
  },
} satisfies Record<string, BgSpec>;

/** Thermal gradient map (v2 k-means LUT), 12 posterised levels, dark -> bright. */
export const THERMAL = {
  stops: ['#3B282A', '#3C2A2C', '#3D2B2F', '#3F2D31', '#463C42', '#51464C', '#841D17', '#B51A00', '#D94801', '#E86B01', '#F0920A', '#F6C668'] as readonly string[],
  /** v1 warm heat render: charcoal background, subject red -> orange -> amber */
  v1: ['#1A1A1C', '#401F1A', '#C4290A', '#E06300', '#E8A659'] as readonly string[],
  /** v4 depth/heat footage plate: near magenta -> orange -> lime -> cream (use with GradientMap) */
  v4: ['#E73562', '#DD8841', '#D0E81B', '#F9F9E8'] as readonly string[],
  /** peak gaussian sigma (px @1080) */
  peakPx: 9,
};

/** Default length (frames @30fps) and strength of every scene entry/exit effect. */
export const FX = {
  cut: {frames: 0},
  /** calibrated: renders measure rec90 = 12 f, shape .29/.63/.87, depth 2.2 dec vs reference 11.2 f, .30/.64/.80, 2.3 */
  blur: {frames: 36, px: 14, scale: 1.04, ease: 'expoOut' as const, outFrames: 7},
  /** v2 fade to paper: linear 8 f */
  fade: {frames: 8},
  whip: {frames: 6, px: 60, dist: 18},
  /** in: scale-down entry; out: v2 zoom-whip (expo-in scale 1 -> 2.9, roll -5 deg, directional blur to 77 px, 7 f) */
  zoom: {frames: 12, px: 30, scaleIn: 1.25, scaleOut: 2.9, outFrames: 7, outRot: -5, outDirPx: 77},
  /** v2: out = blur 0 -> 9 px + LUT 0 -> 1 over 9 f; in = LUT 1 -> 0 over ~11 f, blur tail 7 -> 0 px over 30 f */
  thermal: {frames: 30, outFrames: 9, mixFrames: 11, px: 7},
  glitch: {frames: 6},
  /** v2 panel dock: rises from the bottom, bezier(.08,.42,.14,1) over 20 f */
  rise: {frames: 20},
};

/** Text birth ramp (v2): new glyphs are born pale lime, pass hot pink -> crimson, settle to ink in 9 f, blur 6 -> 0. */
export const BIRTH = {
  hf: ['#D8E04A', '#D0476D', '#A1074D', '#730437', '#380217'] as readonly string[],
};
/**
 * Claude "thinking" ramp (v1): time-based, whole line at once: yellow -> orange -> magenta (deepest at
 * ~+10 f) -> plum -> settled grey over 27.5 f @30 (22 f @24), on top of a left-to-right feathered wipe.
 */
export const CLAUDE_RAMP = {
  colors: ['#DBDF2C', '#CA874C', '#A12C57', '#8E355A', '#654959', '#5C505A'] as readonly string[],
  frames: [0, 5, 10, 17.5, 22.5, 27.5] as readonly number[],
  /** per-line wipe 5-7 f @24 -> 7.5 f, feather ~200 px @1080, line stagger 4-5 f @24 -> 6 f */
  wipeFrames: 7.5,
  featherPx: 200,
  lineStagger: 6,
};
export const STREAM = {cps: 38, tail: 9, blurPx: 6, accent: BIRTH.hf};
export const BLUR_IN = {frames: 14, px: 24, y: 1.2, scale: 1.0};
/** v4 scramble-type: 25-36 resolved chars/s per line, head glyphs alternate lime / pink */
export const SCRAMBLE = {cps: 27, colors: ['#D2F719', '#F91489'] as readonly string[]};
/** v2 sticker flip-open: rotateX 90 -> 0 about the bottom edge, bezier(.97,.02,0,.95), 7 f, stagger 10 f */
export const STICKER = {frames: 7, stagger: 10, bezier: [0.97, 0.02, 0, 0.95] as const};
/** v2 section header */
export const HEADER = {heightPct: 17.4, titleFontPct: 8.1, titleX: 7.6, slashFrom: 55.5, slashFrames: 13, slashBezier: [0.84, 0, 0.19, 1] as const, descRight: 97.8, descFontPct: 2.2, descCharsPerFrame: 7.5};
/** v2 before/after wipe: 25.1 deg from vertical; in 15 f, hold 2 f at 50.9 %W, out 14.5 f */
export const WIPE = {angleDeg: 25.1, lineW: 12, inFrames: 15, holdFrames: 2, outFrames: 14.5, inBezier: [0.43, 0.37, 0.19, 0.98] as const, outBezier: [0.81, 0.02, 0.57, 0.63] as const, fast: {inFrames: 11, holdFrames: 2, outFrames: 10}};
/** v2 BEFORE/AFTER tag: skewX -25, box 79-94.9 %W x 86.6-91.9 %H, cap 3.2 %H, swap scramble 7 f */
export const TAG = {skew: -25, x: 79, y: 86.6, w: 15.9, h: 5.3, capPct: 3.2, swapFrames: 7};
/** End cards: v2 two lines cap 3.5 %H slide up 13.9 %H in 10 f; v4 one line cap 3.6 %H linear fade 6 f; v1 CTA over footage cap 3.5 %H static */
export const END = {capPct: 3.5, linePitchPct: 8.2, slidePct: 13.9, slideFrames: 10, slideBezier: [0.11, 0.11, 0.17, 0.9] as const, fadeFrames: 6, cps: 60};

/**
 * Upward-scroll choreography (v1, converted to 30 fps): blocks rise in from +170 px (@1080) closing 16.4 %
 * of the gap per frame (0.8/f @24), drift up ~1.6 px/f, exit accelerating x1.18/f (1.23 @24) with blur
 * to 4.5 px and opacity to 0.5 over the last 7.5 f. Entry blur 7.5 -> 0 and opacity 0.2 -> 1 over 12.5 f.
 */
export const FLOW = {risePx: 170, rRise: 0.836, driftPx: 1.6, kExit: 1.18, exitScalePx: 26.7, entryFrames: 12.5, entryBlur: 7.5, exitFrames: 7.5, exitBlur: 4.5};
/** UI pop (v1): scale 1 - r^f, r = 0.71/f @30 (0.65 @24), blur on the first 2 f, siblings 5 f apart (4 @24). */
export const POP = {r: 0.71, blurPx: 10, stagger: 5};
/** v3 springs: mascots (20 % overshoot, peak +3 f), input pill (5 % overshoot, peak +8 f), partner logo (13 %) */
export const SPRINGS = {
  pop: {mass: 1, stiffness: 1200, damping: 32},
  pill: {mass: 1, stiffness: 260, damping: 22},
  logo: {mass: 1, stiffness: 1400, damping: 41},
};

export const UI = {
  /** v1 Claude status: spark at 10.3 %W, text at 17.2 %W, body cap 4.5 %H (#595459), bold headline cap 7.8 %H (#09070A) */
  claudeTextX: 17.2,
  claudeSparkX: 10.3,
  claudeBodyCap: 4.5,
  /** measured 7.8 with a narrower SF-like face; 7.2 keeps the same line width in Inter */
  claudeHeadCap: 7.2,
  claudeBody: '#595459',
  claudeHead: '#09070A',
  /** v3 agent status block: header cap 2.8, title regular 5.0 / bold 4.3, sub & bullets 3.2 (%H), text at 19.6 %W */
  agentTextX: 19.6,
  agentHeaderCap: 2.8,
  agentTitleCap: 5.0,
  agentTitleBoldCap: 4.3,
  agentSubCap: 3.2,
  agentGreen: '#197E69',
  agentSub: '#5D5A61',
  /** v1 prompt typing 50 cps, no cursor; v3 pill typing 60-75 cps with a cyan head */
  claudeTypeCps: 50,
  pillTypeCps: 66,
  pillHead: '#1BA7E7',
  /** v1 composer: radius 75 px @1080, prompt cap 4.9 %H, send #D97C60 radius 33 % */
  composerRadius: 75,
  composerCap: 4.9,
  send: '#D97C60',
  sendPressed: '#FAEDD2',
  sendHalo: '#FBAF94',
  yesPressed: '#D67255',
  hotPink: '#E8286A',
  claudeSpark: '#D1795F',
  hfIconTop: '#C6F959',
  hfIconBottom: '#BCF927',
  /** v1 detection verdict colours */
  detect: {warn: '#F7DA38', bad: '#F52F4A', good: '#ADD05C', goodFill: '#EAF1DC'},
  silhouette: '#FD2283',
  chip: '#EBE8EC',
  docCard: '#F0F3F6',
};
export const MEDIA = {footagePush: 0.02, cardRadius: 63, wipeFrames: 16};

/** Reels / Shorts / TikTok safe area for 1080x1920: UI covers ~220 px top, ~380 px bottom, ~60 px sides. */
export const SAFE = {top: 11.5, bottom: 19.8, side: 5.6};

// ---------------------------------------------------------------------------------------------
// Themes. Pass one to <Timeline theme={...}>: it resets every token to the measured defaults and
// applies the theme before any scene renders, so each composition gets its own palette (examples
// in the same Studio keep theirs). Read COLOR inside components, never at module level.
// ---------------------------------------------------------------------------------------------

export type Theme = {
  /** [replaces lime, replaces pink]: retints both accent families everywhere tokens carry them
   *  (COLOR, BG glows, scramble head, birth ramp / stream tail) */
  accents?: readonly [string, string];
  /** any COLOR overrides, applied after the accents */
  colors?: Partial<typeof COLOR>;
  fonts?: Partial<typeof FONT>;
};

const hex2rgb = (h: string) => {
  const n = parseInt(h.replace('#', '').slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
/** Mix two #rrggbb colours: t = 0 -> a, 1 -> b. */
export const mixHex = (a: string, b: string, t: number) => {
  const x = hex2rgb(a);
  const y = hex2rgb(b);
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
const hueOf = (h: string) => {
  const [r, g, b] = hex2rgb(h).map((v) => v / 255);
  const mx = Math.max(r, g, b);
  const d = mx - Math.min(r, g, b);
  if (d < 0.08) return -1;
  const hh = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (hh * 60 + 360) % 360;
};

const DEFAULTS = {
  color: {...COLOR},
  font: {...FONT},
  glows: Object.fromEntries(Object.entries(BG).map(([k, v]) => [k, v.glows.map((g) => g.color)])) as Record<string, string[]>,
  scramble: [...SCRAMBLE.colors],
  birth: [...BIRTH.hf],
};
let current = '';

/** Reset all tokens to the measured defaults, then apply `theme` (no-op when it is already applied). */
export const setTheme = (theme?: Theme) => {
  const key = theme ? JSON.stringify(theme) : '';
  if (key === current) return;
  current = key;
  Object.assign(COLOR, DEFAULTS.color);
  Object.assign(FONT, DEFAULTS.font);
  for (const [k, v] of Object.entries(BG)) v.glows.forEach((g, i) => (g.color = DEFAULTS.glows[k][i]));
  (SCRAMBLE.colors as string[]).splice(0, Infinity, ...DEFAULTS.scramble);
  (BIRTH.hf as string[]).splice(0, Infinity, ...DEFAULTS.birth);
  if (!theme) return;
  if (theme.accents) {
    const [a, b] = theme.accents;
    Object.assign(COLOR, {
      lime: a, limeGlow: mixHex(a, '#FFFFFF', 0.35), limeSoft: mixHex(a, '#FFFFFF', 0.8), limeDeep: mixHex(a, '#000000', 0.3), hl: mixHex(a, '#000000', 0.3), tagLime: a, gain: a,
      pink: b, pillPink: b, spend: b,
    });
    // glows: yellow-green family -> a, pink/rose family -> b (pastel, like the originals)
    for (const v of Object.values(BG))
      v.glows.forEach((g) => {
        const h = hueOf(g.color);
        if (h >= 45 && h <= 110) g.color = mixHex(a, '#FFFFFF', 0.1);
        else if (h >= 290 || (h >= 0 && h < 8)) g.color = mixHex(b, '#FFFFFF', 0.3);
      });
    (SCRAMBLE.colors as string[]).splice(0, Infinity, a, b);
    (BIRTH.hf as string[]).splice(0, Infinity, mixHex(a, '#FFFFFF', 0.1), b, mixHex(b, '#000000', 0.3), mixHex(b, '#000000', 0.55), mixHex(b, '#000000', 0.8));
  }
  if (theme.colors) Object.assign(COLOR, theme.colors);
  if (theme.fonts) Object.assign(FONT, theme.fonts);
};
