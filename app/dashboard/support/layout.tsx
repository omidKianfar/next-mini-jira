'use client';

import { PropsWithChildren } from 'react';
import EditorProviderComponent from '@/src/providers/editor-provider';

const SupportLayout = ({ children }: PropsWithChildren) => {
  return <EditorProviderComponent>{children}</EditorProviderComponent>;
};

export default SupportLayout;
