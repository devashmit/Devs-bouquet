# Implementation Plan: DevsBouquet Rebuild

## Overview

Replace the existing mixed SVG/rough.js rendering engine with a clean image-based composition engine, rebuild the FlowerPicker and BouquetCanvas components to match the Parisian boutique aesthetic, wire everything together in CreatePage, and apply the visual design system consistently across all remaining pages. Firebase integration, routing, and auth are retained as-is.

## Tasks

- [ ] 1. Install testing dependencies and configure Vitest
  - Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `fast-check` as dev dependencies
  - Add a `vitest.config.js` (or extend `vite.config.js`) with jsdom environment and `@testing-library/jest-dom` setup
  - Add a `test` script to `package.json` (`vitest --run`)
  - Create `src/__tests__/` directory structure: `engine/`, `components/`, `pages/`, `firebase/`
  - _Requirements: Testing infrastructure for all subsequent test tasks_

- [ ] 2. Rebuild the FLOWER_TYPES catalog and engine pure functions
  - [ ] 2.1 Trim `src/engine/flowers/index.jsx` to exactly the six real PNG assets
    - Remove the four reuse-alias entries (`soft_pink_tulip`, `purple_lavender`, `yellow_mimosa`, `babys_breath`)
    - Add `dominantColor` field (`'pink' | 'warm' | 'blue' | 'white'`) to each of the six entries
    - Export named `FLOWER_TYPES` and default export
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ]* 2.2 Write property test for FlowerCard renders required fields (Property 4)
    - **Property 4: Flower card renders required fields for any catalog entry**
    - **Validates: Requirements 2.2, 2.3**
    - File: `src/__tests__/components/FlowerPicker.test.jsx`

  - [ ] 2.3 Extract `getFanAngles`, `getFlowerSize`, `getRibbonColor`, and `zOrderSort` into `src/engine/bouquetEngine.js`
    - Move the four pure functions out of `BouquetCanvas.jsx` into a dedicated module
    - `zOrderSort(flowers)` returns a new array sorted so outer flowers come first (lower z), center flowers last (higher z), preserving `originalIndex` on each item
    - Export all four functions as named exports
    - _Requirements: 3.3, 3.4, 3.5, 3.7, 3.8, 3.9_

  - [ ]* 2.4 Write property tests for fan angles (Property 1)
    - **Property 1: Fan angles are symmetric and bounded**
    - **Validates: Requirements 3.5**
    - File: `src/__tests__/engine/fanAngles.test.js`

  - [ ]* 2.5 Write property test for flower size monotonicity (Property 2)
    - **Property 2: Flower size is monotonically non-increasing**
    - **Validates: Requirements 3.8**
    - File: `src/__tests__/engine/fanAngles.test.js`

  - [ ]* 2.6 Write property test for z-order sort (Property 3)
    - **Property 3: Center flowers have higher z-order than outer flowers**
    - **Validates: Requirements 3.9**
    - File: `src/__tests__/engine/zOrder.test.js`

  - [ ]* 2.7 Write property test for ribbon color (Property 8)
    - **Property 8: Ribbon color is consistent with dominant flower color**
    - **Validates: Requirements 3.7**
    - File: `src/__tests__/engine/ribbonColor.test.js`

- [ ] 3. Checkpoint — Ensure engine unit and property tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Rebuild BouquetCanvas with the image-based composition engine
  - [ ] 4.1 Rewrite `src/components/BouquetCanvas.jsx` to use `bouquetEngine.js`
    - Import `getFanAngles`, `getFlowerSize`, `getRibbonColor`, `zOrderSort` from `src/engine/bouquetEngine.js`
    - Render `<svg viewBox="0 0 480 580">` with warm off-white `<rect>` background (`#faf8f3`)
    - Render stem bundle lines below TIE_Y using `<line>` elements converging toward canvas bottom
    - Render flower `<image>` elements: bottom-center at TIE_X/TIE_Y, each wrapped in `<g transform="rotate(angle, TIE_X, TIE_Y)">`; use `mixBlendMode: 'darken'`
    - Render ribbon bow `<path>` group at TIE_X/TIE_Y using `getRibbonColor` output
    - Return `null` when `flowers` is empty (AIBouquetViewer handles the placeholder)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11_

  - [ ]* 4.2 Write unit tests for BouquetCanvas rendering
    - Test: renders `null` when `flowers=[]`
    - Test: renders exactly one `<image>` at 0° rotation for a single flower
    - Test: renders correct number of `<image>` elements for multi-flower arrays
    - File: `src/__tests__/components/BouquetCanvas.test.jsx`
    - _Requirements: 3.1, 3.2_

- [ ] 5. Rebuild FlowerPicker with botanical card grid and rose-gold selected state
  - [ ] 5.1 Rewrite `src/components/FlowerPicker.jsx`
    - Build catalog from the trimmed `FLOWER_TYPES` (exactly 6 entries)
    - Render a 2-column CSS grid of `motion.button` cards
    - Each card: `<img>` with `/assets/flowers/` src, flower name in serif font, poetic tagline in italic
    - Count badge: shown when count ≥ 1, displays the integer count; use `motion.div` with spring animation
    - Rose-gold selected state: apply `.selected` class when flower type is in `selectedFlowers`; CSS border glow `0 0 0 2px #c9956c, 0 4px 12px rgba(201,149,108,0.25)`
    - Ignore clicks when `selectedFlowers.length >= 12`
    - Framer Motion `whileHover={{ y: -4, scale: 1.03 }}` lift on each card
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10_

  - [ ] 5.2 Update `src/components/FlowerPicker.css`
    - Add `.selected` rule: `border-color: #c9956c; box-shadow: 0 0 0 2px #c9956c, 0 4px 12px rgba(201,149,108,0.25)`
    - Add `.picker-badge` rule: absolute position top-right, rose-gold background, white text, circular
    - Add `.picker-name` serif font rule using `var(--font-heading)`
    - Add `.picker-poetic` italic rule
    - _Requirements: 2.2, 2.7_

  - [ ]* 5.3 Write property test for clicking a card adds exactly one instance (Property 5)
    - **Property 5: Clicking a card always adds exactly one instance**
    - **Validates: Requirements 2.4, 2.6**
    - File: `src/__tests__/components/FlowerPicker.test.jsx`

  - [ ]* 5.4 Write property test for selection count never exceeds 12 (Property 6)
    - **Property 6: Selection count never exceeds 12**
    - **Validates: Requirements 2.8, 2.9**
    - File: `src/__tests__/components/FlowerPicker.test.jsx`

  - [ ]* 5.5 Write property test for count badge reflects actual count (Property 7)
    - **Property 7: Count badge reflects actual selection count**
    - **Validates: Requirements 2.5**
    - File: `src/__tests__/components/FlowerPicker.test.jsx`

- [ ] 6. Checkpoint — Ensure FlowerPicker and BouquetCanvas tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Update CreatePage to wire FlowerPicker and BouquetCanvas together
  - [ ] 7.1 Update `src/pages/CreatePage.jsx` form and layout
    - Pre-populate `from` field with `user?.displayName` on mount and when user changes
    - Show live message preview card beneath the bouquet when `to`, `message`, and `from` are all non-empty and `flowers.length > 0`
    - Disable "Send Bouquet" button and show "Add a flower first" text when `flowers.length < 1`
    - Show loading state text on "Send Bouquet" button while `saving === true`
    - Wrap `createBouquet` call in try/catch; on error display an inline error message (not `alert()`), do not navigate
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.1, 5.3, 5.4, 5.5_

  - [ ] 7.2 Update `src/pages/CreatePage.css` for boutique aesthetic
    - Ensure `.create-layout` uses `grid-template-columns: 38% 62%` with `var(--space-xl)` gap
    - Style `.preview-message` card with cream background, serif font for message text, soft shadow
    - Style form inputs using `var(--input-field)` tokens from `index.css`
    - _Requirements: 1.1, 1.4, 4.7_

- [ ] 8. Update the visual design system in `src/index.css`
  - [ ] 8.1 Add missing CSS custom properties for rose-gold and boutique tokens
    - Add `--rose-gold: #c9956c`, `--rose-gold-light: #e8c9a8`, `--rose-gold-glow: 0 0 0 2px #c9956c, 0 4px 12px rgba(201,149,108,0.25)`
    - Add `--cream-base: #faf8f3` (the canvas/preview background)
    - Verify `--font-heading` is `'Playfair Display'` and `--font-body` is `'DM Sans'` (already present; confirm Google Fonts import in `index.html`)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ] 8.2 Verify Google Fonts import in `index.html`
    - Confirm `<link>` tags for Playfair Display and DM Sans are present in `index.html`; add them if missing
    - _Requirements: 1.2, 1.3_

- [ ] 9. Update remaining pages to use the design system
  - [ ] 9.1 Update `src/pages/ViewPage.jsx` and `ViewPage.css`
    - Ensure bouquet entrance uses Framer Motion fade-in + scale (already present; verify `bouquetContainerVariants` produces scale animation)
    - Ensure "not found" error state renders with a link to `/create`
    - Keep all existing Firebase logic unchanged
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

  - [ ] 9.2 Update `src/pages/GardenPage.jsx` and `GardenPage.css`
    - Ensure occasion filter chips use `.filter-chip` and `.filter-chip.active` styles consistent with design tokens
    - Ensure empty state (both empty dataset and no-match filter) renders `EmptyState` with CTA
    - Keep all existing Firebase and filter logic unchanged
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

  - [ ] 9.3 Update `src/pages/DashboardPage.jsx` and `DashboardPage.css`
    - Extract `computeStats(bouquets)` as a pure function: `{ total, viewed, reactions }`
    - Ensure empty state renders `EmptyState` and no bouquet list items when `bouquets.length === 0`
    - Keep all existing Firebase logic unchanged
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ]* 9.4 Write property test for Garden filter (Property 10)
    - **Property 10: Garden filter returns only matching bouquets**
    - **Validates: Requirements 8.4, 8.5**
    - File: `src/__tests__/pages/GardenPage.test.jsx`

  - [ ]* 9.5 Write property test for Dashboard statistics (Property 11)
    - **Property 11: Dashboard statistics are consistent with bouquet data**
    - **Validates: Requirements 9.3**
    - File: `src/__tests__/pages/DashboardPage.test.jsx`

- [ ] 10. Add randomizer pure function and property test
  - [ ] 10.1 Extract `randomizeArrangement(seed?)` into `src/engine/randomizer.js`
    - Function accepts an optional numeric seed; returns an array of 6–10 `FlowerInstance` objects with types drawn from `FLOWER_TYPES`
    - Update `CreatePage.handleRandomize` to call this function
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ]* 10.2 Write property test for randomized arrangement validity (Property 9)
    - **Property 9: Randomized arrangement is always valid**
    - **Validates: Requirements 11.2, 11.3**
    - File: `src/__tests__/engine/randomizer.test.js`

- [ ] 11. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The existing Firebase integration (`src/firebase/`), auth context, routing, and Navbar are not modified — only the engine, two primary components, CreatePage wiring, and page styling are changed

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "8.1", "8.2"] },
    { "id": 1, "tasks": ["2.3", "2.2"] },
    { "id": 2, "tasks": ["2.4", "2.5", "2.6", "2.7", "4.1"] },
    { "id": 3, "tasks": ["4.2", "5.1"] },
    { "id": 4, "tasks": ["5.2", "5.3", "5.4", "5.5"] },
    { "id": 5, "tasks": ["7.1", "9.3", "10.1"] },
    { "id": 6, "tasks": ["7.2", "9.1", "9.2", "9.4", "9.5", "10.2"] }
  ]
}
```
