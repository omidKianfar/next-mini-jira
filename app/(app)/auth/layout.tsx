"use client";

import { motion as m, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={pathname}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full flex items-center justify-center "
        >
          {children}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
