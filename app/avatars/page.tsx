'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInnovAI } from '@/app/context/InnovAIContext';
import { PERSONA_LIST } from '@/lib/personas';
import { PersonaAvatar } from '@/components/PersonaAvatar';

export default function AvatarsPage() {
  const router = useRouter();
  const { user } = useInnovAI();

  const isPremium = user?.subscriptionTier === 'seeker' || user?.subscriptionTier === 'sage';

  const handleCardClick = (id: string, isLocked: boolean) => {
    if (isLocked) {
      router.push('/pricing');
    } else {
      router.push(`/chat/${id}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full py-10 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 mb-2">
            <span className="text-xs font-semibold text-violet-300">
              Universe of 10 Legendary Minds
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-[#F0F4FF]">
            Avatar Gallery
          </h1>
          <p className="text-sm text-[#9A8EC0] mt-1">
            Choose a mind to start a private, judgment-free conversation tailored to your life.
          </p>
        </div>

        {!isPremium && (
          <Link
            href="/pricing"
            className="btn-gold-gradient px-5 py-2.5 text-xs font-bold shadow-lg shadow-amber-500/20 self-start md:self-auto"
          >
            👑 Unlock All 10 Personas
          </Link>
        )}
      </div>

      {/* Grid of 10 Personas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {PERSONA_LIST.map((persona, index) => {
          // Free users: first 5 unlocked, last 5 locked
          const isLocked = !isPremium && index >= 5;

          return (
            <div
              key={persona.id}
              onClick={() => handleCardClick(persona.id, isLocked)}
              className={`glass-card p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border-t-4 group cursor-pointer ${
                isLocked ? 'hover:border-amber-400' : 'hover:-translate-y-2 hover:shadow-2xl'
              }`}
              style={{
                borderTopColor: isLocked ? '#F5C842' : persona.color,
                boxShadow: isLocked ? 'none' : `0 10px 25px -10px ${persona.color}40`
              }}
            >
              {/* Premium Lock Badge */}
              {isLocked && (
                <div className="absolute top-3 right-3 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                  👑 Premium
                </div>
              )}

              {/* Portrait & Title */}
              <div className="flex flex-col items-center text-center gap-3 mt-2">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <PersonaAvatar id={persona.id} size={72} />
                </div>
                
                {/* Persona Name in Cinzel Font */}
                <h3 className="text-base font-roman font-bold text-[#F0F4FF] tracking-wide mt-1">
                  {persona.name}
                </h3>

                <span
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${persona.color}20`, color: persona.color }}
                >
                  {persona.domain}
                </span>

                <p className="text-xs text-[#9A8EC0] line-clamp-2 mt-1 leading-snug">
                  {persona.bio}
                </p>
              </div>

              {/* Button Action */}
              <div className="mt-6 pt-3 border-t border-white/10 w-full">
                {isLocked ? (
                  <button className="w-full py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-all flex items-center justify-center gap-1.5">
                    🔒 Unlock with Premium
                  </button>
                ) : (
                  <button
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-white transition-all flex items-center justify-center gap-1 group-hover:shadow-lg"
                    style={{ backgroundColor: persona.color }}
                  >
                    Talk to {persona.name.split(' ')[0]} →
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
