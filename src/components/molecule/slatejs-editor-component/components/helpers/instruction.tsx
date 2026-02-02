import React, { Ref } from 'react';

// type
import { SimpleForwardRefProps } from '../../type';

// helpers
import { Clsx } from './clsx';

export const Instruction = React.forwardRef<
  HTMLDivElement,
  SimpleForwardRefProps<HTMLDivElement>
>(({ className, children, ...props }, ref: Ref<HTMLDivElement | null>) => (
  <div
    {...props}
    ref={ref}
    className={Clsx(
      className,
      'whitespace-pre-wrap rounded border border-yellow-200 bg-yellow-50 p-2 text-sm'
    )}
  >
    {children}
  </div>
));
Instruction.displayName = 'Instruction';
