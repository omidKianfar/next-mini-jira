'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// editor
import SlateEditor from '../../slatejs-editor-component/editor';

// ui
import ChatMenuComponent from '../chat-menu';
import UploadMenuComponent from './menu/upload';
import VoiceMenuComponent from './menu/voice';
import LoadingCircle from '@/src/components/atom/loadings/loading-circle';

// type
import { ChatMenuProps, MenuType } from '../type';

// hooks
import { useFileUploader } from '@/src/hooks/file-uploader/use-file-uploader';

const ChatInput = ({
  showMenu,
  setShowMenu,
  editorKey,
  editMessageId,
  setEditMessageId,
}: ChatMenuProps) => {
  // hook
  const fileUploader = useFileUploader({
    accept: ['image/*', 'video/*', 'audio/*'],
  });

  // state
  const [Menu, setMenu] = useState<MenuType>('text');

  // function
  const MenuHandler = (type: MenuType) => {
    setMenu(type as MenuType);
    fileUploader.reset();
  };

  // animation style
  const fastTransition = {
    duration: 0.2,
    ease: 'easeOut' as const,
  };

  return (
    <div
      className={`absolute bottom-0 left-0 z-10 flex w-full items-center justify-start rounded-b-md p-1 transition-all duration-300 ${
        !showMenu ? 'h-[32px]' : 'h-[250px] lg:h-[227px]'
      }`}
    >
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
              className="h-full w-full overflow-hidden rounded-md border-2 border-primary-500 bg-white"
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
    </div>
  );
};

export default ChatInput;
