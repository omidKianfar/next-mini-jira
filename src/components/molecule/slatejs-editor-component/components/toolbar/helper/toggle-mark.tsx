import { Editor } from '../../../../imports';
import { IsMarkActive } from './is-mark-active';
import { ToggleMarkProps } from '../type';

export const ToggleMark = ({ editor, format }: ToggleMarkProps) => {
  if (IsMarkActive({ editor, format })) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
