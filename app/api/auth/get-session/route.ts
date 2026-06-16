import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// This route satisfies any legacy GET /api/auth/get-session requests.
// Returns the current Supabase session user (or null) so the client
// doesn't get a 404 that shows up as an error in logs.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return NextResponse.json({
    session: user
      ? { user: { id: user.id, email: user.email, name: user.user_metadata?.full_name ?? null } }
      : null,
  });
}
