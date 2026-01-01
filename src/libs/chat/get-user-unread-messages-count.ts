import { collection, query, where, onSnapshot } from "firebase/firestore";

// config
import { db } from "@/configs/firebase";

// type
import { userUnreadCountListenerProps } from "./type";

export const userUnreadCountListener = ({
  chatId,
  senderType,
  callback,
}: userUnreadCountListenerProps) => {
  if (!chatId) {
    return () => {};
  }

  const messagesRef = collection(db, "chat", chatId, "message");

  const q = query(
    messagesRef,
    where("read", "==", false),
    where("senderType", "==", senderType),
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.size);
    },
    (error) => {
      console.error("Error listening to unread count:", error);
      callback(0);
    },
  );

  return unsubscribe;
};
