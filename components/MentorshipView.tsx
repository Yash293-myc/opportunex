'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Star, Calendar, MessageSquare, Briefcase, CheckCircle2, 
  Sparkles, ExternalLink, ArrowRight, Video, ShieldCheck
} from 'lucide-react';
import CompanyLogo from '@/components/CompanyLogo';

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  reviews: number;
  experience: string;
  domains: string[];
  bio: string;
  avatarColor: string;
  initials: string;
  sessionsAvailable: number;
}

const MENTORS: Mentor[] = [
  {
    id: 'm-1',
    name: 'Ananya Deshmukh',
    role: 'Senior Software Engineer',
    company: 'Google',
    rating: 4.95,
    reviews: 84,
    experience: '6+ yrs exp',
    domains: ['Full Stack', 'System Design', 'GSoC Mentorship'],
    bio: 'Ex-Amazon, GSoC Mentor for 3 years. Helped 40+ engineering students land Tier-1 SDE roles and crack competitive hackathons.',
    avatarColor: 'from-blue-500 to-indigo-600',
    initials: 'AD',
    sessionsAvailable: 3,
  },
  {
    id: 'm-2',
    name: 'Vikramaditya Roy',
    role: 'Staff AI Researcher',
    company: 'Meta',
    rating: 4.98,
    reviews: 112,
    experience: '8+ yrs exp',
    domains: ['Machine Learning', 'NLP', 'Research Papers'],
    bio: 'Published at NeurIPS and CVPR. Specializes in guiding pre-final year students to research internships and AI residency programs.',
    avatarColor: 'from-purple-500 to-pink-600',
    initials: 'VR',
    sessionsAvailable: 2,
  },
  {
    id: 'm-3',
    name: 'Pooja Sundaram',
    role: 'Cloud Solutions Architect',
    company: 'Microsoft',
    rating: 4.92,
    reviews: 67,
    experience: '5+ yrs exp',
    domains: ['Azure', 'DevOps', 'Distributed Systems'],
    bio: 'Passionate about hands-on cloud architectures, hackathon problem framing, and engineering mock interviews.',
    avatarColor: 'from-cyan-500 to-teal-600',
    initials: 'PS',
    sessionsAvailable: 5,
  },
  {
    id: 'm-4',
    name: 'Rohan Mehra',
    role: 'Engineering Lead',
    company: 'Flipkart',
    rating: 4.89,
    reviews: 53,
    experience: '7+ yrs exp',
    domains: ['Backend Scaling', 'PostgreSQL', 'SIH Strategy'],
    bio: 'SIH National Winner in 2019. Mentored 15 winning teams in Flipkart Grid and national innovation hackathons.',
    avatarColor: 'from-amber-500 to-orange-600',
    initials: 'RM',
    sessionsAvailable: 4,
  },
];

export default function MentorshipView() {
  const [bookedId, setBookedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* ─── HIGH CONTRAST VIBRANT BANNER (CRISP IN BOTH DARK & LIGHT MODE) ─── */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 p-6 sm:p-8 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-[11px] font-black uppercase tracking-wider text-cyan-200 bg-white/15 px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
            1:1 Student Mentorship
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Learn from Engineers at Top Tech Companies
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
            Get personalized resume reviews, mock interviews, and hackathon project advice from verified senior engineers at Google, Microsoft, Meta, and Flipkart.
          </p>
        </div>
      </div>

      {/* ─── MENTORS GRID (HIGH-CONTRAST IN BOTH MODES) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MENTORS.map((mentor, i) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 sm:p-6 shadow-md flex flex-col justify-between hover:border-blue-500/50 hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3.5">
                  {/* Distinct, High-Quality Avatar Badge with Initials & Verified Ring */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${mentor.avatarColor} p-0.5 flex-shrink-0 shadow-md`}>
                    <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center font-black text-white text-sm">
                      {mentor.initials}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[var(--text-main)] text-sm sm:text-base font-black flex items-center gap-1.5">
                      <span>{mentor.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                    </h3>
                    <p className="text-xs font-semibold text-[var(--text-muted)]">{mentor.role}</p>
                    <div className="mt-1">
                      <CompanyLogo organization={mentor.company} className="h-4" />
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-black text-amber-500 dark:text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{mentor.rating}</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] font-semibold">({mentor.reviews} reviews)</span>
                </div>
              </div>

              {/* Bio with High Contrast Text */}
              <p className="text-xs text-[var(--text-sub)] leading-relaxed clamp2 mb-4 font-normal">
                {mentor.bio}
              </p>

              {/* Domain Skill Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {mentor.domains.map(d => (
                  <span key={d} className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-300 text-xs font-bold">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                <span>{mentor.sessionsAvailable} slots available this week</span>
              </span>

              <button
                onClick={() => {
                  setBookedId(mentor.id);
                  setTimeout(() => setBookedId(null), 3000);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  bookedId === mentor.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90'
                }`}
              >
                {bookedId === mentor.id ? '✓ Slot Requested' : 'Book 1:1 Session'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
