import { MarkButton } from '../helper/mark-button';
import { BlockButton } from '../helper/block-button';
import { BlockTypeSelect } from '../helper/block-type-select';
import MyIcon from '@/src/components/atom/icon-components';

const ToolbarButtonsComponents = () => {
  return (
    <>
      <BlockTypeSelect />

      <MarkButton
        format="bold"
        icon={<MyIcon icon="bold" className="text-bodySm" />}
      />
      <MarkButton
        format="italic"
        icon={<MyIcon icon="italic" className="text-subtitle" />}
      />
      <MarkButton
        format="underline"
        icon={<MyIcon icon="under-line" className="text-subtitle" />}
      />
      <MarkButton
        format="code"
        icon={<MyIcon icon="code" className="text-subtitle" />}
      />
      <BlockButton
        format="numberedList"
        icon={<MyIcon icon="number-list" className="text-subtitle" />}
      />
      <BlockButton
        format="bulletedList"
        icon={<MyIcon icon="bullet-list" className="text-subtitle" />}
      />
      <BlockButton
        format="left"
        icon={<MyIcon icon="align-left" className="text-subtitle" />}
      />
      <BlockButton
        format="center"
        icon={<MyIcon icon="align-center" className="text-subtitle" />}
      />
      <BlockButton
        format="right"
        icon={<MyIcon icon="align-right" className="text-subtitle" />}
      />
    </>
  );
};

export default ToolbarButtonsComponents;
