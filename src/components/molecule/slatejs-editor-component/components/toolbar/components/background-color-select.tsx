import { useEditor } from '../../../../imports';
import { ColorItems } from '../../../data';

const BGColorSelectComponent = () => {
  const {
    setShowBackgroundDropdown,
    showBackgroundDropdown,
    fontBgColorState,
    changeBackgroundColor,
  } = useEditor();

  return (
    <div className="custom-select-wrapper relative">
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
        <ul className="scrollbar-hide absolute bottom-full z-10 mb-1 max-h-40 w-[100px] overflow-y-auto rounded border bg-white shadow-lg">
          <li
            key={'no-color'}
            onClick={() => changeBackgroundColor?.(null)}
            className="cursor-pointer p-2 hover:bg-primary-500"
          >
            None
          </li>

          {ColorItems.map((color) => (
            <li
              key={color.value}
              onClick={() => changeBackgroundColor?.(color.value)}
              className="flex cursor-pointer items-center p-2 hover:bg-primary-500"
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
