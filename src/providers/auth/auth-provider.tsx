"use client";

import config from "@/config/firebase";
import { useAuthActions } from "@/src/hooks/auth/use-actions";
import { useSetStepNumber } from "@/src/hooks/auth/use-set-step-number";
import { useUserListener } from "@/src/hooks/auth/use-user-listener";
import { authReducer, initialState } from "@/src/providers/auth/auth-reducer";
import {
  AuthContextProps,
  SignPropsType,
  UserPasswordUpdateType,
  UserProfileType,
} from "@/src/types/global";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  createContext,
  PropsWithChildren,
  useReducer,
  useRef,
  useState,
} from "react";

export const app = initializeApp(config.firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const authContext = createContext<AuthContextProps>({
  signupWithEmail: ({ email, password }: SignPropsType) => Promise.resolve(),
  signinWithEmail: ({ email, password }: SignPropsType) => Promise.resolve(),
  googleSignin: () => Promise.resolve(),
  updatePasswordGoogle: ({ newPassword }: UserPasswordUpdateType) =>
    Promise.resolve(),
  addOrUpdatePasswordForCurrentUser: ({
    newPassword,
  }: UserPasswordUpdateType) => Promise.resolve(),
  logout: () => Promise.resolve(),
  saveUserProfile: ({ userId, data }: UserProfileType) => Promise.resolve(),
  terialMode: ({ userId }: UserProfileType) => Promise.resolve(),
  changeStep: (newStep: string) => {},
  user: null,
  isLoading: null,
  isAuthenticated: false,
  isInitialized: false,
  stepNumber: "0",
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const unsubDocRef = useRef<null | (() => void)>(null);

  const [stepNumber, setStepNumber] = useState("0");

  useSetStepNumber({ setStepNumber });

  useUserListener({
    state,
    dispatch,
    unsubDocRef,
  });

  const {
    signupWithEmail,
    signinWithEmail,
    googleSignin,
    updatePasswordGoogle,
    addOrUpdatePasswordForCurrentUser,
    logout,
    saveUserProfile,
    terialMode,
    changeStep,
  } = useAuthActions({ state, dispatch, setStepNumber });

  return (
    <authContext.Provider
      value={{
        signupWithEmail,
        signinWithEmail,
        googleSignin,
        updatePasswordGoogle,
        addOrUpdatePasswordForCurrentUser,
        logout,
        saveUserProfile,
        terialMode,
        changeStep,
        user: state.user ?? null,
        isLoading: state.isLoading ?? null,
        isAuthenticated: state.isAuthenticated ?? false,
        isInitialized: state.isInitialized ?? false,
        stepNumber,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
