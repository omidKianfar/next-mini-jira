// ui
import MyIcon from '@/src/components/atom/icon-components';

// tools
import { MarkButton } from '../helper/mark-button';
import { BlockButton } from '../helper/block-button';
import { BlockTypeSelect } from '../helper/block-type-select';

const ToolbarButtonsComponents = () => {
  return (
    <>
      <MarkButton format="bold" icon={<MyIcon icon="bold" />} />
      <MarkButton format="italic" icon={<MyIcon icon="italic" />} />
      <MarkButton format="underline" icon={<MyIcon icon="under-line" />} />
      <MarkButton format="code" icon={<MyIcon icon="code" />} />
      <BlockButton format="numberedList" icon={<MyIcon icon="number-list" />} />
      <BlockButton format="bulletedList" icon={<MyIcon icon="bullet-list" />} />
      <BlockButton format="left" icon={<MyIcon icon="align-left" />} />
      <BlockButton format="center" icon={<MyIcon icon="align-center" />} />
      <BlockButton format="right" icon={<MyIcon icon="align-right" />} />
      <BlockTypeSelect />
    </>
  );
};

export default ToolbarButtonsComponents;
