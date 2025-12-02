import {
  AuthContextActionType,
  AuthContextStateType,
} from "@/src/types/global";
import { ActionDispatch, Dispatch, SetStateAction } from "react";

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
