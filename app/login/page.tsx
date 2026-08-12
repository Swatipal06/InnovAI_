'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInnovAI } from '@/app/context/InnovAIContext';
import { PersonaAvatar } from '@/components/PersonaAvatar';
import { InnovAILogo } from '@/components/InnovAILogo';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useInnovAI();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      login(email);
      router.push('/home');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('google.user@innovai.app', 'Google Innovator');
      router.push('/home');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full flex items-center justify-center py-8 px-4 md:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side Hero (Desktop & Mobile) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 relative">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-400/30 shadow-lg shadow-amber-500/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-amber-300">
              Not one bot. A universe of minds.
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold leading-[1.15] text-[#F0F4FF]">
            Talk to the <br className="hidden sm:inline" />
            <span className="text-gradient-gold-rose-violet">
              Greatest Minds in History
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-[#9A8EC0] max-w-xl leading-relaxed">
            InnovAI is a private, judgment-free sanctuary where you can share your rawest thoughts, career anxiety, or wildest ideas with history’s greatest visionaries and modern experts.
          </p>

          {/* 5 Floating Illustrated AI Face Cards */}
          <div className="w-full relative h-48 sm:h-56 my-2 overflow-hidden sm:overflow-visible">
            
            {/* 1. Einstein Card */}
            <div className="absolute left-0 sm:left-4 top-2 animate-float-1 glass-card p-3 flex items-center gap-3 border-amber-400/30 shadow-xl shadow-amber-500/10">
              <PersonaAvatar id="einstein" size={48} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-amber-200">Einstein</h4>
                <p className="text-[11px] text-[#9A8EC0]">Physics & Curiosity</p>
              </div>
            </div>

            {/* 2. Tesla Card */}
            <div className="absolute right-2 sm:right-10 top-0 animate-float-2 glass-card p-3 flex items-center gap-3 border-violet-500/30 shadow-xl shadow-violet-500/20">
              <PersonaAvatar id="tesla" size={48} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-violet-300">Tesla</h4>
                <p className="text-[11px] text-[#9A8EC0]">Invention & Vision</p>
              </div>
            </div>

            {/* 3. Buddha Card */}
            <div className="absolute left-10 sm:left-36 top-24 sm:top-28 animate-float-3 glass-card p-3 flex items-center gap-3 border-yellow-400/30 shadow-xl shadow-yellow-500/15">
              <PersonaAvatar id="buddha" size={48} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-yellow-300">Buddha</h4>
                <p className="text-[11px] text-[#9A8EC0]">Peace & Mindfulness</p>
              </div>
            </div>

            {/* 4. Kalam Card */}
            <div className="absolute right-12 sm:right-40 top-24 sm:top-28 animate-float-1 glass-card p-3 flex items-center gap-3 border-cyan-400/30 shadow-xl shadow-cyan-500/15">
              <PersonaAvatar id="kalam" size={48} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-cyan-200">Dr. APJ Kalam</h4>
                <p className="text-[11px] text-[#9A8EC0]">Dreams & Leadership</p>
              </div>
            </div>

            {/* 5. AI Coach Card */}
            <div className="hidden sm:flex absolute right-0 top-14 animate-float-2 glass-card p-3 items-center gap-3 border-emerald-400/30 shadow-xl shadow-emerald-500/15">
              <PersonaAvatar id="coach" size={44} />
              <div>
                <h4 className="text-sm font-semibold font-serif text-emerald-300">AI Coach</h4>
                <p className="text-[11px] text-[#9A8EC0]">Growth & Career</p>
              </div>
            </div>

          </div>

          {/* Trust Strip */}
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
              Personalized guidance
            </span>
          </div>

        </div>

        {/* Right Side Auth Card */}
        <div className="lg:col-span-5 w-full">
          <div className="animated-gradient-border p-6 sm:p-8 shadow-2xl">
            
            {/* Card Header */}
            <div className="flex flex-col items-center text-center gap-2 mb-6">
              <div className="mb-2">
                <InnovAILogo variant="gradient" size={44} showText={false} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#F0F4FF]">Welcome back</h2>
              <p className="text-xs text-[#9A8EC0]">Step back into your private space of minds</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
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
                {loading ? 'Entering InnovAI...' : 'Enter InnovAI →'}
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-xs text-[#9A8EC0] uppercase tracking-wider">or</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
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

              <p className="text-center text-xs text-[#9A8EC0] mt-3">
                Don’t have an account?{' '}
                <Link href="/signup" className="text-amber-400 font-semibold hover:underline">
                  Create one
                </Link>
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
