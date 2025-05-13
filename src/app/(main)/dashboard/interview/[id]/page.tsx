import Interview from "./_components/interview";
export default async function InterviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log('Interview ID:', id);
  return (
    <div>
      <Interview />
    </div>
  );
}