"use client";

import { AnimatePresence, motion } from "framer-motion";

// type
import { ModalProps } from "@/src/types/global";

// ui
import MyIcon from "../../atom/icon-components";

export default function ModalContainer({
  open,
  handleClose,
  children,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.div
            key="modal"
            className="relative mx-4 w-full max-w-lg rounded-xl bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{
              duration: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {children}

            <MyIcon
              icon="zondicons:close-outline"
              className="absolute right-4 top-4 cursor-pointer text-subtitle text-gray-500 hover:text-error-500"
              onClick={handleClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
