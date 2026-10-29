#!/usr/bin/env python3
"""
Regenerate worldMapDots.js from the reference dot-map artwork.

    pip install pillow numpy scipy
    python scripts/generate-world-map-dots.py src/assets/images/map.jpg src/components/hero/worldMapDots.js

The artwork is already a dot matrix, so this finds each existing dot's centre
(local maxima of darkness, deduped by minimum spacing) rather than resampling
onto a fresh grid — resampling aliases against the original lattice and turns
crisp rows into moiré.
"""

import sys
import numpy as np
from PIL import Image
from scipy import ndimage
from scipy.spatial import cKDTree

UPSCALE = 4         # peaks are found on an upscaled copy: the artwork's dots are
                    # only ~2px wide on a ~5px pitch, too coarse to separate at 1:1
DARK_CUTOFF = 6     # ignore anything within this much of white
MIN_PEAK = 2.0      # smoothed darkness required to count as a dot
MIN_DARK = 25       # reject peaks sitting on near-white source pixels (JPEG ringing)
MIN_SPACING = 3.0   # source px; dots closer than this are the same dot
BLUR = 2.0          # gaussian sigma, in upscaled px
PEAK_WINDOW = 9     # local-maximum window, in upscaled px
VIEW_WIDTH = 2000.0 # output viewBox width
RADIUS = 4.1        # dot radius in output viewBox units; set so the rendered dots
                    # carry the same total ink as the artwork's own dots


def extract(path):
    img = Image.open(path).convert("L")
    source = np.asarray(img).astype(np.float32)
    big = np.asarray(
        img.resize((img.width * UPSCALE, img.height * UPSCALE), Image.LANCZOS)
    ).astype(np.float32)

    darkness = np.clip(255.0 - big, 0, None)
    darkness[darkness < DARK_CUTOFF] = 0

    smooth = ndimage.gaussian_filter(darkness, BLUR)
    peaks = (smooth >= ndimage.maximum_filter(smooth, size=PEAK_WINDOW)) & (smooth > MIN_PEAK)
    ys, xs = np.nonzero(peaks)

    # Strongest peak in each neighbourhood wins.
    order = np.argsort(-smooth[ys, xs])
    pts = np.stack([xs[order], ys[order]], axis=1).astype(float)
    tree = cKDTree(pts)
    taken = np.zeros(len(pts), dtype=bool)
    keep = []
    for i in range(len(pts)):
        if taken[i]:
            continue
        keep.append(i)
        taken[tree.query_ball_point(pts[i], MIN_SPACING * UPSCALE)] = True
    pts = pts[keep] / UPSCALE

    xi = np.clip(np.round(pts[:, 0]).astype(int), 0, source.shape[1] - 1)
    yi = np.clip(np.round(pts[:, 1]).astype(int), 0, source.shape[0] - 1)
    strength = ndimage.maximum_filter(255.0 - source, size=3)[yi, xi]
    return pts[strength >= MIN_DARK]


def main(src, dst):
    pts = extract(src)
    (xmin, ymin), (xmax, ymax) = pts.min(0), pts.max(0)

    pad = RADIUS + 1
    scale = (VIEW_WIDTH - 2 * pad) / (xmax - xmin)
    view_h = round((ymax - ymin) * scale + 2 * pad)

    out = np.empty_like(pts)
    out[:, 0] = np.round((pts[:, 0] - xmin) * scale + pad)
    out[:, 1] = np.round((pts[:, 1] - ymin) * scale + pad)
    out = out[np.lexsort((out[:, 0], out[:, 1]))].astype(int)  # row order, gzips better

    flat = ",".join(f"{x},{y}" for x, y in out)
    with open(dst, "w") as fh:
        fh.write(
            "// Generated from the reference dot-map artwork. Do not hand-edit.\n"
            f"// Flat [x, y, x, y, ...] pairs in a {int(VIEW_WIDTH)} x {view_h} viewBox.\n"
            f"export const DOT_VIEWBOX = {{ width: {int(VIEW_WIDTH)}, "
            f"height: {view_h}, radius: {RADIUS} }};\n\n"
            f"export const WORLD_MAP_DOTS = [{flat}];\n"
        )
    print(f"{len(out)} dots -> {dst}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])