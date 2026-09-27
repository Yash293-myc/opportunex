'use client';

import { Search, Filter, SlidersHorizontal, Wifi } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Category, Interest } from '@/lib/opportunities';

const CATEGORIES: Category[] = ['All', 'Internship', 'Hackathon', 'Course', 'Scholarship', 'OpenSource'];
const INTERESTS: Interest[] = ['AI/ML', 'Web Dev', 'Cloud', 'Open Source', 'UI/UX'];

const categoryIcons: Record<string, string> = {
  All: '✦',
  Internship: '💼',
  Hackathon: '⚡',
  Course: '📚',
  Scholarship: '🏆',
  OpenSource: '🌐',
};

const interestColors: Record<Interest, string> = {
  'AI/ML': 'from-violet-500 to-purple-600',
  'Web Dev': 'from-blue-500 to-cyan-500',
  'Cloud': 'from-sky-500 to-blue-600',
  'Open Source': 'from-emerald-500 to-teal-600',
  'UI/UX': 'from-pink-500 to-rose-600',
};

export default function SearchFilterBar() {
  const {
    searchQuery, setSearchQuery,
    activeCategory, setActiveCategory,
    activeInterests, toggleInterest,
    showRemoteOnly, toggleRemoteOnly,
  } = useAppStore();

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-indigo-400 transition-colors z-10" />
        <input
          type="text"
          placeholder="Search internships, hackathons, scholarships..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full glass-input rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
          id="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        <Filter className="w-4 h-4 text-white/40 flex-shrink-0" />
        <div className="flex gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'glass-chip text-white/60 hover:text-white hover:bg-white/10'
              }`}
              id={`category-${cat.toLowerCase()}`}
            >
              <span>{categoryIcons[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interest filters + remote toggle */}
      <div className="flex items-center gap-2 flex-wrap">
        <SlidersHorizontal className="w-4 h-4 text-white/40 flex-shrink-0" />
        <div className="flex gap-2 flex-wrap">
          {INTERESTS.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeInterests.includes(interest)
                  ? `bg-gradient-to-r ${interestColors[interest]} text-white shadow-md`
                  : 'glass-chip text-white/50 hover:text-white/80'
              }`}
              id={`interest-filter-${interest.replace('/', '-')}`}
            >
              {interest}
            </button>
          ))}
        </div>

        <button
          onClick={toggleRemoteOnly}
          className={`flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
            showRemoteOnly
              ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-400'
              : 'glass-chip text-white/50 hover:text-white/80'
          }`}
          id="remote-filter"
        >
          <Wifi className="w-3 h-3" />
          Remote Only
        </button>
      </div>
    </div>
  );
}
