'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInnovAI } from '@/app/context/InnovAIContext';

export default function PricingPage() {
  const router = useRouter();
  const { user, updateSubscription } = useInnovAI();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; amount: number } | null>(null);

  const handleSelectPlan = async (planId: string, name: string, amount: number) => {
    if (planId === 'free') {
      updateSubscription('free');
      router.push('/home');
      return;
    }

    setLoadingPlan(planId);
    setSelectedPlan({ id: planId, name, amount });

    try {
      // Call order API
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, amount })
      });
      const orderData = await res.json();

      // Open test payment modal or Razorpay Checkout
      setTimeout(() => {
        setLoadingPlan(null);
        setTestModalOpen(true);
      }, 500);

    } catch (err) {
      console.error('Error starting checkout:', err);
      setLoadingPlan(null);
    }
  };

  const handleConfirmTestPayment = () => {
    if (!selectedPlan) return;
    const tier = selectedPlan.id === 'seeker' ? 'seeker' : 'sage';
    updateSubscription(tier);
    setTestModalOpen(false);
    router.push('/home');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full py-12 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center gap-10">
      
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
          👑 Premium Membership
        </div>
        
        <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-[#F0F4FF]">
          Invest in Your Inner Sanctuary
        </h1>

        <p className="text-sm md:text-base text-[#9A8EC0]">
          Unlock unlimited judgment-free conversations, daily mind-matching quizzes, and persistent wisdom.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch">
        
        {/* Tier 1: Explorer (Free) */}
        <div className="glass-card p-6 md:p-8 flex flex-col justify-between border border-white/10 relative">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#F0F4FF]">Explorer</h3>
            <p className="text-xs text-[#9A8EC0] mt-1">Get started with basic judgment-free space</p>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-[#F0F4FF]">₹0</span>
              <span className="text-xs text-[#9A8EC0]"> / month</span>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-[#9A8EC0] border-t border-white/10 pt-6">
              <li className="flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                8 messages per session
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                12-hour cooldown timer
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                5 persona recommendations per question
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                View all 10 avatars
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Private & judgment-free
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('free', 'Explorer', 0)}
            disabled={user?.subscriptionTier === 'free'}
            className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/15 text-xs font-semibold text-[#F0F4FF] hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {user?.subscriptionTier === 'free' ? 'Current Active Plan' : 'Select Free Plan'}
          </button>
        </div>

        {/* Tier 2: Seeker (Recommended) */}
        <div className="glass-card p-6 md:p-8 flex flex-col justify-between border-2 border-amber-400 relative shadow-2xl shadow-amber-500/20 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent">
          
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-bold text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
            Most Popular
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold text-amber-300">Seeker</h3>
            <p className="text-xs text-[#9A8EC0] mt-1">Unlimited minds for dedicated growth</p>

            <div className="my-6 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#F0F4FF]">₹199</span>
              <span className="text-xs text-[#9A8EC0]"> / month ($4)</span>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-[#F0F4FF] border-t border-white/10 pt-6">
              <li className="flex items-center gap-2 font-semibold text-amber-300">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Unlimited Messages (No limits)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                No 12-hour cooldown
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Daily Quiz → Persona Alignment
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                All 10 personas direct access
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Conversation history saved forever
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Age-adaptive AI prompting
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('seeker', 'Seeker Plan', 199)}
            disabled={loadingPlan === 'seeker' || user?.subscriptionTier === 'seeker'}
            className="btn-gold-gradient w-full mt-8 py-3.5 text-xs font-bold shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2"
          >
            {user?.subscriptionTier === 'seeker'
              ? 'Current Active Plan'
              : loadingPlan === 'seeker'
              ? 'Opening Razorpay...'
              : 'Upgrade to Seeker →'}
          </button>
        </div>

        {/* Tier 3: Sage (Pro) */}
        <div className="glass-card p-6 md:p-8 flex flex-col justify-between border border-violet-500/40 relative">
          <div>
            <h3 className="text-xl font-serif font-bold text-violet-300">Sage</h3>
            <p className="text-xs text-[#9A8EC0] mt-1">For maximum depth, wisdom notes, & voice</p>

            <div className="my-6 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#F0F4FF]">₹399</span>
              <span className="text-xs text-[#9A8EC0]"> / month ($9)</span>
            </div>

            <ul className="flex flex-col gap-3 text-xs text-[#F0F4FF] border-t border-white/10 pt-6">
              <li className="flex items-center gap-2 text-violet-300 font-semibold">
                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Everything in Seeker Plan
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Voice Conversations (Coming soon)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Wisdom Notes (AI conversation summaries)
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Priority response latency
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('sage', 'Sage Plan', 399)}
            disabled={loadingPlan === 'sage' || user?.subscriptionTier === 'sage'}
            className="btn-gradient w-full mt-8 py-3.5 text-xs font-semibold shadow-xl shadow-violet-600/30 flex items-center justify-center gap-2"
          >
            {user?.subscriptionTier === 'sage'
              ? 'Current Active Plan'
              : loadingPlan === 'sage'
              ? 'Opening Razorpay...'
              : 'Upgrade to Sage →'}
          </button>
        </div>

      </div>

      {/* Razorpay Test Modal */}
      {testModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-card max-w-md w-full p-6 border-2 border-amber-400/50 shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">💳</span>
                <h3 className="text-lg font-serif font-bold text-[#F0F4FF]">Razorpay Payment Modal</h3>
              </div>
              <button
                onClick={() => setTestModalOpen(false)}
                className="text-xs text-[#9A8EC0] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 text-left">
              <p className="text-xs text-[#9A8EC0]">
                Simulating Secure Razorpay Checkout for <span className="text-amber-300 font-semibold">{selectedPlan.name}</span>:
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-sm text-[#F0F4FF]">Total Amount</span>
                <span className="text-lg font-bold text-amber-300">₹{selectedPlan.amount} INR</span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs flex items-center gap-2">
                <span>✅ Razorpay API Endpoint connected: `/api/payment/create-order`</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setTestModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/15 text-xs font-semibold text-[#9A8EC0] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmTestPayment}
                className="flex-1 btn-gold-gradient py-2.5 text-xs font-bold shadow-lg shadow-amber-500/30"
              >
                Simulate Payment Success →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
