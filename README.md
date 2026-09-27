# 🚀 OpportunityAI — Smart Student Career & Opportunity Matcher

> An AI-powered hackathon platform that intelligently matches students to internships, hackathons, scholarships, courses, and open-source programs using a smart skill-interest scoring algorithm.

![OpportunityAI Preview](./public/preview.png)

---

## 🎯 Problem Statement

Students across India and globally struggle to discover relevant opportunities aligned with their specific skill sets and career interests. The information is fragmented across dozens of platforms, deadlines are missed, and there's no intelligent curation layer.

**OpportunityAI** solves this by providing a single, beautiful, AI-driven platform that:
- Matches students to the *right* opportunities based on their actual skills
- Shows urgency-aware deadline tracking
- Surfaces hidden gems (open-source programs, scholarships) often missed by students

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🌐 **3D Interactive Hero Globe** | Three.js particle sphere with cursor-reactive mouse tracking |
| 🎯 **Smart Match Engine** | Algorithmic scoring: `calculateMatchScore(skills, interests, opportunity)` |
| 🔍 **Universal Search** | Instant search across title, org, skills, and category |
| 🏷️ **Filter Hub** | Category chips, interest toggles, and remote-only filter |
| 📋 **Student Profile** | Create & persist your profile (skills + interests) via localStorage |
| 🔖 **Saved Drawer** | Slide-in drawer for bookmarked opportunities |
| 📊 **Dashboard Analytics** | Stat widgets: saved count, deadlines, match count, next deadline |
| 🎨 **Glassmorphic UI** | Frost & Glow design with ambient gradient orbs and frosted cards |

---

## 🛠️ Tech Stack

```
Frontend    → Next.js 15 (App Router) + TypeScript
Styling     → Tailwind CSS v4 + custom glassmorphism utilities
3D          → Three.js (particle sphere, floating nodes, cursor parallax)
State       → Zustand + localStorage persistence
Icons       → Lucide React
Animation   → Framer Motion
Dates       → date-fns
Container   → Docker (multi-stage, node:20-alpine)
Deploy      → Google Cloud Run / Vercel / Railway
```

---

## 🏗️ Architecture

```
student-matcher/
├── app/
│   ├── layout.tsx          # Root layout with fonts and SEO metadata
│   ├── page.tsx            # Main page: hero, stats, grid
│   └── globals.css         # Glassmorphism utilities + design tokens
├── components/
│   ├── Navbar.tsx          # Sticky glassmorphic navbar
│   ├── HeroGlobe.tsx       # Three.js 3D interactive globe
│   ├── SearchFilterBar.tsx # Universal search + category/interest filters
│   ├── OpportunityCard.tsx # Card with match score, deadline, bookmark
│   ├── OpportunityDetailModal.tsx # Full detail modal
│   ├── ProfileModal.tsx    # Student profile creation/editing
│   ├── SavedDrawer.tsx     # Slide-in saved opportunities drawer
│   └── DashboardStats.tsx  # Analytics stat widgets
├── lib/
│   ├── opportunities.ts    # Seed data (14 opportunities) + match algorithm
│   └── store.ts            # Zustand store with localStorage sync
├── Dockerfile              # Multi-stage Cloud Run optimized
├── cloudbuild.yaml         # Google Cloud Build CI/CD pipeline
└── README.md
```

### Match Score Algorithm

```typescript
function calculateMatchScore(
  studentSkills: string[],
  studentInterests: string[],
  opportunity: Opportunity
): number {
  // Skill match: 60% weight
  const skillMatches = opportunity.skills.filter(s =>
    studentSkills.map(x => x.toLowerCase()).includes(s.toLowerCase())
  ).length;
  const skillScore = (skillMatches / opportunity.skills.length) * 60;

  // Interest match: 40% weight
  const interestMatches = opportunity.interests.filter(i =>
    studentInterests.includes(i)
  ).length;
  const interestScore = (interestMatches / opportunity.interests.length) * 40;

  // Featured bonus: +5
  return Math.min(Math.round(skillScore + interestScore + (featured ? 5 : 0)), 99);
}
```

---

## ⚡ Local Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to project
cd student-matcher

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Free Deployment Options

### Option 1: Vercel (Recommended — Completely Free, No Docker Needed)

The **fastest and simplest** free deployment for Next.js:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel

# Or link to GitHub and auto-deploy on push
```

**Steps:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your GitHub repo → Deploy
4. Get a live URL instantly (e.g., `your-app.vercel.app`)

✅ **Free tier includes:** 100GB bandwidth, unlimited deployments, custom domain support

---

### Option 2: Railway (Free Tier — Docker Support)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

✅ **Free tier includes:** $5/month credit, automatic Docker build, PostgreSQL DB available

---

### Option 3: Google Cloud Run (Free Tier Available)

**Requires:** Google Cloud account (free $300 credit for new users)

```bash
# 1. Install Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# 2. Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 3. Enable required APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# 4. Build and push Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/student-opportunity-matcher

# 5. Deploy to Cloud Run
gcloud run deploy student-opportunity-matcher \
  --image gcr.io/YOUR_PROJECT_ID/student-opportunity-matcher \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi

# 6. Get the live URL
gcloud run services describe student-opportunity-matcher \
  --region us-central1 \
  --format 'value(status.url)'
```

**Or use the included `cloudbuild.yaml` for automated CI/CD:**

```bash
# Trigger a build via Cloud Build
gcloud builds submit --config cloudbuild.yaml
```

✅ **Cloud Run free tier:** 2 million requests/month, 360,000 GB-seconds compute/month

---

### Option 4: Render (Free Tier — Docker)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect GitHub repo → Select "Docker" environment
4. Set port to `8080`
5. Deploy!

✅ **Free tier:** 750 hours/month, auto-deploy on push

---

## 🐳 Docker Build (For Cloud Deployment)

```bash
# Build the production image
docker build -t student-opportunity-matcher .

# Run locally on port 8080
docker run -p 8080:8080 student-opportunity-matcher

# Test
open http://localhost:8080
```

---

## 📝 Environment Variables

No environment variables are required for the MVP. All data is client-side with localStorage persistence.

For future production database integration, add:

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=https://your-api.com
```

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|---|---|---|
| Deep Space | `#040714` | Page background |
| Glass | `rgba(255,255,255,0.05)` | Card backgrounds |
| Border | `rgba(255,255,255,0.10)` | Card borders |
| Indigo | `#6366f1` | Primary accent |
| Violet | `#a855f7` | Secondary accent |
| Cyan | `#22d3ee` | Tertiary accent |

### Glassmorphism Classes
```css
.glass-panel   /* Main card/panel with backdrop-blur */
.glass-input   /* Form inputs */
.glass-chip    /* Tags and filter chips */
.glass-btn     /* Button variant */
.opportunity-card /* Interactive opportunity card */
```

---

## 🏆 Hackathon Submission

**Project:** Smart Student Opportunity & Career Matcher  
**Team:** [Your Team Name]  
**Category:** EdTech / Career Development  
**Problem Solved:** Student opportunity discovery and intelligent career matching  

---

## 📄 License

MIT License — Free to use, modify, and deploy.

---

*Built with ❤️ for students worldwide · Powered by Next.js + Three.js + AI Matching*
