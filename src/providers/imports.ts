// -------------------------------------------------------------------default export
// packages
export { default as NotistackProvider } from './notistack';

// configs
export { default as config } from '@/configs/firebase';

// commons
export { default as ErrorBoundary } from '../components/common/error-boundray/error-boundary';
export { default as ErrorFallback } from '../components/common/error-boundray/error-fallback';

// editor
export { default as LeafComponent } from '../components/molecule/slatejs-editor-component/components/leaf';
export { default as ElementComponent } from '../components/molecule/slatejs-editor-component/components/element';

// -------------------------------------------------------------------export
// packages
export {
  createContext,
  useReducer,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
export { Provider } from 'react-redux';
export { SnackbarProvider } from 'notistack';
export { createEditor, Editor, Text, Transforms } from 'slate';
export { withReact } from 'slate-react';
export { withHistory } from 'slate-history';
export { usePathname, useSearchParams } from 'next/navigation';

// config
export { initializeApp } from 'firebase/app';
export { getAuth } from 'firebase/auth';
export { getFirestore } from 'firebase/firestore';

// hooks
export { useAuthActions } from '@/src/hooks/auth/use-actions';
export { useSetStepNumber } from '@/src/hooks/auth/use-set-step-number';
export { useUserListener } from '@/src/hooks/auth/use-user-listener';
export { useAuth } from '../hooks/auth/use-auth';
export { useUserListenerById } from '../hooks/users/use-user-listener-by-id';

// store
export { store } from '../store';

// reducer
export { authReducer, initialState } from '@/src/reducer/auth-reducer';

// libs
export { ChatMessagesListener } from '../libs/chat/messages-listener';

// editor
export { Deserialize } from '../components/molecule/slatejs-editor-component/components/deserialize';
export { WithHtml } from '../components/molecule/slatejs-editor-component/components/with-html';

// -------------------------------------------------------------------type
// packages
export type { PropsWithChildren, ReactNode } from 'react';
export type { RenderElementProps, RenderLeafProps } from 'slate-react';

// global types
export type {
  AuthContextProps,
  SignPropsType,
  UserPasswordUpdateType,
  UserProfileType,
  EditorContextType,
  ChatContextType,
  ChatMessage,
  MyUserType,
} from '@/src/types/global';

export { UserType } from '@/src/types/global';

// editor
export type { CustomEmoji } from '../components/molecule/slatejs-editor-component/type';
