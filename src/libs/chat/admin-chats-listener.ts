import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { AppDispatch } from '@/src/store';
import { setChats } from '@/src/store/slices/chats/chats';
import { db } from '@/configs/firebase';
import { ChatsType } from '@/src/types/global';

interface AdminChatsListenerProps {
  dispatch: AppDispatch;
}

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
