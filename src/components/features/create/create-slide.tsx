import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const formSchema = z.object({
  position: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["text", "image", "video"]),
});


type CreateSlideProps = {
  isValid: (isValid: boolean) => void;
}

export function CreateSlide({ isValid }: CreateSlideProps) {
  const [errors, setErrors] = useState<{ position?: string; description?: string; type?: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);

    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData);
    const result = formSchema.safeParse(data);

    if (!result.success) {
      // Map zod errors to field errors
      const fieldErrors: { position?: string; description?: string; type?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] && typeof err.path[0] === "string") {
          fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({}); // Clear errors on success
    console.log(data);
    isValid(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full">
      <Card className="w-full h-full flex flex-col gap-4 justify-between">
        <CardHeader>
          <CardTitle>Generate Question</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="position">Position</Label>
            <Input id="positin" name="position" placeholder="Position" />
            {errors.position && (
              <span className="text-red-500 text-sm">{errors.position}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select name="type">
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <span className="text-red-500 text-sm">{errors.type}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Generate Question</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
