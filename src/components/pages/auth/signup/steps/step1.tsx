"use client";

import {
  authSchema,
  Button,
  FormProvider,
  FormValues,
  Icon,
  Image,
  InputField,
  useAuth,
  useForm,
  useMemo,
  useRouter,
  useState,
  yupResolver,
} from "../../imports";

const Step1Component = () => {
  const router = useRouter();

  const { signupWithEmail, changeStep } = useAuth();

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

  const signupUser = async (values: FormValues) => {
    setLoading(true);

    try {
      const result = await signupWithEmail({
        email: values?.email,
        password: values?.password,
      });

      if (result) {
        changeStep("1");
      }
    } catch (error: any) {
      console.log("Error: ", error);
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
            Signup Page
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(signupUser)} autoComplete="on">
              <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                autoFocus
                autoComplete="email"
                icon={
                  <Icon icon={"ic:baseline-email"} className="text-red-400" />
                }
              />

              <InputField
                name="password"
                label="Password"
                type={passwordShow ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="new-password"
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

              <div className="flex justify-end items-center">
                <Button
                  type="submit"
                  isLoading={loading}
                  className="mt-6 bg-blue-500 text-white border-2
                 hover:bg-transparent hover:border-blue-500
               hover:text-blue-500 rounded-lg px-8 py-2 
                transition-all duration-200
            "
                >
                  Signup
                </Button>
              </div>
            </form>
          </FormProvider>

          <Button
            onClick={() => router.push("/signin")}
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
      </div>
    </div>
  );
};

export default Step1Component;
