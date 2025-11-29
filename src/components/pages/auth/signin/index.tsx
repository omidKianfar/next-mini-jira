"use client";

import {
  Button,
  FormProvider,
  FormValues,
  Icon,
  InputField,
  authSchema,
  useAuth,
  useForm,
  useMemo,
  useRouter,
  useSnackbar,
  useState,
  yupResolver,
} from "../imports";

const SigninComponent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { signinWithEmail } = useAuth();

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
      await signinWithEmail({
        email: values.email,
        password: values.password,
      }).unwrap();

      router.push("/dashboard");
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-[500px] border-2 border-amber-300 p-4 pt-8 rounded-sm bg-white ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(signupUser)} autoComplete="on">
          <InputField
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            autoFocus
            autoComplete="email"
          />

          <InputField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
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
              Signin
            </Button>
          </div>
        </form>
      </FormProvider>

      <Button
        onClick={() => router.push("/auth/signup")}
        className="text-amber-500 hover:text-amber-600 font-semibold"
        icon={
          <Icon
            icon="grommet-icons:link-next"
            width={12}
            className="mt-1 ml-1"
          />
        }
      >
        Signup Page
      </Button>
    </div>
  );
};

export default SigninComponent;
