"use client";

import { PropsWithChildren, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ui
import ChatSidebar from "@/src/components/organisms/sidebar-component/chat-sidebar";
import ButtonFreeClass from "@/src/components/atom/buttons-component/button-free-class";
import MyIcon from "@/src/components/atom/icon-components";

// hooks
import { useIsMobile } from "@/src/hooks/mobile-size/use-is-mobile";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  // hooks
  const isMobile = useIsMobile();

  // states
  const [showSidebar, setShowSidebar] = useState(true);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  // functions
  const handleCloseSidebar = () => {
    setShowSidebar(false);
    setIsSidebarClosed(false);
  };

  const handleOpenSidebar = () => {
    setShowSidebar(true);
    setIsSidebarClosed(false);
  };

  const handleExitComplete = () => {
    setIsSidebarClosed(true);
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-start lg:flex-row">
      {!showSidebar && isSidebarClosed && (
        <div className={`h-full p-4 lg:pr-0`}>
          <div
            className={`h-full w-full rounded-lg border-2 border-gray-300 bg-white p-1 shadow-md`}
          >
            <div className="flex items-center justify-end">
              <ButtonFreeClass
                onClick={handleOpenSidebar}
                className={`rounded-lg`}
                icon={
                  <MyIcon
                    icon="fluent:arrow-exit-28-filled"
                    className={`text-h4 text-primary-500 hover:text-primary-700 lg:text-gray-500`}
                  />
                }
              />
            </div>
          </div>
        </div>
      )}

      <AnimatePresence initial={false} onExitComplete={handleExitComplete}>
        {showSidebar && (
          <motion.div
            key="chat-sidebar"
            variants={sidebarVariants}
            animate="open"
            initial="closed"
            exit="closed"
            className={`h-[calc(100vh-60px)] w-[100vw] p-4 lg:h-[calc(100vh-78px)] lg:w-[400px] lg:pr-0`}
          >
            <div
              className={`h-full w-full rounded-lg border-2 border-warning-500 bg-white p-2 shadow-md`}
            >
              <div className="flex items-center justify-end">
                <ButtonFreeClass
                  onClick={handleCloseSidebar}
                  className={`"border-2 rounded-lg border-gray-200 bg-gray-50 p-1 shadow-md`}
                  icon={
                    <MyIcon
                      icon="fluent:arrow-exit-28-filled"
                      iconClass="rotate-180"
                      className={`text-h4 text-warning-500 hover:text-warning-700`}
                    />
                  }
                />
              </div>

              <div className="mt-4 h-[calc(100vh-178px)] overflow-y-auto rounded-md">
                <ChatSidebar setShowSidebar={setShowSidebar} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && showSidebar ? null : (
        <div className="h-full w-full p-4 pt-0 lg:pt-4">{children}</div>
      )}
    </div>
  );
};

export default DashboardLayout;

// animation data
const sidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 30,
      duration: 0.1,
    },
  },
};
