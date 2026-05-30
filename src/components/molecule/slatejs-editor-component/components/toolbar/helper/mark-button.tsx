import { useSlate } from 'slate-react';
import { IsMarkActive } from './is-mark-active';
import { ToggleMark } from './toggle-mark';
import { Button } from '../../helpers/button';
import { MarkFormat } from '../../../type';

interface MarkButtonProps {
  format: MarkFormat;
  icon: React.ReactNode;
}
export const MarkButton = ({ format, icon }: MarkButtonProps) => {
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
