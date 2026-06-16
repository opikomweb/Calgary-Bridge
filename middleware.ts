import { updateSession } from "@/lib/supabase/proxy";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Only run middleware on auth routes and any future /protected routes.
  // Excluding the root app path prevents the session refresh from blocking
  // the main page render in sandbox/preview environments.
  matcher: ["/auth/:path*", "/protected/:path*"],
};
