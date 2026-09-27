'use client';

import { motion } from 'framer-motion';
import { Bookmark, ExternalLink, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Opportunity, calculateMatchScore } from '@/lib/opportunities';
import { useAppStore } from '@/lib/store';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface OpportunityCardProps {
  opportunity: Opportunity;
  index: number;
}

// Clean accent color per category — subtle, not loud
const categoryAccent: Record<string, string> = {
  Internship:  '#888',
  Hackathon:   '#888',
  Course:      '#888',
  Scholarship: '#888',
  OpenSource:  '#888',
};

const categoryLabel: Record<string, string> = {
  Internship:  'Internship',
  Hackathon:   'Hackathon',
  Course:      'Course',
  Scholarship: 'Scholarship',
  OpenSource:  'Open Source',
};

export default function OpportunityCard({ opportunity, index }: OpportunityCardProps) {
  const { toggleSave, isSaved, setSelectedOpportunity, profile } = useAppStore();
  const saved = isSaved(opportunity.id);

  const matchScore =
    profile && (profile.skills.length > 0 || profile.interests.length > 0)
      ? calculateMatchScore(profile.skills, profile.interests, opportunity)
      : null;

  const deadlineDate = parseISO(opportunity.deadline);
  const isPast = deadlineDate < new Date();
  const isUrgent =
    !isPast &&
    deadlineDate.getTime() - Date.now() < 1000 * 60 * 60 * 24 * 14;
  const deadlineText = isPast
    ? 'Closed'
    : formatDistanceToNow(deadlineDate, { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="opp-card group"
      onClick={() => setSelectedOpportunity(opportunity)}
      id={`card-${opportunity.id}`}
    >
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Org logo + name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-[#222] flex items-center justify-center text-[11px] font-bold text-[#888] flex-shrink-0">
              {opportunity.orgLogo.slice(0, 2)}
            </div>
            <div>
              <p className="text-[#444] text-xs mb-0.5">{opportunity.organization}</p>
              <h3 className="text-[#e8e8e8] text-sm font-semibold leading-snug group-hover:text-white transition-colors clamp-2">
                {opportunity.title}
              </h3>
            </div>
          </div>

          {/* Bookmark */}
          <button
            onClick={e => { e.stopPropagation(); toggleSave(opportunity.id); }}
            className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 border transition-all ${
              saved
                ? 'border-[#333] bg-[#1a1a1a] text-white'
                : 'border-[#1a1a1a] text-[#333] hover:text-[#666] hover:border-[#2a2a2a]'
            }`}
            id={`save-${opportunity.id}`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Description */}
        <p className="text-[#555] text-xs leading-relaxed clamp-2 mb-4">
          {opportunity.description}
        </p>

        {/* Tags row */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <span className="pill">{categoryLabel[opportunity.category]}</span>
          {opportunity.remote && <span className="pill">Remote</span>}
          {matchScore !== null && matchScore > 0 && (
            <span className={`pill ml-auto ${matchScore >= 60 ? '!text-white !border-[#333] !bg-[#1a1a1a]' : ''}`}>
              {matchScore}% match
            </span>
          )}
        </div>

        {/* Reward */}
        {(opportunity.stipend || opportunity.prize) && (
          <p className="text-[#777] text-xs mb-3 truncate">
            {opportunity.stipend || opportunity.prize}
          </p>
        )}

        {/* Bottom row */}
        <hr className="divider mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#444] text-xs">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[90px]">
                {opportunity.remote ? 'Remote' : opportunity.location.split(',')[0]}
              </span>
            </span>
            <span className={`flex items-center gap-1 text-xs ${
              isPast ? 'text-[#555]' : isUrgent ? 'text-[#aaa]' : 'text-[#444]'
            }`}>
              <Clock className="w-3 h-3" />
              {deadlineText}
            </span>
          </div>

          <button
            onClick={e => { e.stopPropagation(); window.open(opportunity.applyLink, '_blank'); }}
            className="flex items-center gap-1 text-[11px] text-[#555] hover:text-[#999] transition-colors"
            id={`apply-${opportunity.id}`}
          >
            Apply <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
