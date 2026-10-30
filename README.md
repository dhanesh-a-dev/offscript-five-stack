# Perseus – The Hero 🌟
> **Your campus. Your people. Everything in one place.**

[![Vercel Compatible](https://img.shields.io/badge/Vercel-Deployment%20Ready-black?style=flat&logo=vercel)](https://vercel.com)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Dark%20Glassmorphism-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

Perseus is a premium, all-in-one university campus companion platform developed for students at **Aurelia University** (fictional demo institution). Built specifically to eliminate freshman disorientation, Perseus aggregates interactive campus cartography, electric shuttle transit, academic kits, student societies, senior mentorship, confidential health sanctuaries, peer lost-and-found, textbook exchanges, and student senate feedback into a unified glassmorphism dashboard.

---

## 📸 Design Direction & UI Aesthetics
- **Dark Glassmorphism**: Deep navy (`#080D1C`), translucent frosted cards with backdrop blur, fine hairline borders (`rgba(255, 255, 255, 0.12)`).
- **Color Accents**: Luminous electric violet (`#6558F5`), cyber cyan (`#38BDF8`), emerald verification badges, and amber promotional tags.
- **Theme Support**: Working dark mode (default) and clean pearl light mode with instant persistent switching via `localStorage`.
- **Responsive Layout**: Persistent desktop sidebar, sticky top search/bulletins bar, mobile slide-out drawer, and responsive bottom navigation bar.

---

## ✨ Features Checklist (16 Built Modules)

### 1. 🎓 Student Dashboard
- Personalized welcome for Alex Carter with onboarding checklist progress.
- Quick navigation shortcuts to all essential services.
- Live campus bulletins with source verification indicators.
- Upcoming events with real-time registration.
- Next shuttle arrival countdown.
- 24/7 Red SOS Emergency matrix strip.

### 2. 🗺️ Campus Explorer (Interactive Illustrated Map)
- **100% Custom Vector/SVG Top-Down Campus Layout** (No external Google Maps / Mapbox API dependencies).
- 13 Interactive location markers: Main Gate, Administration, CSE Department, Engineering West, Central Library, Campus Canteen, Auditorium, Sports Arena, SAC, Falcon Hostel, Medical Centre, Transport Hub, and South Parking.
- Category filters (Academic, Facilities, Transport, Sports, Dining).
- Dynamic route illustration: clicking "Show Walking Route" draws an illuminated animated walking path between locations.
- Detailed glass panel: opening hours, facilities checklist, walking steps, and contact points.

### 3. 🚌 Transportation System & Advanced Planner
- Campus electric shuttle schedules: Shuttle 1 (Main Circular), Shuttle 2 (Academic Express), Shuttle 3 (Hostel & Sports Night Link).
- Stop sequences, departure timetable batches, and delay notices.
- **Advanced Transport Planner**: Select Origin & Destination locations to calculate travel duration, walking connections, and best shuttle line.

### 4. 🎪 Clubs & Events Platform
- Directory of 9+ active student societies (Coding, Robotics, Photography, E-Cell, Music, Dance, Sports, Literary, Design) with coordinators, schedules, and join application modals.
- Filterable events discovery feed (Hackathons, Cultural, Business, Sports).
- Event registration confirmation with instant student pass delivery.
- **Sponsored Events & Referral System**: Events flagged with `Sponsored / Promoted` badges, unique tracking codes (`HACK-HERO-42`), one-click referral link copying, and live click tracking.

### 5. 📚 Academic Survival Kit
- Weekly class timetable with day tabs (CS 1st Year cohort).
- Mid-Term exam schedule with hall assignments and seat ranges.
- Interactive Continuous Assessment assignment tracker (Pending → In Progress → Submitted).
- Downloadable study repositories (notes, question papers, lab manuals).
- Curated Academic FAQs (attendance rules, relative grading, re-evaluation policies).

### 6. 🤝 Senior Connect (Peer Mentorship Guild)
- Browse verified 3rd and 4th-year senior mentors across Computer Science, Mechanical, Electronics, and IT.
- Filter by department, CGPA honors, and technical skills.
- Read each senior's personal "Golden Tip" for surviving first year.
- Send personalized demo mentorship requests with persistent tracking.

### 7. 🩺 Student Wellbeing Sanctuary & Safety
- **24/7 SOS Emergency Hotline Matrix**: Direct contacts for Campus Ambulance (`+91 555-0911`), Anti-Ragging Squad (`+91 555-0999`), and Security Desk (`+91 555-0100`).
- Health & Medical Centre operating hours and doctor OPD details.
- Psychological Counselling Sanctuary with confidential booking modal.
- Anti-Ragging and Harassment reporting modal with anonymous submission checkbox.
- "Whom to Approach When" guidance matrix.

### 8. 🔍 Campus Lost & Found Bureau
- Community board of lost and found belongings with category filters.
- Report Lost Item and Report Found Item submission forms.
- **Private Claim Verification Process**: Students submit confidential distinguishing characteristics, serial numbers, and proof details to prevent fraudulent claims.
- Administrative lifecycle states: `Reported` → `Under Review` → `Claimed` → `Returned` → `Expired`.

### 9. 🛍️ Student Second-Hand Marketplace
- Peer-to-peer textbook and student essentials exchange.
- Book filters: condition (Brand New, Like New, Good), price sorting, subject, and edition.
- List item modal with instant publication to community board.
- In-person handover inquiry modal with seller email details and "Mark as Reserved" status.

### 10. 📖 Campus Memory Vault
- Student wisdom archive preserving tips on surviving first semester, quiet library study nooks, free printing hacks, and canteen budget food secrets.
- Upvote counter ("Helpful") and bookmarking ("Save to Vault").
- Post new wisdom modal to leave advice for incoming batches.

### 11. 🛡️ Verified Information System
- Clear five-tier visual source badging across all announcements and listings:
  1. `Official University Information` (Emerald Shield)
  2. `Verified Perseus Team Update` (Cyan Award)
  3. `Club Announcement` (Indigo Community)
  4. `Student Submitted` (Purple User)
  5. `Sponsored / Promoted` (Amber Sparkle)

### 12. 💡 Suggestions & Feedback Pipeline
- Submit campus ideas across Facilities, Transport, Academics, and Student Support.
- Unique tracking ID generation (e.g. `AUR-S7821`).
- Status progression timeline: `Submitted` → `Under Review` → `Accepted` → `In Progress` → `Resolved` → `Declined`.
- Student community upvoting on proposals.
- Official administrative responses and implementation comments.

### 13. ⚙️ Personalization & Accessibility
- Theme switcher: Dark glassmorphism and clean light mode.
- Student profile editor (Name, ID, department, year, email, avatar initials).
- Fully accessible keyboard navigation and mobile touch targets.

### 14. 📶 Offline Campus Guide
- Zero-network campus cache (1.2 MB lightweight storage).
- Caches campus map coordinates, emergency helpline numbers, and bus timetables.
- Clear status indicator in sidebar and settings panel.

### 15. 📈 Club Promotion Analytics
- Live marketing analytics for sponsored event campaigns.
- Displays campaign impressions, referral clicks, click-through rates (CTR), and simulated conversion metrics.

### 16. 🎛️ Demo Admin Panel
- Content manager simulating university administrative control.
- Publish verified bulletins with custom source badges.
- Review submitted lost-and-found claims and transition item statuses.
- Update suggestion tickets with status logs and official administrative replies.
- Inventory control for marketplace listings.
- **Factory Reset Button**: Restores original Aurelia University dataset in one click.

---

## 🛠️ Technology Stack
- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, zero compilation errors)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom dark glassmorphism utilities
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **State & Persistence**: Client-side reactive stores backed by browser `localStorage`
- **Zero Paid/AI APIs**: Lightweight, self-contained, and completely free to run and deploy

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.17+` or `v20+` (Tested on Node `v22.20.0`)
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository or navigate to project directory
cd "OFFSCRIPT FIVE STACK"

# Install dependencies
npm install
```

### Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## ☁️ Deployment (Vercel)
The project is zero-configuration and 100% Vercel-ready.
1. Push the code to a GitHub repository.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. No environment variables are required. Click **Deploy**.

---

## ⚠️ Demo Scope & Limitations (Hackathon Honesty)
1. **Fictional University Data**: Aurelia University and all associated departments, shuttle lines, contacts, and clubs are realistic fictional sample datasets for hackathon evaluation.
2. **Client-Side Persistence**: For this 12-hour hackathon prototype, all user actions (posting items, filing claims, submitting feedback, tracking referral clicks, and editing profile details) persist using browser `localStorage`. Data does not automatically sync across separate physical devices.
3. **Production Roadmap**: A full enterprise deployment will connect Perseus to a PostgreSQL database (e.g., Prisma ORM), Supabase/OAuth 2.0 institutional Single Sign-On (SSO), and real role-based authentication (RBAC) to enforce administrative security boundaries.

---

## 👥 Hackathon Team
Built with passion by the **Perseus Hero Team** for the 2026 Campus Innovation Hackathon.
