import { lazy } from 'react';
// -------------------------------------------------------------------default export
// packages
export { default as dayjs } from 'dayjs';
export { default as Yup } from 'yup';

// ui
export { default as ButtonNext } from '@/src/components/atom/buttons-component/button-next';
export { default as ButtonFreeClass } from '@/src/components/atom/buttons-component/button-free-class';
export { default as MyIcon } from '@/src/components/atom/icon-components';
export { default as MyImage } from '@/src/components/atom/image-components';
export { default as SelectField } from '@/src/components/molecule/RHF-controllers-components/RHF-fields/select-filed';
export { default as InputField } from '@/src/components/molecule/RHF-controllers-components/RHF-fields/input-field';
export { default as TextareaFiled } from '@/src/components/molecule/RHF-controllers-components/RHF-fields/textarea-field';
export { default as DateInputField } from '@/src/components/molecule/RHF-controllers-components/RHF-fields/date-input-field';
export { default as FileInputField } from '@/src/components/molecule/RHF-controllers-components/RHF-fields/file-input-field';
export { default as Logo } from '@/src/components/atom/logo-component';
export { default as LoadingCircle } from '@/src/components/atom/loadings/loading-circle';
export { default as PageLoading } from '@/src/components/common/page-loading';
export { default as ModalContainer } from '@/src/components/common/modal-container';
export { default as PaginationComponent } from '@/src/components/organisms/pagination-component';
export { default as DashboardHeader } from '@/src/components/molecule/headers/user-dashboard';
export { default as AdminDashboardHeader } from '@/src/components/molecule/headers/admin-dashboard';
export { default as AdminSupportHeader } from '@/src/components/molecule/headers/admin-support';
export { default as ChatMessageItem } from '@/src/components/molecule/chat/chat-message-item';
export { default as ListComponent } from '@/src/components/organisms/list-component';
export { default as AdminSupportUserCard } from '@/src/components/molecule/cards/admin-support-user-card';
export { default as EmptyColumn } from '@/src/components/atom/empty-components/empty-column';

// -------------------------------------------------------------------export
// packages
export { usePathname } from 'next/navigation';
export { useEffect, useRef, useState, Suspense, useMemo } from 'react';
export { AnimatePresence, motion } from 'framer-motion';
export { FormProvider, useForm } from 'react-hook-form';
export { yupResolver } from '@hookform/resolvers/yup';
export { enqueueSnackbar } from 'notistack';
export { useDispatch, useSelector } from 'react-redux';

// hooks
export { useAuth } from '@/src/hooks/auth/use-auth';
export { useNavigation } from '@/src/hooks/navigation/use-navigation';
export { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
export { useUnreadCount } from '@/src/hooks/chat/use-unread-count';
export { useInfiniteUsers } from '@/src/hooks/users/use-infinity-users';
export { useFileUploader } from '@/src/hooks/file-uploader/use-file-uploader';
export { useImageProcessor } from '@/src/hooks/image-processor/use-image-processor';
export { useVideoProcessor } from '@/src/hooks/video-processor/use-video-processor';
export { useChatsListener } from '@/src/hooks/chat/use-user-listener';
export { DndContext, useSensor, useSensors } from '@dnd-kit/core';

// store
export {
  resetChatsFilters,
  setChatsDate,
} from '@/src/store/slices/chats/chats-filter';
export {
  resetTaskFilters,
  setTaskDate,
  setTaskType,
} from '@/src/store/slices/tasks/tasks-filters';
export {
  resetUserFilters,
  setUserDate,
  setActive,
} from '@/src/store/slices/users/users-filter';

// libs
export { AdminUnreadMeassesListener } from '@/src/libs/chat/admin-unread-messages-count';
export { createTaskDocument } from '@/src/libs/tasks/create-task';
export { MessgesRead } from '@/src/libs/chat/read-message';
export { updateTaskStatus } from '@/src/libs/tasks/update-task-status';

// utils
export { stringSlicer } from '@/src/utils/string-slicer';

// ui
export { TableComponent } from '@/src/components/organisms/table-component';

// -------------------------------------------------------------------type
// packages
export type { Dispatch, ChangeEvent, SetStateAction } from 'react';
export type { DragEndEvent } from '@dnd-kit/core';
export { PointerSensor, TouchSensor } from '@dnd-kit/core';

// global types
export { UserType } from '@/src/types/global';
export type {
  Columns,
  Task,
  TaskForm,
  ModalProps,
  ChatsType,
  MyUserType,
  ChatMessage,
} from '@/src/types/global';

// store
export type { RootState } from '@/src/store';

// molcule
export type { IconName } from '@/src/components/atom/icon-components/icons';

// pages
export type { ColumnProps } from '@/src/components/pages/type';

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
