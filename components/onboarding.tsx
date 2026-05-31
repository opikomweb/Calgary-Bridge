"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { languageNames, roleLabels, priorityLabels, uiText } from "@/lib/data";
import type { Language, UserRole, Priority } from "@/lib/types";
import { Globe, User, Target, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";

const languages: Language[] = ["en", "fr", "tl", "es"];
const roles: UserRole[] = ["newcomer", "senior", "business", "ngo", "creator"];
const priorities: Priority[] = ["housing", "jobs", "volunteering", "healthcare", "education", "legal", "community"];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const {
    activeLanguage,
    setActiveLanguage,
    selectedRole,
    setSelectedRole,
    priorities: selectedPriorities,
    togglePriority,
    setHasOnboarded,
  } = useAppStore();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    setHasOnboarded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-radial p-4">
      <div className="glass w-full max-w-md rounded-2xl p-6 shadow-2xl">
        {/* Progress indicator */}
        <div className="mb-8 flex justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-[320px]">
          {step === 0 && (
            <StepLanguage
              activeLanguage={activeLanguage}
              setActiveLanguage={setActiveLanguage}
            />
          )}
          {step === 1 && (
            <StepIdentity
              activeLanguage={activeLanguage}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          )}
          {step === 2 && (
            <StepPriorities
              activeLanguage={activeLanguage}
              selectedPriorities={selectedPriorities}
              togglePriority={togglePriority}
            />
          )}
          {step === 3 && (
            <StepComplete
              activeLanguage={activeLanguage}
              onComplete={handleComplete}
            />
          )}
        </div>

        {/* Navigation */}
        {step < 3 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-1 rounded-lg px-4 py-2 text-muted-foreground transition-all hover:text-foreground disabled:opacity-0"
            >
              <ChevronLeft className="h-4 w-4" />
              {uiText.back[activeLanguage]}
            </button>
            <button
              onClick={handleNext}
              disabled={step === 1 && !selectedRole}
              className="flex items-center gap-1 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-all active:scale-95 disabled:opacity-50"
            >
              {uiText.next[activeLanguage]}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepLanguage({
  activeLanguage,
  setActiveLanguage,
}: {
  activeLanguage: Language;
  setActiveLanguage: (lang: Language) => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
        <Globe className="h-8 w-8 text-primary" />
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        {uiText.welcome[activeLanguage]}
      </h1>
      <p className="mb-6 text-muted-foreground">
        {uiText.selectLanguage[activeLanguage]}
      </p>
      <div className="grid w-full grid-cols-2 gap-3">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLanguage(lang)}
            className={`rounded-xl p-4 text-center transition-all active:scale-95 ${
              activeLanguage === lang
                ? "bg-primary text-primary-foreground"
                : "glass-light hover:bg-white/10"
            }`}
          >
            <span className="text-lg font-medium">{languageNames[lang]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepIdentity({
  activeLanguage,
  selectedRole,
  setSelectedRole,
}: {
  activeLanguage: Language;
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
        <User className="h-8 w-8 text-accent" />
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        {uiText.whoAreYou[activeLanguage]}
      </h1>
      <p className="mb-6 text-muted-foreground">
        {uiText.selectIdentity[activeLanguage]}
      </p>
      <div className="flex w-full flex-wrap justify-center gap-2">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              selectedRole === role
                ? "bg-accent text-accent-foreground"
                : "glass-light hover:bg-white/10"
            }`}
          >
            {roleLabels[role][activeLanguage]}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepPriorities({
  activeLanguage,
  selectedPriorities,
  togglePriority,
}: {
  activeLanguage: Language;
  selectedPriorities: Priority[];
  togglePriority: (priority: Priority) => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
        <Target className="h-8 w-8 text-primary" />
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        {uiText.whatMatters[activeLanguage]}
      </h1>
      <p className="mb-6 text-muted-foreground">
        {uiText.selectPriorities[activeLanguage]}
      </p>
      <div className="flex w-full flex-wrap justify-center gap-2">
        {priorities.map((priority) => (
          <button
            key={priority}
            onClick={() => togglePriority(priority)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              selectedPriorities.includes(priority)
                ? "bg-primary text-primary-foreground"
                : "glass-light hover:bg-white/10"
            }`}
          >
            {priorityLabels[priority][activeLanguage]}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepComplete({
  activeLanguage,
  onComplete,
}: {
  activeLanguage: Language;
  onComplete: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
        <Sparkles className="h-10 w-10 text-white" />
      </div>
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        {uiText.ready[activeLanguage]}
      </h1>
      <p className="mb-8 text-muted-foreground">
        Your personalized Calgary experience awaits
      </p>
      <button
        onClick={onComplete}
        className="w-full rounded-xl bg-gradient-to-r from-primary to-accent py-4 text-lg font-semibold text-white shadow-lg transition-all active:scale-95"
      >
        {uiText.getStarted[activeLanguage]}
      </button>
    </div>
  );
}
