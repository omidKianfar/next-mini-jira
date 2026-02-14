// type
import { useState } from 'react';

// editor
import SlateEditor from '../../slatejs-editor-component';

// chat
import ChatMenuComponent from '../chat-menu';
import UploadMenuComponent from './menu/upload';

// type
import { ChatMenuProps, MenuType } from '../type';

// hooks
import { useFileUploader } from '@/src/hooks/file-uploader/use-file-uploader';
import VoiceMenuComponent from './menu/voice';

const ChatInput = ({ showMenu, setShowMenu }: ChatMenuProps) => {
  // states
  const [Menu, setMenu] = useState<MenuType>('text');

  // functions
  const MenuHandler = (type: MenuType) => {
    setMenu(type as MenuType);
  };

  const fileUploader = useFileUploader({
    accept: ['image/*', 'video/*'],
  });

  return (
    <div
      className={`absolute bottom-0 left-0 flex h-[200px] w-full items-center justify-start rounded-b-md p-1 ${!showMenu ? 'lg:h-[32px]' : 'lg:h-[227px]'}`}
    >
      <div className="relative h-full w-full">
        <ChatMenuComponent
          MenuHandler={MenuHandler}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
        {showMenu ? (
          Menu === 'text' ? (
            <SlateEditor />
          ) : Menu === 'upload' ? (
            <UploadMenuComponent fileUploader={fileUploader} />
          ) : (
            <VoiceMenuComponent />
          )
        ) : null}
      </div>
    </div>
  );
};

export default ChatInput;
