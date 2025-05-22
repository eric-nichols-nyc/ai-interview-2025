import { z } from "zod";

export const interviewQuestionsSchema = z.object({
  position: z.string({
    required_error: "Position is required.",
    invalid_type_error: "Position must be a string."
  }).min(1, {
    message: "Position must be at least 1 character long."
  }),
  description: z.string({
    invalid_type_error: "Description must be a string."
  }).optional(),
  amount: z.number({
    required_error: "Amount is required.",
    invalid_type_error: "Amount must be a number."
  }).min(1, {
    message: "Amount must be at least 1."
  }),
  type: z.enum(["technical", "behavioral"], {
    required_error: "Type must be either 'technical' or 'behavioral'",
    invalid_type_error: "Type must be either 'technical' or 'behavioral'"
  }),
});

export type InterviewQuestions = z.infer<typeof interviewQuestionsSchema>;
