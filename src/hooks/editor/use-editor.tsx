'use client';

import { useContext } from 'react';
import { editorContext } from '@/src/providers/editor-provider';
import { EditorContextType } from '@/src/types/global';

export const useEditor = (): EditorContextType => {
  return useContext(editorContext);
};
