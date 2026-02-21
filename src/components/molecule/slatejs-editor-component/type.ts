import { ReactEditor } from 'slate-react';
import { BaseEditor, Descendant, Element as SlateElement } from 'slate';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type BlockFormat =
  | 'paragraph'
  | 'headingOne'
  | 'headingTwo'
  | 'headingThree'
  | 'headingFour'
  | 'headingFive'
  | 'headingSix'
  | 'bulletedList'
  | 'numberedList'
  | 'listItem'
  | 'br';

export type MarkFormat = 'bold' | 'italic' | 'underline' | 'code';

export type AlignFormat = 'left' | 'center' | 'right';

export type CustomElement = {
  type: BlockFormat;
  align?: AlignFormat;
  url?: string;
  children: (CustomText | CustomElement)[];
};

export type CustomText = {
  text: string;
  color?: string | null;
  backgroundColor?: string | null;
  fontFamily?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

declare module 'slate' {
  export interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor & { isVoid: (element: SlateElement) => boolean };
    Element: CustomElement;
    Text: CustomText;
  }
}

export interface CustomEmoji {
  id: string;
  name: string;
  native: string;
  keywords: string[];
}

export interface SlateEditorProps {
  editorOutput?: string | undefined;
  setEditorOutput?: React.Dispatch<React.SetStateAction<string>>;
  editorKey?: number;
  editMessageId?: string | null;
  setEditMessageId?: Dispatch<SetStateAction<string | null>>;
}

export const BLOCK_TYPES: { format: BlockFormat; name: string }[] = [
  { format: 'paragraph', name: 'P' },
  { format: 'headingOne', name: 'H1' },
  { format: 'headingTwo', name: 'H2' },
  { format: 'headingThree', name: 'H3' },
  { format: 'headingFour', name: 'H4' },
  { format: 'headingFive', name: 'H5' },
  { format: 'headingSix', name: 'H6' },
];

export interface BaseProps {
  className: string;
  [key: string]: any;
}

export type SimpleForwardRefProps<T extends HTMLElement> =
  React.PropsWithChildren<BaseProps> & React.RefAttributes<T>;

export type ButtonProps = {
  active: boolean;
  reversed: boolean;
} & BaseProps & {
    children?: ReactNode | undefined;
  };

export type EditorValueProps = BaseProps & {
  value: Descendant[];
  children?: ReactNode | undefined;
};
