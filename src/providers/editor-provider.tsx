'use client';

import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import useEditorActions from '../hooks/editor/use-editor-actions';
import ElementComponent from '../components/molecule/slatejs-editor-component/components/element';
import LeafComponent from '../components/molecule/slatejs-editor-component/components/leaf';
import { EditorContextType } from '../types/global';

export const editorContext = createContext<EditorContextType>(
  {} as EditorContextType
);

const EditorProviderComponent = ({ children }: PropsWithChildren) => {
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

  const renderElement = useCallback(
    (props: RenderElementProps) => <ElementComponent {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <LeafComponent {...props} />,
    []
  );

  const {
    editor,
    changeColor,
    changeBackgroundColor,
    changeFontFamily,
    insertEmoji,
    deserializedNodes,
    resetEditor,
  } = useEditorActions({
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
  });

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
