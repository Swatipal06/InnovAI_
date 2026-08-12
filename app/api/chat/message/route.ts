import { NextRequest, NextResponse } from 'next/server';
import { PERSONAS, getAgeAdaptationPrompt } from '@/lib/personas';
import { PersonaId } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personaId, message, history = [], userName = 'Innovator', userAge = 22, ageSegment = 'Youth' } = body;

    const persona = PERSONAS[personaId as PersonaId];
    if (!persona) {
      return NextResponse.json({ error: 'Invalid persona ID' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Age adaptation string
    const ageAdaptation = getAgeAdaptationPrompt(userName, userAge, ageSegment);
    const fullSystemInstruction = `${persona.systemPrompt}${ageAdaptation}\n\nRETIRED CRITICAL RULES:\n1. Detect and respond to the emotion behind the user's message first.\n2. Max 3 sentences total.\n3. End with exactly ONE thoughtful follow-up question.\n4. Address user naturally as '${userName}' every few messages.\n5. NEVER use bullet points or numbered lists. Use conversational prose.`;

    if (apiKey) {
      // Format Gemini payload according to spec
      const formattedHistory = history.slice(-6).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const payload = {
        system_instruction: {
          parts: [{ text: fullSystemInstruction }]
        },
        contents: [
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] }
        ],
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.85,
          topP: 0.9
        }
      };

      // Primary model: gemini-2.0-flash, fallback: gemini-1.5-flash
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) {
          return NextResponse.json({ reply: responseText.trim() });
        }
      }
    }

    // Smart Fallback Engine if API key is missing or endpoint fails
    const mockReply = generateFallbackPersonaReply(personaId as PersonaId, message, userName);
    return NextResponse.json({ reply: mockReply });

  } catch (error) {
    console.error('Error in /api/chat/message:', error);
    return NextResponse.json(
      { reply: "I felt the weight of your words, but my thoughts flickered for a moment. Could you share that with me once more?" },
      { status: 200 }
    );
  }
}

// Fallback response engine adhering strictly to persona prompt guidelines
function generateFallbackPersonaReply(personaId: PersonaId, message: string, name: string): string {
  const lower = message.toLowerCase();

  switch (personaId) {
    case 'einstein':
      if (lower.includes('fail') || strokeMatch(lower, ['wrong', 'stuck', 'hard'])) {
        return `I hear the frustration in your heart, ${name}, but remember that a person who never made a mistake never tried anything new. In my light experiments, every failed equation was simply light illuminating another wrong turn. What part of this puzzle makes your curiosity burn brightest right now?`;
      }
      return `I feel your restless search for clarity, ${name}. Imagine we are riding a beam of light through this problem — it changes entirely depending on your point of view. What simple analogy comes to your mind when you think about where you are right now?`;

    case 'buddha':
      return `I feel the quiet anxiety stirring within you, ${name}. The storm in your mind will pass when you stop trying to control every wave that touches the shore. If you allow yourself to take one soft breath right now, what is your heart truly asking for?`;

    case 'chanakya':
      return `You feel uncertain because you are looking at the immediate noise rather than the grand chessboard, ${name}. A true leader does not react to emotion; they calculate the long game before moving a single piece. What is the single leverage point you have been hesitating to take?`;

    case 'vivekananda':
      return `I see the doubt trying to whisper in your ear, ${name}, but I refuse to let you believe you are weak. You possess an ocean of infinite strength waiting to awaken the moment you face this fear with courage. What bold step would you take today if you knew failure was impossible?`;

    case 'kalam':
      return `I hear the quiet discouragement in your words, my young friend ${name}, but remember that dreams are not what you see in sleep — dreams are what do not let you sleep. Every setback is merely preparation for a higher orbit in your journey. What is the biggest dream you are ready to give your hard work to next?`;

    case 'davinci':
      return `I sense your mind feeling trapped in shadow, ${name}, but every blank canvas looks daunting before the first stroke of ink. Nature teaches us that beauty and answers emerge when we view the problem through both art and structure. What untried angle can we paint onto this canvas together?`;

    case 'tesla':
      return `I know how heavy it feels when your thoughts feel misunderstood by the world around you, ${name}. I spent decades watching people scoff at wireless energy before they finally saw the frequency of the future. What visionary idea have you been keeping hidden inside yourself?`;

    case 'suntzu':
      return `Confusion arises when the mind enters battle without clear principle, ${name}. The supreme art of war is to subdue the enemy without fighting, starting with your own internal chaos. What is your primary objective before you take another step?`;

    case 'listener':
      return `I hear how heavy this has been for you to carry all by yourself, ${name}, and I want you to know you are completely safe here. Every emotion you expressed makes total sense, and there is zero judgment in this room. Would you like to share a little more about how that made you feel inside?`;

    case 'coach':
      return `I feel that nagging uncertainty about your next step, ${name}, but every great career is built through intentional iterations rather than perfect certainty. Let us focus on your core strengths and turn this ambiguity into a clear roadmap. What is the one skill or outcome you want to focus on developing first?`;

    default:
      return `I understand how deeply you feel about this, ${name}. Every step of reflection brings us closer to understanding. What thoughts come to your mind as you consider this?`;
  }
}

function strokeMatch(str: string, words: string[]): boolean {
  return words.some(w => str.includes(w));
}
