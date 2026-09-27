'use client';

import { motion } from 'framer-motion';
import { Bookmark, ExternalLink, MapPin, Clock, Star, Wifi, Trophy } from 'lucide-react';
import { Opportunity, calculateMatchScore } from '@/lib/opportunities';
import { useAppStore } from '@/lib/store';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface OpportunityCardProps {
  opportunity: Opportunity;
  index: number;
}

const categoryColors: Record<string, string> = {
  Internship: 'from-blue-500 to-cyan-500',
  Hackathon: 'from-orange-500 to-amber-500',
  Course: 'from-emerald-500 to-teal-500',
  Scholarship: 'from-yellow-500 to-amber-600',
  OpenSource: 'from-violet-500 to-purple-600',
};

const categoryBg: Record<string, string> = {
  Internship: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
  Hackathon: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
  Course: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
  Scholarship: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
  OpenSource: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
};

export default function OpportunityCard({ opportunity, index }: OpportunityCardProps) {
  const { toggleSave, isSaved, setSelectedOpportunity, profile } = useAppStore();
  const saved = isSaved(opportunity.id);

  const matchScore = profile?.skills.length || profile?.interests.length
    ? calculateMatchScore(profile.skills, profile.interests, opportunity)
    : null;

  const deadlineDate = parseISO(opportunity.deadline);
  const deadlineText = formatDistanceToNow(deadlineDate, { addSuffix: true });
  const isUrgent = (deadlineDate.getTime() - Date.now()) < 1000 * 60 * 60 * 24 * 14; // 14 days
  const isPast = deadlineDate < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="opportunity-card group relative rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => setSelectedOpportunity(opportunity)}
      whileHover={{ y: -4 }}
      id={`card-${opportunity.id}`}
    >
      {/* Gradient top border */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${categoryColors[opportunity.category]}`} />

      {/* Hover glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${categoryColors[opportunity.category]} rounded-2xl`}
        style={{ opacity: 0.03 }}
      />

      <div className="relative p-5">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Org avatar */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[opportunity.category]} flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}>
              {opportunity.orgLogo}
            </div>
            <div>
              <p className="text-white/50 text-xs mb-0.5">{opportunity.organization}</p>
              <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-indigo-300 transition-colors">
                {opportunity.title}
              </h3>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {opportunity.featured && (
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              </span>
            )}
            <button
              onClick={e => { e.stopPropagation(); toggleSave(opportunity.id); }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                saved
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'glass-chip text-white/40 hover:text-white/80 hover:bg-white/10'
              }`}
              id={`save-${opportunity.id}`}
              aria-label={saved ? 'Remove bookmark' : 'Bookmark opportunity'}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">
          {opportunity.description}
        </p>

        {/* Match score + category */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${categoryBg[opportunity.category]}`}>
            {opportunity.category}
          </span>
          {opportunity.remote && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">
              <Wifi className="w-3 h-3" /> Remote
            </span>
          )}
          {matchScore !== null && matchScore > 0 && (
            <span className={`ml-auto px-2.5 py-1 rounded-lg text-xs font-bold ${
              matchScore >= 70
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : matchScore >= 40
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-white/5 text-white/40 border border-white/10'
            }`}>
              {matchScore}% match
            </span>
          )}
        </div>

        {/* Reward */}
        {(opportunity.stipend || opportunity.prize) && (
          <div className="flex items-center gap-1.5 mb-3 text-xs text-amber-400">
            <Trophy className="w-3 h-3" />
            <span className="truncate">{opportunity.stipend || opportunity.prize}</span>
          </div>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-white/40">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{opportunity.remote ? 'Remote' : opportunity.location}</span>
            </span>
            <span className={`flex items-center gap-1 text-xs ${isPast ? 'text-red-400' : isUrgent ? 'text-orange-400' : 'text-white/40'}`}>
              <Clock className="w-3 h-3" />
              {isPast ? 'Closed' : deadlineText}
            </span>
          </div>
          <button
            onClick={e => { e.stopPropagation(); window.open(opportunity.applyLink, '_blank'); }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass-btn text-xs text-white/60 hover:text-white hover:bg-indigo-500/20 transition-all duration-200"
            id={`quick-apply-${opportunity.id}`}
          >
            Apply <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
