import { NextResponse } from "next/server";
import { z } from "zod";
import { createBusinessListing, type BusinessListingCategory } from "@/lib/airtable";
import { sendCrmFailureAlert } from "@/lib/alert-email";

const CATEGORIES: [BusinessListingCategory, ...BusinessListingCategory[]] = [
  "Housing",
  "Healthcare",
  "Employment",
  "Family & Kids",
  "Newcomer Services",
  "Food & Nutrition",
  "Seniors",
  "Other",
];

const schema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(200),
  contactEmail: z.string().trim().email("A valid email is required"),
  contactPhone: z.string().trim().max(40).optional(),
  category: z.enum(CATEGORIES),
  submittedVia: z.enum(["List Your Business", "Get Featured"]),
  website: z.string().trim().max(300).optional(),
  description: z.string().trim().max(2000).optional(),
  featuredPitch: z.string().trim().max(2000).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;

  try {
    await createBusinessListing(input);
    return NextResponse.json({ success: true, crmWarning: false });
  } catch (error) {
    // No silent failures: the CRM write is await-blocking above, so if we
    // reach here the record genuinely was not written. Fire an alert and
    // tell the visitor the honest, partial-success story.
    await sendCrmFailureAlert({
      formName: input.submittedVia,
      submitterEmail: input.contactEmail,
      submitterName: input.businessName,
      payload: input,
      error,
    });

    return NextResponse.json(
      {
        success: true,
        crmWarning: true,
        message:
          "We received your submission, but our system had trouble saving it. Please also email tech@wilglobo.com directly just in case, and we'll make sure it's not lost.",
      },
      { status: 200 },
    );
  }
}
