#!/usr/bin/env node
// Capture a website for Screen Studio-style shots and UI rebuilds.
//
//   node tools/capture_site.mjs https://example.com [--name site] [--out public/capture]
//        [--devices desktop,mobile] [--wait 1500] [--paths /,/pricing] [--frames auto|0,1840,3700] [--dpr 3]
//
// For every page and device it writes, into --out:
//   <name>-<page>-<device>-top.png        first screen (what a visitor sees)
//   <name>-<page>-<device>-full.png       the whole page
//   <name>-<page>-<device>-annotated.png  the whole page with numbered boxes on headings, buttons,
//                                         images, inputs and cards (look at it to pick zoom targets)
//   <name>.json                           every element (id, kind, text, rect in CSS px, styles),
//                                         page sizes, device scale, palette and fonts
//   with --frames: <name>-<page>-<device>-at<scroll>.png (+ -annotated.png)
//                                         the real viewport after scrolling to <scroll> CSS px. Use
//                                         these for laptop / browser shots: the full page is stitched
//                                         without scrolling, so on-scroll reveals and pinned sections
//                                         can be missing from it. `auto` = the top + one frame per
//                                         h1/h2 section. Frame elements have viewport rects.
// Rects are CSS pixels of the full page (or of the viewport for frames); ScreenStudio multiplies by dpr.
//
// Needs puppeteer-core in the project (`npm i -D puppeteer-core@25.12.0`) and a Chrome: it uses
// Remotion's chrome-headless-shell (`npx remotion browser ensure`), CHROME_PATH, or Google Chrome.
import fs from 'node:fs';
import path from 'node:path';
import {execSync} from 'node:child_process';

const args = process.argv.slice(2);
const url = args.find((a) => /^https?:\/\//.test(a));
if (!url) {
  console.error('usage: capture_site.mjs <url> [--name x] [--out public/capture] [--devices desktop,mobile] [--wait ms] [--paths /,/pricing] [--frames auto|0,1800] [--dpr 3]');
  process.exit(1);
}
const opt = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
const out = opt('out', 'public/capture');
const name = opt('name', new URL(url).hostname.replace(/^www\./, '').split('.')[0]);
const devices = opt('devices', 'desktop,mobile').split(',');
const wait = Number(opt('wait', '1500'));
const paths = opt('paths', new URL(url).pathname || '/').split(',');
const framesOpt = opt('frames', null);
const dprOpt = opt('dpr', null);

const DEVICES = {
  mobile: {width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true, ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'},
  tablet: {width: 834, height: 1194, deviceScaleFactor: 2, isMobile: true, hasTouch: true, ua: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'},
  desktop: {width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false, hasTouch: false, ua: null},
};

const findChrome = () => {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const walk = (dir, depth = 0) => {
    if (depth > 6 || !fs.existsSync(dir)) return null;
    for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
      const p = path.join(dir, e.name);
      if (e.isFile() && /^chrome-headless-shell(\.exe)?$/.test(e.name)) return p;
      if (e.isDirectory()) {
        const r = walk(p, depth + 1);
        if (r) return r;
      }
    }
    return null;
  };
  let p = walk(path.resolve('node_modules/.remotion'));
  if (!p) {
    try {
      execSync('npx remotion browser ensure', {stdio: 'ignore'});
      p = walk(path.resolve('node_modules/.remotion'));
    } catch {}
  }
  if (p) return p;
  for (const c of ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', 'C:/Program Files/Google/Chrome/Application/chrome.exe']) if (fs.existsSync(c)) return c;
  throw new Error('No Chrome found: run `npx remotion browser ensure` or set CHROME_PATH');
};

let puppeteer;
try {
  puppeteer = (await import('puppeteer-core')).default;
} catch {
  console.error('puppeteer-core is missing: npm i -D puppeteer-core@25.12.0');
  process.exit(1);
}

const collect = (viewportOnly) => {
  const sel = 'h1,h2,h3,h4,p,a,button,input,textarea,select,img,svg,video,canvas,code,pre,table,li,section,header,nav,footer,[role=button],[class*=card],[class*=Card],[class*=badge],[class*=pill],[class*=tag]';
  const kindOf = (el) => {
    const t = el.tagName.toLowerCase();
    const cls = (el.className && el.className.baseVal === undefined ? el.className : '') + '';
    if (/^h[1-4]$/.test(t)) return 'heading';
    if (t === 'button' || el.getAttribute('role') === 'button' || (t === 'a' && /btn|button|cta/i.test(cls))) return 'button';
    if (t === 'a') return 'link';
    if (t === 'input' || t === 'textarea' || t === 'select') return 'input';
    if (t === 'img' || t === 'svg' || t === 'video' || t === 'canvas') return 'media';
    if (t === 'code' || t === 'pre') return 'code';
    if (t === 'section' || t === 'header' || t === 'nav' || t === 'footer') return 'section';
    if (/card/i.test(cls)) return 'card';
    if (/badge|pill|tag/i.test(cls)) return 'badge';
    return 'text';
  };
  const els = [];
  const seen = new Set();
  for (const el of document.querySelectorAll(sel)) {
    const r = el.getBoundingClientRect();
    if (r.width < 6 || r.height < 6) continue;
    if (viewportOnly && (r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth)) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.05) continue;
    const oy = viewportOnly ? 0 : scrollY;
    const key = [Math.round(r.x), Math.round(r.y + oy), Math.round(r.width), Math.round(r.height)].join(',');
    if (seen.has(key)) continue;
    seen.add(key);
    const kind = kindOf(el);
    if (kind === 'media' && r.width * r.height < 900) continue;
    els.push({
      kind,
      tag: el.tagName.toLowerCase(),
      text: (el.innerText || el.getAttribute('alt') || el.getAttribute('aria-label') || el.value || '').trim().replace(/\s+/g, ' ').slice(0, 140),
      rect: {x: Math.round(r.x), y: Math.round(r.y + oy), w: Math.round(r.width), h: Math.round(r.height)},
      style: {color: cs.color, bg: cs.backgroundColor, font: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(), size: parseFloat(cs.fontSize), weight: cs.fontWeight, radius: cs.borderRadius},
      href: el.getAttribute('href') || undefined,
    });
  }
  return {page: {w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight}, title: document.title, description: document.querySelector('meta[name=description]')?.content || '', els};
};
const annotate = (boxes, fixed) => {
  const layer = document.createElement('div');
  layer.id = '__cap_layer';
  layer.style.cssText = `position:${fixed ? 'fixed' : 'absolute'};left:0;top:0;width:100%;pointer-events:none;z-index:2147483647`;
  const col = {heading: '#ff2d6f', button: '#00b36b', input: '#0a84ff', media: '#ff9f0a', card: '#bf5af2', badge: '#64d2ff', code: '#ffd60a'};
  for (const b of boxes) {
    const d = document.createElement('div');
    d.style.cssText = `position:absolute;left:${b.rect.x}px;top:${b.rect.y}px;width:${b.rect.w}px;height:${b.rect.h}px;outline:2px solid ${col[b.kind]};`;
    const l = document.createElement('div');
    l.textContent = b.id;
    l.style.cssText = `position:absolute;left:0;top:0;transform:translateY(-100%);background:${col[b.kind]};color:#000;font:700 11px/1.3 monospace;padding:0 3px`;
    d.appendChild(l);
    layer.appendChild(d);
  }
  document.body.appendChild(layer);
};
const useful = (els) => els.filter((e) => ['heading', 'button', 'input', 'media', 'card', 'badge', 'code'].includes(e.kind) && e.rect.w * e.rect.h > 400);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

fs.mkdirSync(out, {recursive: true});
const browser = await puppeteer.launch({executablePath: findChrome(), headless: true, args: ['--no-sandbox', '--hide-scrollbars', '--font-render-hinting=none']});
const result = {url, name, capturedAt: new Date().toISOString(), pages: {}, palette: [], fonts: []};
const colorArea = new Map();
const fontCount = new Map();

for (const pth of paths) {
  const pageUrl = new URL(pth, url).toString();
  const slug = pth === '/' ? 'home' : pth.replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '-');
  result.pages[slug] = {url: pageUrl, devices: {}};
  for (const dev of devices) {
    const d = DEVICES[dev];
    if (!d) continue;
    const page = await browser.newPage();
    const dpr = dprOpt ? Number(dprOpt) : d.deviceScaleFactor;
    await page.setViewport({width: d.width, height: d.height, deviceScaleFactor: dpr, isMobile: d.isMobile, hasTouch: d.hasTouch});
    if (d.ua) await page.setUserAgent(d.ua);
    await page.goto(pageUrl, {waitUntil: 'networkidle2', timeout: 60000}).catch(() => page.goto(pageUrl, {waitUntil: 'load', timeout: 60000}));
    // scroll through to trigger lazy content and on-scroll reveals, then back to the top
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, wait));
    const base = `${name}-${slug}-${dev}`;
    await page.screenshot({path: path.join(out, `${base}-top.png`)});
    await page.screenshot({path: path.join(out, `${base}-full.png`), fullPage: true});
    const data = await page.evaluate(collect, false);
    data.els.forEach((e, i) => (e.id = i + 1));
    // annotated full page: outline the useful kinds with their ids
    const pick = useful(data.els);
    await page.evaluate(annotate, pick, false);
    await page.screenshot({path: path.join(out, `${base}-annotated.png`), fullPage: true});
    await page.evaluate(() => document.getElementById('__cap_layer')?.remove());
    for (const e of data.els) {
      const a = e.rect.w * e.rect.h;
      if (e.style.bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(e.style.bg)) colorArea.set(e.style.bg, (colorArea.get(e.style.bg) || 0) + a);
      if (e.kind !== 'media' && e.text) colorArea.set(e.style.color, (colorArea.get(e.style.color) || 0) + a * 0.15);
      if (e.text) fontCount.set(e.style.font, (fontCount.get(e.style.font) || 0) + e.text.length);
    }
    // real-viewport frames: scroll past the target first so on-scroll reveals fire, then settle on it
    const frames = [];
    if (framesOpt) {
      const maxY = data.page.h - d.height;
      let ys = framesOpt === 'auto'
        ? [0, ...data.els.filter((e) => e.kind === 'heading' && /^h[12]$/.test(e.tag)).map((e) => Math.round(e.rect.y - d.height * 0.12))]
        : framesOpt.split(',').map(Number);
      ys = ys.map((y) => Math.max(0, Math.min(maxY, y))).sort((a, b) => a - b).filter((y, i, a) => i === 0 || y - a[i - 1] > d.height * 0.45);
      for (const y of ys) {
        await page.evaluate(async (y) => {
          window.scrollTo(0, y + innerHeight);
          await new Promise((r) => setTimeout(r, 300));
          window.scrollTo(0, y);
        }, y);
        await sleep(Math.max(900, wait / 2));
        const sy = await page.evaluate(() => Math.round(scrollY));
        const fb = `${base}-at${y}`;
        await page.screenshot({path: path.join(out, `${fb}.png`)});
        const fd = await page.evaluate(collect, true);
        fd.els.forEach((e, i) => (e.id = i + 1));
        const fp = useful(fd.els);
        await page.evaluate(annotate, fp, true);
        await page.screenshot({path: path.join(out, `${fb}-annotated.png`)});
        await page.evaluate(() => document.getElementById('__cap_layer')?.remove());
        frames.push({scroll: sy, file: `${fb}.png`, annotated: `${fb}-annotated.png`, elements: fd.els});
        console.log(`  frame @${sy}: ${fb}.png`);
        for (const e of fp.filter((e) => e.kind === 'heading' || e.kind === 'button').slice(0, 10)) console.log(`    #${e.id} ${e.kind.padEnd(7)} ${JSON.stringify(e.text.slice(0, 60))} @ ${e.rect.x},${e.rect.y} ${e.rect.w}x${e.rect.h}`);
      }
    }
    result.pages[slug].devices[dev] = {
      viewport: {w: d.width, h: d.height},
      dpr,
      frames,
      page: data.page,
      title: data.title,
      description: data.description,
      shots: {top: `${base}-top.png`, full: `${base}-full.png`, annotated: `${base}-annotated.png`},
      elements: data.els,
    };
    console.log(`${slug} / ${dev}: ${data.page.w}x${data.page.h} css px, ${data.els.length} elements -> ${base}-*.png`);
    for (const e of pick.filter((e) => e.kind === 'heading' || e.kind === 'button').slice(0, 14)) console.log(`  #${e.id} ${e.kind.padEnd(7)} ${JSON.stringify(e.text.slice(0, 60))} @ ${e.rect.x},${e.rect.y} ${e.rect.w}x${e.rect.h}`);
    await page.close();
  }
}
const hex = (c) => {
  const m = c.match(/\d+(\.\d+)?/g);
  if (!m) return c;
  return '#' + m.slice(0, 3).map((v) => Math.round(Number(v)).toString(16).padStart(2, '0')).join('');
};
result.palette = [...colorArea.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([c, a]) => ({color: hex(c), weight: Math.round(a)}));
result.fonts = [...fontCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([f, n]) => ({font: f, chars: n}));
fs.writeFileSync(path.join(out, `${name}.json`), JSON.stringify(result, null, 1));
console.log(`palette: ${result.palette.map((p) => p.color).join(' ')}`);
console.log(`fonts: ${result.fonts.map((f) => f.font).join(', ')}`);
console.log(`wrote ${path.join(out, `${name}.json`)}`);
await browser.close();
