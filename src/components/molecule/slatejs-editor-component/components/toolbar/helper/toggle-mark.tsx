import { Editor } from 'slate';

// components
import { IsMarkActive } from './is-mark-active';

// type
import { ToggleMarkProps } from '../type';

export const ToggleMark = ({ editor, format }: ToggleMarkProps) => {
  if (IsMarkActive({ editor, format })) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
