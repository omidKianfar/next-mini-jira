import { useEditor } from '@/src/hooks/editor/use-editor';
import { fontFamilyOptions } from '../../../data';

const FontSelectComponent = () => {
  const { changeFontFamily, fontFamilyState } = useEditor();

  return (
    <select
      className="scrollbar-hide w-[100px] cursor-pointer appearance-none rounded-sm border-2 px-2 py-1 text-bodySm focus:border-primary-700 focus:outline-none"
      onChange={(e) => changeFontFamily?.(e.target.value)}
      value={fontFamilyState}
    >
      {fontFamilyOptions.map((fontStyle) => (
        <option
          key={fontStyle.value}
          value={fontStyle.value}
          style={{ fontFamily: fontStyle.value }}
        >
          {fontStyle.name}
        </option>
      ))}
    </select>
  );
};

export default FontSelectComponent;
