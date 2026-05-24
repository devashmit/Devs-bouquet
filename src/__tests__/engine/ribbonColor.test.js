/**
 * Engine property tests: ribbon color
 * Feature: devs-bouquet-rebuild
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { getRibbonColor } from '../../engine/bouquetEngine.js'
import FLOWER_TYPES from '../../engine/flowers/index.jsx'

// Map dominantColor → a flower type key that has that color
const colorToFlowerType = {
  pink: 'romantic_pink_peony',
  warm: 'classic_red_rose',
  blue: 'textured_blue_hydrangea',
  white: 'delicate_white_lily',
}

// Expected ribbon fill colors per dominant color family
const expectedFills = {
  pink: '#f8d8e4',
  warm: '#f8ecc0',
  blue: '#dcd0f0',
  white: '#f0ece4',
}

function mostFrequent(arr) {
  const counts = {}
  for (const v of arr) counts[v] = (counts[v] ?? 0) + 1
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

// ─── Unit tests ───────────────────────────────────────────────────────────────

describe('getRibbonColor — unit tests', () => {
  it('returns default neutral for empty array', () => {
    const result = getRibbonColor([])
    expect(result).toEqual({ fill: '#f0ece4', stroke: '#b8a898' })
  })

  it('returns pink ribbon for all-pink flowers', () => {
    const flowers = [
      { type: 'romantic_pink_peony' },
      { type: 'romantic_pink_peony' },
    ]
    const result = getRibbonColor(flowers)
    expect(result.fill).toBe('#f8d8e4')
  })

  it('returns warm ribbon for all-warm flowers', () => {
    const flowers = [
      { type: 'classic_red_rose' },
      { type: 'vibrant_sunflower' },
    ]
    const result = getRibbonColor(flowers)
    expect(result.fill).toBe('#f8ecc0')
  })

  it('returns blue ribbon for all-blue flowers', () => {
    const flowers = [{ type: 'textured_blue_hydrangea' }]
    const result = getRibbonColor(flowers)
    expect(result.fill).toBe('#dcd0f0')
  })

  it('returns { fill, stroke } shape', () => {
    const result = getRibbonColor([{ type: 'cheerful_daisy' }])
    expect(result).toHaveProperty('fill')
    expect(result).toHaveProperty('stroke')
  })
})

// ─── Property 8: Ribbon color is consistent with dominant flower color ─────────
// Feature: devs-bouquet-rebuild, Property 8: Ribbon color is consistent with dominant flower color
// Validates: Requirements 3.7

describe('Property 8: Ribbon color is consistent with dominant flower color', () => {
  it('ribbon fill matches the most frequent dominantColor family', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom('pink', 'warm', 'blue', 'white'),
          { minLength: 1, maxLength: 12 }
        ),
        (dominantColors) => {
          const flowers = dominantColors.map((c) => ({
            type: colorToFlowerType[c],
          }))
          const ribbon = getRibbonColor(flowers)
          const dominant = mostFrequent(dominantColors)
          expect(ribbon.fill).toBe(expectedFills[dominant])
        }
      ),
      { numRuns: 100 }
    )
  })
})
