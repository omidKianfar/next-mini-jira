import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

// config
import { db } from "@/configs/firebase";

// type
import { AdminChatsListenerProps } from "./type";
import { ChatsType } from "@/src/types/global";
import { setChats } from "@/src/store/slices/chats/chats";

export const AdminChatsListener = ({ dispatch }: AdminChatsListenerProps) => {
  const q = query(collection(db, "chat"), orderBy("message.updatedAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ChatsType,
    );

    dispatch(setChats(chats))
  });

};
