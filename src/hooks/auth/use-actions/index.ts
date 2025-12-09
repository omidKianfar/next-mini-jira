"use client";

import {
  auth,
  createUserDocument,
  createUserWithEmailAndPassword,
  dayjs,
  db,
  doc,
  EmailAuthProvider,
  enqueueSnackbar,
  findFirestoreUser,
  getDoc,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  SignPropsType,
  updateFirestoreUser,
  useNavigation,
  UserPasswordUpdateType,
  UserProfileType,
} from "../../imports";
import { UseAuthActionProps } from "../../type";

export const useAuthActions = ({
  dispatch,
  state,
  setStepNumber,
}: UseAuthActionProps) => {
  const navigation = useNavigation();

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

        navigation.dashboard();
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

        navigation.signup();
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

        navigation.dashboard();
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

      navigation.signin();
    });
  };

  const saveUserProfile = async ({ userId, data }: UserProfileType) => {
    try {
      if (!data) return;

      await updateFirestoreUser(userId, data);

      if (state.user && state.user.userId === userId) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            user: { ...state.user, ...data },
            isAuthenticated: true,
            isInitialized: true,
          },
        });

        enqueueSnackbar("Profile updated successfully", {
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
      const data = {
        payment: {
          freeTrialEnabled: true,
          trialEnd: dayjs().add(10, "day").format("YYYY-MM-DD"),
        },
      };

      await updateFirestoreUser(userId, data);

      enqueueSnackbar("Terial Mode is Active", { variant: "success" });

      changeStep("0");

      navigation.dashboard();
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
