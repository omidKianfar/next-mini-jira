import { lazy } from 'react';
import * as Yup from 'yup';

// -------------------------------------------------------------------default export
// packages
export { default as dayjs } from 'dayjs';

// -------------------------------------------------------------------export
// packages
export { useSearchParams, usePathname, useRouter } from 'next/navigation';
export { useState, Suspense, useEffect } from 'react';
export { useDispatch, useSelector } from 'react-redux';
export { FormProvider, useForm } from 'react-hook-form';
export { yupResolver } from '@hookform/resolvers/yup';
export { Yup };
export { enqueueSnackbar } from 'notistack';
export { Swiper, SwiperSlide } from 'swiper/react';
export { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
export { motion } from 'framer-motion';

// hooks
export { useAuth } from '@/src/hooks/auth/use-auth';
export { useRequirePaymentStatus } from '@/src/hooks/pages-user-status-require/use-require-payment-status';
export { useRequireActiveStatus } from '@/src/hooks/pages-user-status-require/use-require-active-status';
export { useNavigation } from '@/src/hooks/navigation/use-navigation';
export { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
export { useUsersListener } from '@/src/hooks/users/use-user-listener';
export { useTaskListener } from '@/src/hooks/tasks/use-task-listener';
export { useSetSubscriptionId } from '@/src/hooks/payment/useSetSubscriptionId';
export { usePlanAction } from '@/src/hooks/payment/usePlanAction';
export { useFileUploader } from '@/src/hooks/file-uploader/use-file-uploader';
export { useImageProcessor } from '@/src/hooks/image-processor/use-image-processor';
export { useChat } from '@/src/hooks/chat/use-chat';
export { useEditor } from '@/src/hooks/editor/use-editor';

// store
export { toggleSortByCreatedAt } from '@/src/store/slices/users/users';

// libs
export { updateFirestoreUser } from '@/src/libs/auth/update-user';
export { useUserListenerById } from '@/src/hooks/users/use-user-listener-by-id';
export { deleteTask } from '@/src/libs/tasks/delete-task';
export { fetchTask } from '@/src/libs/tasks/fetch-task';
export { MessgesRead } from '@/src/libs/chat/read-message';

// ui
export { default as ButtonNext } from '@/src/components/atom/buttons-component/button-next';
export { default as ButtonBack } from '@/src/components/atom/buttons-component/button-back';
export { default as ButtonFreeClass } from '@/src/components/atom/buttons-component/button-free-class';
export { default as InputField } from '@/src/components/molecule/RHF-controllers-components/RHF-fields/input-field';
export { default as DateInputField } from '@/src/components/molecule/RHF-controllers-components/RHF-fields/date-input-field';
export { default as MyImage } from '@/src/components/atom/image-components';
export { default as MyIcon } from '@/src/components/atom/icon-components';
export { default as ModalContainer } from '@/src/components/common/modal-container';
export { default as ModalComponent } from '@/src/components/molecule/modals/modal-component';
export { default as PageLoading } from '@/src/components/common/page-loading';
export { default as FramerMotion } from '@/src/components/atom/animation-component';
export { default as PaymentCardComponent } from '@/src/components/molecule/cards/payment-cart';
export { default as PlanCardComponent } from '@/src/components/molecule/cards/plan-cart';
export { default as ChatMessages } from '@/src/components/organisms/chat-messages';
export { default as ChatInput } from '@/src/components/molecule/chat/chat-input';
export { default as ChatHeader } from '@/src/components/molecule/headers/chat-header';
export { default as Logo } from '@/src/components/atom/logo-component';

// -------------------------------------------------------------------type
// global types
export { UserType } from '@/src/types/global';
export type {
  PlanType,
  Task,
  MyUserType,
  SignPropsType,
  ProfileProps,
} from '@/src/types/global';

// store
export type { RootState } from '@/src/store';

// molcules
export type { IconName } from '@/src/components/atom/icon-components/icons';

// -------------------------------------------------------------------lazy
// ui
export const MyVideo = lazy(
  () => import('@/src/components/atom/video-component')
);

export const LightBoxComponent = lazy(
  () => import('@/src/components/common/light-box')
);

export const BoardComponent = lazy(
  () => import('@/src/components/organisms/tasks-boards')
);

export const AvatarUpload = lazy(
  () => import('@/src/components/molecule/uploads/avatar')
);

export const UsersTable = lazy(
  () => import('@/src/components/organisms/tables/admin-users-table')
);

export const UserListCard = lazy(
  () => import('@/src/components/organisms/lists/admin-users-list')
);
