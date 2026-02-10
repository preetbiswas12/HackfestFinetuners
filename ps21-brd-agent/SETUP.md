# 🚀 Quick Start Guide - PS21 BRD Agent

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

---

## 📥 Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/simplysandeepp/ps21-brd-agent.git

# Navigate to project folder
cd ps21-brd-agent
```

---

## 🎯 Running the Frontend

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Framer Motion (animations)
- Lucide React (icons)
- date-fns

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Visit: **http://localhost:3000**

---

## 🎨 Features You'll See

### 1. Landing Page
- Modern glassmorphism design
- Feature showcase
- "How It Works" section

### 2. Login (Demo Mode)
- Enter **ANY email/password**
- No backend needed - uses localStorage
- Automatic authentication

### 3. Dashboard
- View all projects
- Create new projects
- Project statistics

### 4. Project Workspace (3 Tabs)
- **Data Sources**: Ingestion panel with live logs
- **Agent Orchestrator**: 4 AI agents workflow
- **BRD Editor**: Document editor with AI assistant

### 5. Profile Page
- Edit profile
- Connect 6 data sources (Gmail, Slack, Teams, etc.)
- Ingestion statistics

### 6. Analytics
- Conflict Detection
- Requirement Traceability
- Stakeholder Sentiment

---

## 🛠️ Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js 14 App Router pages
│   │   ├── page.tsx        # Landing page
│   │   ├── login/          # Login page
│   │   ├── dashboard/      # Dashboard
│   │   ├── profile/        # User profile
│   │   ├── project/        # Project workspace
│   │   ├── analytics/      # Analytics pages
│   │   └── settings/       # Settings page
│   │
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── layout/         # Layout components (Sidebar, TopBar, etc.)
│   │   ├── ui/             # UI components (Badge, Button, etc.)
│   │   └── workspace/      # Workspace components
│   │
│   ├── store/              # Zustand state management
│   │   ├── useAuthStore.ts
│   │   ├── useProjectStore.ts
│   │   ├── useIntegrationStore.ts
│   │   └── useBRDStore.ts
│   │
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   │
│   └── styles/             # Global styles
│       └── globals.css
│
├── public/                 # Static assets
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind CSS config
└── next.config.js         # Next.js config
```

---

## 🎯 Key Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Mac/Linux
killall node
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clean build
rm -rf .next
npm run build
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done)
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import `simplysandeepp/ps21-brd-agent`
   - Set **Root Directory**: `frontend`
   - Click Deploy

3. **Get Live URL**
   - Example: `https://ps21-brd-agent.vercel.app`

---

## 📝 Demo Credentials

**Email**: Any email (e.g., demo@example.com)  
**Password**: Any password

All data is stored in browser localStorage (no backend needed).

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🆘 Need Help?

- Check the [WORKFLOW-tree.md](./WORKFLOW-tree.md) for app navigation
- Review the codebase in `frontend/src/`
- All pages are in `frontend/src/app/`

---

**Built with ❤️ for HackFest 2.0**
