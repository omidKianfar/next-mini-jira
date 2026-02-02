import { useSlate } from 'slate-react';
import { Editor, Element as SlateElement } from 'slate';

// data
import { LIST_TYPES } from '../../../data';

// components
import { ToggleBlock } from './toggle-block';

// type
import { BLOCK_TYPES, BlockFormat, CustomElement } from '../../../type';

export const BlockTypeSelect = () => {
  // hook
  const editor = useSlate();

  //   functions
  const getActiveBlockFormat = (): BlockFormat => {
    const [match] = Array.from(
      Editor.nodes(editor, {
        match: (n) => SlateElement.isElement(n) && !Editor.isEditor(n),
        mode: 'lowest',
      })
    );

    const type = match ? (match[0] as CustomElement).type : 'paragraph';

    if (type === 'listItem') {
      const [listMatch] = Array.from(
        Editor.nodes(editor, {
          match: (n) =>
            SlateElement.isElement(n) &&
            LIST_TYPES.includes((n as CustomElement).type),
          mode: 'lowest',
        })
      );
      if (listMatch) return (listMatch[0] as CustomElement).type;
    }

    return BLOCK_TYPES.map((b) => b.format).includes(type) ? type : 'paragraph';
  };

  return (
    <select
      className="w-[60px] cursor-pointer appearance-none rounded-sm border-2 px-2 py-1 text-bodySm focus:border-primary-700 focus:outline-none"
      value={getActiveBlockFormat()}
      onChange={(e) => {
        e.preventDefault();
        ToggleBlock({ editor, format: e.target.value as BlockFormat });
      }}
    >
      {BLOCK_TYPES.map((block) => (
        <option className="font-bold" key={block.format} value={block.format}>
          {block.name}
        </option>
      ))}
    </select>
  );
};
