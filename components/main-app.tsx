"use client";

import React from "react";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { translations } from "@/lib/data";
import { Home, Compass, MessageCircle, Heart, User, AlertTriangle, Shield, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HomeTab from "./tabs/home-tab";
import ExploreTab from "./tabs/explore-tab";
import AITab from "./tabs/ai-tab";
import ShortlistTab from "./tabs/shortlist-tab";
import ProfileTab from "./tabs/profile-tab";
import EmergencyHub from "./emergency-hub";
import RentShield from "./rentshield";

// Animated Calgary Background Component
function CalgaryAmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Aurora Borealis Effect - Top */}
      <div className="absolute top-0 left-0 right-0 h-[60vh]">
        <motion.div
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[10%] w-[40%] h-[50%] bg-gradient-to-br from-[#38BDF8]/20 via-[#0EA5E9]/10 to-transparent rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[10%] right-[5%] w-[35%] h-[40%] bg-gradient-to-bl from-[#06B6D4]/15 via-[#0891B2]/8 to-transparent rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-[5%] left-[40%] w-[30%] h-[35%] bg-gradient-to-b from-[#FBBF24]/8 via-[#F59E0B]/5 to-transparent rounded-full blur-[80px]"
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[
          { left: 5, top: 15, delay: 0, duration: 20 },
          { left: 15, top: 25, delay: 4, duration: 25 },
          { left: 25, top: 10, delay: 2, duration: 22 },
          { left: 40, top: 30, delay: 6, duration: 18 },
          { left: 55, top: 20, delay: 3, duration: 24 },
          { left: 70, top: 35, delay: 8, duration: 20 },
          { left: 80, top: 15, delay: 1, duration: 26 },
          { left: 90, top: 25, delay: 5, duration: 22 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-[#38BDF8] rounded-full"
            style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
          />
        ))}
      </div>

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Bottom Bow River Glow */}
      <motion.div
        animate={{
          opacity: [0.1, 0.18, 0.1],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-[#0EA5E9]/10 via-[#38BDF8]/5 to-transparent"
      />
    </div>
  );
}

export default function MainApp() {
  const { activeTab, setActiveTab, activeLanguage, showEmergency, setShowEmergency } = useAppStore();
  const [showRentShield, setShowRentShield] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const t = (key: string) => translations[key]?.[activeLanguage] || translations[key]?.en || key;

  const navItems = [
    { id: "home" as const, icon: Home, label: "Home", highlight: false },
    { id: "explore" as const, icon: Compass, label: "Explore", highlight: false },
    { id: "ai" as const, icon: MessageCircle, label: "AI Guide", highlight: true },
    { id: "shortlist" as const, icon: Heart, label: "Saved", highlight: false },
    { id: "profile" as const, icon: User, label: "Profile", highlight: false },
  ];

  return (
    <div className="min-h-screen bg-[#07111F] relative">
      {/* Animated Calgary Background */}
      <CalgaryAmbientBackground />

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-white/[0.06] bg-[#07111F]/80 backdrop-blur-2xl px-8 py-10">
          {/* Official Logo */}
          <div className="flex items-center gap-5 px-2">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src="/calgary-connect-logo.png"
                alt="Calgary Connect"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Calgary</h1>
              <h1 className="text-xl font-bold tracking-tight text-[#38BDF8]">Connect</h1>
              <p className="text-xs text-white/50 mt-0.5">Your civic navigator</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex flex-1 flex-col mt-10">
            <ul role="list" className="flex flex-1 flex-col gap-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`group flex w-full items-center gap-x-4 rounded-2xl px-5 py-4 text-base font-medium transition-all duration-300 ${
                      activeTab === item.id
                        ? item.highlight
                          ? "bg-gradient-to-r from-[#38BDF8] to-[#0284c7] text-white shadow-xl shadow-sky-500/30"
                          : "bg-white/10 text-white border border-white/10"
                        : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Sidebar Action Buttons */}
            <div className="mt-auto space-y-4 pt-10 border-t border-white/[0.06]">
              <button
                onClick={() => setShowRentShield(true)}
                className="flex w-full items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/15"
              >
                <Shield className="h-5 w-5 text-[#38BDF8]" />
                RentShield
              </button>
              <button
                onClick={() => setShowEmergency(true)}
                className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-[#E1251B] to-[#c01f17] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02]"
              >
                <AlertTriangle className="h-5 w-5" />
                Emergency Hub
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Header - Hidden on desktop */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#07111F]/90 backdrop-blur-2xl border-b border-white/[0.06] px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src="/calgary-connect-logo.png"
                alt="Calgary Connect"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-lg font-bold text-white">Calgary </span>
              <span className="text-lg font-bold text-[#38BDF8]">Connect</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEmergency(true)}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#E1251B] to-[#c01f17] text-white shadow-lg shadow-red-500/25"
            >
              <AlertTriangle className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#07111F]/95 backdrop-blur-2xl border-l border-white/[0.06] p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mt-10 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-base font-medium transition-all ${
                      activeTab === item.id
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-10 space-y-4 pt-10 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    setShowRentShield(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-sm font-medium text-white/80"
                >
                  <Shield className="h-5 w-5 text-[#38BDF8]" />
                  RentShield
                </button>
                <button
                  onClick={() => {
                    setShowEmergency(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl bg-gradient-to-r from-[#E1251B] to-[#c01f17] px-5 py-4 text-sm font-semibold text-white"
                >
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Hub
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area - With sidebar offset on desktop */}
      <main className="lg:pl-80 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "home" && <HomeTab />}
            {activeTab === "explore" && <ExploreTab />}
            {activeTab === "ai" && <AITab />}
            {activeTab === "shortlist" && <ShortlistTab />}
            {activeTab === "profile" && <ProfileTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07111F]/95 backdrop-blur-2xl border-t border-white/[0.06] safe-area-pb">
        <div className="flex items-center justify-around px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1.5 rounded-xl px-4 py-2.5 transition-all ${
                activeTab === item.id
                  ? item.highlight
                    ? "bg-gradient-to-br from-[#38BDF8] to-[#0284c7] text-white shadow-lg shadow-sky-500/30"
                    : "text-[#38BDF8]"
                  : "text-white/50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Emergency Modal */}
      <AnimatePresence>
        {showEmergency && <EmergencyHub onClose={() => setShowEmergency(false)} />}
      </AnimatePresence>
      
      {/* RentShield Modal */}
      <AnimatePresence>
        {showRentShield && <RentShield onClose={() => setShowRentShield(false)} />}
      </AnimatePresence>
    </div>
  );
}
