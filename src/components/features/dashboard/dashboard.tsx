import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"
import { useQuestionsStore } from "@/hooks/use-questions-store"

export default function Dashboard() {
  // Log all questions from the zustand store (localStorage) on mount
  const questions = useQuestionsStore((state) => state.questions);
  useEffect(() => {
    console.log('[Dashboard] Questions from zustand store:', questions);
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
            <p className="text-gray-400 mb-6">Practice real interview questions & get instant feedback.</p>
            <Link href="/dashboard/interview/create">
              <Button className="bg-[#7c5cff] hover:bg-[#6a4eff] text-white rounded-full px-6 cursor-pointer">Create a new interview</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Past Interviews Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-xl font-bold mb-4">Your Past Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InterviewCard
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
          />
        </div>
      </div>
    </div>
  )
}

interface InterviewCardProps {
  id: string
  icon?: string
  iconBg?: string
  position: string
  date?: string
  score?: string
  type: "Technical" | "Behavioral"
  action: string
  isNew?: boolean
}

function InterviewCard({ icon, iconBg, position, date, score, type, action, isNew = false, id }: InterviewCardProps) {
  return (
    <div className="bg-[#13131f] rounded-xl overflow-hidden">
      {isNew && (
        <div className="absolute top-0 right-0 bg-[#7c5cff] text-white px-2 py-1 text-xs font-bold rounded-full">
          New
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="hidden">
            <div
              className={`${iconBg} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mr-3`}
            >
              {icon}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">{position}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              {date && (
                <>
                  <span>{date}</span>
                  <span>•</span>
                </>
              )}
              {score && <span>{score}</span>}
            </div>
          </div>
          <div className="ml-auto">
            <Badge className={type === "Technical" ? "bg-[#13294b] text-white" : "bg-[#4b2941] text-white"}>
              {type}
            </Badge>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          This interview does not reflect serious interest or engagement from the candidate. Their responses are
          dismissive.
        </p>
        <div className="flex items-center">
          <Link href={`/dashboard/interview/${id}/feedback`}>
            <Button variant="secondary" className="ml-auto bg-[#1a1a26] hover:bg-[#252533] text-white text-sm">
              {action}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
