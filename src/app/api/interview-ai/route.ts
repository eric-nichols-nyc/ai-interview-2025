import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

type ConversationTurn = {
  role: 'interviewer' | 'candidate';
  text: string;
};

export async function POST(req: NextRequest) {
  try {
    const { conversation } = await req.json() as { conversation: ConversationTurn[] };

    // Build the prompt for the AI
    const prompt = `
You are a professional interviewer. Given the following conversation, ask the next relevant interview question. Do not answer as the candidate.

Conversation:
${conversation.map((turn) => `${turn.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${turn.text}`).join('\n')}
Interviewer:
    `.trim();

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 80,
        temperature: 0.7,
        stop: ['Candidate:'],
      }),
    });

    const data = await response.json();
    const question = data.choices?.[0]?.text?.trim() || 'Thank you for your answer.';

    return NextResponse.json({ response: question });
  } catch (error) {
    console.error('Error in interview-ai route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
