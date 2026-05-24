/**
 * Engine property tests: fan angles and flower size
 * Feature: devs-bouquet-rebuild
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { getFanAngles, getFlowerSize } from '../../engine/bouquetEngine.js'

// ─── Unit tests ───────────────────────────────────────────────────────────────

describe('getFanAngles — unit tests', () => {
  it('returns [] for count=0', () => {
    expect(getFanAngles(0)).toEqual([])
  })

  it('returns [0] for count=1', () => {
    expect(getFanAngles(1)).toEqual([0])
  })

  it('returns 2 angles for count=2', () => {
    const angles = getFanAngles(2)
    expect(angles).toHaveLength(2)
  })

  it('returns symmetric angles for count=3', () => {
    const [a, b, c] = getFanAngles(3)
    expect(a).toBeCloseTo(-b, 9)
    expect(b).toBeCloseTo(0, 9)
    expect(c).toBeCloseTo(-a, 9)
  })
})

describe('getFlowerSize — unit tests', () => {
  it('returns a positive size for count=1', () => {
    expect(getFlowerSize(1)).toBeGreaterThan(0)
  })

  it('size decreases from count=1 to count=2', () => {
    expect(getFlowerSize(2)).toBeLessThanOrEqual(getFlowerSize(1))
  })

  it('size decreases from count=5 to count=6', () => {
    expect(getFlowerSize(6)).toBeLessThanOrEqual(getFlowerSize(5))
  })
})

// ─── Property 1: Fan angles are symmetric and bounded ─────────────────────────
// Feature: devs-bouquet-rebuild, Property 1: Fan angles are symmetric and bounded
// Validates: Requirements 3.5

describe('Property 1: Fan angles are symmetric and bounded', () => {
  it('holds for any count in [2, 12]', () => {
    fc.assert(
      fc.property(fc.integer({ min: 2, max: 12 }), (count) => {
        const angles = getFanAngles(count)

        // Correct length
        expect(angles).toHaveLength(count)

        // Arc ≤ 100°
        const arc = Math.max(...angles) - Math.min(...angles)
        expect(arc).toBeLessThanOrEqual(100 + 1e-9)

        // Symmetric: sum ≈ 0
        const sum = angles.reduce((a, b) => a + b, 0)
        expect(Math.abs(sum)).toBeLessThan(1e-9)
      }),
      { numRuns: 100 }
    )
  })
})

// ─── Property 2: Flower size is monotonically non-increasing ──────────────────
// Feature: devs-bouquet-rebuild, Property 2: Flower size is monotonically non-increasing
// Validates: Requirements 3.8

describe('Property 2: Flower size is monotonically non-increasing', () => {
  it('getFlowerSize(n) <= getFlowerSize(m) for any n > m in [1, 12]', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 11 }), (m) => {
        const n = m + 1
        expect(getFlowerSize(n)).toBeLessThanOrEqual(getFlowerSize(m))
      }),
      { numRuns: 100 }
    )
  })
})
