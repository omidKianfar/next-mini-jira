"use client";

export { default as dayjs } from "dayjs";
export { db } from "@/config";
export { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
export {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

export type { MyUserType, Task } from "@/src/types/global";
export type { User } from "firebase/auth";

export { UserType } from "@/src/types/global";
