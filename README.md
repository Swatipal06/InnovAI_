# InnovAI — AI Avatars for Innovators

> Talk to history's greatest minds. Privately. Without judgment.

---

## What is InnovAI?

InnovAI is a web platform where users can have real, emotionally 
intelligent conversations with AI personas of legendary historical 
figures and modern experts — Einstein, APJ Abdul Kalam, Buddha, 
Chanakya, Nikola Tesla, and more.

This generation is not lonely because they have no one around them. 
They are lonely because no one truly understands them — and the fear 
of being judged stops them from being honest with anyone.

InnovAI is the only place where you can be completely honest. 
No judgment. No one watching. Just you and the greatest minds 
in history — completely private.

---

## The Problem

- People lack real mentors and guidance
- Fear of judgment stops honest conversations
- Existing AI gives one-dimensional, generic answers
- No platform offers multiple perspectives on the same problem
- Emotional support is either clinical or unavailable
- Young people feel deeply misunderstood despite being surrounded by people

---

## The Solution

A unified platform where users type what is on their mind and 
InnovAI matches them with the right persona based on their 
question, emotional tone, and need.

Each persona is not just an information source — it is a 
distinct relationship. Einstein makes you feel curious and 
smart for asking good questions. Kalam believes in you like 
a grandfather. Buddha slows your anxiety down just by responding. 
Chanakya gives you sharp, honest strategy.

Every response is age-adaptive. A 16-year-old and a 38-year-old 
asking the same question get completely different answers — same 
wisdom, different delivery.

---

## The 10 Personas

Einstein          — Physics, curiosity, reasoning, failure
APJ Abdul Kalam   — Dreams, motivation, leadership, youth
Buddha            — Peace, mindfulness, anxiety, clarity
Chanakya          — Strategy, decisions, competition, leadership
Swami Vivekananda — Courage, purpose, strength, fear
Leonardo da Vinci — Creativity, mastery, innovation, art
Nikola Tesla      — Invention, vision, technology, big ideas
Sun Tzu           — Planning, competition, focus, discipline
The Listener      — Emotional support, no judgment, presence
AI Career Coach   — Career, growth, internships, real advice

---

## How It Works

Free Users:
1. User types what is on their mind on the home page
2. InnovAI matches and shows 5 relevant personas
3. User picks one and starts chatting
4. 8 messages per session, then 12-hour account-level cooldown
5. Conversation is saved and waiting when they return

Premium Users:
1. Answer 3 quick questions (topic, need, mood)
2. InnovAI auto-selects the best persona for today
3. Unlimited messages, no cooldown
4. Direct access to all 10 personas
5. Full conversation history saved forever

---

## Key Features

- Age-adaptive responses based on date of birth
  (Student 13-17, Youth 18-25, Young Adult 26-35, 
   Mature 36-50, Elder 50+)

- Emotionally intelligent personas
  Every persona detects the emotion behind the question
  and responds to the feeling first, then the question

- Private by design
  No conversation is ever shared or visible to anyone else
  Users can say things here they cannot say anywhere else

- Persona-voiced limit messages
  When free users hit their 8-message limit, the persona 
  delivers the farewell in their own voice and style

- Chat history sidebar
  Toggled by clicking the InnovAI logo
  Conversations saved with auto-generated titles
  Free users see last 3, premium users see full history

- Closing ritual
  Every conversation ends with the persona asking one 
  open question to bring the user back tomorrow

---

## Freemium Model

Free:
- 8 messages per session
- 12-hour account-level cooldown after limit
- 5 persona suggestions per question
- View all 10 personas in gallery
- Last 3 conversations in history

Basic Premium — Rs 199/month or $4/month:
- Unlimited messages
- No cooldown
- Daily quiz to match persona
- All 10 personas direct access
- Full conversation history
- Age-adaptive responses

Pro Premium — Rs 399/month or $9/month:
- Everything in Basic
- Voice conversations
- Wisdom notes (AI summaries of conversations)
- Priority responses
- Early access to new personas

---

## Tech Stack

Frontend    Next.js 14 + Tailwind CSS
Backend     Next.js API Routes
Database    Supabase (PostgreSQL + Auth)
AI          Google Gemini 2.0 Flash (free tier)
Payments    Razorpay (India) + Stripe (global)
Hosting     Vercel (free tier)

---

## Project Structure

/app
  /login
  /signup
  /onboarding
  /home
  /avatars
  /chat/[conversationId]
  /quiz
  /pricing
  /settings
  /api
    /auth/signup
    /auth/login
    /chat/message
    /chat/match-personas
    /chat/conversations
    /payment/create-order
    /payment/verify

/components
  /layout    Navbar, Sidebar, Shell
  /chat      MessageBubble, TypingIndicator, 
             ChatInput, LimitCard
  /personas  PersonaCard, PersonaMiniAvatar, 
             PersonaFaceSVG
  /ui        Button, Input, Modal, Toast, Badge

/lib
  personas.js       All 10 persona definitions
  gemini.js         Gemini API integration
  supabase.js       Database client
  ageSegment.js     DOB to age segment logic
  matchPersonas.js  Persona scoring and matching

---

## Database Schema

profiles          User info, DOB, age segment, 
                  subscription tier

conversations     Each chat session with a persona,
                  auto-generated title from first message

messages          All messages in every conversation,
                  role: user or assistant

message_limits    Tracks 8-message free limit and 
                  12-hour cooldown per user

subscriptions     Razorpay payment records and 
                  active plan status

---

## Gemini Integration

Model: gemini-2.0-flash (free tier)
Max tokens per response: 300
Temperature: 0.85

Every API call includes:
1. Persona system prompt (unique per avatar)
2. User name and age segment for adaptation
3. Last 6 messages as conversation history
4. Current user message

Persona matching also uses Gemini —
user input is sent to Gemini which returns
a ranked JSON array of the 5 most relevant
persona IDs.

---

## Environment Variables

GEMINI_API_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RAZORPAY_KEY_ID
NEXT_PUBLIC_RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
NEXTAUTH_SECRET
NEXT_PUBLIC_APP_URL

---

## Getting Started

1. Clone the repository
   git clone https://github.com/Swatipal06/InnovAI.git
   cd InnovAI

2. Install dependencies
   npm install

3. Set up environment variables
   Create a .env.local file in the root
   Add all variables listed above

4. Set up Supabase
   Create a new project at supabase.com
   Run the schema SQL from /supabase/schema.sql
   Copy your project URL and anon key to .env.local

5. Get Gemini API key
   Go to aistudio.google.com
   Click Get API Key
   Create a free API key
   Add to .env.local as GEMINI_API_KEY

6. Run the development server
   npm run dev
   Open http://localhost:3000

---

## Design System

Background      #0D0B1E
Surface         #13112A
Border          #252342
Text primary    #F0F4FF
Text muted      #6B6490
Accent violet   #8B5CF6
Accent blue     #4F8EF7
Accent gold     #F5C842
Accent rose     #F472B6
Accent cyan     #22D3EE

Fonts
  Headings      Playfair Display
  UI and body   Inter
  Persona names Cinzel

---

## Status

🚧 Active development — building in public

---

## Legal

InnovAI personas are AI-powered inspirational characters 
inspired by historical figures. They do not represent the 
actual views of these individuals or their estates.

---

## Built By

Swati Pal
GitHub   github.com/Swatipal06
LinkedIn linkedin.com/in/swati-pal06
Email    swatipal1512@gmail.com

Presented as part of InnovAI — AI Avatars for Innovators
