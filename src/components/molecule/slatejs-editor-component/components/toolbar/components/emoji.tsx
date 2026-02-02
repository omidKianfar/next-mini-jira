import { useEditor } from '@/src/hooks/editor/use-editor';
import { CustomEmoji } from '../../../type';
import MyIcon from '@/src/components/atom/icon-components';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const EmojiComponent = () => {
  // hooks
  const { setShowEmojiPicker, showEmojiPicker, insertEmoji } = useEditor();

  return (
    <>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          setShowEmojiPicker?.(!showEmojiPicker);
        }}
      >
        <MyIcon
          icon="mingcute:emoji-fill"
          className={`text-subtitle ${showEmojiPicker ? 'text-primary-500' : 'text-gray-400'}`}
        />
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-[24px] left-0 z-50">
          <Picker
            data={data}
            onEmojiSelect={(emoji: CustomEmoji) => insertEmoji?.(emoji)}
            emojiSize={20}
            perLine={6}
            previewPosition="none"
            navPosition="top"
            searchPosition="sticky"
            maxStackedResults={1}
          />
        </div>
      )}
    </>
  );
};

export default EmojiComponent;
