import { useState } from 'react';

// editor
import SlateEditor from '../../slatejs-editor-component/editor';

// ui
import ChatMenuComponent from '../chat-menu';
import UploadMenuComponent from './menu/upload';
import VoiceMenuComponent from './menu/voice';

// type
import { ChatMenuProps, MenuType } from '../type';

// hooks
import { useFileUploader } from '@/src/hooks/file-uploader/use-file-uploader';
import LoadingCircle from '@/src/components/atom/loadings/loading-circle';

const ChatInput = ({
  showMenu,
  setShowMenu,
  editorKey,
  editMessageId,
  setEditMessageId,
}: ChatMenuProps) => {
  // states
  const [Menu, setMenu] = useState<MenuType>('text');

  // functions
  const MenuHandler = (type: MenuType) => {
    setMenu(type as MenuType);
    fileUploader.reset();
  };

  const fileUploader = useFileUploader({
    accept: ['image/*', 'video/*', 'audio/*'],
  });

  return (
    <div
      className={`absolute bottom-0 left-0 z-10 flex h-[200px] w-full items-center justify-start rounded-b-md p-1 ${!showMenu ? 'lg:h-[32px]' : 'lg:h-[227px]'}`}
    >
      <div className="relative h-full w-full">
        <ChatMenuComponent
          MenuHandler={MenuHandler}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />

        {showMenu ? (
          Menu === 'text' ? (
            <SlateEditor
              editorKey={editorKey}
              editMessageId={editMessageId}
              setEditMessageId={setEditMessageId}
            />
          ) : Menu === 'upload' ? (
            <UploadMenuComponent fileUploader={fileUploader} />
          ) : Menu === 'voice' ? (
            <VoiceMenuComponent fileUploader={fileUploader} />
          ) : (
            <LoadingCircle />
          )
        ) : (
          <LoadingCircle />
        )}
      </div>
    </div>
  );
};

export default ChatInput;
