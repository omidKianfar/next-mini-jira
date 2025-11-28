import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc,  setDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  MyUserType,
  SignPropsType,
  UserProfileType,
  UserType,
} from "@/src/types/global";
import dayjs from "dayjs";
import { auth, db } from "@/config";



export const mapFirebaseUserToUser = async (
  currentUser: User
): Promise<MyUserType> => {
  const docRef = doc(db, "users", currentUser.uid);

  const docSnap = await getDoc(docRef);

  const profile = docSnap.exists() ? docSnap.data() : {};

  return {
    userId: currentUser.uid,
    email: currentUser.email ?? null,
    photo: currentUser.photoURL ?? null,
    userName: profile.userName ?? null,
    birthday: profile.birthday ?? null,
    userType: profile.userType ?? UserType.Client,
    isActive: profile.isActive ?? true,
    createdAt: profile.createdAt ?? null,
    payment: {
      isPaid: profile.isPaid ?? false,
      freeTrialEnabled: profile.freeTrialEnabled ?? false,
      planType: profile.planType ?? null,
      subscriptionId: profile.subscriptionId ?? null,
      trialEnd: profile.trialEnd ?? null,
      createdAt: profile.paymentCreatedAt ?? null,
    },
  };
};

export const signinWithEmail = createAsyncThunk(
  "auth/signinWithEmail",
  async ({ email, password }: SignPropsType) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return mapFirebaseUserToUser(userCredential.user);
  }
);

export const signupWithEmail = createAsyncThunk(
  "auth/signupWithEmail",
  async ({ email, password }: SignPropsType) => {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);

    const userItems = {
      userId: newUser.user.uid,
      email: newUser.user.email,
      photo: null,
      userName: null,
      birthday: null,
      userType: UserType.Client,
      isActive: true,
      createdAt: dayjs(new Date()).format("YYYY-MM-DD"),
      payment: {
        isPaid: false,
        freeTrialEnabled: false,
        planType: null,
        subscriptionId: null,
        trialEnd: null,
        createdAt: null,
      },
    };

    await setDoc(doc(db, "users", newUser.user.uid), userItems);

    return userItems;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);

  return null;
});

export const saveUserProfile = createAsyncThunk(
  "auth/saveUserProfile",
  async ({ userId, data }: UserProfileType, { getState }) => {
    await setDoc(doc(db, "users", userId), data, { merge: true });

    const state: any = getState();

    const currentUser = state.auth.user;

    if (currentUser && currentUser.userId === userId) {
      return { ...currentUser, ...data };
    }

    return null;
  }
);
