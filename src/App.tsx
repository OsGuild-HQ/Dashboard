import { useState, useEffect } from "react";
import { NostrUserProvider, useNostrUser } from "@/hooks/use-nostr-user";
import { Header } from "@/components/dashboard/Header";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { ProjectSection } from "@/components/dashboard/ProjectSection";
import { ActivitySection } from "@/components/dashboard/ActivitySection";
import { ConnectModal } from "@/components/dashboard/ConnectModal";
import { RewardsSection } from "@/components/dashboard/RewardsSection";
import { AchievementBanner } from "@/components/dashboard/AchievementBanner";

function DashboardApp() {
  const { user } = useNostrUser();
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  // Force connect dialog open if no GitHub workspace is linked
  useEffect(() => {
    if (!user) {
      setIsConnectOpen(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#010409] font-sans text-white selection:bg-[#39d353] selection:text-black pb-12 relative overflow-hidden">
      {/* Background overlay when loading first step */}
      {!user && (
        <div className="fixed inset-0 bg-black/40 z-30 pointer-events-none transition-opacity duration-300" />
      )}

      {/* Main Container - Blurred if not connected */}
      <div className={`transition-all duration-500 ${!user ? "filter blur-[6px] pointer-events-none scale-[0.98]" : "blur-0 scale-100"}`}>
        {/* Sticky Navigation Header */}
        <Header 
          onOpenConnect={() => setIsConnectOpen(true)} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Main Content Layout Grid */}
        <main className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
          
          {/* Left Column: Profile Card - Hidden on mobile viewports to allow selected panels to fill screen */}
          <div className="hidden lg:block lg:col-span-4">
            <ProfileSection onOpenConnect={() => setIsConnectOpen(true)} />
          </div>

          {/* Right Column: Tab View Panels - Expand to full width on mobile */}
          <div className="space-y-12 lg:space-y-16 lg:col-span-8 w-full">
            {activeTab === "Overview" && (
              <>
                <AchievementBanner />
                <ProjectSection />
                <ActivitySection />
              </>
            )}

            {activeTab === "Projects" && (
              <ProjectSection />
            )}

            {activeTab === "Activity" && (
              <ActivitySection />
            )}

            {activeTab === "Rewards" && (
              <RewardsSection />
            )}
          </div>
        </main>
      </div>

      {/* Spring Animated Connect Modal */}
      <ConnectModal 
        isOpen={isConnectOpen} 
        onClose={() => setIsConnectOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <NostrUserProvider>
      <DashboardApp />
    </NostrUserProvider>
  );
}
