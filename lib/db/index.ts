import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

// Reuse a single Pool across hot reloads / serverless invocations so we never
// leak connections under heavy concurrent load. Neon's pooled connection
// string (PgBouncer) fronts this, so each instance keeps only a small pool
// while Neon multiplexes thousands of clients on the server side.
const globalForPool = globalThis as unknown as { __ccPool?: Pool }

export const pool =
  globalForPool.__ccPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Keep per-instance connections small; the Neon pooler fans out.
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    allowExitOnIdle: true,
  })

if (process.env.NODE_ENV !== "production") globalForPool.__ccPool = pool

// Never let an unexpected idle-client error crash the whole process.
pool.on("error", (err) => {
  console.error("[v0] Postgres pool error:", err.message)
})

export const db = drizzle(pool, { schema })
