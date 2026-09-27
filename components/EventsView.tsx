'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, Clock, MapPin, Users, Trophy, ExternalLink, 
  CheckCircle2, Sparkles, Tag, ArrowRight, Video
} from 'lucide-react';
import CompanyLogo from '@/components/CompanyLogo';

interface EventItem {
  id: string;
  title: string;
  organizer: string;
  type: 'Hackathon Kickoff' | 'Webinar' | 'AMA Session' | 'Tech Workshop';
  date: string;
  time: string;
  speakers: string[];
  attendees: number;
  description: string;
  tags: string[];
}

const EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Smart India Hackathon 2026: Winning Strategy & Pitch Masterclass',
    organizer: 'SIH India',
    type: 'Hackathon Kickoff',
    date: '10 Oct 2026',
    time: '6:00 PM – 7:30 PM IST',
    speakers: ['Dr. Mohit Sharma (AICTE)', 'Rahul Verma (Ex-SIH Winner)'],
    attendees: 1420,
    description: 'Learn how top judges evaluate hardware & software problem statements, structure 36-hour sprints, and build deployable MVPs.',
    tags: ['Hackathons', 'SIH 2026', 'Pitching']
  },
  {
    id: 'ev-2',
    title: 'Google Summer of Code: Proposal Writing & Open Source Code Review',
    organizer: 'Google',
    type: 'Tech Workshop',
    date: '18 Oct 2026',
    time: '7:00 PM – 8:30 PM IST',
    speakers: ['Siddharth Jain (GSoC Mentor)', 'Kavya Rao (Org Admin)'],
    attendees: 890,
    description: 'Deconstruct real accepted GSoC proposals, review pull requests with maintainers, and learn communication standards for Linux Foundation and Apache projects.',
    tags: ['GSoC', 'Open Source', 'Git']
  },
  {
    id: 'ev-3',
    title: 'Cracking Microsoft SDE Internships: LeetCode to System Design',
    organizer: 'Microsoft',
    type: 'Webinar',
    date: '25 Oct 2026',
    time: '5:00 PM – 6:30 PM IST',
    speakers: ['Priya Nambiar (Senior Tech Recruiter, Microsoft)'],
    attendees: 2100,
    description: 'Inside look into Microsoft candidate selection, online assessments (OA), core DSA patterns, and behavioral STAR interview framework.',
    tags: ['Internships', 'DSA', 'Interview Prep']
  },
  {
    id: 'ev-4',
    title: 'Generative AI & LLM App Architecture with Cloudflare Workers',
    organizer: 'Cloudflare',
    type: 'Tech Workshop',
    date: '02 Nov 2026',
    time: '6:30 PM – 8:00 PM IST',
    speakers: ['Alex Chen (Developer Advocate, Cloudflare)'],
    attendees: 740,
    description: 'Hands-on live coding workshop deploying vector embeddings, KV databases, and edge AI workers with free student cloud credits.',
    tags: ['Cloud', 'AI/ML', 'Serverless']
  }
];

export default function EventsView() {
  const [registeredIds, setRegisteredIds] = useState<string[]>(['ev-1']);

  const toggleRegister = (id: string) => {
    setRegisteredIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* ─── HIGH CONTRAST VIBRANT BANNER ─── */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-rose-600 p-6 sm:p-8 text-white shadow-xl shadow-purple-900/20 relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-[11px] font-black uppercase tracking-wider text-rose-200 bg-white/15 px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            Student Technical Events
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Live Hackathons, Workshops & Recruiter Webinars
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium">
            Attend live masterclasses by tech leaders and org maintainers to prepare your applications, win competitions, and connect directly with campus hiring managers.
          </p>
        </div>
      </div>

      {/* ─── EVENTS GRID (HIGH-CONTRAST IN BOTH LIGHT & DARK) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EVENTS.map((event, i) => {
          const isRegistered = registeredIds.includes(event.id);

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 sm:p-6 shadow-md flex flex-col justify-between hover:border-purple-500/50 hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                    {event.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-semibold">
                    <Users className="w-3.5 h-3.5" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <div className="mb-2">
                  <CompanyLogo organization={event.organizer} className="h-5" />
                </div>

                <h3 className="text-[var(--text-main)] text-sm sm:text-base font-black leading-snug mb-2">
                  {event.title}
                </h3>

                <p className="text-xs text-[var(--text-sub)] leading-relaxed clamp2 mb-4 font-normal">
                  {event.description}
                </p>

                <div className="space-y-1.5 text-xs text-[var(--text-muted)] mb-4 bg-[var(--pill-bg)] p-3.5 rounded-xl border border-[var(--border-subtle)] font-medium">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                    <span className="text-[var(--text-main)] font-bold">{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-sub)]">
                    <span className="font-bold text-[var(--text-main)]">Speakers:</span>
                    <span className="truncate">{event.speakers.join(', ')}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {event.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-[var(--pill-bg)] border border-[var(--border-subtle)] text-[var(--text-muted)] text-[11px] font-semibold">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => toggleRegister(event.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                    isRegistered
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90'
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Registered (Ticket Confirmed)</span>
                    </>
                  ) : (
                    <span>RSVP Free</span>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
