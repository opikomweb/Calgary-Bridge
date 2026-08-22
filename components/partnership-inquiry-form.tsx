"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Handshake, Check, AlertTriangle, Loader2, Mail } from "lucide-react";
import { registerStrings, useTranslations } from "@/lib/translation-context";

registerStrings(
  "Partner With Calgary Konnect",
  "Non-profits, government agencies, community orgs, and civic-tech partners — tell us about it.",
  "Are you reaching out as an...", "Individual", "Organization",
  "Your Name *", "Organization Name *", "Email *",
  "What's the nature of the partnership? *",
  "Tell us what you're proposing and how it fits Calgary Konnect's mission...",
  "Submit Inquiry", "Submitting...",
  "Inquiry Sent!", "Thanks for reaching out — our team will follow up within 2-3 business days.",
  "We received it, but...", "Something went wrong",
  "Please try again, or email us directly at", "Close",
);

interface PartnershipInquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnershipInquiryForm({ isOpen, onClose }: PartnershipInquiryFormProps) {
  const [inquirerType, setInquirerType] = useState<"individual" | "organization">("organization");
  const [contactName, setContactName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [natureOfPartnership, setNatureOfPartnership] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [crmWarning, setCrmWarning] = useState(false);
  const [crmWarningMessage, setCrmWarningMessage] = useState("");

  const tx = useTranslations({
    title: "Partner With Calgary Konnect",
    subtitle: "Non-profits, government agencies, community orgs, and civic-tech partners — tell us about it.",
    typeLabel: "Are you reaching out as an...",
    individual: "Individual",
    organization: "Organization",
    nameLabel: "Your Name *",
    orgLabel: "Organization Name *",
    emailLabel: "Email *",
    natureLabel: "What's the nature of the partnership? *",
    naturePlaceholder: "Tell us what you're proposing and how it fits Calgary Konnect's mission...",
    submit: "Submit Inquiry",
    submitting: "Submitting...",
    sent: "Inquiry Sent!",
    sentDesc: "Thanks for reaching out — our team will follow up within 2-3 business days.",
    receivedBut: "We received it, but...",
    somethingWrong: "Something went wrong",
    tryAgain: "Please try again, or email us directly at",
    close: "Close",
  });

  const isValid =
    contactName.trim() &&
    contactEmail.trim() &&
    natureOfPartnership.trim() &&
    (inquirerType === "individual" || organizationName.trim());

  const reset = () => {
    setContactName("");
    setOrganizationName("");
    setContactEmail("");
    setNatureOfPartnership("");
    setSubmitState("idle");
    setCrmWarning(false);
  };

  const handleClose = () => {
    onClose();
    if (submitState === "success") reset();
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquirerType,
          contactName,
          contactEmail,
          organizationName: inquirerType === "organization" ? organizationName : undefined,
          natureOfPartnership,
        }),
      });

      if (!res.ok) {
        setSubmitState("error");
        return;
      }

      const json = await res.json();
      if (json.crmWarning) {
        setCrmWarning(true);
        setCrmWarningMessage(json.message || "");
      }
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[32px] bg-gradient-to-br from-[#0a1628] via-[#071119] to-[#050b14] border border-white/[0.08] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-10 p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>

            {submitState !== "success" ? (
              <div className="p-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-sky-500 to-sky-600">
                    <Handshake className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{tx.title}</h2>
                </div>
                <p className="text-white/50 mb-8">{tx.subtitle}</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">{tx.typeLabel}</label>
                    <div className="flex gap-3">
                      {(["individual", "organization"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setInquirerType(t)}
                          className={`flex-1 h-12 rounded-xl border font-semibold transition-all ${
                            inquirerType === t
                              ? "border-sky-500 bg-sky-500/10 text-white"
                              : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:bg-white/[0.04]"
                          }`}
                        >
                          {t === "individual" ? tx.individual : tx.organization}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">{tx.nameLabel}</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                    />
                  </div>

                  {inquirerType === "organization" && (
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">{tx.orgLabel}</label>
                      <input
                        type="text"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">{tx.emailLabel}</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">{tx.natureLabel}</label>
                    <textarea
                      value={natureOfPartnership}
                      onChange={(e) => setNatureOfPartnership(e.target.value)}
                      placeholder={tx.naturePlaceholder}
                      rows={4}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {submitState === "error" && (
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200">
                        {tx.somethingWrong} — {tx.tryAgain}{" "}
                        <a href="mailto:tech@wilglobo.com" className="font-semibold underline">tech@wilglobo.com</a>
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={!isValid || submitState === "submitting"}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-sky-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitState === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> {tx.submitting}
                      </>
                    ) : (
                      <>
                        {tx.submit} <Mail className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center py-16">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${
                    crmWarning
                      ? "bg-gradient-to-br from-amber-500 to-amber-600"
                      : "bg-gradient-to-br from-sky-500 to-sky-600"
                  }`}
                >
                  {crmWarning ? <AlertTriangle className="w-12 h-12 text-white" /> : <Check className="w-12 h-12 text-white" />}
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{crmWarning ? tx.receivedBut : tx.sent}</h3>
                <p className="text-white/60 max-w-md mx-auto mb-8">
                  {crmWarning ? crmWarningMessage : tx.sentDesc}
                </p>
                <button
                  onClick={handleClose}
                  className="h-14 px-10 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold hover:shadow-lg hover:shadow-sky-500/30 transition-all"
                >
                  {tx.close}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
