"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronRight,
  Shield,
  FileText,
  AlertCircle,
  Heart,
  Building2,
  Users
} from "lucide-react";

interface FooterProps {
  onOpenSubmitBusiness?: () => void;
  onOpenGetFeatured?: () => void;
}

export default function Footer({ onOpenSubmitBusiness, onOpenGetFeatured }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Data Disclaimer", href: "/disclaimer" },
  ];

  const resourceLinks = [
    { label: "About Calgary Connect", href: "/about" },
    { label: "How We Verify Resources", href: "/verification" },
    { label: "Report an Issue", href: "/report" },
    { label: "Suggest a Resource", href: "/suggest" },
    { label: "API Access", href: "/api" },
  ];

  const businessLinks = [
    { label: "List Your Business", onClick: onOpenSubmitBusiness },
    { label: "Get Featured", onClick: onOpenGetFeatured },
    { label: "Partnership Inquiry", href: "/partnership" },
    { label: "Advertising", href: "/advertise" },
    { label: "Sponsorship", href: "/sponsor" },
  ];

  const communityLinks = [
    { label: "Community Guidelines", href: "/guidelines" },
    { label: "Volunteer With Us", href: "/volunteer" },
    { label: "Donate", href: "/donate" },
    { label: "Press & Media", href: "/press" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
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

              <p className="text-base text-white/50 leading-relaxed mb-8 max-w-md">
                Calgary Connect is a free civic resource platform helping Calgarians find services, 
                support, and opportunities. We are not affiliated with the City of Calgary or any 
                government agency.
              </p>

              <div className="space-y-4 text-sm text-white/50">
                <a href="mailto:hello@calgaryconnect.ca" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@calgaryconnect.ca
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
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.label}
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 transition-opacity" />
                    </a>
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
                      <a
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
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
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
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
              platform and is not affiliated with, endorsed by, or connected to the City of Calgary, the Government 
              of Alberta, or any official government body. Information provided is for general reference only. 
              Always verify details directly with service providers. For emergencies, call 911. We do not guarantee 
              the accuracy, completeness, or timeliness of any information.
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
                <a
                  href={link.href}
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
                {index < legalLinks.length - 1 && (
                  <span className="text-white/20 hidden lg:inline">|</span>
                )}
              </span>
            ))}
          </div>

          <p className="text-sm text-white/40">
            &copy; {currentYear} Calgary Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
