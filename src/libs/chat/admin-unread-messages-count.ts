'use client';

import { useEffect, useRef, useState } from 'react';
import { Unsubscribe } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/src/providers/auth-provider';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { UserType } from '@/src/types/global';

export const AdminUnreadMeassesListener = (): number => {
  const unreadCountsRef = useRef<Record<string, number>>({});
  const unreadListenersRef = useRef<Record<string, Unsubscribe>>({});
  const chatsRef = collection(db, 'chat');

  const [totalUnreadCount, setTotalUnreadCount] = useState<number>(0);

  const { user: currentUser } = useAuth();

  const chatListQuery = query(chatsRef);

  const recalculateTotal = () => {
    const total = Object.values(unreadCountsRef.current).reduce(
      (sum, count) => sum + count,
      0
    );
    setTotalUnreadCount(total);
  };

  useEffect(() => {
    if (!currentUser || currentUser.userType !== UserType.Admin) {
      Object.values(unreadListenersRef.current).forEach((unsub) => unsub());

      unreadListenersRef.current = {};
      unreadCountsRef.current = {};
      return;
    }

    const unsubscribeChatList = onSnapshot(chatListQuery, (snapshot) => {
      const newChatIds = new Set<string>();

      snapshot.docs.forEach((doc) => {
        const chatId = doc.id;
        newChatIds.add(chatId);

        if (!unreadListenersRef.current[chatId]) {
          const messagesRef = collection(db, 'chat', chatId, 'message');

          const unreadQuery = query(
            messagesRef,
            where('read', '==', false),
            where('senderId', '!=', UserType.Admin)
          );

          const unsubUnread = onSnapshot(unreadQuery, (unreadSnapshot) => {
            const count = unreadSnapshot.size;
            unreadCountsRef.current[chatId] = count;

            recalculateTotal();
          });

          unreadListenersRef.current[chatId] = unsubUnread;
        }
      });

      const currentListenerKeys = Object.keys(unreadListenersRef.current);

      currentListenerKeys.forEach((existingChatId) => {
        if (!newChatIds.has(existingChatId)) {
          unreadListenersRef?.current[existingChatId]();

          delete unreadListenersRef.current[existingChatId];
          delete unreadCountsRef.current[existingChatId];

          recalculateTotal();
        }
      });
    });

    return () => {
      unsubscribeChatList();

      Object.values(unreadListenersRef.current).forEach((unsub) => unsub());

      unreadListenersRef.current = {};
      unreadCountsRef.current = {};
    };
  }, [currentUser]);

  return totalUnreadCount;
};
