import Interview from "../../../../../components/features/ai-interview/interview";
import { type Metadata } from "next";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default async function InterviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log('Interview ID:', id);
  return (
    <>
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
    <div className="flex flex-col items-center justify-center h-screen">
      <Interview />
    </div>
  </>
    // <div className="flex flex-col items-center justify-center h-screen">
    //   <div className="w-full max-w-2xl mb-6">
    //     <Breadcrumb>
    //       <BreadcrumbList>
    //         <BreadcrumbItem>
    //           <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
    //         </BreadcrumbItem>
    //         <BreadcrumbItem>
    //           <BreadcrumbPage>Interview {id}</BreadcrumbPage>
    //         </BreadcrumbItem>
    //       </BreadcrumbList>
    //     </Breadcrumb>
    //   </div>
    //   <Interview />
    // </div>
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