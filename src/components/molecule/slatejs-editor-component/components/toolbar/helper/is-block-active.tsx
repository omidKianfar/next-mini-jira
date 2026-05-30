import { Editor, Element } from 'slate';
import { LIST_TYPES } from '../../../data';
import { BlockFormat, CustomElement } from '../../../type';

interface IsBlockActiveProps {
  editor: Editor;
  format: string;
  blockType: 'type' | 'align';
}
export const IsBlockActive = ({
  editor,
  format,
  blockType = 'type',
}: IsBlockActiveProps) => {
  const { selection } = editor;

  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && Element.isElement(n)) {
          if (blockType === 'align') {
            return (n as CustomElement).align === format;
          }

          if (LIST_TYPES.includes(format as BlockFormat)) {
            if ((n as CustomElement).type === 'listItem') {
              const listMatch = Editor.above(editor, {
                match: (n) =>
                  Element.isElement(n) && (n as CustomElement).type === format,
              });

              return !!listMatch;
            }
          } else {
            return (n as CustomElement).type === format;
          }
        }

        return false;
      },
    })
  );

  return !!match;
};
