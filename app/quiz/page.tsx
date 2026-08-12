'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInnovAI } from '@/app/context/InnovAIContext';
import { PERSONAS } from '@/lib/personas';
import { PersonaId } from '@/lib/types';
import { PersonaAvatar } from '@/components/PersonaAvatar';

export default function PremiumQuizPage() {
  const router = useRouter();
  const { user } = useInnovAI();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    onMind: '',
    needMost: '',
    feeling: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [matchedPersonaId, setMatchedPersonaId] = useState<PersonaId | null>(null);
  const [cyclingIndex, setCyclingIndex] = useState(0);

  const personaIds: PersonaId[] = [
    'einstein', 'buddha', 'chanakya', 'vivekananda', 'kalam',
    'davinci', 'tesla', 'suntzu', 'listener', 'coach'
  ];

  // Cycling animation during loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setCyclingIndex((prev) => (prev + 1) % personaIds.length);
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSelectOption = (key: keyof typeof answers, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finished Q3 -> Start loading screen
      setIsLoading(true);
      const matched = computeQuizPersonaMatch(updated);
      setTimeout(() => {
        setIsLoading(false);
        setMatchedPersonaId(matched);
      }, 2200);
    }
  };

  const handleBeginChat = () => {
    if (matchedPersonaId) {
      router.push(`/chat/${matchedPersonaId}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full glass-card p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border-white/15">
        
        {/* Loading Screen */}
        {isLoading && (
          <div className="flex flex-col items-center gap-6 animate-fadeIn py-8">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-violet-500/20 border-t-violet-400 animate-spin" />
              <PersonaAvatar id={personaIds[cyclingIndex]} size={64} />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#F0F4FF]">
              Finding your mind for today...
            </h3>
            <p className="text-xs text-[#9A8EC0]">
              Analyzing your current energy, emotions, and decisions
            </p>
          </div>
        )}

        {/* Revealed Match Screen */}
        {!isLoading && matchedPersonaId && (
          <div className="flex flex-col items-center gap-6 animate-fadeIn py-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              ✨ Daily Mind Alignment Found
            </div>

            <div className="transform hover:scale-105 transition-transform my-2">
              <PersonaAvatar id={matchedPersonaId} size={96} />
            </div>

            <h3 className="text-3xl font-serif font-extrabold text-[#F0F4FF]">
              {PERSONAS[matchedPersonaId].name}
            </h3>

            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${PERSONAS[matchedPersonaId].color}20`,
                color: PERSONAS[matchedPersonaId].color
              }}
            >
              {PERSONAS[matchedPersonaId].domain}
            </span>

            <p className="text-base text-[#9A8EC0] max-w-md italic">
              "{PERSONAS[matchedPersonaId].quotePreview}"
            </p>

            <button
              onClick={handleBeginChat}
              className="btn-gold-gradient px-8 py-4 text-base font-bold shadow-xl shadow-amber-500/30 mt-4"
            >
              Begin Conversation →
            </button>
          </div>
        )}

        {/* Quiz Steps (Q1, Q2, Q3) */}
        {!isLoading && !matchedPersonaId && (
          <div className="flex flex-col items-center gap-6">
            
            {/* Step Bar */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    s === step ? 'w-8 bg-gradient-to-r from-amber-400 to-violet-500' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Q1 */}
            {step === 1 && (
              <div className="flex flex-col items-center gap-6 animate-fadeIn w-full">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                  Question 1 of 3
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#F0F4FF]">
                  What’s on your mind?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mt-2">
                  {[
                    'Career & Growth',
                    'Relationships',
                    'Learning something new',
                    'Life decisions',
                    'Just need to talk',
                    'Something else'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption('onMind', opt)}
                      className="glass-card hover:bg-white/10 p-4 text-sm font-medium text-[#F0F4FF] hover:border-violet-400 transition-all rounded-xl border border-white/10 text-left"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q2 */}
            {step === 2 && (
              <div className="flex flex-col items-center gap-6 animate-fadeIn w-full">
                <span className="text-xs font-semibold text-violet-300 uppercase tracking-wider">
                  Question 2 of 3
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#F0F4FF]">
                  What do you need most right now?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mt-2">
                  {[
                    'Clarity',
                    'Motivation',
                    'Strategy',
                    'Someone to listen',
                    'Knowledge',
                    'Peace'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption('needMost', opt)}
                      className="glass-card hover:bg-white/10 p-4 text-sm font-medium text-[#F0F4FF] hover:border-amber-400 transition-all rounded-xl border border-white/10 text-left"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q3 */}
            {step === 3 && (
              <div className="flex flex-col items-center gap-6 animate-fadeIn w-full">
                <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                  Question 3 of 3
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#F0F4FF]">
                  How are you feeling?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mt-2">
                  {[
                    'Calm',
                    'Anxious',
                    'Motivated',
                    'Lost',
                    'Curious',
                    'Exhausted'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption('feeling', opt)}
                      className="glass-card hover:bg-white/10 p-4 text-sm font-medium text-[#F0F4FF] hover:border-cyan-400 transition-all rounded-xl border border-white/10 text-left"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

// Persona selection logic (backend scoring per prompt specs):
function computeQuizPersonaMatch(answers: { onMind: string; needMost: string; feeling: string }): PersonaId {
  const { onMind, needMost, feeling } = answers;

  if (onMind.includes('Career') && needMost.includes('Strategy') && feeling.includes('Anxious')) return 'chanakya';
  if (onMind.includes('Life') && needMost.includes('listen') && feeling.includes('Lost')) return 'kalam';
  if (onMind.includes('Learning') && needMost.includes('Knowledge') && feeling.includes('Curious')) return 'einstein';
  if (onMind.includes('Relationships') && needMost.includes('listen')) return 'listener';
  if (onMind.includes('Growth') && needMost.includes('Motivation')) return 'vivekananda';
  if (onMind.includes('decisions') && needMost.includes('Clarity')) return 'buddha';
  if (onMind.includes('Learning') || (needMost.includes('Knowledge') && feeling.includes('Curious'))) return 'davinci';
  if (onMind.includes('talk') || feeling.includes('Lost')) return 'listener';
  if (needMost.includes('Strategy')) return 'suntzu';
  if (onMind.includes('Career')) return 'coach';

  return 'buddha';
}
