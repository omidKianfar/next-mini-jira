"use client";

import { usePathname } from "next/navigation";

import { FormValues } from "../../type";
import { useNavigation } from "@/src/hooks/navigation";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useAuth } from "@/src/hooks/auth/use-auth";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "../schema";
import MyImage from "@/src/components/atom/image";
import InputField from "@/src/components/molecule/controllers/RHF-fields/input-field";
import MyIcon from "@/src/components/atom/icon";
import ButtonNext from "@/src/components/atom/button/button-next";
import ButtonFreeClass from "@/src/components/atom/button/button-free-class";
import Logo from "@/src/components/atom/logo";

const AuthComponent = () => {
  const navigation = useNavigation();
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
    [],
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <Logo />

      <div className="flex flex-col items-center justify-center lg:flex-row">
        <MyImage
          src="/images/auth.png"
          alt=""
          width={isMobile ? 300 : 500}
          height={isMobile ? 200 : 400}
          className="object-contain"
          wrapperClass="w-[300px] h-[200px] lg:w-[500px] lg:h-[400px] flex items-center justify-center"
        />{" "}
        <div className="w-[90vw] rounded-xl border-2 border-warning-300 bg-white p-4 pt-8 shadow-sm lg:w-[500px]">
          <h1 className="mb-8 text-center text-title font-bold text-warning-500">
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
                  <MyIcon
                    icon={"ic:baseline-email"}
                    className="text-error-400"
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
                      className="cursor-pointer text-success-400"
                      onClick={() => setPasswordShow(false)}
                    />
                  ) : (
                    <MyIcon
                      icon={"mdi:hide"}
                      className="cursor-pointer text-gray-400"
                      onClick={() => setPasswordShow(true)}
                    />
                  )
                }
              />

              <div className="my-8 flex items-center justify-end">
                <MyIcon
                  icon={"devicon:google"}
                  className={`${
                    loading ? "mr-20" : "mr-[100px]"
                  } cursor-pointer rounded-full p-2 text-h3 transition-all duration-200 hover:rotate-12 hover:bg-primary-200`}
                  onClick={authGoogle}
                />

                <ButtonNext type="submit" isLoading={loading}>
                  {pathname.includes("signin") ? "Signin" : "Signup"}
                </ButtonNext>
              </div>
            </form>
          </FormProvider>

          <ButtonFreeClass
            onClick={() =>
              pathname.includes("signin")
                ? navigation.signup()
                : navigation.signin()
            }
            className="font-semibold text-warning-500 hover:text-warning-600"
            icon={
              <MyIcon
                icon={"grommet-icons:link-next"}
                className="ml-1 mt-1 text-caption"
                onClick={() => setPasswordShow(true)}
              />
            }
          >
            {pathname.includes("signin") ? "Signup Page" : "Signin Page"}
          </ButtonFreeClass>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
