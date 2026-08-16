import { NextResponse } from "next/server";
import { z } from "zod";
import { createBusinessListing, createLead } from "@/lib/airtable";
import { sendCrmFailureAlert } from "@/lib/alert-email";

// Partnership Inquiry can come from an individual or an organization — the
// form asks which, and we route accordingly (Part 3): organization-shaped
// inquiries also get a Business Listings record, individual-shaped ones go
// straight to LEADS only.
const schema = z.object({
  inquirerType: z.enum(["individual", "organization"]),
  contactName: z.string().trim().min(1, "Name is required").max(200),
  contactEmail: z.string().trim().email("A valid email is required"),
  organizationName: z.string().trim().max(200).optional(),
  natureOfPartnership: z.string().trim().min(1, "Please describe the partnership").max(2000),
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
    // Always create a LEADS record — Partnership Inquiry submitters are
    // people making contact, regardless of whether they represent an org.
    await createLead({
      name: input.contactName,
      email: input.contactEmail,
      source: "Calgary Konnect — Partnership Inquiry",
      message: [
        input.organizationName ? `Organization: ${input.organizationName}` : null,
        `Nature of partnership: ${input.natureOfPartnership}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // Organization-shaped inquiries additionally get a Business Listings
    // record so the site owner can track/approve them alongside other
    // business submissions.
    if (input.inquirerType === "organization" && input.organizationName) {
      await createBusinessListing({
        businessName: input.organizationName,
        contactEmail: input.contactEmail,
        category: "Other",
        submittedVia: "Partnership Inquiry",
        description: input.natureOfPartnership,
      });
    }

    return NextResponse.json({ success: true, crmWarning: false });
  } catch (error) {
    await sendCrmFailureAlert({
      formName: "Partnership Inquiry",
      submitterEmail: input.contactEmail,
      submitterName: input.contactName,
      payload: input,
      error,
    });

    return NextResponse.json(
      {
        success: true,
        crmWarning: true,
        message:
          "We received your partnership inquiry, but our system had trouble saving it. Please also email tech@wilglobo.com directly just in case, and we'll make sure it's not lost.",
      },
      { status: 200 },
    );
  }
}
