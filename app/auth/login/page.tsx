"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/supabase/actions";
import { CalgaryConnectLogo } from "@/components/calgary-connect-logo";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return <LoginForm />;
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <CalgaryConnectLogo size="lg" />
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
          <h1 className="text-xl font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-sm text-foreground/60 mb-6">Sign in to your iKonnect account</p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setPending(true);
              const fd = new FormData(e.currentTarget);
              await signIn(fd);
              setPending(false);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#38BDF8] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#38BDF8] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1e40af] dark:bg-[#38BDF8] dark:hover:bg-[#0ea5e9] text-white dark:text-[#0c1a2e] font-bold py-3 text-sm transition-all active:scale-95 disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-foreground/50">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="font-semibold text-[#E1251B] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
