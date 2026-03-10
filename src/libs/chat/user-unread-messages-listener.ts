import { collection, db, onSnapshot, query, where } from '../imports';
import { userUnreadMessageListenerProps } from '../type';

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
