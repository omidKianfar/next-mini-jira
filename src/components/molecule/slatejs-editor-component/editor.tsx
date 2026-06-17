import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Descendant, Editor } from 'slate';
import { Editable, Slate } from 'slate-react';
import isHotkey from 'is-hotkey';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';
import { useEditor } from '@/src/hooks/editor/use-editor';
import { updateChatMessage } from '@/src/libs/chat/update-message';
import { sendChatMessage } from '@/src/libs/chat/send-message';
import { ToggleMark } from './components/toolbar/helper/toggle-mark';
import ToolbarComponent from './components/toolbar';
import { Serialize } from './components/serialize';
import { HOTKEYS } from './data';
import { MyUserType, UserType } from '@/src/types/global';
import { MarkFormat } from './type';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

interface SlateEditorProps {
  editorOutput?: string | undefined;
  setEditorOutput?: React.Dispatch<React.SetStateAction<string>>;
  editorKey?: number;
  editMessageId?: string | null;
  setEditMessageId?: Dispatch<SetStateAction<string | null>>;
}

const SlateEditor = ({
  editorKey,
  editMessageId,
  setEditMessageId,
}: SlateEditorProps) => {
  const params = useSearchParams();
  const reciverId = params.get('chatId');

  const isMobile = useIsMobile();

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

  const [loading, setLoading] = useState<boolean>(false);

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

      enqueueSnackbar(`Error: ${error.message || error}`, { variant: 'error' });
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
      <div className="relative h-full w-full">
        <ToolbarComponent handleSend={handleSend} loading={loading} />

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter your message"
          spellCheck
          autoFocus
          className="h-[200px] w-full overflow-y-auto overflow-x-hidden rounded-b-lg bg-white p-4 focus:outline-none lg:h-[175px]"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && event.shiftKey) {
              event.preventDefault();
              Editor.insertBreak(editor);
              return;
            } else if (event.key === 'Enter') {
              event.preventDefault();
              handleSend();
              return;
            } else {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                  ToggleMark({ editor, format: mark as MarkFormat });
                }
              }
            }
          }}
        />

        {!isMobile && editorOutput === '<p></p>' && (
          <div className="absolute bottom-2 left-0 pl-2 text-caption text-gray-400 lg:text-bodySm">
            Press <strong>Shift + Enter</strong> to add a new line, or
            <strong className="ml-1">Enter</strong> to send.
          </div>
        )}
      </div>
    </Slate>
  );
};

export default SlateEditor;
