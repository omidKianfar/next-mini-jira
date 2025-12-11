"use client";

import { ProfileSchema } from "./schema";
import BackToSignup from "../../molecule/modals/back-to-signup";
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { useRequirePaymentStatus } from "@/src/hooks/pages-user-status-require/use-require-payment-status";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useMemo, useState } from "react";
import { ProfileProps } from "@/src/types/global";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FramerMotion from "../../atom/animation";
import ButtonBack from "../../atom/button/button-back";
import ModalContainer from "../../molecule/modal-component";
import AvatarUpload from "../../molecule/upload/avatar";
import InputField from "../../molecule/controllers/RHF-fields/input-field";
import MyIcon from "../../atom/icon";
import DateInputField from "../../molecule/controllers/RHF-fields/date-input-field";
import ButtonNext from "../../atom/button/button-next";
import MyImage from "../../atom/image";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/src/hooks/navigation";
import ButtonFreeClass from "../../atom/button/button-free-class";

const ProfileComponent = () => {
  const pathName = usePathname();

  const isMobile = useIsMobile();
  const navigation = useNavigation();

  const { saveUserProfile, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useRequireActiveStatus();
  useRequirePaymentStatus();

  const defaultValues: ProfileProps = useMemo(
    () => ({
      photo: user?.photo ?? "",
      userName: user?.userName ?? "",
      birthday: user?.birthday ?? "",
    }),
    [],
  );

  const methods = useForm<ProfileProps>({
    defaultValues,
    resolver: yupResolver(ProfileSchema),
    mode: "onSubmit",
  });

  const uploadPhotoHandler = (event: any) => {
    const file = event?.target?.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    methods.setValue("photo", url);
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
    <FramerMotion>
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center lg:flex-row">
          <div className="mb-10 w-[90vw] rounded-xl border-2 border-warning-300 bg-white p-4 pt-8 shadow-md lg:mb-0 lg:w-[500px]">
            <div className="mb-4 flex items-center justify-between">
              <ButtonBack onClick={handelBack} />

              {pathName.includes("profile") && (
                <ButtonFreeClass
                  className="ml-4 text-primary-500 hover:text-primary-600"
                  onClick={goPasswordHandler}
                  icon={<MyIcon icon="maki:arrow" className="ml-2 text-body" />}
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
                  />
                </div>

                <InputField
                  name="userName"
                  label="Username"
                  placeholder="Enter your username"
                  icon={
                    <MyIcon
                      icon={"tabler:user-filled"}
                      className="text-gray-600"
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
  );
};

export default ProfileComponent;
