'use client';

import { useAppStore } from '@/lib/store';
import { opportunities, calculateMatchScore } from '@/lib/opportunities';
import { Bookmark, Clock, Zap, TrendingUp, Target } from 'lucide-react';
import { parseISO } from 'date-fns';

export default function DashboardStats() {
  const { savedIds, profile } = useAppStore();

  const now = new Date();
  
  // Count upcoming deadlines (within next 30 days)
  const upcomingDeadlines = opportunities.filter(o => {
    const deadline = parseISO(o.deadline);
    const diff = deadline.getTime() - now.getTime();
    return diff > 0 && diff < 1000 * 60 * 60 * 24 * 30;
  }).length;

  // Count recommended (match score >= 50)
  const recommendedCount = profile
    ? opportunities.filter(o =>
        calculateMatchScore(profile.skills, profile.interests, o) >= 50
      ).length
    : 0;

  // Next deadline
  const nextDeadline = opportunities
    .filter(o => parseISO(o.deadline) > now)
    .sort((a, b) => parseISO(a.deadline).getTime() - parseISO(b.deadline).getTime())[0];

  const daysToNextDeadline = nextDeadline
    ? Math.ceil((parseISO(nextDeadline.deadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const stats = [
    {
      icon: Bookmark,
      label: 'Saved',
      value: savedIds.length,
      sub: 'opportunities bookmarked',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
      borderColor: 'border-amber-400/20',
    },
    {
      icon: Clock,
      label: 'Deadlines',
      value: upcomingDeadlines,
      sub: 'closing within 30 days',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/20',
    },
    {
      icon: Target,
      label: 'Matches',
      value: recommendedCount,
      sub: profile ? 'for your profile' : 'set profile to see',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/20',
    },
    {
      icon: TrendingUp,
      label: 'Next Deadline',
      value: daysToNextDeadline !== null ? `${daysToNextDeadline}d` : '—',
      sub: nextDeadline ? nextDeadline.title.slice(0, 20) + '…' : 'no upcoming',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10',
      borderColor: 'border-indigo-400/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`glass-panel rounded-2xl p-4 border ${stat.borderColor} hover:scale-105 transition-transform duration-200`}
            id={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}
          >
            <div className={`w-9 h-9 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-0.5`}>{stat.value}</div>
            <div className="text-white/70 text-xs font-medium">{stat.label}</div>
            <div className="text-white/35 text-xs mt-0.5 truncate">{stat.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
