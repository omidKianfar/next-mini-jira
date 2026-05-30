import { useSlate } from 'slate-react';
import { IsBlockActive } from './is-block-active';
import { ToggleBlock } from './toggle-block';
import { Button } from '../../helpers/button';
import { TEXT_ALIGN_TYPES } from '../../../data';
import { AlignFormat, BlockFormat } from '../../../type';

interface BlockButtonProps {
  format: BlockFormat | AlignFormat;
  icon: React.ReactNode;
}

export const BlockButton = ({ format, icon }: BlockButtonProps) => {
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
