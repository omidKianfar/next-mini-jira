import { Icon } from '@iconify/react';
import { ChatMenuProps } from './type';

const ChatMenuComponent = ({
  showMenu,
  MenuHandler,
  setShowMenu,
}: ChatMenuProps) => {
  return (
    <div
      className={`${showMenu ? 'top-[-34px]' : 'bottom-0'} absolute left-0 flex w-full items-center justify-center`}
    >
      <div
        className={`flex h-[38px] w-[150px] items-center justify-between ${showMenu ? 'rounded-t-md bg-white' : 'rounded-md bg-primary-50'} border-2 border-primary-500 p-2`}
      >
        <Icon
          icon={'majesticons:text'}
          className="cursor-pointer text-h4 hover:text-primary-500"
          onClick={() => MenuHandler?.('text')}
        />
        <Icon
          icon={'ic:round-upload'}
          className="cursor-pointer text-h4 hover:text-primary-500"
          onClick={() => MenuHandler?.('upload')}
        />
        <Icon
          icon={'mingcute:voice-fill'}
          className="cursor-pointer text-h4 hover:text-primary-500"
          onClick={() => MenuHandler?.('voice')}
        />

        <Icon
          icon={'codex:chevron-down'}
          className={`rotate-180 cursor-pointer text-h4 hover:text-primary-500 ${showMenu && 'rotate-0'}`}
          onClick={() => setShowMenu?.(!showMenu)}
        />
      </div>
    </div>
  );
};

export default ChatMenuComponent;
