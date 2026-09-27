'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Bookmark, ExternalLink, MapPin, Clock, Trophy, Star, Wifi, Tag, CheckCircle } from 'lucide-react';
import { Opportunity, calculateMatchScore } from '@/lib/opportunities';
import { useAppStore } from '@/lib/store';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface OpportunityDetailModalProps {
  opportunity: Opportunity;
}

const categoryColors: Record<string, string> = {
  Internship: 'from-blue-500 to-cyan-500',
  Hackathon: 'from-orange-500 to-amber-500',
  Course: 'from-emerald-500 to-teal-500',
  Scholarship: 'from-yellow-500 to-amber-600',
  OpenSource: 'from-violet-500 to-purple-600',
};

const difficultyColors: Record<string, string> = {
  Beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function OpportunityDetailModal({ opportunity }: OpportunityDetailModalProps) {
  const { selectedOpportunity, setSelectedOpportunity, toggleSave, isSaved, profile } = useAppStore();
  const saved = isSaved(opportunity.id);
  
  const matchScore = profile?.skills.length || profile?.interests.length
    ? calculateMatchScore(profile.skills, profile.interests, opportunity)
    : null;

  const deadlineDate = parseISO(opportunity.deadline);
  const deadlineText = formatDistanceToNow(deadlineDate, { addSuffix: true });
  const isPast = deadlineDate < new Date();

  return (
    <AnimatePresence>
      {selectedOpportunity?.id === opportunity.id && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedOpportunity(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl z-10"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Header gradient banner */}
            <div className={`h-24 bg-gradient-to-r ${categoryColors[opportunity.category] || 'from-indigo-500 to-violet-600'} rounded-t-2xl relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              {opportunity.featured && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                  <Star className="w-3 h-3" /> Featured
                </div>
              )}
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-6 -mt-8 relative">
              {/* Org logo */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColors[opportunity.category] || 'from-indigo-500 to-violet-600'} flex items-center justify-center text-white font-bold text-lg shadow-xl mb-4 border-2 border-white/10`}>
                {opportunity.orgLogo}
              </div>

              {/* Title & org */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{opportunity.title}</h2>
                    <p className="text-white/60">{opportunity.organization}</p>
                  </div>
                  {matchScore !== null && matchScore > 0 && (
                    <div className="flex-shrink-0 text-center">
                      <div className="text-2xl font-bold text-emerald-400">{matchScore}%</div>
                      <div className="text-xs text-white/50">Match</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${categoryColors[opportunity.category]} text-white`}>
                  {opportunity.category}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${difficultyColors[opportunity.difficulty]}`}>
                  {opportunity.difficulty}
                </span>
                {opportunity.remote && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">
                    <Wifi className="w-3 h-3" /> Remote
                  </span>
                )}
                <span className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium border ${isPast ? 'text-red-400 bg-red-400/10 border-red-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'}`}>
                  <Clock className="w-3 h-3" />
                  {isPast ? 'Deadline passed' : `Closes ${deadlineText}`}
                </span>
              </div>

              {/* Reward */}
              {(opportunity.stipend || opportunity.prize) && (
                <div className="glass-chip rounded-xl p-4 mb-5 flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Reward / Stipend</p>
                    <p className="text-white font-semibold">{opportunity.stipend || opportunity.prize}</p>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-2 text-white/60 text-sm mb-5">
                <MapPin className="w-4 h-4 text-indigo-400" />
                {opportunity.location}
              </div>

              {/* Description */}
              <p className="text-white/70 leading-relaxed mb-5">{opportunity.description}</p>

              {/* Eligibility */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-white/80 mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Eligibility
                </h3>
                <ul className="space-y-1.5">
                  {opportunity.eligibility.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white/80 mb-2 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-indigo-400" /> Required Skills
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {opportunity.skills.map(skill => {
                    const isMatch = profile?.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase());
                    return (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 rounded-lg text-xs border ${isMatch
                          ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                          : 'glass-chip text-white/50'
                        }`}
                      >
                        {isMatch && <CheckCircle className="w-3 h-3 inline mr-1 text-indigo-400" />}
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => toggleSave(opportunity.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl glass-btn transition-all duration-200 ${
                    saved
                      ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                      : 'hover:bg-white/10 text-white/60 hover:text-white'
                  }`}
                  id={`modal-save-${opportunity.id}`}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                  {saved ? 'Saved' : 'Save'}
                </button>
                <a
                  href={opportunity.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25"
                  id={`apply-${opportunity.id}`}
                >
                  Apply Now <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
