import { Dispatch, SetStateAction } from 'react';

interface AddTaskProps {
  handleClose: () => void;
  setNumber: Dispatch<SetStateAction<number>>;
  loading: boolean;
}

export type { AddTaskProps };
