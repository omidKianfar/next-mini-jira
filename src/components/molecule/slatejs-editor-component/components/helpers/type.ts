interface BaseProps {
  className: string;
  [key: string]: any;
}

type SimpleForwardRefProps<T extends HTMLElement> =
  React.PropsWithChildren<BaseProps> & React.RefAttributes<T>;

export type { BaseProps, SimpleForwardRefProps };
