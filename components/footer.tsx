"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalgaryConnectLogo } from "./calgary-connect-logo";
import { LanguageToggle } from "./language-toggle";
import { useTranslations, useTranslationContext, registerStrings } from "@/lib/translation-context";
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

// Register footer link labels for translation
registerStrings(
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
  "Data Disclaimer",
  "About Calgary Konnect",
  "How We Verify Resources",
  "Community Guidelines",
  "List Your Business",
  "Get Featured",
  "Partnership Inquiry",
  "Volunteer With Us",
  "Contact Us",
  "Copyright",
  "Important Disclaimer",
  "Calgary Konnect is an independent platform and is not affiliated with, endorsed by, or connected to the City of Calgary, the Government of Alberta, or any official government body. Information provided is for general reference only. Always verify details directly with service providers. For emergencies, call 911.",
  "Verified", "Updated monthly", "Community-driven", "Free to use",
  // Modal headings & body strings
  "Why Calgary Needs Calgary Konnect",
  "Calgary Konnect exists for one reason: nobody should have to suffer simply because they couldn't find the right door to knock on.",
  "Calgary is one of the most generous cities in Canada. There are food banks, rent-relief funds, free legal clinics, language classes, mental-health lines, and settlement programs for almost every situation. The tragedy isn't that help doesn't exist — it's that the people who need it most can't find it in time.",
  "The Problem We Saw",
  "Picture a single mother who just landed in Calgary with two kids and three suitcases. Her English is shaky, her savings are nearly gone, and she has two weeks to find housing before a hotel voucher runs out. The help she needs is out there — but it's scattered across dozens of websites, buried in PDFs, hidden behind phone trees, and written in language she can barely read. By the time she finds the right program, the intake window has closed.",
  "Picture a senior on a fixed income who eats less so he can afford his medication, never knowing a subsidy program could have covered both. Picture a young worker one missed paycheque away from eviction, unaware that emergency rent support was approved for people exactly like him. These aren't rare stories in Calgary. They happen every single day — not because the city failed them, but because the information never reached them.",
  "Our Solution",
  "Calgary Konnect brings every essential service into one place, in plain language, in the languages our communities actually speak. Instead of searching ten websites, you ask one question and get a clear answer: where to go, who to call, what you qualify for, and what to bring. We turn hours of confusion into a few calm minutes — so help arrives while it still matters.",
  "I spent three weeks calling numbers that led nowhere. With Calgary Konnect I found a settlement worker, a food bank near my building, and free English classes — all in one afternoon. For the first time since arriving, I could breathe.",
  "A Calgary newcomer, in her own words",
  "Our Mission",
  "To democratize access to information and services for all Calgarians, regardless of background, language, or circumstance. We believe everyone deserves easy access to housing support, employment resources, healthcare information, and community services — before a hard week becomes a crisis.",
  "What We Offer",
  "Curated directory of verified Calgary resources and services",
  "AI-powered guidance for personalized recommendations",
  "Multi-language support for diverse communities",
  "Emergency resources and crisis support information",
  // Verification
  "Every resource on Calgary Konnect undergoes a rigorous verification process to ensure accuracy and reliability.",
  "Our Verification Process",
  "1. Initial Research", "We verify the organization exists through official registries, websites, and public records.",
  "2. Contact Verification", "Phone numbers, addresses, and websites are tested to ensure they are current and functional.",
  "3. Service Confirmation", "We confirm the services offered, eligibility requirements, and any associated costs.",
  "4. Monthly Reviews", "All listings are reviewed monthly to catch closures, changes, or updates.",
  "Note:", "Despite our best efforts, information can change quickly. Always verify details directly with service providers before visiting.",
  // Terms
  "Last updated: January 2026",
  "By accessing and using Calgary Konnect, you agree to be bound by these Terms of Service.",
  "1. Acceptance of Terms", "By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.",
  "2. Use of Service", "Calgary Konnect provides information about local services and resources. This information is provided for general reference purposes only and should not be considered professional advice.",
  "3. Disclaimer", "We are not affiliated with any government body. Information may change without notice. Always verify details directly with service providers. We are not responsible for any decisions made based on information found on this platform.",
  "4. User Conduct", "Users agree not to misuse the platform, submit false information, or engage in any activity that could harm the service or other users.",
  "5. Contact", "For questions about these terms, contact us at",
  // Privacy
  "Your privacy is important to us. This policy explains how Calgary Konnect collects, uses, and protects your information.",
  "Information We Collect",
  "Usage data (pages visited, search queries)",
  "Device information (browser type, operating system)",
  "Saved preferences and bookmarks (stored locally)",
  "How We Use Information", "We use collected information to improve our services, provide personalized recommendations, and enhance user experience. We do not sell your personal information to third parties.",
  "Data Security", "We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure.",
  "For privacy-related inquiries, contact",
  // Cookies
  "Calgary Konnect uses cookies and similar technologies to enhance your browsing experience.",
  "What Are Cookies?", "Cookies are small text files stored on your device that help websites remember your preferences and improve functionality.",
  "Cookies We Use",
  "Essential cookies:", "Required for basic site functionality",
  "Preference cookies:", "Remember your settings and choices",
  "Analytics cookies:", "Help us understand how you use our site",
  "Managing Cookies", "You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.",
  // Accessibility
  "Calgary Konnect is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone.",
  "Our Commitment", "We strive to meet WCAG 2.1 Level AA standards and are committed to providing an accessible experience for all users.",
  "Accessibility Features",
  "Keyboard navigation support", "Screen reader compatibility", "High contrast mode support",
  "Resizable text without loss of functionality", "Clear, consistent navigation",
  "Feedback", "If you encounter accessibility barriers, please contact us at",
  // Disclaimer modal
  "Accessibility Statement",
  "Important:", "Calgary Konnect is an independent platform and is NOT affiliated with, endorsed by, or connected to the City of Calgary, the Government of Alberta, or any official government body.",
  "Information Accuracy", "While we make every effort to ensure the accuracy of information, we cannot guarantee that all details are current, complete, or error-free. Services, hours, eligibility requirements, and contact information may change without notice.",
  "Your Responsibility", "Always verify information directly with service providers before making decisions or visiting locations. Do not rely solely on information found on this platform for critical decisions.",
  "Emergency Situations", "For emergencies, always call 911. Do not use this platform to seek emergency assistance.",
  "Limitation of Liability", "Calgary Konnect shall not be held liable for any damages arising from the use of information on this platform.",
  // Guidelines
  "Calgary Konnect is built on community trust. Please follow these guidelines to maintain a helpful, respectful platform.",
  "Be Respectful", "Treat all users, service providers, and community members with respect and dignity.",
  "Share Accurate Information", "When suggesting resources or reporting issues, please provide accurate, honest information to help maintain data quality.",
  "Protect Privacy", "Do not share personal information about others without consent. Respect the privacy of service providers and fellow users.",
  "Report Issues", "If you find outdated or incorrect information, please report it so we can update our records.",
  // Volunteer
  "Help us make Calgary Konnect even better! We are always looking for passionate volunteers.",
  "Volunteer Opportunities",
  "Resource Verification", "Help verify and update resource listings in your community.",
  "Translation", "Translate content to help serve diverse communities.",
  "Community Outreach", "Spread the word about Calgary Konnect in your network.",
  "Get Involved", "Contact us at",
  "to learn more about volunteer opportunities.",
  // Partnership
  "Calgary Konnect welcomes partnerships with organizations that share our mission of helping Calgarians access vital services and resources.",
  "Partnership Opportunities",
  "Non-profit organizations seeking to expand their reach",
  "Government agencies looking to improve service delivery",
  "Community organizations wanting to connect with residents",
  "Tech companies interested in civic innovation",
  "Partner With Calgary Konnect",
  "For partnership inquiries and business opportunities, reach out to our team.",
  // Contact
  "Have questions, feedback, or suggestions? We would love to hear from you.",
  "Calgary Konnect is built and maintained right here in Calgary, with a focus on civic innovation and helping every resident find the support they need.",
  "Calgary, Alberta, Canada",
  "Response Time", "We aim to respond to all inquiries within 2-3 business days. For urgent matters, please indicate so in your subject line.",
);

// buildPageContent — called inside ContentModal so t() is current for the active language
function buildPageContent(t: (s: string) => string): Record<string, { title: string; content: React.ReactNode }> {
  return {
    about: {
      title: t("About Calgary Konnect"),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-white/70 leading-relaxed">
            {t("Calgary Konnect exists for one reason: nobody should have to suffer simply because they couldn't find the right door to knock on.")}
          </p>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-sky-500/5 border border-sky-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-[#E1251B]" />
              <h3 className="text-xl font-bold text-white">{t("Why Calgary Needs Calgary Konnect")}</h3>
            </div>
            <p className="text-white/60 leading-relaxed">
              {t("Calgary is one of the most generous cities in Canada. There are food banks, rent-relief funds, free legal clinics, language classes, mental-health lines, and settlement programs for almost every situation. The tragedy isn't that help doesn't exist — it's that the people who need it most can't find it in time.")}
            </p>
          </div>
          <h3 className="text-xl font-bold text-white mt-8">{t("The Problem We Saw")}</h3>
          <p className="text-white/60 leading-relaxed">
            {t("Picture a single mother who just landed in Calgary with two kids and three suitcases. Her English is shaky, her savings are nearly gone, and she has two weeks to find housing before a hotel voucher runs out. The help she needs is out there — but it's scattered across dozens of websites, buried in PDFs, hidden behind phone trees, and written in language she can barely read. By the time she finds the right program, the intake window has closed.")}
          </p>
          <p className="text-white/60 leading-relaxed">
            {t("Picture a senior on a fixed income who eats less so he can afford his medication, never knowing a subsidy program could have covered both. Picture a young worker one missed paycheque away from eviction, unaware that emergency rent support was approved for people exactly like him. These aren't rare stories in Calgary. They happen every single day — not because the city failed them, but because the information never reached them.")}
          </p>
          <h3 className="text-xl font-bold text-white mt-8">{t("Our Solution")}</h3>
          <p className="text-white/60 leading-relaxed">
            {t("Calgary Konnect brings every essential service into one place, in plain language, in the languages our communities actually speak. Instead of searching ten websites, you ask one question and get a clear answer: where to go, who to call, what you qualify for, and what to bring. We turn hours of confusion into a few calm minutes — so help arrives while it still matters.")}
          </p>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#E1251B]/10 to-[#E1251B]/5 border border-[#E1251B]/20">
            <p className="text-white/70 leading-relaxed italic">
              &ldquo;{t("I spent three weeks calling numbers that led nowhere. With Calgary Konnect I found a settlement worker, a food bank near my building, and free English classes — all in one afternoon. For the first time since arriving, I could breathe.")}&rdquo;
            </p>
            <p className="text-white/50 text-sm mt-3">&mdash; {t("A Calgary newcomer, in her own words")}</p>
          </div>
          <h3 className="text-xl font-bold text-white mt-8">{t("Our Mission")}</h3>
          <p className="text-white/60 leading-relaxed">
            {t("To democratize access to information and services for all Calgarians, regardless of background, language, or circumstance. We believe everyone deserves easy access to housing support, employment resources, healthcare information, and community services — before a hard week becomes a crisis.")}
          </p>
          <h3 className="text-xl font-bold text-white mt-8">{t("What We Offer")}</h3>
          <ul className="space-y-3 text-white/60">
            {[
              t("Curated directory of verified Calgary resources and services"),
              t("AI-powered guidance for personalized recommendations"),
              t("Multi-language support for diverse communities"),
              t("Emergency resources and crisis support information"),
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    verification: {
      title: t("How We Verify Resources"),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-white/70 leading-relaxed">
            {t("Every resource on Calgary Konnect undergoes a rigorous verification process to ensure accuracy and reliability.")}
          </p>
          <h3 className="text-xl font-bold text-white">{t("Our Verification Process")}</h3>
          <div className="space-y-4">
            {([
              [t("1. Initial Research"), t("We verify the organization exists through official registries, websites, and public records.")],
              [t("2. Contact Verification"), t("Phone numbers, addresses, and websites are tested to ensure they are current and functional.")],
              [t("3. Service Confirmation"), t("We confirm the services offered, eligibility requirements, and any associated costs.")],
              [t("4. Monthly Reviews"), t("All listings are reviewed monthly to catch closures, changes, or updates.")],
            ] as [string, string][]).map(([h, p]) => (
              <div key={h} className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <h4 className="font-bold text-white mb-2">{h}</h4>
                <p className="text-white/60">{p}</p>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl bg-[#E1251B]/10 border border-[#E1251B]/20 mt-6">
            <p className="text-white/70">
              <strong className="text-[#E1251B]">{t("Note:")}</strong> {t("Despite our best efforts, information can change quickly. Always verify details directly with service providers before visiting.")}
            </p>
          </div>
        </div>
      ),
    },
    terms: {
      title: t("Terms of Service"),
      content: (
        <div className="space-y-6">
          <p className="text-sm text-white/50">{t("Last updated: January 2026")}</p>
          <p className="text-white/70 leading-relaxed">{t("By accessing and using Calgary Konnect, you agree to be bound by these Terms of Service.")}</p>
          {([
            [t("1. Acceptance of Terms"), t("By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.")],
            [t("2. Use of Service"), t("Calgary Konnect provides information about local services and resources. This information is provided for general reference purposes only and should not be considered professional advice.")],
            [t("3. Disclaimer"), t("We are not affiliated with any government body. Information may change without notice. Always verify details directly with service providers. We are not responsible for any decisions made based on information found on this platform.")],
            [t("4. User Conduct"), t("Users agree not to misuse the platform, submit false information, or engage in any activity that could harm the service or other users.")],
          ] as [string, string][]).map(([h, p]) => (
            <React.Fragment key={h}>
              <h3 className="text-xl font-bold text-white">{h}</h3>
              <p className="text-white/60 leading-relaxed">{p}</p>
            </React.Fragment>
          ))}
          <h3 className="text-xl font-bold text-white">{t("5. Contact")}</h3>
          <p className="text-white/60 leading-relaxed">
            {t("For questions about these terms, contact us at")} <a href="mailto:tech@wilglobo.com" className="text-sky-400 font-semibold hover:underline">tech@wilglobo.com</a>
          </p>
        </div>
      ),
    },
    privacy: {
      title: t("Privacy Policy"),
      content: (
        <div className="space-y-6">
          <p className="text-sm text-white/50">{t("Last updated: January 2026")}</p>
          <p className="text-white/70 leading-relaxed">{t("Your privacy is important to us. This policy explains how Calgary Konnect collects, uses, and protects your information.")}</p>
          <h3 className="text-xl font-bold text-white">{t("Information We Collect")}</h3>
          <ul className="space-y-2 text-white/60">
            {[t("Usage data (pages visited, search queries)"), t("Device information (browser type, operating system)"), t("Saved preferences and bookmarks (stored locally)")].map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <h3 className="text-xl font-bold text-white">{t("How We Use Information")}</h3>
          <p className="text-white/60 leading-relaxed">{t("We use collected information to improve our services, provide personalized recommendations, and enhance user experience. We do not sell your personal information to third parties.")}</p>
          <h3 className="text-xl font-bold text-white">{t("Data Security")}</h3>
          <p className="text-white/60 leading-relaxed">{t("We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure.")}</p>
          <h3 className="text-xl font-bold text-white">{t("Contact Us")}</h3>
          <p className="text-white/60 leading-relaxed">
            {t("For privacy-related inquiries, contact")} <a href="mailto:tech@wilglobo.com" className="text-sky-400 font-semibold hover:underline">tech@wilglobo.com</a>
          </p>
        </div>
      ),
    },
    cookies: {
      title: t("Cookie Policy"),
      content: (
        <div className="space-y-6">
          <p className="text-white/70 leading-relaxed">{t("Calgary Konnect uses cookies and similar technologies to enhance your browsing experience.")}</p>
          <h3 className="text-xl font-bold text-white">{t("What Are Cookies?")}</h3>
          <p className="text-white/60 leading-relaxed">{t("Cookies are small text files stored on your device that help websites remember your preferences and improve functionality.")}</p>
          <h3 className="text-xl font-bold text-white">{t("Cookies We Use")}</h3>
          <ul className="space-y-3 text-white/60">
            {([
              [t("Essential cookies:"), t("Required for basic site functionality")],
              [t("Preference cookies:"), t("Remember your settings and choices")],
              [t("Analytics cookies:"), t("Help us understand how you use our site")],
            ] as [string, string][]).map(([label, desc]) => (
              <li key={label} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">{label}</strong> {desc}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-bold text-white">{t("Managing Cookies")}</h3>
          <p className="text-white/60 leading-relaxed">{t("You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.")}</p>
        </div>
      ),
    },
    accessibility: {
      title: t("Accessibility Statement"),
      content: (
        <div className="space-y-6">
          <p className="text-white/70 leading-relaxed">{t("Calgary Konnect is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone.")}</p>
          <h3 className="text-xl font-bold text-white">{t("Our Commitment")}</h3>
          <p className="text-white/60 leading-relaxed">{t("We strive to meet WCAG 2.1 Level AA standards and are committed to providing an accessible experience for all users.")}</p>
          <h3 className="text-xl font-bold text-white">{t("Accessibility Features")}</h3>
          <ul className="space-y-2 text-white/60">
            {[
              t("Keyboard navigation support"), t("Screen reader compatibility"),
              t("High contrast mode support"), t("Resizable text without loss of functionality"),
              t("Clear, consistent navigation"),
            ].map((item) => <li key={item}>- {item}</li>)}
          </ul>
          <h3 className="text-xl font-bold text-white">{t("Feedback")}</h3>
          <p className="text-white/60 leading-relaxed">
            {t("If you encounter accessibility barriers, please contact us at")} <a href="mailto:tech@wilglobo.com" className="text-sky-400 font-semibold hover:underline">tech@wilglobo.com</a>
          </p>
        </div>
      ),
    },
    disclaimer: {
      title: t("Data Disclaimer"),
      content: (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-[#E1251B]/10 border border-[#E1251B]/20">
            <p className="text-white/70 leading-relaxed">
              <strong className="text-[#E1251B]">{t("Important:")}</strong> {t("Calgary Konnect is an independent platform and is NOT affiliated with, endorsed by, or connected to the City of Calgary, the Government of Alberta, or any official government body.")}
            </p>
          </div>
          {([
            [t("Information Accuracy"), t("While we make every effort to ensure the accuracy of information, we cannot guarantee that all details are current, complete, or error-free. Services, hours, eligibility requirements, and contact information may change without notice.")],
            [t("Your Responsibility"), t("Always verify information directly with service providers before making decisions or visiting locations. Do not rely solely on information found on this platform for critical decisions.")],
            [t("Emergency Situations"), t("For emergencies, always call 911. Do not use this platform to seek emergency assistance.")],
            [t("Limitation of Liability"), t("Calgary Konnect shall not be held liable for any damages arising from the use of information on this platform.")],
          ] as [string, string][]).map(([h, p]) => (
            <React.Fragment key={h}>
              <h3 className="text-xl font-bold text-white">{h}</h3>
              <p className="text-white/60 leading-relaxed">{p}</p>
            </React.Fragment>
          ))}
        </div>
      ),
    },
    guidelines: {
      title: t("Community Guidelines"),
      content: (
        <div className="space-y-6">
          <p className="text-white/70 leading-relaxed">{t("Calgary Konnect is built on community trust. Please follow these guidelines to maintain a helpful, respectful platform.")}</p>
          {([
            [t("Be Respectful"), t("Treat all users, service providers, and community members with respect and dignity.")],
            [t("Share Accurate Information"), t("When suggesting resources or reporting issues, please provide accurate, honest information to help maintain data quality.")],
            [t("Protect Privacy"), t("Do not share personal information about others without consent. Respect the privacy of service providers and fellow users.")],
            [t("Report Issues"), t("If you find outdated or incorrect information, please report it so we can update our records.")],
          ] as [string, string][]).map(([h, p]) => (
            <React.Fragment key={h}>
              <h3 className="text-xl font-bold text-white">{h}</h3>
              <p className="text-white/60 leading-relaxed">{p}</p>
            </React.Fragment>
          ))}
        </div>
      ),
    },
    volunteer: {
      title: t("Volunteer With Us"),
      content: (
        <div className="space-y-6">
          <p className="text-white/70 leading-relaxed">{t("Help us make Calgary Konnect even better! We are always looking for passionate volunteers.")}</p>
          <h3 className="text-xl font-bold text-white">{t("Volunteer Opportunities")}</h3>
          <div className="space-y-4">
            {([
              [t("Resource Verification"), t("Help verify and update resource listings in your community.")],
              [t("Translation"), t("Translate content to help serve diverse communities.")],
              [t("Community Outreach"), t("Spread the word about Calgary Konnect in your network.")],
            ] as [string, string][]).map(([h, p]) => (
              <div key={h} className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <h4 className="font-bold text-white mb-2">{h}</h4>
                <p className="text-white/60">{p}</p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold text-white">{t("Get Involved")}</h3>
          <p className="text-white/60 leading-relaxed">
            {t("Contact us at")} <a href="mailto:tech@wilglobo.com" className="text-sky-400 font-semibold hover:underline">tech@wilglobo.com</a> {t("to learn more about volunteer opportunities.")}
          </p>
        </div>
      ),
    },
    partnership: {
      title: t("Partnership Inquiry"),
      content: (
        <div className="space-y-6">
          <p className="text-white/70 leading-relaxed">{t("Calgary Konnect welcomes partnerships with organizations that share our mission of helping Calgarians access vital services and resources.")}</p>
          <h3 className="text-xl font-bold text-white">{t("Partnership Opportunities")}</h3>
          <ul className="space-y-3 text-white/60">
            {[
              t("Non-profit organizations seeking to expand their reach"),
              t("Government agencies looking to improve service delivery"),
              t("Community organizations wanting to connect with residents"),
              t("Tech companies interested in civic innovation"),
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-sky-500/5 border border-sky-500/20 mt-6">
            <h3 className="text-xl font-bold text-white mb-3">{t("Partner With Calgary Konnect")}</h3>
            <p className="text-white/60 mb-4">{t("For partnership inquiries and business opportunities, reach out to our team.")}</p>
            <a href="mailto:tech@wilglobo.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors">
              <Mail className="w-5 h-5" />
              tech@wilglobo.com
            </a>
          </div>
        </div>
      ),
    },
    contact: {
      title: t("Contact Us"),
      content: (
        <div className="space-y-6">
          <p className="text-white/70 leading-relaxed">{t("Have questions, feedback, or suggestions? We would love to hear from you.")}</p>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-sky-500/5 border border-sky-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-[#E1251B]" />
              <h3 className="text-xl font-bold text-white">Calgary Konnect</h3>
            </div>
            <p className="text-white/60 mb-6">{t("Calgary Konnect is built and maintained right here in Calgary, with a focus on civic innovation and helping every resident find the support they need.")}</p>
            <div className="space-y-4">
              <a href="mailto:tech@wilglobo.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-[#E1251B]" />
                <span className="font-semibold">tech@wilglobo.com</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-[#E1251B]" />
                <span>{t("Calgary, Alberta, Canada")}</span>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">{t("Response Time")}</h3>
          <p className="text-white/60 leading-relaxed">{t("We aim to respond to all inquiries within 2-3 business days. For urgent matters, please indicate so in your subject line.")}</p>
        </div>
      ),
    },
  };
}

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
  const { t } = useTranslationContext();
  const pageContent = buildPageContent(t);
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
  // Start all columns open so content is immediately visible on mobile and desktop.
  const [openColumns, setOpenColumns] = useState<Record<string, boolean>>({
    resources: true,
    business: true,
    community: true,
  });

  const tx = useTranslations({
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",
    accessibility: "Accessibility",
    dataDisclaimer: "Data Disclaimer",
    aboutCalgary: "About Calgary Konnect",
    howWeVerify: "How We Verify Resources",
    communityGuidelines: "Community Guidelines",
    listYourBusiness: "List Your Business",
    getFeatured: "Get Featured",
    partnershipInquiry: "Partnership Inquiry",
    volunteerWithUs: "Volunteer With Us",
    contactUs: "Contact Us",
    // Footer section headings
    resources: "Resources",
    forBusinesses: "For Businesses",
    community: "Community",
    importantDisclaimer: "Important Disclaimer",
    disclaimerText: "Calgary Konnect is an independent platform and is not affiliated with, endorsed by, or connected to the City of Calgary, the Government of Alberta, or any official government body. Information provided is for general reference only. Always verify details directly with service providers. For emergencies, call 911.",
    footerTagline: "Everything Calgary. One Place.",
    badgeVerified: "Verified",
    badgeUpdated: "Updated monthly",
    badgeCommunity: "Community-driven",
    badgeFree: "Free to use",
  });

  const openModal = (key: string) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);

  const toggleColumn = (key: string) =>
    setOpenColumns((prev) => ({ ...prev, [key]: !prev[key] }));

  const legalLinks = [
    { label: tx.termsOfService, key: "terms" },
    { label: tx.privacyPolicy, key: "privacy" },
    { label: tx.cookiePolicy, key: "cookies" },
    { label: tx.accessibility, key: "accessibility" },
    { label: tx.dataDisclaimer, key: "disclaimer" },
  ];

  const resourceLinks = [
    { label: tx.aboutCalgary, key: "about" },
    { label: tx.howWeVerify, key: "verification" },
    { label: tx.communityGuidelines, key: "guidelines" },
  ];

  const businessLinks = [
    { label: tx.listYourBusiness, onClick: onOpenSubmitBusiness },
    { label: tx.getFeatured, onClick: onOpenGetFeatured },
    { label: tx.partnershipInquiry, key: "partnership" },
  ];

  const communityLinks = [
    { label: tx.volunteerWithUs, key: "volunteer" },
    { label: tx.contactUs, key: "contact" },
  ];

  return (
    <>
      <footer className="relative">
        {/* Calgary Iconic Skyline — full-width responsive strip, no margin,
            flows directly into the dark footer with no shadow gap. */}
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(140px, 22vw, 240px)" }}>
          <img
            src="/calgary-iconic.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 w-full h-full object-contain object-bottom mix-blend-screen opacity-35 dark:opacity-20 pointer-events-none select-none"
          />
        </div>

        {/* Footer Background - solid dark base */}
        <div className="bg-[#0b1d33] relative overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />

          {/* Badge row — single flex row at all sizes */}
          <div className="relative border-b border-white/[0.04] py-4 px-4 md:px-8 bg-[#0b1d33]">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center justify-around gap-2">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1D4ED8]/15 flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  </div>
                  <span className="text-[11px] font-semibold text-white/70 whitespace-nowrap">{tx.badgeVerified}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#1D4ED8]/15 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  </div>
                  <span className="text-[11px] font-semibold text-white/70 whitespace-nowrap">{tx.badgeUpdated}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#E1251B]/15 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-[#E1251B]" />
                  </div>
                  <span className="text-[11px] font-semibold text-white/70 whitespace-nowrap">{tx.badgeCommunity}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#E1251B]/15 flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 text-[#E1251B]" />
                  </div>
                  <span className="text-[11px] font-semibold text-white/70 whitespace-nowrap">{tx.badgeFree}</span>
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
                  <p className="text-xs text-white/30 mt-3 text-left">{tx.footerTagline}</p>
                </div>

              {/* Link Columns Container */}
              <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-6 md:gap-6">
                {/* Resources Column */}
                <div className="border-b border-white/[0.06] sm:border-none">
                  <button
                    onClick={() => toggleColumn("resources")}
                    className="w-full flex items-center justify-between py-3 sm:py-0 sm:pointer-events-none"
                    aria-expanded={!!openColumns["resources"]}
                  >
                    <h4 className="text-sm font-bold text-white sm:mb-4 sm:pb-2 sm:border-b sm:border-white/[0.06] w-full text-left">{tx.resources}</h4>
                    <ChevronUp
                      className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform sm:hidden ${openColumns["resources"] ? "rotate-0" : "rotate-180"}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openColumns["resources"] && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden space-y-2.5 pb-3 sm:pb-0"
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
                </div>

                {/* For Businesses Column */}
                <div className="border-b border-white/[0.06] sm:border-none">
                  <button
                    onClick={() => toggleColumn("business")}
                    className="w-full flex items-center justify-between py-3 sm:py-0 sm:pointer-events-none"
                    aria-expanded={!!openColumns["business"]}
                  >
                    <h4 className="text-sm font-bold text-white sm:mb-4 sm:pb-2 sm:border-b sm:border-white/[0.06] w-full text-left">{tx.forBusinesses}</h4>
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
                </div>

                {/* Community Column */}
                <div className="border-b border-white/[0.06] sm:border-none">
                  <button
                    onClick={() => toggleColumn("community")}
                    className="w-full flex items-center justify-between py-3 sm:py-0 sm:pointer-events-none"
                    aria-expanded={!!openColumns["community"]}
                  >
                    <h4 className="text-sm font-bold text-white sm:mb-4 sm:pb-2 sm:border-b sm:border-white/[0.06] w-full text-left">{tx.community}</h4>
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
                    <strong className="text-[#E1251B] text-sm font-bold">{tx.importantDisclaimer}</strong>
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
                        {tx.disclaimerText}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {/* Always visible on md+ */}
                  <p className="hidden md:block mt-1 text-sm text-white/60 leading-relaxed">
                    {tx.disclaimerText}
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
              <LanguageToggle />
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
