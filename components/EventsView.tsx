'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, Clock, MapPin, Users, Trophy, ExternalLink, 
  CheckCircle2, Sparkles, Tag, ArrowRight
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
      {/* Header Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-rose-950/40 via-amber-950/30 to-purple-950/40 p-6 backdrop-blur-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20 inline-block">
            Student Technical Events
          </span>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Live Hackathons, Workshops & Recruiter Webinars
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Attend live masterclasses by tech leaders and org maintainers to prepare your applications, win competitions, and connect directly with campus hiring managers.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EVENTS.map((event, i) => {
          const isRegistered = registeredIds.includes(event.id);

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-lg flex flex-col justify-between hover:border-rose-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 border border-rose-500/30">
                    {event.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <div className="mb-2">
                  <CompanyLogo organization={event.organizer} className="h-5" />
                </div>

                <h3 className="text-white text-sm font-bold leading-snug mb-2">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed clamp2 mb-3">
                  {event.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-400 mb-4 bg-[var(--pill-bg)] p-3 rounded-xl border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-200 font-semibold">{event.date}</span>
                    <span className="text-slate-500">•</span>
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Speakers: <span className="text-slate-300">{event.speakers.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-xs">
                <div className="flex gap-1.5 flex-wrap">
                  {event.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toggleRegister(event.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isRegistered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'btn-apply-card !flex-initial'
                  }`}
                >
                  {isRegistered ? '✓ Registered' : 'RSVP Free'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
