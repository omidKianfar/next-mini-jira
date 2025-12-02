export { default as dayjs } from "dayjs";

export { useRouter } from "next/navigation";
export { useAuth } from "./auth/use-auth";
export { useEffect, useState } from "react";
export { auth, db } from "@/config";
export { onAuthStateChanged } from "firebase/auth";
export { doc, onSnapshot, getDoc } from "firebase/firestore";
export { findFirestoreUser } from "@/src/lib/auth/user-finder";
export { useContext } from "react";
export { authContext } from "../providers/auth/auth-provider";
export { createUserDocument } from "@/src/lib/auth/create-user";
export { updateFirestoreUser } from "@/src/lib/auth/update-user";
export { enqueueSnackbar } from "notistack";
export {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export type {
  AuthContextProps,
  SignPropsType,
  UserPasswordUpdateType,
  UserProfileType,
} from "../types/global";
