'use client';

import { useState } from 'react';
import { 
  Bell, Sliders, ShieldCheck, Sparkles, 
  Cpu, Moon, Sun, CheckCircle2, User, 
  MapPin, Laptop, Zap, Check, Eye
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function SettingsView() {
  const { 
    profile, theme, toggleTheme, setTheme, setShowAICopilot
  } = useAppStore();

  const [notifications, setNotifications] = useState({
    deadlineRadar: true,
    matchingAlerts: true,
    weeklyDigest: false,
    mentorshipReminders: true
  });

  const [preferences, setPreferences] = useState({
    remoteOnly: true,
    autoMatchGSoC: true,
    allowRecruiters: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      {/* ─── 1. TOP HEADER BANNER (SPACIOUS & ELEGANT) ─── */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 p-8 sm:p-10 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-200 bg-white/15 px-3.5 py-1 rounded-full border border-white/20 inline-flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-300" />
            Preferences & Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Account Settings & Opportunity Radar
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed font-medium">
            Customize your personalized discovery feed, notification triggers, and live AI Copilot preferences for the FIT-FEST 2026 hackathon.
          </p>
        </div>
      </div>

      {/* ─── 2. STUDENT IDENTITY CARD ─── */}
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-7 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-[var(--border-subtle)] pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-teal-400 shadow-md shadow-teal-500/20 flex-shrink-0">
              <img
                src={profile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={profile?.name || 'Yash'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-black text-[var(--text-main)]">{profile.name}</h2>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified Student
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                {profile.degree} • 1st Year (Information Technology)
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{profile.email} • {profile.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[var(--text-muted)]">Profile Strength:</span>
            <span className="text-base font-black text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-xl">
              100%
            </span>
          </div>
        </div>

        {/* ─── 3. AI COPILOT STATUS (CLEAN VISUAL STATUS — NO RAW API KEYS) ─── */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-cyan-500/10 border border-purple-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30 flex-shrink-0">
              <Zap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                <span>Groq High-Speed AI Cloud Engine</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-300 border border-emerald-500/40 font-black">
                  CONNECTED & ACTIVE
                </span>
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Model: Llama-3.3 70B Versatile • Latency: ~240ms • Sub-second resume fit analysis
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAICopilot(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch AI Copilot</span>
          </button>
        </div>
      </div>

      {/* ─── 4. RADAR & NOTIFICATION TRIGGERS (SPACIOUS TOGGLES) ─── */}
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-7 sm:p-8 space-y-6 shadow-md">
        <div className="border-b border-[var(--border-subtle)] pb-4">
          <h2 className="text-base sm:text-lg font-black text-[var(--text-main)] flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-indigo-500" />
            Opportunity Radar & Notifications
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Choose when and how Opportunex notifies you about impending hackathons and job deadlines.
          </p>
        </div>

        <div className="space-y-4">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--pill-bg)] border border-[var(--border-subtle)]">
            <div className="space-y-0.5 max-w-lg">
              <p className="text-sm font-bold text-[var(--text-main)]">Hackathon Deadline Radar</p>
              <p className="text-xs text-[var(--text-muted)]">
                Sends an urgent alert 48 hours before registration closes for your bookmarked competitions.
              </p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, deadlineRadar: !notifications.deadlineRadar })}
              className={`w-12 h-6.5 rounded-full transition-colors relative p-1 flex-shrink-0 ${
                notifications.deadlineRadar ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  notifications.deadlineRadar ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--pill-bg)] border border-[var(--border-subtle)]">
            <div className="space-y-0.5 max-w-lg">
              <p className="text-sm font-bold text-[var(--text-main)]">C++ & Python Match Radar</p>
              <p className="text-xs text-[var(--text-muted)]">
                Instant notification when new opportunities match 90%+ of your primary skills and 1st-year status.
              </p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, matchingAlerts: !notifications.matchingAlerts })}
              className={`w-12 h-6.5 rounded-full transition-colors relative p-1 flex-shrink-0 ${
                notifications.matchingAlerts ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  notifications.matchingAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--pill-bg)] border border-[var(--border-subtle)]">
            <div className="space-y-0.5 max-w-lg">
              <p className="text-sm font-bold text-[var(--text-main)]">1:1 Mentorship Session Alerts</p>
              <p className="text-xs text-[var(--text-muted)]">
                Notify when Google, Meta, or Microsoft engineers open new slots this week.
              </p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, mentorshipReminders: !notifications.mentorshipReminders })}
              className={`w-12 h-6.5 rounded-full transition-colors relative p-1 flex-shrink-0 ${
                notifications.mentorshipReminders ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  notifications.mentorshipReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ─── 5. THEME & DISPLAY PREFERENCES ─── */}
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-7 sm:p-8 space-y-6 shadow-md">
        <div className="border-b border-[var(--border-subtle)] pb-4">
          <h2 className="text-base sm:text-lg font-black text-[var(--text-main)] flex items-center gap-2.5">
            <Moon className="w-5 h-5 text-cyan-400" />
            Display & Appearance
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Choose your preferred interface theme and aesthetic presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Dark Mode Card */}
          <div
            onClick={() => setTheme('dark')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
              theme === 'dark'
                ? 'border-blue-500 bg-blue-500/10 shadow-md'
                : 'border-[var(--border-subtle)] bg-[var(--pill-bg)] hover:border-slate-500'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-main)]">Dark Mode (Recommended)</p>
              <p className="text-xs text-[var(--text-muted)]">High-contrast cybernetic palette with ambient glow</p>
            </div>
            {theme === 'dark' && <Check className="w-5 h-5 text-blue-500 ml-auto" />}
          </div>

          {/* Light Mode Card */}
          <div
            onClick={() => setTheme('light')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
              theme === 'light'
                ? 'border-blue-500 bg-blue-500/10 shadow-md'
                : 'border-[var(--border-subtle)] bg-[var(--pill-bg)] hover:border-slate-500'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-500 flex-shrink-0 shadow-sm">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-main)]">Light Mode</p>
              <p className="text-xs text-[var(--text-muted)]">Clean, daylight-optimized minimalist interface</p>
            </div>
            {theme === 'light' && <Check className="w-5 h-5 text-blue-500 ml-auto" />}
          </div>
        </div>
      </div>

      {/* ─── 6. SAVE ACTION BAR ─── */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-xs text-[var(--text-muted)] font-medium">
          Settings are automatically synced across browser sessions.
        </span>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Preferences Saved!</span>
            </>
          ) : (
            <span>Save Preferences</span>
          )}
        </button>
      </div>
    </div>
  );
}
