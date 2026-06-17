import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import SendMessage from './components/send-message';
import EmojiComponent from './components/emoji';
import ToolbarButtonsComponents from './components/buttons';
import ColorSelectComponent from './components/color-select';
import FontSelectComponent from './components/font-select';
import BGColorSelectComponent from './components/background-color-select';
import { Toolbar } from '../helpers/toolbar';
import { BlockTypeSelect } from './helper/block-type-select';
import { ToolbarComponentProps } from '../../type';

const ToolbarComponent = ({ handleSend, loading }: ToolbarComponentProps) => {
  const isMobile = useIsMobile();

  return (
    <Toolbar>
      <div className="flex w-full flex-col border-b border-gray-100 p-[4px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ToolbarButtonsComponents />

            {!isMobile && (
              <>
                <div className="relative flex items-center justify-center">
                  <EmojiComponent />
                </div>

                <BlockTypeSelect />
                <FontSelectComponent />
                <ColorSelectComponent />
                <BGColorSelectComponent />
              </>
            )}
          </div>

          <SendMessage handleSend={handleSend} loading={loading} />
        </div>
      </div>
    </Toolbar>
  );
};

export default ToolbarComponent;
