import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/airtable";
import { sendCrmFailureAlert } from "@/lib/alert-email";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("A valid email is required"),
  areaOfInterest: z.string().trim().min(1, "Please select an area of interest").max(120),
  availability: z.string().trim().max(500).optional(),
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
  const message = [
    `Area of interest: ${input.areaOfInterest}`,
    input.availability ? `Availability: ${input.availability}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await createLead({
      name: input.name,
      email: input.email,
      source: "Calgary Konnect — Volunteer",
      message,
    });
    return NextResponse.json({ success: true, crmWarning: false });
  } catch (error) {
    await sendCrmFailureAlert({
      formName: "Volunteer With Us",
      submitterEmail: input.email,
      submitterName: input.name,
      payload: input,
      error,
    });

    return NextResponse.json(
      {
        success: true,
        crmWarning: true,
        message:
          "We got your volunteer application, but our system had trouble saving it. Please also email tech@wilglobo.com directly just in case, and we'll make sure it's not lost.",
      },
      { status: 200 },
    );
  }
}
