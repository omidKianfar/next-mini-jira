import { Editor } from '../../../imports';
import { AlignFormat, BlockFormat, MarkFormat } from '../../type';

interface BlockButtonProps {
  format: BlockFormat | AlignFormat;
  icon: React.ReactNode;
}
interface IsBlockActiveProps {
  editor: Editor;
  format: string;
  blockType: 'type' | 'align';
}
interface IsMarkActiveProps {
  editor: Editor;
  format: MarkFormat;
}
interface MarkButtonProps {
  format: MarkFormat;
  icon: React.ReactNode;
}
interface ToggleBlockProps {
  editor: Editor;
  format: BlockFormat | AlignFormat;
}
interface ToggleMarkProps {
  editor: Editor;
  format: MarkFormat;
}
interface ToolbarComponentProps {
  handleSend?: () => void;
  loading?: boolean;
}

export type {
  BlockButtonProps,
  IsBlockActiveProps,
  IsMarkActiveProps,
  MarkButtonProps,
  ToggleBlockProps,
  ToggleMarkProps,
  ToolbarComponentProps,
};
