# Requirements Document

## Introduction

DevsBouquet is a romantic, emotionally meaningful digital bouquet builder built with React + Vite. The application allows users to compose custom bouquets from a curated catalog of botanical flower illustrations, preview the arrangement live as a naturally composed hand-tied bouquet, attach a personal message and occasion, and share the bouquet via a unique link. The aesthetic is that of a high-end Parisian floral boutique — warm cream tones, elegant serif typography, refined spacing, and painterly botanical art. The rebuild replaces all existing rendering logic with a new image-based bouquet composition engine and refreshes the UI to match the intended visual identity throughout.

## Glossary

- **App**: The DevsBouquet React + Vite web application.
- **Bouquet_Builder**: The two-panel page (`/create`) where users compose and preview a bouquet.
- **Flower_Picker**: The left-panel component displaying the flower catalog as a 2-column card grid.
- **Flower_Card**: A single selectable card in the Flower_Picker showing a botanical illustration, name, and poetic tagline.
- **Bouquet_Canvas**: The right-panel live preview component that renders the composed bouquet as an SVG/canvas scene.
- **Flower_Catalog**: The set of six botanical PNG illustrations available for selection: `classic_red_rose`, `romantic_pink_peony`, `vibrant_sunflower`, `delicate_white_lily`, `textured_blue_hydrangea`, `cheerful_daisy`.
- **Selection_State**: The ordered list of flower instances the user has chosen, including type and quantity per type.
- **Bouquet_Scene**: The visual output of the Bouquet_Canvas — a clustered, organic, hand-tied bouquet arrangement with stems, ribbon, and overlapping petals.
- **Tie_Point**: The focal convergence point in the Bouquet_Scene where all stems meet and the ribbon is tied.
- **Fan_Angle**: The rotation angle applied to each flower PNG around the Tie_Point to produce a natural fan spread.
- **Occasion**: A categorical tag attached to a bouquet (birthday, thank-you, love, sympathy, congrats, just-because).
- **Garden**: The public gallery page (`/garden`) displaying publicly shared bouquets.
- **Dashboard**: The authenticated user's personal page (`/dashboard`) listing their created bouquets.
- **View_Page**: The shareable bouquet reveal page (`/view/:id`) that recipients open.
- **Firebase**: The backend platform providing authentication (Firebase Auth) and data persistence (Firestore).
- **Demo_Mode**: A fallback mode when Firebase is not configured, using in-memory storage and a demo user.
- **Framer_Motion**: The animation library used for page transitions, card interactions, and bouquet entrance animations.

---

## Requirements

### Requirement 1: Visual Design System

**User Story:** As a user, I want the entire application to feel like a high-end Parisian floral boutique, so that every interaction feels intentional, warm, and emotionally resonant.

#### Acceptance Criteria

1. THE App SHALL use a warm cream base color (`#faf8f3` or equivalent) as the primary background throughout all pages.
2. THE App SHALL use an elegant serif typeface (e.g., Playfair Display or equivalent) for all headings and flower names.
3. THE App SHALL use a complementary sans-serif typeface for body text, labels, and UI controls.
4. THE App SHALL apply soft drop shadows, refined spacing, and subtle texture to cards and panels to evoke a boutique aesthetic.
5. WHEN interactive elements (buttons, cards, inputs) receive focus or hover, THE App SHALL provide smooth, intentional visual feedback using Framer_Motion transitions.
6. THE App SHALL maintain visual consistency — color palette, typography scale, and spacing — across all pages and components.

---

### Requirement 2: Flower Catalog and Flower_Picker

**User Story:** As a user, I want to browse and select flowers from a beautiful catalog, so that I can compose a bouquet that expresses my feelings.

#### Acceptance Criteria

1. THE Flower_Picker SHALL display all six flowers from the Flower_Catalog in a 2-column card grid.
2. WHEN a Flower_Card is rendered, THE Flower_Picker SHALL display the flower's botanical PNG illustration, its name in an elegant serif font, and its poetic one-liner tagline beneath the name.
3. THE Flower_Picker SHALL use the PNG files located at `/assets/flowers/` as the illustration source for each Flower_Card.
4. WHEN a user clicks a Flower_Card, THE Flower_Picker SHALL add one instance of that flower type to the Selection_State.
5. WHEN a flower type is present in the Selection_State, THE Flower_Picker SHALL render a count badge on that flower's Flower_Card showing the current quantity of that type, including when the count is zero.
6. WHEN a user clicks a Flower_Card that is already selected, THE Flower_Picker SHALL increment the count for that flower type by one.
7. WHEN a flower type is selected, THE Flower_Picker SHALL apply a soft rose-gold border glow to that Flower_Card to indicate its selected state.
8. THE Flower_Picker SHALL allow a maximum of 12 total flower instances across all types in the Selection_State.
9. IF the Selection_State contains 12 flower instances and the user clicks a Flower_Card, THEN THE Flower_Picker SHALL ignore the click and not add further instances.
10. WHEN a Flower_Card is hovered, THE Flower_Picker SHALL animate the card with a subtle lift effect using Framer_Motion.

---

### Requirement 3: Live Bouquet Preview (Bouquet_Canvas)

**User Story:** As a user, I want to see a live, realistic bouquet preview that updates as I select flowers, so that I can visualize my arrangement before sending it.

#### Acceptance Criteria

1. WHEN the Selection_State is empty, THE Bouquet_Canvas SHALL display a placeholder prompt inviting the user to pick a flower.
2. WHEN the Selection_State contains at least one flower, THE Bouquet_Canvas SHALL render a Bouquet_Scene showing all selected flowers arranged as a hand-tied bouquet.
3. THE Bouquet_Canvas SHALL arrange flowers in a clustered, overlapping, organic circular shape — not a vertical line — fanning out naturally from the Tie_Point.
4. THE Bouquet_Canvas SHALL position each flower PNG so its bottom center aligns with the Tie_Point and rotate it by its assigned Fan_Angle around the Tie_Point.
5. WHEN the Selection_State contains multiple flowers, THE Bouquet_Canvas SHALL distribute Fan_Angles symmetrically so the bouquet fans out evenly, with a maximum total arc of 100 degrees. WHEN the Selection_State contains exactly one flower, THE Bouquet_Canvas SHALL skip fan angle distribution and render the single flower at a 0-degree angle.
6. THE Bouquet_Canvas SHALL render a stem bundle below the Tie_Point converging toward the bottom of the canvas to simulate a hand-held bouquet.
7. THE Bouquet_Canvas SHALL render an elegant ribbon bow at the Tie_Point whose fill color is derived from the dominant colors of the selected flowers.
8. WHEN more flowers are added to the Selection_State, THE Bouquet_Canvas SHALL scale flower sizes down proportionally so the bouquet remains within the canvas bounds and grows denser.
9. THE Bouquet_Canvas SHALL render flowers in a paint order where outer flowers appear behind center flowers, creating natural depth and overlap.
10. WHEN the Selection_State changes, THE Bouquet_Canvas SHALL update the Bouquet_Scene immediately without requiring a page reload.
11. THE Bouquet_Canvas SHALL use a soft warm off-white background (`#faf8f3`) with subtle texture for the preview area.

---

### Requirement 4: Bouquet Composition Form

**User Story:** As a user, I want to attach a recipient name, personal message, and occasion to my bouquet, so that it carries emotional meaning when shared.

#### Acceptance Criteria

1. THE Bouquet_Builder SHALL provide a text input field for the recipient's name ("To").
2. THE Bouquet_Builder SHALL provide a text input field for the sender's name ("From"), pre-populated with the authenticated user's display name when available.
3. THE Bouquet_Builder SHALL provide a multi-line textarea for a personal message.
4. THE Bouquet_Builder SHALL provide an occasion selector displaying the following options: Birthday, Thank You, Love, Sympathy, Congrats, Just Because.
5. WHEN a user selects an occasion, THE Bouquet_Builder SHALL visually highlight the selected occasion chip and deselect any previously selected occasion.
6. THE Bouquet_Builder SHALL provide a checkbox allowing the user to mark the bouquet as public (visible in the Garden) or private.
7. WHEN the recipient name, message, and "From" fields are all filled in and at least one flower is selected, THE Bouquet_Canvas SHALL display a live message preview card beneath the bouquet showing the "To", message, and "From" fields. IF the preview card fails to display, THEN THE Bouquet_Builder SHALL continue to function normally.

---

### Requirement 5: Bouquet Saving and Sharing

**User Story:** As a user, I want to save my bouquet and share it via a unique link, so that the recipient can open and experience it.

#### Acceptance Criteria

1. WHEN a user clicks the "Send Bouquet" button and the Selection_State contains at least one flower, THE App SHALL save the bouquet to Firebase Firestore (or in-memory storage in Demo_Mode) and navigate to the View_Page for that bouquet.
2. THE App SHALL persist the following bouquet fields: `userId`, `to`, `from`, `message`, `occasion`, `flowers` (array of flower type references), `isPublic`, `seed`, `createdAt`, `viewed`, `viewedAt`, `reaction`.
3. WHEN the Selection_State is empty, THE Bouquet_Builder SHALL disable the "Send Bouquet" button and display a prompt to add a flower first.
4. WHEN a bouquet is being saved, THE Bouquet_Builder SHALL display a loading state on the "Send Bouquet" button.
5. IF an error occurs during bouquet saving, THEN THE App SHALL always display an error message to the user without navigating away.
6. THE App SHALL generate a unique shareable URL in the format `/view/:id` for each saved bouquet.

---

### Requirement 6: Bouquet View Page

**User Story:** As a recipient, I want to open a shared bouquet link and experience a beautiful reveal, so that receiving a digital bouquet feels special and memorable.

#### Acceptance Criteria

1. WHEN a user navigates to `/view/:id`, THE App SHALL fetch the bouquet data from Firebase Firestore (or Demo_Mode storage) by its ID.
2. WHEN the bouquet data is loaded, THE App SHALL render the Bouquet_Scene using the stored flower list.
3. WHEN the View_Page first loads a bouquet, THE App SHALL animate the bouquet entrance using Framer_Motion (e.g., fade-in with scale).
4. THE View_Page SHALL display the recipient name, sender name, personal message, and occasion only when all four fields are present in the bouquet record.
5. WHEN a recipient views a bouquet for the first time, THE App SHALL mark the bouquet as `viewed: true` and record the `viewedAt` timestamp in Firestore.
6. THE View_Page SHALL display an emoji reaction bar allowing the recipient to react to the bouquet with a single emoji.
7. WHEN a recipient selects a reaction emoji, THE App SHALL persist the reaction to the bouquet record in Firestore.
8. IF the bouquet ID does not exist, THEN THE App SHALL display a graceful "not found" message with a link to create a new bouquet.

---

### Requirement 7: Authentication

**User Story:** As a user, I want to sign in with my Google account, so that my bouquets are saved to my profile and I can access them later.

#### Acceptance Criteria

1. THE App SHALL support Google OAuth sign-in via Firebase Authentication.
2. WHEN a user is not authenticated and navigates to `/create`, `/dashboard`, or `/profile`, THE App SHALL redirect them to the login page.
3. WHEN a user successfully authenticates, THE App SHALL redirect them to the page they originally requested.
4. WHILE a user is authenticated and navigates to `/create`, `/dashboard`, or `/profile`, THE App SHALL allow access to those pages normally without redirection.
5. THE App SHALL provide a sign-out action accessible from the navigation bar.
6. WHERE Firebase is not configured, THE App SHALL operate in Demo_Mode, allowing users to log in with a demo identity without real authentication.
7. WHILE a user is authenticated, THE App SHALL display their display name or avatar in the navigation bar.

---

### Requirement 8: Garden (Public Gallery)

**User Story:** As a visitor, I want to browse publicly shared bouquets in a gallery, so that I can discover beautiful arrangements and feel inspired.

#### Acceptance Criteria

1. THE App SHALL provide a Garden page at `/garden` displaying up to 30 of the most recently created public bouquets.
2. WHEN the Garden page loads, THE App SHALL fetch public bouquets from Firestore ordered by `createdAt` descending.
3. THE Garden SHALL display each bouquet as a card showing the Bouquet_Scene preview, recipient name (if present), occasion badge, and reaction emoji (if present).
4. THE Garden SHALL provide occasion filter chips allowing users to filter the displayed bouquets by occasion type.
5. WHEN a filter chip is selected, THE Garden SHALL display only bouquets matching that occasion.
6. WHEN a garden card is clicked, THE App SHALL navigate to the View_Page for that bouquet.
7. WHEN no public bouquets exist or no bouquets match the active filter, THE Garden SHALL display the same empty state message with a call-to-action to create a bouquet, regardless of whether the cause is an empty dataset or a filter with no matches.

---

### Requirement 9: User Dashboard

**User Story:** As an authenticated user, I want a personal dashboard showing all the bouquets I've created, so that I can track which ones have been viewed and reacted to.

#### Acceptance Criteria

1. THE Dashboard SHALL be accessible at `/dashboard` and require authentication.
2. WHEN the Dashboard loads, THE App SHALL fetch all bouquets belonging to the authenticated user from Firestore, ordered by `createdAt` descending.
3. THE Dashboard SHALL display summary statistics: total bouquets sent, total viewed, and total with reactions.
4. THE Dashboard SHALL display each bouquet as a list item showing the recipient name, occasion badge, flower count, message preview, viewed status, and reaction emoji.
5. WHEN a dashboard item is clicked, THE App SHALL navigate to the View_Page for that bouquet.
6. WHEN the user has no bouquets, THE Dashboard SHALL display an empty state with a call-to-action to create a bouquet and SHALL NOT render any bouquet list item components.

---

### Requirement 10: Navigation and Routing

**User Story:** As a user, I want clear, consistent navigation throughout the app, so that I can move between pages without confusion.

#### Acceptance Criteria

1. THE App SHALL provide a persistent navigation bar visible on all pages.
2. THE Navbar SHALL include links to: Home (`/`), Create (`/create`), Garden (`/garden`), and Dashboard (`/dashboard`) when the user is authenticated.
3. WHEN the user is not authenticated, THE Navbar SHALL display a "Sign In" link in place of Dashboard and Profile links.
4. THE App SHALL use React Router for client-side routing with animated page transitions via Framer_Motion.
5. WHEN navigating between pages, THE App SHALL apply a consistent fade/slide page transition animation.

---

### Requirement 11: Randomize Arrangement

**User Story:** As a user, I want to randomize my bouquet with a single click, so that I can quickly explore different arrangements without manually selecting each flower.

#### Acceptance Criteria

1. THE Bouquet_Builder SHALL provide a "Randomize Arrangement" button.
2. WHEN the user clicks "Randomize Arrangement", THE App SHALL replace the current Selection_State with a randomly generated set of 6 to 10 flower instances drawn from the Flower_Catalog.
3. WHEN a randomized arrangement is applied, THE Bouquet_Canvas SHALL update immediately to reflect the new Selection_State, including when the randomized arrangement contains zero flowers.

---

### Requirement 12: Demo Mode Fallback

**User Story:** As a developer or evaluator, I want the app to function without a live Firebase project, so that I can run and test it locally without configuration.

#### Acceptance Criteria

1. WHEN Firebase credentials are absent or invalid, THE App SHALL detect the unconfigured state and activate Demo_Mode automatically.
2. WHILE in Demo_Mode, THE App SHALL store bouquets in memory and allow full bouquet creation, viewing, and sharing within the same browser session.
3. WHILE in Demo_Mode, THE App SHALL allow users to log in with a demo identity (no real OAuth required).
4. WHILE in Demo_Mode, THE App SHALL display a visible indicator informing the user that they are in demo mode and data will not persist.
