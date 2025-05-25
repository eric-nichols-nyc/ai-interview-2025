"use client";
import { InterviewFeedback } from "@/components/features/feedback/feedback";
import { useQuestionsStore } from "@/hooks/use-questions-store";

export default function FeedbackWrapper() {
    const feedback = useQuestionsStore((state) => state.feedback);

    return (
        <div>
           <InterviewFeedback feedback={feedback} />
        </div>
    )
}