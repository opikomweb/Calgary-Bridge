"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalgaryConnectLogo } from "./calgary-connect-logo";
import { 
  MapPin, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Shield,
  FileText,
  AlertCircle,
  Heart,
  Users,
  X,
  Building2,
  Globe,
  ChevronUp
} from "lucide-react";

interface FooterProps {
  onOpenSubmitBusiness?: () => void;
  onOpenGetFeatured?: () => void;
}

// Modal content for each page
const pageContent: Record<string, { title: string; content: React.ReactNode }> = {
  about: {
    title: "About Calgary Konnect",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-white/70 leading-relaxed">
          Calgary Konnect exists for one reason: nobody should have to suffer simply because they couldn&apos;t find the right door to knock on.
        </p>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-sky-500/5 border border-sky-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-[#E1251B]" />
            <h3 className="text-xl font-bold text-white">Why Calgary Needs Calgary Konnect</h3>
          </div>
          <p className="text-white/60 leading-relaxed">
            Calgary is one of the most generous cities in Canada. There are food banks, rent-relief funds, free legal clinics, language classes, mental-health lines, and settlement programs for almost every situation. The tragedy isn&apos;t that help doesn&apos;t exist &mdash; it&apos;s that the people who need it most can&apos;t find it in time.
          </p>
        </div>

        <h3 className="text-xl font-bold text-white mt-8">The Problem We Saw</h3>
        <p className="text-white/60 leading-relaxed">
          Picture a single mother who just landed in Calgary with two kids and three suitcases. Her English is shaky, her savings are nearly gone, and she has two weeks to find housing before a hotel voucher runs out. The help she needs is out there &mdash; but it&apos;s scattered across dozens of websites, buried in PDFs, hidden behind phone trees, and written in language she can barely read. By the time she finds the right program, the intake window has closed.
        </p>
        <p className="text-white/60 leading-relaxed">
          Picture a senior on a fixed income who eats less so he can afford his medication, never knowing a subsidy program could have covered both. Picture a young worker one missed paycheque away from eviction, unaware that emergency rent support was approved for people exactly like him. These aren&apos;t rare stories in Calgary. They happen every single day &mdash; not because the city failed them, but because the information never reached them.
        </p>

        <h3 className="text-xl font-bold text-white mt-8">Our Solution</h3>
        <p className="text-white/60 leading-relaxed">
          Calgary Konnect brings every essential service into one place, in plain language, in the languages our communities actually speak. Instead of searching ten websites, you ask one question and get a clear answer: where to go, who to call, what you qualify for, and what to bring. We turn hours of confusion into a few calm minutes &mdash; so help arrives while it still matters.
        </p>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#E1251B]/10 to-[#E1251B]/5 border border-[#E1251B]/20">
          <p className="text-white/70 leading-relaxed italic">
            &ldquo;I spent three weeks calling numbers that led nowhere. With Calgary Konnect I found a settlement worker, a food bank near my building, and free English classes &mdash; all in one afternoon. For the first time since arriving, I could breathe.&rdquo;
          </p>
          <p className="text-white/50 text-sm mt-3">&mdash; A Calgary newcomer, in her own words</p>
        </div>

        <h3 className="text-xl font-bold text-white mt-8">Our Mission</h3>
        <p className="text-white/60 leading-relaxed">
          To democratize access to information and services for all Calgarians, regardless of background, language, or circumstance. We believe everyone deserves easy access to housing support, employment resources, healthcare information, and community services &mdash; before a hard week becomes a crisis.
        </p>
        <h3 className="text-xl font-bold text-white mt-8">What We Offer</h3>
        <ul className="space-y-3 text-white/60">
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>Curated directory of verified Calgary resources and services</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>AI-powered guidance for personalized recommendations</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>Multi-language support for diverse communities</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>Emergency resources and crisis support information</span>
          </li>
        </ul>
      </div>
    ),
  },
  verification: {
    title: "How We Verify Resources",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-white/70 leading-relaxed">
          Every resource on Calgary Konnect undergoes a rigorous verification process to ensure accuracy and reliability.
        </p>
        <h3 className="text-xl font-bold text-white">Our Verification Process</h3>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="font-bold text-white mb-2">1. Initial Research</h4>
            <p className="text-white/60">We verify the organization exists through official registries, websites, and public records.</p>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="font-bold text-white mb-2">2. Contact Verification</h4>
            <p className="text-white/60">Phone numbers, addresses, and websites are tested to ensure they are current and functional.</p>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="font-bold text-white mb-2">3. Service Confirmation</h4>
            <p className="text-white/60">We confirm the services offered, eligibility requirements, and any associated costs.</p>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="font-bold text-white mb-2">4. Monthly Reviews</h4>
            <p className="text-white/60">All listings are reviewed monthly to catch closures, changes, or updates.</p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-[#E1251B]/10 border border-[#E1251B]/20 mt-6">
          <p className="text-white/70">
            <strong className="text-[#E1251B]">Note:</strong> Despite our best efforts, information can change quickly. Always verify details directly with service providers before visiting.
          </p>
        </div>
      </div>
    ),
  },
  terms: {
    title: "Terms of Service",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-white/50">Last updated: January 2026</p>
        <p className="text-white/70 leading-relaxed">
          By accessing and using Calgary Konnect, you agree to be bound by these Terms of Service.
        </p>
        <h3 className="text-xl font-bold text-white">1. Acceptance of Terms</h3>
        <p className="text-white/60 leading-relaxed">
          By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.
        </p>
        <h3 className="text-xl font-bold text-white">2. Use of Service</h3>
        <p className="text-white/60 leading-relaxed">
          Calgary Konnect provides information about local services and resources. This information is provided for general reference purposes only and should not be considered professional advice.
        </p>
        <h3 className="text-xl font-bold text-white">3. Disclaimer</h3>
        <p className="text-white/60 leading-relaxed">
          We are not affiliated with any government body. Information may change without notice. Always verify details directly with service providers. We are not responsible for any decisions made based on information found on this platform.
        </p>
        <h3 className="text-xl font-bold text-white">4. User Conduct</h3>
        <p className="text-white/60 leading-relaxed">
          Users agree not to misuse the platform, submit false information, or engage in any activity that could harm the service or other users.
        </p>
        <h3 className="text-xl font-bold text-white">5. Contact</h3>
        <p className="text-white/60 leading-relaxed">
          For questions about these terms, contact us at <a href="mailto:tech@wilglobo.com" className="text-sky-400 font-semibold hover:underline">tech@wilglobo.com</a>
        </p>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    content: (
      <div className="space-y-6">
        <p className="text-sm text-white/50">Last updated: January 2026</p>
        <p className="text-white/70 leading-relaxed">
          Your privacy is important to us. This policy explains how Calgary Konnect collects, uses, and protects your information.
        </p>
        <h3 className="text-xl font-bold text-white">Information We Collect</h3>
        <ul className="space-y-2 text-white/60">
          <li>- Usage data (pages visited, search queries)</li>
          <li>- Device information (browser type, operating system)</li>
          <li>- Saved preferences and bookmarks (stored locally)</li>
        </ul>
        <h3 className="text-xl font-bold text-white">How We Use Information</h3>
        <p className="text-white/60 leading-relaxed">
          We use collected information to improve our services, provide personalized recommendations, and enhance user experience. We do not sell your personal information to third parties.
        </p>
        <h3 className="text-xl font-bold text-white">Data Security</h3>
        <p className="text-white/60 leading-relaxed">
          We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
        </p>
        <h3 className="text-xl font-bold text-white">Contact Us</h3>
        <p className="text-white/60 leading-relaxed">
          For privacy-related inquiries, contact <a href="mailto:tech@wilglobo.com" className="text-sky-400 font-semibold hover:underline">tech@wilglobo.com</a>
        </p>
      </div>
    ),
  },
  cookies: {
    title: "Cookie Policy",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          Calgary Konnect uses cookies and similar technologies to enhance your browsing experience.
        </p>
        <h3 className="text-xl font-bold text-white">What Are Cookies?</h3>
        <p className="text-white/60 leading-relaxed">
          Cookies are small text files stored on your device that help websites remember your preferences and improve functionality.
        </p>
        <h3 className="text-xl font-bold text-white">Cookies We Use</h3>
        <ul className="space-y-3 text-white/60">
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span><strong className="text-white">Essential cookies:</strong> Required for basic site functionality</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span><strong className="text-white">Preference cookies:</strong> Remember your settings and choices</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span><strong className="text-white">Analytics cookies:</strong> Help us understand how you use our site</span>
          </li>
        </ul>
        <h3 className="text-xl font-bold text-white">Managing Cookies</h3>
        <p className="text-white/60 leading-relaxed">
          You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.
        </p>
      </div>
    ),
  },
  accessibility: {
    title: "Accessibility Statement",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          Calgary Konnect is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone.
        </p>
        <h3 className="text-xl font-bold text-white">Our Commitment</h3>
        <p className="text-white/60 leading-relaxed">
          We strive to meet WCAG 2.1 Level AA standards and are committed to providing an accessible experience for all users.
        </p>
        <h3 className="text-xl font-bold text-white">Accessibility Features</h3>
        <ul className="space-y-2 text-white/60">
          <li>- Keyboard navigation support</li>
          <li>- Screen reader compatibility</li>
          <li>- High contrast mode support</li>
          <li>- Resizable text without loss of functionality</li>
          <li>- Clear, consistent navigation</li>
        </ul>
        <h3 className="text-xl font-bold text-white">Feedback</h3>
        <p className="text-white/60 leading-relaxed">
          If you encounter accessibility barriers, please contact us at <a href="mailto:tech@wilglobo.com" className="text-sky-400 font-semibold hover:underline">tech@wilglobo.com</a>
        </p>
      </div>
    ),
  },
  disclaimer: {
    title: "Data Disclaimer",
    content: (
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-[#E1251B]/10 border border-[#E1251B]/20">
          <p className="text-white/70 leading-relaxed">
            <strong className="text-[#E1251B]">Important:</strong> Calgary Konnect is an independent platform and is NOT affiliated with, endorsed by, or connected to the City of Calgary, the Government of Alberta, or any official government body.
          </p>
        </div>
        <h3 className="text-xl font-bold text-white">Information Accuracy</h3>
        <p className="text-white/60 leading-relaxed">
          While we make every effort to ensure the accuracy of information, we cannot guarantee that all details are current, complete, or error-free. Services, hours, eligibility requirements, and contact information may change without notice.
        </p>
        <h3 className="text-xl font-bold text-white">Your Responsibility</h3>
        <p className="text-white/60 leading-relaxed">
          Always verify information directly with service providers before making decisions or visiting locations. Do not rely solely on information found on this platform for critical decisions.
        </p>
        <h3 className="text-xl font-bold text-white">Emergency Situations</h3>
        <p className="text-white/60 leading-relaxed">
          For emergencies, always call 911. Do not use this platform to seek emergency assistance.
        </p>
        <h3 className="text-xl font-bold text-white">Limitation of Liability</h3>
        <p className="text-white/60 leading-relaxed">
          Calgary Konnect shall not be held liable for any damages arising from the use of information on this platform.
        </p>
      </div>
    ),
  },
  guidelines: {
    title: "Community Guidelines",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          Calgary Konnect is built on community trust. Please follow these guidelines to maintain a helpful, respectful platform.
        </p>
        <h3 className="text-xl font-bold text-white">Be Respectful</h3>
        <p className="text-white/60 leading-relaxed">
          Treat all users, service providers, and community members with respect and dignity.
        </p>
        <h3 className="text-xl font-bold text-white">Share Accurate Information</h3>
        <p className="text-white/60 leading-relaxed">
          When suggesting resources or reporting issues, please provide accurate, honest information to help maintain data quality.
        </p>
        <h3 className="text-xl font-bold text-white">Protect Privacy</h3>
        <p className="text-white/60 leading-relaxed">
          Do not share personal information about others without consent. Respect the privacy of service providers and fellow users.
        </p>
        <h3 className="text-xl font-bold text-white">Report Issues</h3>
        <p className="text-white/60 leading-relaxed">
          If you find outdated or incorrect information, please report it so we can update our records.
        </p>
      </div>
    ),
  },
  volunteer: {
    title: "Volunteer With Us",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          Help us make Calgary Konnect even better! We are always looking for passionate volunteers.
        </p>
        <h3 className="text-xl font-bold text-white">Volunteer Opportunities</h3>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="font-bold text-white mb-2">Resource Verification</h4>
            <p className="text-white/60">Help verify and update resource listings in your community.</p>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="font-bold text-white mb-2">Translation</h4>
            <p className="text-white/60">Translate content to help serve diverse communities.</p>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="font-bold text-white mb-2">Community Outreach</h4>
            <p className="text-white/60">Spread the word about Calgary Konnect in your network.</p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white">Get Involved</h3>
        <p className="text-white/60 leading-relaxed">
          Contact us at <a href="mailto:tech@wilglobo.com" className="text-sky-400 font-semibold hover:underline">tech@wilglobo.com</a> to learn more about volunteer opportunities.
        </p>
      </div>
    ),
  },
  partnership: {
    title: "Partnership Inquiry",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          Calgary Konnect welcomes partnerships with organizations that share our mission of helping Calgarians access vital services and resources.
        </p>
        <h3 className="text-xl font-bold text-white">Partnership Opportunities</h3>
        <ul className="space-y-3 text-white/60">
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>Non-profit organizations seeking to expand their reach</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>Government agencies looking to improve service delivery</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>Community organizations wanting to connect with residents</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>Tech companies interested in civic innovation</span>
          </li>
        </ul>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-sky-500/5 border border-sky-500/20 mt-6">
          <h3 className="text-xl font-bold text-white mb-3">Partner With Calgary Konnect</h3>
          <p className="text-white/60 mb-4">
            For partnership inquiries and business opportunities, reach out to our team.
          </p>
          <a 
            href="mailto:tech@wilglobo.com" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors"
          >
            <Mail className="w-5 h-5" />
            tech@wilglobo.com
          </a>
        </div>
      </div>
    ),
  },
  contact: {
    title: "Contact Us",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          Have questions, feedback, or suggestions? We would love to hear from you.
        </p>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-sky-500/5 border border-sky-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-[#E1251B]" />
            <h3 className="text-xl font-bold text-white">Calgary Konnect</h3>
          </div>
          <p className="text-white/60 mb-6">
            Calgary Konnect is built and maintained right here in Calgary, with a focus on civic innovation and helping every resident find the support they need.
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:tech@wilglobo.com" 
              className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5 text-[#E1251B]" />
              <span className="font-semibold">tech@wilglobo.com</span>
            </a>
            <div className="flex items-center gap-3 text-white/70">
              <MapPin className="w-5 h-5 text-[#E1251B]" />
              <span>Calgary, Alberta, Canada</span>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white">Response Time</h3>
        <p className="text-white/60 leading-relaxed">
          We aim to respond to all inquiries within 2-3 business days. For urgent matters, please indicate so in your subject line.
        </p>
      </div>
    ),
  },
};

// Content Modal Component
function ContentModal({ 
  isOpen, 
  onClose, 
  pageKey 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  pageKey: string;
}) {
  const page = pageContent[pageKey];
  if (!page) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#0a1628] rounded-3xl border border-white/[0.1] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 border-b border-white/[0.08] bg-[#0a1628]">
              <h2 className="text-2xl font-bold text-white">{page.title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-8 overflow-y-auto max-h-[calc(85vh-80px)]">
              {page.content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Footer({ onOpenSubmitBusiness, onOpenGetFeatured }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [openColumns, setOpenColumns] = useState<Record<string, boolean>>({});

  const openModal = (key: string) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);

  const toggleColumn = (key: string) =>
    setOpenColumns((prev) => ({ ...prev, [key]: !prev[key] }));

  const legalLinks = [
    { label: "Terms of Service", key: "terms" },
    { label: "Privacy Policy", key: "privacy" },
    { label: "Cookie Policy", key: "cookies" },
    { label: "Accessibility", key: "accessibility" },
    { label: "Data Disclaimer", key: "disclaimer" },
  ];

  const resourceLinks = [
    { label: "About Calgary Konnect", key: "about" },
    { label: "How We Verify Resources", key: "verification" },
    { label: "Community Guidelines", key: "guidelines" },
  ];

  const businessLinks = [
    { label: "List Your Business", onClick: onOpenSubmitBusiness },
    { label: "Get Featured", onClick: onOpenGetFeatured },
    { label: "Partnership Inquiry", key: "partnership" },
  ];

  const communityLinks = [
    { label: "Volunteer With Us", key: "volunteer" },
    { label: "Contact Us", key: "contact" },
  ];

  return (
    <>
      <footer className="relative mt-12 md:mt-16">
        {/* Footer Separator - Visual Break from Main Content */}
        <div className="relative">
          {/* Gradient Divider Line */}
          <div className="h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
          
          {/* Decorative Top Pattern */}
          <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-transparent via-[#0b1d33]/50 to-[#0b1d33] pointer-events-none" />
        </div>

        {/* Footer Background - solid dark base in both modes */}
        <div className="bg-[#0b1d33] relative overflow-hidden">
          {/* Subtle Grid Pattern — hidden in dark mode */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />

          <div className="relative border-b border-white/[0.04] py-4 md:py-5 px-4 md:px-8 bg-[#0b1d33]">
            <div className="max-w-[1200px] mx-auto">
              {/* Mobile: 2x2 grid | Desktop: single row flex */}
              <div className="grid grid-cols-2 md:flex md:items-center md:justify-center gap-4 md:gap-8">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-7 h-7 md:w-7 md:h-7 rounded-lg bg-[#1D4ED8]/15 flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-[#1D4ED8]" />
                  </div>
                  <span className="text-xs md:text-xs font-semibold text-white/70">Verified</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-7 h-7 md:w-7 md:h-7 rounded-lg bg-[#1D4ED8]/15 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-[#1D4ED8]" />
                  </div>
                  <span className="text-xs md:text-xs font-semibold text-white/70">Updated monthly</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-7 h-7 md:w-7 md:h-7 rounded-lg bg-[#E1251B]/15 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-[#E1251B]" />
                  </div>
                  <span className="text-xs md:text-xs font-semibold text-white/70">Community-driven</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-7 h-7 md:w-7 md:h-7 rounded-lg bg-[#E1251B]/15 flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-[#E1251B]" />
                  </div>
                  <span className="text-xs md:text-xs font-semibold text-white/70">Free to use</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="relative py-10 md:py-12 px-5 md:px-8">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-start">
                {/* Brand Column — dark surface logo */}
                <div className="md:col-span-3 flex flex-col items-start">
                  <CalgaryConnectLogo size="md" darkSurface />
                  <p className="text-xs text-white/30 mt-3 text-left">Everything Calgary. One Place.</p>
                </div>

              {/* Link Columns Container */}
              <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-6 md:gap-6">
                {/* Resources Column */}
                <div className="border-b border-white/[0.06] sm:border-none">
                  <button
                    onClick={() => toggleColumn("resources")}
                    className="w-full flex items-center justify-between py-3 sm:py-0 sm:cursor-default"
                    aria-expanded={!!openColumns["resources"]}
                  >
                    <h4 className="text-sm font-bold text-white sm:mb-4 sm:pb-2 sm:border-b sm:border-white/[0.06] w-full text-left">Resources</h4>
                    <ChevronUp
                      className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform sm:hidden ${openColumns["resources"] ? "rotate-0" : "rotate-180"}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {(openColumns["resources"]) && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden sm:!h-auto sm:!opacity-100 space-y-2.5 pb-3 sm:pb-0"
                      >
                        {resourceLinks.map((link) => (
                          <li key={link.label}>
                            <button
                              onClick={() => openModal(link.key)}
                              className="text-sm text-white/50 hover:text-[#E1251B] transition-colors text-left flex items-center gap-1.5 group"
                            >
                              <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#E1251B]" />
                              {link.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  {/* Always visible on sm+ */}
                  <ul className="hidden sm:block space-y-2.5">
                    {resourceLinks.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => openModal(link.key)}
                          className="text-sm text-white/50 hover:text-[#E1251B] transition-colors text-left flex items-center gap-1.5 group"
                        >
                          <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#E1251B]" />
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* For Businesses Column */}
                <div className="border-b border-white/[0.06] sm:border-none">
                  <button
                    onClick={() => toggleColumn("business")}
                    className="w-full flex items-center justify-between py-3 sm:py-0 sm:cursor-default"
                    aria-expanded={!!openColumns["business"]}
                  >
                    <h4 className="text-sm font-bold text-white sm:mb-4 sm:pb-2 sm:border-b sm:border-white/[0.06] w-full text-left">For Businesses</h4>
                    <ChevronUp
                      className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform sm:hidden ${openColumns["business"] ? "rotate-0" : "rotate-180"}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openColumns["business"] && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden space-y-2.5 pb-3 sm:pb-0"
                      >
                        {businessLinks.map((link) => (
                          <li key={link.label}>
                            <button
                              onClick={link.onClick ?? (() => openModal(link.key!))}
                              className="text-sm text-white/50 hover:text-[#E1251B] transition-colors text-left flex items-center gap-1.5 group"
                            >
                              <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#E1251B]" />
                              {link.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  <ul className="hidden sm:block space-y-2.5">
                    {businessLinks.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={link.onClick ?? (() => openModal(link.key!))}
                          className="text-sm text-white/50 hover:text-[#E1251B] transition-colors text-left flex items-center gap-1.5 group"
                        >
                          <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#E1251B]" />
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Community Column */}
                <div className="border-b border-white/[0.06] sm:border-none">
                  <button
                    onClick={() => toggleColumn("community")}
                    className="w-full flex items-center justify-between py-3 sm:py-0 sm:cursor-default"
                    aria-expanded={!!openColumns["community"]}
                  >
                    <h4 className="text-sm font-bold text-white sm:mb-4 sm:pb-2 sm:border-b sm:border-white/[0.06] w-full text-left">Community</h4>
                    <ChevronUp
                      className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform sm:hidden ${openColumns["community"] ? "rotate-0" : "rotate-180"}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openColumns["community"] && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden space-y-2.5 pb-3 sm:pb-0"
                      >
                        {communityLinks.map((link) => (
                          <li key={link.label}>
                            <button
                              onClick={() => openModal(link.key)}
                              className="text-sm text-white/50 hover:text-[#E1251B] transition-colors text-left flex items-center gap-1.5 group"
                            >
                              <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#E1251B]" />
                              {link.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  <ul className="hidden sm:block space-y-2.5">
                    {communityLinks.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => openModal(link.key)}
                          className="text-sm text-white/50 hover:text-[#E1251B] transition-colors text-left flex items-center gap-1.5 group"
                        >
                          <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#E1251B]" />
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section — accordion on mobile, always open on md+ */}
        <div className="relative border-t border-white/[0.04] py-6 md:py-10 px-5 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            <button
              onClick={() => setDisclaimerOpen((o) => !o)}
              className="w-full md:cursor-default"
              aria-expanded={disclaimerOpen}
            >
              <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#E1251B]/[0.08] via-[#E1251B]/[0.04] to-transparent border border-[#E1251B]/15">
                <div className="w-10 h-10 rounded-lg bg-[#E1251B]/15 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#E1251B]" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-[#E1251B] text-sm font-bold">Important Disclaimer</strong>
                    <ChevronUp
                      className={`w-4 h-4 text-[#E1251B]/70 flex-shrink-0 transition-transform md:hidden ${disclaimerOpen ? "rotate-0" : "rotate-180"}`}
                    />
                  </div>
                  {/* Body — visible always on md+, toggles on mobile */}
                  <AnimatePresence initial={false}>
                    {disclaimerOpen && (
                      <motion.p
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 4 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden text-sm text-white/60 leading-relaxed md:hidden"
                      >
                        Calgary Konnect is an independent platform and is not affiliated with, endorsed by, or connected to the City of Calgary,
                        the Government of Alberta, or any official government body. Information provided is for general reference only.
                        Always verify details directly with service providers. For emergencies, call 911.
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {/* Always visible on md+ */}
                  <p className="hidden md:block mt-1 text-sm text-white/60 leading-relaxed">
                    Calgary Konnect is an independent platform and is not affiliated with, endorsed by, or connected to the City of Calgary,
                    the Government of Alberta, or any official government body. Information provided is for general reference only.
                    Always verify details directly with service providers. For emergencies, call 911.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-white/[0.04] py-4 md:py-5 px-5 md:px-8 bg-white/2 dark:bg-black/30">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
              {legalLinks.map((link, index) => (
                <span key={link.label} className="flex items-center gap-2 md:gap-1">
                  <button
                    onClick={() => openModal(link.key)}
                    className="text-xs text-white/50 dark:text-white/40 hover:text-[#E1251B] transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </button>
                  {index < legalLinks.length - 1 && (
                    <span className="text-white/20 dark:text-white/10 mx-1 md:mx-1.5">|</span>
                  )}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <p className="text-xs text-white/50 dark:text-white/40 font-medium whitespace-nowrap">
                &copy; {currentYear} <span className="text-white/70 dark:text-white/60">Calgary Konnect</span>
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.08] dark:bg-white/[0.06] hover:bg-[#E1251B] text-white/50 hover:text-white transition-colors flex-shrink-0"
              >
                <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
        </div>
      </footer>

      {/* Content Modals */}
      <ContentModal 
        isOpen={activeModal !== null} 
        onClose={closeModal} 
        pageKey={activeModal || ""} 
      />
    </>
  );
}
