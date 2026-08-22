"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HeartHandshake, Check, AlertTriangle, Loader2 } from "lucide-react";
import { registerStrings, useTranslations } from "@/lib/translation-context";

registerStrings(
  "Volunteer With Us",
  "Help us make Calgary Konnect even better — pick where you'd like to get involved.",
  "Your Name *", "Email *", "Area of Interest *", "Select an area", "Availability",
  "Weekday mornings, weekend afternoons, a few hours a month...",
  "Resource Verification", "Translation", "Community Outreach", "Other",
  "Submit Application", "Submitting...",
  "Thanks for Volunteering!", "We'll be in touch within 2-3 business days to get you started.",
  "We received it, but...", "Something went wrong",
  "Please try again, or email us directly at", "Close",
);

interface VolunteerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VolunteerForm({ isOpen, onClose }: VolunteerFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [availability, setAvailability] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [crmWarning, setCrmWarning] = useState(false);
  const [crmWarningMessage, setCrmWarningMessage] = useState("");

  const tx = useTranslations({
    title: "Volunteer With Us",
    subtitle: "Help us make Calgary Konnect even better — pick where you'd like to get involved.",
    nameLabel: "Your Name *",
    emailLabel: "Email *",
    areaLabel: "Area of Interest *",
    selectArea: "Select an area",
    availabilityLabel: "Availability",
    availabilityPlaceholder: "Weekday mornings, weekend afternoons, a few hours a month...",
    a1: "Resource Verification",
    a2: "Translation",
    a3: "Community Outreach",
    a4: "Other",
    submit: "Submit Application",
    submitting: "Submitting...",
    sent: "Thanks for Volunteering!",
    sentDesc: "We'll be in touch within 2-3 business days to get you started.",
    receivedBut: "We received it, but...",
    somethingWrong: "Something went wrong",
    tryAgain: "Please try again, or email us directly at",
    close: "Close",
  });

  const areas = [tx.a1, tx.a2, tx.a3, tx.a4];
  const isValid = name.trim() && email.trim() && areaOfInterest.trim();

  const reset = () => {
    setName("");
    setEmail("");
    setAreaOfInterest("");
    setAvailability("");
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
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, areaOfInterest, availability: availability || undefined }),
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
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#E1251B] to-[#b91c1c]">
                    <HeartHandshake className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{tx.title}</h2>
                </div>
                <p className="text-white/50 mb-8">{tx.subtitle}</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">{tx.nameLabel}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">{tx.emailLabel}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">{tx.areaLabel}</label>
                    <select
                      value={areaOfInterest}
                      onChange={(e) => setAreaOfInterest(e.target.value)}
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white focus:border-sky-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0a1628]">{tx.selectArea}</option>
                      {areas.map((a) => (
                        <option key={a} value={a} className="bg-[#0a1628]">{a}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">{tx.availabilityLabel}</label>
                    <input
                      type="text"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      placeholder={tx.availabilityPlaceholder}
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
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
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#E1251B] to-[#b91c1c] text-white font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#E1251B]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitState === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> {tx.submitting}
                      </>
                    ) : (
                      tx.submit
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
                      : "bg-gradient-to-br from-[#E1251B] to-[#b91c1c]"
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
                  className="h-14 px-10 rounded-2xl bg-gradient-to-r from-[#E1251B] to-[#b91c1c] text-white font-bold hover:shadow-lg hover:shadow-[#E1251B]/30 transition-all"
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
