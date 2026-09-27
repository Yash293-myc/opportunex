'use client';

import React from 'react';

interface Props {
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({ className = 'w-9 h-9', showText = true }: Props) {
  return (
    <div className="flex items-center gap-3">
      {/* ─── UNIQUE TALENTORBIT EMBLEM ─── */}
      <div className={`relative flex-shrink-0 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
          {/* Outer Orbital Glow Ring */}
          <circle cx="20" cy="20" r="18" stroke="url(#orbit-grad-1)" strokeWidth="1.5" strokeDasharray="4 2" />
          
          {/* Inner Orbital Path */}
          <ellipse
            cx="20"
            cy="20"
            rx="14"
            ry="7"
            transform="rotate(-30 20 20)"
            stroke="url(#orbit-grad-2)"
            strokeWidth="1.8"
          />

          {/* Central Nexus Prism Shield */}
          <path
            d="M20 7l10 5.8v11.4L20 30l-10-5.8V12.8L20 7z"
            fill="url(#core-dark)"
            stroke="url(#prism-stroke)"
            strokeWidth="1.4"
          />

          {/* Core Energy Spark */}
          <path
            d="M20 13l2.2 4.8 5 .5-3.8 3.5 1.1 5-4.5-2.6-4.5 2.6 1.1-5-3.8-3.5 5-.5L20 13z"
            fill="url(#core-spark)"
          />

          {/* Orbiting Satellite Talent Node */}
          <circle cx="32" cy="13" r="2.5" fill="#38BDF8" />
          <circle cx="8" cy="27" r="1.8" fill="#A855F7" />

          <defs>
            <linearGradient id="orbit-grad-1" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B6D4" />
              <stop offset="0.5" stopColor="#6366F1" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="orbit-grad-2" x1="6" y1="13" x2="34" y2="27" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="core-dark" x1="10" y1="7" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0F172A" />
              <stop offset="1" stopColor="#030712" />
            </linearGradient>
            <linearGradient id="prism-stroke" x1="10" y1="7" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22D3EE" />
              <stop offset="1" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="core-spark" x1="15" y1="13" x2="25" y2="27" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.6" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ─── BRAND TYPOGRAPHY ─── */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--text-main)] font-black text-lg tracking-tight">
              Talent<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Orbit</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <span className="text-[10px] font-extrabold text-cyan-500 dark:text-cyan-400 tracking-wider uppercase mt-0.5">
            Student Opportunity Nexus
          </span>
        </div>
      )}
    </div>
  );
}
