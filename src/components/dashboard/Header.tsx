import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Fingerprint, RefreshCw, Menu, X } from "lucide-react";
import { useNostrUser } from "@/hooks/use-nostr-user";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  onOpenConnect: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({ onOpenConnect, activeTab, setActiveTab }: HeaderProps) {
  const { user, logout } = useNostrUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-black bg-[#0d1117]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        {/* Brand Logo - Keep visible on all screen sizes */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight block text-white font-black" style={{ fontFamily: "'Source Code Pro', monospace" }}>
            OSGUILD<span className="text-[#39d353]">.</span>
          </span>
        </div>

        {/* ── DESKTOP NAVIGATION (VISIBLE ON md AND ABOVE) ── */}
        <nav className="hidden md:flex items-center gap-4">
          <div className="flex gap-1 bg-[#010409] p-1 border border-[#30363d]">
            {["Overview", "Projects", "Activity", "Rewards"].map((item) => {
              const isActive = activeTab === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`px-3 py-1.5 text-xs md:text-sm font-bold transition-all border-[2px] cursor-pointer ${
                    isActive
                      ? "border-black bg-[#238636] text-black shadow-[2px_2px_0px_0px_#000000]"
                      : "border-transparent text-[#8b949e] hover:border-[#30363d] hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Connection Trigger Badge */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Optional Nostr Connection Shortcut in Header */}
              {!user.nostr ? (
                <button
                  onClick={onOpenConnect}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-[#30363d] bg-black/40 text-xs font-bold text-[#8b949e] hover:border-[#39d353] hover:text-[#39d353] transition-all cursor-pointer"
                >
                  <Fingerprint className="h-3.5 w-3.5" />
                  Link Nostr
                </button>
              ) : (
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 border border-[#238636] bg-[#238636]/10 text-xs font-mono font-bold text-[#39d353]">
                  <Fingerprint className="h-3.5 w-3.5" />
                  {user.nostr.npub}
                </div>
              )}

              <Button 
                variant="danger" 
                size="sm" 
                onClick={logout}
                className="flex items-center gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={onOpenConnect}
              className="animate-glow flex items-center gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5 text-black" />
              CONNECT
            </Button>
          )}
        </nav>

        {/* ── MOBILE HAMBURGER BUTTON (VISIBLE ONLY ON MOBILE) ── */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="border-2 border-black bg-[#161b22] p-2 text-white shadow-[2px_2px_0px_0px_#000000] hover:border-[#39d353] active:translate-y-0.5 transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

      </div>

      {/* ── MOBILE MENU DRAWER OVERLAY ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="absolute top-16 left-0 right-0 z-50 border-b-[3px] border-black bg-[#0d1117]/98 backdrop-blur-lg p-5 shadow-[0_12px_24px_rgba(0,0,0,0.6)] md:hidden flex flex-col gap-5 max-h-[85vh] overflow-y-auto"
          >
            {/* Logged in User Profile Info - Compact version for mobile menu */}
            {user && (
              <div className="flex items-center gap-3 border-b border-[#30363d] pb-4 mb-1">
                <div className="h-10 w-10 border-2 border-black bg-[#161b22] shadow-[2px_2px_0px_0px_#39d353] overflow-hidden shrink-0 scanlines">
                  {user.github.avatarUrl ? (
                    <img 
                      src={user.github.avatarUrl} 
                      alt={user.github.name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#238636] font-mono font-bold text-xs text-black">
                      {user.github.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-white truncate">
                    {user.github.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#39d353]">
                    @{user.github.username}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Tabs List */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] text-[#484f58] uppercase tracking-wider mb-1">Navigation Panels</span>
              {["Overview", "Projects", "Activity", "Rewards"].map((item) => {
                const isActive = activeTab === item;
                return (
                  <button
                    key={item}
                    onClick={() => handleTabClick(item)}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold border-2 transition-all cursor-pointer ${
                      isActive
                        ? "border-black bg-[#238636] text-black shadow-[2px_2px_0px_0px_#000000]"
                        : "border-[#30363d] bg-black/40 text-[#8b949e] hover:border-[#30363d]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Connection Actions Container */}
            <div className="border-t border-[#30363d] pt-4 flex flex-col gap-3">
              <span className="font-mono text-[9px] text-[#484f58] uppercase tracking-wider">Account Credentials</span>
              
              {user ? (
                <div className="space-y-2.5">
                  {/* Optional Nostr Connection status */}
                  {!user.nostr ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenConnect();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-[#30363d] bg-black/40 text-xs font-bold text-[#8b949e] hover:border-[#39d353] hover:text-[#39d353] transition-all cursor-pointer"
                    >
                      <Fingerprint className="h-4 w-4" />
                      Link Nostr Identity
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#238636] bg-[#238636]/10 text-xs font-mono font-bold text-[#39d353] break-all">
                      <Fingerprint className="h-4 w-4 shrink-0" />
                      {user.nostr.npub.slice(0, 24)}...
                    </div>
                  )}

                  <Button
                    variant="danger"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex justify-center items-center gap-2 py-2.5 shadow-[2px_2px_0px_0px_#000]"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out GitHub
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConnect();
                  }}
                  className="w-full flex justify-center items-center gap-2 py-2.5 shadow-[2px_2px_0px_0px_#000]"
                >
                  <RefreshCw className="h-4 w-4 text-black animate-spin" />
                  CONNECT WORKSPACE
                </Button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
