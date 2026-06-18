import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Coins,
  Wallet,
  Check,
  Loader2
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const INITIAL_EARNINGS_LEDGER = [
  {
    id: 1,
    repo: "neo-wallet/core",
    contribution: "feat: add lightning channel management",
    sats: 50000,
    status: "claimed",
    time: "5h ago",
  },
  {
    id: 2,
    repo: "os-guild/ui",
    contribution: "refactor: simplify dashboard components",
    sats: 35000,
    status: "claimed",
    time: "2h ago",
  },
  {
    id: 3,
    repo: "architect-bot/engine",
    contribution: "Approved pull request #42",
    sats: 25000,
    status: "claimable",
    time: "1d ago",
  },
  {
    id: 4,
    repo: "fedimint-modules/banking",
    contribution: "docs: update self-custodial banking guides",
    sats: 15000,
    status: "pending",
    time: "Just now",
  },
];

export function RewardsSection() {
  const [ledger, setLedger] = useState(INITIAL_EARNINGS_LEDGER);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Earning Calculations
  const claimedTotal = ledger
    .filter(item => item.status === "claimed")
    .reduce((sum, item) => sum + item.sats, 0);

  const claimableTotal = ledger
    .filter(item => item.status === "claimable")
    .reduce((sum, item) => sum + item.sats, 0);

  const pendingTotal = ledger
    .filter(item => item.status === "pending")
    .reduce((sum, item) => sum + item.sats, 0);

  const handleClaim = () => {
    if (claimableTotal <= 0 || claimLoading) return;

    setClaimLoading(true);
    setTimeout(() => {
      setLedger(prev =>
        prev.map(item =>
          item.status === "claimable" ? { ...item, status: "claimed" } : item
        )
      );
      setClaimLoading(false);
      setClaimSuccess(true);
      setTimeout(() => setClaimSuccess(false), 3000);
    }, 1500);
  };

  // 6-Week Foundation Pathway Steps
  const PATHWAY_WEEKS = [
    { week: 1, title: "Orientation", status: "complete" },
    { week: 2, title: "Git Codeflows", status: "complete" },
    { week: 3, title: "Contrib Sprints", status: "complete" },
    { week: 4, title: "Active Issues", status: "active" },
    { week: 5, title: "Btrust Prep", status: "locked" },
    { week: 6, title: "Graduation", status: "locked" },
  ];

  return (
    <div className="space-y-12">
      {/* SECTION HEADER */}
      <div className="flex items-end justify-between border-b-[3px] border-black pb-4">
        <h2 className="flex items-center gap-3 text-2xl font-black text-white">
          <span className="inline-block h-3.5 w-3.5 border-2 border-black bg-[#39d353]" />
          Career Track & Rewards
        </h2>
        <span className="font-mono text-xs text-[#39d353] font-black border border-[#238636]/40 bg-[#238636]/5 px-2 py-0.5">
          GENESIS COHORT (APRIL 2026)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: SATOSHI LEDGER CARD (COL-SPAN-7) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-4 sm:p-6 border-[3px] border-black bg-[#0d1117]" glowColor="green">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-mono text-xs font-bold text-[#8b949e] uppercase tracking-widest flex items-center gap-1.5">
                  <Coins className="h-4 w-4 text-[#39d353]" />
                  Bitcoin Incentive Ledger
                </h3>
                <p className="text-3xl sm:text-4xl font-black mt-2 text-white flex items-baseline gap-1.5">
                  {(claimedTotal + claimableTotal).toLocaleString()}
                  <span className="text-lg font-bold text-[#39d353] uppercase">Sats</span>
                </p>
              </div>

              {/* Claim Action */}
              <div className="w-full sm:w-auto flex justify-stretch">
                <AnimatePresence mode="wait">
                  {claimSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center justify-center gap-1 w-full px-3 py-1.5 border border-[#39d353] bg-[#238636]/10 text-xs font-bold text-[#39d353]"
                    >
                      <Check className="h-4 w-4" />
                      CLAIMED!
                    </motion.div>
                  ) : (
                    <Button
                      key="claim-btn"
                      onClick={handleClaim}
                      disabled={claimableTotal <= 0 || claimLoading}
                      variant="primary"
                      size="sm"
                      className="w-full sm:w-auto bg-[#238636] hover:bg-[#39d353] text-black border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-[1px_1px_0px_0px_#000]"
                    >
                      {claimLoading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-black" />
                      ) : (
                        <Wallet className="h-3.5 w-3.5 text-black" />
                      )}
                      <span>CLAIM {claimableTotal.toLocaleString()} SATS</span>
                    </Button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Balances Sub-Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-[#30363d] pt-4 mb-4">
              <div>
                <span className="font-mono text-[10px] text-[#8b949e] uppercase">Sats Claimed</span>
                <p className="text-lg sm:text-xl font-bold text-white mt-1">{claimedTotal.toLocaleString()} sats</p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#8b949e] uppercase">Pending Approval</span>
                <p className="text-lg sm:text-xl font-bold text-[#c9d1d9] mt-1 flex items-center gap-1.5">
                  {pendingTotal.toLocaleString()} sats
                  <Clock className="h-4 w-4 text-[#8b949e] animate-pulse" />
                </p>
              </div>
            </div>
          </Card>

          {/* Earning Payout History List */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-[#8b949e] uppercase tracking-wider">Verified Payout Ledger</h4>
            
            <div className="border-[3px] border-black bg-[#0d1117] divide-y-2 divide-black">
              {ledger.map((item) => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 hover:bg-black/10 transition-colors">
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#8b949e] block">{item.repo}</span>
                    <span className="text-xs sm:text-sm font-bold text-white block truncate">{item.contribution}</span>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t border-[#30363d] sm:border-t-0 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="font-black text-xs sm:text-sm text-[#39d353] block">+{item.sats.toLocaleString()} sats</span>
                      <span className="font-mono text-[8px] sm:text-[9px] text-[#8b949e] block">{item.time}</span>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {item.status === "claimed" && (
                        <span className="border border-[#238636]/40 bg-[#238636]/10 px-2 py-0.5 text-[9px] font-bold text-[#39d353]">
                          CLAIMED
                        </span>
                      )}
                      {item.status === "claimable" && (
                        <span className="border border-[#39d353]/40 bg-[#238636]/10 px-2 py-0.5 text-[9px] font-bold text-[#39d353] animate-pulse">
                          CLAIMABLE
                        </span>
                      )}
                      {item.status === "pending" && (
                        <span className="border border-[#30363d] bg-black/40 px-2 py-0.5 text-[9px] font-bold text-[#8b949e]">
                          PENDING
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 6-WEEK PATHWAY TRACKER CARD (COL-SPAN-5) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 border-[3px] border-black bg-[#0d1117]" glowColor="green">
            <h3 className="font-mono text-xs font-bold text-[#8b949e] uppercase tracking-widest flex items-center gap-1.5 mb-6">
              <Award className="h-4 w-4 text-[#39d353]" />
              Pathway Milestones
            </h3>

            {/* Current Active Stage Display */}
            <div className="mb-6 p-4 border-2 border-black bg-[#161b22] shadow-[3px_3px_0px_0px_#000] relative overflow-hidden">
              <div className="absolute top-2 right-2 border border-black bg-[#238636]/20 px-2 py-0.5 font-mono text-[8px] text-[#39d353] font-bold">
                ACTIVE TRACK
              </div>
              <span className="font-mono text-[10px] text-[#8b949e] block uppercase">Current Stage</span>
              <span className="text-xl font-black text-white block mt-1">Stage 1: Foundation</span>
              <span className="font-mono text-xs text-[#39d353] block mt-1.5 font-bold">Week 4 of 6 Pathway Program</span>
            </div>

            {/* Pathway Timeline Steps */}
            <div className="relative pl-6 ml-2 border-l-2 border-black/40 space-y-6 py-1">
              {PATHWAY_WEEKS.map((step) => (
                <div key={step.week} className="relative flex items-center justify-between">
                  {/* Visual bullet points */}
                  <div className={`absolute -left-[33px] flex h-5 w-5 items-center justify-center border-2 border-black font-mono text-[10px] font-bold shadow-[1px_1px_0px_0px_#000] ${
                    step.status === "complete" 
                      ? "bg-[#238636] text-black" 
                      : step.status === "active"
                      ? "bg-[#39d353] text-black animate-pulse"
                      : "bg-[#161b22] text-[#484f58]"
                  }`}>
                    {step.week}
                  </div>

                  <div>
                    <span className="font-bold text-sm text-white block leading-tight">{step.title}</span>
                    <span className="font-mono text-[9px] text-[#8b949e] block uppercase">Week {step.week}</span>
                  </div>

                  <div>
                    {step.status === "complete" && (
                      <CheckCircle2 className="h-4 w-4 text-[#39d353]" />
                    )}
                    {step.status === "active" && (
                      <TrendingUp className="h-4 w-4 text-[#39d353]" />
                    )}
                    {step.status === "locked" && (
                      <Clock className="h-4 w-4 text-[#484f58]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
