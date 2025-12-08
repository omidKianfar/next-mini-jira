"use client";

import { ModalProps } from "../type";
import { Button, MyIcon } from "../imports";
import { AnimatePresence, motion } from "framer-motion";

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
            className="relative bg-white rounded-lg shadow-xl p-4 max-w-lg w-full mx-4"
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

            <Button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <MyIcon
                icon="zondicons:close-outline"
                className="text-[20px] hover:text-red-500"
              />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
