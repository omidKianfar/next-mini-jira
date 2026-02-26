import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createEditor, Editor, Text, Transforms } from 'slate';
import { RenderElementProps, RenderLeafProps, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

// ui
import { Deserialize } from '../components/molecule/slatejs-editor-component/components/deserialize';
import { WithHtml } from '../components/molecule/slatejs-editor-component/components/with-html';
import LeafComponent from '../components/molecule/slatejs-editor-component/components/leaf';
import ElementComponent from '../components/molecule/slatejs-editor-component/components/element';

// type
import { CustomEmoji } from '../components/molecule/slatejs-editor-component/type';
import { EditorContextType } from '../types/global';

export const editorContext = createContext<EditorContextType>(
  {} as EditorContextType
);

const EditorProviderComponent = ({ children }: PropsWithChildren) => {
  // states
  const [editorOutput, setEditorOutput] = useState<string>('');
  const [fontFamilyState, setFontFamilyState] = useState<string>(
    '"Times New Roman", Times, serif'
  );
  const [fontColorState, setFontColorState] = useState<string | null>(null);
  const [fontBgColorState, setFontBgColorState] = useState<string | null>(null);
  const [showColorDropdown, setShowColorDropdown] = useState<boolean>(false);
  const [showBackgroundDropdown, setShowBackgroundDropdown] =
    useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  // functions
  const renderElement = useCallback(
    (props: RenderElementProps) => <ElementComponent {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafComponent {...props} />,
    []
  );

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

  const removeSecondLine = useCallback(() => {
    if (editor.children.length > 1) {
      Transforms.delete(editor, { at: [1] });
    }
  }, [editor]);

  const resetEditor = () => {
    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    });
    Transforms.setNodes(editor, { type: 'paragraph' } as any);
  };

  useEffect(() => {
    removeSecondLine();
  }, [removeSecondLine]);

  const deserializedNodes = useMemo(() => {
    if (typeof window === 'undefined')
      return [{ type: 'paragraph', children: [{ text: '' }] }];

    const document = new DOMParser().parseFromString(
      editorOutput || '<p></p>',
      'text/html'
    );
    const content = Deserialize(document.body);

    return Array.isArray(content)
      ? content.filter((item) => item !== '\n' && item !== null)
      : [content].filter((item) => item !== '\n' && item !== null);
  }, [editorOutput]);

  return (
    <editorContext.Provider
      value={{
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
        renderElement,
        renderLeaf,
        editor,
        changeColor,
        changeBackgroundColor,
        fontFamilyState,
        changeFontFamily,
        insertEmoji,
        deserializedNodes,
        resetEditor,
      }}
    >
      {children}
    </editorContext.Provider>
  );
};

export default EditorProviderComponent;
