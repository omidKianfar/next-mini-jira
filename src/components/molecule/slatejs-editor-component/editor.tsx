import {
  Descendant,
  Editable,
  Editor,
  enqueueSnackbar,
  isHotkey,
  MyUserType,
  sendChatMessage,
  Slate,
  updateChatMessage,
  useAuth,
  useEditor,
  UserType,
  useSearchParams,
  useState,
  useUserListenerById,
} from '../imports';
import { ToggleMark } from './components/toolbar/helper/toggle-mark';
import ToolbarComponent from './components/toolbar';
import { Serialize } from './components/serialize';
import { HOTKEYS } from './data';
import { MarkFormat, SlateEditorProps } from './type';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const SlateEditor = ({
  editorKey,
  editMessageId,
  setEditMessageId,
}: SlateEditorProps) => {
  const params = useSearchParams();
  const reciverId = params.get('chatId');

  const { user: currentUser } = useAuth();
  const { user: userChat } = useUserListenerById(reciverId);
  const {
    editor,
    deserializedNodes,
    setEditorOutput,
    renderElement,
    renderLeaf,
    editorOutput,
    resetEditor,
  } = useEditor();

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (
      editorOutput == '' ||
      editorOutput == '<p></p>' ||
      editorOutput == '<p><p></p></p>'
    ) {
      enqueueSnackbar('Please write your message', { variant: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const admin = currentUser?.userType === UserType.Admin;

      const userMessage = admin
        ? (userChat as MyUserType)
        : (currentUser as MyUserType);

      const message = {
        senderId: admin ? 'admin' : (currentUser?.userId as string),
        receiverId: admin ? (userChat?.userId as string) : 'admin',
        text: editorOutput,
        senderType: admin ? UserType.Admin : UserType.Client,
        attachment: {
          fileUrl: null,
          fileType: null,
        },
      };

      if (editMessageId) {
        await updateChatMessage({
          userId: userMessage?.userId as string,
          messageId: editMessageId as string,
          newText: editorOutput as string,
        });

        setEditMessageId?.(null);
      } else {
        await sendChatMessage({ user: userMessage, message: message });
      }

      setEditorOutput?.('');

      resetEditor();
    } catch (error: any) {
      setLoading(false);

      enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const getInitialValue = () => {
    if (deserializedNodes && deserializedNodes.length > 0) {
      return deserializedNodes as Descendant[];
    }
    return initialValue;
  };

  return (
    <Slate
      key={editorKey}
      editor={editor}
      initialValue={getInitialValue()}
      onChange={(value) => {
        const html = value.map((node) => Serialize(node)).join('');
        if (setEditorOutput) {
          setEditorOutput(html);
        }
      }}
    >
      <div className="h-full w-full">
        <ToolbarComponent handleSend={handleSend} loading={loading} />

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter text..."
          spellCheck
          autoFocus
          className="h-[123px] w-full overflow-y-auto overflow-x-hidden rounded-b-lg bg-white p-4 focus:outline-none lg:h-[150px]"
          onKeyDown={(event) => {
            if (isHotkey('mod+enter', event)) {
              event.preventDefault();

              Editor.insertBreak(editor);
            } else if (isHotkey('enter', event)) {
              event.preventDefault();

              handleSend();
            } else {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();

                  const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];

                  ToggleMark({
                    editor: editor,
                    format: mark as MarkFormat,
                  });
                }
              }
            }
          }}
        />
      </div>
    </Slate>
  );
};

export default SlateEditor;
