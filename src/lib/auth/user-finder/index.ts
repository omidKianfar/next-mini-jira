import { db } from "@/config/firebase";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// type
import { MyUserType, UserType } from "@/src/types/global";

export const findFirestoreUser = async (
  currentUser: User,
): Promise<MyUserType> => {
  const docRef = doc(db, "users", currentUser.uid);

  const docSnap = await getDoc(docRef);

  const profile = docSnap.exists() ? docSnap.data() : {};

  return {
    userId: currentUser.uid,
    email: currentUser.email ?? null,
    photo: profile.photo ?? null,
    userName: profile.userName ?? null,
    birthday: profile.birthday ?? null,
    userType: profile.userType ?? UserType.Client,
    isActive: profile.isActive ?? true,
    createdAt: profile.createdAt ?? null,
    payment: {
      isPaid: profile?.payment?.isPaid ?? false,
      freeTrialEnabled: profile?.payment?.freeTrialEnabled ?? false,
      planType: profile?.payment?.planType ?? null,
      subscriptionId: profile?.payment?.subscriptionId ?? null,
      trialEnd: profile?.payment?.trialEnd ?? null,
      createdAt: profile?.payment?.createdAt ?? null,
      endAt: profile?.payment?.endAt ?? null,
    },
  };
};
