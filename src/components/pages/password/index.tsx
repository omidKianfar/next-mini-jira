"use client";

import { useAuth } from "@/src/hooks/auth/use-auth";
import { useIsMobile } from "@/src/hooks/mobile-size";
import { useRequireActiveStatus } from "@/src/hooks/pages-user-status-require/use-require-active-status";
import { useRequirePaymentStatus } from "@/src/hooks/pages-user-status-require/use-require-payment-status";
import { SignPropsType } from "@/src/types/global";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { authSchema } from "../auth/schema";
import FramerMotion from "../../atom/animation";
import InputField from "../../molecule/controllers/RHF-fields/input-field";
import MyIcon from "../../atom/icon";
import ButtonNext from "../../atom/button/button-next";
import MyImage from "../../atom/image";
import ButtonBack from "../../atom/button/button-back";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/src/hooks/navigation";

const PasswordComponent = () => {
  const pathName = usePathname();

  const navigation = useNavigation();

  useRequireActiveStatus();
  useRequirePaymentStatus();

  const { user, updatePassword } = useAuth();
  const isMobile = useIsMobile();

  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const defaultValues: SignPropsType = {
    email: user?.email ?? "",
    password: "",
  };

  const methods = useForm<SignPropsType>({
    defaultValues,
    resolver: yupResolver(authSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (user) {
      methods.reset({
        email: user?.email ?? "",
        password: "",
      });
    }
  }, [user, methods]);

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

  const handelBack = () => {
    navigation.profile();
  };

  return (
    <FramerMotion>
      <div
        className={`flex w-full flex-col items-center justify-center p-4 ${pathName.includes("/signup") && "min-h-screen"}`}
      >
        <div className="flex flex-col items-center justify-center lg:flex-row">
          <div className="mb-10 w-[90vw] rounded-xl border-2 border-warning-300 bg-white p-4 pt-8 shadow-md lg:mb-0 lg:w-[500px]">
            {pathName.includes("profile") && (
              <div className="mb-2">
                <ButtonBack onClick={handelBack} />
              </div>
            )}

            <h1 className="mb-8 text-center text-title font-bold text-warning-500">
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

                <div className="mt-6 flex items-center justify-end">
                  <ButtonNext type="submit" isLoading={loading}>
                    Next
                  </ButtonNext>
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
