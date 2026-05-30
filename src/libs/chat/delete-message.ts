import { db } from '@/configs/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';

interface DeleteChatMessageProps {
  userId: string;
  messageId: string;
}

export const deleteChatMessage = async ({
  userId,
  messageId,
}: DeleteChatMessageProps) => {
  const chatRef = doc(db, 'chat', userId);
  const messageRef = doc(db, 'chat', userId, 'message', messageId);
  const messagesRef = collection(db, 'chat', userId, 'message');

  await deleteDoc(messageRef);

  const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const lastMsg = querySnapshot.docs[0].data();

    await updateDoc(chatRef, {
      'message.lastMessageText': lastMsg.text || '',
      'message.lastMessageSenderId': lastMsg.senderId || '',
      'message.updatedAt': lastMsg.createdAt,
      'message.lastMessageAttachment.fileUrl':
        lastMsg.attachment?.fileUrl || '',
    });
  } else {
    await updateDoc(chatRef, {
      'message.lastMessageText': '',
      'message.lastMessageAttachment.fileUrl': '',
    });
  }
};
