# 🌸 Dev's Bouquet

A digital bouquet builder where you can compose beautiful, personalized flower arrangements and send them to the people you care about.

## What It Does

- **Build a bouquet** — Pick from a curated catalog of flowers. As you select them, a stunning bouquet is composed in real time on the right panel
- **Personalize it** — Add a recipient name, a heartfelt message, and choose an occasion
- **Send it** — Share your bouquet with a unique link
- **The Garden** — Browse public bouquets created by others
- **Dashboard** — View and manage all the bouquets you've created

## Tech Stack

- **React + Vite** — Fast, modern frontend
- **Firebase** — Authentication and Firestore database
- **Framer Motion** — Smooth animations and transitions
- **React Router** — Client-side routing

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

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password + Google)
3. Enable **Firestore Database**
4. Copy your config values into `.env`

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-level page components
├── engine/           # Bouquet composition engine
├── firebase/         # Firebase auth & database helpers
├── contexts/         # React context providers
└── services/         # External service integrations
```

## License

MIT
