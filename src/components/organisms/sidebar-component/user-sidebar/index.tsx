'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/src/hooks/auth/use-auth';
import UserSidebar from './user-sidebar';
import UserProfile from './user-profile';
import { HeaderProps } from '@/src/types/global';

const SideBar = ({ showSidebar, setShowSidebar, menuRef }: HeaderProps) => {
  const { user } = useAuth();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!showSidebar) return;

      const isClickInsideSidebar = dropdownRef.current?.contains(
        event.target as Node
      );
      const isClickInsideMenu = menuRef?.current?.contains(
        event.target as Node
      );

      if (showSidebar && !isClickInsideSidebar && !isClickInsideMenu) {
        setShowSidebar?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSidebar, setShowSidebar, menuRef]);

  return (
    <motion.div
      variants={sidebarVariants}
      animate={showSidebar ? 'open' : 'closed'}
      initial="closed"
      ref={dropdownRef}
      className="fixed top-[70px] z-50 h-full w-[220px] rounded-r-md border border-gray-300 bg-white/20 p-4 shadow-md backdrop-blur-md lg:top-[90px]"
    >
      <UserProfile setShowSidebar={setShowSidebar} user={user} />

      <UserSidebar setShowSidebar={setShowSidebar} user={user} />
    </motion.div>
  );
};

export default SideBar;

const sidebarVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 180,
      damping: 25,
    },
  },
  closed: {
    x: '-100%',
    opacity: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 220,
      damping: 30,
    },
  },
};
