import { doc, getDoc, setDoc } from "firebase/firestore";

// configs
import { db } from "@/configs/firebase";

// type
import { MyUserType } from "@/src/types/global";

export const updateFirestoreUser = async (
  userId: string,
  data: Record<string, any>,
): Promise<MyUserType> => {
  await setDoc(doc(db, "users", userId), data, { merge: true });

  const snap = await getDoc(doc(db, "users", userId));
  return snap.data() as MyUserType;
};
