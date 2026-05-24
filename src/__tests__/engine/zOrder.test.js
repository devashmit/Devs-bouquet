/**
 * Engine property tests: z-order sort
 * Feature: devs-bouquet-rebuild
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { zOrderSort } from '../../engine/bouquetEngine.js'
import FLOWER_TYPES from '../../engine/flowers/index.jsx'

const flowerKeys = Object.keys(FLOWER_TYPES)

// ─── Unit tests ───────────────────────────────────────────────────────────────

describe('zOrderSort — unit tests', () => {
  it('returns empty array for empty input', () => {
    expect(zOrderSort([])).toEqual([])
  })

  it('returns single item with originalIndex=0', () => {
    const result = zOrderSort([{ type: 'classic_red_rose' }])
    expect(result).toHaveLength(1)
    expect(result[0].originalIndex).toBe(0)
  })

  it('preserves all items', () => {
    const flowers = [
      { type: 'classic_red_rose' },
      { type: 'cheerful_daisy' },
      { type: 'vibrant_sunflower' },
    ]
    const result = zOrderSort(flowers)
    expect(result).toHaveLength(3)
    const indices = result.map((f) => f.originalIndex).sort((a, b) => a - b)
    expect(indices).toEqual([0, 1, 2])
  })

  it('center flower is last for 3 flowers', () => {
    const flowers = [
      { type: 'classic_red_rose' },
      { type: 'cheerful_daisy' },
      { type: 'vibrant_sunflower' },
    ]
    const result = zOrderSort(flowers)
    // Center index = 1 (middle of 0,1,2)
    expect(result[result.length - 1].originalIndex).toBe(1)
  })
})

// ─── Property 3: Center flowers have higher z-order than outer flowers ─────────
// Feature: devs-bouquet-rebuild, Property 3: Center flowers have higher z-order than outer flowers
// Validates: Requirements 3.9

describe('Property 3: Center flowers have higher z-order than outer flowers', () => {
  it('holds for any flowers array of length >= 2', () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...flowerKeys), { minLength: 2, maxLength: 12 }),
        (types) => {
          const flowers = types.map((t) => ({ type: t }))
          const sorted = zOrderSort(flowers)

          // The flower closest to the center index should appear last (highest z)
          const centerIdx = (flowers.length - 1) / 2
          const lastItem = sorted[sorted.length - 1]
          const distLast = Math.abs(lastItem.originalIndex - centerIdx)

          // Every other item should be at least as far from center as the last item
          for (let i = 0; i < sorted.length - 1; i++) {
            const distI = Math.abs(sorted[i].originalIndex - centerIdx)
            expect(distI).toBeGreaterThanOrEqual(distLast - 1e-9)
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})
