'use client';

import React from 'react';
import Image from 'next/image';
import { PersonaId } from '@/lib/types';
import { PERSONAS } from '@/lib/personas';
import { PersonaAvatarSVG } from './PersonaAvatarSVG';

interface PersonaAvatarProps {
  id: PersonaId;
  size?: number;
  className?: string;
  showGlow?: boolean;
}

// Available realistic AI generated photos saved in /avatars/
const REALISTIC_AI_AVATARS: Record<string, string> = {
  einstein: '/avatars/einstein.png',
  buddha: '/avatars/buddha.png',
  chanakya: '/avatars/chanakya.png',
  vivekananda: '/avatars/vivekananda.png'
};

export function PersonaAvatar({ id, size = 64, className = '', showGlow = true }: PersonaAvatarProps) {
  const persona = PERSONAS[id];
  const photoUrl = REALISTIC_AI_AVATARS[id];

  if (photoUrl) {
    return (
      <div
        className={`relative rounded-full p-[2px] shrink-0 transition-transform duration-300 ${className}`}
        style={{
          width: size,
          height: size,
          background: showGlow ? `linear-gradient(135deg, ${persona?.color || '#8B5CF6'}, #FFFFFF40)` : 'transparent',
          boxShadow: showGlow ? `0 0 20px ${persona?.color || '#8B5CF6'}55` : 'none'
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden relative bg-[#170F2D]">
          {/* Real AI Generated Portrait */}
          <img
            src={photoUrl}
            alt={persona?.name || id}
            className="w-full h-full object-cover rounded-full transform hover:scale-105 transition-transform"
          />
        </div>
      </div>
    );
  }

  // High-Detail Stylized Visual Renderer for Kalam, Da Vinci, Tesla, Sun Tzu, Listener, Coach
  return (
    <div
      className={`relative rounded-full shrink-0 transition-transform duration-300 ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: showGlow ? `0 0 20px ${persona?.color || '#8B5CF6'}55` : 'none'
      }}
    >
      <PersonaAvatarSVG id={id} size={size} className="w-full h-full" />
    </div>
  );
}
