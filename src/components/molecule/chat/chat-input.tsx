// type
import SlateEditor from '../slatejs-editor-component';

const ChatInput = () => {
  return (
    <div className="absolute bottom-0 left-0 flex h-[200px] w-full items-center justify-start rounded-b-md p-1 lg:h-[150px]">
      <div className="h-full w-full">
        <SlateEditor />
      </div>
    </div>
  );
};

export default ChatInput;
