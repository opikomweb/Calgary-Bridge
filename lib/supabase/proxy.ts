import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Only create the Supabase client to refresh / forward cookies.
  // We do NOT call getUser() here — that would make a network round-trip
  // on every single request and can cause timeouts in sandbox environments.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Passively refresh the session token if a refresh token cookie is present.
  // This is lightweight — it only makes a network call when the access token
  // is actually expired and a refresh token exists.
  await supabase.auth.getSession();

  return supabaseResponse;
}
