'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Bookmark, ExternalLink, Clock, Trophy } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { opportunities } from '@/lib/opportunities';
import { formatDistanceToNow, parseISO } from 'date-fns';

export default function SavedDrawer() {
  const { savedIds, showSavedDrawer, setShowSavedDrawer, toggleSave, setSelectedOpportunity } = useAppStore();
  const savedOpportunities = opportunities.filter(o => savedIds.includes(o.id));

  return (
    <AnimatePresence>
      {showSavedDrawer && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowSavedDrawer(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm glass-panel border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">Saved Opportunities</h2>
                  <p className="text-xs text-white/40">{savedOpportunities.length} item{savedOpportunities.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={() => setShowSavedDrawer(false)}
                className="glass-btn p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ scrollbarWidth: 'none' }}>
              {savedOpportunities.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl glass-chip flex items-center justify-center">
                    <Bookmark className="w-8 h-8 text-white/20" />
                  </div>
                  <div>
                    <p className="text-white/60 font-medium">No saved opportunities yet</p>
                    <p className="text-white/30 text-sm mt-1">Click the bookmark icon on any card to save it here.</p>
                  </div>
                </div>
              ) : (
                savedOpportunities.map((opp, i) => {
                  const deadline = parseISO(opp.deadline);
                  const isPast = deadline < new Date();
                  const deadlineText = formatDistanceToNow(deadline, { addSuffix: true });

                  return (
                    <motion.div
                      key={opp.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-chip rounded-xl p-4 cursor-pointer hover:bg-white/5 transition-colors group"
                      onClick={() => { setSelectedOpportunity(opp); setShowSavedDrawer(false); }}
                      id={`saved-${opp.id}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm font-medium group-hover:text-indigo-300 transition-colors truncate">
                            {opp.title}
                          </h3>
                          <p className="text-white/40 text-xs mt-0.5">{opp.organization}</p>

                          <div className="flex items-center gap-2 mt-2">
                            {(opp.stipend || opp.prize) && (
                              <span className="flex items-center gap-1 text-xs text-amber-400">
                                <Trophy className="w-3 h-3" />
                                <span className="truncate max-w-[120px]">{opp.stipend || opp.prize}</span>
                              </span>
                            )}
                            <span className={`flex items-center gap-1 text-xs ${isPast ? 'text-red-400' : 'text-white/40'}`}>
                              <Clock className="w-3 h-3" />
                              {isPast ? 'Closed' : deadlineText}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <button
                            onClick={e => { e.stopPropagation(); toggleSave(opp.id); }}
                            className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center hover:bg-red-500/20 transition-colors group/btn"
                            aria-label="Remove from saved"
                          >
                            <X className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-red-400 transition-colors" />
                          </button>
                          <a
                            href={opp.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="w-7 h-7 rounded-lg glass-btn flex items-center justify-center hover:bg-indigo-500/20 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-white/40 hover:text-indigo-400 transition-colors" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
