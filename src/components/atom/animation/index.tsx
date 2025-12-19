"use client";

import { motion } from "framer-motion";

// hooks
import { useIsMobile } from "@/src/hooks/mobile-size";

// type
import { FarmerMotionProps } from "../type";

const FramerMotion = ({ children }: FarmerMotionProps) => {
  // hooks
  const isMobile = useIsMobile();

  // condition
  if (isMobile === null) return null;

  // initial states
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
