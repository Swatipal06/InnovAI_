'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AgeSegment, SubscriptionTier, Message } from '@/lib/types';

interface InnovAIContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string, dob: string) => void;
  logout: () => void;
  updateSubscription: (tier: SubscriptionTier) => void;
  // Message Limit & Cooldown
  messagesUsedToday: number;
  maxFreeMessages: number;
  cooldownUntil: number | null; // Timestamp
  incrementMessageCount: () => boolean; // Returns true if permitted, false if limit reached
  conversations: Record<string, Message[]>; // Key: personaId, Value: Message[]
  addMessage: (personaId: string, role: 'user' | 'assistant', content: string) => Message;
}

export function calculateAgeSegment(dobString: string): { age: number; segment: AgeSegment } {
  if (!dobString) return { age: 22, segment: 'Youth' };
  
  const birthDate = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (isNaN(age) || age < 5) age = 22;

  let segment: AgeSegment = 'Youth';
  if (age >= 13 && age <= 17) segment = 'Student';
  else if (age >= 18 && age <= 25) segment = 'Youth';
  else if (age >= 26 && age <= 35) segment = 'Young Adult';
  else if (age >= 36 && age <= 50) segment = 'Mature';
  else if (age > 50) segment = 'Elder';

  return { age, segment };
}

const InnovAIContext = createContext<InnovAIContextType | undefined>(undefined);

const MAX_FREE_MESSAGES = 8;
const COOLDOWN_HOURS = 12;

export function InnovAIProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messagesUsedToday, setMessagesUsedToday] = useState<number>(0);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('innovai_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Default guest user for quick preview if not logged in
        const defaultGuest: User = {
          id: 'usr_demo',
          name: 'Innovator',
          email: 'user@innovai.app',
          dob: '2001-05-15',
          ageSegment: 'Youth',
          subscriptionTier: 'free',
          createdAt: new Date().toISOString()
        };
        setUser(defaultGuest);
        localStorage.setItem('innovai_user', JSON.stringify(defaultGuest));
      }

      const storedLimits = localStorage.getItem('innovai_limits');
      if (storedLimits) {
        const parsed = JSON.parse(storedLimits);
        // Check if cooldown has expired
        if (parsed.cooldownUntil && Date.now() >= parsed.cooldownUntil) {
          setMessagesUsedToday(0);
          setCooldownUntil(null);
          localStorage.removeItem('innovai_limits');
        } else {
          setMessagesUsedToday(parsed.messagesUsedToday || 0);
          setCooldownUntil(parsed.cooldownUntil || null);
        }
      }

      const storedConversations = localStorage.getItem('innovai_conversations');
      if (storedConversations) {
        setConversations(JSON.parse(storedConversations));
      }
    } catch (err) {
      console.error('Failed to load local storage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save updates to localStorage
  const saveUser = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('innovai_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('innovai_user');
    }
  };

  const login = (email: string, name?: string) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      email,
      name: name || email.split('@')[0] || 'Innovator',
      dob: '2000-01-01',
      ageSegment: 'Youth',
      subscriptionTier: 'free',
      createdAt: new Date().toISOString()
    };
    saveUser(newUser);
  };

  const signup = (name: string, email: string, dob: string) => {
    const { segment } = calculateAgeSegment(dob);
    const newUser: User = {
      id: 'usr_' + Date.now(),
      email,
      name,
      dob,
      ageSegment: segment,
      subscriptionTier: 'free',
      createdAt: new Date().toISOString()
    };
    saveUser(newUser);
  };

  const logout = () => {
    saveUser(null);
  };

  const updateSubscription = (tier: SubscriptionTier) => {
    if (!user) return;
    const updated = { ...user, subscriptionTier: tier };
    saveUser(updated);
    // Reset limits if upgraded
    if (tier !== 'free') {
      setMessagesUsedToday(0);
      setCooldownUntil(null);
      localStorage.removeItem('innovai_limits');
    }
  };

  const incrementMessageCount = (): boolean => {
    // If premium, unlimited
    if (user?.subscriptionTier === 'seeker' || user?.subscriptionTier === 'sage') {
      return true;
    }

    // Check current cooldown
    if (cooldownUntil && Date.now() < cooldownUntil) {
      return false;
    }

    const nextCount = messagesUsedToday + 1;
    if (nextCount > MAX_FREE_MESSAGES) {
      // Set 12h cooldown
      const coolDownTime = Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000;
      setCooldownUntil(coolDownTime);
      localStorage.setItem('innovai_limits', JSON.stringify({
        messagesUsedToday: nextCount,
        cooldownUntil: coolDownTime
      }));
      return false;
    }

    setMessagesUsedToday(nextCount);
    localStorage.setItem('innovai_limits', JSON.stringify({
      messagesUsedToday: nextCount,
      cooldownUntil: cooldownUntil
    }));

    if (nextCount >= MAX_FREE_MESSAGES) {
      const coolDownTime = Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000;
      setCooldownUntil(coolDownTime);
      localStorage.setItem('innovai_limits', JSON.stringify({
        messagesUsedToday: nextCount,
        cooldownUntil: coolDownTime
      }));
    }

    return true;
  };

  const addMessage = (personaId: string, role: 'user' | 'assistant', content: string): Message => {
    const newMessage: Message = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      conversationId: 'conv_' + personaId,
      role,
      content,
      createdAt: new Date().toISOString()
    };

    setConversations(prev => {
      const existing = prev[personaId] || [];
      const updated = [...existing, newMessage];
      const nextMap = { ...prev, [personaId]: updated };
      localStorage.setItem('innovai_conversations', JSON.stringify(nextMap));
      return nextMap;
    });

    return newMessage;
  };

  return (
    <InnovAIContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateSubscription,
        messagesUsedToday,
        maxFreeMessages: MAX_FREE_MESSAGES,
        cooldownUntil,
        incrementMessageCount,
        conversations,
        addMessage
      }}
    >
      {children}
    </InnovAIContext.Provider>
  );
}

export function useInnovAI() {
  const context = useContext(InnovAIContext);
  if (!context) {
    throw new Error('useInnovAI must be used within an InnovAIProvider');
  }
  return context;
}
