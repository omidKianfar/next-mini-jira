"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

// type
import { UseAuthListenerProps } from "../../type";

// config
import { auth, db } from "@/config/firebase";

// firestore
import { findFirestoreUser } from "@/src/lib/auth/user-finder";

export const useUserListener = ({
  state,
  dispatch,
  unsubDocRef,
}: UseAuthListenerProps) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        dispatch({
          type: "INITIALIZE",
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

        return;
      }

      const ref = doc(db, "users", currentUser.uid);

      if (unsubDocRef.current) unsubDocRef.current();

      unsubDocRef.current = onSnapshot(ref, async (snap) => {
        const data = snap.exists() ? snap.data() : {};

        const newUser = await findFirestoreUser(currentUser);

        if (JSON.stringify(state.user) !== JSON.stringify(newUser)) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              user: newUser,
              isAuthenticated: true,
              isLoading: null,
              isInitialized: true,
            },
          });
        }
      });
    });

    return () => {
      unsubscribe();
      if (unsubDocRef.current) unsubDocRef.current();
    };
  }, [state.user]);
};
