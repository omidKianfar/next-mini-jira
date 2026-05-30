'use client';

import { ActionDispatch, RefObject, useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { findFirestoreCurrentUser } from '@/src/libs/auth/current-user-finder';
import { auth, db } from '@/configs/firebase';
import {
  AuthContextActionType,
  AuthContextStateType,
  MyUserType,
} from '@/src/types/global';

interface UseAuthListenerProps {
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

export const useUserListener = ({
  dispatch,
  unsubDocRef,
}: UseAuthListenerProps) => {
  const lastUserRef = useRef<MyUserType | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            user: null,
            isAuthenticated: false,
            isLoading: null,
            isInitialized: true,
          },
        });

        if (unsubDocRef.current) {
          unsubDocRef.current();
          unsubDocRef.current = null;
        }

        lastUserRef.current = null;
        return;
      }

      if (unsubDocRef.current) {
        unsubDocRef.current();
        unsubDocRef.current = null;
      }

      const ref = doc(db, 'users', currentUser.uid);

      unsubDocRef.current = onSnapshot(ref, async (snap) => {
        const newFullUser = await findFirestoreCurrentUser(currentUser);

        if (
          JSON.stringify(lastUserRef.current) === JSON.stringify(newFullUser)
        ) {
          return;
        }

        lastUserRef.current = newFullUser;

        dispatch({
          type: 'INITIALIZE',
          payload: {
            user: newFullUser,
            isAuthenticated: true,
            isLoading: null,
            isInitialized: true,
          },
        });
      });
    });

    return () => {
      unsubscribeAuth();

      if (unsubDocRef.current) {
        unsubDocRef.current();
        unsubDocRef.current = null;
      }
    };
  }, []);
};
