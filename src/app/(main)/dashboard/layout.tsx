import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// if user is not logged in, redirect to /login 
import StickyHeader from "@/components/features/dashboard/StickyHeader";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <div>
      <StickyHeader title="Dashboard" />
      {children}
    </div>
  );
}
