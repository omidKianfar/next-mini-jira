'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import ButtonNext from '../../atom/buttons-component/button-next';
import MyIcon from '../../atom/icon-components';
import { useAuth } from '@/src/hooks/auth/use-auth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
} as const;

const HeroSectionComponent = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <div className="relative flex justify-center overflow-hidden bg-white px-4 pb-12 pt-24 text-center lg:pb-16 lg:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(245,158,11,0.04),transparent_50%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex w-full max-w-3xl flex-col items-center"
      >
        <motion.div
          variants={itemVariants}
          className="mb-5 inline-flex items-center rounded-full bg-warning-50 px-3.5 py-1 text-bodySm font-medium text-warning-500 ring-1 ring-inset ring-warning-500/20"
        >
          v1.0 is now live
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-5 max-w-2xl text-h2 font-extrabold leading-tight tracking-tight text-gray-800 lg:text-h1"
        >
          The Next-Gen <span className="text-warning-500">Project Manager</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-[580px] text-base leading-relaxed text-gray-500 lg:text-body"
        >
          A high-performance project management tool engineered for speed,
          real-time sync, and ultimate developer experience.
        </motion.p>

        {!user && (
          <motion.div
            variants={itemVariants}
            className="flex w-full justify-center"
          >
            <ButtonNext
              onClick={() => navigation.signin()}
              className="w-full lg:max-w-[220px]"
              icon={<MyIcon icon="arrow-right" className="ml-2" />}
            >
              Get Started
            </ButtonNext>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HeroSectionComponent;
