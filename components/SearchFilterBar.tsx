'use client';

import { Search } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Category, Interest } from '@/lib/opportunities';

const CATEGORIES: { label: string; value: Category; icon: string }[] = [
  { label: 'All', value: 'All', icon: '·' },
  { label: 'Internships', value: 'Internship', icon: '' },
  { label: 'Hackathons', value: 'Hackathon', icon: '' },
  { label: 'Courses', value: 'Course', icon: '' },
  { label: 'Scholarships', value: 'Scholarship', icon: '' },
  { label: 'Open Source', value: 'OpenSource', icon: '' },
];

const INTERESTS: Interest[] = ['AI/ML', 'Web Dev', 'Cloud', 'Open Source', 'UI/UX'];

export default function SearchFilterBar() {
  const {
    searchQuery, setSearchQuery,
    activeCategory, setActiveCategory,
    activeInterests, toggleInterest,
    showRemoteOnly, toggleRemoteOnly,
  } = useAppStore();

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
        <input
          type="text"
          placeholder="Search opportunities, skills, organisations..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-bar pl-10 pr-4 py-2.5 text-sm"
          id="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#888] text-xs transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category + Interest + Remote row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`filter-chip flex-shrink-0 ${activeCategory === cat.value ? 'active' : ''}`}
            id={`cat-${cat.value.toLowerCase()}`}
          >
            {cat.label}
          </button>
        ))}

        <div className="w-px h-4 bg-[#1f1f1f] flex-shrink-0 mx-1" />

        {INTERESTS.map(i => (
          <button
            key={i}
            onClick={() => toggleInterest(i)}
            className={`filter-chip flex-shrink-0 ${activeInterests.includes(i) ? 'active' : ''}`}
            id={`int-${i.replace('/', '-')}`}
          >
            {i}
          </button>
        ))}

        <div className="w-px h-4 bg-[#1f1f1f] flex-shrink-0 mx-1" />

        <button
          onClick={toggleRemoteOnly}
          className={`filter-chip flex-shrink-0 ${showRemoteOnly ? 'active' : ''}`}
          id="remote-filter"
        >
          Remote
        </button>
      </div>
    </div>
  );
}
