'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInnovAI } from '@/app/context/InnovAIContext';
import { PERSONAS } from '@/lib/personas';
import { PersonaAvatar } from '@/components/PersonaAvatar';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useInnovAI();
  const [step, setStep] = useState(1);

  const handleFinish = () => {
    router.push('/home');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full glass-card p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border-white/15">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                s === step ? 'w-8 bg-gradient-to-r from-amber-400 to-rose-400' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* SCREEN 1 */}
        {step === 1 && (
          <div className="flex flex-col items-center gap-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
              🔒
            </div>

            <h2 className="text-sm uppercase tracking-widest text-emerald-400 font-semibold">
              Step 1 of 3 • Absolute Privacy
            </h2>

            <h3 className="text-3xl md:text-4xl font-serif font-extrabold text-[#F0F4FF] leading-snug">
              Before we begin —
            </h3>

            <p className="text-lg md:text-xl text-[#9A8EC0] leading-relaxed max-w-lg">
              Everything you share here is completely private.<br />
              <span className="text-white font-medium">No one will ever see this.</span> Not your friends. Not your family.<br />
              Just you.
            </p>

            <button
              onClick={() => setStep(2)}
              className="btn-gradient px-8 py-3.5 mt-4 text-base font-semibold shadow-xl shadow-violet-600/30"
            >
              Next →
            </button>
          </div>
        )}

        {/* SCREEN 2 */}
        {step === 2 && (
          <div className="flex flex-col items-center gap-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-400/30 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/20">
              🛡️
            </div>

            <h2 className="text-sm uppercase tracking-widest text-rose-400 font-semibold">
              Step 2 of 3 • Zero Judgment
            </h2>

            <h3 className="text-3xl md:text-4xl font-serif font-extrabold text-[#F0F4FF] leading-snug">
              You don’t have to pretend here.
            </h3>

            <p className="text-lg md:text-xl text-[#9A8EC0] leading-relaxed max-w-lg">
              You can be confused. Angry. Lost. Scared.<br />
              <span className="text-amber-300 font-medium">The minds here have seen it all</span> — and judged none of it.
            </p>

            <button
              onClick={() => setStep(3)}
              className="btn-gradient px-8 py-3.5 mt-4 text-base font-semibold shadow-xl shadow-violet-600/30"
            >
              Next →
            </button>
          </div>
        )}

        {/* SCREEN 3 */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20">
              ✨
            </div>

            <h2 className="text-sm uppercase tracking-widest text-amber-300 font-semibold">
              Step 3 of 3 • Welcome, {user?.name || 'Innovator'}
            </h2>

            <h3 className="text-3xl md:text-4xl font-serif font-extrabold text-[#F0F4FF] leading-snug">
              Who would you like to open up to today?
            </h3>

            {/* Quick avatar cluster */}
            <div className="flex items-center justify-center gap-3 my-2">
              {['einstein', 'buddha', 'kalam', 'listener', 'tesla'].map((id) => (
                <div key={id} className="transform hover:scale-110 transition-transform">
                  <PersonaAvatar id={id as any} size={48} />
                </div>
              ))}
            </div>

            <button
              onClick={handleFinish}
              className="btn-gold-gradient px-10 py-4 mt-4 text-lg font-bold shadow-2xl shadow-amber-500/30"
            >
              Enter InnovAI →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
