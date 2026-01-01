import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

// type
import { db } from "@/configs/firebase";

// type
import { ChatMessage } from "../../types/global";
import { ChatMessagesListenerProps } from "./type";

export const ChatMessagesListener = ({
  user,
  onReceive,
}: ChatMessagesListenerProps) => {
  const messagesRef = collection(db, "chat", user.userId, "message");

  const Query = query(messagesRef, orderBy("createdAt", "asc"));

  return onSnapshot(Query, (snapshot) => {
    const msgs: ChatMessage[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      chatId: doc.data().chatId,
      senderId: doc.data().senderId,
      receiverId: doc.data().receiverId,
      text: doc.data().text,
      createdAt: doc.data().createdAt,
      updatedAt: doc.data().updatedAt,
      senderType: doc.data().senderType,
      read: doc.data().read,
      attachment: {
        fileUrl: doc.data().attachment?.fileUrl,
        fileType: doc.data().attachment?.fileType,
      },
    }));

    onReceive(msgs);
  });
};
