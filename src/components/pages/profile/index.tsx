"use client";

import {
  AvatarUpload,
  BackButton,
  Button,
  DateInputField,
  FormProvider,
  FramerMotion,
  Icon,
  Image,
  InputField,
  ModalContainer,
  ProfileProps,
  useAuth,
  useForm,
  useIsMobile,
  useMemo,
  useRequireActiveStatus,
  useRequirePaymentStatus,
  useState,
  yupResolver,
} from "../imports";
import { ProfileSchema } from "./schema";
import BackToSignup from "./modal/back-to-signup";

const ProfileComponent = () => {
  useRequireActiveStatus();
  useRequirePaymentStatus();
  
  const { saveUserProfile, user } = useAuth();

  const isMobile = useIsMobile();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const defaultValues: ProfileProps = useMemo(
    () => ({
      photo: user?.photo ?? "",
      userName: user?.userName ?? "",
      birthday: user?.birthday ?? "",
    }),
    []
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

  return (
    <FramerMotion>
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className=" flex items-center justify-center flex-col lg:flex-row">
          <div className="w-[90vw] lg:w-[500px]  border-2 border-amber-300  p-4 pt-8 rounded-lg bg-white mb-10 lg:mb-0 shadow">
            <div className="mb-2">
              <BackButton onClick={handleOpenModal} />
            </div>

            <ModalContainer open={open} handleClose={handleCloseModal}>
              <BackToSignup handleClose={handleCloseModal} />
            </ModalContainer>

            <h1 className="text-2xl font-bold text-center mb-8 text-amber-500">
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
                  placeholder="Enter your email"
                  icon={
                    <Icon
                      icon={"tabler:user-filled"}
                      className="text-gray-600 "
                    />
                  }
                />

                <DateInputField name="birthday" label="Birthday" />

                <div className="flex justify-end items-center mt-6">
                  <Button
                    type="submit"
                    isLoading={loading}
                    className=" bg-blue-500 text-white border-2
                 hover:bg-transparent hover:border-blue-500
               hover:text-blue-500 rounded-lg px-8 py-2 
                transition-all duration-200
            "
                  >
                    Next
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>

          <div className="w-[300px] h-[200px] lg:w-[500px] lg:h-[400px] flex items-center justify-center">
            <Image
              src="/images/profile.svg"
              alt=""
              width={isMobile ? 300 : 500}
              height={isMobile ? 200 : 400}
              className="object-contain"
            />{" "}
          </div>
        </div>
      </div>
    </FramerMotion>
  );
};

export default ProfileComponent;
