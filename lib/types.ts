export type PersonaId = 
  | 'einstein'
  | 'buddha'
  | 'chanakya'
  | 'vivekananda'
  | 'kalam'
  | 'davinci'
  | 'tesla'
  | 'suntzu'
  | 'listener'
  | 'coach';

export type AgeSegment = 'Student' | 'Youth' | 'Young Adult' | 'Mature' | 'Elder';

export type SubscriptionTier = 'free' | 'seeker' | 'sage';

export interface Persona {
  id: PersonaId;
  name: string;
  domain: string;
  color: string; // Hex color code
  emoji: string;
  topics: string[];
  systemPrompt: string;
  limitMessage: string;
  bio: string;
  quotePreview: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  personaId: PersonaId;
  createdAt: string;
  messageCount: number;
  lastMessageAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  dob?: string;
  ageSegment: AgeSegment;
  subscriptionTier: SubscriptionTier;
  createdAt: string;
}

export interface QuizState {
  mindOnMind?: string;
  needMost?: string;
  feeling?: string;
}
