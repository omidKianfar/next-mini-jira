import React from 'react';
import { useSlate } from 'slate-react';

// data
import { TEXT_ALIGN_TYPES } from '../../../data';

// components
import { Button } from '../../helpers/button';
import { IsBlockActive } from './is-block-active';
import { ToggleBlock } from './toggle-block';

// type
import { AlignFormat } from '../../../type';
import { BlockButtonProps } from '../type';

export const BlockButton = ({ format, icon }: BlockButtonProps) => {
  // hooks
  const editor = useSlate();
  const isAlign = TEXT_ALIGN_TYPES.includes(format as AlignFormat);

  return (
    <Button
      active={IsBlockActive({
        editor,
        format,
        blockType: isAlign ? 'align' : 'type',
      })}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();
        ToggleBlock({ editor, format });
      }}
    >
      {icon}
    </Button>
  );
};
