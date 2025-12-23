"use client";

import { listenToUsers } from "@/src/lib/auth/listener";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useUsersListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = listenToUsers({ dispatch });
    return () => unsub();
  }, [dispatch]);
};
