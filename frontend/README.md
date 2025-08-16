
# KrishiAi Frontend

React-based frontend for the KrishiAi agricultural platform, built with Vite and Tailwind CSS.

## Tech Stack

- **React 18** with JSX
- **Vite** for fast dev server and optimized builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **React Router** for client-side routing
- **i18next** for multi-language support (16+ Indian languages)
- **Axios** for API communication
- **Chart.js** for data visualizations

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:3000` with proxy to backend at `http://localhost:5000`.

## Project Structure

```
src/
├── components/       # Shared components (Navbar, Footer, ChatBot, etc.)
├── pages/            # Route pages
│   ├── Home.jsx
│   ├── Login.jsx / Signup.jsx
│   ├── CropRecommendation.jsx
│   ├── DiseaseDetection.jsx
│   ├── Weather.jsx
│   ├── RealTimeMarket.jsx
│   ├── NewsFeed.jsx
│   ├── CommunityForum.jsx
│   ├── GovernmentSchemes.jsx
│   ├── Team.jsx
│   └── admin/        # Admin dashboard
├── context/          # AuthContext for authentication state
├── locales/          # Translation JSON files (en, hi, ta, te, etc.)
├── styles/           # Theme CSS variables
├── App.jsx           # Root component with route definitions
├── App.css           # Global styles
└── index.css         # Tailwind directives and base styles
```

## Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, features, pricing |
| Crop Recommendation | `/crop-recommendation` | AI crop suggestions |
| Disease Detection | `/disease-detection` | Image-based plant disease ID |
| Weather | `/weather` | Location-based forecasts |
| Market Data | `/real-time-market` | Live commodity prices |
| Community | `/community-forum` | Discussion forum |
| News | `/news-feed` | Agricultural news |
| Government Schemes | `/government-schemes` | Subsidy & policy info |

## Environment

The Vite config proxies `/api` requests to the backend server. No frontend-specific env vars are required for local development.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
