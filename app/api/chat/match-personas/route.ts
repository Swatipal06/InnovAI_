import { NextRequest, NextResponse } from 'next/server';
import { PERSONA_LIST } from '@/lib/personas';
import { PersonaId } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();

    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json({ rankedIds: ['einstein', 'buddha', 'chanakya', 'kalam', 'listener'] });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const prompt = `You are a persona matching engine for InnovAI.
Based on this user message, rank these 10 personas in order of relevance (most relevant first).
Return ONLY a JSON array of persona IDs.
Personas: einstein, buddha, chanakya, vivekananda, kalam, davinci, tesla, suntzu, listener, coach
User message: ${userInput}`;

      const payload = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 100, temperature: 0.2 }
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const match = text.match(/\[[\s\S]*?\]/);
        if (match) {
          const parsed = JSON.parse(match[0]) as string[];
          const validIds = parsed.filter((id): id is PersonaId => id in PERSONA_LIST.map(p => p.id));
          if (validIds.length >= 5) {
            return NextResponse.json({ rankedIds: validIds.slice(0, 5) });
          }
        }
      }
    }

    // Heuristic Fallback Matcher
    const rankedIds = matchPersonasHeuristic(userInput);
    return NextResponse.json({ rankedIds });

  } catch (error) {
    console.error('Error in match-personas route:', error);
    return NextResponse.json({ rankedIds: ['einstein', 'buddha', 'chanakya', 'kalam', 'listener'] });
  }
}

function matchPersonasHeuristic(input: string): PersonaId[] {
  const text = input.toLowerCase();
  const scores: Record<PersonaId, number> = {
    einstein: 0,
    buddha: 0,
    chanakya: 0,
    vivekananda: 0,
    kalam: 0,
    davinci: 0,
    tesla: 0,
    suntzu: 0,
    listener: 0,
    coach: 0
  };

  PERSONA_LIST.forEach(persona => {
    persona.topics.forEach(topic => {
      if (text.includes(topic)) scores[persona.id] += 3;
    });
  });

  if (text.includes('anxious') || text.includes('stress') || text.includes('sad') || text.includes('lonely') || text.includes('cry')) {
    scores.listener += 5;
    scores.buddha += 4;
  }
  if (text.includes('job') || text.includes('career') || text.includes('work') || text.includes('resume') || text.includes('salary')) {
    scores.coach += 5;
    scores.chanakya += 4;
  }
  if (text.includes('dream') || text.includes('future') || text.includes('student') || text.includes('hard work')) {
    scores.kalam += 5;
    scores.vivekananda += 4;
  }
  if (text.includes('physics') || text.includes('science') || text.includes('curious') || text.includes('why') || text.includes('fail')) {
    scores.einstein += 5;
    scores.davinci += 3;
  }
  if (text.includes('art') || text.includes('create') || text.includes('design') || text.includes('innovate') || text.includes('stuck')) {
    scores.davinci += 5;
    scores.tesla += 4;
  }
  if (text.includes('strategy') || text.includes('decision') || text.includes('compete') || text.includes('win')) {
    scores.suntzu += 5;
    scores.chanakya += 5;
  }

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id as PersonaId);

  return sorted.slice(0, 5);
}
