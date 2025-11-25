"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {
  AuthContextActionType,
  AuthContextProps,
  AuthContextStateType,
  MyUser,
  SignProps,
  UserProfile,
  UserType,
} from "./types";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import config from "@/config";
import { useQueryClient } from "@tanstack/react-query";

const app = initializeApp(config.firebase);
const auth = getAuth(app);
const db = getFirestore(app);

const initialState: AuthContextStateType = {
  error: "",
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

const authContext = createContext<AuthContextProps>({
  signupWithEmail: ({ email, password }: SignProps) => Promise.resolve(),
  signinWithEmail: ({ email, password }: SignProps) => Promise.resolve(),
  logout: () => Promise.resolve(),
  saveUserProfile: ({ userId, data }: UserProfile) => Promise.resolve(),
  user: null,
  isLoading: null,
  isAuthenticated: false,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  // const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(authReducer, initialState);

  const mapFirebaseUserToUser = async (currentUser: User): Promise<MyUser> => {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        dispatch({
          type: "IS_LOADING",
          payload: { isLoading: "INITIALIZING" },
        });

        const user = await mapFirebaseUserToUser(currentUser);

        dispatch({
          type: "INITIALIZE",
          payload: { user: user, isAuthenticated: true, isLoading: null },
        });
      } else {
        dispatch({
          type: "INITIALIZE",
          payload: { user: null, isAuthenticated: false, isLoading: null },
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signinWithEmail = async ({ email, password }: SignProps) => {
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
        payload: { user: user, isAuthenticated: true, isLoading: null },
      });

      dispatch({
        type: "INITIALIZE",
        payload: {
          isLoading: null,
          user: user,
          isAuthenticated: true,
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

  const signupWithEmail = async ({ email, password }: SignProps) => {
    console.log(email,password);
    
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
        payload: { user, isAuthenticated: true, isLoading: null },
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
      payload: { user: null, isAuthenticated: false, isLoading: null },
    });

    router.push("/auth");
  });
  };

  const saveUserProfile = async ({ userId, data }: UserProfile) => {
    await setDoc(doc(db, "users", userId), data, { merge: true });

    // queryClient.invalidateQueries({
    //   queryKey: ["userProfile", userId],
    // });

    if (state.user && state.user.userId === userId) {
      dispatch({
        type: "INITIALIZE",
        payload: { user: { ...state.user, ...data }, isAuthenticated: true },
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
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export function useAuth(): AuthContextProps {
  return useContext(authContext);
}
