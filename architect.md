## Architecture & Design Decisions

This document outlines the architectural patterns and technical design decisions behind the Mini Jira platform.

### Architectural Pattern: Atomic Design

To ensure scalability and maintainability, the project adopts the Atomic Design pattern. This enforces a strict decoupling of UI components:

- **Atoms:** Basic building blocks (Buttons, Inputs, Icons).

- **Molecules:** Simple combinations of atoms (Search-Input with Icon).

- **Organisms:** Complex UI regions (Header, Sidebar, Kanban-Column).

- **Pages:** Feature-specific compositions of organisms.

### State Management Strategy

The application utilizes Redux Toolkit (RTK) to manage complex, globally shared states:

- **Slices:** Domain-specific logic is isolated into slices (tasks, chats, users, filters).

- **Real-time Synchronization:** RTK is integrated with Firebase Firestore listeners to ensure the local UI state is always a reflection of the server-side database.

- **Strict Typing:** Global state interfaces are inherited from core types, ensuring that dispatching actions remains type-safe.

### Media & Processing Pipeline

Data flows through a centralized service layer and benefits from real-time capabilities:

- **Client-Side:** Image manipulation (cropping/scaling) is performed in the browser using react-easy-crop to reduce server load and latency.

- **Server-Side/Worker:** Video compression is handled via FFmpeg to ensure optimized file sizes before persistence.

- **Persistence:** All optimized assets are piped to Supabase Storage, utilizing signed URLs for secure access.

### Communication & Real-time Flow

- **Rich Text Engine:** A customized Slate.js implementation provides a modular editor experience, including emoji support and document serialization.

- **Real-time Messaging:** Firestore Realtime DB listeners are encapsulated in a ChatProvider, handling message life-cycle, status updates, and auto-scroll events.

### Security & Authentication

- **Auth Provider:** A centralized Firebase Auth context manages user sessions and Google/Email credentials.

- **Guards:** Route protection is handled via AuthGuard (for session verification) and RoleGuard (for admin/client access control), ensuring that sensitive routes are only accessible to authorized roles.

### Responsive & Design Tokens

- **Tailwind Integration:** The design system is centralized in tailwind.config.ts, utilizing custom tokens for colors, shadows, and border-radius to ensure design consistency across the application.

- **Mobile-First:** The useIsMobile custom hook enables device-aware UI rendering, ensuring the Kanban and support modules remain functional across mobile, tablet, and desktop viewports.

### Why these decisions were made

- **Maintainability:** By using Atomic Design, we prevent the "component bloat" often found in large-scale React projects.

- **Performance:** Offloading media processing to client-side/FFmpeg minimizes bandwidth and storage costs.

- **Scalability:** RTK and the modular directory structure allow adding new features (e.g., Reports, Team settings) without refactoring the existing core.

#### Copyright © 2026 **Omid Kianfar**
