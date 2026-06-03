import { Dispatch, SetStateAction } from 'react';

interface AddTaskProps {
  handleClose: () => void;
  setNumber: Dispatch<SetStateAction<number>>;
  loading: boolean;
  url?: string | null;
}

export type { AddTaskProps };
