import { motion } from 'framer-motion';

const SupportUserCardSkeleton = () => {
  return (
    <div className="relative mb-4 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50 p-2 shadow-md">
      <div className="flex space-x-4 p-2">
        <div className="h-10 w-10 rounded-full bg-gray-200" />

        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </div>

      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
        animate={{ x: ['100%', '-100%'] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default SupportUserCardSkeleton;
