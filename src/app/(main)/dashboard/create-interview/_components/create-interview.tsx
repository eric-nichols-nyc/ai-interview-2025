'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { interviewQuestionsSchema } from "@/schemas/interview-questions.schema";
import { z } from "zod";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
// Create a schema that allows empty strings for all fields
const relaxedSchema = interviewQuestionsSchema.partial();

export function CreateInterview() {
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof interviewQuestionsSchema>, string>>>({});
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const position = formData.get("position") as string;
    const description = formData.get("description") as string;
    const amountRaw = formData.get("amount");
    const amount = amountRaw ? Number(amountRaw) : undefined;

    const values = {
      position: position ?? "",
      description: description ?? "",
      amount: amount ?? undefined,
      type: type ?? "",
    };

    // Validate with relaxed Zod schema
    const result = relaxedSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof typeof values, string>> = {};
      for (const issue of result.error.issues) {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof typeof values] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }
    setErrors({});
    try {
      // Proceed with fetch or other logic
      const questions = await fetch("/api/generate-questions", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await questions.json();
      console.log(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1>Create Interview</h1>
      </div>
      {/* Form */}
      <div>
        <h1>Create Interview Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input type="text" name="position" placeholder="Interview Title" aria-invalid={!!errors.position} />
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
          </div>
          <div>
            <Input type="text" name="description" placeholder="Interview Description" aria-invalid={!!errors.description} />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <div>
            <Input type="number" name="amount" placeholder="Number of Questions" aria-invalid={!!errors.amount} />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>
          <div>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger aria-invalid={!!errors.type}>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="behavioral">Behavioral</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>
          <Button type="submit" disabled={isLoading}>Generate Questions</Button>
          {isLoading && (
            <div className="flex justify-center mt-4">
              <Spinner />
            </div>
          )}
        </form>
      </div>
      {/* Interview */}
      <div>
        <h1>Create Interview</h1>
      </div>
    </div>
  );
}
