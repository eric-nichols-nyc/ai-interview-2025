import { NextResponse } from "next/server";
import { generateFeedback } from "@/actions/google";

export async function POST(req: Request) {
  try {
    const { interviewId, userId, transcript } = await req.json();
    if (!interviewId || !userId || !Array.isArray(transcript)) {
      return NextResponse.json({ error: "Missing required fields: interviewId, userId, or transcript." }, { status: 400 });
    }
    const feedback = await generateFeedback({ interviewId, userId, transcript });
    if (typeof feedback === 'object' && feedback !== null && 'error' in feedback) {
      return NextResponse.json({ error: (feedback as { error: string }).error }, { status: 500 });
    }
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Error in generate-feedback route:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
