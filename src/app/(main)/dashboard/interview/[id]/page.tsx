import Interview from "../../../../../components/features/ai-interview/interview";
import { type Metadata } from "next";

export default async function InterviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log('Interview ID:', id);
  return (
    <div className="flex items-center justify-center h-screen">
      <Interview />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // Example: Use params or fetch data here
  const { id } = await params;
  const title = `Interview ${id}`;
  return {
    title,
    description: "Dynamic interview page",
  };
}