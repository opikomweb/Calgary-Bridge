"use server";

import { createClient } from "@/lib/supabase/server";

// ---- helpers ----------------------------------------------------------------

async function getUserIdOrNull(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

// ---- Saved resources --------------------------------------------------------

export async function getSavedResources(): Promise<string[]> {
  const userId = await getUserIdOrNull();
  if (!userId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("saved_resources")
    .select("resource_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[account] getSavedResources:", error.message);
    return [];
  }
  return (data ?? []).map((r) => r.resource_id as string);
}

export async function addSavedResource(
  resourceId: string,
): Promise<{ ok: boolean }> {
  const userId = await getUserIdOrNull();
  if (!userId) return { ok: false };

  const supabase = await createClient();
  const { error } = await supabase
    .from("saved_resources")
    .upsert(
      { user_id: userId, resource_id: resourceId },
      { onConflict: "user_id,resource_id" },
    );

  if (error) console.error("[account] addSavedResource:", error.message);
  return { ok: !error };
}

export async function removeSavedResource(
  resourceId: string,
): Promise<{ ok: boolean }> {
  const userId = await getUserIdOrNull();
  if (!userId) return { ok: false };

  const supabase = await createClient();
  const { error } = await supabase
    .from("saved_resources")
    .delete()
    .eq("user_id", userId)
    .eq("resource_id", resourceId);

  if (error) console.error("[account] removeSavedResource:", error.message);
  return { ok: !error };
}

// ---- Preferences ------------------------------------------------------------

export type UserPreferences = {
  role: string | null;
  language: string;
  notifications: boolean;
};

export async function getPreferences(): Promise<UserPreferences | null> {
  const userId = await getUserIdOrNull();
  if (!userId) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_preferences")
    .select("role, language, notifications")
    .eq("user_id", userId)
    .single();

  // PGRST116 = no rows — normal for a brand-new user
  if (error && error.code !== "PGRST116") {
    console.error("[account] getPreferences:", error.message);
  }

  if (!data) return { role: null, language: "en", notifications: true };
  return {
    role: (data.role as string | null) ?? null,
    language: (data.language as string) ?? "en",
    notifications: (data.notifications as boolean) ?? true,
  };
}

export async function savePreferences(
  prefs: Partial<UserPreferences>,
): Promise<{ ok: boolean }> {
  const userId = await getUserIdOrNull();
  if (!userId) return { ok: false };

  const supabase = await createClient();
  const { error } = await supabase.from("user_preferences").upsert(
    {
      user_id: userId,
      role: prefs.role ?? null,
      language: prefs.language ?? "en",
      notifications: prefs.notifications ?? true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) console.error("[account] savePreferences:", error.message);
  return { ok: !error };
}
