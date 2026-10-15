#!/usr/bin/env python3
"""Find UI regions in an app screenshot so Screen Studio shots can zoom onto them and rebuilds can copy them.

  python3 ui_regions.py screen.png [--out public/capture] [--name app-board] [--min 0.4]

Writes next to --out:
  <name>.png               a copy of the screenshot (use it as ScreenStudio capture.src)
  <name>-annotated.png     the screenshot with numbered boxes: blue = cards / panels, orange = blocks
                           (text groups, buttons, images, rows). Look at it, pick the ids you need.
  <name>.json              {image: {w, h}, palette: [...], regions: [{id, kind, rect: {x, y, w, h}, color}]}
Rects are image pixels; pass capture={{src, pageW: image width, pageH: image height, dpr: 1, viewH: ...}}.
--min is the smallest block side in % of the image width (default 0.4).
Needs numpy, Pillow and scipy.
"""
import argparse
import json
import shutil
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

try:
    from scipy import ndimage
except ImportError:  # pragma: no cover
    raise SystemExit('ui_regions.py needs scipy: pip install scipy')


def boxes_from_mask(mask, min_side, min_area):
    lab, n = ndimage.label(mask)
    out = []
    for i, sl in enumerate(ndimage.find_objects(lab)):
        if sl is None:
            continue
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        w, h = x1 - x0, y1 - y0
        if w < min_side or h < min_side or w * h < min_area:
            continue
        out.append([x0, y0, w, h])
    return out


def iou(a, b):
    ax1, ay1, ax2, ay2 = a[0], a[1], a[0] + a[2], a[1] + a[3]
    bx1, by1, bx2, by2 = b[0], b[1], b[0] + b[2], b[1] + b[3]
    ix = max(0, min(ax2, bx2) - max(ax1, bx1))
    iy = max(0, min(ay2, by2) - max(ay1, by1))
    inter = ix * iy
    return inter / (a[2] * a[3] + b[2] * b[3] - inter + 1e-9)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('image')
    ap.add_argument('--out', default='public/capture')
    ap.add_argument('--name')
    ap.add_argument('--min', type=float, default=0.4)
    a = ap.parse_args()
    src = Path(a.image)
    name = a.name or src.stem.lower().replace(' ', '-')
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert('RGB')
    W, H = im.size
    scale = min(1.0, 1400 / W)
    small = im.resize((int(W * scale), int(H * scale)), Image.LANCZOS) if scale < 1 else im
    rgb = np.asarray(small).astype(np.float32)
    g = rgb @ np.array([0.299, 0.587, 0.114], np.float32)
    sw = small.size[0]
    min_side = max(4, int(sw * a.min / 100))

    # background = the most common quantised colour on the image border
    border = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
    q = (border // 8).astype(int)
    keys, counts = np.unique(q[:, 0] * 10000 + q[:, 1] * 100 + q[:, 2], return_counts=True)
    kb = keys[counts.argmax()]
    bg = np.array([kb // 10000, (kb // 100) % 100, kb % 100]) * 8 + 4

    # cards / panels: areas whose colour differs from the background, merged generously
    diff = np.abs(rgb - bg).sum(2)
    card_mask = ndimage.binary_closing(diff > 10, structure=np.ones((5, 5)), iterations=2)
    card_mask = ndimage.binary_fill_holes(card_mask)
    cards = boxes_from_mask(card_mask, min_side * 4, (sw * 0.06) ** 2)

    # blocks: edges (text, icons, buttons) merged into groups
    gy, gx = np.gradient(g)
    edges = np.hypot(gx, gy) > 18
    k = max(3, int(sw * 0.008))
    block_mask = ndimage.binary_dilation(edges, structure=np.ones((max(2, k // 2), k * 2)), iterations=1)
    block_mask = ndimage.binary_closing(block_mask, structure=np.ones((k, k)))
    blocks = boxes_from_mask(block_mask, min_side, min_side * min_side * 2)
    # drop blocks that are just a card again
    blocks = [b for b in blocks if not any(iou(b, c) > 0.85 for c in cards)]

    regions = []
    for kind, lst in (('card', sorted(cards, key=lambda b: (b[1], b[0]))), ('block', sorted(blocks, key=lambda b: (b[1], b[0])))):
        for b in lst:
            x, y, w, h = (int(round(v / scale)) for v in b)
            crop = np.asarray(im.crop((x, y, x + w, y + h)).resize((8, 8)))
            col = '#%02x%02x%02x' % tuple(int(c) for c in crop.reshape(-1, 3).mean(0))
            regions.append({'id': len(regions) + 1, 'kind': kind, 'rect': {'x': x, 'y': y, 'w': w, 'h': h}, 'color': col})

    pal_img = small.quantize(colors=8, method=Image.Quantize.MEDIANCUT)
    pal = pal_img.getpalette()[:24]
    cnt = np.bincount(np.asarray(pal_img).ravel(), minlength=8)
    palette = sorted(({'color': '#%02x%02x%02x' % tuple(pal[i * 3:i * 3 + 3]), 'share': round(float(cnt[i] / cnt.sum()), 3)} for i in range(8)), key=lambda p: -p['share'])

    ann = im.copy()
    d = ImageDraw.Draw(ann)
    try:
        font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', max(14, W // 60))
    except Exception:
        font = ImageFont.load_default()
    lw = max(2, W // 500)
    for r in regions:
        x, y, w, h = r['rect']['x'], r['rect']['y'], r['rect']['w'], r['rect']['h']
        c = (10, 132, 255) if r['kind'] == 'card' else (255, 159, 10)
        d.rectangle([x, y, x + w, y + h], outline=c, width=lw)
        t = str(r['id'])
        tb = d.textbbox((0, 0), t, font=font)
        d.rectangle([x, y - (tb[3] - tb[1]) - 6, x + (tb[2] - tb[0]) + 8, y], fill=c)
        d.text((x + 4, y - (tb[3] - tb[1]) - 4), t, fill=(0, 0, 0), font=font)
    shutil.copy(src, out / f'{name}.png') if src.suffix.lower() == '.png' else im.save(out / f'{name}.png')
    ann.save(out / f'{name}-annotated.png')
    json.dump({'image': {'w': W, 'h': H}, 'background': '#%02x%02x%02x' % tuple(int(c) for c in bg), 'palette': palette, 'regions': regions}, open(out / f'{name}.json', 'w'), indent=1)
    print(f'{W}x{H}: {sum(r["kind"] == "card" for r in regions)} cards, {sum(r["kind"] == "block" for r in regions)} blocks')
    print('palette:', ' '.join(p['color'] for p in palette[:6]))
    print(f'wrote {out / (name + ".json")}, {out / (name + "-annotated.png")}')


if __name__ == '__main__':
    main()
