import { NextResponse } from "next/server";
import { interviewQuestionsSchema } from "@/schemas/interview-questions.schema";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { position, description, amount, type } = await req.json();
    const validatedFields = interviewQuestionsSchema.safeParse({
      position,
      description,
      amount,
      type,
    });

    if (!validatedFields.success) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }
    
    const questions = await generateQuestions(position, description, amount, type);
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}

async function generateQuestions(position: string, description: string, amount: number, type: string) {
  try {
    const prompt = `You are an expert interviewer. Generate a list of ${amount} high-quality ${type} interview questions for the following position.

Position: ${position}
Description: ${description}
Interview Type: ${type}
Number of Questions: ${amount}

Return ONLY the questions as a numbered list in plain text. Do NOT use any Markdown, formatting, or explanations.`;

    const result = await generateText({
      model: google("models/gemini-2.0-flash-001"),
      prompt,
      maxTokens: 512,
    });

    // Extract questions as an array from the result text
    const text = result.text.trim();
    // Remove any introductory lines before the first numbered question
    const questionLines = text.split(/\n+/).filter(line => /^\d+\.|^\*\*Question:|^Question:|^\*/.test(line.trim()));
    // Clean up each question line
    const questions = questionLines.map(line => {
      // Remove leading numbering, bullets, or markdown formatting
      return line.replace(/^\d+\.\s*/, "")
                 .replace(/^\*+\s*/, "")
                 .replace(/^\*\*Question:\*\*\s*/, "")
                 .replace(/^Question:\s*/, "")
                 .replace(/^\*\*/, "")
                 .trim();
    }).filter(Boolean);

    return { questions };
  } catch (error) {
    console.error("Error in generateQuestions:", error);
    throw error;
  }
}
