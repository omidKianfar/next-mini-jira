'use client';

import {
  collection,
  db,
  MyUserType,
  onSnapshot,
  orderBy,
  query,
  setUsers,
} from '../imports';

import { ListenToUserProps } from '../type';

export const listenToUsers = ({ dispatch }: ListenToUserProps) => {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snap) => {
    const users = snap.docs.map((doc) => ({
      ...(doc.data() as MyUserType),
      userId: doc.id,
    }));

    dispatch(setUsers(users));
  });
};
