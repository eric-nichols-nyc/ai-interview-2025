"use client";
import Link from "next/link";
import { Brain, } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function LandingNav() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto max-w-5xl px-3">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Prepster</span>
        </div>

        <div className="flex items-center gap-4">
          {/* {user ? (
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
          )} */}
          {user ? (
            <>
              <Link href="/dashboard"><Button size="sm">Dashboard</Button></Link>
              <UserButton />

            </>
          ) : (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
} 