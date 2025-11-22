import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { SignupProps } from "./types";
import { app } from "./config";

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const signupWithEmail = async ({ email, password }: SignupProps) => {
  const newUser = await createUserWithEmailAndPassword(auth, email, password);
  return newUser.user;
};
