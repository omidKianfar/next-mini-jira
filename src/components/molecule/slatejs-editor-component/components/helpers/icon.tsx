import React, { Ref } from 'react';
import { Clsx } from './clsx';
import { SimpleForwardRefProps } from './type';

export const Icon = React.forwardRef<
  HTMLSpanElement,
  SimpleForwardRefProps<HTMLSpanElement>
>(({ className, children, ...props }, ref: Ref<HTMLSpanElement | null>) => (
  <span
    {...props}
    ref={ref}
    className={Clsx(className, 'material-icons align-text-bottom text-lg')}
  >
    {children}
  </span>
));
Icon.displayName = 'Icon';
