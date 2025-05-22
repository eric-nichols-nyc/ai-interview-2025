"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message || "Failed to sign up. Please try again.");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
        {error && (
          <div className="text-red-500 text-sm text-center" role="alert">{error}</div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            disabled={loading}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-primary underline hover:text-primary/80">Log in</Link>
        </div>
      </div>
    </div>
  );
} 