"use client";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { InterviewFeedback } from "@/components/features/feedback/feedback";
import { useQuestionsStore } from "@/hooks/use-questions-store";

export default function FeedbackPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const feedback = useQuestionsStore((state) => state.feedback);

  return (
    <div>
      <div className="container mx-auto px-4">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Interview {id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <InterviewFeedback feedback={feedback} />
      </div>
    </div>
  );
}
