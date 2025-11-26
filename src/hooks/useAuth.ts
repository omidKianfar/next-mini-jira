import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  logout,
  saveUserProfile,
  signinWithEmail,
  signupWithEmail,
} from "../store/slices/auth/methods";
import { SignPropsType, UserProfileType } from "../types/global";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  return {
    user,
    isLoading,
    isAuthenticated,
    signinWithEmail: (data: SignPropsType) => dispatch(signinWithEmail(data)),
    signupWithEmail: (data: SignPropsType) => dispatch(signupWithEmail(data)),
    logout: () => dispatch(logout()),
    saveUserProfile: (data: UserProfileType) => dispatch(saveUserProfile(data)),
  };
};
