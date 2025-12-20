import { collection, getDocs, orderBy, query } from "firebase/firestore";

// config
import { db } from "@/config/firebase";

// type
import { MyUserType } from "@/src/types/global";

export const getUsers = async (): Promise<MyUserType[]> => {
  const Query = query(collection(db, "users"), orderBy("createdAt", "desc"));

  const snapshot = await getDocs(Query);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<MyUserType, "id">),
  }));
};
