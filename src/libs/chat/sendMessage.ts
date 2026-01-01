import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import dayjs from "dayjs";

// config
import { db } from "@/configs/firebase";

// type
import { SendMessageProps } from "./type";

export const sendChatMessage = async ({ user, message }: SendMessageProps) => {
  const chatRef = doc(db, "chat", user.userId);
  
  const chatSnap = await getDoc(chatRef);

  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");

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
        lastMessageText: message.text || "",
        lastMessageSenderId: message.senderId,
      },
    });
  } else {
    await updateDoc(chatRef, {
      "message.updatedAt": now,
      "message.lastMessageText": message.text || "",
      "message.lastMessageSenderId": message.senderId,
    });
  }

  const messagesRef = collection(db, "chat", user.userId, "message");

  await addDoc(messagesRef, {
    id: crypto.randomUUID(),
    chatId: user.userId,
    senderId: message.senderId,
    receiverId: message.receiverId,
    text: message.text || "",
    createdAt: now,
    senderType: message.senderType || "",
    read: false,
    attachment: {
      fileUrl: message.attachment?.fileUrl || "",
      fileType: message.attachment?.fileType || "",
    },
  });
};
