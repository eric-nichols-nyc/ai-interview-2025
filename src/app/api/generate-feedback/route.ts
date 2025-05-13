import { NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
export async function POST(req: Request) {
  const { question, answer } = await req.json();
  const feedback = await generateFeedback(question, answer);
  return NextResponse.json({ feedback });
}

async function generateFeedback(question: string, answer: string) {
  try {
    const prompt = `You are an expert interviewer. You are given a question and an answer. You need to generate feedback for the answer.
    Question: ${question}
    Answer: ${answer}
  `;
  const result = await generateText({
    model: google("models/gemini-2.0-flash-001"),
    prompt,
    maxTokens: 512,
  });
  return result.text;
  } catch (error) {
    console.error("Error in generateFeedback:", error);
    throw error;
  }
}
