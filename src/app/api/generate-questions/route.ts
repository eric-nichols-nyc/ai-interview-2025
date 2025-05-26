import { NextResponse } from "next/server";
import { interviewQuestionsSchema } from "@/schemas/interview-questions.schema";
import { generateQuestions } from "@/actions/google";
import { generateUUID } from "@/lib/utils";

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
    
    const questionsResult = await generateQuestions(position, description, amount, type);
    const interviewId = generateUUID();
    console.log("Generated questions:", questionsResult);
    return NextResponse.json({ interviewId, ...questionsResult });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
