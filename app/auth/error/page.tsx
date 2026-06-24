"use client";

import Link from "next/link";
import { CalgaryConnectLogo } from "@/components/calgary-connect-logo";
import { AlertTriangle } from "lucide-react";
import { useTranslations, registerStrings } from "@/lib/translation-context";

// Register error page strings for translation
registerStrings(
  "Authentication error",
  "Something went wrong during sign in. Please try again.",
  "Back to sign in",
);

export default function AuthErrorPage() {
  const tx = useTranslations({
    errorTitle: "Authentication error",
    errorMsg: "Something went wrong during sign in. Please try again.",
    backToSignIn: "Back to sign in",
  });
  
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center mb-8">
          <CalgaryConnectLogo size="lg" />
        </div>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-[#E1251B]/10 p-3">
              <AlertTriangle className="h-8 w-8 text-[#E1251B]" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">{tx.errorTitle}</h1>
          <p className="text-sm text-foreground/60 mb-6">
            {tx.errorMsg}
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-xl bg-[#1D4ED8] dark:bg-[#38BDF8] text-white dark:text-[#0c1a2e] font-bold px-6 py-3 text-sm hover:opacity-90 transition-all"
          >
            {tx.backToSignIn}
          </Link>
        </div>
      </div>
    </div>
  );
}
