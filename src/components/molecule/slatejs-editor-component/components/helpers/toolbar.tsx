import React, { Ref } from 'react';

// type
import { SimpleForwardRefProps } from '../../type';

// helpers
import { Clsx } from './clsx';
import { Menu } from './menu';

export const Toolbar = React.forwardRef<
  HTMLDivElement,
  SimpleForwardRefProps<HTMLDivElement>
>((props, ref: Ref<HTMLDivElement | null>) => (
  <Menu {...props} ref={ref} className={Clsx(props.className, 'relative')} />
));
Toolbar.displayName = 'Toolbar';
