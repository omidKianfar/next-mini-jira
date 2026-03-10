import { React, Ref } from '../../../imports';
import { ButtonProps } from '../../type';
import { Clsx } from './clsx';

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
