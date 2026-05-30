import React, { ReactNode, Ref } from 'react';
import { Clsx } from './clsx';
import { BaseProps } from './type';

type ButtonProps = {
  active: boolean;
  reversed: boolean;
} & BaseProps & {
    children?: ReactNode | undefined;
  };

export const Button = React.forwardRef<HTMLSpanElement, ButtonProps>(
  (
    { className, active, reversed, children, ...props },
    ref: Ref<HTMLSpanElement | null>
  ) => (
    <span
      {...props}
      ref={ref}
      className={Clsx(
        className,
        'cursor-pointer',
        reversed
          ? active
            ? 'text-primary-500'
            : 'text-gray-400'
          : active
            ? 'text-primary-500'
            : 'text-gray-400'
      )}
    >
      {children}
    </span>
  )
);
Button.displayName = 'Button';
