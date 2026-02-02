import React from 'react';
import { useSlate } from 'slate-react';

// helper
import { Button } from '../../helpers/button';

// components
import { IsMarkActive } from './is-mark-active';
import { ToggleMark } from './toggle-mark';

// type
import { MarkButtonProps } from '../type';

export const MarkButton = ({ format, icon }: MarkButtonProps) => {
  // hooks
  const editor = useSlate();

  return (
    <Button
      active={IsMarkActive({ editor, format })}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        ToggleMark({ editor, format });
      }}
    >
      {icon}
    </Button>
  );
};
