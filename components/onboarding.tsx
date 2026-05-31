"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { languageNames, categoryLabels, translations } from "@/lib/data";
import type { Language, UserRole, ResourceCategory } from "@/lib/types";
import { Globe, User, Target, Sparkles, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";

const languages: Language[] = ["en", "fr", "tl", "es", "ar", "zh"];
const roles: { id: UserRole; label: string; description: string }[] = [
  { id: "newcomer", label: "Newcomer", description: "New to Calgary or Canada" },
  { id: "senior", label: "Senior", description: "55 years or older" },
  { id: "family", label: "Family", description: "Parent or caregiver" },
  { id: "student", label: "Student", description: "Currently studying" },
  { id: "business", label: "Business Owner", description: "Running or starting a business" },
];
const priorities: ResourceCategory[] = [
  "housing", "jobs", "healthcare", "education", "legal", "food",
  "transit", "community", "volunteering", "mental-health",
];

const uiText: Record<string, Record<Language, string>> = {
  welcome: {
    en: "Welcome to Calgary",
    fr: "Bienvenue à Calgary",
    tl: "Maligayang Pagdating sa Calgary",
    es: "Bienvenido a Calgary",
    ar: "مرحباً بك في كالجاري",
    zh: "欢迎来到卡尔加里",
  },
  selectLanguage: {
    en: "Select your preferred language",
    fr: "Sélectionnez votre langue préférée",
    tl: "Piliin ang iyong gustong wika",
    es: "Seleccione su idioma preferido",
    ar: "اختر لغتك المفضلة",
    zh: "选择您的首选语言",
  },
  whoAreYou: {
    en: "Tell us about yourself",
    fr: "Parlez-nous de vous",
    tl: "Sabihin mo sa amin ang tungkol sa iyong sarili",
    es: "Cuéntanos sobre ti",
    ar: "أخبرنا عن نفسك",
    zh: "告诉我们关于您自己",
  },
  selectIdentity: {
    en: "This helps us personalize your experience",
    fr: "Cela nous aide à personnaliser votre expérience",
    tl: "Ito ay makakatulong sa amin na i-personalize ang iyong karanasan",
    es: "Esto nos ayuda a personalizar su experiencia",
    ar: "هذا يساعدنا على تخصيص تجربتك",
    zh: "这有助于我们个性化您的体验",
  },
  whatMatters: {
    en: "What matters most to you?",
    fr: "Qu'est-ce qui compte le plus pour vous?",
    tl: "Ano ang pinakamahalaga sa iyo?",
    es: "¿Qué es lo más importante para ti?",
    ar: "ما الأكثر أهمية بالنسبة لك؟",
    zh: "什么对您最重要？",
  },
  selectPriorities: {
    en: "Select your priorities to get relevant resources",
    fr: "Sélectionnez vos priorités pour obtenir des ressources pertinentes",
    tl: "Piliin ang iyong mga prioridad upang makakuha ng mga kaugnay na mapagkukunan",
    es: "Seleccione sus prioridades para obtener recursos relevantes",
    ar: "حدد أولوياتك للحصول على موارد ذات صلة",
    zh: "选择您的优先事项以获取相关资源",
  },
  ready: {
    en: "You're all set!",
    fr: "Vous êtes prêt!",
    tl: "Handa ka na!",
    es: "¡Estás listo!",
    ar: "أنت جاهز!",
    zh: "您已准备就绪！",
  },
  readyDesc: {
    en: "Your personalized Calgary experience awaits",
    fr: "Votre expérience personnalisée de Calgary vous attend",
    tl: "Naghihintay ang iyong personalized na karanasan sa Calgary",
    es: "Tu experiencia personalizada de Calgary te espera",
    ar: "تجربتك الشخصية في كالجاري في انتظارك",
    zh: "您的个性化卡尔加里体验正在等待",
  },
  next: {
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
  getStarted: {
    en: "Start Exploring",
    fr: "Commencer à Explorer",
    tl: "Simulan ang Pag-explore",
    es: "Comenzar a Explorar",
    ar: "ابدأ الاستكشاف",
    zh: "开始探索",
  },
};

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
    setCurrentPage,
  } = useAppStore();

  const t = (key: string) => uiText[key]?.[activeLanguage] || uiText[key]?.en || key;

  const handleNext = () => {
    if (step < 3) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero p-4 overflow-auto">
      {/* Back to landing */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setCurrentPage("landing")}
        className="fixed top-6 left-6 flex items-center gap-2 text-[var(--foreground-muted)] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-lg rounded-3xl p-8 shadow-2xl"
      >
        {/* Progress indicator */}
        <div className="mb-10 flex justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                width: i === step ? 32 : 8,
                backgroundColor: i <= step ? "#0ea5e9" : "rgba(255,255,255,0.1)",
              }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-[380px]">
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
              <StepIdentity
                key="identity"
                activeLanguage={activeLanguage}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                t={t}
              />
            )}
            {step === 2 && (
              <StepPriorities
                key="priorities"
                activeLanguage={activeLanguage}
                selectedPriorities={selectedPriorities}
                togglePriority={togglePriority}
                t={t}
              />
            )}
            {step === 3 && (
              <StepComplete
                key="complete"
                onComplete={handleComplete}
                t={t}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {step < 3 && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 rounded-xl px-5 py-3 text-[var(--foreground-muted)] transition-all hover:text-white hover:bg-[var(--surface)]"
            >
              <ChevronLeft className="h-4 w-4" />
              {t("back")}
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={step === 1 && !selectedRole}
              className="btn-primary flex items-center gap-2 rounded-xl px-6 py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("next")}
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        )}
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#0ea5e9]/5">
        <Globe className="h-10 w-10 text-[#0ea5e9]" />
      </div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight">
        {t("welcome")}
      </h1>
      <p className="mb-8 text-lg text-[var(--foreground-muted)]">
        {t("selectLanguage")}
      </p>
      <div className="grid w-full grid-cols-2 gap-3">
        {languages.map((lang) => (
          <motion.button
            key={lang}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveLanguage(lang)}
            className={`rounded-xl p-4 text-center transition-all ${
              activeLanguage === lang
                ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/25"
                : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
            }`}
          >
            <span className="text-lg font-medium">{languageNames[lang]}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function StepIdentity({
  activeLanguage,
  selectedRole,
  setSelectedRole,
  t,
}: {
  activeLanguage: Language;
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
  t: (key: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/5">
        <User className="h-10 w-10 text-[#f59e0b]" />
      </div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight">
        {t("whoAreYou")}
      </h1>
      <p className="mb-8 text-lg text-[var(--foreground-muted)]">
        {t("selectIdentity")}
      </p>
      <div className="w-full space-y-3">
        {roles.map((role) => (
          <motion.button
            key={role.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedRole(role.id)}
            className={`w-full rounded-xl p-4 text-left transition-all ${
              selectedRole === role.id
                ? "bg-[#f59e0b] text-white shadow-lg shadow-[#f59e0b]/25"
                : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
            }`}
          >
            <div className="font-medium text-lg">{role.label}</div>
            <div className={`text-sm ${selectedRole === role.id ? "text-white/80" : "text-[var(--foreground-muted)]"}`}>
              {role.description}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function StepPriorities({
  activeLanguage,
  selectedPriorities,
  togglePriority,
  t,
}: {
  activeLanguage: Language;
  selectedPriorities: ResourceCategory[];
  togglePriority: (priority: ResourceCategory) => void;
  t: (key: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#0ea5e9]/5">
        <Target className="h-10 w-10 text-[#0ea5e9]" />
      </div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight">
        {t("whatMatters")}
      </h1>
      <p className="mb-8 text-lg text-[var(--foreground-muted)]">
        {t("selectPriorities")}
      </p>
      <div className="flex w-full flex-wrap justify-center gap-2">
        {priorities.map((priority) => (
          <motion.button
            key={priority}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => togglePriority(priority)}
            className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
              selectedPriorities.includes(priority)
                ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/25"
                : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)]"
            }`}
          >
            {categoryLabels[priority]?.[activeLanguage] || priority}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function StepComplete({
  onComplete,
  t,
}: {
  onComplete: () => void;
  t: (key: string) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] shadow-xl shadow-[#0ea5e9]/30"
      >
        <Sparkles className="h-12 w-12 text-white" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-3 text-3xl font-bold tracking-tight"
      >
        {t("ready")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10 text-lg text-[var(--foreground-muted)]"
      >
        {t("readyDesc")}
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="w-full btn-primary rounded-xl py-4 text-lg font-semibold"
      >
        {t("getStarted")}
      </motion.button>
    </motion.div>
  );
}
