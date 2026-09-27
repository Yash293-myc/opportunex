'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Bookmark, ExternalLink, MapPin, Clock, CheckCircle2, 
  ArrowUpRight, Trophy, Sparkles, Star, Wifi, Shield, Building2,
  Calendar, Check, ChevronRight
} from 'lucide-react';
import { Opportunity, calculateMatchScore } from '@/lib/opportunities';
import { useAppStore } from '@/lib/store';
import CompanyLogo from '@/components/CompanyLogo';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface Props { 
  opportunity: Opportunity;
}

const categoryPillClass: Record<string, string> = {
  Internship: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Hackathon: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Scholarship: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Course: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  OpenSource: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

export default function OpportunityDetailModal({ opportunity }: Props) {
  const { selectedOpportunity, setSelectedOpportunity, toggleSave, isSaved, profile } = useAppStore();
  const saved = isSaved(opportunity.id);

  const userSkills = profile?.technicalSkills || profile?.skills || [];
  const userInterests = profile?.interests || [];

  const rawMatchScore = (userSkills.length > 0 || userInterests.length > 0)
    ? calculateMatchScore(userSkills, userInterests, opportunity)
    : 92;
  const matchScore = rawMatchScore > 0 ? Math.max(88, rawMatchScore) : 94;

  const deadlineDate = parseISO(opportunity.deadline);
  const isPast = deadlineDate < new Date();
  const deadlineText = isPast ? 'Deadline passed' : `${formatDistanceToNow(deadlineDate, { addSuffix: true })} (${deadlineDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })})`;

  return (
    <AnimatePresence>
      {selectedOpportunity?.id === opportunity.id && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Solid Darkened Backdrop Overlay (Blocks all background text) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedOpportunity(null)}
          />

          {/* Clean, Completely Solid, Opaque Opportunity Modal (No Transparency Bleed) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-2xl z-10 overflow-hidden rounded-3xl border border-slate-700/80 bg-[#0d1424] text-slate-100 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh]"
            style={{ backgroundColor: '#0d1424' }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 p-6 sm:p-7 border-b border-slate-800 bg-[#0a0f1d]">
              <div className="flex items-start gap-4">
                {/* Official Company Logo */}
                <div className="p-2.5 rounded-2xl bg-[#141d33] border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-md">
                  <CompanyLogo organization={opportunity.organization} showText={false} className="w-8 h-8" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400">{opportunity.organization}</span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${categoryPillClass[opportunity.category] || 'bg-blue-500/15 text-blue-400'}`}>
                      {opportunity.category}
                    </span>
                    {opportunity.featured && (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-amber-300" /> Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-white font-extrabold text-lg sm:text-xl leading-snug">
                    {opportunity.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedOpportunity(null)}
                className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-800/80 flex items-center justify-center hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content (Clean, Solid, High Legibility) */}
            <div className="p-6 sm:p-7 space-y-6 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {/* Highlight Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Stipend / Prize */}
                <div className="p-3.5 rounded-2xl bg-[#131c31] border border-slate-800">
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Trophy className="w-3.5 h-3.5" />
                    {opportunity.stipend ? 'Stipend' : 'Prize Pool'}
                  </p>
                  <p className="text-white font-black text-sm">
                    {opportunity.stipend || opportunity.prize || 'Industry Standard'}
                  </p>
                </div>

                {/* Match Score */}
                <div className="p-3.5 rounded-2xl bg-[#131c31] border border-slate-800">
                  <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Fit Score
                  </p>
                  <p className="text-cyan-300 font-black text-sm">
                    {matchScore}% Match
                  </p>
                </div>

                {/* Deadline */}
                <div className="p-3.5 rounded-2xl bg-[#131c31] border border-slate-800">
                  <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    Deadline
                  </p>
                  <p className="text-white font-bold text-xs truncate" title={deadlineText}>
                    {deadlineText}
                  </p>
                </div>
              </div>

              {/* Location & Work Mode */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 p-3.5 rounded-2xl bg-[#11192c] border border-slate-800">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span><strong>Location:</strong> {opportunity.location}</span>
                </div>
                {opportunity.remote && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1">
                    <Wifi className="w-3 h-3" /> Remote Available
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Role Overview
                </h4>
                <p className="text-slate-200 text-sm leading-relaxed bg-[#11192c] p-4 rounded-2xl border border-slate-800">
                  {opportunity.description}
                </p>
              </div>

              {/* Eligibility Criteria */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Eligibility & Requirements
                </h4>
                <div className="space-y-2 bg-[#11192c] p-4 rounded-2xl border border-slate-800">
                  {opportunity.eligibility.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Evaluated */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Skills Evaluated
                </h4>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map(skill => {
                    const isMatched = userSkills.some(s => s.toLowerCase() === skill.toLowerCase());
                    return (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${
                          isMatched 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                            : 'bg-[#141d33] text-slate-300 border-slate-700'
                        }`}
                      >
                        {isMatched && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        {skill}
                        {isMatched && <span className="text-[10px] text-emerald-400">(In your profile)</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar (Clean, Solid) */}
            <div className="p-5 sm:p-6 border-t border-slate-800 bg-[#0a0f1d] flex items-center gap-3">
              <button
                onClick={() => window.open(opportunity.applyLink, '_blank')}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>Apply on Official Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleSave(opportunity.id)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center ${
                  saved 
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' 
                    : 'bg-[#141d33] border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
                }`}
                title={saved ? 'Remove from saved' : 'Save opportunity'}
              >
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
