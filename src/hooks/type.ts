import { ActionDispatch, RefObject } from "react";
import { Dispatch, SetStateAction } from "react";

// type
import {
  AuthContextActionType,
  AuthContextStateType,
  MyUserType,
  PlanType,
  UserType,
} from "@/src/types/global";

export interface UseAuthListenerProps {
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
export interface UseSetStepNumberProps {
  setStepNumber: Dispatch<SetStateAction<string>>;
}
export interface UseAuthActionProps {
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
export interface UsePaymentSuccessProps {
  sessionId: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSubscriptionId: Dispatch<SetStateAction<string | null>>;
}
export interface UsePlanActionProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  selectedPlan: PlanType;
}
export interface useTaskListenerProps {
  user: MyUserType | null;
}
export interface useUsersListenerProps {
  users: MyUserType[] | null;
}

export type fileType = "image" | "video" | "file" | "voice";

export interface useImageProcessorProps {
  size?: number;
}
export interface progressiveProps {
  img: ImageBitmap;
  size: number;
}

export type SourceProps = {
  width: number;
  height: number;
};
export interface drawFinalProps {
  source: CanvasImageSource & SourceProps;
  size: number;
  scale: number;
}

export type FileUploaderOptions = {
  accept?: string[];
  except?: string[];
  signedUrlExpiresIn?: number;
  maxSizeMB?: number;
};
export interface uploadProps {
  file: File;
  avatar?: boolean;
  userId?: string;
}
export interface uploadWithProgressProps {
  signedUrl: string;
  file: File;
  onProgress: (p: number) => void;
  xhrRef: React.MutableRefObject<XMLHttpRequest | null>;
}
export interface deleteUploadedFileProps {
  path: string | null;
}
export interface useUnreadCountProps {
  chatId: string;
  senderType: UserType;
}

export interface validateFileProps {
  file: File;
  accept: string[] | null;
  except: string[] | null;
  maxSizeMB: number;
}
