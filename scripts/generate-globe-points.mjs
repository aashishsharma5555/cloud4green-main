// Regenerates src/components/hero/globeLandPoints.js — the land-only dot
// coordinates used by the Hero globe (Globe.jsx).
//
// Approach: sample an evenly-distributed set of points over the whole sphere
// (Fibonacci sphere), then keep only the ones that land on a continent by
// running a point-in-polygon test against a world land-boundary GeoJSON.
//
// Run with: node scripts/generate-globe-points.mjs

import { writeFileSync } from "node:fs";

const GEOJSON_URL =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";
const POINT_COUNT = 24000;
const OUT_FILE = new URL(
  "../src/components/hero/globeLandPoints.js",
  import.meta.url
);

const res = await fetch(GEOJSON_URL);
if (!res.ok) throw new Error(`Failed to fetch world geojson: ${res.status}`);
const geo = await res.json();

// Ray-casting point-in-polygon across all rings of all polygons (XOR
// crossings) — correctly handles holes as long as polygons don't overlap.
function isLand(lon, lat, geometry) {
  const polygons =
    geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;

  let inside = false;
  for (const rings of polygons) {
    for (const ring of rings) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i];
        const [xj, yj] = ring[j];
        const intersect =
          yi > lat !== yj > lat &&
          lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
    }
  }
  return inside;
}

function isLandAnywhere(lon, lat) {
  for (const feature of geo.features) {
    if (isLand(lon, lat, feature.geometry)) return true;
  }
  return false;
}

const points = [];
const goldenAngle = Math.PI * (3 - Math.sqrt(5));

for (let i = 0; i < POINT_COUNT; i++) {
  const y = 1 - (i / (POINT_COUNT - 1)) * 2; // -1..1
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = goldenAngle * i;

  const x = Math.cos(theta) * radiusAtY;
  const z = Math.sin(theta) * radiusAtY;

  const lat = (Math.asin(y) * 180) / Math.PI;
  const lon = (Math.atan2(z, x) * 180) / Math.PI;

  if (isLandAnywhere(lon, lat)) {
    points.push([Number(lat.toFixed(3)), Number(lon.toFixed(3))]);
  }
}

console.log(`Candidates: ${POINT_COUNT}, land points: ${points.length}`);

const out = `// Auto-generated land dot coordinates for the Hero globe.
// Regenerate with: node scripts/generate-globe-points.mjs
// Each entry is [latitudeDeg, longitudeDeg].
export const GLOBE_LAND_POINTS = ${JSON.stringify(points)};
`;

writeFileSync(OUT_FILE, out);
console.log(`Wrote ${OUT_FILE.pathname}`);
