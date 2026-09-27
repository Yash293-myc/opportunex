'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Bookmark, ArrowUpRight, Trophy, Sparkles, 
  LayoutDashboard, Briefcase, Rocket, GraduationCap, FolderCode, 
  Users, CalendarDays, Settings, CheckCircle2, ChevronRight, User,
  Bot, Cpu, Zap, MessageSquare
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProfileModal from '@/components/ProfileModal';
import SavedDrawer from '@/components/SavedDrawer';
import CompanyLogo from '@/components/CompanyLogo';
import MentorshipView from '@/components/MentorshipView';
import EventsView from '@/components/EventsView';
import SettingsView from '@/components/SettingsView';
import AICopilotModal from '@/components/AICopilotModal';
import BrandLogo from '@/components/BrandLogo';
import { CollegeCrestLogo, SIHOfficialLogo, LeetCodeOfficialLogo } from '@/components/TechAndCollegeLogos';
import { opportunities, calculateMatchScore, Category } from '@/lib/opportunities';
import { useAppStore, calculateProfileStrength } from '@/lib/store';
import { formatDistanceToNow, parseISO } from 'date-fns';

const OpportunityDetailModal = dynamic(() => import('@/components/OpportunityDetailModal'), { ssr: false });

function OpportunityCard({ opp, index }: { opp: (typeof opportunities)[0]; index: number }) {
  const { toggleSave, isSaved, setSelectedOpportunity, profile } = useAppStore();
  const saved = isSaved(opp.id);

  const userSkills = profile?.technicalSkills || profile?.skills || [];
  const userInterests = profile?.interests || [];

  const rawMatchScore = (userSkills.length > 0 || userInterests.length > 0)
    ? calculateMatchScore(userSkills, userInterests, opp)
    : 92 + (index % 7);
  
  const matchScore = rawMatchScore > 0 ? Math.max(88, rawMatchScore) : 94;

  const deadline = parseISO(opp.deadline);
  const deadlineFormatted = `${deadline.getDate()} ${deadline.toLocaleString('en-US', { month: 'short' })} ${deadline.getFullYear()}`;

  // Category badge styling from image
  let badgeClass = 'badge-internship';
  let badgeText = opp.category.toUpperCase();

  if (opp.category === 'Hackathon') {
    badgeClass = index % 2 === 0 ? 'badge-hackathon' : 'badge-scholarship';
  } else if (opp.category === 'Scholarship') {
    badgeClass = 'badge-scholarship';
  } else if (opp.category === 'Course') {
    badgeClass = 'badge-course';
  } else if (opp.category === 'OpenSource') {
    badgeClass = 'badge-opensource';
  }

  const locationText = opp.remote ? 'Bangalore / Hybrid' : opp.location;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.22 }}
      className="opp-card-container group"
      onClick={() => setSelectedOpportunity(opp)}
      id={`card-${opp.id}`}
    >
      {/* 1. Category Badge */}
      <span className={`badge-category ${badgeClass}`}>
        {badgeText}
      </span>

      {/* 2. Authentic Company Logo */}
      <div className="mb-2">
        <CompanyLogo organization={opp.organization} showText={true} />
      </div>

      {/* 3. Job / Hackathon Title */}
      <h3 className="text-[var(--text-main)] text-sm font-bold leading-snug clamp2 mb-1.5 group-hover:text-blue-500 dark:group-hover:text-sky-300 transition-colors">
        {opp.title}
      </h3>

      {/* 4. Description */}
      <p className="text-[var(--text-sub)] text-xs leading-relaxed clamp2 mb-3">
        {opp.description}
      </p>

      {/* 5. Match Score Pill */}
      <div className="mb-3">
        <span className="badge-match-score">
          Match Score: {matchScore}%
        </span>
      </div>

      {/* 6. Stipend / Prize info */}
      <div className="flex items-center gap-1.5 text-xs text-[var(--text-main)] mb-1 font-medium">
        <Trophy className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
        <span>{opp.stipend ? `Stipend: ${opp.stipend}` : `Prize: ${opp.prize || '₹2,00,000'}`}</span>
      </div>

      {/* 7. Location & Deadline */}
      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-1">
        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="truncate">Location: {locationText}</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-4">
        <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
        <span>Deadline: {deadlineFormatted}</span>
      </div>

      {/* 8. Bottom Action Buttons: Full-width Apply Now + Bookmark icon */}
      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-[var(--border-subtle)]">
        <button
          onClick={e => {
            e.stopPropagation();
            window.open(opp.applyLink, '_blank');
          }}
          className="btn-apply-card"
          id={`apply-${opp.id}`}
        >
          Apply Now
        </button>

        <button
          onClick={e => {
            e.stopPropagation();
            toggleSave(opp.id);
          }}
          className={`btn-bookmark-card ${saved ? 'saved' : ''}`}
          id={`save-${opp.id}`}
          title={saved ? 'Remove from saved' : 'Bookmark opportunity'}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const {
    searchQuery, activeCategory, setActiveCategory,
    profile, selectedOpportunity, setShowProfileModal, setProfileModalMode,
    theme, activeNav, setActiveNav, setShowAICopilot
  } = useAppStore();

  const strength = calculateProfileStrength(profile);

  // Filter list based on search and selected menu
  const filtered = useMemo(() => {
    let list = [...opportunities];

    if (activeNav === 'internships') {
      list = list.filter(o => o.category === 'Internship');
    } else if (activeNav === 'hackathons') {
      list = list.filter(o => o.category === 'Hackathon');
    } else if (activeNav === 'scholarships') {
      list = list.filter(o => o.category === 'Scholarship');
    } else if (activeNav === 'projects') {
      list = list.filter(o => o.category === 'OpenSource' || o.category === 'Course');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o =>
        o.title.toLowerCase().includes(q) ||
        o.organization.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    return list;
  }, [searchQuery, activeNav]);

  return (
    <div 
      className={`${theme} min-h-screen relative`}
      data-theme={theme}
      style={{ width: '100vw', background: 'var(--bg-app)', color: 'var(--text-main)' }}
    >
      {/* ── TOP NAVBAR ── */}
      <Navbar />

      {/* ── APP LAYOUT: SIDEBAR + MAIN AREA ── */}
      <div className="app-layout">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="left-sidebar">
          {/* Unique TalentOrbit Brand Logo */}
          <div className="mb-6 px-1">
            <BrandLogo />
          </div>

          {/* Student Career Passport Card (Clean, Unique Profile Badge, No Duplicate Names) */}
          <div 
            className="passport-card"
            onClick={() => {
              setProfileModalMode('view');
              setShowProfileModal(true);
            }}
            id="sidebar-passport-card"
          >
            {/* Top Passport Title with Status Pill */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold text-[var(--text-sub)] uppercase tracking-wider">
                Student Passport
              </span>
              <span className="text-[10px] font-bold text-teal-400 bg-teal-500/15 border border-teal-500/30 px-2 py-0.5 rounded-full">
                Verified ID
              </span>
            </div>

            {/* Profile Avatar & Primary Info */}
            <div className="flex items-center gap-3 mb-3">
              {/* Profile Avatar with Glowing Halo */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-teal-400/80 shadow-md shadow-teal-500/20">
                  <img
                    src={profile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={profile?.name || 'Rahul Sharma'}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Verified Shield Badge */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-teal-500 text-white flex items-center justify-center border-2 border-[#090e1a]">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Student Name & Academic Degree (Clean, Non-repetitive) */}
              <div className="min-w-0 flex-1">
                <h3 className="text-[var(--text-main)] text-sm font-extrabold truncate">
                  {profile?.name || 'Rahul Sharma'}
                </h3>
                <p className="text-[11px] font-semibold text-teal-400 truncate">
                  {profile?.degree || 'B.Tech CSE'} • <span className="font-extrabold">{profile?.education[0]?.cgpa || '8.7'} CGPA</span>
                </p>
                <p className="text-[10px] text-[var(--text-muted)] truncate flex items-center gap-1 mt-0.5">
                  <CollegeCrestLogo className="w-3.5 h-3.5" />
                  <span>{profile?.college || 'XYZ Institute of Technology'}</span>
                </p>
              </div>
            </div>

            {/* Glowing Gradient Progress Bar */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-[var(--text-sub)]">Profile Strength</span>
                <span className="text-teal-400">{strength}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[var(--border-strong)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 shadow-sm shadow-teal-400/50"
                  style={{ width: `${strength}%` }}
                />
              </div>
            </div>

            {/* Mini Verified Credentials Row */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-sub)]">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center gap-1">
                <SIHOfficialLogo className="w-2.5 h-2.5" /> SIH &apos;23
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center gap-1">
                <LeetCodeOfficialLogo className="w-2.5 h-2.5" /> 1850
              </span>
              <span className="ml-auto text-teal-400 hover:underline font-bold">
                View ↗
              </span>
            </div>
          </div>

          {/* Sidebar Menu Items (All Clickable & Interactive) */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveNav('dashboard')}
              className={`nav-menu-item ${activeNav === 'dashboard' ? 'active' : ''}`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-500" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveNav('internships')}
              className={`nav-menu-item ${activeNav === 'internships' ? 'active' : ''}`}
            >
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span>Internships</span>
            </button>

            <button
              onClick={() => setActiveNav('hackathons')}
              className={`nav-menu-item ${activeNav === 'hackathons' ? 'active' : ''}`}
            >
              <Rocket className="w-4 h-4 text-amber-500" />
              <span>Hackathons</span>
            </button>

            <button
              onClick={() => setActiveNav('scholarships')}
              className={`nav-menu-item ${activeNav === 'scholarships' ? 'active' : ''}`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>Scholarships</span>
            </button>

            <button
              onClick={() => setActiveNav('projects')}
              className={`nav-menu-item ${activeNav === 'projects' ? 'active' : ''}`}
            >
              <FolderCode className="w-4 h-4 text-purple-500" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => setActiveNav('mentorship')}
              className={`nav-menu-item ${activeNav === 'mentorship' ? 'active' : ''}`}
            >
              <Users className="w-4 h-4 text-indigo-500" />
              <span>Mentorship</span>
            </button>

            <button
              onClick={() => setActiveNav('events')}
              className={`nav-menu-item ${activeNav === 'events' ? 'active' : ''}`}
            >
              <CalendarDays className="w-4 h-4 text-rose-500" />
              <span>Events</span>
            </button>

            <button
              onClick={() => setActiveNav('settings')}
              className={`nav-menu-item ${activeNav === 'settings' ? 'active' : ''}`}
            >
              <Settings className="w-4 h-4 text-[var(--text-muted)]" />
              <span>Settings</span>
            </button>
          </nav>
        </aside>

        {/* ── MAIN CONTENT VIEW (SWITCHES BETWEEN DASHBOARD, MENTORSHIP, EVENTS, SETTINGS) ── */}
        <main className="main-view-area">
          {activeNav === 'mentorship' ? (
            <MentorshipView />
          ) : activeNav === 'events' ? (
            <EventsView />
          ) : activeNav === 'settings' ? (
            <SettingsView />
          ) : (
            <>
              {/* Section Header: Discover Opportunities (Matches) */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-[var(--text-main)] text-xl font-bold tracking-tight">
                  Discover Opportunities <span className="text-[var(--text-muted)] text-sm font-normal">({filtered.length} Matches)</span>
                </h1>

                {/* AI Copilot Quick Trigger */}
                <button
                  onClick={() => setShowAICopilot(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-bold transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Copilot Active</span>
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((opp, i) => (
                  <OpportunityCard key={opp.id} opp={opp} index={i} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* ── CORNER CIRCLE AI DASHBOARD BUTTON (REQUESTED BY USER IN CORNER WITH GOOD LOGO) ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAICopilot(true)}
          className="relative group p-0.5 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 shadow-2xl shadow-cyan-500/40 cursor-pointer"
          title="Open AI Career Copilot Dashboard (Gemini & Grok)"
          id="corner-ai-circle-btn"
        >
          {/* Pulsing halo ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 opacity-60 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />

          {/* Inner circle badge with good AI logo */}
          <div className="relative w-14 h-14 rounded-full bg-[#080c16] flex flex-col items-center justify-center text-white border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20" />
            <Cpu className="w-6 h-6 text-cyan-400 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-[9px] font-black text-cyan-300 tracking-tighter relative z-10 uppercase -mt-0.5">
              AI
            </span>
          </div>
        </motion.button>
      </div>

      {/* ── OVERLAYS: Clean Transparent Passport Modal, AI Copilot Dashboard, Saved Drawer, Detail Modal ── */}
      <ProfileModal />
      <SavedDrawer />
      <AICopilotModal />
      {selectedOpportunity && <OpportunityDetailModal opportunity={selectedOpportunity} />}
    </div>
  );
}
