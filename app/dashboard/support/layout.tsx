'use client';

import { EditorProviderComponent, PropsWithChildren } from '../../imports';

const SupportLayout = ({ children }: PropsWithChildren) => {
  return <EditorProviderComponent>{children}</EditorProviderComponent>;
};

export default SupportLayout;
