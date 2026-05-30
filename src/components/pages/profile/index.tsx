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
import PageLoading from '../../common/page-loading';
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

  useEffect(() => {
    if (user) {
      methods.reset({
        photo: user.photo ?? '',
        userName: user.userName ?? '',
        birthday: user.birthday ?? '',
      });
    }
  }, [user, methods]);

  const uploadPhotoHandler = async (file: File) => {
    const finalFile = await processImage(file);

    const uploadedUrl = await upload({
      file: finalFile,
      avatar: true,
      userId: user?.userId as string,
    });

    methods.setValue('photo', uploadedUrl as string);
    reset();
  };

  const setProfileHandler = async (values: ProfileProps) => {
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

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

  const goPasswordHandler = () => {
    navigation.changePassword();
  };

  const clickHandler = () => {
    changeStep('0');
  };

  return (
    <Suspense fallback={<PageLoading />}>
      <FramerMotion>
        <div
          className={`flex w-full flex-col items-center justify-center p-4 ${pathName.includes('/signup') && 'min-h-screen'}`}
        >
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className="mb-10 w-[90vw] rounded-xl border-2 border-warning-300 bg-white p-4 pt-8 shadow-md lg:mb-0 lg:w-[500px]">
              <div className="mb-4 flex items-center justify-between">
                <ButtonBack onClick={handelBack} />

                {user?.userType === UserType.Client &&
                  pathName.includes('profile') && (
                    <ButtonFreeClass
                      className="ml-4 text-primary-500 hover:text-primary-600"
                      onClick={goPasswordHandler}
                      icon={
                        <MyIcon icon="arrow-right" className="ml-2 text-body" />
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

              <h1 className="mb-8 text-center text-title font-bold text-warning-500">
                Profile
              </h1>

              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(setProfileHandler)}>
                  <div className="mb-4">
                    <AvatarUpload
                      photo={methods.watch('photo')}
                      uploadHandler={uploadPhotoHandler}
                      uploading={uploading}
                      progress={progress}
                    />
                  </div>

                  <InputField
                    name="userName"
                    label="Username"
                    placeholder="Enter your username"
                    icon={
                      <MyIcon
                        icon="user"
                        className="text-subtitle text-gray-600"
                      />
                    }
                  />

                  <DateInputField name="birthday" label="Birthday" />

                  <div className="mt-6 flex items-center justify-end">
                    <ButtonNext type="submit" isLoading={loading}>
                      {pathName.includes('profile') ? 'Save' : 'Next'}
                    </ButtonNext>
                  </div>
                </form>
              </FormProvider>
            </div>

            <MyImage
              src="/images/profile.svg"
              alt=""
              width={isMobile ? 300 : 500}
              height={isMobile ? 200 : 400}
              className="object-contain"
              wrapperClass="w-[300px] h-[200px] lg:w-[500px] lg:h-[400px] flex items-center justify-center"
            />
          </div>
        </div>
      </FramerMotion>
    </Suspense>
  );
};

export default ProfileComponent;
