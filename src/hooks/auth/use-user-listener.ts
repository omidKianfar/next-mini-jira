"use client";

import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

// type
import { UseAuthListenerProps } from "../type";
import { MyUserType } from "@/src/types/global";

// config
import { auth, db } from "@/configs/firebase";

// firestore
import { findFirestoreCurrentUser } from "@/src/libs/auth/current-user-finder";

export const useUserListener = ({
  dispatch,
  unsubDocRef,
}: UseAuthListenerProps) => {
  const lastUserRef = useRef<MyUserType | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
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

        lastUserRef.current = null;
        return;
      }

      if (unsubDocRef.current) {
        unsubDocRef.current();
        unsubDocRef.current = null;
      }

      const ref = doc(db, "users", currentUser.uid);

      unsubDocRef.current = onSnapshot(ref, async (snap) => {
        const newUserData = snap.exists() ? snap.data() : {};

        const newFullUser = await findFirestoreCurrentUser(currentUser);

        if (
          JSON.stringify(lastUserRef.current) === JSON.stringify(newFullUser)
        ) {
          return;
        }

        lastUserRef.current = newFullUser;

        dispatch({
          type: "INITIALIZE",
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
