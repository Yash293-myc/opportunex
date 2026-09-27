# OPPORTUNEX — Personal Opportunity Command Center
> *"Your next opportunity, already looking for you."*

[![FIT-FEST 2026](https://img.shields.io/badge/Hackathon-FIT--FEST%202026-blueviolet?style=for-the-badge)](https://github.com/Yash293-myc/FIT-FEST-2K26)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker Cloud Run](https://img.shields.io/badge/Google_Cloud_Run-Ready-4285F4?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/run)

Built for **FIT-FEST 2026 HACKATHON** by **Yash** ([@Yash293-myc](https://github.com/Yash293-myc)) • Contact: [yashsongire293@gmail.com](mailto:yashsongire293@gmail.com)

---

## 🎯 Challenge & Problem Statement

Students constantly miss out on high-impact **internships, hackathons, scholarships, certifications, competitions, workshops, and courses** because opportunity information is scattered haphazardly across hundreds of job boards, Telegram channels, Discord servers, and college groups.

Conventional job portals (Unstop, Naukri, Internshala, LinkedIn) force students into passive, tedious manual keyword searches and generic listing dumps with zero contextual relevance.

---

## 💡 The Solution: OPPORTUNEX

**Opportunex** is an original **Personal Opportunity Command Center** that inverts the traditional discovery paradigm:
Instead of you searching the web, your personalized opportunity feed is calculated dynamically based on:
- **Education & Year** (1st year eligible vs. pre-final vs. final year)
- **Technical Skills** (C++, Python, SQL, React, etc.)
- **Career Interests** (AI, Web Dev, Startups, Competitive Programming)
- **Work Mode & Location Preferences** (Remote, Hybrid, In-Office across India)

---

## ⚡ Core Differentiator: Explainable Match Engine

Every single recommendation explains **WHY** it matches you with clear, deterministic evidence:

```
┌────────────────────────────────────────────────────────┐
│ 95% MATCH — Smart India Hackathon 2026                 │
│                                                        │
│ Why this matches you:                                  │
│  ✓ C++ & Python match your primary skills              │
│  ✓ AI & Startups match your selected career interests  │
│  ✓ Open to 1st-Year engineering students               │
│  ✓ India / Remote competition with national recognition│
│  ✓ Active deadline within your application radar       │
└────────────────────────────────────────────────────────┘
```

### Deterministic Recommendation Scoring Algorithm

```
Total Match Score (100%) =
  ├── Skills Match (40%): Overlap between student profile skills & opportunity requirements
  ├── Interest / Category Match (25%): Alignment with student career tracks (AI, Hackathons, etc.)
  ├── Education & Year Eligibility (20%): Eligibility verified for current academic semester
  ├── Location & Work Mode (10%): Remote or city preference match
  └── Deadline Relevance (5%): Priority score for opportunities closing within 14–30 days
```

---

## ✨ Key Features

1. **Personalized Opportunity Feed**: Dynamic cards calculated in real-time matching the student's exact profile.
2. **Explainable "Why this matches you" Checklist**: Transparent reasons for every match.
3. **Application Tracker Pipeline**: Kanban pipeline tracking (*Saved → Planning to Apply → Applied → Shortlisted → Selected → Closed*).
4. **Dual Model AI Career Copilot**: Slide-over AI dashboard supporting **Google Gemini 2.0** and **xAI Grok-2** for automated resume gap analysis, mock interview prep, and SIH project ideation.
5. **Universal Search & Multi-Filter Radar**: Real-time filtering across Category, Remote mode, Eligibility, and Technical Skills.
6. **Student Career Passport Card & Modal**: Verified student credentials, LeetCode ratings (`1850 Knight`), hackathon trophies (`SIH Winner`), and college crest verification.
7. **Dedicated ATS Resume Uploader**: Drag & drop PDF/Word uploader with ATS parsing check and instant download.
8. **1:1 Industry Mentorship & Live Events**: Booking sessions with verified engineers at Google, Meta, Microsoft, Flipkart, and Cloudflare.

---

## 👤 Demo Profile (Pre-Configured for Judges)

- **Name**: Yash
- **College**: Institute of Technology
- **Degree**: B.Tech Information Technology (1st Year)
- **Skills**: C++, Python, SQL, HTML, CSS, JavaScript, React, Git
- **Interests**: AI, Software Development, Hackathons, Startups, Competitive Programming
- **Preferences**: Remote, India
- **LeetCode Rating**: 1850 (Knight Rank, Top 2.5%)
- **Hackathon Achievement**: SIH 2023 National Winner

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript 5.0 (Strict mode)
- **Styling**: Vanilla CSS + Tailwind CSS v4 design tokens
- **Icons**: Lucide React + Authentic SVGs (Google, Microsoft, Meta, AWS, SIH, LeetCode)
- **State Management**: Zustand with persistent storage
- **Animations**: Framer Motion
- **Containerization**: Docker (multi-stage alpine build)
- **Deployment Targets**: Google Cloud Run & Vercel

---

## 🚀 Quickstart & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/Yash293-myc/FIT-FEST-2K26.git
cd FIT-FEST-2K26
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🐳 Google Cloud Run Deployment

Opportunex includes a production-grade, multi-stage `Dockerfile` configured for Google Cloud Run on port **8080**:

### Step 1: Build the Docker image
```bash
docker build -t gcr.io/YOUR_PROJECT_ID/opportunex:latest .
```

### Step 2: Push to Google Artifact Registry / GCR
```bash
docker push gcr.io/YOUR_PROJECT_ID/opportunex:latest
```

### Step 3: Deploy to Cloud Run
```bash
gcloud run deploy opportunex \
  --image gcr.io/YOUR_PROJECT_ID/opportunex:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

---

## ⚡ 1-Click Vercel Deployment

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import repository: `https://github.com/Yash293-myc/FIT-FEST-2K26.git`.
3. Framework Preset: **Next.js** (Auto-detected).
4. Click **Deploy**.

---

## 📄 License & Attribution

Developed with passion by **Yash** for the **FIT-FEST 2026 HACKATHON**. Distributed under the MIT License.
