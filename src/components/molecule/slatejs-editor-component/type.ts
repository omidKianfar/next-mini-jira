import {
  BaseEditor,
  Descendant,
  Dispatch,
  ReactEditor,
  ReactNode,
  SetStateAction,
} from '../imports';

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

interface CustomEmoji {
  id: string;
  name: string;
  native: string;
  keywords: string[];
}

interface SlateEditorProps {
  editorOutput?: string | undefined;
  setEditorOutput?: React.Dispatch<React.SetStateAction<string>>;
  editorKey?: number;
  editMessageId?: string | null;
  setEditMessageId?: Dispatch<SetStateAction<string | null>>;
}

interface BaseProps {
  className: string;
  [key: string]: any;
}

type SimpleForwardRefProps<T extends HTMLElement> =
  React.PropsWithChildren<BaseProps> & React.RefAttributes<T>;

type ButtonProps = {
  active: boolean;
  reversed: boolean;
} & BaseProps & {
    children?: ReactNode | undefined;
  };

type EditorValueProps = BaseProps & {
  value: Descendant[];
  children?: ReactNode | undefined;
};

const BLOCK_TYPES: { format: BlockFormat; name: string }[] = [
  { format: 'paragraph', name: 'P' },
  { format: 'headingOne', name: 'H1' },
  { format: 'headingTwo', name: 'H2' },
  { format: 'headingThree', name: 'H3' },
  { format: 'headingFour', name: 'H4' },
  { format: 'headingFive', name: 'H5' },
  { format: 'headingSix', name: 'H6' },
];

export type {
  BlockFormat,
  MarkFormat,
  AlignFormat,
  CustomElement,
  CustomText,
  CustomEmoji,
  SlateEditorProps,
  BaseProps,
  SimpleForwardRefProps,
  ButtonProps,
  EditorValueProps,
};
export { BLOCK_TYPES };
