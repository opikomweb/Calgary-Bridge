"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/lib/store";
import {
  getSavedResources,
  addSavedResource,
  removeSavedResource,
  getPreferences,
  savePreferences,
} from "@/app/actions/account";
import type { Language, UserRole } from "@/lib/types";
import type { User } from "@supabase/supabase-js";
import { useTranslations, registerStrings } from "@/lib/translation-context";

registerStrings(
  "Welcome back",
  "Sign in to sync your saved resources",
  "Create account",
  "Join Calgary Connect — everything in one place",
  "Full name",
  "Email address",
  "Password",
  "8+ characters",
  "Signing in\u2026",
  "Creating account\u2026",
  "Sign in",
  "No account?",
  "Create one",
  "Already have one?",
  "Show password",
  "Hide password",
  "Account created! Check your inbox for a confirmation link, then sign in.",
  "Close",
);

type AuthUser = { id: string; name: string; email: string } | null;

interface AuthContextValue {
  user: AuthUser;
  isPending: boolean;
  openAuth: (mode?: "sign-in" | "sign-up") => void;
  closeAuth: () => void;
  authOpen: boolean;
  authMode: "sign-in" | "sign-up";
  setAuthMode: (m: "sign-in" | "sign-up") => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

function toAuthUser(user: User | null): AuthUser {
  if (!user) return null;
  return {
    id: user.id,
    name:
      user.user_metadata?.full_name ??
      user.email?.split("@")[0] ??
      "User",
    email: user.email ?? "",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [rawUser, setRawUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");

  const user = toAuthUser(rawUser);

  // Hydrate session on mount and listen for auth state changes
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setRawUser(data.user ?? null);
      setIsPending(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setRawUser(session?.user ?? null);
      setIsPending(false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAuth = useCallback((mode: "sign-in" | "sign-up" = "sign-in") => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    useAppStore.setState({
      bookmarkedResources: [],
      selectedRole: null,
      userName: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On login: pull DB data into the local store
  const lastUserId = useRef<string | null>(null);
  useEffect(() => {
    if (!user) {
      lastUserId.current = null;
      return;
    }
    if (lastUserId.current === user.id) return;
    lastUserId.current = user.id;

    let cancelled = false;
    (async () => {
      try {
        const [dbSaved, prefs] = await Promise.all([
          getSavedResources(),
          getPreferences(),
        ]);
        if (cancelled) return;

        const state = useAppStore.getState();
        const merged = Array.from(
          new Set([...dbSaved, ...state.bookmarkedResources]),
        );
        const updates: Partial<ReturnType<typeof useAppStore.getState>> = {
          bookmarkedResources: merged,
        };
        if (prefs) {
          if (prefs.role) updates.selectedRole = prefs.role as UserRole;
          if (prefs.language) updates.activeLanguage = prefs.language as Language;
        }
        useAppStore.setState(updates);

        const localOnly = state.bookmarkedResources.filter(
          (id) => !dbSaved.includes(id),
        );
        await Promise.all(localOnly.map((id) => addSavedResource(id)));

        // Close modal after a successful sign-in sync
        setAuthOpen(false);
      } catch (err) {
        console.error("[auth] Failed to sync account data:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // Keep bookmarks in sync with the DB
  const bookmarks = useAppStore((s) => s.bookmarkedResources);
  const prevBookmarks = useRef<string[]>(bookmarks);
  useEffect(() => {
    const prev = prevBookmarks.current;
    prevBookmarks.current = bookmarks;
    if (!user) return;
    const added = bookmarks.filter((id) => !prev.includes(id));
    const removed = prev.filter((id) => !bookmarks.includes(id));
    added.forEach((id) => addSavedResource(id).catch(() => {}));
    removed.forEach((id) => removeSavedResource(id).catch(() => {}));
  }, [bookmarks, user]);

  // Persist preferences when signed in
  const role = useAppStore((s) => s.selectedRole);
  const language = useAppStore((s) => s.activeLanguage);
  const notifications = useAppStore((s) => s.notificationsEnabled);
  const prefsHydrated = useRef(false);
  useEffect(() => {
    if (!user) {
      prefsHydrated.current = false;
      return;
    }
    if (!prefsHydrated.current) {
      prefsHydrated.current = true;
      return;
    }
    savePreferences({ role: role ?? undefined, language, notifications }).catch(
      () => {},
    );
  }, [role, language, notifications, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isPending,
        openAuth,
        closeAuth,
        authOpen,
        authMode,
        setAuthMode,
        signOut,
      }}
    >
      {children}
      {authOpen && (
        <AuthModal mode={authMode} setMode={setAuthMode} onClose={closeAuth} />
      )}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Inline Auth Modal — no page redirect, slides in as an overlay
// ---------------------------------------------------------------------------

function AuthModal({
  mode,
  setMode,
  onClose,
}: {
  mode: "sign-in" | "sign-up";
  setMode: (m: "sign-in" | "sign-up") => void;
  onClose: () => void;
}) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const tx = useTranslations({
    welcomeBack: "Welcome back",
    signInSubtitle: "Sign in to sync your saved resources",
    createAccount: "Create account",
    createSubtitle: "Join Calgary Connect — everything in one place",
    fullName: "Full name",
    emailAddress: "Email address",
    password: "Password",
    eightPlus: "8+ characters",
    signingIn: "Signing in\u2026",
    creatingAccount: "Creating account\u2026",
    signIn: "Sign in",
    noAccount: "No account?",
    createOne: "Create one",
    alreadyHaveOne: "Already have one?",
    showPassword: "Show password",
    hidePassword: "Hide password",
    successMsg: "Account created! Check your inbox for a confirmation link, then sign in.",
    close: "Close",
  });

  const switchMode = (m: "sign-in" | "sign-up") => {
    setMode(m);
    setError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setPending(true);

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      // On success, onAuthStateChange fires → user synced → modal closed automatically
    } else {
      const redirectTo =
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
        `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: { full_name: fullName },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccessMsg(
          "Account created! Check your inbox for a confirmation link, then sign in.",
        );
      }
    }

    setPending(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={mode === "sign-in" ? "Sign in" : "Create account"}
    >
      <div className="w-full sm:max-w-sm bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {mode === "sign-in" ? tx.welcomeBack : tx.createAccount}
            </h2>
            <p className="text-xs text-foreground/55 mt-0.5">
              {mode === "sign-in" ? tx.signInSubtitle : tx.createSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={tx.close}
            className="rounded-xl p-2 text-foreground/40 hover:text-foreground hover:bg-foreground/[0.06] transition-colors -mt-1 -mr-1"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {successMsg ? (
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 p-4 text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            {tx.successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "sign-up" && (
              <div>
                <label
                  htmlFor="modal-name"
                  className="block text-xs font-semibold text-foreground/70 mb-1.5"
                >
                  {tx.fullName}
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Jane Smith"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#38BDF8] transition"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="modal-email"
                className="block text-xs font-semibold text-foreground/70 mb-1.5"
              >
                {tx.emailAddress}
              </label>
              <input
                id="modal-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#38BDF8] transition"
              />
            </div>

            <div>
              <label
                htmlFor="modal-password"
                className="block text-xs font-semibold text-foreground/70 mb-1.5"
              >
                {tx.password}
              </label>
              <div className="relative">
                <input
                  id="modal-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete={
                    mode === "sign-in" ? "current-password" : "new-password"
                  }
                  placeholder={mode === "sign-up" ? tx.eightPlus : "••••••••"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#38BDF8] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? tx.hidePassword : tx.showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs font-medium text-[#E1251B] bg-[#E1251B]/10 border border-[#E1251B]/20 rounded-xl px-3.5 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1e40af] dark:bg-[#38BDF8] dark:hover:bg-[#0ea5e9] text-white dark:text-[#0c1a2e] font-bold py-3 text-sm transition-all active:scale-95 disabled:opacity-60"
            >
              {pending
                ? mode === "sign-in"
                  ? tx.signingIn
                  : tx.creatingAccount
                : mode === "sign-in"
                  ? tx.signIn
                  : tx.createAccount}
            </button>
          </form>
        )}

        <p className="mt-5 text-center text-xs text-foreground/50">
          {mode === "sign-in" ? `${tx.noAccount} ` : `${tx.alreadyHaveOne} `}
          <button
            onClick={() =>
              switchMode(mode === "sign-in" ? "sign-up" : "sign-in")
            }
            className="font-semibold text-[#E1251B] hover:underline"
          >
            {mode === "sign-in" ? tx.createOne : tx.signIn}
          </button>
        </p>
      </div>
    </div>
  );
}
