import { useState, useRef, useEffect } from 'react';
import { Editor, Element } from 'slate';
import { useSlate } from 'slate-react';
import { ToggleBlock } from './toggle-block';
import { LIST_TYPES } from '../../../data';
import { BLOCK_TYPES, BlockFormat, CustomElement } from '../../../type';

export const BlockTypeSelect = () => {
  const editor = useSlate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const getActiveBlockFormat = (): BlockFormat => {
    const [match] = Array.from(
      Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && !Editor.isEditor(n),
        mode: 'lowest',
      })
    );

    const type = match ? (match[0] as CustomElement).type : 'paragraph';

    if (type === 'listItem') {
      const [listMatch] = Array.from(
        Editor.nodes(editor, {
          match: (n) =>
            Element.isElement(n) &&
            LIST_TYPES.includes((n as CustomElement).type),
          mode: 'lowest',
        })
      );

      if (listMatch) return (listMatch[0] as CustomElement).type;
    }

    return BLOCK_TYPES.map((b) => b.format).includes(type) ? type : 'paragraph';
  };

  const activeFormat = getActiveBlockFormat();

  const currentBlock = BLOCK_TYPES.find((b) => b.format === activeFormat);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-[60px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full cursor-pointer items-center justify-between rounded-sm border-2 bg-white px-2 py-1 text-bodySm focus:outline-none ${
          isOpen ? 'border-primary-700' : ''
        }`}
      >
        <span className="truncate font-semibold">
          {currentBlock ? currentBlock.name : 'P'}
        </span>
        <span
          className={`text-[9px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <ul className="scrollbar-hide absolute left-0 top-full z-50 mt-1 max-h-40 w-[120px] overflow-y-auto rounded-sm border bg-white shadow-lg">
          {BLOCK_TYPES.map((block) => (
            <li
              key={block.format}
              onClick={() => {
                ToggleBlock({ editor, format: block.format as BlockFormat });
                setIsOpen(false);
              }}
              className={`cursor-pointer px-3 py-1.5 text-bodySm transition-colors hover:bg-primary-500 hover:text-white ${
                activeFormat === block.format
                  ? 'bg-primary-50 font-bold text-primary-700'
                  : ''
              }`}
            >
              {block.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
