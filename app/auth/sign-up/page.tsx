"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/supabase/actions";
import { CalgaryConnectLogo } from "@/components/calgary-connect-logo";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useTranslations, registerStrings } from "@/lib/translation-context";

// Register all sign-up page strings for translation
registerStrings(
  "Create your account",
  "Join Askonnect — everything Calgary, one place.",
  "Full name",
  "Jane Smith",
  "Email address",
  "you@example.com",
  "Password",
  "8+ characters",
  "Hide password",
  "Show password",
  "Creating account…",
  "Create account",
  "Already have an account?",
  "Sign in",
);

export default function SignUpPage() {
  return <SignUpForm />;
}

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  
  const tx = useTranslations({
    createAccount: "Create your account",
    joinSub: "Join Askonnect — everything Calgary, one place.",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "Jane Smith",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "8+ characters",
    hidePassword: "Hide password",
    showPassword: "Show password",
    creatingAccount: "Creating account…",
    createAcctBtn: "Create account",
    haveAccount: "Already have an account?",
    signIn: "Sign in",
  });

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <CalgaryConnectLogo size="lg" />
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
          <h1 className="text-xl font-bold text-foreground mb-1">{tx.createAccount}</h1>
          <p className="text-sm text-foreground/60 mb-6">{tx.joinSub}</p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setPending(true);
              const fd = new FormData(e.currentTarget);
              await signUp(fd);
              setPending(false);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5" htmlFor="full_name">
                {tx.fullNameLabel}
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                autoComplete="name"
                placeholder={tx.fullNamePlaceholder}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#38BDF8] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5" htmlFor="email">
                {tx.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={tx.emailPlaceholder}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#38BDF8] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5" htmlFor="password">
                {tx.passwordLabel}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder={tx.passwordPlaceholder}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#38BDF8] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70"
                  aria-label={showPassword ? tx.hidePassword : tx.showPassword}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#E1251B] hover:bg-[#b91c1c] text-white font-bold py-3 text-sm transition-all active:scale-95 disabled:opacity-60"
            >
              <UserPlus className="h-4 w-4" />
              {pending ? tx.creatingAccount : tx.createAcctBtn}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-foreground/50">
            {tx.haveAccount}{" "}
            <Link href="/auth/login" className="font-semibold text-[#1D4ED8] dark:text-[#38BDF8] hover:underline">
              {tx.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
