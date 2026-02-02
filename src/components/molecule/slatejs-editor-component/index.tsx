// type
import { SlateEditorProps } from './type';

// provider
import EditorProviderComponent from '@/src/providers/editor-provider';

// ./
import SlateEditorComponent from './editor';

const SlateEditor = ({ editorKey }: SlateEditorProps) => {
  return (
    <EditorProviderComponent>
      <SlateEditorComponent editorKey={editorKey} />
    </EditorProviderComponent>
  );
};

export default SlateEditor;
