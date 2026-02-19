import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';

// config
import { db } from '@/configs/firebase';

// type
import { DeleteChatMessageProps } from './type';

export const deleteChatMessage = async ({
  userId,
  messageId,
}: DeleteChatMessageProps) => {
  const messageRef = doc(db, 'chat', userId, 'message', messageId);

  await deleteDoc(messageRef);

  const messagesRef = collection(db, 'chat', userId, 'message');
  const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);

  const chatRef = doc(db, 'chat', userId);

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
