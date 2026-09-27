'use client';

import dynamic from 'next/dynamic';
import { Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProfileModal from '@/components/ProfileModal';
import SavedDrawer from '@/components/SavedDrawer';
import SearchFilterBar from '@/components/SearchFilterBar';
import OpportunityCard from '@/components/OpportunityCard';
import DashboardStats from '@/components/DashboardStats';
import { opportunities, calculateMatchScore, Opportunity } from '@/lib/opportunities';
import { useAppStore } from '@/lib/store';

// Dynamic import for Three.js component (client-only)
const HeroGlobe = dynamic(() => import('@/components/HeroGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
    </div>
  ),
});

// Opportunity detail modal (dynamic)
const OpportunityDetailModal = dynamic(() => import('@/components/OpportunityDetailModal'), { ssr: false });

export default function HomePage() {
  const {
    searchQuery, activeCategory, activeInterests, showRemoteOnly, profile, selectedOpportunity
  } = useAppStore();

  // Filter + sort opportunities
  const filteredOpportunities = useMemo(() => {
    let filtered = [...opportunities];

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(o =>
        o.title.toLowerCase().includes(q) ||
        o.organization.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.skills.some(s => s.toLowerCase().includes(q)) ||
        o.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(o => o.category === activeCategory);
    }

    // Interest filter
    if (activeInterests.length > 0) {
      filtered = filtered.filter(o =>
        o.interests.some(i => activeInterests.includes(i as any))
      );
    }

    // Remote filter
    if (showRemoteOnly) {
      filtered = filtered.filter(o => o.remote);
    }

    // Sort: by match score if profile set, then featured, then deadline
    if (profile?.skills.length || profile?.interests.length) {
      filtered.sort((a, b) => {
        const scoreA = calculateMatchScore(profile!.skills, profile!.interests, a);
        const scoreB = calculateMatchScore(profile!.skills, profile!.interests, b);
        if (scoreB !== scoreA) return scoreB - scoreA;
        if (b.featured !== a.featured) return b.featured ? 1 : -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    } else {
      // Default: featured first, then deadline
      filtered.sort((a, b) => {
        if (b.featured !== a.featured) return b.featured ? 1 : -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    }

    return filtered;
  }, [searchQuery, activeCategory, activeInterests, showRemoteOnly, profile]);

  return (
    <main className="min-h-screen bg-deep-space relative overflow-x-hidden">
      {/* Background ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[90px]" />
        <div className="absolute top-[60%] left-[50%] w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[80px]" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[520px]">
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1.5 glass-chip px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs text-white/70 font-medium">AI-Powered Career Matching</span>
              </div>
              <div className="flex items-center gap-1 glass-chip px-3 py-1.5 rounded-full">
                <Zap className="w-3 h-3 text-amber-400" />
                <span className="text-xs text-white/60">{opportunities.length} Opportunities</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Find Your{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Perfect
              </span>
              <br />
              Opportunity
            </h1>

            <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
              Intelligent matching of student skills and interests to internships, hackathons, scholarships, and open-source programs — powered by a smart scoring algorithm.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#opportunities"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 flex items-center gap-2"
                id="explore-btn"
              >
                Explore Now <ArrowDown className="w-4 h-4" />
              </a>
              <button
                onClick={() => useAppStore.getState().setShowProfileModal(true)}
                className="px-6 py-3.5 rounded-2xl glass-btn text-white/80 font-medium hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
                id="hero-profile-btn"
              >
                Create Profile ✦
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex gap-6 mt-8 pt-6 border-t border-white/5">
              {[
                { num: '14+', label: 'Opportunities' },
                { num: '5', label: 'Categories' },
                { num: '99%', label: 'Match Accuracy' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">{num}</div>
                  <div className="text-xs text-white/40">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] lg:h-[520px]"
          >
            {/* Glow behind globe */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-3xl blur-xl" />
            <Suspense fallback={null}>
              <HeroGlobe />
            </Suspense>

            {/* Floating info cards */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-8 right-4 glass-panel rounded-xl px-3 py-2 text-xs text-white/70"
            >
              <span className="text-emerald-400 font-bold">●</span> 94% Match — GSoC 2026
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute bottom-16 left-4 glass-panel rounded-xl px-3 py-2 text-xs text-white/70"
            >
              <span className="text-amber-400 font-bold">⚡</span> Closes in 7 days — SIH 2026
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section id="dashboard" className="px-4 sm:px-6 max-w-7xl mx-auto mb-10">
        <DashboardStats />
      </section>

      {/* Search & Filter */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-8">
        <SearchFilterBar />
      </section>

      {/* Opportunity Grid */}
      <section id="opportunities" className="px-4 sm:px-6 max-w-7xl mx-auto pb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">
              {filteredOpportunities.length > 0 ? (
                <>
                  {filteredOpportunities.length} <span className="text-white/50 font-normal">opportunities found</span>
                </>
              ) : 'No opportunities found'}
            </h2>
            {profile?.name && (
              <p className="text-xs text-white/40 mt-0.5">
                Ranked by match score for {profile.name}
              </p>
            )}
          </div>
          {!profile?.name && (
            <button
              onClick={() => useAppStore.getState().setShowProfileModal(true)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors glass-chip px-3 py-1.5 rounded-lg"
            >
              + Set profile for match scores
            </button>
          )}
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-24 glass-panel rounded-3xl">
            <div className="text-5xl mb-4">🔭</div>
            <h3 className="text-white/70 text-lg font-medium mb-2">No matches found</h3>
            <p className="text-white/40 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOpportunities.map((opportunity, index) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white/40 text-sm">OpportunityAI — Smart Student Career Matcher</span>
          </div>
          <p className="text-white/25 text-xs">
            Built for hackathons · Data updated 2026 · Open-source compatible
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ProfileModal />
      <SavedDrawer />
      {selectedOpportunity && <OpportunityDetailModal opportunity={selectedOpportunity} />}
    </main>
  );
}
