// type
import { useState } from 'react';

// editor
import SlateEditor from '../slatejs-editor-component';
import ChatMenuComponent from './chat-menu';
import { ChatMenuProps, MenuType } from './type';

const ChatInput = ({ showMenu, setShowMenu }: ChatMenuProps) => {
  const [Menu, setMenu] = useState<MenuType>('text');

  const MenuHandler = (type: MenuType) => {
    setMenu(type as MenuType);
  };

  return (
    <div
      className={`absolute bottom-0 left-0 flex h-[200px] w-full items-center justify-start rounded-b-md p-1 ${!showMenu ? 'lg:h-[32px]' : 'lg:h-[150px]'}`}
    >
      <div className="relative h-full w-full">
        <ChatMenuComponent
          MenuHandler={MenuHandler}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
        {showMenu ? Menu === 'text' ? <SlateEditor /> : null : null}
      </div>
    </div>
  );
};

export default ChatInput;
