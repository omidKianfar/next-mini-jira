import { useSlate } from '../../../../imports';
import { Button } from '../../helpers/button';
import { IsMarkActive } from './is-mark-active';
import { ToggleMark } from './toggle-mark';
import { MarkButtonProps } from '../type';

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
