'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useInnovAI } from '@/app/context/InnovAIContext';
import { PERSONAS } from '@/lib/personas';
import { PersonaId, Message } from '@/lib/types';
import { PersonaAvatar } from '@/components/PersonaAvatar';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const personaId = params.personaId as PersonaId;
  const persona = PERSONAS[personaId];

  const {
    user,
    conversations,
    addMessage,
    messagesUsedToday,
    maxFreeMessages,
    cooldownUntil,
    incrementMessageCount
  } = useInnovAI();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages: Message[] = conversations[personaId] || [];

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial welcome message from persona if conversation is empty
  useEffect(() => {
    if (persona && messages.length === 0) {
      const initialGreeting = getInitialGreeting(personaId, user?.name || 'Innovator');
      addMessage(personaId, 'assistant', initialGreeting);
    }
  }, [personaId, persona]);

  if (!persona) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-rose-400">Persona not found</p>
        <Link href="/home" className="btn-gradient px-4 py-2 text-sm">
          Return Home
        </Link>
      </div>
    );
  }

  const isFree = user?.subscriptionTier === 'free';
  const remaining = maxFreeMessages - messagesUsedToday;
  const isCooldown = isFree && cooldownUntil !== null && Date.now() < cooldownUntil;
  const isLimitReached = isFree && (remaining <= 0 || isCooldown);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping || isLimitReached) return;

    // Check message limit before sending
    const permitted = incrementMessageCount();
    if (!permitted) {
      return;
    }

    const userText = input.trim();
    setInput('');
    addMessage(personaId, 'user', userText);

    setIsTyping(true);

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaId,
          message: userText,
          history: messages,
          userName: user?.name || 'Innovator',
          userAge: user?.dob ? calculateAgeFromDOB(user.dob) : 22,
          ageSegment: user?.ageSegment || 'Youth'
        })
      });

      const data = await res.json();
      if (data.reply) {
        addMessage(personaId, 'assistant', data.reply);
      }
    } catch (err) {
      console.error('Chat error:', err);
      addMessage(personaId, 'assistant', `I felt your thoughts, ${user?.name || 'Innovator'}, but my connection flickered for a moment. Could you ask me that once more?`);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto w-full px-2 sm:px-4 py-4">
      
      {/* Header */}
      <div className="glass-card p-3 sm:p-4 flex items-center justify-between border-b border-white/10 shrink-0 mb-4">
        
        {/* Left Back + Avatar + Details */}
        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#9A8EC0] hover:text-white transition-all"
            title="Back to Home"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          <div className="relative">
            <PersonaAvatar id={personaId} size={44} />
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0D0B1E]"
              style={{ backgroundColor: persona.color }}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-base font-serif font-bold text-[#F0F4FF] flex items-center gap-2">
              {persona.name}
            </h2>
            <span className="text-xs text-[#9A8EC0] font-medium">{persona.domain}</span>
          </div>
        </div>

        {/* Right Message Counter */}
        {isFree ? (
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
              remaining <= 3
                ? 'bg-amber-500/10 border-amber-400/40 text-amber-300'
                : 'bg-white/5 border-white/10 text-[#9A8EC0]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            {remaining > 0 ? `${remaining} messages left` : 'Limit reached'}
          </div>
        ) : (
          <div className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 flex items-center gap-1">
            ✨ Unlimited Premium Space
          </div>
        )}

      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] sm:max-w-[78%] animate-fadeIn ${
              msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <div
              className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-none shadow-lg shadow-violet-600/20'
                  : 'glass-card text-[#F0F4FF] rounded-bl-none border border-white/10 shadow-xl'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-white/10">
                  <span className="text-xs font-serif font-bold text-amber-300">
                    {persona.name}
                  </span>
                </div>
              )}
              {msg.content}
            </div>

            <span className="text-[10px] text-[#9A8EC0] mt-1 px-1" suppressHydrationWarning>
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="self-start glass-card p-4 rounded-2xl rounded-bl-none flex items-center gap-2 border border-white/10">
            <span className="text-xs font-serif text-amber-300 mr-2">{persona.name} is reflecting...</span>
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: persona.color }} />
            <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.2s]" style={{ backgroundColor: persona.color }} />
            <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.4s]" style={{ backgroundColor: persona.color }} />
          </div>
        )}

        {/* Limit Card at 8 messages */}
        {isLimitReached && (
          <div className="my-6 glass-card p-6 border-2 border-amber-400/40 text-center flex flex-col items-center gap-4 bg-gradient-to-b from-amber-500/10 to-transparent shadow-2xl animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-2xl">
              ⏱️
            </div>

            <div className="flex flex-col gap-2 max-w-md">
              <h3 className="text-xl font-serif font-bold text-amber-300">
                "{persona.limitMessage}"
              </h3>
              <p className="text-xs text-[#9A8EC0] mt-1">
                ⏱ Your space reopens in 12 hours
              </p>
            </div>

            <Link
              href="/pricing"
              className="btn-gold-gradient px-8 py-3.5 text-sm font-bold shadow-xl shadow-amber-500/30 flex items-center gap-2 mt-2"
            >
              Continue this conversation now →
            </Link>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="mt-3 shrink-0">
        <div className="glass-card p-2 sm:p-3 flex items-center gap-2 border-violet-500/30">
          <textarea
            rows={1}
            disabled={isLimitReached || isTyping}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              isLimitReached
                ? 'Conversation paused. Upgrade to Seeker for unlimited messages.'
                : `Talk to ${persona.name}... (Press Enter to send)`
            }
            className="flex-1 bg-transparent border-none focus:outline-none text-[#F0F4FF] placeholder-[#9A8EC0] text-sm sm:text-base resize-none px-2"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping || isLimitReached}
            className="p-3 rounded-xl text-slate-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            style={{ backgroundColor: persona.color }}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </form>

    </div>
  );
}

function calculateAgeFromDOB(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (isNaN(age)) age = 22;
  return age;
}

function getInitialGreeting(id: PersonaId, name: string): string {
  switch (id) {
    case 'einstein':
      return `Welcome, ${name}! I was just pondering how curiosity leads us through the darkest questions. What thought experiment is spinning in your mind today?`;
    case 'buddha':
      return `Welcome to this quiet space, ${name}. Take a gentle breath and leave the noise outside. What is your heart seeking today?`;
    case 'chanakya':
      return `Greetings, ${name}. Strategy requires clear eyes and zero self-deception. What situation demands our sharpest decision today?`;
    case 'vivekananda':
      return `Arise, ${name}! You carry an ocean of strength inside you. What challenge are we going to conquer today?`;
    case 'kalam':
      return `Hello, my young friend ${name}! Every great journey begins with a courageous dream. What is on your mind today?`;
    case 'davinci':
      return `Greetings, ${name}. Look closely at the world — every challenge is an unexplored canvas of art and science. What shall we design together today?`;
    case 'tesla':
      return `Welcome, ${name}. I know what it feels like to hold visions that others cannot yet see. What future idea is vibrating in your thoughts?`;
    case 'suntzu':
      return `Greetings, ${name}. Victory belongs to those who calculate before the battle begins. What clarity do you seek today?`;
    case 'listener':
      return `Hello, ${name}. This space belongs entirely to you, and I am right here listening without judgment. How are you feeling inside today?`;
    case 'coach':
      return `Hey ${name}! Ready to map out your next big leap? What goal or career decision should we build upon today?`;
  }
}
