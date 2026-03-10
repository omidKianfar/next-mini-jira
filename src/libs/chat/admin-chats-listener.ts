import {
  ChatsType,
  collection,
  db,
  onSnapshot,
  orderBy,
  query,
  setChats,
} from '../imports';

import { AdminChatsListenerProps } from '../type';

export const AdminChatsListener = ({ dispatch }: AdminChatsListenerProps) => {
  const q = query(collection(db, 'chat'), orderBy('message.updatedAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const chats = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ChatsType
    );

    dispatch(setChats(chats));
  });
};
