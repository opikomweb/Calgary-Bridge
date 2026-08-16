/**
 * lib/airtable.ts
 *
 * Airtable CRM wiring for Calgary Konnect, following the same convention
 * used across the WilGlobo ecosystem: this app writes records with a
 * data.records:read/write-scoped Personal Access Token — schema changes
 * (creating tables/fields) always happen through the Airtable UI or the
 * one-time setup script, never at runtime from this app.
 *
 * Base: "WilGlobo CRM & Ops Hub" (shared with the main site's LEADS,
 * Partners, and Programs & Products tables).
 *
 * Tables used here:
 *   - Business Listings   (List Your Business / Get Featured / business-shaped Partnership Inquiry)
 *   - LEADS               (Volunteer With Us / general Contact / person-shaped Partnership Inquiry)
 *   - Newsletter Subscribers (native email capture — see Part 5)
 *
 * All writes are `await`-blocking. Callers are responsible for firing an
 * alert email (see lib/alert-email.ts) when a write fails, and for never
 * returning a false "success" to the visitor.
 */

const AIRTABLE_API_BASE = "https://api.airtable.com/v0";

const BASE_ID = process.env.AIRTABLE_BASE_ID || "appBiAKY6ivoImcaQ";
const LEADS_TABLE_ID = process.env.AIRTABLE_LEADS_TABLE_ID || "tblFQPZqRFZjtCOEW";
const NEWSLETTER_TABLE_ID = process.env.AIRTABLE_NEWSLETTER_TABLE_ID || "tblfH1jULqjblc1Q7";
// Business Listings is a new table with no fixed ID yet — set
// AIRTABLE_BUSINESS_LISTINGS_TABLE_ID once the one-time setup script has run.
const BUSINESS_LISTINGS_TABLE_ID =
  process.env.AIRTABLE_BUSINESS_LISTINGS_TABLE_ID || "Business Listings";

function getToken(): string {
  const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    throw new Error("AIRTABLE_PERSONAL_ACCESS_TOKEN is not configured");
  }
  return token;
}

async function airtableCreate(
  tableIdOrName: string,
  fields: Record<string, unknown>,
): Promise<{ id: string }> {
  const res = await fetch(
    `${AIRTABLE_API_BASE}/${BASE_ID}/${encodeURIComponent(tableIdOrName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields }],
        typecast: true,
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Airtable write failed (${res.status}) on table "${tableIdOrName}": ${text}`,
    );
  }

  const json = await res.json();
  return json.records?.[0] ?? { id: "" };
}

// ---------------------------------------------------------------------------
// Business Listings — List Your Business / Get Featured / business-shaped
// Partnership Inquiry (Part 1, Part 2, Part 3)
// ---------------------------------------------------------------------------

export type BusinessListingCategory =
  | "Housing"
  | "Healthcare"
  | "Employment"
  | "Family & Kids"
  | "Newcomer Services"
  | "Food & Nutrition"
  | "Seniors"
  | "Other";

export type SubmittedVia =
  | "List Your Business"
  | "Get Featured"
  | "Partnership Inquiry";

export interface BusinessListingInput {
  businessName: string;
  contactEmail: string;
  contactPhone?: string;
  category: BusinessListingCategory;
  submittedVia: SubmittedVia;
  website?: string;
  description?: string;
  /** Free-text: for "Get Featured" this is "what makes them worth featuring" */
  featuredPitch?: string;
  notes?: string;
}

export async function createBusinessListing(input: BusinessListingInput) {
  const noteParts = [
    input.description ? `Description: ${input.description}` : null,
    input.featuredPitch ? `Why they should be featured: ${input.featuredPitch}` : null,
    input.notes ? input.notes : null,
  ].filter(Boolean);

  return airtableCreate(BUSINESS_LISTINGS_TABLE_ID, {
    "Business Name": input.businessName,
    "Contact Email": input.contactEmail,
    "Contact Phone": input.contactPhone || undefined,
    Category: input.category,
    "Submitted Via": input.submittedVia,
    Status: "New Submission",
    "Sponsorship Status": "Not Sponsored",
    "Sponsorship Tier": "None",
    Notes: noteParts.join("\n\n") || undefined,
  });
}

// ---------------------------------------------------------------------------
// LEADS — Volunteer With Us / Contact Us / person-shaped Partnership Inquiry
// ---------------------------------------------------------------------------

export type LeadSource =
  | "Calgary Konnect — Volunteer"
  | "Calgary Konnect — Contact"
  | "Calgary Konnect — Partnership Inquiry";

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  source: LeadSource;
  message?: string;
}

export async function createLead(input: LeadInput) {
  return airtableCreate(LEADS_TABLE_ID, {
    Name: input.name,
    Email: input.email,
    Phone: input.phone || undefined,
    Source: input.source,
    Status: "New Lead",
    "Next Action": input.message || undefined,
  });
}

// ---------------------------------------------------------------------------
// Newsletter Subscribers — native email capture (Part 5, tier 2)
// ---------------------------------------------------------------------------

export interface NewsletterSignupInput {
  email: string;
  source: string;
}

export async function createNewsletterSubscriber(input: NewsletterSignupInput) {
  return airtableCreate(NEWSLETTER_TABLE_ID, {
    Email: input.email,
    Property: "Calgary Konnect",
    "Interest Tags": "Calgary Community Resources",
    Source: input.source,
    "Consent Version": "v1",
  });
}
