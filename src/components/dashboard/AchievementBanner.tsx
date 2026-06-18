import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Coins, 
  GitPullRequest, 
  Flame, 
  Wallet, 
  Loader2, 
  Check, 
  Sparkles,
  Zap
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function AchievementBanner() {
  const [claimableSats, setClaimableSats] = useState(25000);
  const [claimedSats, setClaimedSats] = useState(85000);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Stats constants
  const contributionsCount = 15;
  const totalSatsEarned = claimedSats + claimableSats;
  const satsPerContribution = Math.round(totalSatsEarned / contributionsCount);

  // User Levels Details
  const userLevel = 3;
  const levelTitle = "Cypherpunk Builder";
  const currentXP = 2400;
  const nextLevelXP = 3000;
  const xpPercentage = (currentXP / nextLevelXP) * 100;

  const handleClaim = () => {
    if (claimableSats <= 0 || claimLoading) return;
    setClaimLoading(true);
    setTimeout(() => {
      setClaimedSats(prev => prev + claimableSats);
      setClaimableSats(0);
      setClaimLoading(false);
      setClaimSuccess(true);
      setTimeout(() => setClaimSuccess(false), 3000);
    }, 1500);
  };

  return (
    <Card 
      className="p-4 sm:p-6 border-[3px] border-black bg-[#0d1117] shadow-[6px_6px_0px_0px_#238636] relative overflow-hidden"
      glowColor="green"
    >
      {/* Background Matrix Pattern Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Retro achievement badge overlay - Hidden on mobile to prevent collisions */}
      <div className="absolute top-0 right-0 border-l-[3px] border-b-[3px] border-black bg-[#39d353]/10 px-3 py-1 font-mono text-[9px] font-bold text-[#39d353] tracking-widest hidden sm:flex items-center gap-1">
        <Sparkles className="h-3 w-3" />
        OSGUILD VERIFIED ACHIEVEMENT
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* LEFT COLUMN: LEVEL METERS & XP PROGRESS (COL-SPAN-6) */}
        <div className="lg:col-span-6 space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#238636] shadow-[2px_2px_0px_0px_#000] text-black">
              <Trophy className="h-5 w-5 stroke-[2.5] text-white" />
            </div>
            <div>
              <span className="font-mono text-[8px] text-[#8b949e] uppercase tracking-widest block">DEVELOPER PROGRESSION</span>
              <h3 className="text-base font-black text-white flex items-center gap-1.5 leading-none mt-1">
                Level {userLevel}: <span className="text-[#39d353]">{levelTitle}</span>
              </h3>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] sm:text-xs font-mono font-bold text-[#8b949e]">
              <span>CURRICULUM EXPERIENCE</span>
              <span className="text-white">{currentXP} / {nextLevelXP} XP</span>
            </div>
            <div className="h-5 w-full border-2 border-black bg-black/40 p-0.5 shadow-[1px_1px_0px_0px_#ffffff20]">
              <div 
                className="h-full bg-gradient-to-r from-[#238636] to-[#39d353] border border-black transition-all duration-1000 flex items-center justify-end pr-2 text-[8px] font-black text-black font-mono"
                style={{ width: `${xpPercentage}%` }}
              >
                {Math.round(xpPercentage)}%
              </div>
            </div>
            <p className="font-mono text-[9px] text-[#8b949e] leading-relaxed">
              Earn <span className="text-[#39d353] font-bold">600 more XP</span> by completing Step 4 (Active Issues Contribution Sprint) to level up!
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: FANCY UI STATS GRID (COL-SPAN-6) */}
        <div className="lg:col-span-6 grid grid-cols-3 gap-2 sm:gap-3 relative z-10">
          
          {/* STAT CARD 1: CONTRIBUTIONS COUNT */}
          <div className="border-2 border-black bg-[#161b22] p-2 sm:p-3 text-center shadow-[2px_2px_0px_0px_#000000] hover:-translate-y-0.5 transition-transform group">
            <div className="mx-auto flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/5 border border-white/10 mb-1.5 sm:mb-2">
              <GitPullRequest className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] text-[#8b949e] uppercase block">Contribs</span>
            <span className="text-xs sm:text-sm md:text-base font-black text-white block mt-0.5 leading-none">{contributionsCount}</span>
          </div>

          {/* STAT CARD 2: TOTAL SATS EARNED */}
          <div className="border-2 border-black bg-[#161b22] p-2 sm:p-3 text-center shadow-[2px_2px_0px_0px_#000000] hover:-translate-y-0.5 transition-transform group relative">
            <div className="mx-auto flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[#39d353]/10 border border-[#39d353]/20 mb-1.5 sm:mb-2">
              <Coins className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#39d353] group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] text-[#8b949e] uppercase block">Total Sats</span>
            <span className="text-xs sm:text-sm md:text-base font-black text-[#39d353] block mt-0.5 leading-none">{totalSatsEarned.toLocaleString()}</span>
          </div>

          {/* STAT CARD 3: SATS PER CONTRIBUTION */}
          <div className="border-2 border-black bg-[#161b22] p-2 sm:p-3 text-center shadow-[2px_2px_0px_0px_#000000] hover:-translate-y-0.5 transition-transform group">
            <div className="mx-auto flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/5 border border-white/10 mb-1.5 sm:mb-2">
              <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#c9d1d9] group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] text-[#8b949e] uppercase block">Sats/PR</span>
            <span className="text-xs sm:text-sm md:text-base font-black text-white block mt-0.5 leading-none">{satsPerContribution.toLocaleString()}</span>
          </div>

        </div>

      </div>

      {/* LOWER ROW: INTEGRATED MINI LIGHTNING CLAIM BAR */}
      <div className="mt-5 border-t border-[#30363d] pt-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e] justify-center sm:justify-start">
          <Zap className="h-4 w-4 text-[#39d353] fill-[#39d353] animate-pulse shrink-0" />
          <span className="text-center sm:text-left">Claimable: <strong className="text-white">{claimableSats.toLocaleString()} Sats</strong></span>
        </div>

        <div className="flex justify-stretch w-full sm:w-auto">
          <AnimatePresence mode="wait">
            {claimSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center gap-1 w-full px-4 py-2 border border-[#39d353] bg-[#238636]/10 text-xs font-mono font-bold text-[#39d353]"
              >
                <Check className="h-4 w-4" />
                SATS ROUTED!
              </motion.div>
            ) : (
              <Button
                onClick={handleClaim}
                disabled={claimableSats <= 0 || claimLoading}
                variant="primary"
                size="sm"
                className="w-full sm:w-auto bg-[#238636] hover:bg-[#39d353] text-black border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] flex items-center justify-center gap-1.5"
              >
                {claimLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-black" />
                ) : (
                  <Wallet className="h-3.5 w-3.5 text-black" />
                )}
                <span>CLAIM TO WALLET</span>
              </Button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
