# Mini Jira

A professional, production-ready Project Management SaaS. Built with a highly **Maintainable**, **Modular**, and **Editable** architecture.

## Features

- **Advanced Kanban Board**: Custom drag-and-drop implementation with `dnd-kit` and custom collision sensors.
- **Real-time Collaboration**: Integrated `Socket.io` & Firestore for instant messaging and live task updates.
- **Multimedia Engine**: In-browser image/video compression, cropping (`react-easy-crop`), lightbox (`yet-another-react-lightbox`), and professional voice recording (`RecordRTC`/`WaveSurfer`).
- **SaaS Subscription**: Full Stripe integration (monthly/yearly) with active user validation and role-based access control.
- **Rich Experience**: Slate.js rich-text editor, Framer Motion animations, and Notistack feedback system.
- **Responsive Design**: Mobile-first approach using custom `useMobile` hooks and dynamic navigation.
  = **Dynamic Motion:** Advanced page transitions and scroll-triggered animations using Framer Motion for a premium, engaging UI experience.

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript.
- **State Management**: Redux Toolkit (RTK).
- **Database & Cloud**: Firebase & Firestore, Supabase (Storage)
- **Forms**: React Hook Form with custom controllers & Yup validation.
- **Editor**: Slate.js / Slate-react.
- **Styling**: Tailwind CSS (Custom Design System).
- **UI Utilities:** Swiper.js (for performant, touch-friendly sliders and carousels).

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

- **Maintainable & Modular**: Decoupled UI, logic, and API layers ensure the system is easy to scale and update.
- **Highly Editable**: Fully isolated atoms (Buttons, Tables, Lists, Routes, Images, Videos, Pagination, Modals, File Uploader) designed for rapid customization.
- **Performance**: Firestore aggregation, lazy-loaded components, and `react-spinners` for optimized UX.
- **Type Safety**: Advanced **Type Inheritance** and custom utility scripts across the codebase.
- **Motion Design:** High-performance, hardware-accelerated animations implemented with Framer Motion to ensure smooth interactions without impacting layout shift (CLS).

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

## Installation

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

- Price IDs: After creating the products, retrieve the Price ID for each and update your .env.local file with the corresponding STRIPE_MONTHLY_PRICE_ID and STRIPE_YEARLY_PRICE_ID.

- API Keys: Navigate to dashboard > settings > Developers > API keys to retrieve your Secret Key and Publishable Key, then add them to your environment variables.

- Products: Navigate to product catalog > Create Monthly and Yearly.

- Find price click and copy and price id then add them to your environment variables.

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

- Credentials: Retrieve your SUPABASE_URL and SUPABASE_ANON_KEY from Project Settings > API and populate your .env.local file.

Create a `.env.local` file:

```env
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE=YOUR_STRIPE_PUBLISHABLE_KEY

STRIPE_MONTHLY_PRICE_ID=YOUR_MONTHLY_PRICE_ID
STRIPE_YEARLY_PRICE_ID=YOUR_YEARLY_PRICE_ID

NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
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

> The project includes unit testing using Jest and React Testing Library. Currently, tests focus on core UI components including Modals and React Hook Form (RHF) validation logic.

## Running Tests

```bash
npm run test
```

## Why This Project Is Valuable (For Recruiters)

- **Senior-Level Architecture**: Demonstrates mastery of **Maintainable**, **Modular**, and **Editable** system design, ensuring long-term code health.

- **Full-Stack Competence**: Mastery of integrating **Stripe** for SaaS, **Supabase** for secure storage, and **Firebase** for backend-as-a-service.
- **Real-Time Mastery**: Proficient in managing complex live data synchronization via **WebSockets** and **Firestore** listeners.
- **Quality-Driven Development**: Includes a strategic unit testing suite using **Jest** and **React Testing Library**, focused on mission-critical components like **Modals** and **Form Validation**.
- **Modern Workflow**: Expertise in cutting-edge frontend tools including **Redux Toolkit**, **Framer Motion**, **Slate.js** for rich text, and **Type Inheritance** for scalable data models.
- **Interview-Ready**: A polished, high-performance application that showcases deep knowledge of **Next.js 16** architecture and scalable UI component design.

## Copyright

2026 Omid Kianfar
