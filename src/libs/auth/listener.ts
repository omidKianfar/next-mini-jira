"use client";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

// configs
import { db } from "@/configs/firebase";

// type
import { ListenToUserProps } from "./type";
import { MyUserType } from "@/src/types/global";

// redux
import { setUsers } from "@/src/store/slices/users/users";

export const listenToUsers = ({ dispatch }: ListenToUserProps) => {
  const q = query(collection(db, "users"), orderBy("createdAt", "desc"));

  return onSnapshot(q, (snap) => {
    const users = snap.docs.map((doc) => ({
      ...(doc.data() as MyUserType),
      userId: doc.id,
    }));

    dispatch(setUsers(users));
  });
};
