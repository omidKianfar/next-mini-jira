# Mini Jira: Enterprise-Grade Project Management SaaS

[Live Demo](https://next-mini-jira.netlify.app) | [Source Code](https://github.com/omidKianfar/next-mini-jira)

A production-ready, highly modular Project Management platform engineered for scalability. Built with a robust architecture that prioritizes maintainability, strict type safety, and real-time synchronization.

## Features

- **Real-time Kanban Engine:** High-fidelity drag-and-drop system via `@dnd-kit` with custom collision detection.

- **Support & Communication Hub:** Full-featured real-time Support Chat using `Firestore`, utilizing `Slate.js` editor (with `emoji-mart`), voice recording (`RecordRTC`), file/video/image uploads, and automatic scroll-to-bottom.

- **Advanced Media Pipeline:**
  - **In-browser:** Image cropping, scaling, and compression capabilities.

  - **Server-side:** Video compression and optimization using `@ffmpeg/ffmpeg`

  - **Cloud Integration:** Secure file handling via `Supabase` storage with custom drag-and-drop uploader.

- **SaaS Subscription Logic:** End-to-end `Stripe` integration (monthly/yearly), trial mode (10 days), and API-driven frontend flow for success/failed states.

- **Role-Based Access Control (RBAC):** Distinct Client/Admin dashboards with dedicated layouts, Auth Guards, Role Guards, and active/deactive user management.

- **Rich Text Experience:** Deeply customized `Slate.js` editor with plugins for document serialization and styling.

- **Design System:** `Tailwind CSS` with custom configuration (colors, shadows, border-radius, typography) and `Framer Motion` for animations.

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript, Next.js Font Optimization.

- **State Management:** `Redux Toolkit` (RTK) for tasks, users, chats, and global search/filter states.

- **Backend & Data:** `Firebase` (Auth, Firestore Realtime DB) + `Supabase` (Storage).

- **Media Processing:** `FFmpeg` (Video), `react-easy-crop` (Image).

- **Forms:** `react-hook-form` + `yup` (resolver) + `Jest/RTL` unit testing.

- **Rich Text:** `Slate.js` with `emoji-mart` integration.

- **UI/Styling:** `Tailwind CSS` (Custom Design System: Colors, Shadows, Border-Radius) + `Framer Motion.`

- **Utilities:** `dayjs` (time), `swiper` (carousel), `notistack` (notifications), `yet-another-react-lightbox`.

## Screenshots

<div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-bottom: 8px">
 
  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/Kanban.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/Kanban.png" width="300" />
  </a>

  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/user-dashboard.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/user-dashboard.png" width="300" />
  </a>

  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/admin-dashboard.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/admin-dashboard.png" width="300" />
  </a>

  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/payment.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/payment.png" width="300" />
  </a>
    <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/admin-edit-support-message.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/admin-edit-support-message.png" width="300" />
  </a>

  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/upload-file.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/upload-file.png" width="300" />
  </a>

  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/upload-voice.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/landing/upload-voice.png" width="300" />
  </a>

</div>

## Engineering Highlights

- **Modular Architecture:** Strict adherence to `Atomic Design` (Atom, Molecule, Organism, Page) ensuring code reusability and maintainability.

- **Advanced Type Safety:** Comprehensive TypeScript implementation for global error handling and schema consistency via interface inheritance.

- **Performance:** Optimized media processing with `FFmpeg` and `lazy-loading` components.

- **Responsive Engine:** Custom useIsMobile hook for context-aware UI logic.

- **Quality Assurance:** Full unit testing suite (`Jest` and `React Testing Library`) for forms, modals, and core utilities.

- **Helper Utilities:** Dedicated logic for string-slicer (text truncation) and date-time-counter (unread messages).

## Project Structure

```text
├── app/                # Next.js App Router pages and layout files.
└── src/
    ├── components/     # Presentational UI components using Atomic Design.
    │   ├── atom/       # Basic building blocks
    │   ├── common/     # Shared elements used across multiple features
    │   ├── molecule/   # Combinations of atoms
    │   ├── organisms/  # Complex components
    │   └── pages/      # Feature-specific page components.
    ├── guards/         # Route protection logic and authentication access control.
    ├── helper/         # Small, reusable utility functions for formatting and UI logic.
    ├── hooks/          # Custom React hooks for shared application logic and UI state.
    ├── libs/           # External library configurations and third-party API clients.
    ├── providers/      # Context API wrappers for global state (Auth, Chat, Notifications).
    ├── reducer/        # Complex state transition logic for local or shared state management.
    ├── store/          # Redux Toolkit (RTK) slices and global state configuration.
    ├── styles/         # Global CSS/SCSS and design tokens.
    ├── theme/          # Theme configuration for UI libraries (e.g., MUI or Tailwind).
    ├── types/          # TypeScript interface definitions and global type inheritance.
    └── utils/          # Core utility functions, helpers, and shared business logic.
```

## Setup & Installation

### 1. Clone the project

```bash
git clone https://github.com/omidKianfar/next-mini-jira.git
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Add environment variables

### Setup Guide

To ensure full functionality of the SaaS features, please follow these configuration steps in your Stripe and Supabase dashboards:

1. Stripe Integration
   Product Setup: In your Stripe Dashboard, create two products for the "Monthly" and "Yearly" subscription plans.

- Price IDs: After creating the products, retrieve the Price ID for each and update your .env.local file with the corresponding `STRIPE_MONTHLY_PRICE_ID` and `STRIPE_YEARLY_PRICE_ID`.

- API Keys: Navigate to dashboard > settings > Developers > API keys to retrieve your `Secret Key` and `Publishable Key`, then add them to your environment variables.

- Products: Navigate to product catalog > Create Monthly and Yearly.

- Find price click and copy and `price id` then add them to your environment variables.

  <a target="_blank" href="https://docs.stripe.com/billing">
  Stripe Billing Docs
  </a>

2. Supabase Configuration
   Project Setup: Initialize a new project in the Supabase Dashboard.

- Storage: Create a Public Bucket to handle media assets (images and audio files), ensuring the application can read/write files correctly.

- The polices you must make for this project

<div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-bottom: 8px">
 
  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/bucket-policies.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/bucket-policies.png" width="300" />
  </a>

  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/policy-1.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/policy-1.png" width="300" />
  </a>

  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/policy-2.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/policy-2.png" width="300" />
  </a>

  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/policy-3.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/policy-3.png" width="300" />
  </a>

  <a target="_blank" href="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/policy-4.png">
    <img src="https://raw.githubusercontent.com/omidKianfar/next-mini-jira/refs/heads/main/public/images/policies/policy-4.png" width="300" />
  </a>

</div>

- Credentials: Retrieve your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Project Settings > API and populate your .env.local file.

Create a `.env.local` file:

```env
STRIPE_SECRET_KEY= Your stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE= Your strip publishable key

STRIPE_MONTHLY_PRICE_ID= Your monthly price id
STRIPE_YEARLY_PRICE_ID= Your yearly price id

NEXT_PUBLIC_SUPABASE_URL= Your supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= Your supabase ANON key
```

### 4. Run development server

```bash
npm run dev
# or
yarn run dev
```

> These values are local and private.

### **Testing**

- Jest
- React Testing Library

> The project utilizes Jest and React Testing Library for robust unit testing, focusing on mission-critical components like Modals and RHF validation logic.

## Running Tests

```bash
npm run test
# or
yarn run test
```

## Why This Project Is Valuable (For Recruiters)

- **Senior-Level Engineering:** Demonstrates capability in building complex pipelines (FFmpeg, image manipulation, real-time sync).

- **Full-Stack Competence:** Proven capability in managing the full user lifecycle: from Auth (Email/Google) and Subscription (Stripe API) to Admin Dashboards (RBAC).

- **Production-Ready Quality:** Commitment to Test-Driven Development (Jest/RTL) and modular system design..

- **Complex Feature Integration:** Built production-grade support systems, media pipelines, and RBAC-enabled dashboards from scratch.

- **Scalable Architecture:** Modular design ensures the project can expand and evolve in an enterprise environment. Designed for growth, using robust state management (RTK) and type-safe data models.

## Copyright

2026 Omid Kianfar
