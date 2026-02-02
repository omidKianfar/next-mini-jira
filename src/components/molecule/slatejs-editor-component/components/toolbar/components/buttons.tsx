// ui
import MyIcon from '@/src/components/atom/icon-components';

// tools
import { MarkButton } from '../helper/mark-button';
import { BlockButton } from '../helper/block-button';
import { BlockTypeSelect } from '../helper/block-type-select';

const ToolbarButtonsComponents = () => {
  return (
    <>
      <MarkButton format="bold" icon={<MyIcon icon="ooui:bold-b" />} />

      <MarkButton format="italic" icon={<MyIcon icon="tabler:italic" />} />

      <MarkButton
        format="underline"
        icon={<MyIcon icon="mingcute:underline-fill" />}
      />

      <MarkButton
        format="code"
        icon={<MyIcon icon="material-symbols:code-rounded" />}
      />

      <BlockButton
        format="numberedList"
        icon={<MyIcon icon="f7:list-number" />}
      />

      <BlockButton
        format="bulletedList"
        icon={<MyIcon icon="pajamas:list-bulleted" />}
      />

      <BlockButton format="left" icon={<MyIcon icon="quill:text-left" />} />

      <BlockButton format="center" icon={<MyIcon icon="quill:text-center" />} />

      <BlockButton format="right" icon={<MyIcon icon="bi:text-right" />} />

      <BlockTypeSelect />
    </>
  );
};

export default ToolbarButtonsComponents;
