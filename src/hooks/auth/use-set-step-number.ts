'use client';

import { useEffect } from '../imports';

import { UseSetStepNumberProps } from '../type';

export const useSetStepNumber = ({ setStepNumber }: UseSetStepNumberProps) => {
  useEffect(() => {
    const saved =
      typeof window !== 'undefined' ? localStorage.getItem('step') : null;
    if (saved) setStepNumber(saved);
  }, []);
};
