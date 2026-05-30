import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { UserType } from '@/src/types/global';
interface userUnreadMessageListenerProps {
  chatId: string;
  senderType: UserType;
  callback: (count: number) => void;
}

export const userUnreadMessagesListener = ({
  chatId,
  senderType,
  callback,
}: userUnreadMessageListenerProps) => {
  if (!chatId) {
    return () => {};
  }

  const messagesRef = collection(db, 'chat', chatId, 'message');

  const q = query(
    messagesRef,
    where('read', '==', false),
    where('senderType', '==', senderType)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.size);
    },
    (error) => {
      callback(0);
    }
  );
  return unsubscribe;
};
