import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  Terminal, 
  Fingerprint, 
  ShieldAlert, 
  Github,
  Pencil
} from "lucide-react";
import { useNostrUser } from "@/hooks/use-nostr-user";
import { Button } from "@/components/ui/Button";

interface ProfileSectionProps {
  onOpenConnect: () => void;
}

export function ProfileSection({ onOpenConnect }: ProfileSectionProps) {
  const { user, disconnectNostr } = useNostrUser();

  // Decoupled layouts fallback (in case they bypass the blur overlay)
  const githubUser = user?.github ?? {
    username: "guest_dev",
    name: "Guest Developer",
    avatarUrl: "",
    publicRepos: 0
  };

  const hasNostr = !!user?.nostr;
  const displayName = githubUser.name;
  const githubHandle = `@${githubUser.username}`;

  // Custom biography state persisted per unique developer handle
  const storageKey = `os_guild_bio_${githubUser.username}`;
  
  const defaultBio = hasNostr && user?.nostr?.groups.includes("Creator") 
    ? "Creator of Bitcoin. Building the decentralized future. Full-stack engineer focusing on Bitcoin protocols, cryptography, and open systems."
    : hasNostr && user?.nostr?.groups.includes("Core Cryptographer")
    ? "Core Cryptographer. Pioneer of zero-knowledge proofs, privacy protocols, and decentralized peer-to-peer cash networks."
    : "Building the decentralized future. Full-stack engineer focusing on Bitcoin protocols, cryptography, and open systems.";

  const [bio, setBio] = useState(() => {
    return localStorage.getItem(storageKey) || defaultBio;
  });

  const [bioText, setBioText] = useState(bio);
  const [isEditingBio, setIsEditingBio] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setBio(saved);
      setBioText(saved);
    } else {
      setBio(defaultBio);
      setBioText(defaultBio);
    }
  }, [githubUser.username, hasNostr]);

  const handleSaveBio = () => {
    localStorage.setItem(storageKey, bioText);
    setBio(bioText);
    setIsEditingBio(false);
  };

  // Deterministic cyber color for avatars
  const getDeterministicColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = ["#238636", "#1f6feb", "#ab7df8", "#da3633", "#d29922"];
    return colors[Math.abs(hash) % colors.length];
  };

  const bgColor = getDeterministicColor(displayName);
  const repoCount = user ? githubUser.publicRepos : 42; // Real GitHub repo count!

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="lg:sticky lg:top-24 w-full border-[3px] border-black bg-[#0d1117] p-5 md:p-6 shadow-[4px_4px_0px_0px_#238636] lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none space-y-5 lg:space-y-6 flex flex-col items-stretch"
    >
      
      {/* Responsive layout: avatar next to name on mobile/tablet */}
      <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-6">
        
        {/* Avatar Card - Scales from h-24 on mobile to h-36 on desktop */}
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 lg:h-36 lg:w-36 border-[3px] lg:border-[4px] border-black bg-[#161b22] shadow-[4px_4px_0px_0px_#39d353] lg:shadow-[6px_6px_0px_0px_#39d353] overflow-hidden shrink-0 group scanlines">
          {githubUser.avatarUrl ? (
            <img 
              src={githubUser.avatarUrl} 
              alt={displayName} 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div 
              className="flex h-full w-full flex-col items-center justify-center text-black font-black text-3xl lg:text-4xl font-mono select-none"
              style={{ backgroundColor: bgColor }}
            >
              {displayName.slice(0, 2).toUpperCase()}
            </div>
          )}
          
          {/* Verification Status Overlay Badge */}
          <div className="absolute top-1 lg:top-2 right-1 lg:right-2 z-10 border border-black bg-[#0d1117] px-1 lg:px-1.5 py-0.5 font-mono text-[7px] lg:text-[8px] font-bold text-[#39d353] flex items-center gap-0.5 lg:gap-1 shadow-[1px_1px_0px_0px_#000]">
            <Github className="h-2.5 w-2.5" />
            <span className="hidden sm:inline">GITHUB</span> LINKED
          </div>
        </div>

        {/* Profile Descriptions */}
        <div className="space-y-1 lg:space-y-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white line-clamp-2 leading-tight flex items-center gap-2">
            {displayName}
          </h1>
          <p className="inline-block border-[2px] border-black bg-[#161b22] px-2 py-0.5 font-mono text-[10px] lg:text-xs text-[#39d353] shadow-[1.5px_1.5px_0px_0px_#000000] hover:text-white transition-colors">
            <a href={`https://github.com/${githubUser.username}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <Github className="h-3 w-3" />
              {githubHandle}
            </a>
          </p>
        </div>

      </div>

      {/* Cryptographic Nostr Section */}
      <div className="border-[3px] border-black bg-[#0d1117] p-4 shadow-[3px_3px_0px_0px_#000000]">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-2 mb-3">
          <span className="font-mono text-[10px] lg:text-xs font-bold text-[#8b949e] flex items-center gap-1">
            <Fingerprint className="h-3.5 w-3.5" />
            NOSTR IDENTITY
          </span>
          {hasNostr && (
            <button 
              onClick={disconnectNostr}
              className="font-mono text-[9px] font-bold text-[#f85149] hover:underline cursor-pointer border-none bg-transparent"
            >
              unlink
            </button>
          )}
        </div>

        {hasNostr ? (
          <div className="space-y-3 font-mono">
            <div className="text-xs break-all text-[#c9d1d9] bg-black/40 border border-[#30363d] p-2 leading-relaxed">
              <span className="text-[#39d353] font-bold">npub:</span> {user?.nostr?.pubkey.slice(0, 16)}...
            </div>
            
            {/* Custom cryptographic groups */}
            <div className="flex flex-wrap gap-1.5">
              {user?.nostr?.groups.map(g => (
                <span 
                  key={g}
                  className="border border-[#238636] bg-[#238636]/15 px-2 py-0.5 text-[9px] font-bold text-[#39d353]"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#8b949e] flex items-center gap-1.5 animate-pulse">
              <ShieldAlert className="h-4 w-4 text-[#f85149]" />
              UNBOUND CRYPTO TAG
            </div>
            <button
              onClick={onOpenConnect}
              className="w-full flex justify-center items-center gap-1.5 border-2 border-dashed border-[#30363d] bg-black/30 py-2 text-xs font-mono font-bold text-[#8b949e] hover:border-[#39d353] hover:text-[#39d353] hover:bg-[#39d353]/5 transition-all cursor-pointer"
            >
              <Fingerprint className="h-3.5 w-3.5" />
              BIND NOSTR KEY
            </button>
          </div>
        )}
      </div>

      {/* Bio biography - Smaller font on mobile with inline custom edit section */}
      {isEditingBio ? (
        <div className="space-y-3">
          <textarea
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            maxLength={250}
            rows={3}
            className="w-full border-2 border-black bg-black/60 p-2.5 font-mono text-xs text-[#39d353] focus:border-[#39d353] focus:outline-none placeholder-[#484f58] shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.8)]"
            placeholder="Write your cypherpunk developer bio..."
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setBioText(bio);
                setIsEditingBio(false);
              }}
              className="px-2.5 py-1 border border-[#30363d] bg-black/40 text-[10px] font-mono font-bold text-[#8b949e] hover:border-[#f85149] hover:text-[#f85149] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveBio}
              className="px-2.5 py-1 border-2 border-black bg-[#238636] text-[10px] font-mono font-bold text-black shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-[#39d353] active:translate-y-0.5 active:shadow-[0.5px_0.5px_0px_0px_#000] transition-all cursor-pointer"
            >
              Save Bio
            </button>
          </div>
        </div>
      ) : (
        <div className="group/bio relative">
          <p className="text-xs lg:text-sm leading-relaxed text-[#c9d1d9] font-medium pr-6">
            {bio}
          </p>
          <button
            onClick={() => setIsEditingBio(true)}
            className="absolute top-0 right-0 p-1 opacity-0 group-hover/bio:opacity-100 focus:opacity-100 text-[#8b949e] hover:text-[#39d353] transition-all cursor-pointer"
            title="Edit Description"
          >
            <span className="sr-only">Edit Description</span>
            <Pencil className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          variant="primary" 
          className="flex-1 flex justify-center items-center gap-2"
          onClick={() => window.open("https://github.com/OsGuild-HQ", "_blank")}
        >
          <ExternalLink className="h-4 w-4" />
          VIEW ORG
        </Button>
        <Button 
          variant="secondary"
          className="px-4"
          onClick={() => alert("Decrypting open secure channel event packets...")}
        >
          <Terminal className="h-4 w-4" />
        </Button>
      </div>

      {/* Statistics Block */}
      <div className="flex flex-wrap gap-x-6 gap-y-4 border-t-[3px] border-black/30 pt-6">
        <div>
          <p className="text-2xl lg:text-3xl font-black text-white">{repoCount}</p>
          <p className="mt-0.5 text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">Repos</p>
        </div>
        <div>
          <p className="text-2xl lg:text-3xl font-black text-[#39d353]">8.4k</p>
          <p className="mt-0.5 text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">Contribs</p>
        </div>
        <div>
          <p className="text-2xl lg:text-3xl font-black text-white">110k</p>
          <p className="mt-0.5 text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">Sats Earned</p>
        </div>
      </div>
    </motion.div>
  );
}
