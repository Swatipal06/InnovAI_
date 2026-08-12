'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useInnovAI } from '@/app/context/InnovAIContext';
import { InnovAILogo } from './InnovAILogo';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useInnovAI();

  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/onboarding';

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0D0B1E]/80 border-b border-white/10 px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with Brain Circuit Icon */}
        <Link href={user ? '/home' : '/login'} className="flex items-center gap-3 group">
          <InnovAILogo variant="gradient" size={38} showText={true} />
        </Link>

        {!isAuthPage && (
          <>
            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
              <Link
                href="/home"
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  pathname === '/home'
                    ? 'bg-violet-600/80 text-white shadow-md shadow-violet-500/20'
                    : 'text-[#9A8EC0] hover:text-white hover:bg-white/5'
                }`}
              >
                Home
              </Link>
              <Link
                href="/avatars"
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  pathname === '/avatars'
                    ? 'bg-violet-600/80 text-white shadow-md shadow-violet-500/20'
                    : 'text-[#9A8EC0] hover:text-white hover:bg-white/5'
                }`}
              >
                Avatars
              </Link>
              {user?.subscriptionTier !== 'free' && (
                <Link
                  href="/quiz"
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    pathname === '/quiz'
                      ? 'bg-amber-500/80 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'text-amber-300 hover:text-amber-200 hover:bg-white/5'
                  }`}
                >
                  ✨ Daily Quiz
                </Link>
              )}
              <Link
                href="/pricing"
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  pathname === '/pricing'
                    ? 'bg-violet-600/80 text-white shadow-md shadow-violet-500/20'
                    : 'text-[#9A8EC0] hover:text-white hover:bg-white/5'
                }`}
              >
                Pricing
              </Link>
            </nav>

            {/* Right User Bar */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-sm font-semibold text-[#F0F4FF]">{user.name}</span>
                    <span className="text-[11px] font-medium text-amber-400 capitalize">
                      {user.subscriptionTier} Plan
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-rose-400 flex items-center justify-center font-bold text-white text-sm shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      router.push('/login');
                    }}
                    className="p-2 text-xs text-[#9A8EC0] hover:text-rose-400 transition-colors rounded-lg hover:bg-white/5"
                    title="Logout"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all shadow-md shadow-violet-600/30"
                >
                  Sign In
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile nav bottom bar */}
      {!isAuthPage && user && (
        <div className="flex md:hidden items-center justify-around mt-2 pt-2 border-t border-white/5">
          <Link href="/home" className={`text-xs px-3 py-1 rounded-lg ${pathname === '/home' ? 'text-amber-400 font-bold' : 'text-[#9A8EC0]'}`}>
            Home
          </Link>
          <Link href="/avatars" className={`text-xs px-3 py-1 rounded-lg ${pathname === '/avatars' ? 'text-amber-400 font-bold' : 'text-[#9A8EC0]'}`}>
            Avatars
          </Link>
          {user.subscriptionTier !== 'free' && (
            <Link href="/quiz" className={`text-xs px-3 py-1 rounded-lg ${pathname === '/quiz' ? 'text-amber-400 font-bold' : 'text-[#9A8EC0]'}`}>
              Quiz
            </Link>
          )}
          <Link href="/pricing" className={`text-xs px-3 py-1 rounded-lg ${pathname === '/pricing' ? 'text-amber-400 font-bold' : 'text-[#9A8EC0]'}`}>
            Pricing
          </Link>
        </div>
      )}
    </header>
  );
}
