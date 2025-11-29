"use client";

import {
  authSchema,
  Button,
  FormProvider,
  FormValues,
  Icon,
  InputField,
  SignupProps,
  useAuth,
  useForm,
  useMemo,
  useRouter,
  useSnackbar,
  useState,
  yupResolver,
} from "../../imports";

const Step1Component = ({ changeStep }: SignupProps) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { signupWithEmail } = useAuth();

  const [loading, setLoading] = useState(false);

  const defaultValues: FormValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(authSchema),
  });

  const signupUser = async (values: FormValues) => {
    setLoading(true);

    try {
      await signupWithEmail({
        email: values?.email,
        password: values?.password,
      }).unwrap();

      enqueueSnackbar("Account created successfully", { variant: "success" });

      changeStep("1");
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[500px]  p-4 border-2 border-amber-300 rounded-sm pt-8 bg-white">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(signupUser)}>
          <InputField
            name="email"
            label="Email"
            placeholder="Enter your email"
            autoFocus
          />

          <InputField
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

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
              Signup
            </Button>
          </div>
        </form>
      </FormProvider>

      <Button
        onClick={() => router.push("/auth/signin")}
        className="text-amber-500 hover:text-amber-600 font-semibold"
        icon={
          <Icon
            icon="grommet-icons:link-next"
            width={16}
            className="mt-1 ml-1 "
          />
        }
      >
        Signin Page
      </Button>
    </div>
  );
};

export default Step1Component;
