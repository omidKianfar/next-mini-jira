import {
  ActionDispatch,
  RefObject,
  Dispatch,
  SetStateAction,
  AuthContextActionType,
  AuthContextStateType,
  MyUserType,
  PlanType,
  UserType,
} from './imports';

interface UseAuthListenerProps {
  state: Partial<AuthContextStateType>;
  dispatch: ActionDispatch<
    [
      action: {
        payload: Partial<AuthContextStateType>;
        type: AuthContextActionType;
      },
    ]
  >;
  unsubDocRef: RefObject<(() => void) | null>;
}
interface UseSetStepNumberProps {
  setStepNumber: Dispatch<SetStateAction<string>>;
}
interface UseAuthActionProps {
  state: Partial<AuthContextStateType>;
  dispatch: ActionDispatch<
    [
      action: {
        payload: Partial<AuthContextStateType>;
        type: AuthContextActionType;
      },
    ]
  >;
  setStepNumber: Dispatch<SetStateAction<string>>;
}
interface UsePaymentSuccessProps {
  sessionId: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSubscriptionId: Dispatch<SetStateAction<string | null>>;
}
interface UsePlanActionProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  selectedPlan: PlanType;
}
interface useTaskListenerProps {
  user: MyUserType | null;
}
interface useUsersListenerProps {
  users: MyUserType[] | null;
}

type fileType = 'image' | 'video' | 'file' | 'voice';

interface useImageProcessorProps {
  size?: number;
}
interface progressiveProps {
  img: ImageBitmap;
  size: number;
}

type SourceProps = {
  width: number;
  height: number;
};
interface drawFinalProps {
  source: CanvasImageSource & SourceProps;
  size: number;
  scale: number;
}

type FileUploaderOptions = {
  accept?: string[];
  except?: string[];
  signedUrlExpiresIn?: number;
  maxSizeMB?: number;
};
interface uploadProps {
  file: File;
  avatar?: boolean;
  userId?: string;
}
interface uploadWithProgressProps {
  signedUrl: string;
  file: File;
  onProgress: (p: number) => void;
  xhrRef: React.MutableRefObject<XMLHttpRequest | null>;
}
interface deleteUploadedFileProps {
  path: string | null;
}
interface useUnreadCountProps {
  chatId: string;
  senderType: UserType;
}

interface validateFileProps {
  file: File;
  accept: string[] | null;
  except: string[] | null;
  maxSizeMB: number;
}
interface useEditorActionsProps {
  editorOutput: string;
  setEditorOutput: Dispatch<SetStateAction<string>>;
  showColorDropdown: boolean;
  setShowColorDropdown: Dispatch<SetStateAction<boolean>>;
  fontBgColorState: string | null;
  showBackgroundDropdown: boolean;
  setShowBackgroundDropdown: Dispatch<SetStateAction<boolean>>;
  showEmojiPicker: boolean;
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
  fontFamilyState: string;
  fontColorState: string | null;
  setFontColorState: Dispatch<SetStateAction<string | null>>;
  setFontFamilyState: Dispatch<SetStateAction<string>>;
  setFontBgColorState: Dispatch<SetStateAction<string | null>>;
}

export type {
  UseAuthListenerProps,
  UseSetStepNumberProps,
  UseAuthActionProps,
  UsePaymentSuccessProps,
  UsePlanActionProps,
  useTaskListenerProps,
  useUsersListenerProps,
  fileType,
  useImageProcessorProps,
  progressiveProps,
  SourceProps,
  drawFinalProps,
  FileUploaderOptions,
  uploadProps,
  uploadWithProgressProps,
  deleteUploadedFileProps,
  useUnreadCountProps,
  validateFileProps,
  useEditorActionsProps,
};
