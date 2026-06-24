"use client";

import { useAppStore } from "@/lib/store";
import { emergencyContacts, uiText } from "@/lib/data";
import { X, Phone, AlertTriangle, Snowflake } from "lucide-react";

interface EmergencyHubProps {
  onClose: () => void;
}

export default function EmergencyHub({ onClose }: EmergencyHubProps) {
  const { activeLanguage } = useAppStore();

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
            <h2 className="text-xl font-bold text-white">
              {uiText.emergencyTitle?.[activeLanguage] || "Emergency Hub"}
            </h2>
            <p className="text-sm text-white/70">
              {uiText.emergencySubtitle?.[activeLanguage] || "Critical contacts & winter safety"}
            </p>
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
                <p className="text-sm text-white/70">
                  {contact.description}
                </p>
              </div>
              <span className="text-lg font-bold text-white">{contact.number}</span>
            </a>
          ))}
        </div>

        {/* Winter Safety Tips */}
        <div className="mt-6 rounded-xl bg-white/10 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-sky-300" />
            <h3 className="font-semibold text-white">
              {uiText.winterSafety?.[activeLanguage] || "Winter Safety Tips"}
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-white/80">
            <li key="tip-1" className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-300" />
              {uiText.winterTip1?.[activeLanguage] || "Layer clothing and cover extremities in cold weather"}
            </li>
            <li key="tip-2" className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-300" />
              {uiText.winterTip2?.[activeLanguage] || "Check weather forecasts before traveling"}
            </li>
            <li key="tip-3" className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-300" />
              {uiText.winterTip3?.[activeLanguage] || "Keep emergency supplies in your vehicle"}
            </li>
            <li key="tip-4" className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-300" />
              Know the signs of frostbite and hypothermia
            </li>
          </ul>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-white/20 py-3 font-semibold text-white transition-all active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  );
}
