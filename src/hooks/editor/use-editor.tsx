'use client';

import { editorContext, EditorContextType, useContext } from '../imports';

export const useEditor = (): EditorContextType => {
  return useContext(editorContext);
};
