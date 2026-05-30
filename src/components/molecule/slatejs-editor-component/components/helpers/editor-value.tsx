import React, { ReactNode, Ref } from 'react';
import { Descendant } from 'slate';
import { Clsx } from './clsx';
import { BaseProps } from './type';

type EditorValueProps = BaseProps & {
  value: Descendant[];
  children?: ReactNode | undefined;
};

export const EditorValue = React.forwardRef<HTMLDivElement, EditorValueProps>(
  (
    { className, value, children, ...props },
    ref: Ref<HTMLDivElement | null>
  ) => {
    const textLines = JSON.stringify(value, null, 2);

    return (
      <div
        ref={ref}
        {...props}
        className={Clsx(className, 'border border-gray-300 bg-gray-50 p-2')}
      >
        <div className="border-b border-gray-300 bg-gray-200 p-1 text-sm font-semibold text-gray-700">
          Slate's value as JSON (For Debugging)
        </div>

        <pre className="overflow-y-auto whitespace-pre-wrap p-1 font-mono text-xs text-gray-600">
          {textLines}
        </pre>
      </div>
    );
  }
);
EditorValue.displayName = 'EditorValue';
