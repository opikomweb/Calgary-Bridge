"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles
} from "lucide-react";

interface FooterProps {
  onOpenSubmitBusiness?: () => void;
  onOpenGetFeatured?: () => void;
}

// Modal content for each page
const pageContent: Record<string, { title: string; content: React.ReactNode }> = {
  about: {
    title: "About Calgary Connect",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-white/70 leading-relaxed">
          Calgary Connect is a comprehensive civic resource platform designed to help Calgarians navigate the complex landscape of services, support programs, and opportunities available in our city.
        </p>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-cyan-500/5 border border-sky-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-sky-400" />
            <h3 className="text-xl font-bold text-white">A WilGlobo Inc Initiative</h3>
          </div>
          <p className="text-white/60 leading-relaxed">
            Calgary Connect was born out of the real experience and challenge of finding all the information you need at your fingertips. As newcomers and long-time residents alike struggle to navigate the maze of government services, community programs, and support resources, we recognized the need for a single, unified platform.
          </p>
        </div>
        <h3 className="text-xl font-bold text-white mt-8">Our Mission</h3>
        <p className="text-white/60 leading-relaxed">
          To democratize access to information and services for all Calgarians, regardless of background, language, or circumstance. We believe everyone deserves easy access to housing support, employment resources, healthcare information, and community services.
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
          Every resource on Calgary Connect undergoes a rigorous verification process to ensure accuracy and reliability.
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
        <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 mt-6">
          <p className="text-white/70">
            <strong className="text-amber-400">Note:</strong> Despite our best efforts, information can change quickly. Always verify details directly with service providers before visiting.
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
          By accessing and using Calgary Connect, you agree to be bound by these Terms of Service.
        </p>
        <h3 className="text-xl font-bold text-white">1. Acceptance of Terms</h3>
        <p className="text-white/60 leading-relaxed">
          By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.
        </p>
        <h3 className="text-xl font-bold text-white">2. Use of Service</h3>
        <p className="text-white/60 leading-relaxed">
          Calgary Connect provides information about local services and resources. This information is provided for general reference purposes only and should not be considered professional advice.
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
          Your privacy is important to us. This policy explains how Calgary Connect collects, uses, and protects your information.
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
          Calgary Connect uses cookies and similar technologies to enhance your browsing experience.
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
          Calgary Connect is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone.
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
        <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-white/70 leading-relaxed">
            <strong className="text-amber-400">Important:</strong> Calgary Connect is an independent platform and is NOT affiliated with, endorsed by, or connected to the City of Calgary, the Government of Alberta, or any official government body.
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
          Calgary Connect and WilGlobo Inc shall not be held liable for any damages arising from the use of information on this platform.
        </p>
      </div>
    ),
  },
  guidelines: {
    title: "Community Guidelines",
    content: (
      <div className="space-y-6">
        <p className="text-white/70 leading-relaxed">
          Calgary Connect is built on community trust. Please follow these guidelines to maintain a helpful, respectful platform.
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
          Help us make Calgary Connect even better! We are always looking for passionate volunteers.
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
            <p className="text-white/60">Spread the word about Calgary Connect in your network.</p>
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
          Calgary Connect welcomes partnerships with organizations that share our mission of helping Calgarians access vital services and resources.
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
        <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-cyan-500/5 border border-sky-500/20 mt-6">
          <h3 className="text-xl font-bold text-white mb-3">Contact WilGlobo Inc</h3>
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
        <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-cyan-500/5 border border-sky-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-sky-400" />
            <h3 className="text-xl font-bold text-white">WilGlobo Inc</h3>
          </div>
          <p className="text-white/60 mb-6">
            Calgary Connect is proudly developed and maintained by WilGlobo Inc, a technology company focused on civic innovation and community empowerment.
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:tech@wilglobo.com" 
              className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5 text-sky-400" />
              <span className="font-semibold">tech@wilglobo.com</span>
            </a>
            <div className="flex items-center gap-3 text-white/70">
              <MapPin className="w-5 h-5 text-sky-400" />
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

  const openModal = (key: string) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);

  const legalLinks = [
    { label: "Terms of Service", key: "terms" },
    { label: "Privacy Policy", key: "privacy" },
    { label: "Cookie Policy", key: "cookies" },
    { label: "Accessibility", key: "accessibility" },
    { label: "Data Disclaimer", key: "disclaimer" },
  ];

  const resourceLinks = [
    { label: "About Calgary Connect", key: "about" },
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
      <footer className="relative border-t border-white/[0.06] bg-[#030810]">
        {/* Trust Banner */}
        <div className="border-b border-white/[0.06] py-10 px-8 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
              <div className="flex items-center gap-3 text-white/50">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">All resources manually verified</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <FileText className="w-5 h-5 text-sky-400" />
                <span className="text-sm font-medium">Updated monthly</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Users className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium">Community-driven</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-sm font-medium">Free to use</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-20 px-8 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-5 gap-16 lg:gap-12">
              {/* Brand Column */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1829] to-[#071119] p-1 border border-white/10">
                    <Image
                      src="/calgary-connect-logo.png"
                      alt="Calgary Connect"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      <span className="text-white">Calgary </span>
                      <span className="text-[#38BDF8]">Connect</span>
                    </h3>
                    <p className="text-sm text-white/40">Everything Calgary. One Place.</p>
                  </div>
                </div>

                {/* WilGlobo Info */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-500/5 to-transparent border border-sky-500/10 mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span className="text-sm font-semibold text-white">A WilGlobo Inc Initiative</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Born out of the real experience and challenge of finding all the information you need at your fingertips.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-white/50">
                  <a href="mailto:tech@wilglobo.com" className="flex items-center gap-3 hover:text-sky-400 transition-colors font-medium">
                    <Mail className="w-4 h-4" />
                    tech@wilglobo.com
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4" />
                    Calgary, Alberta, Canada
                  </div>
                </div>
              </div>

              {/* Resources Column */}
              <div>
                <h4 className="text-base font-bold text-white mb-6">Resources</h4>
                <ul className="space-y-4">
                  {resourceLinks.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => openModal(link.key)}
                        className="text-sm text-white/50 hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Businesses Column */}
              <div>
                <h4 className="text-base font-bold text-white mb-6">For Businesses</h4>
                <ul className="space-y-4">
                  {businessLinks.map((link) => (
                    <li key={link.label}>
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="text-sm text-white/50 hover:text-white transition-colors text-left"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <button
                          onClick={() => openModal(link.key!)}
                          className="text-sm text-white/50 hover:text-white transition-colors text-left"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community Column */}
              <div>
                <h4 className="text-base font-bold text-white mb-6">Community</h4>
                <ul className="space-y-4">
                  {communityLinks.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => openModal(link.key)}
                        className="text-sm text-white/50 hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-white/[0.06] py-10 px-8 lg:px-16 bg-white/[0.01]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/60 leading-relaxed">
                <strong className="text-amber-400">Important Disclaimer:</strong> Calgary Connect is an independent 
                platform developed by WilGlobo Inc and is not affiliated with, endorsed by, or connected to the City of Calgary, 
                the Government of Alberta, or any official government body. Information provided is for general reference only. 
                Always verify details directly with service providers. For emergencies, call 911.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-8 px-8 lg:px-16">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
              {legalLinks.map((link, index) => (
                <span key={link.label} className="flex items-center gap-4 lg:gap-8">
                  <button
                    onClick={() => openModal(link.key)}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                  {index < legalLinks.length - 1 && (
                    <span className="text-white/20 hidden lg:inline">|</span>
                  )}
                </span>
              ))}
            </div>

            <p className="text-sm text-white/40">
              &copy; {currentYear} WilGlobo Inc. All rights reserved.
            </p>
          </div>
        </div>

        {/* Small Calgary Tower Decoration */}
        <div className="absolute bottom-4 right-8 opacity-20 pointer-events-none">
          <svg className="w-12 h-24" viewBox="0 0 40 80">
            <path d="M17 80 L17 32 L14 32 L20 0 L26 32 L23 32 L23 80 Z" fill="none" stroke="#38BDF8" strokeWidth="1" />
            <ellipse cx="20" cy="26" rx="6" ry="3" fill="none" stroke="#38BDF8" strokeWidth="1" />
            <circle cx="20" cy="3" r="2" fill="#FBBF24" className="animate-pulse" />
          </svg>
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
