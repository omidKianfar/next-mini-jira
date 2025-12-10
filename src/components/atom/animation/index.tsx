"use client";

import { useIsMobile, motion } from "../imports";
import { FarmerMotionProps } from "../type";

const FramerMotion = ({ children }: FarmerMotionProps) => {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  const initial = isMobile ? { opacity: 0, y: 70 } : { opacity: 0, x: 70 };

  const animate = isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 };

  const exit = isMobile ? { opacity: 0, y: -35 } : { opacity: 0, x: -35 };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default FramerMotion;
