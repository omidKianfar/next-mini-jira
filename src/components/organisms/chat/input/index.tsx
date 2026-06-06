'use client';

import { lazy, Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFileUploader } from '@/src/hooks/file-uploader/use-file-uploader';
import ChatMenuComponent from '../../../molecule/chat/chat-menu';
import PageLoading from '@/src/components/common/page-loading';
import LoadingCircle from '@/src/components/atom/loadings/loading-circle';
import { ChatMenuProps, MenuType } from '@/src/types/global';

const SlateEditor = lazy(
  () => import('../../../molecule/slatejs-editor-component/editor')
);
const UploadMenuComponent = lazy(() => import('../../../molecule/chat/upload'));
const VoiceMenuComponent = lazy(() => import('../../../molecule/chat/voice'));

const ChatInput = ({
  showMenu,
  setShowMenu,
  editorKey,
  editMessageId,
  setEditMessageId,
  Menu,
  setMenu,
}: ChatMenuProps) => {
  const fileUploader = useFileUploader({
    accept: ['image/*', 'video/*', 'audio/*'],
  });

  const MenuHandler = (type: MenuType) => {
    setMenu?.(type as MenuType);
    fileUploader.reset();
  };

  const fastTransition = {
    duration: 0.2,
    ease: 'easeOut' as const,
  };

  return (
    <div
      className={`z-41 absolute bottom-0 left-0 flex w-full items-center justify-start rounded-b-md p-1 transition-all duration-300 ${
        !showMenu ? 'h-[32px]' : 'h-[250px] lg:h-[227px]'
      }`}
    >
      <Suspense fallback={<PageLoading />}>
        <div className="relative h-full w-full">
          <ChatMenuComponent
            MenuHandler={MenuHandler}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />

          <AnimatePresence mode="wait">
            {showMenu && (
              <motion.div
                key="chat-input-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={fastTransition}
                className="h-full w-full rounded-md border-2 border-primary-400 bg-white"
              >
                <AnimatePresence mode="wait">
                  {Menu === 'text' ? (
                    <motion.div
                      key="text-editor"
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={fastTransition}
                      className="h-full w-full"
                    >
                      <SlateEditor
                        editorKey={editorKey}
                        editMessageId={editMessageId}
                        setEditMessageId={setEditMessageId}
                      />
                    </motion.div>
                  ) : Menu === 'upload' ? (
                    <motion.div
                      key="upload-menu"
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={fastTransition}
                      className="h-full w-full"
                    >
                      <UploadMenuComponent fileUploader={fileUploader} />
                    </motion.div>
                  ) : Menu === 'voice' ? (
                    <motion.div
                      key="voice-menu"
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={fastTransition}
                      className="h-full w-full"
                    >
                      <VoiceMenuComponent fileUploader={fileUploader} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="loading-menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full w-full items-center justify-center rounded-md bg-gray-300"
                    >
                      <LoadingCircle />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Suspense>
    </div>
  );
};

export default ChatInput;
