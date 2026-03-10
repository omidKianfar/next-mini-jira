import { Editor, Transforms, Descendant, Node } from '../../imports';
import { Deserialize } from './deserialize';

export const WithHtml = (editor: Editor) => {
  const { insertData } = editor;
  editor.insertData = (data: any) => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const deserializedContent = Deserialize(parsed.body);

      const fragment = Array.isArray(deserializedContent)
        ? deserializedContent.filter(
            (node: Node | null) => node !== '\n' && node !== null
          )
        : [deserializedContent].filter(
            (node: Node | null) => node !== '\n' && node !== null
          );

      Transforms.insertFragment(editor, fragment as Descendant[]);

      return;
    }

    insertData(data);
  };

  return editor;
};
