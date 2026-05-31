"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { languageNames, categoryLabels } from "@/lib/data";
import type { Language, ResourceCategory } from "@/lib/types";
import { Globe, Sparkles, ChevronRight, ChevronLeft, ArrowLeft, Home, Scale, Briefcase, GraduationCap, Heart, Brain, Users, Clock, AlertTriangle, Handshake, Store, Palette } from "lucide-react";

const languages: Language[] = ["en", "fr", "tl", "es", "ar", "zh"];

// Quick help categories - allow up to 3 taps
const helpCategories: { id: ResourceCategory; icon: typeof Home; label: string; description: string }[] = [
  { id: "housing", icon: Home, label: "Housing & Rent", description: "Find affordable housing" },
  { id: "legal", icon: Scale, label: "Tenant Rights", description: "Know your rights" },
  { id: "jobs", icon: Briefcase, label: "Jobs & Income", description: "Employment support" },
  { id: "newcomer", icon: GraduationCap, label: "New to Calgary", description: "Settlement services" },
  { id: "healthcare", icon: Heart, label: "Healthcare", description: "Medical services" },
  { id: "mental-health", icon: Brain, label: "Mental Wellness", description: "Counseling & support" },
  { id: "family", icon: Users, label: "Family & Childcare", description: "Parenting support" },
  { id: "senior", icon: Clock, label: "Senior Services", description: "Programs for 55+" },
  { id: "emergency", icon: AlertTriangle, label: "Emergency Help", description: "Urgent assistance" },
  { id: "community", icon: Handshake, label: "Community", description: "Events & volunteering" },
  { id: "business", icon: Store, label: "Business", description: "Entrepreneurship" },
  { id: "arts", icon: Palette, label: "Arts & Creative", description: "Cultural programs" },
];

const uiText: Record<string, Record<Language, string>> = {
  selectLanguage: {
    en: "Select your language",
    fr: "Choisissez votre langue",
    tl: "Piliin ang iyong wika",
    es: "Selecciona tu idioma",
    ar: "اختر لغتك",
    zh: "选择语言",
  },
  whatBringsYou: {
    en: "What brings you here today?",
    fr: "Qu'est-ce qui vous amène ici?",
    tl: "Ano ang dahilan ng pagpunta mo dito?",
    es: "¿Qué te trae aquí hoy?",
    ar: "ما الذي يجلبك إلى هنا اليوم؟",
    zh: "今天是什么带你来这里？",
  },
  selectUpTo3: {
    en: "Select up to 3 priorities",
    fr: "Sélectionnez jusqu'à 3 priorités",
    tl: "Pumili ng hanggang 3 prioridad",
    es: "Selecciona hasta 3 prioridades",
    ar: "حدد ما يصل إلى 3 أولويات",
    zh: "最多选择3个优先事项",
  },
  continue: {
    en: "Continue",
    fr: "Continuer",
    tl: "Magpatuloy",
    es: "Continuar",
    ar: "متابعة",
    zh: "继续",
  },
  back: {
    en: "Back",
    fr: "Retour",
    tl: "Bumalik",
    es: "Atrás",
    ar: "رجوع",
    zh: "返回",
  },
  letsGo: {
    en: "Let's Go",
    fr: "Allons-y",
    tl: "Tara Na",
    es: "Vamos",
    ar: "هيا بنا",
    zh: "开始吧",
  },
  skip: {
    en: "Skip for now",
    fr: "Passer pour l'instant",
    tl: "Laktawan muna",
    es: "Saltar por ahora",
    ar: "تخطي الآن",
    zh: "暂时跳过",
  },
};

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const {
    activeLanguage,
    setActiveLanguage,
    priorities: selectedPriorities,
    togglePriority,
    setHasOnboarded,
    setCurrentPage,
  } = useAppStore();

  const t = (key: string) => uiText[key]?.[activeLanguage] || uiText[key]?.en || key;

  const handleNext = () => {
    if (step < 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      setCurrentPage("landing");
    }
  };

  const handleComplete = () => {
    setHasOnboarded(true);
    setCurrentPage("main");
  };

  const handlePriorityToggle = (priority: ResourceCategory) => {
    if (selectedPriorities.includes(priority)) {
      togglePriority(priority);
    } else if (selectedPriorities.length < 3) {
      togglePriority(priority);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero p-4 overflow-auto">
      {/* Back to landing */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setCurrentPage("landing")}
        className="fixed top-6 left-6 flex items-center gap-2 text-[var(--foreground-muted)] hover:text-white transition-colors z-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-button">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-2xl rounded-3xl p-8 md:p-10 shadow-2xl"
      >
        {/* Progress indicator - only 2 steps */}
        <div className="mb-10 flex justify-center gap-3">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                width: i === step ? 48 : 12,
                backgroundColor: i <= step ? "#38BDF8" : "rgba(255,255,255,0.1)",
              }}
              className="h-2.5 rounded-full transition-all duration-300"
            />
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepLanguage
                key="language"
                activeLanguage={activeLanguage}
                setActiveLanguage={setActiveLanguage}
                t={t}
              />
            )}
            {step === 1 && (
              <StepPriorities
                key="priorities"
                activeLanguage={activeLanguage}
                selectedPriorities={selectedPriorities}
                handlePriorityToggle={handlePriorityToggle}
                t={t}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-[var(--foreground-muted)] transition-all hover:text-white hover:bg-[var(--surface)] text-button"
          >
            <ChevronLeft className="h-5 w-5" />
            {t("back")}
          </button>
          
          {step === 0 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="btn-primary flex items-center gap-2 rounded-xl px-8 py-3.5"
            >
              {t("continue")}
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleComplete}
                className="text-[var(--foreground-muted)] hover:text-white transition-colors text-description"
              >
                {t("skip")}
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleComplete}
                className="btn-primary flex items-center gap-2 rounded-xl px-8 py-3.5"
              >
                <Sparkles className="h-5 w-5" />
                {t("letsGo")}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function StepLanguage({
  activeLanguage,
  setActiveLanguage,
  t,
}: {
  activeLanguage: Language;
  setActiveLanguage: (lang: Language) => void;
  t: (key: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#38BDF8]/20 to-[#38BDF8]/5 shadow-lg shadow-sky-500/10">
        <Globe className="h-10 w-10 text-[#38BDF8]" />
      </div>
      <h1 className="mb-4 text-display">
        {t("selectLanguage")}
      </h1>
      <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {languages.map((lang) => (
          <motion.button
            key={lang}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveLanguage(lang)}
            className={`rounded-2xl p-5 text-center transition-all ${
              activeLanguage === lang
                ? "bg-[#38BDF8] text-[#07111F] shadow-lg shadow-sky-500/30"
                : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
            }`}
          >
            <span className="text-title">{languageNames[lang]}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function StepPriorities({
  activeLanguage,
  selectedPriorities,
  handlePriorityToggle,
  t,
}: {
  activeLanguage: Language;
  selectedPriorities: ResourceCategory[];
  handlePriorityToggle: (priority: ResourceCategory) => void;
  t: (key: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="flex flex-col items-center text-center"
    >
      <h1 className="mb-3 text-display">
        {t("whatBringsYou")}
      </h1>
      <p className="mb-8 text-body text-[var(--foreground-muted)]">
        {t("selectUpTo3")} ({selectedPriorities.length}/3)
      </p>
      <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-3">
        {helpCategories.map((category) => {
          const isSelected = selectedPriorities.includes(category.id);
          const isDisabled = !isSelected && selectedPriorities.length >= 3;
          
          return (
            <motion.button
              key={category.id}
              whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              onClick={() => handlePriorityToggle(category.id)}
              disabled={isDisabled}
              className={`rounded-2xl p-4 text-left transition-all ${
                isSelected
                  ? "bg-[#38BDF8] text-[#07111F] shadow-lg shadow-sky-500/30"
                  : isDisabled
                  ? "bg-[var(--surface)] border border-[var(--border)] opacity-40 cursor-not-allowed"
                  : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
              }`}
            >
              <category.icon className={`w-6 h-6 mb-2 ${isSelected ? "text-[#07111F]" : "text-[var(--foreground-muted)]"}`} />
              <div className={`font-semibold text-base ${isSelected ? "text-[#07111F]" : ""}`}>
                {categoryLabels[category.id]?.[activeLanguage] || category.label}
              </div>
              <div className={`text-sm ${isSelected ? "text-[#07111F]/70" : "text-[var(--foreground-muted)]"}`}>
                {category.description}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
