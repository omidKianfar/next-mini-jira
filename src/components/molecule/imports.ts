'use client';

import { lazy } from 'react';
import * as Yup from 'yup';

// -------------------------------------------------------------------default export
// packages
export { default as ReactDOM } from 'react-dom';
export { default as copy } from 'clipboard-copy';
export { default as escapeHTML } from 'escape-html';
export { default as isHotkey } from 'is-hotkey';
export { default as WaveSurfer } from 'wavesurfer.js';

// ui
export { default as MyIcon } from '@/src/components/atom/icon-components';
export { default as MyImage } from '@/src/components/atom/image-components';
export { default as LoadingCircle } from '@/src/components/atom/loadings/loading-circle';
export { default as PageLoading } from '@/src/components/common/page-loading';
export { default as ButtonNext } from '@/src/components/atom/buttons-component/button-next';
export { default as ButtonFreeClass } from '@/src/components/atom/buttons-component/button-free-class';
export { default as ModalContainer } from '@/src/components/common/modal-container';
export { default as Picker } from '@emoji-mart/react';
export { default as data } from '@emoji-mart/data';

// utils
export { default as UnSeenMessageCalc } from '@/src/utils/unseen-calc';

// -------------------------------------------------------------------export
// packages
export { useSearchParams } from 'next/navigation';
export { Suspense, useState, useRef, useEffect } from 'react';
export { useDraggable } from '@dnd-kit/core';
export { enqueueSnackbar } from 'notistack';
export { yupResolver } from '@hookform/resolvers/yup';
export { Yup };
export {
  FormProvider,
  useForm,
  Controller,
  useFormContext,
} from 'react-hook-form';
export { motion, AnimatePresence } from 'framer-motion';
export { Icon } from '@iconify/react';
export { fireEvent, render, screen } from '@testing-library/react';
export { useSlate, Slate, Editable } from 'slate-react';
export { Transforms } from 'slate';
export { jsx } from 'slate-hyperscript';

// hooks
export { useAuth } from '@/src/hooks/auth/use-auth';
export { useNavigation } from '@/src/hooks/navigation/use-navigation';
export { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
export { useUnreadCount } from '@/src/hooks/chat/use-unread-count';
export { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';
export { useImageProcessor } from '@/src/hooks/image-processor/use-image-processor';
export { useVideoProcessor } from '@/src/hooks/video-processor/use-video-processor';
export { useFileUploader } from '@/src/hooks/file-uploader/use-file-uploader';
export { useEditor } from '@/src/hooks/editor/use-editor';

// libs
export { MessgesRead } from '@/src/libs/chat/read-message';
export { sendChatMessage } from '@/src/libs/chat/send-message';
export { deleteChatMessage } from '@/src/libs/chat/delete-message';
export { updateChatMessage } from '@/src/libs/chat/update-message';

// utils
export { stringSlicer } from '@/src/utils/string-slicer';

// -------------------------------------------------------------------type
// packages
export { default as React } from 'react';
export { Element, Editor, Text, Node } from 'slate';
export type { Descendant, BaseEditor } from 'slate';
export type {
  Dispatch,
  SetStateAction,
  Ref,
  ReactNode,
  RefObject,
} from 'react';
export type { FieldValues, Path } from 'react-hook-form';
export type {
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from 'slate-react';

// global types
export type {
  MyUserType,
  FileUploaderType,
  ModalProps,
  ChatMessage,
} from '@/src/types/global';
export { UserType } from '@/src/types/global';

// organism
export type { chatSidebarProps } from '@/src/components/organisms/type';
// pages
export type { TaskCardProps } from '@/src/components/pages/type';

// hooks
export type { fileType } from '@/src/hooks/type';

// -------------------------------------------------------------------lazy
// ui
export const LightBoxComponent = lazy(
  () => import('@/src/components/common/light-box')
);

export const MyVideo = lazy(
  () => import('@/src/components/atom/video-component')
);

export const DragDropUploader = lazy(
  () => import('@/src/components/organisms/uploads/drag-drop')
);

export const AvatarCropModal = lazy(() => import('../common/avatar-crop'));

export const ChatSidebar = lazy(
  () => import('@/src/components/organisms/sidebar-component/chat-sidebar')
);
