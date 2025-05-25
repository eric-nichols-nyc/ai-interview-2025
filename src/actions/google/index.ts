'use server'
import { generateObject, generateText } from "ai";
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


export async function generateQuestions(
  position: string,
  description: string,
  amount: number,
  type: string
) {

  try {
    const prompt = `You are an expert interviewer. Generate exactly ${amount} high-quality ${type} interview questions for the following position.

    Position: ${position}
    Description: ${description}
    Interview Type: ${type}
    Number of Questions: ${amount}

    Requirements:
    - Each question must be short (maximum two sentences)
    - Questions should be answerable in 90 seconds or less
    - Focus on practical, relevant scenarios
    - Use clear, direct language

    Format your response as a simple numbered list:
    1. [First question]
    2. [Second question]
    3. [Third question]
    ...

    Do NOT include any introduction, explanations, or additional formatting.`;

    const result = await generateText({
      model: google("models/gemini-2.0-flash-001"),
      prompt,
      maxTokens: 512,
    });

    const questions = extractQuestions(result.text.trim(), amount);
    // Validate we got the expected number of questions
    if (questions.length === 0) {
      throw new Error("No questions were extracted from the AI response");
    }

    if (questions.length < amount) {
      console.warn(`Expected ${amount} questions but only extracted ${questions.length}`);
    }

    return {
      questions: questions.slice(0, amount), // Ensure we don't exceed requested amount
      metadata: {
        requestedAmount: amount,
        actualAmount: questions.length,
        position,
        type
      }
    };



  } catch (error) {
    console.error("Error in generateQuestions:", error);
    // Return fallback questions based on type if AI generation fails
    const fallbackQuestions = getFallbackQuestions(type, position, amount);
    return {
      questions: fallbackQuestions,
      metadata: {
        requestedAmount: amount,
        actualAmount: fallbackQuestions.length,
        position,
        type
      }
    };
  }
}

export async function generateFeedback({ interviewId, userId, transcript }: Interview) {
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
  try {
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

function extractQuestions(text: string, expectedAmount: number): string[] {
  // Split by lines and filter out empty lines
  const lines = text.split(/\n+/).map(line => line.trim()).filter(Boolean);

  const questions: string[] = [];

  for (const line of lines) {
    // Match various numbering patterns
    const numberPatterns = [
      /^\d+\.\s*(.+)$/,           // "1. Question"
      /^\d+\)\s*(.+)$/,           // "1) Question"
      /^\d+:\s*(.+)$/,            // "1: Question"
      /^Question\s*\d+[:.]\s*(.+)$/i, // "Question 1: ..." or "Question 1. ..."
      /^\*\s*(.+)$/,              // "* Question" (bullet points)
      /^-\s*(.+)$/,               // "- Question" (dashes)
    ];

    let questionText = null;

    // Try each pattern
    for (const pattern of numberPatterns) {
      const match = line.match(pattern);
      if (match && match[1]) {
        questionText = match[1].trim();
        break;
      }
    }
    // If no pattern matched but we still need questions, treat the line as a question
    if (!questionText && questions.length < expectedAmount && line.length > 10) {
      questionText = line;
    }

    if (questionText) {
      // Clean up the question text
      questionText = cleanQuestionText(questionText);

      // Basic validation
      if (questionText.length > 10 && questionText.endsWith('?')) {
        questions.push(questionText);
      }
    }

    // Stop if we have enough questions
    if (questions.length >= expectedAmount) {
      break;
    }
  }
  return questions;
}

function cleanQuestionText(text: string): string {
  return text
    // Remove markdown formatting
    .replace(/\*\*(.+?)\*\*/g, '$1')  // Bold
    .replace(/\*(.+?)\*/g, '$1')      // Italic
    .replace(/`(.+?)`/g, '$1')        // Code
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

function getFallbackQuestions(type: string, position: string, amount: number): string[] {
  const fallbackQuestions: Record<string, string[]> = {
    behavioral: [
      "Tell me about a time when you had to work under pressure. How did you handle it?",
      "Describe a situation where you had to work with a difficult team member.",
      "Give me an example of a time when you had to learn something new quickly.",
      "Tell me about a project you're particularly proud of and why.",
      "Describe a time when you had to make a difficult decision with limited information."
    ],
    technical: [
      `What are the key skills required for a ${position} role?`,
      "Walk me through your approach to solving complex problems.",
      "How do you stay updated with the latest technologies in your field?",
      "Describe your experience with the main tools and technologies relevant to this role.",
      "How would you explain a complex technical concept to a non-technical person?"
    ],
    situational: [
      "How would you handle a situation where you disagree with your manager's approach?",
      "What would you do if you realized you made a mistake that affected the entire team?",
      "How would you prioritize your tasks when everything seems urgent?",
      "Describe how you would approach working on a project with unclear requirements.",
      "What would you do if you had to meet a tight deadline but lacked necessary resources?"
    ]
  };

  const questions = fallbackQuestions[type.toLowerCase()] || fallbackQuestions.behavioral;
  return questions.slice(0, amount);
}