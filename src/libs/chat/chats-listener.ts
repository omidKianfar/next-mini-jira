import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

// config
import { db } from "@/configs/firebase";

// type
import { ChatsListenerProps } from "./type";
import { ChatsType } from "@/src/types/global";

export const ChatsListener = ({ callback }: ChatsListenerProps) => {
  const q = query(collection(db, "chat"), orderBy("message.updatedAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const result = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ChatsType,
    );

    callback(result);
  });

  return unsubscribe;
};
