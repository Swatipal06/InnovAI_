'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInnovAI } from '@/app/context/InnovAIContext';
import { PERSONAS } from '@/lib/personas';
import { PersonaId } from '@/lib/types';
import { PersonaAvatar } from '@/components/PersonaAvatar';

export default function HomePage() {
  const router = useRouter();
  const { user } = useInnovAI();
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [topPersonas, setTopPersonas] = useState<PersonaId[]>([
    'einstein',
    'buddha',
    'kalam',
    'listener',
    'coach'
  ]);
  const [selectedPersonaId, setSelectedPersonaId] = useState<PersonaId | null>(null);

  // Time-based greeting calculation
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    const name = user?.name || 'Innovator';
    if (hour >= 5 && hour < 12) {
      setGreeting(`Good morning ${name}. What are you thinking about today?`);
    } else if (hour >= 12 && hour < 17) {
      setGreeting(`What's been on your mind, ${name}?`);
    } else if (hour >= 17 && hour < 21) {
      setGreeting(`How did today treat you, ${name}?`);
    } else {
      setGreeting(`Can't sleep, ${name}? What's going through your head?`);
    }
  }, [user]);

  const handleMatchPersonas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/chat/match-personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput })
      });
      const data = await res.json();
      if (data.rankedIds && Array.isArray(data.rankedIds)) {
        setTopPersonas(data.rankedIds);
      }
    } catch (err) {
      console.error('Failed to match personas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonaClick = (id: PersonaId) => {
    if (user?.subscriptionTier === 'free') {
      if (selectedPersonaId && selectedPersonaId !== id) {
        // Free user single selection lock
        return;
      }
      setSelectedPersonaId(id);
    }
    router.push(`/chat/${id}`);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full py-10 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center gap-10">
      
      {/* Hero Greeting Section */}
      <div className="text-center flex flex-col items-center gap-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-violet-400/30 shadow-lg shadow-violet-500/10">
          <span className="text-xs font-semibold text-violet-300">
            {user?.ageSegment || 'Youth'} Mode • Judgment-Free Sanctuary
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-[#F0F4FF] leading-tight">
          {greeting}
        </h1>

        <p className="text-sm md:text-base text-[#9A8EC0]">
          Share anything — your biggest fear, career dilemma, scientific curiosity, or raw emotion.
        </p>
      </div>

      {/* Main Input Box */}
      <form onSubmit={handleMatchPersonas} className="w-full max-w-3xl flex flex-col gap-3">
        <div className="glass-card p-3 sm:p-4 border-violet-500/30 focus-within:border-violet-400 focus-within:shadow-2xl focus-within:shadow-violet-500/20 transition-all flex flex-col gap-3">
          <textarea
            rows={3}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type anything — a problem, a feeling, a question, or just what happened today..."
            className="w-full bg-transparent border-none focus:outline-none text-[#F0F4FF] placeholder-[#9A8EC0] text-base resize-none"
          />
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs text-[#9A8EC0] hidden sm:inline">
              ✨ AI Gemini Engine will recommend the top 5 minds for your situation
            </span>
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient px-6 py-2.5 ml-auto flex items-center gap-2 text-sm font-semibold shadow-lg shadow-violet-600/30"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Matching Minds...
                </>
              ) : (
                'Find my minds →'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Top 5 Persona Suggestions Section */}
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#F0F4FF]">
              Top Minds Matched For You
            </h2>
            <p className="text-xs text-[#9A8EC0]">
              Click any mind to open a direct, private conversation
            </p>
          </div>
          {user?.subscriptionTier === 'free' && (
            <span className="text-xs px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300">
              Free Plan: 1 Active Persona Pick
            </span>
          )}
        </div>

        {/* 5 Suggestion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPersonas.map((id) => {
            const persona = PERSONAS[id];
            if (!persona) return null;

            const isLockedForFree = user?.subscriptionTier === 'free' && selectedPersonaId !== null && selectedPersonaId !== id;

            return (
              <div
                key={id}
                onClick={() => !isLockedForFree && handlePersonaClick(id)}
                className={`glass-card p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border-t-4 ${
                  isLockedForFree ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-2.5 hover:shadow-2xl'
                }`}
                style={{
                  borderTopColor: persona.color,
                  boxShadow: `0 10px 30px -10px ${persona.color}33`
                }}
              >
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <PersonaAvatar id={id} size={56} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-serif font-bold text-[#F0F4FF]">
                      {persona.name}
                    </h3>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-md inline-block w-fit mt-1"
                      style={{ backgroundColor: `${persona.color}20`, color: persona.color }}
                    >
                      {persona.domain}
                    </span>
                  </div>
                </div>

                {/* Preview Quote */}
                <p className="text-xs text-[#9A8EC0] italic mt-4 mb-4 line-clamp-3 leading-relaxed">
                  "{persona.quotePreview}"
                </p>

                {/* Topics strip & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                  <div className="flex flex-wrap gap-1">
                    {persona.topics.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#9A8EC0]">
                        #{t}
                      </span>
                    ))}
                  </div>
                  
                  {isLockedForFree ? (
                    <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                      🔒 Locked
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-amber-300 flex items-center gap-1 hover:translate-x-1 transition-transform">
                      Talk →
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
