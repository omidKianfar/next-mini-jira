import { React, Ref } from '../../../imports';
import { Clsx } from './clsx';
import { Menu } from './menu';
import { SimpleForwardRefProps } from '../../type';

export const Toolbar = React.forwardRef<
  HTMLDivElement,
  SimpleForwardRefProps<HTMLDivElement>
>((props, ref: Ref<HTMLDivElement | null>) => (
  <Menu {...props} ref={ref} className={Clsx(props.className, 'relative')} />
));
Toolbar.displayName = 'Toolbar';
