import {
  addDoc,
  collection,
  dayjs,
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '../imports';
import { SendMessageProps } from '../type';

export const sendChatMessage = async ({ user, message }: SendMessageProps) => {
  const chatRef = doc(db, 'chat', user.userId);
  const messagesRef = collection(db, 'chat', user.userId, 'message');

  const chatSnap = await getDoc(chatRef);

  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      user: {
        userId: user.userId,
        username: user.userName,
        photo: user.photo,
        email: user.email,
        status: user.isActive,
      },
      message: {
        createdAt: now,
        updatedAt: now,
        lastMessageText: message.text || '',
        lastMessageSenderId: message.senderId,
        lastMessageSenderType: message.senderType || '',
        lastMessageRead: false,
        lastMessageAttachment: {
          fileUrl: message.attachment?.fileUrl || '',
          fileType: message.attachment?.fileType || '',
        },
      },
    });
  } else {
    await updateDoc(chatRef, {
      'message.createdAt': now,
      'message.updatedAt': now,
      'message.lastMessageText': message.text || '',
      'message.lastMessageSenderId': message.senderId || '',
      'message.lastMessageSenderType': message.senderType || '',
      'message.lastMessageRead': message.read || false,
      'message.lastMessageAttachment.fileUrl':
        message.attachment?.fileUrl || '',
      'message.lastMessageAttachment.fileType':
        message.attachment?.fileType || '',
    });
  }

  await addDoc(messagesRef, {
    id: crypto.randomUUID(),
    chatId: user.userId,
    senderId: message.senderId,
    receiverId: message.receiverId,
    text: message.text || '',
    createdAt: now,
    senderType: message.senderType || '',
    read: false,
    attachment: {
      fileUrl: message.attachment?.fileUrl || '',
      fileType: message.attachment?.fileType || '',
    },
  });
};
