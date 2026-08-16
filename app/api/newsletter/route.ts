import { NextResponse } from "next/server";
import { z } from "zod";
import { createNewsletterSubscriber } from "@/lib/airtable";
import { sendCrmFailureAlert } from "@/lib/alert-email";

const schema = z.object({
  email: z.string().trim().email("A valid email is required"),
  source: z.string().trim().min(1).max(120),
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
    await createNewsletterSubscriber(input);
    return NextResponse.json({ success: true, crmWarning: false });
  } catch (error) {
    await sendCrmFailureAlert({
      formName: "Newsletter Signup",
      submitterEmail: input.email,
      payload: input,
      error,
    });

    return NextResponse.json(
      {
        success: true,
        crmWarning: true,
        message:
          "We got your email, but our system had trouble saving it. Please also follow the LinkedIn newsletter below just in case.",
      },
      { status: 200 },
    );
  }
}
