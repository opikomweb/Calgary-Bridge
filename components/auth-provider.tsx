"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useAppStore } from "@/lib/store"
import {
  getSavedResources,
  addSavedResource,
  removeSavedResource,
  getPreferences,
  savePreferences,
} from "@/app/actions/account"
import type { Language, UserRole } from "@/lib/types"

type AuthUser = { id: string; name: string; email: string } | null

interface AuthContextValue {
  user: AuthUser
  isPending: boolean
  openAuth: (mode?: "sign-in" | "sign-up") => void
  closeAuth: () => void
  authOpen: boolean
  authMode: "sign-in" | "sign-up"
  setAuthMode: (m: "sign-in" | "sign-up") => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const user = (session?.user as AuthUser) ?? null

  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in")

  const openAuth = (mode: "sign-in" | "sign-up" = "sign-in") => {
    setAuthMode(mode)
    setAuthOpen(true)
  }
  const closeAuth = () => setAuthOpen(false)

  const signOut = async () => {
    await authClient.signOut()
    // Clear personalized local state on sign out.
    useAppStore.setState({ bookmarkedResources: [], selectedRole: null, userName: "" })
  }

  // --- On login: merge DB saved items + preferences into the local store ---
  const lastUserId = useRef<string | null>(null)
  useEffect(() => {
    if (!user) {
      lastUserId.current = null
      return
    }
    if (lastUserId.current === user.id) return
    lastUserId.current = user.id

    let cancelled = false
    ;(async () => {
      try {
        const [dbSaved, prefs] = await Promise.all([getSavedResources(), getPreferences()])
        if (cancelled) return

        const state = useAppStore.getState()
        // Union local + remote so nothing the user saved before signing in is lost.
        const merged = Array.from(new Set([...dbSaved, ...state.bookmarkedResources]))
        const updates: Partial<ReturnType<typeof useAppStore.getState>> = {
          bookmarkedResources: merged,
        }
        if (prefs) {
          if (prefs.role) updates.selectedRole = prefs.role as UserRole
          if (prefs.language) updates.activeLanguage = prefs.language as Language
        }
        useAppStore.setState(updates)

        // Push any local-only saves up to the DB so devices stay in sync.
        const localOnly = state.bookmarkedResources.filter((id) => !dbSaved.includes(id))
        await Promise.all(localOnly.map((id) => addSavedResource(id)))
      } catch (err) {
        console.error("[v0] Failed to sync account data:", err)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [user])

  // --- Keep DB saved items in sync with local bookmark changes ---
  const bookmarks = useAppStore((s) => s.bookmarkedResources)
  const prevBookmarks = useRef<string[]>(bookmarks)
  useEffect(() => {
    const prev = prevBookmarks.current
    prevBookmarks.current = bookmarks
    if (!user) return
    const added = bookmarks.filter((id) => !prev.includes(id))
    const removed = prev.filter((id) => !bookmarks.includes(id))
    added.forEach((id) => addSavedResource(id).catch(() => {}))
    removed.forEach((id) => removeSavedResource(id).catch(() => {}))
  }, [bookmarks, user])

  // --- Persist role / language preferences to the DB when signed in ---
  const role = useAppStore((s) => s.selectedRole)
  const language = useAppStore((s) => s.activeLanguage)
  const prefsHydrated = useRef(false)
  useEffect(() => {
    if (!user) {
      prefsHydrated.current = false
      return
    }
    // Skip the first run right after login (that's the DB → store hydration).
    if (!prefsHydrated.current) {
      prefsHydrated.current = true
      return
    }
    savePreferences({ role: role ?? null, language }).catch(() => {})
  }, [role, language, user])

  return (
    <AuthContext.Provider
      value={{ user, isPending, openAuth, closeAuth, authOpen, authMode, setAuthMode, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
