'use client';

import { CreateInterview } from "./_components/create-interview";
export default function CreateInterviewPage() {

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Create Interview</h1>
      <CreateInterview />
    </div>
  );
}
