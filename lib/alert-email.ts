/**
 * lib/alert-email.ts
 *
 * Fires an immediate alert to the team inbox when an Airtable write fails,
 * per the "no silent failures" pattern (Part 4): a 200 response with a
 * false success message and zero real record written is the exact bug
 * this ecosystem has already spent a week chasing on the main site.
 *
 * Uses the Resend REST API directly (no SDK dependency needed for a
 * single transactional send).
 */

const ALERT_TO = process.env.CALGARY_KONNECT_ALERT_EMAIL || "tech@wilglobo.com";
const ALERT_FROM = process.env.CALGARY_KONNECT_ALERT_FROM || "alerts@wilglobo.com";

export async function sendCrmFailureAlert(params: {
  formName: string;
  submitterEmail?: string;
  submitterName?: string;
  payload: Record<string, unknown>;
  error: unknown;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const errorMessage = params.error instanceof Error ? params.error.message : String(params.error);

  if (!apiKey) {
    // Still log loudly server-side so the failure is never silent, even if
    // the alert email itself can't be sent because the key is missing.
    console.error(
      `[v0] CRM write failed for "${params.formName}" and RESEND_API_KEY is not set — no alert email sent.`,
      { payload: params.payload, error: errorMessage },
    );
    return { sent: false, reason: "missing_api_key" as const };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ALERT_FROM,
        to: ALERT_TO,
        subject: `[ACTION REQUIRED] Calgary Konnect CRM write failed — ${params.formName}`,
        text: [
          `A CRM write failed on Calgary Konnect for the "${params.formName}" form.`,
          "",
          `Submitter name: ${params.submitterName || "(not provided)"}`,
          `Submitter email: ${params.submitterEmail || "(not provided)"}`,
          "",
          "Raw payload:",
          JSON.stringify(params.payload, null, 2),
          "",
          "Raw error:",
          errorMessage,
          "",
          "The visitor was shown an honest partial-success message asking them",
          "to also follow up directly. This submission needs to be captured",
          "manually until the underlying issue is fixed.",
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[v0] Resend alert email failed to send (${res.status}): ${text}`);
      return { sent: false, reason: "resend_error" as const };
    }

    return { sent: true as const };
  } catch (err) {
    console.error("[v0] Resend alert email threw:", err);
    return { sent: false, reason: "exception" as const };
  }
}
