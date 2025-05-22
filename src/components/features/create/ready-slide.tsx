import Link from "next/link";

export function ReadySlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 bg-white rounded-lg shadow-md">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold mb-2 text-green-700">Your AI interview is ready!</h1>
      <p className="mb-6 text-gray-600 text-center max-w-md">
        Your interview has been generated and is ready to begin. Click below to get started!
      </p>
      <Link
        href="/dashboard/interview/1234"
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
      >
        Start Interview
      </Link>
    </div>
  );
}