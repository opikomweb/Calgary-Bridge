import { generateText, Output } from "ai";
import { z } from "zod";
import {
  findCandidateResources,
  serializeForPrompt,
  ALL_CATEGORIES,
} from "@/lib/resource-search";

// Never use the edge runtime with the AI SDK.
export const runtime = "nodejs";
export const maxDuration = 30;

const ResultSchema = z.object({
  reply: z
    .string()
    .describe(
      "A warm, conversational, genuinely helpful answer to THIS person's specific question, in their language. Plain text with **bold** for names/phone numbers. No markdown headings or bullet characters beyond simple dashes.",
    ),
  resourceIds: z
    .array(z.string())
    .describe(
      "IDs of the most relevant resources from the provided catalog (best first, max 4). Empty array if none truly fit.",
    ),
  webSearches: z
    .array(
      z.object({
        label: z.string().describe("Short button label, e.g. 'Food banks near you on Google Maps'"),
        url: z.string().describe("A real, working https URL: a Google search, Google Maps search, or a .gc.ca / .alberta.ca / .calgary.ca government page."),
      }),
    )
    .describe("0-3 live web/map/government links tailored to the question. Empty array if not useful."),
});

const LANG_NAMES: Record<string, string> = {
  en: "English", fr: "French", tl: "Tagalog", es: "Spanish", ar: "Arabic", zh: "Chinese",
};

export async function POST(req: Request) {
  try {
    const { message, language = "en", history = [] } = (await req.json()) as {
      message: string;
      language?: string;
      history?: { role: "user" | "assistant"; content: string }[];
    };

    if (!message || typeof message !== "string") {
      return Response.json({ error: "No message provided" }, { status: 400 });
    }

    const candidates = findCandidateResources(message);
    const catalog = serializeForPrompt(candidates);
    const langName = LANG_NAMES[language] ?? "English";

    const recentHistory = history
      .slice(-6)
      .map((m) => `${m.role === "user" ? "Resident" : "Guide"}: ${m.content}`)
      .join("\n");

    const system = `You are the iKonnect Guide — a warm, real, knowledgeable local guide for Calgary, Alberta who helps residents, newcomers, families, seniors, students and visitors find services and resources. You are NOT a robotic FAQ bot.

How you talk:
- Sound like a caring, savvy human who knows Calgary inside out. Be encouraging and specific, never generic.
- ALWAYS answer the person's EXACT question first and directly. Adapt fully to what they actually asked — if they ask something specific or unusual, address THAT, do not fall back to a canned category dump.
- Keep it concise and skimmable: a friendly sentence or two, then concrete next steps. Use **bold** for organization names and phone numbers.
- Vary your wording. Never reuse the same template. Two different questions must get two genuinely different answers.
- If a question is outside Calgary resources (e.g. casual chat), respond naturally and briefly, then offer to help with Calgary services.

Grounding rules:
- Prefer the CATALOG below (this is the app's vetted, current Calgary resource database) for organizations, phone numbers, and links. Put the catalog IDs you used in "resourceIds".
- When live or hyper-local info helps (locations near someone, current hours, government forms, eligibility, things happening now), add 1-3 "webSearches": real Google search URLs (https://www.google.com/search?q=...), Google Maps URLs (https://www.google.com/maps/search/?api=1&query=...), or official government pages (*.calgary.ca, *.alberta.ca, *.gc.ca). URL-encode the query text.
- Never invent phone numbers or addresses that aren't in the catalog; if unsure, point to a Google/Maps/government search instead.

Resource categories available in this app: ${ALL_CATEGORIES.join(", ")}.

Respond in ${langName}.

CATALOG (candidate resources matched to this question):
${catalog}`;

    const prompt = recentHistory
      ? `Conversation so far:\n${recentHistory}\n\nResident's new message: ${message}`
      : `Resident's message: ${message}`;

    const { experimental_output } = await generateText({
      model: "openai/gpt-5-mini",
      system,
      prompt,
      experimental_output: Output.object({ schema: ResultSchema }),
    });

    // Only return catalog IDs that actually exist as candidates (guards against
    // the model hallucinating an ID).
    const validIds = new Set(candidates.map((c) => c.id));
    const resourceIds = (experimental_output.resourceIds ?? [])
      .filter((id) => validIds.has(id))
      .slice(0, 4);

    const webSearches = (experimental_output.webSearches ?? [])
      .filter((w) => typeof w.url === "string" && w.url.startsWith("http"))
      .slice(0, 3);

    return Response.json({
      reply: experimental_output.reply,
      resourceIds,
      webSearches,
    });
  } catch (err) {
    console.log("[v0] chat route error:", err instanceof Error ? err.message : err);
    return Response.json(
      { error: "generation_failed" },
      { status: 500 },
    );
  }
}
