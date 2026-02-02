// helpers
import { Toolbar } from '../helpers/toolbar';

// components
import SendMessage from './components/send-message';
import EmojiComponent from './components/emoji';
import ToolbarButtonsComponents from './components/buttons';
import ColorSelectComponent from './components/color-select';
import FontSelectComponent from './components/font-select';
import BGColorSelectComponent from './components/background-color-select';

// type
import { ToolbarComponentProps } from './type';

const ToolbarComponent = ({ handleSend, loading }: ToolbarComponentProps) => {
  return (
    <Toolbar>
      <div className="flex h-full w-full flex-wrap items-center justify-between gap-[8px] rounded-t-sm border-b-2 border-dashed border-gray-200 bg-white p-[4px]">
        <div className="relative flex w-2/3 items-center justify-start gap-2">
          <div className="relative flex items-center justify-center">
            <EmojiComponent />
          </div>

          <ToolbarButtonsComponents />

          <FontSelectComponent />

          <ColorSelectComponent />

          <BGColorSelectComponent />
        </div>

        <div>
          <SendMessage handleSend={handleSend} loading={loading} />
        </div>
      </div>
    </Toolbar>
  );
};

export default ToolbarComponent;
