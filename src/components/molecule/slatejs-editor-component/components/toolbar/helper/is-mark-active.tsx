import { Editor } from '../../../../imports';
import { IsMarkActiveProps } from '../type';

export const IsMarkActive = ({ editor, format }: IsMarkActiveProps) => {
  const marks = Editor.marks(editor);

  return marks ? (marks as any)[format] === true : false;
};
