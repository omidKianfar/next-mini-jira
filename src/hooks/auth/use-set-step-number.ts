'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

interface UseSetStepNumberProps {
  setStepNumber: Dispatch<SetStateAction<string>>;
}

export const useSetStepNumber = ({ setStepNumber }: UseSetStepNumberProps) => {
  useEffect(() => {
    const saved =
      typeof window !== 'undefined' ? localStorage.getItem('step') : null;
    if (saved) setStepNumber(saved);
  }, []);
};
