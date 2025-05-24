'use server'
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { feedbackSchema } from "@/schemas/feedback-schema";

type Message = {
    role: "user" | "assistant";
    content: string;
}


type Interview = {
    interviewId: string;
    userId: string;
    transcript: Message[];
};

export async function generateFeedback({interviewId, userId, transcript}: Interview) {
  function tryFixJsonString(jsonString: string) {
    // Remove any text before the first '{' and after the last '}':
    const firstBrace = jsonString.indexOf('{');
    const lastBrace = jsonString.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1) return jsonString;
    let fixed = jsonString.slice(firstBrace, lastBrace + 1);
    // Remove trailing commas before } or ]
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
    return fixed;
  }
  try{
    const formattedTranscript = transcript
    .map(
      (sentence: { role: string; content: string }) =>
        `- ${sentence.role}: ${sentence.content}\n`
    )
    .join("");

    console.log("Formatted Transcript:", formattedTranscript);

    const { object } = await generateObject({
        model: google("gemini-2.0-flash-001", {
          structuredOutputs: false,
        }),
        schema: feedbackSchema,
        prompt: `
          You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories.
          Respond ONLY with a valid JSON object matching the schema below.
          Do NOT include any text, explanation, or comments outside the JSON object.
          Do NOT include trailing commas.
          Here is the schema:
          {
            "totalScore": number,
            "categoryScores": [
              { "name": "Communication Skills", "score": number, "comment": string },
              { "name": "Technical Knowledge", "score": number, "comment": string },
              { "name": "Problem Solving", "score": number, "comment": string },
              { "name": "Cultural Fit", "score": number, "comment": string },
              { "name": "Confidence and Clarity", "score": number, "comment": string }
            ],
            "strengths": [string],
            "areasForImprovement": [string],
            "finalAssessment": string
          }
          Transcript:
          ${formattedTranscript}
          Please fill out the JSON object above with your evaluation.
          `,
        system:
          "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
      });

      const feedback = {
        interviewId: interviewId,
        userId: userId,
        totalScore: object.totalScore,
        categoryScores: object.categoryScores,
        strengths: object.strengths,
        areasForImprovement: object.areasForImprovement,
        finalAssessment: object.finalAssessment,
        createdAt: new Date().toISOString(),
      };

      return feedback;

  } catch (error: unknown) {
    console.error(error);
    // Type guard for error object
    let text = '';
    if (typeof error === 'object' && error !== null) {
      if ('text' in error && typeof (error as { text?: unknown }).text === 'string') {
        text = (error as { text: string }).text;
      } else if ('response' in error && typeof (error as { response?: { text?: unknown } }).response?.text === 'string') {
        text = (error as { response: { text: string } }).response.text;
      }
    }
    if (text) {
      try {
        const fixed = tryFixJsonString(text);
        const parsed = JSON.parse(fixed);
        // Optionally validate parsed object here
        return {
          interviewId,
          userId,
          ...parsed,
          createdAt: new Date().toISOString(),
        };
      } catch {
        return {
          error: "Failed to parse and fix feedback JSON",
        };
      }
    }
    return {
      error: "Failed to generate feedback",
    };
  }
}