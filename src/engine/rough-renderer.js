import rough from 'roughjs';

/**
 * RoughRenderer — wrapper for Rough.js SVG rendering.
 * Provides a clean API for drawing hand-drawn SVG elements.
 */
export class RoughRenderer {
  constructor(svgElement, options = {}) {
    this.svg = svgElement;
    this.rc = rough.svg(svgElement);
    this.defaults = {
      roughness: options.roughness ?? 1.5,
      bowing: options.bowing ?? 1.2,
      strokeWidth: options.strokeWidth ?? 1.5,
      stroke: options.stroke ?? '#3a3a3a',
      fill: options.fill ?? 'none',
      fillStyle: options.fillStyle ?? 'hachure',
      fillWeight: options.fillWeight ?? 0.8,
      hachureAngle: options.hachureAngle ?? -41,
      hachureGap: options.hachureGap ?? 6,
      seed: options.seed ?? Math.floor(Math.random() * 2 ** 31),
      curveFitting: options.curveFitting ?? 0.95,
      curveStepCount: options.curveStepCount ?? 9,
    };
  }

  /** Merge options with defaults */
  _opts(overrides = {}) {
    return { ...this.defaults, ...overrides };
  }

  /** Draw a line */
  line(x1, y1, x2, y2, opts = {}) {
    const node = this.rc.line(x1, y1, x2, y2, this._opts(opts));
    this.svg.appendChild(node);
    return node;
  }

  /** Draw a rectangle */
  rectangle(x, y, w, h, opts = {}) {
    const node = this.rc.rectangle(x, y, w, h, this._opts(opts));
    this.svg.appendChild(node);
    return node;
  }

  /** Draw an ellipse */
  ellipse(cx, cy, w, h, opts = {}) {
    const node = this.rc.ellipse(cx, cy, w, h, this._opts(opts));
    this.svg.appendChild(node);
    return node;
  }

  /** Draw a circle */
  circle(cx, cy, diameter, opts = {}) {
    const node = this.rc.circle(cx, cy, diameter, this._opts(opts));
    this.svg.appendChild(node);
    return node;
  }

  /** Draw a path from SVG path string */
  path(d, opts = {}) {
    const node = this.rc.path(d, this._opts(opts));
    this.svg.appendChild(node);
    return node;
  }

  /** Draw an arc */
  arc(cx, cy, w, h, start, stop, closed = false, opts = {}) {
    const node = this.rc.arc(cx, cy, w, h, start, stop, closed, this._opts(opts));
    this.svg.appendChild(node);
    return node;
  }

  /** Draw a polygon from points array [[x,y], [x,y], ...] */
  polygon(vertices, opts = {}) {
    const node = this.rc.polygon(vertices, this._opts(opts));
    this.svg.appendChild(node);
    return node;
  }

  /** Draw a curve through points [[x,y], [x,y], ...] */
  curve(points, opts = {}) {
    const node = this.rc.curve(points, this._opts(opts));
    this.svg.appendChild(node);
    return node;
  }

  /** Clear all drawn elements from SVG */
  clear() {
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }
  }

  /** Update default options */
  setDefaults(opts) {
    Object.assign(this.defaults, opts);
  }
}

/**
 * Create a new RoughRenderer for the given SVG element.
 */
export function createRenderer(svgElement, options = {}) {
  return new RoughRenderer(svgElement, options);
}

/**
 * Generate rough.js node without appending (for React integration).
 * Returns the SVG element node.
 */
export function generateNode(svgElement, type, args, options = {}) {
  const rc = rough.svg(svgElement);
  const defaults = {
    roughness: 1.5,
    bowing: 1.2,
    strokeWidth: 1.5,
    stroke: '#3a3a3a',
    fillStyle: 'hachure',
    fillWeight: 0.8,
    hachureGap: 6,
    curveFitting: 0.95,
    ...options,
  };

  switch (type) {
    case 'line': return rc.line(...args, defaults);
    case 'rectangle': return rc.rectangle(...args, defaults);
    case 'ellipse': return rc.ellipse(...args, defaults);
    case 'circle': return rc.circle(...args, defaults);
    case 'path': return rc.path(...args, defaults);
    case 'arc': return rc.arc(...args, defaults);
    case 'polygon': return rc.polygon(...args, defaults);
    case 'curve': return rc.curve(...args, defaults);
    default: return null;
  }
}
