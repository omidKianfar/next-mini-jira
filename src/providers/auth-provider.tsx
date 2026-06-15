'use client';

import {
  createContext,
  PropsWithChildren,
  useReducer,
  useRef,
  useState,
} from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import config from '@/configs/firebase';
import { authReducer, initialState } from '../reducer/auth-reducer';
import { useSetStepNumber } from '../hooks/auth/use-set-step-number';
import { useUserListener } from '../hooks/auth/use-user-listener';
import { useAuthActions } from '../hooks/auth/use-actions';
import {
  AuthContextProps,
  SignPropsType,
  UserPasswordUpdateType,
  UserProfileType,
} from '../types/global';

const app = initializeApp(config.firebase);
const auth = getAuth(app);
const db = getFirestore(app);

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
  stepNumber: '0',
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const unsubDocRef = useRef<null | (() => void)>(null);

  const [stepNumber, setStepNumber] = useState<string>('0');
  const [state, dispatch] = useReducer(authReducer, initialState);

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

export { app, auth, db };
