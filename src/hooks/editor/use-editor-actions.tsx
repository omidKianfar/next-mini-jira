import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { createEditor, Editor, Text, Transforms } from 'slate';
import { ReactEditor, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { WithHtml } from '@/src/components/molecule/slatejs-editor-component/components/with-html';
import { Deserialize } from '@/src/components/molecule/slatejs-editor-component/components/deserialize';
import { CustomEmoji } from '@/src/types/global';

interface useEditorActionsProps {
  editorOutput: string;
  setEditorOutput: Dispatch<SetStateAction<string>>;
  showColorDropdown: boolean;
  setShowColorDropdown: Dispatch<SetStateAction<boolean>>;
  fontBgColorState: string | null;
  showBackgroundDropdown: boolean;
  setShowBackgroundDropdown: Dispatch<SetStateAction<boolean>>;
  showEmojiPicker: boolean;
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
  fontFamilyState: string;
  fontColorState: string | null;
  setFontColorState: Dispatch<SetStateAction<string | null>>;
  setFontFamilyState: Dispatch<SetStateAction<string>>;
  setFontBgColorState: Dispatch<SetStateAction<string | null>>;
}

const useEditorActions = ({
  editorOutput,
  setEditorOutput,
  fontColorState,
  showColorDropdown,
  setShowColorDropdown,
  fontBgColorState,
  showBackgroundDropdown,
  setShowBackgroundDropdown,
  showEmojiPicker,
  setShowEmojiPicker,
  fontFamilyState,
  setFontColorState,
  setFontFamilyState,
  setFontBgColorState,
}: useEditorActionsProps) => {
  const editor = useMemo(
    () => WithHtml(withReact(withHistory(createEditor()))),
    []
  );

  const editorFocuse = useRef(true);

  useEffect(() => {
    if (editorFocuse.current) {
      ReactEditor.focus(editor);
      editorFocuse.current = false;
    }
  }, [editor]);

  const changeColor = (color: string | null) => {
    setFontColorState(color);

    Transforms.setNodes(
      editor,
      { color },
      { match: (n) => Text.isText(n), split: true }
    );

    setShowColorDropdown(false);
  };

  const changeBackgroundColor = (color: string | null) => {
    setFontBgColorState(color);

    Transforms.setNodes(
      editor,
      { backgroundColor: color },
      { match: (n) => Text.isText(n), split: true }
    );

    setShowBackgroundDropdown(false);
  };

  const changeFontFamily = (fontFamily: string) => {
    setFontFamilyState(fontFamily);

    Transforms.setNodes(
      editor,
      { fontFamily },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  const insertEmoji = (emoji: CustomEmoji) => {
    const emojiText = emoji.native;
    Transforms.insertText(editor, emojiText);

    setShowEmojiPicker(false);
  };

  const deserializedNodes = useMemo(() => {
    if (typeof window === 'undefined') {
      return [{ type: 'paragraph', children: [{ text: '' }] }];
    }

    const document = new DOMParser().parseFromString(
      editorOutput || '<p></p>',
      'text/html'
    );
    const content = Deserialize(document.body);

    return Array.isArray(content)
      ? content.filter((item) => item !== '\n' && item !== null)
      : [content].filter((item) => item !== '\n' && item !== null);
  }, [editorOutput]);

  const removeSecondLine = useCallback(() => {
    if (editor.children.length > 1) {
      Transforms.delete(editor, { at: [1] });
    }
  }, [editor]);

  const resetEditor = () => {
    if (editor.children.length > 0) {
      while (editor.children.length > 0) {
        Transforms.removeNodes(editor, { at: [0] });
      }
    }

    Transforms.insertNodes(editor, {
      type: 'paragraph',
      children: [{ text: '' }],
    });

    Transforms.select(editor, Editor.start(editor, [0]));

    setTimeout(() => {
      ReactEditor.focus(editor);
    }, 50);
  };

  useEffect(() => {
    removeSecondLine();
  }, [removeSecondLine]);

  return {
    editorOutput,
    setEditorOutput,
    fontColorState,
    showColorDropdown,
    setShowColorDropdown,
    fontBgColorState,
    showBackgroundDropdown,
    setShowBackgroundDropdown,
    showEmojiPicker,
    setShowEmojiPicker,
    editor,
    changeColor,
    changeBackgroundColor,
    fontFamilyState,
    changeFontFamily,
    insertEmoji,
    deserializedNodes,
    resetEditor,
  };
};

export default useEditorActions;
