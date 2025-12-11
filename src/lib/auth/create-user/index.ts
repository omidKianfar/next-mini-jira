import { db } from "@/config";
import { MyUserType, UserType } from "@/src/types/global";
import dayjs from "dayjs";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const createUserDocument = async (user: User): Promise<MyUserType> => {
  const userData: MyUserType = {
    userId: user.uid,
    email: user.email || "",
    userName: null,
    userType: UserType.Client,
    isActive: true,
    photo: null,
    birthday: null,
    createdAt: dayjs().format("YYYY-MM-DD"),
    payment: {
      isPaid: null,
      freeTrialEnabled: null,
      planType: null,
      subscriptionId: null,
      trialEnd: null,
      createdAt: null,
      endAt: null,
    },
  };

  await setDoc(doc(db, "users", user.uid), userData);

  return userData;
};
