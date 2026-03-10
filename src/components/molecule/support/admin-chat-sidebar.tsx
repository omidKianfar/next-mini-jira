import {
  AnimatePresence,
  motion,
  useIsMobile,
  ButtonFreeClass,
  MyIcon,
  chatSidebarProps,
  ChatSidebar,
} from '../imports';

const AdminChatSidebar = ({
  showSidebar,
  setShowSidebar,
}: Pick<chatSidebarProps, 'setShowSidebar' | 'showSidebar'>) => {
  const isMobile = useIsMobile();

  const fastTransition = {
    duration: 0.15,
    ease: 'easeInOut' as const,
  };

  return (
    <AnimatePresence mode="sync">
      {!showSidebar ? (
        <motion.div
          key="open-btn-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fastTransition}
          className="z-50 p-4 lg:absolute lg:left-0 lg:top-0 lg:px-3"
        >
          <div className="flex items-center justify-start">
            <ButtonFreeClass
              onClick={() => setShowSidebar?.(true)}
              className="rounded-lg border-2 border-gray-300 bg-white p-1 shadow-md"
              icon={
                <MyIcon icon="logout" className="text-h4 text-primary-500" />
              }
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="sidebar-container"
          initial={isMobile ? { y: '-100%' } : { opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={isMobile ? { y: '-100%' } : { opacity: 0 }}
          transition={fastTransition}
          className={`z-40 h-[calc(100vh-60px)] shrink-0 lg:h-[calc(100vh-78px)] ${
            isMobile ? 'w-full' : 'w-[300px]'
          }`}
        >
          <div className="h-full w-full p-4 lg:pr-0">
            <div className="h-full w-full rounded-lg border-2 border-warning-500 bg-white p-2 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="mx-2 text-subtitle font-semibold text-warning-500">
                  Chats List
                </h2>

                <ButtonFreeClass
                  onClick={() => setShowSidebar?.(false)}
                  className="rounded-md border-2 border-gray-200 bg-gray-50 p-1 shadow-md"
                  icon={
                    <MyIcon
                      icon="logout"
                      iconClass="rotate-180"
                      className="text-h4 text-warning-500"
                    />
                  }
                />
              </div>

              <div className="mt-4 h-[calc(100vh-178px)] overflow-y-auto rounded-md">
                <ChatSidebar setShowSidebar={setShowSidebar} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminChatSidebar;
