import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Github, 
  Cpu, 
  Fingerprint, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Key
} from "lucide-react";
import { useNostrUser } from "@/hooks/use-nostr-user";
import { Button } from "@/components/ui/Button";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const { user, startGithubOauth, connectNostr, connectNostrDemo, isLoading } = useNostrUser();

  // Close modal automatically if both GitHub and Nostr are successfully linked
  useEffect(() => {
    if (user && user.nostr && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  const handleGithubLogin = () => {
    startGithubOauth();
  };

  const handleNostrConnect = async () => {
    const success = await connectNostr();
    if (success) {
      onClose();
    }
  };

  const handleDemoConnect = async (type: "satoshi" | "hal" | "guest") => {
    await connectNostrDemo(type);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              // Enforce that they must have connected GitHub before closing
              if (user) onClose();
            }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative z-10 w-full max-w-md border-[3px] border-black bg-[#0d1117] p-6 shadow-[8px_8px_0px_0px_#238636] md:p-8"
          >
            {/* Close Button - Only clickable if logged in via GitHub */}
            {user && (
              <button
                onClick={onClose}
                disabled={isLoading}
                className="absolute top-4 right-4 border-[2px] border-black bg-[#161b22] p-1.5 text-[#8b949e] hover:border-[#f85149] hover:text-[#f85149] transition-all disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* LOADING / EXCHANGING SIGNALS STATE */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-[#39d353]" />
                <p className="mt-4 font-mono text-sm text-[#39d353] animate-pulse">
                  {!user ? "Exchanging secure GitHub OAuth key..." : "Binding cryptographic Nostr key..."}
                </p>
              </div>
            ) : (
              <div>
                {/* STAGE 1: REAL GITHUB OAUTH SIGN IN (REQUIRED) */}
                {!user ? (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#39d353] shadow-[2px_2px_0px_0px_#000]">
                        <Github className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight text-white uppercase">CONNECT WORKSPACE</h2>
                        <p className="font-mono text-xs text-[#8b949e]">Step 1: Load GitHub repositories</p>
                      </div>
                    </div>

                    <div className="border border-[#30363d] bg-black/40 p-4 font-mono text-xs text-[#8b949e] leading-relaxed space-y-2">
                      <p className="text-white font-bold flex items-center gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5 text-[#39d353]" />
                        GitHub OAuth Connection Required
                      </p>
                      <p>
                        All dashboard elements are rendered as live proxy items mapping to active repositories. Connect via official GitHub OAuth to securely synchronize your workspace.
                      </p>
                    </div>

                    {/* Official OAuth Button */}
                    <Button
                      onClick={handleGithubLogin}
                      className="w-full flex justify-center items-center gap-3 py-4 text-base font-black uppercase text-black shadow-[4px_4px_0px_0px_#000]"
                    >
                      <Github className="h-5 w-5 fill-black text-black" />
                      SIGN IN WITH GITHUB
                      <ArrowRight className="h-4 w-4 text-black" />
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] text-[#484f58] uppercase tracking-wider">
                      <Key className="h-3.5 w-3.5" />
                      Secure client-side session authentication
                    </div>
                  </div>
                ) : !user.nostr ? (
                  /* STAGE 2: OPTIONAL NOSTR CRYPTOGRAPHIC KEY BINDING - Only show if not already linked */
                  <div>
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#39d353] shadow-[2px_2px_0px_0px_#000]">
                        <Fingerprint className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight text-[#39d353] uppercase">BIND NOSTR KEY</h2>
                        <p className="font-mono text-xs text-[#8b949e]">Step 2: Cryptographic Identity (Optional)</p>
                      </div>
                    </div>

                    <div className="mb-6 border border-[#238636]/40 bg-[#238636]/5 p-3.5 text-xs text-[#8b949e] font-mono leading-relaxed flex items-start gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-[#39d353] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#39d353] font-bold">GitHub workspace successfully loaded!</span>
                        <p className="mt-1">
                          You can now optionally connect your cryptographic Nostr identity. Nostr secures public key branding, developer team certificates, and decentralized badges.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Real Nostr Extension */}
                      <button
                        onClick={handleNostrConnect}
                        className="w-full flex items-center justify-between border-[3px] border-black bg-[#161b22] p-4 text-left shadow-[3px_3px_0px_0px_#000000] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#39d353] hover:border-[#39d353] group cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#39d353]/10 border border-[#39d353]/30">
                            <Cpu className="h-5 w-5 text-[#39d353]" />
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-[#39d353]">Nostr Extension</p>
                            <p className="font-mono text-[10px] text-[#8b949e]">Browser wallet key signature (Alby)</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-[#8b949e] group-hover:text-[#39d353] transition-transform group-hover:translate-x-1" />
                      </button>

                      <div className="relative py-1 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#30363d]"></div></div>
                        <span className="relative bg-[#0d1117] px-3 font-mono text-[10px] text-[#484f58] uppercase">sandbox identities</span>
                      </div>

                      {/* Sandbox Cypherpunk Identities */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleDemoConnect("satoshi")}
                          className="flex flex-col items-center justify-center border-2 border-black bg-[#161b22] p-2.5 text-center transition-all hover:bg-[#010409] hover:border-[#39d353] group cursor-pointer"
                        >
                          <span className="font-black text-xs text-white group-hover:text-[#39d353]">Satoshi</span>
                          <span className="font-mono text-[9px] text-[#8b949e]">Bitcoin Creator</span>
                        </button>

                        <button
                          onClick={() => handleDemoConnect("hal")}
                          className="flex flex-col items-center justify-center border-2 border-black bg-[#161b22] p-2.5 text-center transition-all hover:bg-[#010409] hover:border-[#39d353] group cursor-pointer"
                        >
                          <span className="font-black text-xs text-white group-hover:text-[#39d353]">Hal Finney</span>
                          <span className="font-mono text-[9px] text-[#8b949e]">Cryptographer</span>
                        </button>
                      </div>

                      {/* SKIP BUTTON */}
                      <div className="pt-2 flex gap-3">
                        <button
                          onClick={onClose}
                          className="w-full border-2 border-[#30363d] bg-black/40 py-2.5 font-bold font-mono text-xs text-[#8b949e] hover:border-white hover:text-white transition-all cursor-pointer"
                        >
                          Proceed Without Nostr
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* WORKSPACE FULLY BOUND SUCCESS STATE */
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#238636]/20 border-[3px] border-[#39d353] mb-4">
                      <ShieldCheck className="h-8 w-8 text-[#39d353]" />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase">WORKSPACE SECURED</h3>
                    <p className="font-mono text-xs text-[#8b949e] mt-2 max-w-xs leading-relaxed">
                      GitHub and Nostr connections are both linked. Enjoy the fully secured developer workspace!
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
