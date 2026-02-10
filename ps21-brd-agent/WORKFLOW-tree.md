# PS21 BRD Agent - Complete Workflow Tree 🗺️

## 📊 Application Navigation Flow

```
🏠 / (Landing Page - Public)
│
├─ Features showcase
├─ "How It Works" section
└─ Login button → /login
                    │
                    ↓
                 🔐 /login (Authentication)
                    │
                    ├─ Email/Password form
                    └─ Demo mode (any credentials) → /dashboard
                                                        │
                                                        ↓
════════════════════════════════════════════════════════════════════
                    🏢 PROTECTED ROUTES (Post-Login)
════════════════════════════════════════════════════════════════════

📈 /dashboard (Main Dashboard)
│
├─ Stats Cards
│   ├─ Total Projects
│   ├─ Drafts in Progress
│   └─ Completed BRDs
│
├─ Project Table
│   ├─ View project details
│   ├─ Edit/Delete actions
│   └─ Click project → /project/[id]
│
└─ New Project button → /project/new

─────────────────────────────────────────────────────────────────

👤 /profile (User Profile & Data Sources)
│
├─ User Profile Header
│   ├─ Avatar
│   ├─ Name, Email, Role
│   └─ Edit Profile button → Modal
│       ├─ Edit Name
│       ├─ Edit Email
│       └─ Save Changes
│
├─ Data Ingestion Sources (6 cards)
│   ├─ 📧 Gmail
│   │   ├─ Connection status
│   │   ├─ Email Address field
│   │   ├─ Filter Rules field
│   │   └─ Connect/Disconnect button
│   │
│   ├─ 💬 Slack
│   │   ├─ Connection status
│   │   ├─ Workspace URL field
│   │   ├─ Channel Access field
│   │   └─ Connect/Disconnect button
│   │
│   ├─ 👥 MS Teams
│   │   ├─ Connection status
│   │   ├─ Team ID field
│   │   ├─ Channel Selection field
│   │   └─ Connect/Disconnect button
│   │
│   ├─ 🎥 Meetings (Fireflies)
│   │   ├─ Connection status
│   │   ├─ Account Email field
│   │   ├─ Auto-Record field
│   │   └─ Connect/Disconnect button
│   │
│   ├─ 📄 Documents
│   │   ├─ Connection status
│   │   ├─ Storage Location field
│   │   ├─ Auto-Scan field
│   │   └─ Connect/Disconnect button
│   │
│   └─ 📅 Calendar
│       ├─ Connection status
│       ├─ Calendar Access field
│       ├─ Event Keywords field
│       └─ Connect/Disconnect button
│
└─ Ingestion Statistics
    ├─ Active Sources count
    ├─ Items Collected (1,247)
    ├─ Relevant Content (89%)
    └─ Data Synced (3.2 GB)

─────────────────────────────────────────────────────────────────

📁 /project/[id] (Project Workspace - 3 Tabs)
│
├─ Tab 1: Data Sources (Ingestion Panel)
│   │
│   ├─ Left Panel: Active Connectors
│   │   ├─ Gmail status
│   │   ├─ Slack status
│   │   ├─ Fireflies status
│   │   ├─ MS Teams status
│   │   ├─ File Upload Area
│   │   └─ Start Ingestion button
│   │
│   └─ Right Panel: Live Ingestion Log
│       ├─ Terminal-style console
│       ├─ Real-time log messages
│       └─ Progress indicators
│
├─ Tab 2: Agent Orchestrator (AI Workflow)
│   │
│   ├─ 4 AI Agent Cards
│   │   ├─ 📥 Ingestion Agent
│   │   │   ├─ Status: Idle/Working/Done
│   │   │   └─ Progress indicator
│   │   │
│   │   ├─ 🗂️ Structure Agent
│   │   │   ├─ Status: Idle/Working/Done
│   │   │   └─ Progress indicator
│   │   │
│   │   ├─ ✓ Validation Agent
│   │   │   ├─ Status: Idle/Working/Done
│   │   │   └─ Progress indicator
│   │   │
│   │   └─ ✍️ Writing Agent
│   │       ├─ Status: Idle/Working/Done
│   │       └─ Progress indicator
│   │
│   ├─ Run BRD Generation button
│   │
│   └─ Thought Process Feed
│       ├─ Sequential agent logs
│       ├─ Real-time updates
│       └─ Completion status
│
└─ Tab 3: BRD Editor (Document Editing)
    │
    ├─ Left Panel: Document Outline (8 sections)
    │   ├─ Executive Summary
    │   ├─ Business Objectives
    │   ├─ Stakeholder Analysis
    │   ├─ Functional Requirements
    │   ├─ Non-Functional Requirements
    │   ├─ Assumptions & Constraints
    │   ├─ Success Metrics
    │   └─ Timeline & Milestones
    │
    ├─ Center Panel: Rich Text Editor
    │   ├─ Formatting toolbar
    │   │   ├─ Bold
    │   │   ├─ Italic
    │   │   └─ List
    │   ├─ Content textarea
    │   ├─ AI Generate button
    │   └─ Export PDF button
    │
    └─ Right Panel: Citations & AI (2 sub-tabs)
        │
        ├─ Citations Tab
        │   ├─ Source evidence list
        │   ├─ Link icons
        │   ├─ Add citation buttons
        │   └─ Sample citations
        │
        └─ AI Assistant Tab
            ├─ AI prompt input
            ├─ Send button
            └─ Quick Actions
                ├─ "Expand this section"
                ├─ "Add more technical details"
                ├─ "Simplify language"
                └─ "Add success criteria"

─────────────────────────────────────────────────────────────────

⚙️ /settings (Integration Management)
│
├─ Integration Cards (4 services)
│   │
│   ├─ Gmail
│   │   ├─ Connection status
│   │   ├─ Last sync time
│   │   ├─ Auto-sync toggle
│   │   ├─ Email field
│   │   ├─ Filter rules
│   │   └─ Sync Now / Disconnect button
│   │
│   ├─ Slack
│   │   ├─ Connection status
│   │   ├─ Last sync time
│   │   ├─ Auto-sync toggle
│   │   ├─ Workspace field
│   │   ├─ Channels to monitor
│   │   └─ Sync Now / Disconnect button
│   │
│   ├─ Fireflies.ai
│   │   ├─ Connection status
│   │   ├─ Last sync time
│   │   ├─ Auto-sync toggle
│   │   ├─ Account email
│   │   └─ Sync Now / Disconnect button
│   │
│   └─ MS Teams
│       ├─ Connection status
│       ├─ Last sync time
│       ├─ Auto-sync toggle
│       ├─ Team ID
│       ├─ Channels
│       └─ Sync Now / Disconnect button
│
└─ General Preferences
    ├─ Notifications toggle
    ├─ Auto-save toggle
    └─ Theme selector

─────────────────────────────────────────────────────────────────

📊 /analytics (Analytics Dashboard - 3 Pages)
│
├─ /analytics/conflicts (Conflict Detection)
│   │
│   ├─ Summary Stats
│   │   ├─ Total Conflicts (2)
│   │   ├─ Unresolved (2)
│   │   └─ Resolved (0)
│   │
│   └─ Conflict Cards
│       ├─ Severity badge (High/Medium/Low)
│       ├─ Requirement A vs Requirement B
│       ├─ Source attribution
│       ├─ AI recommendation
│       └─ Mark Resolved button
│
├─ /analytics/traceability (Requirement Traceability)
│   │
│   ├─ Summary Stats
│   │   ├─ Total Requirements (5)
│   │   ├─ Total Sources (5)
│   │   ├─ Test Cases (8)
│   │   └─ Coverage % (94%)
│   │
│   └─ Traceability Matrix
│       ├─ Requirements (rows)
│       ├─ Sources (columns)
│       ├─ Test Cases (columns)
│       ├─ Link indicators (●)
│       └─ Status badges
│
└─ /analytics/sentiment (Stakeholder Sentiment)
    │
    ├─ Overall Project Confidence
    │   ├─ Score: 72%
    │   └─ Trend: Stable →
    │
    ├─ Stakeholder Cards (4 groups)
    │   ├─ Engineering Team
    │   │   ├─ Confidence: 75% ↑
    │   │   └─ Concerns: Timeline
    │   │
    │   ├─ Product Team
    │   │   ├─ Confidence: 85% ↑
    │   │   └─ Concerns: Budget
    │   │
    │   ├─ Executive Leadership
    │   │   ├─ Confidence: 60% ↓
    │   │   └─ Concerns: ROI, Timeline
    │   │
    │   └─ Sales Team
    │       ├─ Confidence: 70% →
    │       └─ Concerns: Budget
    │
    └─ Topic Analysis
        ├─ Timeline Feasibility
        │   ├─ Positive: 45%
        │   ├─ Neutral: 30%
        │   └─ Negative: 25%
        │
        ├─ Budget Allocation
        │   ├─ Positive: 55%
        │   ├─ Neutral: 25%
        │   └─ Negative: 20%
        │
        └─ Technical Approach
            ├─ Positive: 70%
            ├─ Neutral: 20%
            └─ Negative: 10%

─────────────────────────────────────────────────────────────────

📄 /templates (BRD Templates)
│
└─ Template gallery (placeholder for future)

─────────────────────────────────────────────────────────────────

➕ /project/new (Create New Project)
│
└─ Project creation form
    ├─ Project name
    ├─ Description
    ├─ Category
    └─ Create button → /project/[new-id]

════════════════════════════════════════════════════════════════════
```

## 🎯 User Flow Summary

1. **Landing** → Login with any credentials
2. **Dashboard** → View/Create projects
3. **Profile** → Connect data sources (Gmail, Slack, etc.)
4. **Project Workspace** → 3-tab workflow:
   - Ingest data from sources
   - Run AI agents to generate BRD
   - Edit BRD with AI assistant
5. **Analytics** → Monitor conflicts, traceability, sentiment
6. **Settings** → Manage integration sync preferences

## 🔐 Authentication

- **Public Routes:** `/`, `/login`
- **Protected Routes:** Everything else
- **Demo Mode:** Login with any email/password
- **State:** Persisted in localStorage via Zustand

## 📱 All Routes List

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Landing page |
| `/login` | Public | Authentication |
| `/dashboard` | Protected | Main dashboard |
| `/profile` | Protected | User profile & data sources |
| `/project/new` | Protected | Create project |
| `/project/[id]` | Protected | Project workspace |
| `/settings` | Protected | Integration settings |
| `/templates` | Protected | BRD templates |
| `/analytics/conflicts` | Protected | Conflict detection |
| `/analytics/traceability` | Protected | Requirement tracing |
| `/analytics/sentiment` | Protected | Sentiment analysis |

## 🌟 Key Features by Route

### Landing Page (/)
- Hero section with gradient text
- Feature cards (Multi-Source, AI Agents, Citations)
- "How It Works" 4-step guide
- Login button

### Dashboard (/dashboard)
- 3 stat cards (Projects, Drafts, Completed)
- Project table with actions
- New Project button
- Framer Motion animations

### Profile (/profile)
- User info with edit modal
- 6 data source integration cards
- Connection status indicators
- Ingestion statistics

### Project Workspace (/project/[id])
#### Tab 1: Data Sources
- Active connector status
- Live ingestion terminal log
- File upload area
- Start Ingestion button

#### Tab 2: Agent Orchestrator
- 4 AI agents with status
- Workflow simulation
- Thought process feed
- Real-time updates

#### Tab 3: BRD Editor
- 8-section outline navigation
- Rich text editor
- Citations panel
- AI chat assistant

### Analytics
#### Conflicts (/analytics/conflicts)
- Conflict summary stats
- Severity-based cards
- Side-by-side comparison
- Resolution tracking

#### Traceability (/analytics/traceability)
- Requirements matrix
- Source linkage
- Test coverage metrics
- Status indicators

#### Sentiment (/analytics/sentiment)
- Overall confidence score
- 4 stakeholder groups
- Trend indicators
- Topic analysis charts

### Settings (/settings)
- 4 integration cards
- Sync controls
- Auto-sync toggles
- Configuration fields

## 🎨 UI Components Used

- **Glassmorphism:** Dark theme with blur effects
- **Neon Accents:** Cyan (#06b6d4) primary color
- **Animations:** Framer Motion transitions
- **Icons:** Lucide React icons
- **Forms:** Controlled inputs with validation
- **Modals:** Click-outside-to-close overlays
- **Tables:** Responsive data grids
- **Badges:** Status indicators
- **Cards:** Hover effects and gradients

## 🔄 State Management

### Zustand Stores
- **useAuthStore** - Authentication & user data
- **useProjectStore** - Projects list & CRUD
- **useIntegrationStore** - Data source connections
- **useBRDStore** - Document sections & citations

### Persistence
- All stores use `localStorage`
- Hydration handling in `ProtectedRoute`
- Session maintained across refreshes

---

**Built with ❤️ for HackFest 2.0**
