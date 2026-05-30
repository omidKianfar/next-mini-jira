import { useEffect, useRef } from 'react';
import { useEditor } from '@/src/hooks/editor/use-editor';
import { ColorItems } from '../../../data';

const ColorSelectComponent = () => {
  const {
    setShowColorDropdown,
    showColorDropdown,
    fontColorState,
    changeColor,
  } = useEditor();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showColorDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowColorDropdown?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColorDropdown, setShowColorDropdown]);

  return (
    <div className="custom-select-wrapper relative" ref={dropdownRef}>
      <div
        className={`w-[100px] cursor-pointer appearance-none rounded-sm border-2 bg-white px-2 py-1 text-bodySm ${showColorDropdown && 'border-primary-700'} `}
        onClick={() => setShowColorDropdown?.(!showColorDropdown)}
      >
        <span
          style={{
            backgroundColor: fontColorState || 'transparent',
            display: 'inline-block',
            width: '8px',
            height: '8px',
            border: fontColorState ? 'none' : '1px solid #ccc',
            marginRight: '8px',
          }}
        />
        Color
      </div>

      {showColorDropdown && (
        <ul className="scrollbar-hide absolute left-0 top-full z-50 mt-1 max-h-40 w-[100px] overflow-y-auto rounded border bg-white shadow-lg">
          <li
            key={'no-color'}
            onClick={() => {
              changeColor?.(null);
              setShowColorDropdown?.(false);
            }}
            className="cursor-pointer p-2 hover:bg-primary-500 hover:text-white"
          >
            None
          </li>

          {ColorItems.map((color) => (
            <li
              key={color.value}
              onClick={() => {
                changeColor?.(color.value);
                setShowColorDropdown?.(false);
              }}
              className="flex cursor-pointer items-center p-2 hover:bg-primary-500 hover:text-white"
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor: color.value,
                  marginRight: '8px',
                }}
              />
              {color?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ColorSelectComponent;
