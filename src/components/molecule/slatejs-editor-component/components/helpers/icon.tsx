import { React, Ref } from '../../../imports';
import { SimpleForwardRefProps } from '../../type';
import { Clsx } from './clsx';

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
