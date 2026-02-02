import { Editor, Element as SlateElement } from 'slate';

// data
import { LIST_TYPES } from '../../../data';

// type
import { BlockFormat, CustomElement } from '../../../type';
import { IsBlockActiveProps } from '../type';

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
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === 'align')
            return (n as CustomElement).align === format;

          if (LIST_TYPES.includes(format as BlockFormat)) {
            if ((n as CustomElement).type === 'listItem') {
              const listMatch = Editor.above(editor, {
                match: (n) =>
                  SlateElement.isElement(n) &&
                  (n as CustomElement).type === format,
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
