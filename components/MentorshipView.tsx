'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Star, Calendar, MessageSquare, Briefcase, CheckCircle2, 
  Sparkles, ExternalLink, ArrowRight, Video
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
  avatar: string;
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
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
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
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
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
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    sessionsAvailable: 4,
  },
];

export default function MentorshipView() {
  const [bookedId, setBookedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 p-6 backdrop-blur-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 inline-block">
            1:1 Student Mentorship
          </span>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Learn from Engineers at Top Tech Companies
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Get personalized resume reviews, mock interviews, and hackathon project advice from verified senior engineers at Google, Microsoft, Meta, and Flipkart.
          </p>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MENTORS.map((mentor, i) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-lg flex flex-col justify-between hover:border-blue-500/40 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30 flex-shrink-0">
                    <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-bold flex items-center gap-1.5">
                      {mentor.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    </h3>
                    <p className="text-xs text-slate-400">{mentor.role}</p>
                    <div className="mt-1">
                      <CompanyLogo organization={mentor.company} className="h-4" />
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{mentor.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">({mentor.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed clamp2 mb-3">
                {mentor.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {mentor.domains.map(d => (
                  <span key={d} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Video className="w-3.5 h-3.5" /> {mentor.sessionsAvailable} slots this week
              </span>
              <button
                onClick={() => {
                  setBookedId(mentor.id);
                  setTimeout(() => setBookedId(null), 3000);
                }}
                className="btn-apply-card !flex-initial px-4 py-1.5 text-xs"
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
