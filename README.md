# OSGUILD. Dashboard

Dashboard built as a standalone **React 19 + TypeScript + Vite** Single Page Application (SPA). Powered by **Tailwind CSS v4**, official **GitHub OAuth**, and **Nostr Cryptographic Identity bindings** (NIP-07), this interface provides an environment to manage collaborative FOSS projects, track curriculum progressions, and claim Lightning-routed Bitcoin incentives.

---

## 📂 Project Directory Map

```
Dashboard/
├── src/
│   ├── assets/                 # SVGs and core brand logos
│   ├── components/
│   │   ├── dashboard/          # Specialized Dashboard modules
│   │   │   ├── AchievementBanner.tsx  # XP, Levels & mini claims card
│   │   │   ├── ActivitySection.tsx   # Paginated commit timeline
│   │   │   ├── ConnectModal.tsx       # Dual GitHub/Nostr identity portal
│   │   │   ├── Header.tsx             # Nav bar and glassmorphic mobile drawer
│   │   │   ├── ProfileSection.tsx     # Sidebar with persistent bio editor
│   │   │   ├── ProjectSection.tsx     # Grid of starable featured FOSS repositories
│   │   │   └── RewardsSection.tsx     # Satoshi ledgers & curriculum tracker
│   │   └── ui/                 # Reusable neo-brutalist primitives
│   │       ├── Button.tsx             # 3D clickable spring buttons
│   │       └── Card.tsx               # Cards with sharp green glow borders
│   ├── hooks/
│   │   └── use-nostr-user.tsx  # Auth state manager context & session cache
│   ├── lib/
│   │   ├── nostr-user.ts       # Nostr cryptographic typings
│   │   └── utils.ts            # Dynamic className combination (cn)
│   ├── App.tsx                 # Grid coordinate entrypoint and SPA router
│   ├── index.css               # Google fonts, keyframe animations, & Tailwind v4
│   └── main.tsx                # SPA bootstrap
├── tsconfig.app.json           # Path resolution paths configuration (@/*)
├── vite.config.ts              # Vite configurations with dev token proxy & Tailwind
└── package.json                # Project dependencies manifest
```

---

## 🛠️ Local Development & Settings

### 1. Environment Configurations
Configure the following keys in your local environment file: `Dashboard/.env.local`

```bash
# Obtain these from your GitHub Developer Settings OAuth Application
VITE_GITHUB_CLIENT_ID="your_client_id_here"
VITE_GITHUB_CLIENT_SECRET="your_client_secret_here"
```

*Note: Make sure your GitHub Developer application's Authorization Callback URL is configured exactly to: `http://localhost:5173/api/auth/callback/github`.*

### 2. Launch Developer Server
```bash
# Navigate to Dashboard folder
cd Dashboard

# Install dependencies
pnpm install

# Run the HMR hot reloading local environment
pnpm dev
```
Open `http://localhost:5173` inside your browser.

### 3. Compile Production Bundle
To execute standard type checking and generate clean, highly-optimized production-ready bundles inside `dist/`:
```bash
pnpm build
```

---

## 🎨 Styling Guidelines (Neo-Brutalist Cypherpunk)
The application maintains a disciplined, professional, and engineering-centric theme system:
* **Branding Typography**: `Source Code Pro` (monospaced headers) combined with `Geist Mono` & `Inter`.
* **Standard Harmony Palette**: Strict Black (`#010409` / `#0d1117`), standard Green accents (`#39d353` / `#238636`), and high-contrast White `#ffffff` text elements.
* **Tactile Feedback**: Interactive buttons utilize 3D spring animations depressing borders on active clicks.
