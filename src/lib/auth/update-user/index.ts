import {db, doc, getDoc, MyUserType, setDoc} from '../imports'


export const updateFirestoreUser = async (
  userId: string,
  data: Record<string, any>
): Promise<MyUserType> => {
  await setDoc(doc(db, "users", userId), data, { merge: true });

  const snap = await getDoc(doc(db, "users", userId));
  return snap.data() as MyUserType;
};
