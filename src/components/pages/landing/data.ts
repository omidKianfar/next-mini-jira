const TECH_STACK = [
  { label: 'Next.js', icon: 'nextJs', core: true },
  { label: 'TypeScript', icon: 'typeScript', core: true },
  { label: 'Slate.js', icon: 'slateJs', core: true },
  { label: 'Dnd-kit', icon: 'dnd-kit', core: true },
  { label: 'Socket.io', icon: 'socketIo', core: true },
  { label: 'Redux Toolkit', icon: 'redux-toolkit', core: true },
  { label: 'React Hook Form', icon: 'logos:react-hook-form', core: false },
  { label: 'RecordRTC', icon: 'logos:recordrtc', core: true },
  { label: 'FFmpeg', icon: 'logos:ffmpeg', core: true },
  { label: 'Firebase', icon: 'logos:firebase', core: false },
  { label: 'Supabase', icon: 'logos:supabase-icon', core: false },
  { label: 'Stripe', icon: 'logos:stripe', core: false },
  { label: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', core: false },
  { label: 'Jest', icon: 'logos:jest', core: true },
];

const PROJECT_SLIDES = [
  {
    title: 'Task Creation & Management',
    description:
      'Creating tasks, featuring seamless file attachment handling with review capabilities and form validation.',
    image: '/images/landing/user-dashboard.png',
  },
  {
    title: 'Collaborative Kanban Board',
    description:
      'Manage tasks with fluid drag-and-drop operations, customized collision sensors, and instant updates.',
    image: '/images/landing/Kanban.png',
  },
  {
    title: 'Advanced Support Workflow',
    description:
      'Efficiently communicate with users and manage complex requests with real-time feedback tools.',
    image: '/images/landing/admin-edit-support-message.png',
  },
  {
    title: 'Multimedia Integration',
    description:
      'Supports voice messaging and file attachments to streamline the debugging and support process.',
    image: '/images/landing/upload-voice.png',
  },
  {
    title: 'Seamless File Attachments',
    description:
      'Easily attach images and documents to your support tickets with instant validation and progress tracking.',
    image: '/images/landing/upload-file.png',
  },
  {
    title: 'Flexible Subscription Plans',
    description:
      "Choose between monthly or yearly billing cycles to best fit your team's productivity and budget needs.",
    image: '/images/landing/payment.png',
  },

  {
    title: 'Admin Analytics',
    description:
      'Centralized control panel to manage users, monitor platform activity, and track performance metrics',
    image: '/images/landing/admin-dashboard.png',
  },
];

const TASK_JOURNEY_STEPS = [
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
    title: 'Advanced Media Engine',
    description:
      'Native audio recording with RecordRTC and client-side media processing via FFmpeg integration.',
  },
  {
    title: 'Real-time Collaboration',
    description:
      'Instant synchronization across clients using Socket.io and Firebase for a seamless team experience.',
  },
  {
    title: 'Offline-First PWA',
    description:
      'Seamless offline experience with Workbox service workers and Firestore local persistence for high availability.',
  },
  {
    title: 'Optimized UI/UX',
    description:
      'Modern interface crafted with Tailwind CSS and Framer Motion for buttery-smooth interactions.',
  },
  {
    title: 'Production Ready',
    description:
      'Robust code architecture with 100% type safety and comprehensive testing using Jest & RTL.',
  },
  {
    title: 'DevOps & CI/CD',
    description:
      'Automated deployment pipelines via GitHub Actions, supporting multi-stage environments (QA/Prod) for reliable releases.',
  },
];

export { TECH_STACK, PROJECT_SLIDES, TASK_JOURNEY_STEPS };
