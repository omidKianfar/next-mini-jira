"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser, clearUser } from "@/src/store/slices/auth";
import { auth, db } from "@/config"; // چون گفتی از اول همینجاست
import { UserType } from "@/src/types/global";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubDoc: null | (() => void) = null;

    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(clearUser());
        if (unsubDoc) unsubDoc();
        unsubDoc = null;
        return;
      }

      const ref = doc(db, "users", firebaseUser.uid);

      // Attach Firestore listener
      unsubDoc = onSnapshot(ref, (snap) => {
        const data = snap.exists() ? snap.data() : {};

        dispatch(
          setUser({
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
          })
        );
      });
    });

    return () => {
      unsubAuth();
      if (unsubDoc) unsubDoc();
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
