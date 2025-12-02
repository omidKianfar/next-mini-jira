"use client";

import { enqueueSnackbar } from "notistack";
import { auth, db } from "@/config";
import { useRouter } from "next/navigation";
import {
  SignPropsType,
  UserPasswordUpdateType,
  UserProfileType,
} from "@/src/types/global";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { findFirestoreUser } from "@/src/lib/auth/user-finder";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UseAuthActionProps } from "./type";
import { createUserDocument } from "@/src/lib/auth/create-user";
import dayjs from "dayjs";

export const useAuthActions = ({
  dispatch,
  state,
  setStepNumber,
}: UseAuthActionProps) => {
  const router = useRouter();

  const changeStep = (newStep: string) => {
    setStepNumber(newStep);
    localStorage.setItem("step", newStep);
  };

  const signinWithEmail = async ({ email, password }: SignPropsType) => {
    dispatch({
      type: "IS_LOADING",
      payload: { isLoading: "SIGN_IN_WITH_EMAIL" },
    });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const currentUser = userCredential.user;

      const user = await findFirestoreUser(currentUser);

      if (user) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            user: user,
            isAuthenticated: true,
            isLoading: null,
            isInitialized: true,
          },
        });

        router.push("/dashboard");
      }
    } catch (error) {
      console.log("User signin firebase error: ", error);
    } finally {
      dispatch({
        type: "IS_LOADING",
        payload: { isLoading: null },
      });
    }
  };

  const signupWithEmail = async ({ email, password }: SignPropsType) => {
    dispatch({
      type: "IS_LOADING",
      payload: { isLoading: "SIGN_UP_WITH_EMAIL" },
    });

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserDocument(newUser.user);

      const user = await findFirestoreUser(newUser.user);

      if (user) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            user,
            isAuthenticated: true,
            isLoading: null,
            isInitialized: true,
          },
        });

        enqueueSnackbar("Account created successfully", { variant: "success" });

        changeStep("1");

        return user;
      }
    } catch (error: any) {
      console.log("User signup firebase error: ", error);

      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
    } finally {
      dispatch({
        type: "IS_LOADING",
        payload: { isLoading: null },
      });
    }
  };

  const googleSignin = async () => {
    dispatch({
      type: "IS_LOADING",
      payload: { isLoading: "SIGN_IN_WITH_GOOGLE" },
    });

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const currentUser = result.user;

      const userRef = doc(db, "users", currentUser.uid);

      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await createUserDocument(currentUser);

        enqueueSnackbar("Account created successfully", { variant: "success" });

        changeStep("4");
      } else {
        const user = await findFirestoreUser(currentUser);

        if (user) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              user,
              isAuthenticated: true,
              isLoading: null,
              isInitialized: true,
            },
          });
        }

        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log("User signin firebase error: ", error);

      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
    } finally {
      dispatch({
        type: "IS_LOADING",
        payload: { isLoading: null },
      });
    }
  };

  const updatePassword = async ({ newPassword }: UserPasswordUpdateType) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const credential = EmailAuthProvider.credential(user.email!, newPassword);

      const result = await linkWithCredential(user, credential);

      if (result) {
        enqueueSnackbar("Password updated successfully", {
          variant: "success",
        });

        changeStep("1");
      }
    } catch (error: any) {
      console.log("Password update error:", error);

      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
    }
  };

  const logout = () => {
    return signOut(auth).then(() => {
      dispatch({
        type: "INITIALIZE",
        payload: {
          user: null,
          isAuthenticated: false,
          isLoading: null,
          isInitialized: true,
        },
      });

      router.push("/signin");
    });
  };

  const saveUserProfile = async ({ userId, data }: UserProfileType) => {
    try {
      await setDoc(doc(db, "users", userId), data, { merge: true });

      if (state.user && state.user.userId === userId) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            user: { ...state.user, ...data },
            isAuthenticated: true,
            isInitialized: true,
          },
        });

        enqueueSnackbar("Password updated successfully", {
          variant: "success",
        });

        changeStep("2");
      }
    } catch (error: any) {
      console.log("Profile update error:", error);

      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
    }
  };

  const terialMode = async ({ userId }: UserProfileType) => {
    try {
      await updateDoc(doc(db, "users", userId as string), {
        payment: {
          freeTrialEnabled: true,
          trialEnd: dayjs().add(10, "day").format("YYYY-MM-DD"),
        },
      });

      enqueueSnackbar("Terial Mode is Active", { variant: "success" });

      changeStep("0");

      router.push("/dashboard");
    } catch (error: any) {
      console.log("Profile update error:", error);

      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
    }
  };

  return {
    signinWithEmail,
    signupWithEmail,
    googleSignin,
    updatePassword,
    terialMode,
    logout,
    saveUserProfile,
    changeStep,
  };
};
