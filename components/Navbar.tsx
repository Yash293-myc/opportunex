'use client';

import { Sparkles, User, Bookmark, Menu, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';

export default function Navbar() {
  const { profile, setShowProfileModal, savedIds, setShowSavedDrawer } = useAppStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-base hidden sm:block">OpportunityAI</span>
            <span className="text-white/40 text-[10px] hidden sm:block tracking-widest uppercase">Smart Career Matcher</span>
          </div>
        </div>

        {/* Nav links – desktop */}
        <div className="hidden md:flex items-center gap-1">
          <a href="#opportunities" className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
            Explore
          </a>
          <a href="#dashboard" className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
            Dashboard
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Saved bookmark button */}
          <button
            onClick={() => setShowSavedDrawer(true)}
            className="relative glass-btn px-3 py-2 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-1.5"
            id="saved-drawer-btn"
            aria-label="View saved opportunities"
          >
            <Bookmark className="w-4 h-4 text-white/60" />
            {savedIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center">
                {savedIds.length}
              </span>
            )}
            <span className="text-xs text-white/60 hidden sm:block">Saved</span>
          </button>

          {/* Profile button */}
          <button
            onClick={() => setShowProfileModal(true)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
              profile?.name
                ? 'bg-indigo-600/30 border border-indigo-500/30 hover:bg-indigo-600/50'
                : 'glass-btn hover:bg-white/10'
            }`}
            id="profile-btn"
            aria-label="Edit student profile"
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
              profile?.name
                ? 'bg-indigo-500 text-white'
                : 'bg-white/10 text-white/60'
            }`}>
              {profile?.name ? profile.name[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
            </div>
            <span className="text-xs text-white/70 hidden sm:block max-w-[80px] truncate">
              {profile?.name || 'Set Profile'}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden glass-btn p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X className="w-4 h-4 text-white/60" /> : <Menu className="w-4 h-4 text-white/60" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 px-4 py-3 flex flex-col gap-1">
          <a href="#opportunities" className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
            Explore
          </a>
          <a href="#dashboard" className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
            Dashboard
          </a>
        </div>
      )}
    </nav>
  );
}
