// if user is not logged in, redirect to /login 
import StickyHeader from "@/components/features/dashboard/StickyHeader";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <StickyHeader title="" />
      {children}
    </div>
  );
}
