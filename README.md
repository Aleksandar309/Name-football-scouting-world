# ⚽ Football Scouting World

React + Vite + Firebase + Tailwind CSS app. Deploy on Vercel in minutes.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🔧 Firebase Setup

Your Firebase config is already in `src/lib/firebase.js`. Make sure you have:
1. **Firestore** enabled (Start in test mode or add rules)
2. **Authentication** → Email/Password enabled
3. At least one admin user created in Firebase Console → Authentication

## 📦 Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Framework: **Vite** (auto-detected)
4. Deploy — done!

## 📁 Project Structure

```
src/
  components/
    Header.jsx          # Sticky nav with search
    Hero.jsx            # Stats banner
    MatchCard.jsx       # Match grid card
    PlayerCard.jsx      # Player grid card
    MatchModal.jsx      # Match detail overlay
    PlayerModal.jsx     # Player detail overlay
    AdminPanel.jsx      # CRUD panel (requires auth)
    LoginModal.jsx      # Firebase auth form
    TagInput.jsx        # Reusable tag input
    SkeletonCard.jsx    # Loading skeletons
    Toast.jsx           # Notification toast
    LoadingScreen.jsx   # Initial loading screen
  pages/
    MatchesPage.jsx     # Matches section with filters
    PlayersPage.jsx     # Players section with filters
  hooks/
    useAuth.js          # Firebase auth state
    useMatches.js       # Firestore matches CRUD
    usePlayers.js       # Firestore players CRUD
  lib/
    firebase.js         # Firebase init
    constants.js        # Leagues, formations, etc.
  App.jsx               # Root component + context
  main.jsx              # Entry point
  index.css             # Tailwind + custom CSS
```

## ✨ Features
- 🔐 Firebase Auth (admin-only CRUD)
- ⚽ Matches with tactical data, formations, tags, drive links
- 👤 Player scouting with ratings, reports, video links
- 🔍 Real-time search across all fields
- 🎛️ Dynamic filters (league, season, formation, position, rating, tags)
- 💀 Skeleton loading states
- 📱 Responsive design
- 🌙 Dark theme throughout
