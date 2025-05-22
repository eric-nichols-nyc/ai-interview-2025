'use client'

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("LoginPage mounted");
    return () => {
      console.log("LoginPage unmounted");
    };
  }, []);

  const handleSignInWithGoogle = async () => {
    console.log("Sign in with Google button clicked");
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `/dashboard`
        }
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
      console.log("Set error state in LoginPage");
    }
  };

  const handleSignInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message || "Failed to sign in. Please try again.");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Sign in to your account</h1>
        {error && (
          <div className="text-red-500 text-sm text-center" role="alert">{error}</div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSignInWithEmail}>
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
            autoComplete="current-password"
            disabled={loading}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700" />
        </div>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleSignInWithGoogle}
          disabled
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_17_40)">
              <path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.1H37.4C36.7 32.2 34.7 34.7 31.8 36.4V42.1H39.3C44 38 47.5 31.9 47.5 24.5Z" fill="#4285F4"/>
              <path d="M24 48C30.6 48 36.2 45.9 39.3 42.1L31.8 36.4C30.1 37.5 27.9 38.2 24 38.2C17.7 38.2 12.2 34.1 10.3 28.7H2.5V34.6C5.6 41.1 13.1 48 24 48Z" fill="#34A853"/>
              <path d="M10.3 28.7C9.8 27.6 9.5 26.4 9.5 25.2C9.5 24 9.8 22.8 10.3 21.7V15.8H2.5C0.8 19 0 22.4 0 25.2C0 28 0.8 31.4 2.5 34.6L10.3 28.7Z" fill="#FBBC05"/>
              <path d="M24 9.8C27.7 9.8 30.2 11.4 31.5 12.6L39.4 5.1C36.2 2.1 30.6 0 24 0C13.1 0 5.6 6.9 2.5 13.4L10.3 19.3C12.2 13.9 17.7 9.8 24 9.8Z" fill="#EA4335"/>
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          Sign in with Google
        </Button>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-primary underline hover:text-primary/80">Sign up</a>
        </div>
      </div>
    </div>
  );
}