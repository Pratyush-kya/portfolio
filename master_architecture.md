# Portfolio Architecture & Engineering Standards

## 1. System Overview
- **Framework**: Next.js 16 (App Router with Turbopack) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + native CSS variables
- **Icons**: Lucide React
- **Architecture Philosophy**: Zero heavy canvas/WebGL runtime bloat; maximum hardware-accelerated CSS transforms; 100% static edge prerendering.
- **Single Source of Truth**: `src/data/content.ts`

## 2. Target Persona & Objective
- **Candidate**: Pratyush Kiran Rath (B.Tech CSE, Centurion University 2025–2029)
- **Target Roles**: Summer 2026 / 2027 Software Engineering, ML Systems, and Full-Stack Internships.
- **Recruiter Goal**: Pass the 30-Second Skim Test with verifiable proof points (29/29 PyTest suite, 0.00 MB/s disk write rate via `/dev/shm` tmpfs, 0 bytes external upload on client-side ATS analyzer).

## 3. Core Component Hierarchy
1. `Nav`: Minimal sticky navigation with command palette (`⌘K`) and terminal (`~`) triggers.
2. `Hero`: 2-column hero with dominant primary CTA ("View Resume PDF"), live inference status badge, and contact links.
3. `DefensibleMetricsStrip`: 4 verified metrics with explicit proof points.
4. `InteractiveShowcase`: Tabbed/carousel case studies featuring rich architectural screenshots and metrics.
5. `FlagshipProjects`: Deep-dive engineering breakdowns (Problem -> Constraints -> Decisions & Trade-offs -> Measurable Results -> Retrospective).
6. `InteractiveTelemetryLab`: Real-time KV-cache memory calculator and storage benchmark simulator.
7. `TechnicalArticle`: In-depth breakdown of `/dev/shm` Linux shared memory architecture.
8. `SecondaryProjects`: Operational n8n automations & Web3 prototypes.
9. `SkillsGrid`: Categorized skills anchored directly to concrete repository proofs.
10. `About & Education`: Academic background, coursework, and systems philosophy.
11. `Footer`: Contact channels, availability status, and PGP/Git commit signature.
12. `SystemsTerminal`: Interactive CLI drawer accessible via hotkey or dock.
13. `CommandPalette`: Keyboard-driven fast navigation.
14. `MobileAppDock`: Native mobile navigation bar for touch devices.

## 4. Engineering Guardrails
- **Zero Runtime Lag**: No heavy 3D canvases or unoptimized physics loops.
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard navigation (`Tab`, `Esc`, `Enter`), high contrast ratios (> 4.5:1).
- **Type Safety**: Strict TypeScript interfaces in `src/data/content.ts`.
