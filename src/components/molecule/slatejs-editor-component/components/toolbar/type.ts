import { Editor } from 'slate';
import { AlignFormat, BlockFormat, MarkFormat } from '../../type';

export interface BlockButtonProps {
  format: BlockFormat | AlignFormat;
  icon: React.ReactNode;
}

export interface IsBlockActiveProps {
  editor: Editor;
  format: string;
  blockType: 'type' | 'align';
}
export interface IsMarkActiveProps {
  editor: Editor;
  format: MarkFormat;
}
export interface MarkButtonProps {
  format: MarkFormat;
  icon: React.ReactNode;
}
export interface ToggleBlockProps {
  editor: Editor;
  format: BlockFormat | AlignFormat;
}
export interface ToggleMarkProps {
  editor: Editor;
  format: MarkFormat;
}
export interface ToolbarComponentProps {
  handleSend?: () => void;
  loading?: boolean;
}
