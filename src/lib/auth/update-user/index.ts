import { db } from "@/config/firebase";
import { MyUserType } from "@/src/types/global";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const updateFirestoreUser = async (
  userId: string,
  data: Record<string, any>,
): Promise<MyUserType> => {
  await setDoc(doc(db, "users", userId), data, { merge: true });

  const snap = await getDoc(doc(db, "users", userId));
  return snap.data() as MyUserType;
};
