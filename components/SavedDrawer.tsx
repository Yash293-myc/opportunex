'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Bookmark, ExternalLink, Clock, ArrowUpRight, Sparkles, Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { opportunities } from '@/lib/opportunities';
import { formatDistanceToNow, parseISO } from 'date-fns';

const categoryPillClass: Record<string, string> = {
  Internship: 'pill-internship',
  Hackathon: 'pill-hackathon',
  Scholarship: 'pill-scholarship',
  Course: 'pill-course',
  OpenSource: 'pill-opensource',
};

export default function SavedDrawer() {
  const { savedIds, showSavedDrawer, setShowSavedDrawer, toggleSave, setSelectedOpportunity } = useAppStore();
  const savedOpps = opportunities.filter(o => savedIds.includes(o.id));

  return (
    <AnimatePresence>
      {showSavedDrawer && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay fixed inset-0 z-40"
            onClick={() => setShowSavedDrawer(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 flex flex-col bg-slate-900 border-l border-slate-800 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Bookmark className="w-4 h-4 fill-rose-400/20 text-rose-400" />
                </div>
                <div>
                  <h2 className="text-white text-sm font-bold tracking-tight">Saved Opportunities</h2>
                  <p className="text-slate-400 text-xs">{savedOpps.length} item{savedOpps.length !== 1 ? 's' : ''} bookmarked</p>
                </div>
              </div>
              <button
                onClick={() => setShowSavedDrawer(false)}
                className="w-7 h-7 rounded-md border border-slate-700 bg-slate-800/80 flex items-center justify-center hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5" style={{ scrollbarWidth: 'thin' }}>
              {savedOpps.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-20">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-600">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <p className="text-white text-sm font-bold">No saved items yet</p>
                  <p className="text-slate-400 text-xs max-w-xs">
                    Click the bookmark icon on any opportunity card to save it for quick review and deadlines.
                  </p>
                </div>
              ) : (
                savedOpps.map((opp, i) => {
                  const deadline = parseISO(opp.deadline);
                  const isPast = deadline < new Date();
                  const deadlineText = isPast
                    ? 'Closed'
                    : formatDistanceToNow(deadline, { addSuffix: true });

                  return (
                    <motion.div
                      key={opp.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="rounded-xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 p-3.5 cursor-pointer hover:border-slate-700 transition-all group"
                      onClick={() => { setSelectedOpportunity(opp); setShowSavedDrawer(false); }}
                      id={`saved-${opp.id}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <span className={`pill text-[10px] py-0.5 px-2 mb-1.5 ${categoryPillClass[opp.category] || ''}`}>
                            {opp.category}
                          </span>
                          <h3 className="text-slate-200 text-xs font-bold leading-snug truncate group-hover:text-indigo-300 transition-colors">
                            {opp.title}
                          </h3>
                          <p className="text-slate-400 text-[11px] mt-0.5">{opp.organization}</p>
                        </div>
                        <div className="flex flex-col gap-1 flex-shrink-0">
                          <button
                            onClick={e => { e.stopPropagation(); toggleSave(opp.id); }}
                            className="w-6 h-6 rounded-md border border-slate-700 bg-slate-800 flex items-center justify-center hover:border-rose-500/50 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                        <span className={`flex items-center gap-1 font-medium ${isPast ? 'text-slate-600' : 'text-slate-400'}`}>
                          <Clock className="w-3 h-3" />
                          {deadlineText}
                        </span>
                        <a
                          href={opp.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold"
                        >
                          Apply <ArrowUpRight className="w-3 h-3" />
                        </a>
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
