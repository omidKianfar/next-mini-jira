"use client";

import { enqueueSnackbar } from "notistack";
import { auth, db } from "@/config";
import { useRouter } from "next/navigation";
import { SignPropsType, UserProfileType, UserType } from "@/src/types/global";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { findFirestoreUser } from "@/src/lib/auth/user-finder";
import { doc, setDoc } from "firebase/firestore";
import { UseAuthActionProps } from "./type";

export const useAuthActions = ({
  dispatch,
  state,
  setStepNumber,
}: UseAuthActionProps) => {
  const router = useRouter();

  // const queryClient = useQueryClient();

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

      await setDoc(doc(db, "users", newUser.user.uid), {
        userId: newUser.user.uid,
        email: newUser.user.email,
        userName: null,
        userType: UserType.Client,
        isActive: true,
        photo: null,
        birthday: null,
      });

      const user = await findFirestoreUser(newUser.user);

      if (user) {
        enqueueSnackbar("Account created successfully", { variant: "success" });

        dispatch({
          type: "INITIALIZE",
          payload: {
            user,
            isAuthenticated: true,
            isLoading: null,
            isInitialized: true,
          },
        });

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
    await setDoc(doc(db, "users", userId), data, { merge: true });

    // queryClient.invalidateQueries({
    //   queryKey: ["userProfile", userId],
    // });

    if (state.user && state.user.userId === userId) {
      dispatch({
        type: "INITIALIZE",
        payload: {
          user: { ...state.user, ...data },
          isAuthenticated: true,
          isInitialized: true,
        },
      });
    }
  };

  const changeStep = (newStep: string) => {
    setStepNumber(newStep);
    localStorage.setItem("step", newStep);
  };

  return {
    signinWithEmail,
    signupWithEmail,
    logout,
    saveUserProfile,
    changeStep,
  };
};
