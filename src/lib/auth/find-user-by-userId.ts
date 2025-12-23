import { db } from "@/config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { MyUserType, UserType } from "@/src/types/global";

export const listenToUserById = (
  userId: string,
  callback: (user: MyUserType | null) => void
) => {
  const ref = doc(db, "users", userId);

  const unsubscribe = onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      callback(null);
      return;
    }

    const profile = snap.data();

    const user: MyUserType = {
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

    callback(user);
  });

  return unsubscribe;
};
