"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Building2, 
  Star, 
  Check,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  DollarSign,
  Users,
  FileText,
  Crown,
  Zap,
  Shield
} from "lucide-react";
import { useTranslations, registerStrings } from "@/lib/translation-context";

// Register business submission strings for translation
registerStrings(
  // Package names/prices
  "Basic Listing", "Free", "Forever",
  "Enhanced", "$49", "/month",
  "Featured", "$149", "/month",
  // Package features
  "Standard directory listing", "Basic business information",
  "Contact details displayed", "Community reviews",
  "Everything in Basic", "Priority search placement",
  "Detailed service descriptions", "Photo gallery (up to 10)",
  "Direct booking link", "Monthly analytics report",
  "Everything in Enhanced", "Featured badge on listing",
  "Homepage spotlight rotation", "AI recommendation priority",
  "Dedicated account manager", "Social media promotion",
  "Press release inclusion",
  // Categories
  "Housing & Rent", "Jobs & Career", "Healthcare", "Family & Childcare",
  "Education", "Legal Services", "Food & Meals", "Transportation",
  "Mental Health", "Senior Services", "Newcomer Services",
  "Small Business", "Community", "Other",
  // Modal header
  "List Your Business", "Help Calgarians discover your services",
  "Get Featured on Calgary Konnect",
  "Reach thousands of Calgarians looking for services like yours",
  // Step labels
  "Business Info", "Details", "Package",
  // Step 1 field labels
  "Business Name *", "Enter your business name",
  "Category *", "Select a category",
  "Description *", "Describe your services and what makes you unique...",
  "Continue",
  // Step 2 field labels
  "Phone Number", "Email", "Website", "Address", "Hours", "Cost",
  "Select pricing", "Low Cost", "Sliding Scale", "Paid",
  "Back",
  // Step 3
  "Most Popular", "Submit Listing",
  // Step 4
  "Listing Submitted!", "Thank you for submitting your listing.",
  "Our team will review your submission within 2-3 business days.",
  "Close",
);

interface BusinessSubmissionProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "submit" | "featured";
}

export default function BusinessSubmission({ isOpen, onClose, mode }: BusinessSubmissionProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    hours: "",
    cost: "",
    services: "",
    contactName: "",
    contactEmail: "",
    package: "basic",
  });
  
  const tx = useTranslations({
    basicName: "Basic Listing",
    basicPrice: "Free",
    basicPriceNote: "Forever",
    enhancedName: "Enhanced",
    enhancedPrice: "$49",
    enhancedPriceNote: "/month",
    featuredName: "Featured",
    featuredPrice: "$149",
    featuredPriceNote: "/month",
    // Package features
    f1: "Standard directory listing",
    f2: "Basic business information",
    f3: "Contact details displayed",
    f4: "Community reviews",
    f5: "Everything in Basic",
    f6: "Priority search placement",
    f7: "Detailed service descriptions",
    f8: "Photo gallery (up to 10)",
    f9: "Direct booking link",
    f10: "Monthly analytics report",
    f11: "Everything in Enhanced",
    f12: "Featured badge on listing",
    f13: "Homepage spotlight rotation",
    f14: "AI recommendation priority",
    f15: "Dedicated account manager",
    f16: "Social media promotion",
    f17: "Press release inclusion",
    // Header
    listYourBusiness: "List Your Business",
    listSubtitle: "Help Calgarians discover your services",
    getFeatured: "Get Featured on Calgary Konnect",
    featuredSubtitle: "Reach thousands of Calgarians looking for services like yours",
    // Steps
    stepBizInfo: "Business Info",
    stepDetails: "Details",
    stepPackage: "Package",
    // Step 1
    businessName: "Business Name *",
    bizNamePlaceholder: "Enter your business name",
    categoryLabel: "Category *",
    selectCategory: "Select a category",
    descriptionLabel: "Description *",
    descPlaceholder: "Describe your services and what makes you unique...",
    continueBtn: "Continue",
    // Step 2
    phoneLabel: "Phone Number",
    emailLabel: "Email",
    websiteLabel: "Website",
    addressLabel: "Address",
    hoursLabel: "Hours",
    costLabel: "Cost",
    selectPricing: "Select pricing",
    lowCost: "Low Cost",
    slidingScale: "Sliding Scale",
    paid: "Paid",
    backBtn: "Back",
    // Step 3
    mostPopular: "Most Popular",
    submitListing: "Submit Listing",
    // Step 4
    submitted: "Listing Submitted!",
    submittedDesc: "Thank you for submitting your listing.",
    submittedNote: "Our team will review your submission within 2-3 business days.",
    close: "Close",
  });

  const packages = [
    {
      id: "basic",
      name: tx.basicName,
      price: tx.basicPrice,
      priceNote: tx.basicPriceNote,
      features: [tx.f1, tx.f2, tx.f3, tx.f4],
      color: "from-slate-600 to-slate-700",
      accent: "text-slate-300",
      popular: false,
    },
    {
      id: "enhanced",
      name: tx.enhancedName,
      price: tx.enhancedPrice,
      priceNote: tx.enhancedPriceNote,
      features: [tx.f5, tx.f6, tx.f7, tx.f8, tx.f9, tx.f10],
      color: "from-sky-600 to-sky-700",
      accent: "text-sky-300",
      popular: true,
    },
    {
      id: "featured",
      name: tx.featuredName,
      price: tx.featuredPrice,
      priceNote: tx.featuredPriceNote,
      features: [tx.f11, tx.f12, tx.f13, tx.f14, tx.f15, tx.f16, tx.f17],
      color: "from-[#E1251B] to-[#b91c1c]",
      accent: "text-[#E1251B]",
      popular: false,
    },
  ];

  // Keep English as option values (for form data), display translated labels in a parallel array
  const categoryValues = [
    "Housing & Rent", "Jobs & Career", "Healthcare", "Family & Childcare",
    "Education", "Legal Services", "Food & Meals", "Transportation",
    "Mental Health", "Senior Services", "Newcomer Services",
    "Small Business", "Community", "Other",
  ];
  const categoryTx = useTranslations({
    c1: "Housing & Rent", c2: "Jobs & Career", c3: "Healthcare", c4: "Family & Childcare",
    c5: "Education", c6: "Legal Services", c7: "Food & Meals", c8: "Transportation",
    c9: "Mental Health", c10: "Senior Services", c11: "Newcomer Services",
    c12: "Small Business", c13: "Community", c14: "Other",
  });
  const categoryLabels = [
    categoryTx.c1, categoryTx.c2, categoryTx.c3, categoryTx.c4,
    categoryTx.c5, categoryTx.c6, categoryTx.c7, categoryTx.c8,
    categoryTx.c9, categoryTx.c10, categoryTx.c11, categoryTx.c12,
    categoryTx.c13, categoryTx.c14,
  ];

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    setStep(4); // Success state
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-gradient-to-br from-[#0a1628] via-[#071119] to-[#050b14] border border-white/[0.08] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>

          {/* Header */}
          <div className="p-10 pb-0">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${mode === "featured" ? "bg-gradient-to-br from-[#E1251B] to-[#b91c1c]" : "bg-gradient-to-br from-sky-500 to-sky-600"}`}>
                {mode === "featured" ? <Crown className="w-7 h-7 text-white" /> : <Building2 className="w-7 h-7 text-white" />}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {mode === "featured" ? tx.getFeatured : tx.listYourBusiness}
                </h2>
                <p className="text-white/50 mt-1">
                  {mode === "featured" ? tx.featuredSubtitle : tx.listSubtitle}
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            {step < 4 && (
              <div className="flex items-center gap-4 mt-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        step >= s
                          ? "bg-gradient-to-br from-sky-500 to-sky-600 text-white"
                          : "bg-white/[0.06] text-white/40"
                      }`}
                    >
                      {step > s ? <Check className="w-5 h-5" /> : s}
                    </div>
                    <span className={`text-sm font-medium ${step >= s ? "text-white" : "text-white/40"}`}>
                      {s === 1 ? tx.stepBizInfo : s === 2 ? tx.stepDetails : tx.stepPackage}
                    </span>
                    {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-sky-500" : "bg-white/10"}`} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-10">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">{tx.businessName}</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder={tx.bizNamePlaceholder}
                    className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">{tx.categoryLabel}</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white focus:border-sky-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0a1628]">{tx.selectCategory}</option>
                    {categoryValues.map((val, i) => (
                      <option key={val} value={val} className="bg-[#0a1628]">{categoryLabels[i]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">{tx.descriptionLabel}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={tx.descPlaceholder}
                    rows={4}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.businessName || !formData.category || !formData.description}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-sky-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {tx.continueBtn} <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      <Phone className="w-4 h-4 inline mr-2" />
                      {tx.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(403) 555-0123"
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      <Mail className="w-4 h-4 inline mr-2" />
                      {tx.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@yourbusiness.com"
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    <Globe className="w-4 h-4 inline mr-2" />
                    {tx.websiteLabel}
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourbusiness.com"
                    className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    {tx.addressLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main Street, Calgary, AB"
                    className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      <Clock className="w-4 h-4 inline mr-2" />
                      {tx.hoursLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      placeholder="Mon-Fri 9am-5pm"
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white placeholder:text-white/30 focus:border-sky-500/50 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      {tx.costLabel}
                    </label>
                    <select
                      value={formData.cost}
                      onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                      className="w-full h-14 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 text-white focus:border-sky-500/50 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0a1628]">{tx.selectPricing}</option>
                      <option value="free" className="bg-[#0a1628]">{tx.basicPrice}</option>
                      <option value="low-cost" className="bg-[#0a1628]">{tx.lowCost}</option>
                      <option value="sliding-scale" className="bg-[#0a1628]">{tx.slidingScale}</option>
                      <option value="paid" className="bg-[#0a1628]">{tx.paid}</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-white font-bold hover:bg-white/[0.1] transition-all"
                  >
                    {tx.backBtn}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-sky-500/30 transition-all"
                  >
                    {tx.continueBtn} <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Package Selection */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setFormData({ ...formData, package: pkg.id })}
                      className={`relative text-left p-6 rounded-[24px] border transition-all ${
                        formData.package === pkg.id
                          ? "border-sky-500 bg-sky-500/10 shadow-lg shadow-sky-500/20"
                          : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 text-white text-xs font-bold">
                          {tx.mostPopular}
                        </div>
                      )}
                      
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}>
                        {pkg.id === "basic" && <Shield className="w-6 h-6 text-white" />}
                        {pkg.id === "enhanced" && <Zap className="w-6 h-6 text-white" />}
                        {pkg.id === "featured" && <Crown className="w-6 h-6 text-white" />}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className={`text-3xl font-bold ${pkg.accent}`}>{pkg.price}</span>
                        <span className="text-sm text-white/40">{pkg.priceNote}</span>
                      </div>
                      
                      <ul className="space-y-3">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                            <Check className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-white font-bold hover:bg-white/[0.1] transition-all"
                  >
                    {tx.backBtn}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-sky-500/30 transition-all"
                  >
                    {tx.submitListing} <Check className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center mx-auto mb-8">
                  <Check className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{tx.submitted}</h3>
                <p className="text-lg text-white/60 max-w-md mx-auto mb-2">
                  {tx.submittedDesc}
                </p>
                <p className="text-white/40 max-w-md mx-auto mb-8">
                  {tx.submittedNote}
                </p>
                <button
                  onClick={onClose}
                  className="h-14 px-10 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold hover:shadow-lg hover:shadow-sky-500/30 transition-all"
                >
                  {tx.close}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
