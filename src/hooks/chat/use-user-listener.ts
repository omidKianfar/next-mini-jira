'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AdminChatsListener } from '@/src/libs/chat/admin-chats-listener';

export const useChatsListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = AdminChatsListener({ dispatch });
    return () => unsub();
  }, [dispatch]);
};
