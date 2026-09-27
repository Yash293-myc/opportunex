'use client';

import { useAppStore } from '@/lib/store';
import { opportunities, calculateMatchScore } from '@/lib/opportunities';
import { Bookmark, Clock, Target, TrendingUp, Sparkles } from 'lucide-react';
import { parseISO } from 'date-fns';

export default function DashboardStats() {
  const { savedIds, profile, setShowSavedDrawer } = useAppStore();
  const now = new Date();

  const upcomingDeadlines = opportunities.filter(o => {
    const d = parseISO(o.deadline);
    const diff = d.getTime() - now.getTime();
    return diff > 0 && diff < 1000 * 60 * 60 * 24 * 30;
  }).length;

  const userSkills = profile?.technicalSkills || profile?.skills || [];
  const userInterests = profile?.interests || [];

  const recommendedCount = (userSkills.length > 0 || userInterests.length > 0)
    ? opportunities.filter(o =>
        calculateMatchScore(userSkills, userInterests, o) >= 50
      ).length
    : null;

  const nextDeadline = opportunities
    .filter(o => parseISO(o.deadline) > now)
    .sort((a, b) => parseISO(a.deadline).getTime() - parseISO(b.deadline).getTime())[0];

  const daysToNext = nextDeadline
    ? Math.ceil((parseISO(nextDeadline.deadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const stats = [
    {
      icon: Bookmark,
      value: savedIds.length,
      label: 'Saved Items',
      sub: 'Bookmarked for later',
      colorClass: 'stat-card-rose',
      iconBg: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
      valColor: 'text-rose-400',
      onClick: () => setShowSavedDrawer(true),
    },
    {
      icon: Clock,
      value: upcomingDeadlines,
      label: 'Active Deadlines',
      sub: 'Expiring in 30 days',
      colorClass: 'stat-card-amber',
      iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
      valColor: 'text-amber-400',
    },
    {
      icon: Target,
      value: recommendedCount !== null ? `${recommendedCount}` : '—',
      label: 'Matched For You',
      sub: profile ? `${profile.skills?.length || 0} skills evaluated` : 'Setup profile',
      colorClass: 'stat-card-emerald',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      valColor: 'text-emerald-400',
    },
    {
      icon: TrendingUp,
      value: daysToNext !== null ? `${daysToNext}d` : '—',
      label: 'Next Deadline',
      sub: nextDeadline?.organization ?? 'No upcoming',
      colorClass: 'stat-card-cyan',
      iconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
      valColor: 'text-cyan-400',
    },
  ];

  return (
    <>
      {stats.map(s => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className={`stat-card ${s.colorClass} cursor-pointer group`}
            onClick={s.onClick}
            id={`stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-slate-400">{s.label}</span>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.iconBg} transition-transform group-hover:scale-110`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className={`text-2xl font-extrabold ${s.valColor} tracking-tight mb-1`}>
              {s.value}
            </div>
            <div className="text-xs text-slate-500 truncate group-hover:text-slate-400 transition-colors">
              {s.sub}
            </div>
          </div>
        );
      })}
    </>
  );
}
