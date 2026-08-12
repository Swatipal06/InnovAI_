'use client';

import React from 'react';

interface InnovAILogoProps {
  variant?: 'white' | 'dark' | 'gradient';
  size?: number;
  showText?: boolean;
  className?: string;
}

export function InnovAILogo({
  variant = 'white',
  size = 36,
  showText = true,
  className = ''
}: InnovAILogoProps) {
  // Stroke colors based on contrast variant
  const strokeColor = variant === 'dark' ? '#0D0B1E' : '#FFFFFF';
  const textColor =
    variant === 'dark'
      ? 'text-slate-900'
      : variant === 'gradient'
      ? 'bg-gradient-to-r from-amber-300 via-rose-300 to-violet-400 bg-clip-text text-transparent'
      : 'text-[#F0F4FF]';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Brain Circuit Logo Icon with Speech Bubble Tail */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5C842" />
            <stop offset="50%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Outer Brain Contour with speech tail at bottom right */}
        <path
          d="M 38 18 
             C 20 18 10 32 10 48 
             C 10 60 16 68 25 74 
             C 32 78 40 80 48 80 
             C 52 80 56 86 60 92 
             C 62 95 66 94 66 90 
             L 66 80 
             C 78 78 90 68 90 50 
             C 90 32 78 18 58 18 
             C 52 18 44 18 38 18 Z"
          stroke={variant === 'gradient' ? 'url(#logo-grad)' : strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Inner Circuit Split Line */}
        <path
          d="M 50 18 V 46 L 68 64"
          stroke={variant === 'gradient' ? 'url(#logo-grad)' : strokeColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left Circuit Branch 1 */}
        <path
          d="M 24 50 L 38 38 V 26"
          stroke={variant === 'gradient' ? 'url(#logo-grad)' : strokeColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="24"
          cy="50"
          r="4.5"
          fill={variant === 'gradient' ? '#F5C842' : strokeColor}
        />
        <circle
          cx="38"
          cy="26"
          r="4.5"
          fill={variant === 'gradient' ? '#F5C842' : strokeColor}
        />

        {/* Middle Circuit Branch 2 */}
        <path
          d="M 50 36 L 68 24"
          stroke={variant === 'gradient' ? 'url(#logo-grad)' : strokeColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="68"
          cy="24"
          r="4.5"
          fill={variant === 'gradient' ? '#F472B6' : strokeColor}
        />

        {/* Right Circuit Branch 3 */}
        <path
          d="M 60 56 H 74 V 68"
          stroke={variant === 'gradient' ? 'url(#logo-grad)' : strokeColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="74"
          cy="68"
          r="4.5"
          fill={variant === 'gradient' ? '#8B5CF6' : strokeColor}
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`text-xl font-bold tracking-tight ${textColor}`}>
            InnovAI
          </span>
        </div>
      )}
    </div>
  );
}
