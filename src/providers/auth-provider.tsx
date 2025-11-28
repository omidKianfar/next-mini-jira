"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser, clearUser } from "@/src/store/slices/auth";
import { auth, db } from "@/config";
import { RootState } from "@/src/store";
import { UserType } from "@/src/types/global";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const unsubDocRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(clearUser());

        if (unsubDocRef.current) {
          unsubDocRef.current();
          unsubDocRef.current = null;
        }

        return;
      }

      const ref = doc(db, "users", firebaseUser.uid);

      if (unsubDocRef.current) unsubDocRef.current();

      unsubDocRef.current = onSnapshot(ref, (snap) => {
        const data = snap.exists() ? snap.data() : {};

        const newUser = {
          userId: firebaseUser.uid,
          email: firebaseUser.email ?? null,
          userName: data.userName ?? null,
          photo: data.photo ?? null,
          birthday: data.birthday ?? null,
          userType: data.userType ?? UserType.Client,
          isActive: data.isActive ?? true,
          createdAt: data.createdAt ?? null,
          payment: {
            isPaid: data.payment?.isPaid ?? false,
            freeTrialEnabled: data.payment?.freeTrialEnabled ?? false,
            planType: data.payment?.planType ?? null,
            subscriptionId: data.payment?.subscriptionId ?? null,
            trialEnd: data.payment?.trialEnd ?? null,
            createdAt: data.payment?.createdAt ?? null,
            endAt: data.payment?.endAt ?? null,
          },
        };

        if (JSON.stringify(currentUser) !== JSON.stringify(newUser)) {
          dispatch(setUser(newUser));
        }
      });
    });

    return () => {
      unsubAuth();
      if (unsubDocRef.current) unsubDocRef.current();
    };
  }, [dispatch, currentUser]);

  return <>{children}</>;
};

export default AuthProvider;
