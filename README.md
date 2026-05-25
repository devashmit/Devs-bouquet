# 🌸 Dev's Bouquet

A digital bouquet builder where you can compose beautiful, personalized flower arrangements and send them to the people you care about. Flowers are rendered procedurally using SVG — no static images required for the core bouquet engine.

## Features

- **Build a bouquet** — Pick from a curated catalog of flowers and greenery. The bouquet composes itself in real time as you select
- **Multiple render styles** — Switch between illustrated, sketch (rough.js), and photo-realistic modes
- **Greenery & filler** — Add eucalyptus, fern, lavender, ivy, and more to fill out your arrangement
- **Premade gallery** — Browse and load pre-designed bouquet templates
- **AI bouquet viewer** — Generate an AI-rendered preview of your arrangement
- **Randomizer** — Instantly generate a random bouquet for inspiration
- **Personalize it** — Add a recipient name, a heartfelt message, and choose an occasion
- **Share it** — Send your bouquet via a unique shareable link
- **The Garden** — Browse public bouquets created by the community
- **Dashboard** — View and manage all the bouquets you've created
- **Profile page** — Manage your account and preferences
- **Auth** — Email/password and Google sign-in via Firebase

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Procedural drawing | rough.js |
| Auth & Database | Firebase (Auth + Firestore) |
| Image export | html2canvas |
| Testing | Vitest + Testing Library |

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/devashmit/Devs-bouquet.git
cd Devs-bouquet
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Required variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** — Email/Password and Google providers
3. Enable **Firestore Database**
4. Copy your config values into `.env`

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
npm run test      # Run tests (Vitest)
```

## Project Structure

```
src/
├── components/       # Reusable UI components (pickers, canvas, navbar, etc.)
├── pages/            # Route-level pages (Home, Create, Garden, Dashboard, Profile, View, Login)
├── engine/           # Bouquet composition engine
│   ├── flowers/      # Procedural SVG flower components (Rose, Peony, Daisy, Tulip, Sunflower, …)
│   ├── greenery/     # Greenery & filler components
│   ├── bouquetEngine.js   # Core layout & composition logic
│   ├── styles.js          # Render style definitions
│   ├── animations.js      # Animation helpers
│   ├── randomizer.js      # Random bouquet generator
│   ├── premade.js         # Premade bouquet templates
│   └── rough-renderer.js  # Sketch-style renderer (rough.js)
├── firebase/         # Firebase auth & Firestore helpers
├── contexts/         # React context providers (AuthContext)
├── services/         # External service integrations (AI image service)
└── utils/            # Shared utility functions
```

## Flower Catalog

The engine includes procedural SVG renderers for:

Anemone · Baby's Breath · Cosmos · Dahlia · Daisy · Eucalyptus · Fern · Hydrangea · Lavender · Lily · Peony · Ranunculus · Rose · Snapdragon · Sunflower · Tulip · Waxflower · Wildflower

Plus photo-realistic variants using the assets in `public/assets/flowers/`.

## License

MIT
