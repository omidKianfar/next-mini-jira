import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useEditor } from '@/src/hooks/editor/use-editor';
import MyIcon from '@/src/components/atom/icon-components';
import { CustomEmoji } from '@/src/types/global';

const EmojiComponent = () => {
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
          icon="emoji"
          className={`text-subtitle ${showEmojiPicker ? 'text-primary-500' : 'text-gray-400'}`}
        />
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-[36px] left-0 h-[250px] overflow-hidden rounded-md shadow-lg">
          <Picker
            data={data}
            onEmojiSelect={(emoji: CustomEmoji) => insertEmoji?.(emoji)}
            emojiSize={18}
            perLine={7}
            maxFrequentRows={1}
            previewPosition="none"
            navPosition="top"
            searchPosition="sticky"
            maxStackedResults={1}
            dynamicWidth={false}
            emojiButtonRadius="2px"
          />
        </div>
      )}
    </>
  );
};

export default EmojiComponent;
