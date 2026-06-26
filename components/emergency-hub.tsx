"use client";

import { emergencyContacts } from "@/lib/data";
import { useTranslations, useT, registerStrings } from "@/lib/translation-context";
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
  // Emergency contact names
  "Emergency Services",
  "Distress Centre",
  "AHS Mental Health Help Line",
  "Health Link",
  "211 Alberta",
  "HELP Team (formerly DOAP)",
  // Emergency contact descriptions
  "Police, Fire, Ambulance - Life-threatening emergencies only",
  "24/7 Crisis Support, Suicide Prevention, Counselling",
  "24/7 Mental Health Crisis Support",
  "Health Advice, Symptom Assessment, Service Navigation",
  "Community & Social Services Information",
  "Help for vulnerable people on the street",
);

interface EmergencyHubProps {
  onClose: () => void;
}

// Separate component so useT is called in React context with the correct name/description per card
function EmergencyContactCard({ contact }: { contact: { name: string; number: string; description: string } }) {
  const tName = useT(contact.name);
  const tDescription = useT(contact.description);
  return (
    <a
      href={`tel:${contact.number}`}
      className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-all active:scale-95"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
        <Phone className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white">{tName}</h3>
        <p className="text-sm text-white/70">{tDescription}</p>
      </div>
      <span className="text-lg font-bold text-white">{contact.number}</span>
    </a>
  );
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
            <EmergencyContactCard key={contact.name} contact={contact} />
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
