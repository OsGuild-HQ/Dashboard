import { createContext, useContext, useState, useEffect } from "react";
import type { NostrUser, NostrProfile } from "@/lib/nostr-user";

type NostrContextType = {
  user: NostrUser | null;
  isLoading: boolean;
  logout: () => void;
  startGithubOauth: () => void;
  connectNostr: () => Promise<boolean>;
  connectNostrDemo: (type: "satoshi" | "hal" | "guest") => Promise<void>;
  disconnectNostr: () => void;
};

const NostrUserContext = createContext<NostrContextType | null>(null);

const STORAGE_KEY = "os_guild_auth_user_v3";

declare global {
  interface Window {
    nostr?: {
      getPublicKey: () => Promise<string>;
      signEvent: (event: any) => Promise<any>;
    };
  }
}

export function NostrUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<NostrUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate credentials on mount and handle OAuth redirects
  useEffect(() => {
    const handleAuthLifecycle = async () => {
      try {
        setIsLoading(true);
        
        // 1. Hydrate user from localStorage first
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }

        // 2. Parse OAuth callback queries if present
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const code = params.get("code");
          const isCallback = window.location.pathname === "/api/auth/callback/github" || window.location.pathname.startsWith("/api/auth/callback/github");

          if (isCallback && code) {
            const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
            const clientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;

            if (!clientId || !clientSecret) {
              throw new Error("GitHub Client Credentials missing in .env.local!");
            }

            // Request Token Exchange via the Vite proxy route
            const tokenRes = await fetch("/api/github-token", {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
              }),
            });

            if (!tokenRes.ok) {
              throw new Error("Token exchange request failed.");
            }

            const tokenData = await tokenRes.json();
            if (tokenData.error) {
              throw new Error(tokenData.error_description || tokenData.error);
            }

            const accessToken = tokenData.access_token;
            if (!accessToken) {
              throw new Error("No access token received from GitHub.");
            }

            // Fetch authenticated user profile data
            const userRes = await fetch("https://api.github.com/user", {
              headers: {
                "Authorization": `Bearer ${accessToken}`,
              },
            });

            if (!userRes.ok) {
              throw new Error("Failed to load GitHub user profile details.");
            }

            const data = await userRes.json();
            
            const userObj: NostrUser = {
              github: {
                username: data.login,
                name: data.name || data.login,
                avatarUrl: data.avatar_url,
                publicRepos: data.public_repos || 0,
              },
              nostr: null,
            };

            setUser(userObj);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
            
            // Clean up address bar query parameters cleanly
            window.history.replaceState(null, "", "/");
          }
        }
      } catch (err: any) {
        console.error("Authentication callback failure:", err);
        alert(`OAuth Authorization Error: ${err.message || String(err)}`);
        window.history.replaceState(null, "", "/");
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthLifecycle();
  }, []);

  const saveUser = (updatedUser: NostrUser | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const logout = () => {
    saveUser(null);
  };

  // Redirect client to official GitHub OAuth service
  const startGithubOauth = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    if (!clientId) {
      alert("Missing VITE_GITHUB_CLIENT_ID in your .env.local file!");
      return;
    }
    const redirectUri = `${window.location.origin}/api/auth/callback/github`;
    const authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=read:user`;
    
    setIsLoading(true);
    window.location.href = authorizeUrl;
  };

  // Connect Nostr NIP-07 extension
  const connectNostr = async (): Promise<boolean> => {
    if (!user) return false;
    if (typeof window === "undefined") return false;
    
    if (window.nostr) {
      try {
        setIsLoading(true);
        const pubkey = await window.nostr.getPublicKey();
        const shortKey = `${pubkey.slice(0, 8)}...${pubkey.slice(-8)}`;
        
        const nostrProfile: NostrProfile = {
          pubkey,
          npub: shortKey,
          name: "Nostr Dev",
          groups: ["Nostr Developer", "Core Contributor"],
        };

        saveUser({
          ...user,
          nostr: nostrProfile,
        });
        return true;
      } catch (err) {
        console.error("Nostr extension connection rejected:", err);
        return false;
      } finally {
        setIsLoading(false);
      }
    } else {
      return false;
    }
  };

  // Bind Sandbox Cypherpunk Nostr identity
  const connectNostrDemo = async (
    type: "satoshi" | "hal" | "guest"
  ): Promise<void> => {
    if (!user) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    let nostrProfile: NostrProfile;

    if (type === "satoshi") {
      nostrProfile = {
        pubkey: "npub1satoshi5738c829xmdl38459...",
        npub: "npub1sato...829x",
        name: "Satoshi Nakamoto",
        groups: ["Creator", "Bitcoin Protocol"],
      };
    } else if (type === "hal") {
      nostrProfile = {
        pubkey: "npub1halfinney839d8x72kdmsla...",
        npub: "npub1half...dmsl",
        name: "Hal Finney",
        groups: ["Core Cryptographer", "Fedimint"],
      };
    } else {
      nostrProfile = {
        pubkey: "npub1guestdev938xksmqlsodms...",
        npub: "npub1gues...odms",
        name: "Guest Dev",
        groups: ["OS Contributor"],
      };
    }

    saveUser({
      ...user,
      nostr: nostrProfile,
    });
    setIsLoading(false);
  };

  // Unlink Nostr
  const disconnectNostr = () => {
    if (!user) return;
    saveUser({
      ...user,
      nostr: null,
    });
  };

  return (
    <NostrUserContext.Provider
      value={{
        user,
        isLoading,
        logout,
        startGithubOauth,
        connectNostr,
        connectNostrDemo,
        disconnectNostr,
      }}
    >
      {children}
    </NostrUserContext.Provider>
  );
}

export function useNostrUser() {
  const context = useContext(NostrUserContext);
  if (!context) {
    throw new Error("useNostrUser must be used within a NostrUserProvider");
  }
  return context;
}
