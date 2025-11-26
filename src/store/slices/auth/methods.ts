import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "@/config";
import {
  MyUserType,
  SignPropsType,
  UserProfileType,
  UserType,
} from "@/src/types/global";

export const app = initializeApp(config.firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);

const mapFirebaseUserToUser = async (
  currentUser: User
): Promise<MyUserType> => {
  const docRef = doc(db, "users", currentUser.uid);

  const docSnap = await getDoc(docRef);

  const profile = docSnap.exists() ? docSnap.data() : {};

  return {
    userId: currentUser.uid,
    email: currentUser.email,
    photo: currentUser.photoURL ?? null,
    userName: profile.userName ?? null,
    birthday: profile.birthday ?? null,
    userType: profile.userType ?? UserType.Client,
    isActive: profile.isActive ?? true,
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

    await setDoc(doc(db, "users", newUser.user.uid), {
      userId: newUser.user.uid,
      email: newUser.user.email,
      userName: null,
      userType: UserType.Client,
      isActive: true,
      photo: null,
      birthday: null,
    });

    return {
      userId: newUser.user.uid,
      email: newUser.user.email,
      userName: null,
      userType: UserType.Client,
      isActive: true,
      photo: null,
      birthday: null,
    };
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
