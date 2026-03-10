import {
  AuthContextActionType,
  AuthContextStateType,
} from '@/src/types/global';

const initialState: AuthContextStateType = {
  user: null,
  isLoading: null,
  isInitialized: false,
  isAuthenticated: false,
};

const authReducer = (
  state: Partial<AuthContextStateType>,
  action: {
    payload: Partial<AuthContextStateType>;
    type: AuthContextActionType;
  }
) => {
  const { isAuthenticated, isLoading, isInitialized, user } = action.payload;

  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        user,
        isLoading,
        isAuthenticated,
        isInitialized,
      };

    case 'IS_LOADING':
      return {
        ...state,
        isLoading,
      };

    default:
      return state;
  }
};

export { initialState, authReducer };
