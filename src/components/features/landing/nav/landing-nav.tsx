"use client";
import { Brain } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

export default function LandingNav() {

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
             <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
      </div>
    </header>
  );
} 