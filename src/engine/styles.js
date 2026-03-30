/**
 * Style Modes for DevsBouquet
 * 
 * Sketch (default): colored + rough strokes, hachure fill
 * Mono: black & white, cross-hatch fill  
 * Pastel: low saturation watercolor tones, solid fill
 */

export const STYLE_MODES = {
  sketch: {
    name: 'Sketch',
    description: 'Colored with rough strokes',
    roughness: 1.8,
    bowing: 1.5,
    strokeWidth: 1.5,
    fillStyle: 'hachure',
    fillWeight: 0.8,
    hachureGap: 5,
    colors: {
      rose: { stroke: '#c46070', fill: '#f2a7b0', petals: ['#f2a7b0', '#e8a0a0', '#f4c2c2', '#e88a9a'] },
      tulip: { stroke: '#c44040', fill: '#e06060', petals: ['#e06060', '#e87070', '#d05050'] },
      daisy: { stroke: '#8a7a40', fill: '#fff8f0', petals: ['#fff8f0', '#faf5ef'], center: '#f0c860' },
      lavender: { stroke: '#7060a0', fill: '#9b7db8', petals: ['#9b7db8', '#b090cc', '#8a6ca8'] },
      stem: { stroke: '#5a7d4e', fill: '#7a9e6e' },
      ribbon: { stroke: '#c46070', fill: '#f4c2c2' },
    },
  },
  mono: {
    name: 'Mono',
    description: 'Black & white sketch',
    roughness: 2.0,
    bowing: 1.8,
    strokeWidth: 1.8,
    fillStyle: 'cross-hatch',
    fillWeight: 0.6,
    hachureGap: 4,
    colors: {
      rose: { stroke: '#3a3a3a', fill: '#d0d0d0', petals: ['#d0d0d0', '#c0c0c0', '#e0e0e0'] },
      tulip: { stroke: '#3a3a3a', fill: '#c8c8c8', petals: ['#c8c8c8', '#d8d8d8', '#b8b8b8'] },
      daisy: { stroke: '#3a3a3a', fill: '#e8e8e8', petals: ['#e8e8e8', '#f0f0f0'], center: '#b0b0b0' },
      lavender: { stroke: '#3a3a3a', fill: '#c0c0c0', petals: ['#c0c0c0', '#b0b0b0', '#d0d0d0'] },
      stem: { stroke: '#4a4a4a', fill: '#8a8a8a' },
      ribbon: { stroke: '#3a3a3a', fill: '#d0d0d0' },
    },
  },
  pastel: {
    name: 'Pastel',
    description: 'Soft watercolor tones',
    roughness: 1.0,
    bowing: 0.8,
    strokeWidth: 1.0,
    fillStyle: 'solid',
    fillWeight: 1.0,
    hachureGap: 8,
    colors: {
      rose: { stroke: '#d4a0a0', fill: '#f8d8d8', petals: ['#f8d8d8', '#f0d0d0', '#fce0e0', '#f5cccc'] },
      tulip: { stroke: '#d0a0a0', fill: '#f5cccc', petals: ['#f5cccc', '#f0c0c0', '#f8d0d0'] },
      daisy: { stroke: '#c0b890', fill: '#fefaf0', petals: ['#fefaf0', '#fcf8ee'], center: '#f5e0a0' },
      lavender: { stroke: '#b0a0c8', fill: '#e0d8f0', petals: ['#e0d8f0', '#d8d0e8', '#e8e0f5'] },
      stem: { stroke: '#a0c0a0', fill: '#c8e0c8' },
      ribbon: { stroke: '#d4a0a0', fill: '#f8d8d8' },
    },
  },
};

/**
 * Get rough.js render options for a given style mode
 */
export function getStyleOptions(mode = 'sketch') {
  const style = STYLE_MODES[mode] || STYLE_MODES.sketch;
  return {
    roughness: style.roughness,
    bowing: style.bowing,
    strokeWidth: style.strokeWidth,
    fillStyle: style.fillStyle,
    fillWeight: style.fillWeight,
    hachureGap: style.hachureGap,
  };
}

/**
 * Get color palette for a flower type in the given style mode
 */
export function getFlowerColors(flowerType, mode = 'sketch') {
  const style = STYLE_MODES[mode] || STYLE_MODES.sketch;
  return style.colors[flowerType] || style.colors.rose;
}

/**
 * Get stem colors for a style mode
 */
export function getStemColors(mode = 'sketch') {
  const style = STYLE_MODES[mode] || STYLE_MODES.sketch;
  return style.colors.stem;
}

/**
 * Get ribbon colors for a style mode
 */
export function getRibbonColors(mode = 'sketch') {
  const style = STYLE_MODES[mode] || STYLE_MODES.sketch;
  return style.colors.ribbon;
}

export default STYLE_MODES;
