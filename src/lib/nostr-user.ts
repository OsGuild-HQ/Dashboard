export type GitHubProfile = {
  username: string;
  name: string;
  avatarUrl: string;
  publicRepos: number;
};

export type NostrProfile = {
  pubkey: string;
  npub: string;
  name: string;
  groups: string[];
};

export type NostrUser = {
  github: GitHubProfile;
  nostr: NostrProfile | null;
};

export const MOCK_CHANNELS = [
  "os-guild/ui",
  "neo-wallet/core",
  "architect-bot/engine",
  "fedimint-modules",
];
