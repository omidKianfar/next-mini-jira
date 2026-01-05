"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

// firestore
import { AdminChatsListener } from "@/src/libs/chat/admin-chats-listener";

export const useChatsListener = () => {
  // hooks
  const dispatch = useDispatch();

  // functions
  useEffect(() => {
    const unsub = AdminChatsListener({ dispatch });
    return () => unsub();
  }, [dispatch]);
};
