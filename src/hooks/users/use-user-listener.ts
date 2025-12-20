"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { MyUserType } from "@/src/types/global";

export const useUsersListener = () => {
  const [users, setUsers] = useState<MyUserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"));

    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((doc) => ({
        ...(doc.data() as MyUserType),
        userId: doc.id,
      }));

      setUsers(arr);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { users, loading };
};
