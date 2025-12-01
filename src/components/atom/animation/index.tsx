"use client";

import { motion } from "framer-motion";
import { FarmerMotionProps } from "./type";

const FramerMotion = ({ children }: FarmerMotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center "
    >
      {children}
    </motion.div>
  );
};

export default FramerMotion;
