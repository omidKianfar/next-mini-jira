import { menuItems } from './data';
import { Icon } from '@iconify/react';
import { ChatMenuProps, MenuType } from '@/src/types/global';

const ChatMenuComponent = ({
  showMenu,
  MenuHandler,
  setShowMenu,
}: ChatMenuProps) => {
  return (
    <div
      className={`${showMenu ? 'top-[-36px]' : 'bottom-0'} absolute left-0 flex w-full items-center justify-center`}
    >
      <div
        className={`flex h-[38px] w-[150px] items-center justify-between border-2 ${showMenu ? 'rounded-t-md border-b-0 bg-white' : 'rounded-md bg-primary-50'} border-primary-500 p-2`}
      >
        {menuItems?.map((menu) => (
          <div
            key={menu?.id}
            onClick={() => {
              MenuHandler?.(menu?.type as MenuType);
              setShowMenu?.(true);
            }}
          >
            <Icon
              icon={menu.icon}
              className="cursor-pointer text-h4 hover:text-primary-500"
              onClick={() => {
                MenuHandler?.('text');
                setShowMenu?.(true);
              }}
            />
          </div>
        ))}

        <div className="border-primary-10 border-l border-dashed">
          <Icon
            icon={showMenu ? 'codex:chevron-down' : 'codex:chevron-up'}
            className={`cursor-pointer text-h4 hover:text-primary-500`}
            onClick={() => setShowMenu?.(!showMenu)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatMenuComponent;
