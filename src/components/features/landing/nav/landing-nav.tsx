"use client";
import Link from "next/link";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function LandingNav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto max-w-5xl">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">InterviewAI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
            Testimonials
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <Button className="bg-primary text-black" asChild size="sm">
              <Link className="text-black" href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button className="bg-primary text-black" asChild size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="bg-primary text-black" asChild size="sm">
                <Link href="/signup">Sign up free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 