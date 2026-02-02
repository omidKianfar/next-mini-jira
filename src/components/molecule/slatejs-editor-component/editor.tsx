import isHotkey from 'is-hotkey';
import { Slate, Editable, ReactEditor } from 'slate-react';
import { Editor, Descendant, Transforms } from 'slate';

// data
import { HOTKEYS } from './data';

// type
import { MarkFormat, SlateEditorProps } from './type';
import { ToggleMark } from './components/toolbar/helper/toggle-mark';

// hooks
import { useEditor } from '@/src/hooks/editor/use-editor';

// components
import ToolbarComponent from './components/toolbar';
import { Serialize } from './components/serialize';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { MyUserType, UserType } from '@/src/types/global';
import { sendChatMessage } from '@/src/libs/chat/sendMessage';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const SlateEditorComponent = ({ editorKey }: SlateEditorProps) => {
  // hooks
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
  } = useEditor();

  // states
  const [loading, setLoading] = useState(false);

  // functions
  const resetEditor = () => {
    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    });
    Transforms.setNodes(editor, { type: 'paragraph' } as any);
  };

  const handleSend = () => {
    console.log('editorOutput', editorOutput);

    if (editorOutput == '') {
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

      sendChatMessage({ user: userMessage, message: message });

      setEditorOutput?.('');
      resetEditor();
    } catch (error: any) {
      setLoading(false);
      enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetEditor();
  }, []);

  return (
    <Slate
      key={editorKey}
      editor={editor}
      initialValue={[...initialValue, ...(deserializedNodes as Descendant[])]}
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
          className="h-[90px] w-full overflow-y-auto overflow-x-hidden bg-white p-4 focus:outline-none"
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

export default SlateEditorComponent;
