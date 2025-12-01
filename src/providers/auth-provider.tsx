"use client";

import {
  createContext,
  PropsWithChildren,
  useEffect,
  useReducer,
  useRef,
} from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import config from "@/config";
import {
  AuthContextActionType,
  AuthContextProps,
  AuthContextStateType,
  MyUserType,
  SignPropsType,
  UserProfileType,
  UserType,
} from "../types/global";

const app = initializeApp(config.firebase);
const auth = getAuth(app);
const db = getFirestore(app);

const initialState: AuthContextStateType = {
  user: null,
  isLoading: null,
  isInitialized: false,
  isAuthenticated: false,
};

const authReducer = (
  state: Partial<AuthContextStateType>,
  action: {
    payload: Partial<AuthContextStateType>;
    type: AuthContextActionType;
  }
) => {
  const { isAuthenticated, isLoading, isInitialized, user } = action.payload;

  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        user,
        isLoading,
        isAuthenticated,
        isInitialized,
      };

    case "IS_LOADING":
      return {
        ...state,
        isLoading,
      };

    default:
      return state;
  }
};

export const authContext = createContext<AuthContextProps>({
  signupWithEmail: ({ email, password }: SignPropsType) => Promise.resolve(),
  signinWithEmail: ({ email, password }: SignPropsType) => Promise.resolve(),
  logout: () => Promise.resolve(),
  saveUserProfile: ({ userId, data }: UserProfileType) => Promise.resolve(),
  user: null,
  isLoading: null,
  isAuthenticated: false,
  isInitialized:false
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  // const queryClient = useQueryClient();

  const unsubDocRef = useRef<null | (() => void)>(null);

  const [state, dispatch] = useReducer(authReducer, initialState);

  const mapFirebaseUserToUser = async (
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
        isPaid: profile?.payment?.isPaid ?? false,
        freeTrialEnabled: profile?.payment?.freeTrialEnabled ?? false,
        planType: profile?.payment?.planType ?? null,
        subscriptionId: profile?.payment?.subscriptionId ?? null,
        trialEnd: profile?.payment?.trialEnd ?? null,
        createdAt: profile?.payment?.createdAt ?? null,
        endAt: profile?.payment?.endAt ?? null,
      },
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            user: null,
            isAuthenticated: false,
            isLoading: null,
            isInitialized: false,
          },
        });

        if (unsubDocRef.current) {
          unsubDocRef.current();

          unsubDocRef.current = null;
        }

        return;
      }

      const ref = doc(db, "users", currentUser.uid);

      if (unsubDocRef.current) unsubDocRef.current();

      unsubDocRef.current = onSnapshot(ref, async (snap) => {
        const data = snap.exists() ? snap.data() : {};

        const newUser = await mapFirebaseUserToUser(currentUser);

        if (JSON.stringify(state.user) !== JSON.stringify(newUser)) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              user: newUser,
              isAuthenticated: true,
              isLoading: null,
              isInitialized: true,
            },
          });
        }
      });
    });

    return () => {
      unsubscribe();
      if (unsubDocRef.current) unsubDocRef.current();
    };
  }, [state.user]);

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

      const user = await mapFirebaseUserToUser(currentUser);

      dispatch({
        type: "INITIALIZE",
        payload: {
          user: user,
          isAuthenticated: true,
          isLoading: null,
          isInitialized: true,
        },
      });

      router.push("/");
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
    console.log(email, password);

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

      const user = await mapFirebaseUserToUser(newUser.user);

      dispatch({
        type: "INITIALIZE",
        payload: {
          user,
          isAuthenticated: true,
          isLoading: null,
          isInitialized: true,
        },
      });

      return user;
    } catch (error) {
      console.log("User signin firebase error: ", error);
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

  return (
    <authContext.Provider
      value={{
        signupWithEmail,
        signinWithEmail,
        logout,
        saveUserProfile,
        user: state.user ?? null,
        isLoading: state.isLoading ?? null,
        isAuthenticated: state.isAuthenticated ?? false,
        isInitialized: state.isInitialized ?? false
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

