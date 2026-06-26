"use client";

import { emergencyContacts } from "@/lib/data";
import { useTranslations, registerStrings } from "@/lib/translation-context";
import { X, Phone, AlertTriangle, Snowflake } from "lucide-react";

registerStrings(
  "Emergency Hub",
  "Critical contacts & winter safety",
  "Winter Safety Tips",
  "Layer clothing and cover extremities in cold weather",
  "Check weather forecasts before traveling",
  "Keep emergency supplies in your vehicle",
  "Know the signs of frostbite and hypothermia",
  "Close",
);

interface EmergencyHubProps {
  onClose: () => void;
}

export default function EmergencyHub({ onClose }: EmergencyHubProps) {
  const tx = useTranslations({
    title: "Emergency Hub",
    subtitle: "Critical contacts & winter safety",
    winterSafety: "Winter Safety Tips",
    tip1: "Layer clothing and cover extremities in cold weather",
    tip2: "Check weather forecasts before traveling",
    tip3: "Keep emergency supplies in your vehicle",
    tip4: "Know the signs of frostbite and hypothermia",
    close: "Close",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-emergency-gradient p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-all active:scale-95"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{tx.title}</h2>
            <p className="text-sm text-white/70">{tx.subtitle}</p>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.name}
              href={`tel:${contact.number}`}
              className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-all active:scale-95"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{contact.name}</h3>
                <p className="text-sm text-white/70">{contact.description}</p>
              </div>
              <span className="text-lg font-bold text-white">{contact.number}</span>
            </a>
          ))}
        </div>

        {/* Winter Safety Tips */}
        <div className="mt-6 rounded-xl bg-white/10 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-sky-300" />
            <h3 className="font-semibold text-white">{tx.winterSafety}</h3>
          </div>
          <ul className="space-y-2 text-sm text-white/80">
            {[tx.tip1, tx.tip2, tx.tip3, tx.tip4].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-300" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-white/20 py-3 font-semibold text-white transition-all active:scale-95"
        >
          {tx.close}
        </button>
      </div>
    </div>
  );
}
