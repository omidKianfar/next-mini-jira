'use client';

import ButtonFreeClass from './button-free-class';
import MyIcon from '../icon-components';

interface BackButtonProps {
  onClick: () => void;
}

const ButtonBack = ({ onClick }: BackButtonProps) => {
  return (
    <ButtonFreeClass
      onClick={onClick}
      className="text-warning-400 hover:text-warning-500"
      icon={<MyIcon icon="arrow-right" className="rotate-180 text-title" />}
    />
  );
};

export default ButtonBack;
