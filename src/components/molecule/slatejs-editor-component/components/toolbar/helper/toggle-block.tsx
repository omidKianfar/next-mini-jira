import { Editor, Transforms, Element as SlateElement } from 'slate';

// data
import { LIST_TYPES, TEXT_ALIGN_TYPES } from '../../../data';

// type
import { AlignFormat, BlockFormat, CustomElement } from '../../../type';
import { ToggleBlockProps } from '../type';

// components
import { IsBlockActive } from './is-block-active';

export const ToggleBlock = ({ editor, format }: ToggleBlockProps) => {
  const blockType: 'type' | 'align' = TEXT_ALIGN_TYPES.includes(
    format as AlignFormat
  )
    ? 'align'
    : 'type';

  const isActive = IsBlockActive({ editor, format, blockType });

  const isList = LIST_TYPES.includes(format as BlockFormat);

  if (blockType === 'align') {
    Transforms.setNodes<SlateElement>(editor, {
      align: isActive ? undefined : (format as AlignFormat),
    });

    return;
  }

  const listMatch = Editor.above(editor, {
    match: (n) =>
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as CustomElement).type),
  });

  if (listMatch) {
    const parentType = (listMatch[0] as CustomElement).type;

    if (isActive || !isList) {
      Transforms.unwrapNodes(editor, {
        match: (n) =>
          SlateElement.isElement(n) &&
          LIST_TYPES.includes((n as CustomElement).type),
        split: true,
      });
    } else if (isList && parentType !== format) {
      Transforms.setNodes(
        editor,
        { type: 'paragraph' },
        { match: (n) => SlateElement.isElement(n) && n.type === 'listItem' }
      );
      Transforms.unwrapNodes(editor, {
        match: (n) =>
          SlateElement.isElement(n) &&
          LIST_TYPES.includes((n as CustomElement).type),
        split: true,
      });
    }
  }

  const newType: BlockFormat = isActive
    ? 'paragraph'
    : isList
      ? 'listItem'
      : (format as BlockFormat);
  Transforms.setNodes<SlateElement>(
    editor,
    { type: newType },
    {
      match: (n) =>
        SlateElement.isElement(n) &&
        !Editor.isEditor(n) &&
        !LIST_TYPES.includes((n as CustomElement).type),
    }
  );

  if (!isActive && isList) {
    const block: CustomElement = {
      type: format as BlockFormat,
      children: [],
    } as CustomElement;

    Transforms.wrapNodes(editor, block);
  }
};
