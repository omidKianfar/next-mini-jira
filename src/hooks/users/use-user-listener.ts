"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

// firestore
import { listenToUsers } from "@/src/libs/auth/listener";

export const useUsersListener = () => {
  // hooks
  const dispatch = useDispatch();

  // functions
  useEffect(() => {
    const unsub = listenToUsers({ dispatch });
    return () => unsub();
  }, [dispatch]);
};
