'use client';

import React from 'react';

interface Props {
  className?: string;
  showText?: boolean;
  textSize?: string;
}

export default function BrandLogo({ className = 'w-9 h-9', showText = true, textSize = 'text-xl' }: Props) {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer select-none">
      {/* ─── OPPORTUNEX ICON (Futuristic Nexus Emblem) ─── */}
      <div className={`relative flex-shrink-0 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 44 44" fill="none">
          {/* Ambient Outer Halo */}
          <circle cx="22" cy="22" r="20" stroke="url(#opp-grad-1)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
          
          {/* Dynamic Angled Nexus Hexagon */}
          <path
            d="M22 4L38 13.2V30.8L22 40L6 30.8V13.2L22 4Z"
            fill="url(#opp-dark-bg)"
            stroke="url(#opp-border-grad)"
            strokeWidth="1.6"
          />

          {/* Central Crossing 'X' Energy Bands */}
          <path
            d="M14 14L30 30M30 14L14 30"
            stroke="url(#opp-x-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Core Orbiting Dot */}
          <circle cx="22" cy="22" r="3.5" fill="#38BDF8" className="animate-pulse" />
          <circle cx="34" cy="15" r="2" fill="#22D3EE" />

          <defs>
            <linearGradient id="opp-grad-1" x1="2" y1="2" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00BCD4" />
              <stop offset="0.5" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="opp-dark-bg" x1="6" y1="4" x2="38" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B132B" />
              <stop offset="1" stopColor="#050814" />
            </linearGradient>
            <linearGradient id="opp-border-grad" x1="6" y1="4" x2="38" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.5" stopColor="#818CF8" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="opp-x-grad" x1="14" y1="14" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00E5FF" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ─── OPPORTUNEX TEXT (No subtitle) ─── */}
      {showText && (
        <div className="flex items-center tracking-tight">
          <span className={`font-black ${textSize} text-[var(--text-main)]`}>
            Oppor<span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">tunex</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-1 shadow-[0_0_8px_#22d3ee]" />
        </div>
      )}
    </div>
  );
}
