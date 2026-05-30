import { Editor } from 'slate';
import { IsMarkActive } from './is-mark-active';
import { MarkFormat } from '../../../type';

interface ToggleMarkProps {
  editor: Editor;
  format: MarkFormat;
}

export const ToggleMark = ({ editor, format }: ToggleMarkProps) => {
  if (IsMarkActive({ editor, format })) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
