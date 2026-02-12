import { Icon } from '@iconify/react';

// type
import { ChatMenuProps, MenuType } from './type';

// data
import { menuItems } from './data';

const ChatMenuComponent = ({
  showMenu,
  MenuHandler,
  setShowMenu,
}: ChatMenuProps) => {
  return (
    <div
      className={`${showMenu ? 'top-[-35px]' : 'bottom-0'} absolute left-0 flex w-full items-center justify-center`}
    >
      <div
        className={`flex h-[38px] w-[150px] items-center justify-between border-2 ${showMenu ? 'rounded-t-md border-b-0 bg-white' : 'rounded-md bg-primary-50'} border-primary-500 p-2`}
      >
        {menuItems?.map((menu) => (
          <div
            key={menu?.id}
            onClick={() => MenuHandler?.(menu?.type as MenuType)}
          >
            <Icon
              icon={'majesticons:text'}
              className="cursor-pointer text-h4 hover:text-primary-500"
              onClick={() => MenuHandler?.('text')}
            />
          </div>
        ))}

        <div className="border-primary-10 border-l border-dashed">
          <Icon
            icon={'codex:chevron-down'}
            className={`rotate-180 cursor-pointer text-h4 hover:text-primary-500 ${showMenu && 'rotate-0'}`}
            onClick={() => setShowMenu?.(!showMenu)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMenuComponent;
