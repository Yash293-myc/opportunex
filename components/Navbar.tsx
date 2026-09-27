'use client';

import { Search, Bookmark, ChevronDown, Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import BrandLogo from '@/components/BrandLogo';

export default function Navbar() {
  const { 
    profile, setShowProfileModal, savedIds, setShowSavedDrawer, 
    searchQuery, setSearchQuery, setProfileModalMode, theme, toggleTheme 
  } = useAppStore();

  return (
    <header className="top-navbar">
      {/* ─── 1. BRAND LOGO AT THE TOP LEFT (EXACTLY AS UNSTOP / LINKEDIN) ─── */}
      <div className="flex-shrink-0 mr-4 sm:mr-8">
        <BrandLogo textSize="text-xl sm:text-2xl" />
      </div>

      {/* ─── 2. SEARCH INPUT (CENTERED & PROMINENT) ─── */}
      <div className="nav-search-bar">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search internships, hackathons, roles, skills..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          id="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* ─── 3. RIGHT ACTIONS: THEME SWITCHER, BOOKMARKS, USER PILL ─── */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-shrink-0">
        {/* Theme Toggle (Light / Dark Mode) */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)] hover:border-[var(--border-strong)] text-[var(--text-sub)] hover:text-[var(--text-main)] text-xs font-semibold transition-all shadow-sm"
          id="theme-toggle-btn"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>

        {/* Saved Bookmarks Button */}
        <button
          onClick={() => setShowSavedDrawer(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)] hover:border-[var(--border-strong)] text-[var(--text-main)] text-xs font-semibold transition-all shadow-sm"
          id="saved-btn"
        >
          <Bookmark className={`w-3.5 h-3.5 ${savedIds.length > 0 ? 'text-cyan-500 fill-cyan-500/20' : 'text-[var(--text-muted)]'}`} />
          <span className="hidden md:inline">Saved Bookmarks</span>
          {savedIds.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
              {savedIds.length}
            </span>
          )}
        </button>

        {/* User Profile Pill Button */}
        <button
          onClick={() => {
            setProfileModalMode('view');
            setShowProfileModal(true);
          }}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)] hover:border-[var(--border-strong)] text-[var(--text-main)] text-xs font-semibold transition-all shadow-sm"
          id="profile-btn"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden border border-[var(--border-strong)] flex-shrink-0">
            <img
              src={profile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={profile?.name || 'User'}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-semibold hidden sm:inline">{profile?.name || 'Rahul Sharma'}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
        </button>
      </div>
    </header>
  );
}
