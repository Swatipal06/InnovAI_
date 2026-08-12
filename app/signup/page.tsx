'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInnovAI, calculateAgeSegment } from '@/app/context/InnovAIContext';
import { PersonaAvatar } from '@/components/PersonaAvatar';
import { InnovAILogo } from '@/components/InnovAILogo';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useInnovAI();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('2002-08-15');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { age, segment } = calculateAgeSegment(dob);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !dob) return;
    setLoading(true);
    setTimeout(() => {
      signup(name, email, dob);
      router.push('/onboarding');
    }, 600);
  };

  const handleGoogleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      signup('Google Innovator', 'google.user@innovai.app', '2001-05-10');
      router.push('/onboarding');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full flex items-center justify-center py-8 px-4 md:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side Hero */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 relative">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-400/30 shadow-lg shadow-amber-500/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-rose-300">
              Your safe harbor for honesty
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold leading-[1.15] text-[#F0F4FF]">
            Create Your Private <br className="hidden sm:inline" />
            <span className="text-gradient-gold-rose-violet">
              Universe of Minds
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#9A8EC0] max-w-xl leading-relaxed">
            No judgment. No social pressure. Just genuine wisdom tailored precisely to your age and life stage.
          </p>

          {/* 5 Floating Illustrated AI Face Cards */}
          <div className="w-full relative h-48 sm:h-56 my-2 overflow-hidden sm:overflow-visible">
            <div className="absolute left-0 sm:left-4 top-2 animate-float-1 glass-card p-3 flex items-center gap-3 border-amber-400/30">
              <PersonaAvatar id="einstein" size={48} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-amber-200">Einstein</h4>
                <p className="text-[11px] text-[#9A8EC0]">Physics & Curiosity</p>
              </div>
            </div>

            <div className="absolute right-2 sm:right-10 top-0 animate-float-2 glass-card p-3 flex items-center gap-3 border-violet-500/30">
              <PersonaAvatar id="tesla" size={48} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-violet-300">Tesla</h4>
                <p className="text-[11px] text-[#9A8EC0]">Invention & Vision</p>
              </div>
            </div>

            <div className="absolute left-10 sm:left-36 top-24 sm:top-28 animate-float-3 glass-card p-3 flex items-center gap-3 border-yellow-400/30">
              <PersonaAvatar id="buddha" size={48} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-yellow-300">Buddha</h4>
                <p className="text-[11px] text-[#9A8EC0]">Peace & Mindfulness</p>
              </div>
            </div>

            <div className="absolute right-12 sm:right-40 top-24 sm:top-28 animate-float-1 glass-card p-3 flex items-center gap-3 border-cyan-400/30">
              <PersonaAvatar id="kalam" size={48} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-cyan-200">Dr. APJ Kalam</h4>
                <p className="text-[11px] text-[#9A8EC0]">Dreams & Leadership</p>
              </div>
            </div>

            <div className="hidden sm:flex absolute right-0 top-14 animate-float-2 glass-card p-3 items-center gap-3 border-emerald-400/30">
              <PersonaAvatar id="coach" size={44} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-emerald-300">AI Coach</h4>
                <p className="text-[11px] text-[#9A8EC0]">Growth & Career</p>
              </div>
            </div>
          </div>

          <div className="w-full pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-medium text-[#9A8EC0]">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Private conversations
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Multi-mind AI
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Age-Adaptive Guidance
            </span>
          </div>

        </div>

        {/* Right Side Signup Card */}
        <div className="lg:col-span-5 w-full">
          <div className="animated-gradient-border p-6 sm:p-8 shadow-2xl">
            
            <div className="flex flex-col items-center text-center gap-2 mb-6">
              <div className="mb-2">
                <InnovAILogo variant="gradient" size={44} showText={false} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#F0F4FF]">Create your private space</h2>
              <p className="text-xs text-[#9A8EC0]">Start having judgment-free conversations</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#9A8EC0]">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swati Pal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input px-4 py-3 text-sm w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#9A8EC0]">Email address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input px-4 py-3 text-sm w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#9A8EC0]">Date of Birth</label>
                  <span className="text-[11px] font-semibold text-amber-300 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                    {age} yrs • {segment}
                  </span>
                </div>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="glass-input px-4 py-3 text-sm w-full"
                />
                <p className="text-[11px] text-[#9A8EC0]">
                  Used for age-adaptive responses ({segment} mode)
                </p>
              </div>

              <div className="flex flex-col gap-1.5 relative">
                <label className="text-xs font-semibold text-[#9A8EC0]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-input px-4 py-3 text-sm w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9A8EC0] hover:text-white"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gradient w-full py-3.5 mt-2 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg shadow-violet-600/30"
              >
                {loading ? 'Setting up space...' : 'Create Account & Continue →'}
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-xs text-[#9A8EC0] uppercase tracking-wider">or</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full py-3 px-4 glass-card hover:bg-white/10 border border-white/15 rounded-xl flex items-center justify-center gap-3 text-sm font-medium transition-all text-[#F0F4FF]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                </svg>
                Continue with Google
              </button>

              <p className="text-center text-xs text-[#9A8EC0] mt-1">
                Already have an account?{' '}
                <Link href="/login" className="text-amber-400 font-semibold hover:underline">
                  Login
                </Link>
              </p>

              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#9A8EC0] leading-tight">
                <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Your conversations are completely private. We never share or monetize your personal data.</span>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
