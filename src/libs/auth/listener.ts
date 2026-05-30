'use client';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { setUsers } from '@/src/store/slices/users/users';
import { AppDispatch } from '@/src/store';
import { db } from '@/configs/firebase';
import { MyUserType } from '@/src/types/global';

interface ListenToUserProps {
  dispatch: AppDispatch;
}

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
