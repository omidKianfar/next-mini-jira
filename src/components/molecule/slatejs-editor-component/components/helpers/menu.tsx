import React, { Ref } from 'react';

// type
import { SimpleForwardRefProps } from '../../type';

// helpers
import { Clsx } from './clsx';

export const Menu = React.forwardRef<
  HTMLDivElement,
  SimpleForwardRefProps<HTMLDivElement>
>(({ className, children, ...props }, ref: Ref<HTMLDivElement | null>) => (
  <div
    {...props}
    data-test-id="menu"
    ref={ref}
    className={Clsx(className, 'flex items-center space-x-4')}
  >
    {children}
  </div>
));
Menu.displayName = 'Menu';
