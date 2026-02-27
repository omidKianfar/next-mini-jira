export const TECH_STACK = [
  { label: 'Next.js', icon: 'logos:nextjs-icon', core: true },
  { label: 'TypeScript', icon: 'logos:typescript-icon', core: true },
  { label: 'Socket.io', icon: 'logos:socket-io', core: true },
  { label: 'Redux', icon: 'logos:redux', core: true },
  { label: 'Firebase', icon: 'logos:firebase', core: false },
  { label: 'Supabase', icon: 'logos:supabase-icon', core: false },
  { label: 'Tailwind', icon: 'logos:tailwindcss-icon', core: false },
  { label: 'Jest', icon: 'logos:jest', core: true },
];

export const FEATURES = [
  {
    title: 'Real-time Collaboration',
    description:
      'Instant synchronization across clients using Socket.io and Firebase for a seamless team experience.',
    icon: '⚡',
  },
  {
    title: 'Advanced Media Engine',
    description:
      'Native audio recording with RecordRTC and client-side media processing via FFmpeg integration.',
    icon: '🎙️',
  },
  {
    title: 'Interactive Kanban',
    description:
      'Fluid drag-and-drop task management built with Dnd-kit, designed for high-performance workflows.',
    icon: '📋',
  },
  {
    title: 'Rich Text Editor',
    description:
      'A fully customized content editor powered by Slate.js, supporting emojis, mentions, and formatting.',
    icon: '✍️',
  },
  {
    title: 'Production Ready',
    description:
      'Robust code architecture with 100% type safety and comprehensive testing using Jest & RTL.',
    icon: '🛡️',
  },
  {
    title: 'Optimized UI/UX',
    description:
      'Modern interface crafted with Tailwind CSS and Framer Motion for buttery-smooth interactions.',
    icon: '✨',
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' } as const,
  },
};
