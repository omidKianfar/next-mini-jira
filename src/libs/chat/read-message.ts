import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { UserType } from '@/src/types/global';
interface MessgesReadProps {
  chatId: string;
  senderType: UserType;
}

export const MessgesRead = async ({
  chatId,
  senderType,
}: MessgesReadProps): Promise<void> => {
  if (!chatId) return;

  const messagesRef = collection(db, 'chat', chatId, 'message');

  const q = query(
    messagesRef,
    where('read', '==', false),
    where('senderType', '==', senderType)
  );

  try {
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;

    const batch = writeBatch(db);

    snapshot.docs.forEach((messageDoc) => {
      batch.update(messageDoc.ref, { read: true });
    });

    await batch.commit();
  } catch (error) {}
};
