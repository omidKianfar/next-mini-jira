const TECH_STACK = [
  { label: 'Next.js', icon: 'logos:nextjs-icon', core: true },
  { label: 'TypeScript', icon: 'logos:typescript-icon', core: true },
  { label: 'Socket.io', icon: 'logos:socket-io', core: true },
  { label: 'Redux', icon: 'logos:redux', core: true },
  { label: 'Firebase', icon: 'logos:firebase', core: false },
  { label: 'Supabase', icon: 'logos:supabase-icon', core: false },
  { label: 'Tailwind', icon: 'logos:tailwindcss-icon', core: false },
  { label: 'Jest', icon: 'logos:jest', core: true },
];

const PROJECT_SLIDES = [
  {
    title: 'Workspace Dashboard',
    description:
      'A birds-eye view of your metrics, personal velocity, and comprehensive project analytics.',
    image: '/images/landing.png',
  },
  {
    title: 'Collaborative Kanban Board',
    description:
      'Manage tasks with fluid drag-and-drop operations, customized collision sensors, and instant updates.',
    image: '/images/landing.png',
  },
  {
    title: 'Project Customization Engine',
    description:
      'Fine-tune your workspace visibility, system webhooks, permissions, and specialized workflows.',
    image: '/images/landing.png',
  },
];

const TASK_JOURNEY_STEPS = [
  {
    title: 'Real-time Collaboration',
    description:
      'Instant synchronization across clients using Socket.io and Firebase for a seamless team experience.',
  },
  {
    title: 'Advanced Media Engine',
    description:
      'Native audio recording with RecordRTC and client-side media processing via FFmpeg integration',
  },
  {
    title: 'Interactive Kanban',
    description:
      'Fluid drag-and-drop task management built with Dnd-kit, designed for high-performance workflows.',
  },
  {
    title: 'Rich Text Editor',
    description:
      'A fully customized content editor powered by Slate.js, supporting emojis, mentions, and formatting.',
  },
  {
    title: 'Production Ready',
    description:
      'Robust code architecture with 100% type safety and comprehensive testing using Jest & RTL.',
  },
  {
    title: 'Optimized UI/UX',
    description:
      'Modern interface crafted with Tailwind CSS and Framer Motion for buttery-smooth interactions.',
  },
];

export { TECH_STACK, PROJECT_SLIDES, TASK_JOURNEY_STEPS };
