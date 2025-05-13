'use client';
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import DashboardComponent from "@/components/features/dashboard/dashboard";
export default function Dashboard() {
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        console.log("User is logged in:", user);
        fetch("/api/user-sync", {
          method: "POST",
          body: JSON.stringify({ user }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        console.log("User is not logged in");
      }
    });
  }, []);

  return (
    <DashboardComponent />
  );
}
