"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { languageNames, categoryLabels } from "@/lib/data";
import { LANGUAGE_MAP } from "@/lib/languages";
import { Flag } from "@/components/flag";
import type { Language, ResourceCategory } from "@/lib/types";
import { Globe, Compass, ChevronRight, ChevronLeft, ArrowLeft, Home, Scale, Briefcase, GraduationCap, Heart, Brain, Users, Clock, AlertTriangle, Handshake, Store, Palette } from "lucide-react";

const languages: Language[] = ["en", "pa", "tl", "zh", "zh-CN", "es", "uk", "ru", "am", "ar", "so", "sw"];

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

const uiText: Record<string, Partial<Record<Language, string>> & { en: string }> = {
  selectLanguage: {
    en: "Select your language",
    pa: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    tl: "Piliin ang iyong wika",
    zh: "選擇您的語言",
    "zh-CN": "选择您的语言",
    es: "Selecciona tu idioma",
    uk: "Оберіть мову",
    ru: "Выберите язык",
    am: "ቋንቋዎን ይምረጡ",
    ar: "اختر لغتك",
    so: "Dooro luqadaada",
    sw: "Chagua lugha yako",
  },
  whatBringsYou: {
    en: "What brings you here today?",
    pa: "ਅੱਜ ਤੁਸੀਂ ਇੱਥੇ ਕਿਉਂ ਆਏ?",
    tl: "Ano ang dahilan ng pagpunta mo dito?",
    zh: "今天是什麼帶你來這裡？",
    "zh-CN": "今天是什么带你来这里？",
    es: "¿Qué te trae aquí hoy?",
    uk: "Що привело вас сюди сьогодні?",
    ru: "Что привело вас сюда сегодня?",
    am: "ዛሬ ምን አመጣዎ?",
    ar: "ما الذي يجلبك إلى هنا اليوم؟",
    so: "Maxaa kuu keenay maanta?",
    sw: "Nini kinakuleta hapa leo?",
  },
  selectUpTo3: {
    en: "Select up to 3 priorities",
    pa: "3 ਤੱਕ ਤਰਜੀਹਾਂ ਚੁਣੋ",
    tl: "Pumili ng hanggang 3 prioridad",
    zh: "最多選擇3個優先事項",
    "zh-CN": "最多选择3个优先事项",
    es: "Selecciona hasta 3 prioridades",
    uk: "Виберіть до 3 пріоритетів",
    ru: "Выберите до 3 приоритетов",
    am: "እስከ 3 ቅድሚያ የሚሰጧቸውን ይምረጡ",
    ar: "حدد ما يصل إلى 3 أولويات",
    so: "Dooro ilaa 3 mudnaanood",
    sw: "Chagua hadi vipaumbele 3",
  },
  continue: {
    en: "Continue",
    pa: "ਜਾਰੀ ਰੱਖੋ",
    tl: "Magpatuloy",
    zh: "繼續",
    "zh-CN": "继续",
    es: "Continuar",
    uk: "Продовжити",
    ru: "Продолжить",
    am: "ቀጥል",
    ar: "متابعة",
    so: "Sii wad",
    sw: "Endelea",
  },
  back: {
    en: "Back",
    pa: "ਵਾਪਸ",
    tl: "Bumalik",
    zh: "返回",
    "zh-CN": "返回",
    es: "Atrás",
    uk: "Назад",
    ru: "Назад",
    am: "ተመለስ",
    ar: "رجوع",
    so: "Dib u noqo",
    sw: "Rudi",
  },
  letsGo: {
    en: "Let's Go",
    pa: "ਚੱਲੀਏ",
    tl: "Tara Na",
    zh: "出發吧",
    "zh-CN": "开始吧",
    es: "Vamos",
    uk: "Вперед",
    ru: "Вперёд",
    am: "እንሂድ",
    ar: "هيا بنا",
    so: "Aan tagno",
    sw: "Twende",
  },
  skip: {
    en: "Skip for now",
    pa: "ਹੁਣ ਛੱਡੋ",
    tl: "Laktawan muna",
    zh: "暫時跳過",
    "zh-CN": "暂时跳过",
    es: "Saltar por ahora",
    uk: "Пропустити",
    ru: "Пропустить",
    am: "አሁን ዝለል",
    ar: "تخطي الآن",
    so: "Hadda bood",
    sw: "Ruka kwa sasa",
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

  const t = (key: string) => uiText[key]?.[activeLanguage] ?? uiText[key]?.en ?? key;

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
                <Compass className="h-5 w-5" />
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
      <div className="grid w-full grid-cols-3 gap-3 mt-8">
        {languages.map((lang) => {
          const meta = LANGUAGE_MAP.get(lang);
          return (
          <motion.button
            key={lang}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveLanguage(lang)}
            className={`rounded-2xl p-4 text-center transition-all flex flex-col items-center gap-1.5 ${
              activeLanguage === lang
                ? "bg-[#38BDF8] text-[#07111F] shadow-lg shadow-sky-500/30"
                : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
            }`}
          >
            <Flag countryCode={meta?.countryCode ?? "CA"} size={32} className="shadow-sm" />
            <span className="text-xs font-semibold leading-tight">{languageNames[lang]}</span>
          </motion.button>
          );
        })}
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
