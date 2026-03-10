// -------------------------------------------------------------------default export
// packages
export { default as dayjs } from 'dayjs';

// configs
export { default as config } from '@/configs/firebase';

// commons
export { default as ErrorBoundary } from '@/src/components/common/error-boundray/error-boundary';
export { default as ErrorFallback } from '@/src/components/common/error-boundray/error-fallback';

// editor
export { default as LeafComponent } from '@/src/components/molecule/slatejs-editor-component/components/leaf';
export { default as ElementComponent } from '@/src/components/molecule/slatejs-editor-component/components/element';

// -------------------------------------------------------------------export
// packages
export { usePathname, useRouter } from 'next/navigation';
export {
  createContext,
  useContext,
  useReducer,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
export { Provider, useDispatch } from 'react-redux';
export { SnackbarProvider, enqueueSnackbar } from 'notistack';
export { createEditor, Editor, Text, Transforms } from 'slate';
export { withReact } from 'slate-react';
export { withHistory } from 'slate-history';
export { initializeApp } from 'firebase/app';
export {
  getAuth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  onAuthStateChanged,
} from 'firebase/auth';
export { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
export { auth, db } from '@/configs/firebase';

// config
export { supabase } from '@/configs/supabase';

// provider
export { authContext } from '@/src/providers/auth-provider';
export { ChatContext } from '@/src/providers/chat.provider';
export { editorContext } from '@/src/providers/editor-provider';

// hooks
export { useAuthActions } from '@/src/hooks/auth/use-actions';
export { useSetStepNumber } from '@/src/hooks/auth/use-set-step-number';
export { useUserListener } from '@/src/hooks/auth/use-user-listener';

// store
export { store } from '../store';

// libs
export { findFirestoreCurrentUser } from '@/src/libs/auth/current-user-finder';
export { createUserDocument } from '@/src/libs/auth/create-user';
export { updateFirestoreUser } from '@/src/libs/auth/update-user';
export { userUnreadMessagesListener } from '@/src/libs/chat/user-unread-messages-listener';
export { AdminChatsListener } from '@/src/libs/chat/admin-chats-listener';
export { listenToTasks } from '@/src/libs/tasks/listener';
export { listenToUserById } from '@/src/libs/auth/find-user-by-userId';
export { listenToUsers } from '@/src/libs/auth/listener';

// reducer
export { authReducer, initialState } from '@/src/reducer/auth-reducer';

// helper
export { routes } from '@/src/helper/routes/routes';

// editor
export { Deserialize } from '@/src/components/molecule/slatejs-editor-component/components/deserialize';
export { WithHtml } from '@/src/components/molecule/slatejs-editor-component/components/with-html';

// -------------------------------------------------------------------type
// packages
export type {
  PropsWithChildren,
  SetStateAction,
  ActionDispatch,
  RefObject,
  Dispatch,
} from 'react';
export type { RenderElementProps, RenderLeafProps } from 'slate-react';

// global types
export type {
  AuthContextProps,
  SignPropsType,
  UserPasswordUpdateType,
  UserProfileType,
  MyUserType,
  ChatContextType,
  EditorContextType,
  AuthContextActionType,
  AuthContextStateType,
  PlanType,
} from '@/src/types/global';

export { UserType } from '@/src/types/global';

// editor
export type { CustomEmoji } from '../components/molecule/slatejs-editor-component/type';
