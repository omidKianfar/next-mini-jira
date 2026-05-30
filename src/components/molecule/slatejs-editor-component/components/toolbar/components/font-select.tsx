import { useState, useRef, useEffect } from 'react';
import { useEditor } from '@/src/hooks/editor/use-editor';
import { fontFamilyOptions } from '../../../data';
import { stringSlicer } from '@/src/utils/string-slicer';

const FontSelectComponent = () => {
  const { changeFontFamily, fontFamilyState } = useEditor();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentFont = fontFamilyOptions.find(
    (font) => font.value === fontFamilyState
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-[100px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between rounded-sm border-2 bg-white px-2 py-1 text-bodySm focus:border-primary-700 focus:outline-none"
        style={{ fontFamily: fontFamilyState }}
      >
        <span>
          {currentFont
            ? stringSlicer({ string: currentFont.name as string, slice: 6 })
            : 'Select'}
        </span>
        <span
          className={`text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="scrollbar-hide absolute left-0 top-full z-50 mt-1 max-h-32 w-full overflow-y-auto rounded-sm border bg-white shadow-lg">
          {fontFamilyOptions.map((fontStyle) => (
            <div
              key={fontStyle.value}
              style={{ fontFamily: fontStyle.value }}
              onClick={() => {
                changeFontFamily?.(fontStyle.value);
                setIsOpen(false);
              }}
              className={`cursor-pointer px-2 py-1.5 text-bodySm transition-colors hover:bg-gray-100 ${
                fontFamilyState === fontStyle.value
                  ? 'bg-primary-50 font-medium text-primary-700'
                  : ''
              }`}
            >
              {fontStyle.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontSelectComponent;
