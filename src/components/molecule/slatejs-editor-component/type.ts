import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

type BlockFormat =
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

type MarkFormat = 'bold' | 'italic' | 'underline' | 'code';

type AlignFormat = 'left' | 'center' | 'right';

type CustomElement = {
  type: BlockFormat;
  align?: AlignFormat;
  url?: string;
  children: (CustomText | CustomElement)[];
};

type CustomText = {
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
      ReactEditor & { isVoid: (element: Element) => boolean };
    Element: CustomElement;
    Text: CustomText;
  }
}

const BLOCK_TYPES: { format: BlockFormat; name: string }[] = [
  { format: 'paragraph', name: 'P' },
  { format: 'headingOne', name: 'H1' },
  { format: 'headingTwo', name: 'H2' },
  { format: 'headingThree', name: 'H3' },
  { format: 'headingFour', name: 'H4' },
  { format: 'headingFive', name: 'H5' },
  { format: 'headingSix', name: 'H6' },
];

export interface ToolbarComponentProps {
  handleSend?: () => void;
  loading?: boolean;
}

export type { BlockFormat, MarkFormat, AlignFormat, CustomElement, CustomText };

export { BLOCK_TYPES };
