import { doc, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

// config
import { db } from '@/configs/firebase';

// type
import { UpdateChatMessageProps } from './type';

export const updateChatMessage = async ({
  userId,
  messageId,
  newText,
}: UpdateChatMessageProps) => {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

  const messageDocRef = doc(db, 'chat', userId, 'message', messageId);

  await updateDoc(messageDocRef, {
    text: newText,
    updatedAt: now,
  });

  const chatRef = doc(db, 'chat', userId);

  await updateDoc(chatRef, {
    'message.lastMessageText': newText,
    'message.updatedAt': now,
  });
};
