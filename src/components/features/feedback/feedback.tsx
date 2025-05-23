import { ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export function InterviewFeedback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-zinc-900 rounded-xl p-8 text-white">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold">
              Feedback on the Interview —<br />
              Frontend Developer Interview
            </h1>

            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-purple-400">★</span>
                <span>
                  Overall Impression: <span className="text-white">12/100</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">📅</span>
                <span>Feb 28, 2025 - 3:45 PM</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <p className="text-sm text-zinc-400">
            This interview does not reflect serious interest or engagement from the candidate. Their responses are
            dismissive, vague, or outright negative, making it difficult to assess their qualifications, motivation, or
            suitability for the role.
          </p>

          {/* Evaluation Breakdown */}
          <div>
            <h2 className="text-xl font-medium mb-4">Breakdown of Evaluation:</h2>

            <ol className="space-y-6 list-decimal pl-6">
              <li>
                <div className="font-medium">Enthusiasm & Interest (0/20)</div>
                <ul className="mt-2 space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-2">
                    <span className="text-zinc-500">•</span>
                    <span>
                      The candidate openly stated, &quot;I really don&apos;t,&quot; when asked why they want to work for the company.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-zinc-500">•</span>
                    <span>
                      Their response to future career plans (&quot;Probably in some other company&quot;) indicates a lack of
                      commitment.
                    </span>
                  </li>
                </ul>
              </li>

              <li>
                <div className="font-medium">Communication Skills (5/20)</div>
                <ul className="mt-2 space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-2">
                    <span className="text-zinc-500">•</span>
                    <span>Responses are brief and unhelpful.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-zinc-500">•</span>
                    <span>Some answers lack clarity (e.g., &quot;What am I going to do in this role at this role?&quot;).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-zinc-500">•</span>
                    <span>A slight redeeming factor is that they remain polite.</span>
                  </li>
                </ul>
              </li>

              <li>
                <div className="font-medium">Self-Awareness & Reflection (7/20)</div>
                <ul className="mt-2 space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-2">
                    <span className="text-zinc-500">•</span>
                    <span>The candidate refuses to discuss their background and weaknesses.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-zinc-500">•</span>
                    <span>They claim to have &quot;no weaknesses at all,&quot; which suggests a lack of self-awareness.</span>
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Final Verdict */}
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-medium">Final Verdict:</h3>
            <span className="text-red-500 font-medium">Not Recommended</span>
            <div className="ml-auto flex items-center gap-1">
              <Avatar className="h-8 w-8 bg-purple-600">
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Conclusion */}
          <p className="text-sm text-zinc-400">
            This candidate does not appear to be seriously considering the role and fails to provide meaningful
            responses. If this is reflective of their true attitude, they would not be a good fit for most positions.
          </p>

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
  )
}
