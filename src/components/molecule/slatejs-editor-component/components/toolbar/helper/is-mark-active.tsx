import { Editor } from 'slate';
import { MarkFormat } from '../../../type';

interface IsMarkActiveProps {
  editor: Editor;
  format: MarkFormat;
}

export const IsMarkActive = ({ editor, format }: IsMarkActiveProps) => {
  const marks = Editor.marks(editor);

  return marks ? (marks as any)[format] === true : false;
};
