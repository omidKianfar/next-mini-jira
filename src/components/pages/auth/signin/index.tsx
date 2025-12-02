"use client";

import {
  Button,
  FormProvider,
  FormValues,
  Icon,
  Image,
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

  const { signinWithEmail, googleSignin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

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

  const signinUser = async (values: FormValues) => {
    setLoading(true);

    try {
      await signinWithEmail({
        email: values.email,
        password: values.password,
      });
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error?.message || error}. Please try again.`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const signupGoogle = async () => {
    setLoading(true);

    try {
      await googleSignin();
    } catch (error: any) {
      console.log("Signup Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center mb-8 h-18 rounded-lg flex ">
        <h1 className="text-6xl font-bold text-amber-500 pr-1 p-1">Mini</h1>

        <h1 className="text-6xl font-bold  bg-blue-900 text-white px-6 p-1 rounded-lg">
          Jira
        </h1>
      </div>

      <div className=" flex items-center justify-center">
        <div className="w-[500px] h-[400px] flex items-center justify-center">
          <Image
            src="/images/auth.png"
            alt=""
            width={500}
            height={400}
            className="object-contain"
          />{" "}
        </div>

        <div className="w-[500px]  border-2 border-amber-300  p-4 pt-8 rounded-lg bg-white ">
          <h1 className="text-2xl font-bold text-center mb-8 text-amber-500">
            Signin 
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(signinUser)}>
              <InputField
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                autoFocus
                icon={
                  <Icon icon={"ic:baseline-email"} className="text-red-400" />
                }
              />

              <InputField
                name="password"
                label="Password"
                placeholder="Enter your password"
                type={passwordShow ? "text" : "password"}
                icon={
                  passwordShow ? (
                    <Icon
                      icon={"mdi:show"}
                      className="text-green-400 cursor-pointer"
                      onClick={() => setPasswordShow(false)}
                    />
                  ) : (
                    <Icon
                      icon={"mdi:hide"}
                      className="text-gray-400 cursor-pointer"
                      onClick={() => setPasswordShow(true)}
                    />
                  )
                }
              />

              <div className="flex justify-end items-center my-8">
                <div
                  className={`${loading ? "mr-20" : "mr-[100px]"} hover:bg-blue-200 p-2 rounded-full cursor-pointer hover:rotate-12 transition-all duration-200`}
                  onClick={signupGoogle}
                >
                  <Icon icon={"devicon:google"} className=" text-4xl" />
                </div>

                <Button
                  type="submit"
                  isLoading={loading}
                  className=" bg-blue-500 text-white border-2 hover:bg-transparent
                  hover:border-blue-500 hover:text-blue-500 rounded-lg px-8 py-2 
                  transition-all duration-200"
                >
                  Signin
                </Button>
              </div>
            </form>
          </FormProvider>

          <Button
            onClick={() => router.push("/signup")}
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
      </div>
    </div>
  );
};

export default SigninComponent;
