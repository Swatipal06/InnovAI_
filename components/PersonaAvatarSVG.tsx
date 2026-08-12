'use client';

import React from 'react';
import { PersonaId } from '@/lib/types';

interface PersonaAvatarSVGProps {
  id: PersonaId;
  size?: number;
  className?: string;
}

export function PersonaAvatarSVG({ id, size = 64, className = '' }: PersonaAvatarSVGProps) {
  switch (id) {
    case 'einstein':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="einstein-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4F8EF7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4F8EF7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="einstein-hair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#einstein-glow)" />
          <circle cx="50" cy="50" r="42" fill="#1E293B" stroke="#4F8EF7" strokeWidth="2" />
          {/* Hair */}
          <path d="M 20 45 Q 12 25 35 20 Q 50 10 65 20 Q 88 25 80 45 Q 90 55 82 70 Q 75 80 70 82 Q 30 82 25 70 Q 10 55 20 45 Z" fill="url(#einstein-hair)" opacity="0.9" />
          {/* Face */}
          <ellipse cx="50" cy="55" rx="22" ry="24" fill="#FCE7F3" opacity="0.85" />
          {/* Eyes */}
          <circle cx="42" cy="52" r="3" fill="#1E293B" />
          <circle cx="58" cy="52" r="3" fill="#1E293B" />
          {/* Mustache */}
          <path d="M 36 65 Q 50 60 64 65 Q 50 72 36 65 Z" fill="#E2E8F0" />
          {/* Physics Spark */}
          <text x="70" y="30" fontSize="16" fill="#60A5FA">⚛️</text>
        </svg>
      );

    case 'buddha':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="buddha-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5C842" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F5C842" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#buddha-halo)" />
          <circle cx="50" cy="50" r="42" fill="#2A2006" stroke="#F5C842" strokeWidth="2" />
          {/* Golden Halo Circle */}
          <circle cx="50" cy="45" r="30" stroke="#F5C842" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          {/* Head & Top knot */}
          <circle cx="50" cy="32" r="6" fill="#F5C842" />
          <ellipse cx="50" cy="48" rx="20" ry="22" fill="#FDE68A" />
          {/* Closed Eyes */}
          <path d="M 40 48 Q 44 51 47 48" stroke="#78350F" strokeWidth="2" fill="none" />
          <path d="M 53 48 Q 56 51 60 48" stroke="#78350F" strokeWidth="2" fill="none" />
          {/* Gentle Smile */}
          <path d="M 44 58 Q 50 62 56 58" stroke="#78350F" strokeWidth="2" fill="none" />
          {/* Bindi / Tilak dot */}
          <circle cx="50" cy="43" r="1.5" fill="#DC2626" />
        </svg>
      );

    case 'chanakya':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="chanakya-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5C842" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F5C842" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#chanakya-glow)" />
          <circle cx="50" cy="50" r="42" fill="#1C1808" stroke="#F5C842" strokeWidth="2" />
          {/* Shikha / Tuft of Hair behind */}
          <path d="M 50 20 Q 62 10 58 28 Z" fill="#F5C842" opacity="0.9" />
          {/* Head */}
          <ellipse cx="50" cy="52" rx="20" ry="24" fill="#FDE68A" />
          {/* Tilak */}
          <path d="M 47 38 H 53 V 46 H 47 Z" fill="#DC2626" />
          <line x1="44" y1="40" x2="56" y2="40" stroke="#F5C842" strokeWidth="2" />
          {/* Sharp Eyes */}
          <ellipse cx="42" cy="50" rx="3" ry="2" fill="#451A03" />
          <ellipse cx="58" cy="50" rx="3" ry="2" fill="#451A03" />
          {/* Scroll motif */}
          <text x="68" y="32" fontSize="14">📜</text>
        </svg>
      );

    case 'vivekananda':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="vivek-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#vivek-glow)" />
          <circle cx="50" cy="50" r="42" fill="#271206" stroke="#F97316" strokeWidth="2" />
          {/* Turban (Orange) */}
          <path d="M 24 45 C 24 25 76 25 76 45 C 80 32 68 18 50 18 C 32 18 20 32 24 45 Z" fill="#F97316" />
          <path d="M 24 40 Q 50 48 76 40 Q 50 34 24 40 Z" fill="#EA580C" />
          {/* Face */}
          <ellipse cx="50" cy="56" rx="20" ry="22" fill="#FFEDD5" />
          {/* Confident Eyes */}
          <circle cx="43" cy="53" r="2.5" fill="#431407" />
          <circle cx="57" cy="53" r="2.5" fill="#431407" />
          {/* Fire Flame */}
          <text x="68" y="32" fontSize="14">🔥</text>
        </svg>
      );

    case 'kalam':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="kalam-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#kalam-glow)" />
          <circle cx="50" cy="50" r="42" fill="#082F49" stroke="#22D3EE" strokeWidth="2" />
          {/* Iconic Hair (Side parted silver hair) */}
          <path d="M 22 50 C 20 30 40 22 50 22 C 60 22 80 30 78 50 C 85 45 80 20 50 16 C 20 20 15 45 22 50 Z" fill="#E2E8F0" />
          {/* Face */}
          <ellipse cx="50" cy="56" rx="21" ry="23" fill="#FFE4E6" opacity="0.9" />
          {/* Warm Glasses */}
          <rect x="36" y="49" width="11" height="9" rx="3" stroke="#0284C7" strokeWidth="1.5" fill="none" />
          <rect x="53" y="49" width="11" height="9" rx="3" stroke="#0284C7" strokeWidth="1.5" fill="none" />
          <line x1="47" y1="53" x2="53" y2="53" stroke="#0284C7" strokeWidth="1.5" />
          {/* Warm smile */}
          <path d="M 43 65 Q 50 70 57 65" stroke="#0F172A" strokeWidth="2" fill="none" />
          {/* Rocket */}
          <text x="68" y="32" fontSize="14">🚀</text>
        </svg>
      );

    case 'davinci':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="davinci-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#davinci-glow)" />
          <circle cx="50" cy="50" r="42" fill="#1E1B4B" stroke="#A78BFA" strokeWidth="2" />
          {/* Cap */}
          <path d="M 25 35 Q 50 20 75 35 Z" fill="#6D28D9" />
          {/* Long Beard & Hair */}
          <path d="M 28 45 Q 20 75 50 84 Q 80 75 72 45 Z" fill="#CBD5E1" opacity="0.95" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="18" ry="20" fill="#FDE8E8" />
          {/* Eyes */}
          <circle cx="43" cy="46" r="2" fill="#312E81" />
          <circle cx="57" cy="46" r="2" fill="#312E81" />
          {/* Art palette */}
          <text x="68" y="32" fontSize="14">🎨</text>
        </svg>
      );

    case 'tesla':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="tesla-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#tesla-glow)" />
          <circle cx="50" cy="50" r="42" fill="#170F2D" stroke="#8B5CF6" strokeWidth="2" />
          {/* Slick dark hair parted */}
          <path d="M 26 42 Q 50 20 74 42 C 78 30 65 20 50 20 C 35 20 22 30 26 42 Z" fill="#0F172A" />
          {/* Face */}
          <ellipse cx="50" cy="54" rx="19" ry="22" fill="#F1F5F9" />
          {/* Eyes */}
          <circle cx="42" cy="50" r="2.5" fill="#0F172A" />
          <circle cx="58" cy="50" r="2.5" fill="#0F172A" />
          {/* Mustache */}
          <path d="M 40 62 Q 50 58 60 62 Q 50 65 40 62 Z" fill="#0F172A" />
          {/* Lightning Sparks */}
          <text x="68" y="32" fontSize="14">⚡</text>
        </svg>
      );

    case 'suntzu':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="suntzu-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5C842" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F5C842" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#suntzu-glow)" />
          <circle cx="50" cy="50" r="42" fill="#241B03" stroke="#F5C842" strokeWidth="2" />
          {/* Top Knot & Helmet */}
          <path d="M 30 35 L 50 18 L 70 35 Z" fill="#B45309" />
          <circle cx="50" cy="18" r="4" fill="#F5C842" />
          {/* Beard */}
          <path d="M 32 52 Q 50 82 68 52 Z" fill="#1E293B" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="18" ry="19" fill="#FEF08A" />
          {/* Focused Eyes */}
          <line x1="39" y1="46" x2="45" y2="46" stroke="#451A03" strokeWidth="2" />
          <line x1="55" y1="46" x2="61" y2="46" stroke="#451A03" strokeWidth="2" />
          {/* Swords */}
          <text x="68" y="32" fontSize="14">⚔️</text>
        </svg>
      );

    case 'listener':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="listener-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#listener-glow)" />
          <circle cx="50" cy="50" r="42" fill="#0C1A30" stroke="#22D3EE" strokeWidth="2" />
          {/* Cosmic Aura & Stars */}
          <circle cx="50" cy="50" r="32" stroke="#22D3EE" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          {/* Stylized Listening Spirit / Face Silhouette */}
          <path d="M 50 28 C 36 28 32 40 32 54 C 32 68 40 76 50 76 C 60 76 68 68 68 54 C 68 40 64 28 50 28 Z" fill="#1E293B" opacity="0.8" />
          <circle cx="50" cy="46" r="14" fill="#22D3EE" opacity="0.2" />
          {/* Glowing Center Core */}
          <circle cx="50" cy="50" r="6" fill="#67E8F9" />
          <text x="68" y="32" fontSize="14">🌌</text>
        </svg>
      );

    case 'coach':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <defs>
            <radialGradient id="coach-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#coach-glow)" />
          <circle cx="50" cy="50" r="42" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
          {/* Modern Headset */}
          <path d="M 26 50 C 26 30 74 30 74 50" stroke="#34D399" strokeWidth="3" fill="none" />
          <rect x="22" y="45" width="8" height="14" rx="3" fill="#34D399" />
          <rect x="70" y="45" width="8" height="14" rx="3" fill="#34D399" />
          {/* Face */}
          <ellipse cx="50" cy="54" rx="19" ry="21" fill="#D1FAE5" />
          {/* Friendly Eyes */}
          <circle cx="43" cy="50" r="2.5" fill="#064E3B" />
          <circle cx="57" cy="50" r="2.5" fill="#064E3B" />
          {/* Confident Smile */}
          <path d="M 43 62 Q 50 67 57 62" stroke="#064E3B" strokeWidth="2" fill="none" />
          {/* Briefcase */}
          <text x="68" y="32" fontSize="14">💼</text>
        </svg>
      );

    default:
      return null;
  }
}
