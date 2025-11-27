"use client";

import { clearUser, setUser } from "@/src/store/slices/auth";
import { auth, mapFirebaseUserToUser } from "@/src/store/slices/auth/methods";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const mappedCurrentUser = await mapFirebaseUserToUser(firebaseUser);

        dispatch(setUser(mappedCurrentUser));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsub();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
