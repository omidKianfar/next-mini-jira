"use client";

import { usePathname } from "next/navigation";
import {
  Button,
  FormProvider,
  Icon,
  Image,
  InputField,
  authSchema,
  useAuth,
  useForm,
  useIsMobile,
  useMemo,
  useRouter,
  useState,
  yupResolver,
} from "../../imports";

import { FormValues } from "../../type";

const AuthComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { signinWithEmail, signupWithEmail, googleSignin } = useAuth();
  const isMobile = useIsMobile();

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

  const authUser = async (values: FormValues) => {
    setLoading(true);

    try {
      if (pathname.includes("signin")) {
        await signinWithEmail({
          email: values.email,
          password: values.password,
        });
      } else {
        await signupWithEmail({
          email: values?.email,
          password: values?.password,
        });
      }
    } catch (error: any) {
      console.log("Auth Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const authGoogle = async () => {
    setLoading(true);

    try {
      await googleSignin();
    } catch (error: any) {
      console.log("Auth with google Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 ">
      <div className="text-center mb-0 lg:mb-8  rounded-lg flex ">
        <h1 className="text-4xl lg:text-6xl font-bold text-amber-500 pr-1 p-1">
          Mini
        </h1>

        <h1 className="text-4xl lg:text-6xl font-bold  bg-blue-900 text-white px-2 lg:px-6 py-1 rounded-lg shadow">
          Jira
        </h1>
      </div>

      <div className=" flex items-center justify-center flex-col lg:flex-row">
        <div className="w-[300px] h-[200px] lg:w-[500px] lg:h-[400px] flex items-center justify-center">
          <Image
            src="/images/auth.png"
            alt=""
            width={isMobile ? 300 : 500}
            height={isMobile ? 200 : 400}
            className="object-contain"
          />{" "}
        </div>

        <div className="w-[90vw] lg:w-[500px]  border-2 border-amber-300  p-4 pt-8 rounded-lg bg-white shadow">
          <h1 className="text-2xl font-bold text-center mb-8 text-amber-500">
            {pathname.includes("signin") ? "Signin" : "Signup"}
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(authUser)} autoComplete="on">
              <InputField
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                autoFocus
                autoComplete="email"
                icon={
                  <Icon icon={"ic:baseline-email"} className="text-red-400" />
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
                  className={`${
                    loading ? "mr-20" : "mr-[100px]"
                  } hover:bg-blue-200 p-2 rounded-full cursor-pointer hover:rotate-12 transition-all duration-200`}
                  onClick={authGoogle}
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
                  {pathname.includes("signin") ? "Signin" : "Signup"}
                </Button>
              </div>
            </form>
          </FormProvider>

          <Button
            onClick={() =>
              pathname.includes("signin")
                ? router.push("/signup")
                : router.push("/signin")
            }
            className="text-amber-500 hover:text-amber-600 font-semibold"
            icon={
              <Icon
                icon="grommet-icons:link-next"
                width={12}
                className="mt-1 ml-1"
              />
            }
          >
            {pathname.includes("signin") ? "Signup Page" : "Signin Page"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
