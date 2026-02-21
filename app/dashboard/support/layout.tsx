'use client';

import { PropsWithChildren } from 'react';

// providers
import EditorProviderComponent from '@/src/providers/editor-provider';

const SupportLayout = ({ children }: PropsWithChildren) => {
  return <EditorProviderComponent>{children}</EditorProviderComponent>;
};

export default SupportLayout;
