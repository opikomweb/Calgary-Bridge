"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useAuth } from "./auth-provider"

export function AuthDialog() {
  const { authOpen, closeAuth, authMode, setAuthMode } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isSignUp = authMode === "sign-up"

  const reset = () => {
    setName("")
    setEmail("")
    setPassword("")
    setError(null)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError("Please enter your email and password.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (isSignUp && !name.trim()) {
      setError("Please enter your name.")
      return
    }

    setLoading(true)
    try {
      if (isSignUp) {
        const { error } = await authClient.signUp.email({ email: email.trim(), password, name: name.trim() })
        if (error) {
          setError(error.message || "Could not create your account.")
          setLoading(false)
          return
        }
      } else {
        const { error } = await authClient.signIn.email({ email: email.trim(), password })
        if (error) {
          setError(error.message || "Incorrect email or password.")
          setLoading(false)
          return
        }
      }
      reset()
      closeAuth()
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {authOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeAuth}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-md rounded-3xl bg-[var(--background)] border border-[var(--border)] shadow-2xl p-7 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeAuth}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-foreground/50 hover:bg-foreground/10 hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-balance">
                {isSignUp ? "Create your account" : "Welcome back"}
              </h2>
              <p className="text-sm text-foreground/55 mt-1.5 leading-relaxed">
                {isSignUp
                  ? "Save resources and sync them across all your devices."
                  : "Sign in to access your saved resources and preferences."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <Field icon={<UserIcon className="h-5 w-5" />}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    autoComplete="name"
                    className="w-full bg-transparent py-3.5 pr-4 text-sm md:text-base outline-none placeholder:text-foreground/40"
                  />
                </Field>
              )}
              <Field icon={<Mail className="h-5 w-5" />}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  className="w-full bg-transparent py-3.5 pr-4 text-sm md:text-base outline-none placeholder:text-foreground/40"
                />
              </Field>
              <Field icon={<Lock className="h-5 w-5" />}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min. 8 characters)"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className="w-full bg-transparent py-3.5 pr-4 text-sm md:text-base outline-none placeholder:text-foreground/40"
                />
              </Field>

              {error && (
                <p className="text-sm text-[#E1251B] font-medium" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#0A2540] py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:shadow-xl hover:shadow-blue-900/40 active:scale-[0.98] disabled:opacity-60"
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                {isSignUp ? "Create account" : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-foreground/55">
              {isSignUp ? "Already have an account?" : "New to Calgary Connect?"}{" "}
              <button
                onClick={() => {
                  setError(null)
                  setAuthMode(isSignUp ? "sign-in" : "sign-up")
                }}
                className="font-semibold text-[#1D4ED8] hover:underline"
              >
                {isSignUp ? "Sign in" : "Create an account"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 transition-colors focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-[#1D4ED8]/25">
      <span className="text-foreground/40">{icon}</span>
      {children}
    </div>
  )
}
