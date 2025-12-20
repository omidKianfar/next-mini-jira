"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// hooks
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { useRequirePaymentStatus } from "@/src/hooks/pages-user-status-require/use-require-payment-status";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useNavigation } from "@/src/hooks/navigation";
import { useFileUploader } from "@/src/hooks/file-uploader";
import { useImageProcessor } from "@/src/hooks/image-processor";

// schema
import { ProfileSchema } from "./schema";

// ui
import BackToSignup from "../../organisms/modals/back-to-signup";
import FramerMotion from "../../atom/animation";
import ButtonBack from "../../atom/button/button-back";
import ModalContainer from "../../organisms/modal-component";
import InputField from "../../molecule/controllers/RHF-fields/input-field";
import MyIcon from "../../atom/icon";
import DateInputField from "../../molecule/controllers/RHF-fields/date-input-field";
import ButtonNext from "../../atom/button/button-next";
import MyImage from "../../atom/image";
import ButtonFreeClass from "../../atom/button/button-free-class";
import PageLoading from "../../organisms/page-loading";

// type
import { ProfileProps, UserType } from "@/src/types/global";

// lazy
const AvatarUpload = lazy(() => import("../../organisms/upload/avatar"));

const ProfileComponent = () => {
  // hooks
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const navigation = useNavigation();

  const { saveUserProfile, user } = useAuth();
  const { processImage } = useImageProcessor();

  console.log("user", user);

  const { progress, reset, upload, uploading } = useFileUploader({
    accept: ["image/*"],
  });

  useRequireActiveStatus();
  useRequirePaymentStatus();

  // states
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // form
  const defaultValues: ProfileProps = {
    photo: user?.photo ?? "",
    userName: user?.userName ?? "",
    birthday: user?.birthday ?? "",
  };

  const methods = useForm<ProfileProps>({
    defaultValues,
    resolver: yupResolver(ProfileSchema),
    mode: "onSubmit",
  });

  // functions
  useEffect(() => {
    if (user) {
      methods.reset({
        photo: user.photo ?? "",
        userName: user.userName ?? "",
        birthday: user.birthday ?? "",
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

    methods.setValue("photo", uploadedUrl as string);
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
      console.log("Profile Error: ", error);
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
    if (pathName.includes("signup")) {
      handleOpenModal();
    } else {
      navigation.dashboard();
    }
  };

  const goPasswordHandler = () => {
    navigation.changePassword();
  };

  return (
    <Suspense fallback={<PageLoading />}>
      <FramerMotion>
        <div
          className={`flex w-full flex-col items-center justify-center p-4 ${pathName.includes("/signup") && "min-h-screen"}`}
        >
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className="mb-10 w-[90vw] rounded-xl border-2 border-warning-300 bg-white p-4 pt-8 shadow-md lg:mb-0 lg:w-[500px]">
              <div className="mb-4 flex items-center justify-between">
                <ButtonBack onClick={handelBack} />

                {user?.userType === UserType.Client &&
                  pathName.includes("profile") && (
                    <ButtonFreeClass
                      className="ml-4 text-primary-500 hover:text-primary-600"
                      onClick={goPasswordHandler}
                      icon={
                        <MyIcon icon="maki:arrow" className="ml-2 text-body" />
                      }
                    >
                      Password
                    </ButtonFreeClass>
                  )}
              </div>

              <ModalContainer open={open} handleClose={handleCloseModal}>
                <BackToSignup handleClose={handleCloseModal} />
              </ModalContainer>

              <h1 className="mb-8 text-center text-title font-bold text-warning-500">
                Profile
              </h1>

              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(setProfileHandler)}>
                  <div className="mb-4">
                    <AvatarUpload
                      photo={methods.watch("photo")}
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
                        icon={"tabler:user-filled"}
                        className="text-subtitle text-gray-600"
                      />
                    }
                  />

                  <DateInputField name="birthday" label="Birthday" />

                  <div className="mt-6 flex items-center justify-end">
                    <ButtonNext type="submit" isLoading={loading}>
                      {pathName.includes("profile") ? "Save" : "Next"}
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
