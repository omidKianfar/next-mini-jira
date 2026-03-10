// -------------------------------------------------------------------default export
// packages
export { default as dayjs } from 'dayjs';

// -------------------------------------------------------------------export
// packages
export { useEffect, useRef, useState } from 'react';
export {
  doc,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  limit,
  writeBatch,
} from 'firebase/firestore';

// configs
export { db } from '@/configs/firebase';

// hooks
export { useAuth } from '@/src/hooks/auth/use-auth';

// redux
export { setUsers } from '@/src/store/slices/users/users';
export { setChats } from '@/src/store/slices/chats/chats';
export { setTasks } from '@/src/store/slices/tasks/tasks';

// -------------------------------------------------------------------type
// packages
export type { User } from 'firebase/auth';
export type { Unsubscribe } from 'firebase/firestore';
export type { AppDispatch } from '@/src/store';

// global types
export type {
  MyUserType,
  ChatsType,
  ChatMessage,
  Task,
} from '@/src/types/global';

export { UserType } from '@/src/types/global';
