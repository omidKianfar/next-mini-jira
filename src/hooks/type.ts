import {
  AuthContextActionType,
  AuthContextStateType,
  PlanType,
} from "@/src/types/global";
import { ActionDispatch, RefObject } from "react";
import { Dispatch, SetStateAction } from "react";

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
  selectedPlan:PlanType
}
