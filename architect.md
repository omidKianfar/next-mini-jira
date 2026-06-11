## Architecture Overview: Mini-Jira

This document outlines the architectural decisions, data flow, and engineering design for the Mini-Jira project. The application is a high-performance Kanban-style project management tool built with Next.js 16+, React, and TypeScript, utilizing a modular, service-oriented architecture.

### 1. Core Architectural Principles

- **Feature-First Architecture:** Features are encapsulated in isolated modules to ensure high cohesion and maintainability.

- **Service-Oriented Logic:** API interactions and data persistence are abstracted into a service layer, decoupling business logic from UI components.

- **Custom Hook Pattern:** Component-level state and side effects are managed through custom hooks, ensuring "Dumb" (Presentational) components.

- **Type Safety:** TypeScript is enforced across the entire stack to provide robust data modeling and reduce runtime errors.

### Tech Stack & Dependencies

- **Framework:** Next.js 16 (App Router), TypeScript.

- **State Management:** Redux Toolkit (RTK).

- **Backend/Storage:** Firebase (Real-time DB/Auth), Supabase (Storage).

- **UI Interaction:** DnD-Kit (Drag-and-drop), Swiper.js (for performant, touch-friendly sliders and carousels).

- **Styling:** Tailwind CSS & MUI (Modular design system).

### 3. Data Flow & Logic Layer

The data flow is centralized through a Service Layer:

1. User Interaction: Kanban board triggers an event (e.g., onDragEnd).

2. Hook Execution: The useKanban custom hook captures the event.

3. Service Call: The hook invokes a method from the service layer.

4. State Update: The service communicates with Firebase (Real-time DB); the UI updates optimistically, followed by a data sync.

5. UI Feedback: notistack confirms the operation.

### 4. Engineering Decisions

- **Optimistic UI Updates:** The Kanban board updates the UI state immediately before the API call confirms persistence to ensure a native-like feel.

- **Abstraction of Backend:** The service-based architecture ensures the UI is backend-agnostic, allowing for future-proofing or migration to other data sources.

- **Atomic Design:** The component hierarchy (atom to organism) ensures that UI elements are highly reusable and modular.

- **Scalability:** The structure allows team members to add features within specific folders without impacting global logic, facilitating easy migration to tools like Storybook for component documentation.

### 6. Animations & Motion Design

The application leverages advanced motion design to enhance user engagement and visual feedback:

- **Page Transitions:** Smooth entry/exit animations for routes, ensuring a seamless "Single Page Application" (SPA) feel.

- **Scroll-Triggered Motion:** Used for interactive storytelling, where elements animate from right-to-left as the user scrolls, improving content discoverability.

- **Feedback Animations:** Fade and Show effects implemented for UI states (modals, tooltips, and alerts) to provide clear, non-jarring transitions.

- **Implementation:** Developed using Framer Motion (or your animation library), focusing on hardware-accelerated transitions to ensure no impact on scroll performance or layout shift (CLS)

#### Maintained by **Omid Kianfar**
