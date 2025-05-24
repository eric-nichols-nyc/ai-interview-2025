import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Feedback } from "@/hooks/use-questions-store";

export function InterviewFeedback({ feedback }: { feedback: Feedback | null }) {
  if (!feedback) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-zinc-900 rounded-xl p-8 text-white text-center">
          <h1 className="text-2xl font-semibold mb-4">No feedback available</h1>
          <Link href="/dashboard">
            <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-zinc-900 rounded-xl p-8 text-white">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold">
              Feedback on the Interview
            </h1>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-purple-400">★</span>
                <span>
                  Overall Score: <span className="text-white">{feedback.totalScore}/100</span>
                </span>
              </div>
            </div>
          </div>

          {/* Category Scores */}
          <div>
            <h2 className="text-xl font-medium mb-4">Category Scores:</h2>
            <ol className="space-y-4 list-decimal pl-6">
              {feedback.categoryScores.map((cat) => (
                <li key={cat.name}>
                  <div className="font-medium">{cat.name} ({cat.score}/20)</div>
                  <div className="text-sm text-zinc-300 mt-1">{cat.comment}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* Strengths & Areas for Improvement */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Strengths</h3>
              <ul className="list-disc pl-5 text-sm text-green-400">
                {feedback.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Areas for Improvement</h3>
              <ul className="list-disc pl-5 text-sm text-red-400">
                {feedback.areasForImprovement.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Final Assessment */}
          <div>
            <h3 className="text-lg font-medium mb-2">Final Assessment</h3>
            <p className="text-sm text-zinc-400">{feedback.finalAssessment}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 justify-center">
            <Link href="/dashboard">
              <Button variant="outline" className="flex-1 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to dashboard
              </Button>
            </Link>
            <Link href="/dashboard/interview/create">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">Retake interview</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
