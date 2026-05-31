"use client";

import { useAppStore } from "@/lib/store";
import { uiText } from "@/lib/data";
import { Home, MessageCircle, Heart, AlertTriangle } from "lucide-react";
import HomeTab from "./tabs/home-tab";
import AITab from "./tabs/ai-tab";
import ShortlistTab from "./tabs/shortlist-tab";
import EmergencyHub from "./emergency-hub";

export default function MainApp() {
  const { activeTab, setActiveTab, activeLanguage, showEmergency, setShowEmergency } = useAppStore();

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Header */}
      <header className="glass sticky top-0 z-40 flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          Calgary Connect
        </h1>
        <button
          onClick={() => setShowEmergency(true)}
          className="flex items-center gap-2 rounded-full bg-emergency px-3 py-1.5 text-sm font-medium text-emergency-foreground transition-all active:scale-95"
        >
          <AlertTriangle className="h-4 w-4" />
          {uiText.emergency[activeLanguage]}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        {activeTab === "home" && <HomeTab />}
        {activeTab === "ai" && <AITab />}
        {activeTab === "shortlist" && <ShortlistTab />}
      </div>

      {/* Bottom Navigation */}
      <nav className="glass fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-4 py-2 safe-area-pb">
        <NavButton
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
          icon={<Home className="h-5 w-5" />}
          label={uiText.home[activeLanguage]}
        />
        <NavButton
          active={activeTab === "ai"}
          onClick={() => setActiveTab("ai")}
          icon={<MessageCircle className="h-5 w-5" />}
          label={uiText.aiGuide[activeLanguage]}
        />
        <NavButton
          active={activeTab === "shortlist"}
          onClick={() => setActiveTab("shortlist")}
          icon={<Heart className="h-5 w-5" />}
          label={uiText.shortlist[activeLanguage]}
        />
      </nav>

      {/* Emergency Modal */}
      {showEmergency && <EmergencyHub onClose={() => setShowEmergency(false)} />}
    </div>
  );
}

function NavButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all active:scale-95 ${
        active
          ? "bg-primary/20 text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
