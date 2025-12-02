import {
  AuthContextActionType,
  AuthContextStateType,
} from "@/src/types/global";
import { ActionDispatch, RefObject } from "react";

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
