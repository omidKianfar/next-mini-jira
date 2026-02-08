import { Dispatch, SetStateAction } from 'react';

export interface ChatMenuProps {
  MenuHandler?: (type: MenuType) => void;
  showMenu?: boolean;
  setShowMenu?: Dispatch<SetStateAction<boolean>>;
}

export type MenuType = 'text' | 'upload' | 'voice';
