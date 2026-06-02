'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIsMobile } from '@/src/hooks/mobile-size/use-is-mobile';
import { useNavigation } from '@/src/hooks/navigation/use-navigation';
import { useAuth } from '@/src/hooks/auth/use-auth';
import { useImageProcessor } from '@/src/hooks/image-processor/use-image-processor';
import { useFileUploader } from '@/src/hooks/file-uploader/use-file-uploader';
import { useRequireActiveStatus } from '@/src/hooks/pages-user-status-require/use-require-active-status';
import { useRequirePaymentStatus } from '@/src/hooks/pages-user-status-require/use-require-payment-status';
import FramerMotion from '../../atom/animation-component';
import ButtonBack from '../../atom/buttons-component/button-back';
import ButtonFreeClass from '../../atom/buttons-component/button-free-class';
import MyIcon from '../../atom/icon-components';
import ModalContainer from '../../common/modal-container';
import ModalComponent from '../../molecule/modals/modal-component';
import InputField from '../../molecule/RHF-controllers-components/input-field';
import DateInputField from '../../molecule/RHF-controllers-components/date-input-field';
import ButtonNext from '../../atom/buttons-component/button-next';
import MyImage from '../../atom/image-components';
import { backModalMessage } from './data';
import { ProfileSchema } from './schema';
import { ProfileProps, UserType } from '@/src/types/global';

const AvatarUpload = lazy(
  () => import('@/src/components/molecule/uploads/avatar')
);

const ProfileComponent = () => {
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const navigation = useNavigation();

  const { saveUserProfile, user, changeStep } = useAuth();
  const { processImage } = useImageProcessor();

  const { progress, reset, upload, uploading } = useFileUploader({
    accept: ['image/*'],
  });

  useRequireActiveStatus();
  useRequirePaymentStatus();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const defaultValues: ProfileProps = {
    photo: user?.photo ?? '',
    userName: user?.userName ?? '',
    birthday: user?.birthday ?? '',
  };

  const methods = useForm<ProfileProps>({
    defaultValues,
    resolver: yupResolver(ProfileSchema),
    mode: 'onSubmit',
  });

  const { isDirty } = methods.formState;

  useEffect(() => {
    if (user && !isDirty) {
      methods.reset({
        photo: user.photo ?? '',
        userName: user.userName ?? '',
        birthday: user.birthday ?? '',
      });
    }
  }, [user, isDirty, methods]);

  const uploadPhotoHandler = async (file: File) => {
    try {
      const finalFile = await processImage(file);
      const uploadedUrl = await upload({
        file: finalFile,
        avatar: true,
        userId: user?.userId as string,
      });

      methods.setValue('photo', uploadedUrl as string, { shouldDirty: true });
      reset();
    } catch (err) {
      setServerError('Failed to upload image. Please try again.');
    }
  };

  const setProfileHandler = async (values: ProfileProps) => {
    setLoading(true);
    setServerError(null);

    try {
      await saveUserProfile({
        userId: user?.userId as string,
        data: {
          photo: values?.photo,
          userName: values?.userName,
          birthday: values?.birthday,
        },
      });
      reset();
    } catch (error: any) {
      setServerError(
        error?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handelBack = () => {
    if (pathName.includes('signup')) {
      handleOpenModal();
    } else {
      if (user?.userType === UserType.Admin) {
        navigation.adminDashboard();
      } else {
        navigation.dashboard();
      }
    }
  };

  const goPasswordHandler = () => navigation.changePassword();
  const clickHandler = () => changeStep('0');

  return (
    <FramerMotion>
      <div
        className={`flex w-full flex-col items-center justify-center p-4 ${pathName.includes('/signup') && 'min-h-screen'}`}
      >
        <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-12">
          <div className="mb-4 w-[90vw] rounded-lg border border-warning-400 bg-white p-6 pb-8 shadow-sm lg:mb-0 lg:w-[480px]">
            <div className="mb-4 flex items-center justify-between">
              <ButtonBack onClick={handelBack} />

              {user?.userType === UserType.Client &&
                pathName.includes('profile') && (
                  <ButtonFreeClass
                    className="font-semibold text-warning-500 hover:text-warning-600"
                    onClick={goPasswordHandler}
                    icon={
                      <MyIcon icon="arrow-right" className="ml-1 text-body" />
                    }
                  >
                    Password
                  </ButtonFreeClass>
                )}
            </div>

            <ModalContainer open={open} handleClose={handleCloseModal}>
              <ModalComponent
                handleClose={handleCloseModal}
                clickHandler={clickHandler}
                title={backModalMessage.title}
                description={backModalMessage.description}
              />
            </ModalContainer>

            <h1 className="mb-6 text-center text-title font-bold text-warning-500 lg:text-h4">
              Profile
            </h1>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(setProfileHandler)}
                className="space-y-5"
              >
                <div className="flex justify-center py-2">
                  <Suspense
                    fallback={
                      <div className="h-24 w-24 animate-pulse rounded-full bg-gray-100" />
                    }
                  >
                    <AvatarUpload
                      photo={methods.watch('photo')}
                      uploadHandler={uploadPhotoHandler}
                      uploading={uploading}
                      progress={progress}
                    />
                  </Suspense>
                </div>

                <InputField
                  name="userName"
                  label="Username"
                  placeholder="Enter your username"
                  icon={
                    <MyIcon
                      icon="user"
                      className="text-subtitle text-gray-400"
                    />
                  }
                />

                <DateInputField name="birthday" label="Birthday" />

                {serverError && (
                  <p className="text-danger-500 bg-danger-50/50 border-danger-100 rounded-lg border p-3 text-label font-medium">
                    {serverError}
                  </p>
                )}

                <div className="flex items-center justify-end pt-2">
                  <ButtonNext
                    type="submit"
                    isLoading={loading}
                    className="w-full min-w-[120px] lg:w-auto"
                  >
                    {pathName.includes('profile') ? 'Save' : 'Next'}
                  </ButtonNext>
                </div>
              </form>
            </FormProvider>
          </div>

          <MyImage
            src="/images/profile.svg"
            alt="Profile Illustration"
            width={isMobile ? 260 : 460}
            height={isMobile ? 180 : 360}
            className="object-contain"
            wrapperClass="w-[280px] h-[180px] lg:w-[460px] lg:h-[360px] flex items-center justify-center"
          />
        </div>
      </div>
    </FramerMotion>
  );
};

export default ProfileComponent;
