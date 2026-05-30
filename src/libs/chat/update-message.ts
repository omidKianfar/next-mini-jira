import dayjs from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/configs/firebase';

interface UpdateChatMessageProps {
  userId: string;
  messageId: string;
  newText: string;
}

export const updateChatMessage = async ({
  userId,
  messageId,
  newText,
}: UpdateChatMessageProps) => {
  const messageDocRef = doc(db, 'chat', userId, 'message', messageId);
  const chatRef = doc(db, 'chat', userId);

  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

  await updateDoc(messageDocRef, {
    text: newText,
    updatedAt: now,
  });

  await updateDoc(chatRef, {
    'message.lastMessageText': newText,
    'message.updatedAt': now,
  });
};
