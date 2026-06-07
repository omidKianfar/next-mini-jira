import { useEffect, useRef } from 'react';
import { useEditor } from '@/src/hooks/editor/use-editor';
import { ColorItems } from '../../../data';

const BGColorSelectComponent = () => {
  const {
    setShowBackgroundDropdown,
    showBackgroundDropdown,
    fontBgColorState,
    changeBackgroundColor,
  } = useEditor();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showBackgroundDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowBackgroundDropdown?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showBackgroundDropdown, setShowBackgroundDropdown]);

  return (
    <div className="custom-select-wrapper relative" ref={dropdownRef}>
      <div
        className={`w-[100px] cursor-pointer appearance-none rounded-sm border-2 bg-white px-2 py-1 text-bodySm ${showBackgroundDropdown && 'border-primary-700'}`}
        onClick={() => setShowBackgroundDropdown?.(!showBackgroundDropdown)}
      >
        <span
          style={{
            backgroundColor: fontBgColorState || 'transparent',
            display: 'inline-block',
            width: '8px',
            height: '8px',
            border: fontBgColorState ? 'none' : '1px solid #ccc',
            marginRight: '8px',
          }}
        />
        BG Color
      </div>

      {showBackgroundDropdown && (
        <ul className="scrollbar-hide absolute left-0 top-full z-50 mt-1 max-h-40 w-[100px] overflow-y-auto rounded border bg-white shadow-lg">
          <li
            key={'no-color'}
            onClick={() => {
              changeBackgroundColor?.(null);
              setShowBackgroundDropdown?.(false);
            }}
            className="cursor-pointer p-2 hover:bg-primary-500 hover:text-white"
          >
            None
          </li>

          {ColorItems.map((color) => (
            <li
              key={color.value}
              onClick={() => {
                changeBackgroundColor?.(color.value);
                setShowBackgroundDropdown?.(false);
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

export default BGColorSelectComponent;
