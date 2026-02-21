import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";

// config
import { db } from "@/configs/firebase";

// type
import { MessgesReadProps } from "./type";

export const MessgesRead = async ({
  chatId,
  senderType,
}: MessgesReadProps): Promise<void> => {
  if (!chatId) return;

  const messagesRef = collection(db, "chat", chatId, "message");

  const q = query(
    messagesRef,
    where("read", "==", false),
    where("senderType", "==", senderType),
  );

  try {
    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    const batch = writeBatch(db);

    snapshot.docs.forEach((messageDoc) => {
      batch.update(messageDoc.ref, { read: true });
    });

    await batch.commit();
  } catch (error) {
    console.error("Error marking messages as read:", error);
  }
};
