import { MyUserType } from '@/src/types/global';

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
  toggleActive: (user: MyUserType) => Promise<void>;
}

export type { CellContent, Column, TableProps, UsersTableProps };
