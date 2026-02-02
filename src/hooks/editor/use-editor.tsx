'use client';

import { useContext } from 'react';

// provider
import { editorContext } from '@/src/providers/editor-provider';

// type
import { EditorContextType } from '@/src/types/global';

export const useEditor = (): EditorContextType => {
  return useContext(editorContext);
};
