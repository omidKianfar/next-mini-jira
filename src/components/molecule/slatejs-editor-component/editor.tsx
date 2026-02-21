import isHotkey from 'is-hotkey';
import { Slate, Editable } from 'slate-react';
import { Editor, Descendant } from 'slate';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useSearchParams } from 'next/navigation';

// data
import { HOTKEYS } from './data';

// type
import { MarkFormat, SlateEditorProps } from './type';
import { ToggleMark } from './components/toolbar/helper/toggle-mark';
import { MyUserType, UserType } from '@/src/types/global';

// hooks
import { useEditor } from '@/src/hooks/editor/use-editor';

// ui
import ToolbarComponent from './components/toolbar';
import { Serialize } from './components/serialize';

// lib
import { sendChatMessage } from '@/src/libs/chat/send-message';
import { updateChatMessage } from '@/src/libs/chat/update-message';

// hook
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';

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
  // hook
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

  // states
  const [loading, setLoading] = useState(false);

  // functions
  useEffect(() => {
    resetEditor();
  }, []);

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
      <div className="h-full w-full rounded-sm border-2 border-primary-500">
        <ToolbarComponent handleSend={handleSend} loading={loading} />

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter text..."
          spellCheck
          autoFocus
          className="h-[150px] w-full overflow-y-auto overflow-x-hidden bg-white p-4 focus:outline-none"
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
