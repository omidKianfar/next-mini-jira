"use client";

import { motion } from "framer-motion";
import { FarmerMotionProps } from "./type";
import { useIsMobile } from "@/src/hooks/mobile-size";

const FramerMotion = ({ children }: FarmerMotionProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
      animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
      exit={isMobile ? { opacity: 0, y: -10 } : { opacity: 0, x: -10 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default FramerMotion;
