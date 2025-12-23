import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

// type
import { MyUserType, UserType } from "@/src/types/global";

export const findFirestoreUserById = async (
  userId: string,
): Promise<MyUserType | null> => {
  const ref = doc(db, "users", userId);
  
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const profile = snap.data();

  return {
    userId,
    email: profile.email ?? null,
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
