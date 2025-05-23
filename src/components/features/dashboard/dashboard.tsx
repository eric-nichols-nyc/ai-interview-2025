import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useQuestionsStore } from "@/hooks/use-questions-store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
export default function Dashboard() {
  // Log all questions from the zustand store (localStorage) on mount
  const questions = useQuestionsStore((state) => state.questions);
  useEffect(() => {
    console.log("[Dashboard] Questions from zustand store:", questions);
  }, [questions]);

  return (
    <div className="min-h-[calc(100vh-53px)] bg-[#0d0d14] text-white p-4 md:p-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="rounded-xl bg-[#13131f] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:max-w-md mb-8 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Get Interview-Ready with AI-Powered Practice & Feedback
            </h1>
            <p className="text-gray-400 mb-6">
              Practice real interview questions & get instant feedback.
            </p>
            <Link href="/dashboard/interview/create">
              <Button className="bg-[#7c5cff] hover:bg-[#6a4eff] text-white rounded-full px-6 cursor-pointer">
                Create a new interview
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Past Interviews Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-xl font-bold mb-4">
          {questions.length > 0
            ? "Your Past Interviews"
            : "No past interviews yet"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {questions.map((question) => (
            <InterviewCard
              key={question.id}
              id={question.id}
              position={question.position}
              date="Feb 20, 2025"
              score="12/20"
              type="Technical"
              action="View Interview"
            />
          ))}
          {/* <InterviewCard
            id="1"
            icon="H"
            iconBg="bg-[#7c5cff]"
            position="Frontend Dev Interview"
            date="Feb 20, 2025"
            score="12/20"
            type="Technical"
            action="View Interview"
          />
          <InterviewCard
            id="2"
            icon="f"
            iconBg="bg-[#3b5998]"
            position="Behavioral Interview"
            date="Feb 23, 2025"
            score="14/20"
            type="Behavioral"
            action="View Interview"
          />
          <InterviewCard
            id="3"
            icon="A"
            iconBg="bg-[#ff5c5c]"
            position="Backend Dev Interview"
            date="Feb 21, 2025"
            score="14/20"
            type="Technical"
            action="View Interview"
          /> */}
        </div>
      </div>
    </div>
  );
}

interface InterviewCardProps {
  id: string;
  position: string;
  date?: string;
  score?: string;
  type: "Technical" | "Behavioral";
  action: string;
  isNew?: boolean;
}

function InterviewCard({
  position,
  date,
  score,
  type,
  action,
  id,
}: InterviewCardProps) {
  return (
    <Card className="bg-[#13131f] rounded-xl overflow-hidden">
      <CardHeader className="flex items-center justify-between">
        <h3 className="font-semibold">{position}</h3>
        <Badge
          className={
            type === "Technical"
              ? "bg-[#13294b] text-white"
              : "bg-[#4b2941] text-white"
          }
        >
          {type}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          {date && (
            <>
              <span>{date}</span>
              <span>•</span>
            </>
          )}
          {score && <span>{score}</span>}
        </div>
        <div className="ml-auto"></div>
        <p className="text-xs text-gray-400 mb-4">
          This interview does not reflect serious interest or engagement from
          the candidate. Their responses are dismissive.
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/interview/${id}/feedback`}>
          <Button
            variant="secondary"
            className="ml-auto bg-[#1a1a26] hover:bg-[#252533] text-white text-sm"
          >
            {action}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
