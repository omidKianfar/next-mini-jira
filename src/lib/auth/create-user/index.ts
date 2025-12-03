import {dayjs, db, doc, MyUserType, setDoc, User, UserType} from '../../imports'


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
