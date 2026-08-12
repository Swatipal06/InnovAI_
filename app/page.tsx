'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInnovAI } from './context/InnovAIContext';

export default function RootPage() {
  const router = useRouter();
  const { user, isLoading } = useInnovAI();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-violet-500/20 border-t-violet-400 animate-spin" />
      <span className="text-xs text-[#9A8EC0] tracking-wider uppercase">Loading InnovAI Universe...</span>
    </div>
  );
}
