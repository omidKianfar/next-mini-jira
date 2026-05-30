'use client';

import { ActionDispatch, Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { findFirestoreCurrentUser } from '@/src/libs/auth/current-user-finder';
import { createUserDocument } from '@/src/libs/auth/create-user';
import { updateFirestoreUser } from '@/src/libs/auth/update-user';
import { useNavigation } from '../navigation/use-navigation';
import { auth, db } from '@/configs/firebase';
import {
  AuthContextActionType,
  AuthContextStateType,
  SignPropsType,
  UserPasswordUpdateType,
  UserProfileType,
  UserType,
} from '@/src/types/global';

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

export const useAuthActions = ({
  dispatch,
  state,
  setStepNumber,
}: UseAuthActionProps) => {
  const navigation = useNavigation();

  const changeStep = (newStep: string) => {
    setStepNumber(newStep);
    localStorage.setItem('step', newStep);
  };

  const signinWithEmail = async ({ email, password }: SignPropsType) => {
    dispatch({
      type: 'IS_LOADING',
      payload: { isLoading: 'SIGN_IN_WITH_EMAIL' },
    });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;

      const user = await findFirestoreCurrentUser(currentUser);

      if (user) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            user: user,
            isAuthenticated: true,
            isLoading: null,
            isInitialized: true,
          },
        });

        if (user.userType == UserType?.Client) {
          navigation.dashboard();
        }

        if (user.userType == UserType?.Admin) {
          navigation.adminDashboard();
        }
      }
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });
    } finally {
      dispatch({
        type: 'IS_LOADING',
        payload: { isLoading: null },
      });
    }
  };

  const signupWithEmail = async ({ email, password }: SignPropsType) => {
    dispatch({
      type: 'IS_LOADING',
      payload: { isLoading: 'SIGN_UP_WITH_EMAIL' },
    });

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserDocument(newUser.user);

      const user = await findFirestoreCurrentUser(newUser.user);

      if (user) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            user,
            isAuthenticated: true,
            isLoading: null,
            isInitialized: true,
          },
        });

        enqueueSnackbar('Account created successfully', { variant: 'success' });
        changeStep('1');
        return user;
      }
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });
    } finally {
      dispatch({
        type: 'IS_LOADING',
        payload: { isLoading: null },
      });
    }
  };

  const googleSignin = async () => {
    dispatch({
      type: 'IS_LOADING',
      payload: { isLoading: 'SIGN_IN_WITH_GOOGLE' },
    });

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;

      const userRef = doc(db, 'users', currentUser.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await createUserDocument(currentUser);

        enqueueSnackbar('Account created successfully', { variant: 'success' });
        changeStep('4');
        navigation.signup();
      } else {
        const user = await findFirestoreCurrentUser(currentUser);

        if (user) {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              user,
              isAuthenticated: true,
              isLoading: null,
              isInitialized: true,
            },
          });
        }

        navigation.dashboard();
      }
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });
    } finally {
      dispatch({
        type: 'IS_LOADING',
        payload: { isLoading: null },
      });
    }
  };

  const updatePasswordGoogle = async ({
    newPassword,
  }: UserPasswordUpdateType) => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const credential = EmailAuthProvider.credential(user.email!, newPassword);
      const result = await linkWithCredential(user, credential);

      if (result) {
        enqueueSnackbar('Password updated successfully', {
          variant: 'success',
        });

        changeStep('1');
      }
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });
    }
  };

  const addOrUpdatePasswordForCurrentUser = async ({
    newPassword,
  }: UserPasswordUpdateType) => {
    try {
      const user = auth.currentUser;

      if (!user || !user.email) {
        enqueueSnackbar('User not authenticated', { variant: 'error' });
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, newPassword);

      try {
        await linkWithCredential(user, credential);

        enqueueSnackbar(
          'Password linked successfully (Email & Password enabled)',
          { variant: 'success' }
        );
        return;
      } catch (linkError: any) {
        if (linkError.code === 'auth/provider-already-linked') {
          await updatePassword(user, newPassword);

          enqueueSnackbar('Password updated successfully', {
            variant: 'success',
          });

          return;
        } else {
          throw linkError;
        }
      }
    } catch (error: any) {
      if (error.code === 'auth/weak-password') {
        enqueueSnackbar('Password is too weak', { variant: 'error' });
      } else {
        enqueueSnackbar(error.message || 'Something went wrong', {
          variant: 'error',
        });
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);

      dispatch({
        type: 'INITIALIZE',
        payload: {
          user: null,
          isAuthenticated: false,
          isLoading: null,
          isInitialized: true,
        },
      });

      navigation.signin();
    } catch (error) {}
  };

  const saveUserProfile = async ({ userId, data }: UserProfileType) => {
    try {
      if (!data) return;

      await updateFirestoreUser(userId, data);

      if (state.user && state.user.userId === userId) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            user: { ...state.user, ...data },
            isAuthenticated: true,
            isInitialized: true,
          },
        });

        enqueueSnackbar('Profile updated successfully', {
          variant: 'success',
        });

        changeStep('2');
      }
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });
    }
  };

  const terialMode = async ({ userId }: UserProfileType) => {
    try {
      const data = {
        payment: {
          freeTrialEnabled: true,
          trialEnd: dayjs().add(10, 'day').format('YYYY-MM-DD'),
        },
      };

      await updateFirestoreUser(userId, data);

      enqueueSnackbar('Terial Mode is Active', { variant: 'success' });
      changeStep('0');
      navigation.dashboard();
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: 'error',
      });
    }
  };

  return {
    signinWithEmail,
    signupWithEmail,
    googleSignin,
    updatePasswordGoogle,
    addOrUpdatePasswordForCurrentUser,
    terialMode,
    logout,
    saveUserProfile,
    changeStep,
  };
};
