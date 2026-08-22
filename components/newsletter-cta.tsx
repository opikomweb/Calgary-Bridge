"use client";

import { useState } from "react";
import { Mail, ExternalLink, BookOpen, Loader2, Check, AlertTriangle, Rss } from "lucide-react";
import { useTranslations, registerStrings } from "@/lib/translation-context";

registerStrings(
  "Stay in the loop",
  "New resources, Calgary guides, and community updates — pick whichever fits you.",
  "Follow the free newsletter",
  "The Digital Equity Hub, on LinkedIn — built for Calgary residents, not founders.",
  "Get notified here instead",
  "your@email.com",
  "Notify me",
  "Notifying...",
  "You're on the list.",
  "Saved, but please also follow the LinkedIn newsletter above just in case.",
  "Just read something",
  "No signup needed — browse the WilGlobo blog.",
);

/**
 * Part 5 — three-tier "stay in the loop" block, in order:
 *   1. Primary ask: free LinkedIn newsletter (Digital Equity Hub) — right
 *      audience fit for Calgary Konnect (residents, not founders).
 *   2. Lightweight native capture: writes to Newsletter Subscribers so
 *      WilGlobo can actually notify this audience directly.
 *   3. Always-present fallback: one click to the blog, no signup required.
 */
export default function NewsletterCta({ source = "Footer" }: { source?: string }) {
  const tx = useTranslations({
    heading: "Stay in the loop",
    subheading: "New resources, Calgary guides, and community updates — pick whichever fits you.",
    tier1Title: "Follow the free newsletter",
    tier1Desc: "The Digital Equity Hub, on LinkedIn — built for Calgary residents, not founders.",
    tier2Title: "Get notified here instead",
    emailPlaceholder: "your@email.com",
    notifyMe: "Notify me",
    notifying: "Notifying...",
    success: "You're on the list.",
    crmWarning: "Saved, but please also follow the LinkedIn newsletter above just in case.",
    tier3Title: "Just read something",
    tier3Desc: "No signup needed — browse the WilGlobo blog.",
  });

  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "warning" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      if (!res.ok) {
        setState("error");
        return;
      }
      const json = await res.json();
      setState(json.crmWarning ? "warning" : "success");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
      <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">{tx.heading}</h3>
      <p className="text-sm text-white/50 mb-6 max-w-2xl">{tx.subheading}</p>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Tier 1 — primary ask: LinkedIn newsletter */}
        <a
          href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7412912604257370112"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-3 rounded-xl border border-sky-500/25 bg-sky-500/[0.08] p-5 hover:bg-sky-500/[0.14] hover:border-sky-500/40 transition-all"
        >
          <div className="w-9 h-9 rounded-lg bg-sky-500/20 flex items-center justify-center">
            <Rss className="w-4.5 h-4.5 text-sky-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white flex items-center gap-1.5">
              {tx.tier1Title}
              <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-sky-400 transition-colors" />
            </p>
            <p className="text-xs text-white/45 mt-1 leading-relaxed">{tx.tier1Desc}</p>
          </div>
        </a>

        {/* Tier 2 — lightweight native capture */}
        <div className="flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center">
            <Mail className="w-4.5 h-4.5 text-white/70" />
          </div>
          <p className="text-sm font-semibold text-white">{tx.tier2Title}</p>

          {state === "success" || state === "warning" ? (
            <div className="flex items-start gap-2 text-xs">
              {state === "success" ? (
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              )}
              <span className={state === "success" ? "text-emerald-300" : "text-amber-300"}>
                {state === "success" ? tx.success : tx.crmWarning}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tx.emailPlaceholder}
                className="w-full h-10 px-3 rounded-lg bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
              />
              <button
                type="submit"
                disabled={state === "submitting"}
                className="h-10 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-sm font-semibold text-white transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {state === "submitting" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> {tx.notifying}
                  </>
                ) : (
                  tx.notifyMe
                )}
              </button>
              {state === "error" && (
                <p className="text-xs text-red-300">
                  {tx.crmWarning}
                </p>
              )}
            </form>
          )}
        </div>

        {/* Tier 3 — always-present fallback: blog, no signup */}
        <a
          href="https://blog.wilglobo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.05] transition-all"
        >
          <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center">
            <BookOpen className="w-4.5 h-4.5 text-white/70" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white flex items-center gap-1.5">
              {tx.tier3Title}
              <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 transition-colors" />
            </p>
            <p className="text-xs text-white/45 mt-1 leading-relaxed">{tx.tier3Desc}</p>
          </div>
        </a>
      </div>
    </div>
  );
}
