import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;

    if (!apiKey) {
      console.error('Missing Deepgram API key');
      return NextResponse.json({ error: 'Missing Deepgram API key' }, { status: 500 });
    }

    const deepgramResponse = await fetch('https://api.deepgram.com/v1/speak?model=aura-asteria-en', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        // You can add more options here, see Deepgram docs
      }),
    });

    if (!deepgramResponse.ok) {
      const errorText = await deepgramResponse.text();
      console.error('Deepgram API error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch TTS audio', details: errorText }, { status: 500 });
    }

    const audioBuffer = await deepgramResponse.arrayBuffer();
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="tts.mp3"'
      }
    });
  } catch (err) {
    console.error('TTS API route error:', err);
    return NextResponse.json({ error: 'Internal Server Error', details: String(err) }, { status: 500 });
  }
}
