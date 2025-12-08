"use client";

import {
  Button,
  FormProvider,
  InputField,
  useAuth,
  useForm,
  useMemo,
  useState,
  yupResolver,
  FramerMotion,
  SignPropsType,
  authSchema,
  useIsMobile,
  useRequireActiveStatus,
  useRequirePaymentStatus,
  MyIcon,
  MyImage,
} from "../imports";

const PasswordComponent = () => {
  useRequireActiveStatus();
  useRequirePaymentStatus();

  const { user, updatePassword } = useAuth();
  const isMobile = useIsMobile();

  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const defaultValues: SignPropsType = useMemo(
    () => ({
      email: user?.email ?? "",
      password: "",
    }),
    []
  );

  const methods = useForm<SignPropsType>({
    defaultValues,
    resolver: yupResolver(authSchema),
    mode: "onSubmit",
  });

  const setProfileHandler = async (values: SignPropsType) => {
    setLoading(true);

    try {
      await updatePassword({
        newPassword: values.password,
      });
    } catch (error: any) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FramerMotion>
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className=" flex items-center justify-center flex-col lg:flex-row">
          <div className="w-[90vw] lg:w-[500px]  border-2 border-amber-300  p-4 pt-8 rounded-lg bg-white mb-10 lg:mb-0 shadow">
            <h1 className="text-2xl font-bold text-center mb-8 text-amber-500">
              Password
            </h1>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(setProfileHandler)}>
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  disabled
                  icon={
                    <MyIcon
                      icon={"ic:baseline-email"}
                      className="text-red-400"
                    />
                  }
                />

                <InputField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type={passwordShow ? "text" : "password"}
                  autoComplete="current-password"
                  icon={
                    passwordShow ? (
                      <MyIcon
                        icon={"mdi:show"}
                        className="text-green-400 cursor-pointer"
                        onClick={() => setPasswordShow(false)}
                      />
                    ) : (
                      <MyIcon
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
                    transition-all duration-200"
                  >
                    Next
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
          
          <MyImage
            src="/images/set-password.svg"
            alt=""
            width={isMobile ? 300 : 500}
            height={isMobile ? 200 : 400}
            className="object-contain"
            wrapperClass="w-[300px] h-[200px] lg:w-[500px] lg:h-[400px] flex items-center justify-center"
          />{" "}
        </div>
      </div>
    </FramerMotion>
  );
};

export default PasswordComponent;
