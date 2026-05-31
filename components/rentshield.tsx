"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, FileText, Calculator, AlertCircle, CheckCircle, ExternalLink, Phone } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface RentShieldProps {
  onClose: () => void;
}

type Tool = "rights" | "rent-check" | "lease-help" | null;

export default function RentShield({ onClose }: RentShieldProps) {
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const { addRentShieldResult } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-lg rounded-3xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">RentShield</h2>
              <p className="text-sm text-[var(--foreground-muted)]">Tenant rights & support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--surface)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {!activeTool && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <p className="text-[var(--foreground-muted)] mb-6">
                  Understand your rights as a tenant in Alberta. Get quick answers and know what to do.
                </p>

                <ToolCard
                  icon={FileText}
                  title="Know Your Rights"
                  description="Quick guide to tenant rights in Alberta"
                  onClick={() => setActiveTool("rights")}
                />
                <ToolCard
                  icon={Calculator}
                  title="Rent Increase Checker"
                  description="Check if your rent increase is legal"
                  onClick={() => setActiveTool("rent-check")}
                />
                <ToolCard
                  icon={AlertCircle}
                  title="Lease Help"
                  description="Understand common lease terms"
                  onClick={() => setActiveTool("lease-help")}
                />

                {/* Emergency Contact */}
                <div className="mt-6 p-4 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/30">
                  <p className="text-sm font-medium text-[var(--secondary)] mb-2">
                    Need immediate help?
                  </p>
                  <a
                    href="tel:403-234-9266"
                    className="flex items-center gap-2 text-sm text-white hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    Calgary Legal Guidance: 403-234-9266
                  </a>
                </div>
              </motion.div>
            )}

            {activeTool === "rights" && (
              <TenantRights onBack={() => setActiveTool(null)} />
            )}

            {activeTool === "rent-check" && (
              <RentChecker onBack={() => setActiveTool(null)} onResult={addRentShieldResult} />
            )}

            {activeTool === "lease-help" && (
              <LeaseHelp onBack={() => setActiveTool(null)} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ToolCard({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="w-full glass-card rounded-xl p-4 text-left flex items-center gap-4 card-hover"
    >
      <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/15 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-[#0ea5e9]" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold mb-0.5">{title}</h3>
        <p className="text-sm text-[var(--foreground-muted)]">{description}</p>
      </div>
    </motion.button>
  );
}

function TenantRights({ onBack }: { onBack: () => void }) {
  const rights = [
    {
      title: "Notice for Rent Increases",
      content: "Landlords must give at least 3 months written notice before increasing rent. No limit on how much, but must be in writing.",
    },
    {
      title: "Right to Privacy",
      content: "Landlord must give 24 hours written notice before entering, except in emergencies.",
    },
    {
      title: "Security Deposit",
      content: "Maximum one month's rent. Must be returned within 10 days of moving out (minus any legitimate deductions).",
    },
    {
      title: "Repairs & Maintenance",
      content: "Landlord must maintain the property in a safe, livable condition. Report issues in writing.",
    },
    {
      title: "Eviction Rules",
      content: "Landlord needs valid reason and proper written notice. You can dispute unfair evictions through RTDRS.",
    },
    {
      title: "Discrimination Protection",
      content: "Landlords cannot discriminate based on race, religion, family status, disability, or other protected grounds.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <button
        onClick={onBack}
        className="text-sm text-[#0ea5e9] mb-4 hover:underline"
      >
        &larr; Back to tools
      </button>
      
      <h3 className="text-xl font-bold mb-4">Your Rights as a Tenant</h3>
      
      <div className="space-y-4">
        {rights.map((right, index) => (
          <div key={index} className="glass-card rounded-xl p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {right.title}
            </h4>
            <p className="text-sm text-[var(--foreground-muted)]">{right.content}</p>
          </div>
        ))}
      </div>

      <a
        href="https://www.alberta.ca/residential-tenancies"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-6 text-sm text-[#0ea5e9] hover:underline"
      >
        <ExternalLink className="w-4 h-4" />
        Full Alberta Tenant Rights Guide
      </a>
    </motion.div>
  );
}

function RentChecker({ onBack, onResult }: { onBack: () => void; onResult: (type: string, result: string) => void }) {
  const [currentRent, setCurrentRent] = useState("");
  const [newRent, setNewRent] = useState("");
  const [noticeGiven, setNoticeGiven] = useState<"yes" | "no" | null>(null);
  const [result, setResult] = useState<"valid" | "invalid" | null>(null);

  const checkIncrease = () => {
    const increase = ((Number(newRent) - Number(currentRent)) / Number(currentRent)) * 100;
    
    if (noticeGiven === "no") {
      setResult("invalid");
      onResult("rent-check", "invalid-notice");
    } else if (increase > 50) {
      setResult("invalid");
      onResult("rent-check", "excessive-increase");
    } else {
      setResult("valid");
      onResult("rent-check", "valid");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <button
        onClick={onBack}
        className="text-sm text-[#0ea5e9] mb-4 hover:underline"
      >
        &larr; Back to tools
      </button>
      
      <h3 className="text-xl font-bold mb-2">Rent Increase Checker</h3>
      <p className="text-sm text-[var(--foreground-muted)] mb-6">
        Check if your rent increase follows Alberta rules
      </p>

      {!result ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Monthly Rent ($)</label>
            <input
              type="number"
              value={currentRent}
              onChange={(e) => setCurrentRent(e.target.value)}
              placeholder="e.g., 1500"
              className="input-premium w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">New Monthly Rent ($)</label>
            <input
              type="number"
              value={newRent}
              onChange={(e) => setNewRent(e.target.value)}
              placeholder="e.g., 1700"
              className="input-premium w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Did you receive written notice at least 3 months in advance?</label>
            <div className="flex gap-3">
              <button
                onClick={() => setNoticeGiven("yes")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  noticeGiven === "yes"
                    ? "bg-green-500/20 text-green-500 border border-green-500/30"
                    : "bg-[var(--surface)] border border-[var(--border)]"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setNoticeGiven("no")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  noticeGiven === "no"
                    ? "bg-red-500/20 text-red-500 border border-red-500/30"
                    : "bg-[var(--surface)] border border-[var(--border)]"
                }`}
              >
                No
              </button>
            </div>
          </div>

          <button
            onClick={checkIncrease}
            disabled={!currentRent || !newRent || !noticeGiven}
            className="w-full btn-primary py-3 rounded-xl font-medium disabled:opacity-50"
          >
            Check My Increase
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-6 rounded-xl text-center ${
            result === "valid" 
              ? "bg-green-500/15 border border-green-500/30" 
              : "bg-red-500/15 border border-red-500/30"
          }`}>
            {result === "valid" ? (
              <>
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <h4 className="text-lg font-semibold text-green-500 mb-2">Appears Valid</h4>
                <p className="text-sm text-[var(--foreground-muted)]">
                  Based on your answers, this rent increase appears to follow Alberta rules.
                  The increase is {(((Number(newRent) - Number(currentRent)) / Number(currentRent)) * 100).toFixed(1)}%.
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-red-500" />
                <h4 className="text-lg font-semibold text-red-500 mb-2">Potential Issue</h4>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {noticeGiven === "no" 
                    ? "Landlords must give at least 3 months written notice. This increase may not be valid."
                    : "This increase seems unusually high. Consider contacting Calgary Legal Guidance for advice."
                  }
                </p>
              </>
            )}
          </div>

          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <p className="text-xs text-[var(--foreground-muted)] mb-2">Need help?</p>
            <a
              href="tel:403-234-9266"
              className="flex items-center gap-2 text-sm text-[#0ea5e9]"
            >
              <Phone className="w-4 h-4" />
              Calgary Legal Guidance: 403-234-9266
            </a>
          </div>

          <button
            onClick={() => {
              setResult(null);
              setCurrentRent("");
              setNewRent("");
              setNoticeGiven(null);
            }}
            className="w-full py-3 rounded-xl font-medium bg-[var(--surface)] border border-[var(--border)]"
          >
            Check Another Increase
          </button>
        </div>
      )}
    </motion.div>
  );
}

function LeaseHelp({ onBack }: { onBack: () => void }) {
  const terms = [
    {
      term: "Fixed-Term Lease",
      meaning: "A lease for a specific period (e.g., 1 year). Cannot be ended early without penalty unless both parties agree.",
    },
    {
      term: "Month-to-Month",
      meaning: "Continues until either party gives proper notice. More flexible but rent can increase with 3 months notice.",
    },
    {
      term: "Security Deposit",
      meaning: "Maximum one month's rent. Cannot be used for last month's rent. Must be returned within 10 days of move-out.",
    },
    {
      term: "Quiet Enjoyment",
      meaning: "Your right to live peacefully without unreasonable disturbance from the landlord.",
    },
    {
      term: "Joint & Several Liability",
      meaning: "If you have roommates, each person is responsible for the full rent if others don't pay.",
    },
    {
      term: "Subletting",
      meaning: "Renting your place to someone else temporarily. Usually requires landlord's written approval.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <button
        onClick={onBack}
        className="text-sm text-[#0ea5e9] mb-4 hover:underline"
      >
        &larr; Back to tools
      </button>
      
      <h3 className="text-xl font-bold mb-2">Lease Terms Explained</h3>
      <p className="text-sm text-[var(--foreground-muted)] mb-6">
        Common lease terms in plain language
      </p>

      <div className="space-y-3">
        {terms.map((item, index) => (
          <div key={index} className="glass-card rounded-xl p-4">
            <h4 className="font-semibold text-[#0ea5e9] mb-1">{item.term}</h4>
            <p className="text-sm text-[var(--foreground-muted)]">{item.meaning}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30">
        <p className="text-sm text-[#f59e0b] font-medium mb-1">Tip</p>
        <p className="text-sm text-[var(--foreground-muted)]">
          Always read your entire lease before signing. If something is unclear, ask for clarification in writing.
        </p>
      </div>
    </motion.div>
  );
}
