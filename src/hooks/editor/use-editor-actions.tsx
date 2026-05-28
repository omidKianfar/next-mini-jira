import {
  createEditor,
  CustomEmoji,
  Deserialize,
  Editor,
  Text,
  Transforms,
  useCallback,
  useEffect,
  useMemo,
  withHistory,
  WithHtml,
  withReact,
} from '../imports';
import { useEditorActionsProps } from '../type';

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
    editor.children = [{ type: 'paragraph', children: [{ text: '' }] }] as any;

    editor.selection = null;

    editor.onChange();
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
