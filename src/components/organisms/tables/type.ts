import { MyUserType } from '@/src/types/global';
import { Dispatch, SetStateAction } from 'react';

type CellContent<T> =
  | string
  | number
  | React.ReactNode
  | ((row: T) => React.ReactNode);

type Column<T> = {
  key?: string;
  head: CellContent<T>;
  column: CellContent<T>;
  className?: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

interface UsersTableProps {
  users: MyUserType[];
  goDetail: (userId: string) => void;
  setUser: Dispatch<SetStateAction<MyUserType | null>>;
  handleOpenModal: () => void;
}

export type { CellContent, Column, TableProps, UsersTableProps };
