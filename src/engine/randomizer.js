import seedrandom from 'seedrandom';

/**
 * Seeded pseudo-random number generator for controlled randomness.
 * Same seed → similar but organically varied output.
 */
export function createRng(seed) {
  const rng = seedrandom(String(seed));
  return {
    /** Random float between 0 and 1 */
    random: () => rng(),
    /** Random float between min and max */
    range: (min, max) => min + rng() * (max - min),
    /** Random integer between min and max (inclusive) */
    int: (min, max) => Math.floor(min + rng() * (max - min + 1)),
    /** Add jitter to a value: value ± amount */
    jitter: (value, amount) => value + (rng() - 0.5) * 2 * amount,
    /** Random rotation in degrees */
    rotation: (maxDeg = 15) => (rng() - 0.5) * 2 * maxDeg,
    /** Random scale factor around 1.0 */
    scale: (variance = 0.2) => 1 + (rng() - 0.5) * 2 * variance,
    /** Pick a random item from an array */
    pick: (arr) => arr[Math.floor(rng() * arr.length)],
    /** Gaussian-like distribution (Box-Muller approximation) */
    gaussian: (mean = 0, stddev = 1) => {
      const u1 = rng();
      const u2 = rng();
      const z = Math.sqrt(-2 * Math.log(u1 || 0.0001)) * Math.cos(2 * Math.PI * u2);
      return mean + z * stddev;
    },
  };
}

/**
 * Generate a jittered point along a path for hand-drawn feel
 */
export function jitterPoint(x, y, amount, rng) {
  return {
    x: rng.jitter(x, amount),
    y: rng.jitter(y, amount),
  };
}

/**
 * Generate control points for a wobbly bezier curve
 */
export function wobblyCurve(x1, y1, x2, y2, wobble, rng) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const cx1 = rng.jitter(mx, wobble);
  const cy1 = rng.jitter(my, wobble);
  return { cx1, cy1 };
}

/**
 * Convert degrees to radians
 */
export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Polar to cartesian conversion
 */
export function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = degToRad(angleDeg);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}
