"use client";

import { motion } from "framer-motion";
import UserSidebar from "./user-sidebar";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { UserType } from "@/src/types/global";
import { HeaderProps, sidebarProps } from "../type";
import UserProfile from "./user-profile";

const sidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 25,
    },
  },
  closed: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 30,
    },
  },
};

const SideBar = ({ showSidebar, setShowSidebar }: sidebarProps) => {
  const { user } = useAuth();

  return (
    <motion.div
      variants={sidebarVariants}
      animate={showSidebar ? "open" : "closed"}
      initial="closed"
      className="fixed top-[70px] z-50 h-full w-[220px] rounded-r-md border border-gray-300 bg-white/20 p-4 shadow-md backdrop-blur-md lg:top-[90px]"
    >
      <UserProfile setShowSidebar={setShowSidebar} user={user} />

      {user?.userType == UserType.Client ? (
        <UserSidebar setShowSidebar={setShowSidebar} />
      ) : null}
    </motion.div>
  );
};

export default SideBar;
