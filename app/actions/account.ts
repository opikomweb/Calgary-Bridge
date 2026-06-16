"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { savedResource, userPreference } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"

/** Returns the current user's id, or null if not signed in. */
async function getUserIdOrNull(): Promise<string | null> {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id ?? null
}

// --- Saved resources -------------------------------------------------------

export async function getSavedResources(): Promise<string[]> {
  const userId = await getUserIdOrNull()
  if (!userId) return []
  const rows = await db
    .select({ resourceId: savedResource.resourceId })
    .from(savedResource)
    .where(eq(savedResource.userId, userId))
    .orderBy(desc(savedResource.createdAt))
  return rows.map((r) => r.resourceId)
}

export async function addSavedResource(resourceId: string): Promise<{ ok: boolean }> {
  const userId = await getUserIdOrNull()
  if (!userId) return { ok: false }
  await db
    .insert(savedResource)
    .values({ userId, resourceId })
    .onConflictDoNothing()
  return { ok: true }
}

export async function removeSavedResource(resourceId: string): Promise<{ ok: boolean }> {
  const userId = await getUserIdOrNull()
  if (!userId) return { ok: false }
  await db
    .delete(savedResource)
    .where(and(eq(savedResource.userId, userId), eq(savedResource.resourceId, resourceId)))
  return { ok: true }
}

// --- Preferences -----------------------------------------------------------

export type UserPreferences = {
  role: string | null
  language: string
  notifications: boolean
}

export async function getPreferences(): Promise<UserPreferences | null> {
  const userId = await getUserIdOrNull()
  if (!userId) return null
  const rows = await db
    .select()
    .from(userPreference)
    .where(eq(userPreference.userId, userId))
    .limit(1)
  if (rows.length === 0) {
    return { role: null, language: "en", notifications: true }
  }
  const p = rows[0]
  return { role: p.role, language: p.language, notifications: p.notifications }
}

export async function savePreferences(prefs: Partial<UserPreferences>): Promise<{ ok: boolean }> {
  const userId = await getUserIdOrNull()
  if (!userId) return { ok: false }
  await db
    .insert(userPreference)
    .values({
      userId,
      role: prefs.role ?? null,
      language: prefs.language ?? "en",
      notifications: prefs.notifications ?? true,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: userPreference.userId,
      set: {
        ...(prefs.role !== undefined ? { role: prefs.role } : {}),
        ...(prefs.language !== undefined ? { language: prefs.language } : {}),
        ...(prefs.notifications !== undefined ? { notifications: prefs.notifications } : {}),
        updatedAt: new Date(),
      },
    })
  return { ok: true }
}
