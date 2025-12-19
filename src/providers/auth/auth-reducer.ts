// type
import {
  AuthContextActionType,
  AuthContextStateType,
} from "@/src/types/global";

export const initialState: AuthContextStateType = {
  user: null,
  isLoading: null,
  isInitialized: false,
  isAuthenticated: false,
};

export const authReducer = (
  state: Partial<AuthContextStateType>,
  action: {
    payload: Partial<AuthContextStateType>;
    type: AuthContextActionType;
  },
) => {
  const { isAuthenticated, isLoading, isInitialized, user } = action.payload;

  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        user,
        isLoading,
        isAuthenticated,
        isInitialized,
      };

    case "IS_LOADING":
      return {
        ...state,
        isLoading,
      };

    default:
      return state;
  }
};
