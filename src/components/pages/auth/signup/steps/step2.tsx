import AvatarUpload from "@/src/components/atom/upload/avatar";
import {
  BackToSignup,
  Button,
  DateInputField,
  FormProvider,
  Icon,
  InputField,
  ModalContainer,
  ProfileProps,
  ProfileSchema,
  SignupProps,
  useAuth,
  useForm,
  useMemo,
  useSnackbar,
  useState,
  yupResolver,
} from "../../imports";
import BackButton from "@/src/components/atom/button/back-button";

const Step2Component = ({ changeStep }: Pick<SignupProps, "changeStep">) => {
  const { enqueueSnackbar } = useSnackbar();

  const { saveUserProfile, user } = useAuth();

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
      }).unwrap();

      enqueueSnackbar("profile updated successfully", { variant: "success" });

      changeStep("2");
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
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
    <div className="lg:w-[500px] border-2 border-amber-300 p-4 rounded-sm bg-white">
      <div className="mb-2">
        <BackButton onClick={handleOpenModal} />
      </div>

      <ModalContainer open={open} handleClose={handleCloseModal}>
        <BackToSignup changeStep={changeStep} handleClose={handleCloseModal} />
      </ModalContainer>

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
          />

          <DateInputField name="birthday" label="Birthday" />

          <div className="flex justify-end items-center">
            <Button
              type="submit"
              isLoading={loading}
              className="mt-6 bg-blue-500 text-white border-2
                 hover:bg-transparent hover:border-blue-500
               hover:text-blue-500 rounded-sm px-8 py-2 
                transition-all duration-200
            "
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Step2Component;
