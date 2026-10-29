import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { GLOBE_LAND_POINTS } from "./globeLandPoints";

// Sphere radius in world units.
const RADIUS = 1;

// Tilts the sphere so the north pole points up and away from the camera —
// this is what puts high-latitude land (Canada, Europe, Russia) up near the
// curved/receding edge, and lets the more equatorial band (Africa, South
// America) sit low and flat-on, facing the camera. Matches the reference's
// "flat near the bottom, arcing away at the top" dome look.
const TILT_X = -0.95;

// Pushes the sphere down so the near band sits low in frame, leaving the
// dome's curved edge visible near the top instead of showing a full globe.
const DROP_Y = -0.5;

function latLonToVector3(lat, lon, radius) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

const LAND_POSITIONS = new Float32Array(GLOBE_LAND_POINTS.length * 3);
GLOBE_LAND_POINTS.forEach(([lat, lon], i) => {
  const [x, y, z] = latLonToVector3(lat, lon, RADIUS);
  LAND_POSITIONS[i * 3] = x;
  LAND_POSITIONS[i * 3 + 1] = y;
  LAND_POSITIONS[i * 3 + 2] = z;
});

function LandDots() {
  return (
    <group position={[0, DROP_Y, 0]} rotation={[TILT_X, 0, 0]}>
      {/* Depth-only occluder: hides dots on the far side of the sphere so
          the dome doesn't show land "through" itself. */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 48, 32]} />
        <meshBasicMaterial colorWrite={false} depthWrite />
      </mesh>
      <Points positions={LAND_POSITIONS} stride={3}>
        <PointMaterial
          transparent
          color="#0d357e"
          size={0.045}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

/**
 * Code-rendered dot-matrix globe (react-three-fiber) that replaces the old
 * flat globe PNG — a static dome for now (see TILT_X / DROP_Y above to
 * adjust framing). Land dots are pre-computed in globeLandPoints.js — see
 * scripts/generate-globe-points.mjs to regenerate at a different density.
 */
const Globe = ({ className }) => {
  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 2.6], fov: 42 }}
    >
      <LandDots />
    </Canvas>
  );
};

export default Globe;
