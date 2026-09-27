'use client';

import React from 'react';

// ─── 1. TECH SKILL LOGOS ──────────────────────────────────────────────

export function PythonLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none">
      <path
        d="M63.048 0c-16.892 0-30.584 5.922-30.584 19.46v14.195h31.11v4.32H20.738C6.913 37.975 0 46.592 0 63.484c0 16.892 7.02 26.068 20.738 26.068h11.724V74.015c0-11.238 9.94-20.738 21.178-20.738h31.11V33.655c0-13.538-14.81-14.195-21.702-14.195zm-11.724 8.751a4.86 4.86 0 1 1 0 9.72 4.86 4.86 0 0 1 0-9.72z"
        fill="url(#python-blue)"
      />
      <path
        d="M64.952 128c16.892 0 30.584-5.922 30.584-19.46V94.345H64.426v-4.32h42.836C121.087 90.025 128 81.408 128 64.516c0-16.892-7.02-26.068-20.738-26.068H95.538v15.537c0 11.238-9.94 20.738-21.178 20.738H43.25v19.617c0 13.538 14.81 14.195 21.702 14.195zm11.724-8.751a4.86 4.86 0 1 1 0-9.72 4.86 4.86 0 0 1 0 9.72z"
        fill="url(#python-yellow)"
      />
      <defs>
        <linearGradient id="python-blue" x1="10" y1="5" x2="60" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#387EB8" />
          <stop offset="1" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="python-yellow" x1="68" y1="58" x2="118" y2="123" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE873" />
          <stop offset="1" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ReactLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function MLLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L4 6v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
        fill="url(#ml-grad)"
        opacity="0.25"
      />
      <circle cx="12" cy="7" r="2" fill="#A855F7" />
      <circle cx="7" cy="14" r="2" fill="#EC4899" />
      <circle cx="17" cy="14" r="2" fill="#8B5CF6" />
      <circle cx="12" cy="18" r="2" fill="#06B6D4" />
      <path d="M12 7l-5 7m5-7l5 7m-5 7l-5-4m5 4l5-4" stroke="#C084FC" strokeWidth="1.4" strokeLinecap="round" />
      <defs>
        <linearGradient id="ml-grad" x1="4" y1="2" x2="20" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SQLLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#3B82F6" opacity="0.3" stroke="#60A5FA" strokeWidth="1.5" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#60A5FA" strokeWidth="1.5" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#38BDF8" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="#93C5FD" />
      <circle cx="12" cy="18" r="1" fill="#93C5FD" />
    </svg>
  );
}

export function TypeScriptLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M4.5 10.5h6M7.5 10.5v8" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 12c-.5-.9-1.4-1.5-2.7-1.5-1.6 0-2.5.9-2.5 2s.7 1.7 2.2 2.2c1.8.6 2.8 1.2 2.8 2.5 0 1.5-1.3 2.3-2.9 2.3-1.6 0-2.7-.8-3.1-2" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function NodeLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z" fill="#539E43" opacity="0.2" stroke="#68A063" strokeWidth="1.5" />
      <path d="M8 14.5c0-1.8 1.5-3 3.5-3h1v5h-1c-2 0-3.5-1-3.5-2z" fill="#539E43" />
    </svg>
  );
}

// ─── 2. PROJECT LOGOS ──────────────────────────────────────────────────

export function AIChatbotLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <div className={`rounded-md bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 flex items-center justify-center flex-shrink-0 shadow-sm ${className}`}>
      <div className="w-full h-full bg-[#0a0f1d] rounded-[5px] flex items-center justify-center">
        <svg className="w-3/4 h-3/4" viewBox="0 0 24 24" fill="none">
          <path d="M12 2a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1v2a1 1 0 0 1-1.6.8L12.5 17H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2z" fill="url(#ai-bot-grad)" />
          <circle cx="9" cy="11" r="1.5" fill="#38BDF8" />
          <circle cx="15" cy="11" r="1.5" fill="#38BDF8" />
          <defs>
            <linearGradient id="ai-bot-grad" x1="4" y1="2" x2="20" y2="19" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B6D4" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export function WebPlatformLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <div className={`rounded-md bg-gradient-to-tr from-emerald-400 to-teal-600 p-0.5 flex items-center justify-center flex-shrink-0 shadow-sm ${className}`}>
      <div className="w-full h-full bg-[#0a0f1d] rounded-[5px] flex items-center justify-center">
        <svg className="w-3/4 h-3/4" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
    </div>
  );
}

// ─── 3. COLLEGE / UNIVERSITY CREST LOGO ────────────────────────────────

export function CollegeCrestLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500/30 via-cyan-500/20 to-blue-600/30 p-1 border border-cyan-400/40 shadow-lg shadow-cyan-900/30 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
        {/* Laurel leaves wreath */}
        <path
          d="M10 28c0-8 6-16 14-18 8 2 14 10 14 18 0 10-8 16-14 18-6-2-14-8-14-18z"
          fill="url(#crest-bg)"
          stroke="#38BDF8"
          strokeWidth="1.5"
        />
        {/* University Shield details */}
        <path d="M16 16h16v12c0 6-4 9-8 11-4-2-8-5-8-11V16z" fill="#0E172A" stroke="#F59E0B" strokeWidth="1.2" />
        {/* Torch of Knowledge */}
        <path d="M24 20v10m-2-8h4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        {/* Flame */}
        <path d="M24 16c1-2 2-3 2-4-1 0-2 1-2 2s-1-2-2-2c0 1 1 2 2 4z" fill="#EF4444" />
        {/* Stars */}
        <circle cx="20" cy="27" r="1" fill="#F59E0B" />
        <circle cx="28" cy="27" r="1" fill="#F59E0B" />
        <defs>
          <linearGradient id="crest-bg" x1="10" y1="10" x2="38" y2="46" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E293B" stopOpacity="0.9" />
            <stop offset="1" stopColor="#0F172A" stopOpacity="0.95" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ─── 4. OFFICIAL LEETCODE LOGO ─────────────────────────────────────────

export function LeetCodeOfficialLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <div className={`relative rounded-xl bg-gradient-to-tr from-[#FFA116]/30 via-amber-500/20 to-orange-600/30 p-0.5 border border-[#FFA116]/40 flex items-center justify-center flex-shrink-0 shadow-md ${className}`}>
      <div className="w-full h-full bg-[#1A1A1A] rounded-[10px] flex items-center justify-center">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606"
            stroke="#FFA116"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.64 12.02h9.72"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// ─── 5. OFFICIAL SMART INDIA HACKATHON (SIH) LOGO ──────────────────────

export function SIHOfficialLogo({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-gradient-to-r from-orange-500 via-white to-green-500 p-0.5 flex-shrink-0 shadow-md ${className}`}>
      <div className="w-full h-full bg-slate-900 rounded-[10px] flex flex-col items-center justify-center p-0.5">
        <div className="flex items-center gap-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        </div>
        <span className="font-black text-white text-[9px] tracking-wider leading-none mt-0.5">SIH</span>
      </div>
    </div>
  );
}

// ─── 6. CODEFEST TROPHY LOGO ──────────────────────────────────────────

export function CodeFestLogo({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-md ${className}`}>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M6 9V4h12v5c0 3.31-2.69 6-6 6s-6-2.69-6-6z" fill="#10B981" opacity="0.3" stroke="#34D399" strokeWidth="1.5" />
        <path d="M6 6H3a2 2 0 0 0-2 2v1c0 2.21 1.79 4 4 4h1M18 6h3a2 2 0 0 1 2 2v1c0 2.21-1.79 4-4 4h-1" stroke="#34D399" strokeWidth="1.5" />
        <path d="M12 15v4m-4 3h8" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="8" r="1.5" fill="#34D399" />
      </svg>
    </div>
  );
}

// ─── 7. PDF FILE LOGO ──────────────────────────────────────────────────

export function PDFDocumentLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 shadow-md ${className}`}>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#E11D48" opacity="0.25" stroke="#FB7185" strokeWidth="1.5" />
        <path d="M14 2v6h6" stroke="#FB7185" strokeWidth="1.5" />
        <path d="M9 13v4m0-4h2a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1H9m6 2h-2v-4h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1z" stroke="#FFE4E6" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Helper component that maps any skill string to its logo + text pill
export function SkillBadgeWithLogo({ skill }: { skill: string }) {
  const s = skill.toLowerCase();

  let logo = <PythonLogo className="w-3.5 h-3.5" />;
  if (s.includes('react') || s.includes('native')) {
    logo = <ReactLogo className="w-3.5 h-3.5" />;
  } else if (s.includes('ml') || s.includes('ai') || s.includes('machine') || s.includes('deep') || s.includes('torch')) {
    logo = <MLLogo className="w-3.5 h-3.5" />;
  } else if (s.includes('sql') || s.includes('postgres') || s.includes('mongo') || s.includes('db')) {
    logo = <SQLLogo className="w-3.5 h-3.5" />;
  } else if (s.includes('type') || s.includes('ts')) {
    logo = <TypeScriptLogo className="w-3.5 h-3.5" />;
  } else if (s.includes('node')) {
    logo = <NodeLogo className="w-3.5 h-3.5" />;
  }

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] dark:bg-slate-900/50 hover:bg-white/[0.14] border border-white/15 dark:border-white/10 text-slate-100 text-xs font-semibold backdrop-blur-md transition-all shadow-sm group">
      <span className="flex-shrink-0 group-hover:scale-110 transition-transform">{logo}</span>
      <span>{skill}</span>
    </div>
  );
}

// Helper component that maps any project string to its logo + text pill
export function ProjectBadgeWithLogo({ name }: { name: string }) {
  const n = name.toLowerCase();

  const isAI = n.includes('ai') || n.includes('bot') || n.includes('gpt') || n.includes('matcher');

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 dark:bg-cyan-950/40 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-xs font-semibold backdrop-blur-md transition-all shadow-sm group">
      {isAI ? (
        <AIChatbotLogo className="w-4 h-4" />
      ) : (
        <WebPlatformLogo className="w-4 h-4" />
      )}
      <span className="truncate max-w-[130px]">{name}</span>
    </div>
  );
}
